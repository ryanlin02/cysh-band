#!/usr/bin/env python3
"""360 導覽整合標注工具的本機伺服器。"""

from __future__ import annotations

import datetime as dt
import http.server
import json
import os
import re
import shutil
from pathlib import Path
from urllib.parse import unquote, urlparse


PORT = 8093
TOOL = Path(__file__).resolve().parent
REPO = TOOL.parents[1]
DATA = REPO / "local" / "hall-tour-editor"
WORKSPACE = DATA / "workspace.json"
MAX_BODY = 8 * 1024 * 1024


def validate(workspace: object) -> tuple[list[str], dict]:
    errors: list[str] = []
    if not isinstance(workspace, dict):
        return ["標注資料必須是物件"], {}
    nodes = workspace.get("nodes")
    areas = workspace.get("areas")
    if not isinstance(nodes, list):
        errors.append("nodes 必須是節點清單")
        nodes = []
    if not isinstance(areas, list) or not areas:
        errors.append("areas 必須至少包含一個區域")
        areas = []
    project = workspace.get("project", {}) if isinstance(workspace.get("project"), dict) else {}
    expected_total = project.get("photoCount")
    if not isinstance(expected_total, int):
        expected_total = sum(area.get("expectedCount", 0) for area in areas if isinstance(area, dict))
    if expected_total and len(nodes) != expected_total:
        errors.append(f"節點應為 {expected_total} 個，目前為 {len(nodes)} 個")
    ids = [node.get("id") for node in nodes if isinstance(node, dict)]
    if len(ids) != len(set(ids)):
        errors.append("節點 ID 不可重複")
    valid_ids = set(ids)
    area_by_id = {area.get("id"): area for area in areas if isinstance(area, dict)}
    if len(area_by_id) != len(areas):
        errors.append("區域 ID 不可重複或留白")
    for node in nodes:
        if not isinstance(node, dict):
            errors.append("節點格式錯誤")
            continue
        if node.get("plan") is not None:
            plan = node.get("plan", {})
            if not all(isinstance(plan.get(axis), (int, float)) and 0 <= plan.get(axis) <= 1 for axis in ("x", "y")):
                errors.append(f"{node.get('id')} 的平面圖座標錯誤")
        area = area_by_id.get(node.get("areaId"), {})
        if not area:
            errors.append(f"{node.get('id')} 所屬區域不存在")
        if area.get("mapType") == "seats" and node.get("seat"):
            floor = re.escape(str(area.get("floor", "")))
            if not re.match(rf"^{floor}-\d+-\d+$", str(node["seat"])):
                errors.append(f"{node.get('id')} 的座位代碼錯誤")
        link_targets = [link.get("to") for link in node.get("links", []) if isinstance(link, dict)]
        if len(link_targets) != len(set(link_targets)):
            errors.append(f"{node.get('id')} 有重複連線")
        for link in node.get("links", []):
            if link.get("to") not in valid_ids:
                errors.append(f"{node.get('id')} 連到不存在的節點 {link.get('to')}")
            if link.get("to") == node.get("id"):
                errors.append(f"{node.get('id')} 不可連到自己")
    node_by_id = {node.get("id"): node for node in nodes if isinstance(node, dict)}
    missing_returns = sum(
        1
        for node in nodes if isinstance(node, dict)
        for link in node.get("links", [])
        if link.get("to") in node_by_id
        and not any(back.get("to") == node.get("id") for back in node_by_id[link["to"]].get("links", []))
    )
    cross_group_links = sum(
        1
        for node in nodes if isinstance(node, dict)
        for link in node.get("links", [])
        if link.get("to") in node_by_id
        and area_by_id.get(node.get("areaId"), {}).get("publicRegionId", node.get("areaId"))
        != area_by_id.get(node_by_id[link["to"]].get("areaId"), {}).get("publicRegionId", node_by_id[link["to"]].get("areaId"))
    )
    stats = {
        "nodes": len(nodes),
        "located": sum(bool(node.get("plan") or node.get("seat")) for node in nodes if isinstance(node, dict)),
        "headed": sum(bool(node.get("headingSet")) for node in nodes if isinstance(node, dict)),
        "linked": sum(bool(node.get("links")) for node in nodes if isinstance(node, dict)),
        "described": sum(bool(str(node.get("description", "")).strip()) for node in nodes if isinstance(node, dict)),
        "infoMarkers": sum(len(node.get("infoMarkers", [])) for node in nodes if isinstance(node, dict)),
        "crossGroupLinks": cross_group_links,
        "missingReturns": missing_returns,
        "denseScenes": sum(len(node.get("links", [])) > 12 for node in nodes if isinstance(node, dict)),
    }
    return errors, stats


class Handler(http.server.SimpleHTTPRequestHandler):
    @staticmethod
    def safe_path(root: Path, relative: str) -> str:
        root = root.resolve()
        candidate = (root / relative).resolve()
        try:
            candidate.relative_to(root)
        except ValueError:
            return str(root / "__not_found__")
        return str(candidate)

    def translate_path(self, path: str) -> str:
        clean = unquote(urlparse(path).path)
        if clean.startswith("/data/"):
            return self.safe_path(DATA, clean.removeprefix("/data/"))
        if clean.startswith("/repo/"):
            return self.safe_path(REPO, clean.removeprefix("/repo/"))
        return self.safe_path(TOOL, clean.lstrip("/"))

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def send_json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/status":
            if not WORKSPACE.exists():
                return self.send_json({"ok": False, "error": "尚未建立工作區"}, 404)
            workspace = json.loads(WORKSPACE.read_text(encoding="utf-8"))
            errors, stats = validate(workspace)
            return self.send_json({"ok": not errors, "errors": errors, "stats": stats})
        if path == "/":
            self.send_response(302)
            self.send_header("Location", "/editor.html")
            self.end_headers()
            return
        super().do_GET()

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/api/save":
            return self.send_error(404)
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length <= 0 or length > MAX_BODY:
                raise ValueError("資料大小不正確")
            workspace = json.loads(self.rfile.read(length).decode("utf-8"))
            errors, stats = validate(workspace)
            if errors:
                return self.send_json({"ok": False, "errors": errors, "stats": stats}, 422)
            DATA.mkdir(parents=True, exist_ok=True)
            backups = DATA / "backups"
            backups.mkdir(exist_ok=True)
            if WORKSPACE.exists():
                stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S-%f")
                shutil.copy2(WORKSPACE, backups / f"workspace-{stamp}.json")
            workspace["updatedAt"] = dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).isoformat(timespec="seconds")
            temp = WORKSPACE.with_suffix(".tmp.json")
            temp.write_text(json.dumps(workspace, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            temp.replace(WORKSPACE)
            return self.send_json({"ok": True, "stats": stats, "savedAt": workspace["updatedAt"]})
        except Exception as error:
            return self.send_json({"ok": False, "error": str(error)}, 400)

    def log_message(self, *_args) -> None:
        pass


if __name__ == "__main__":
    if not WORKSPACE.exists():
        raise SystemExit("尚未建立工作區；請先執行 prepare_workspace.py。")
    print(f"整合標注工具：http://127.0.0.1:{PORT}/editor.html")
    print(f"人工成果：{WORKSPACE}")
    os.chdir(TOOL)
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
