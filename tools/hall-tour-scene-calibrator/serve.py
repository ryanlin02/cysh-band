#!/usr/bin/env python3
"""音樂廳場景開場校準工具：只綁定本機，儲存時更新設定檔與導覽產物。"""

import datetime
import http.server
import json
import mimetypes
import shutil
import subprocess
import sys
import threading
import webbrowser
from pathlib import Path
from urllib.parse import unquote, urlparse

PORT = 8092
TOOL = Path(__file__).resolve().parent
ROOT = TOOL.parents[1]
VIEWS = ROOT / "data" / "tour-entry-views.js"
BACKUP = ROOT / "local" / "hall-tour-scene-calibrator" / "backup"


def reply(handler, status, data):
    body = json.dumps(data, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def scene_manifest():
    code = """
import { TOUR } from './data/tour.js';
console.log(JSON.stringify(TOUR.sceneMenu.filter(x => x.status === 'ready').map(entry => {
  const region = TOUR.regions.find(r => r.id === entry.regionId);
  return { id: entry.id, regionId: entry.regionId, nodes: region.nodes.map(n => n.id) };
})));
"""
    result = subprocess.run(
        ["node", "--input-type=module", "-e", code], cwd=ROOT,
        text=True, capture_output=True, check=True
    )
    return {entry["id"]: entry for entry in json.loads(result.stdout)}


def validate_entries(raw):
    if not isinstance(raw, dict):
        raise ValueError("設定資料格式不正確")
    manifest = scene_manifest()
    if set(raw) != set(manifest):
        raise ValueError("設定必須包含全部已開放場景，且不能有其他場景")
    entries = {}
    for scene_id, item in raw.items():
        if not isinstance(item, dict):
            raise ValueError(f"{scene_id} 的設定格式不正確")
        start = item.get("startNode")
        yaw, pitch = item.get("yaw"), item.get("pitch")
        if start not in manifest[scene_id]["nodes"]:
            raise ValueError(f"{scene_id} 的起始照片不屬於這個場景")
        if not isinstance(yaw, (int, float)) or not 0 <= yaw < 360:
            raise ValueError(f"{scene_id} 的左右角度必須介於 0–359")
        if not isinstance(pitch, (int, float)) or not -90 <= pitch <= 90:
            raise ValueError(f"{scene_id} 的上下角度必須介於 -90–90")
        entries[scene_id] = {
            "startNode": start,
            "yaw": round(float(yaw), 2),
            "pitch": round(float(pitch), 2),
        }
    return entries


def view_file(entries):
    return (
        "// 由本機場景校準工具儲存；不要直接把這些數字當成節點 heading。\n"
        "export const TOUR_ENTRY_VIEWS = Object.freeze("
        + json.dumps(entries, ensure_ascii=False, indent=2)
        + ");\n"
    )


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean = unquote(urlparse(path).path)
        if clean in ("/", "/calibrate.html"):
            return str(TOOL / "calibrate.html")
        if clean.startswith("/site/"):
            target = (ROOT / clean.removeprefix("/site/")).resolve()
            if ROOT not in target.parents and target != ROOT:
                return str(TOOL / "missing")
            return str(target)
        return str(TOOL / clean.lstrip("/"))

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

    def do_POST(self):
        if urlparse(self.path).path != "/api/save":
            return self.send_error(404)
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length <= 0 or length > 100_000:
                raise ValueError("設定資料大小不正確")
            request = json.loads(self.rfile.read(length).decode("utf-8"))
            entries = validate_entries(request.get("entries"))
            BACKUP.mkdir(parents=True, exist_ok=True)
            if VIEWS.exists():
                stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
                shutil.copy2(VIEWS, BACKUP / f"tour-entry-views-{stamp}.js")
            old = VIEWS.read_text() if VIEWS.exists() else None
            VIEWS.write_text(view_file(entries))
            generated = subprocess.run(
                ["node", "scripts/generate-tour.js"], cwd=ROOT,
                text=True, capture_output=True
            )
            if generated.returncode:
                if old is None:
                    VIEWS.unlink(missing_ok=True)
                else:
                    VIEWS.write_text(old)
                raise ValueError("設定未儲存，資料檢查失敗：" + generated.stdout + generated.stderr)
            reply(self, 200, {"ok": True, "saved": len(entries)})
        except Exception as error:
            reply(self, 400, {"ok": False, "error": str(error)})

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    mimetypes.add_type("application/javascript", ".js")
    url = f"http://127.0.0.1:{PORT}/"
    print("音樂廳場景校準工具：", url)
    print("完成後關閉這個視窗；設定只會儲存在本機，尚未發布。")
    if "--no-open" not in sys.argv:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
