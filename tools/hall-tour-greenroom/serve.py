#!/usr/bin/env python3
"""地下休息室標記工具的本機伺服器；人工成果只寫入 local/。"""

import datetime
import http.server
import json
import shutil
from pathlib import Path
from urllib.parse import unquote, urlparse

PORT = 8091
TOOL = Path(__file__).resolve().parent
DATA = TOOL.parents[1] / "local" / "hall-tour-greenroom"
NODES = DATA / "nodes.json"


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean = unquote(urlparse(path).path)
        if clean.startswith("/data/"):
            return str(DATA / clean.removeprefix("/data/"))
        return super().translate_path(clean)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

    def do_POST(self):
        if urlparse(self.path).path != "/save":
            return self.send_error(404)
        try:
            length = int(self.headers.get("Content-Length", 0))
            nodes = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(nodes, list) or not nodes or not all(str(n.get("id", "")).startswith("gre-") for n in nodes):
                raise ValueError("標記資料格式不正確")
            DATA.mkdir(parents=True, exist_ok=True)
            if NODES.exists():
                backup = DATA / "backup"
                backup.mkdir(exist_ok=True)
                stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
                shutil.copy2(NODES, backup / f"nodes-{stamp}.json")
            NODES.write_text(json.dumps(nodes, ensure_ascii=False, indent=2) + "\n")
            result = {"ok": True, "saved": len(nodes), "located": sum(bool(n.get("plan")) for n in nodes)}
        except Exception as error:
            result = {"ok": False, "error": str(error)}
        body = json.dumps(result, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    DATA.mkdir(parents=True, exist_ok=True)
    print(f"地下室標記工具：http://127.0.0.1:{PORT}/annotate.html")
    print(f"人工成果：{NODES}")
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    import os
    os.chdir(TOOL)
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
