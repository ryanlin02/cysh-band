#!/usr/bin/env python3
"""依四區開場視角產生 960×540 場景入口卡；只寫入本機 staging。"""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
from pathlib import Path


TOOL = Path(__file__).resolve().parent
REPO = TOOL.parents[1]
LOCAL = REPO / "local" / "hall-tour-editor"
WORKSPACE = LOCAL / "workspace.json"
ASSETS = LOCAL / "public-assets"
OUTPUT = ASSETS / "scene-cards"
ENTRIES = {
    "auditorium-1f": "auditorium-1f",
    "auditorium-2f": "auditorium-2f",
    "stage-services": "stage",
    "greenroom": "greenroom",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    if not shutil.which("ffmpeg") or not shutil.which("cwebp") or not shutil.which("webpinfo"):
        raise SystemExit("缺少 ffmpeg、cwebp 或 webpinfo")
    workspace = json.loads(WORKSPACE.read_text(encoding="utf-8"))
    areas = {area["id"]: area for area in workspace["areas"]}
    nodes = {node["id"]: node for node in workspace["nodes"]}
    OUTPUT.mkdir(parents=True, exist_ok=True)
    records = []

    for area_id, card_id in ENTRIES.items():
        area = areas[area_id]
        node = nodes[area["entryNode"]]
        view = area["entryView"]
        source = ASSETS / "pano" / f"{node['id']}-full.webp"
        target = OUTPUT / f"{card_id}.webp"
        temp_png = OUTPUT / f".{card_id}.tmp.png"
        temp_webp = OUTPUT / f".{card_id}.tmp.webp"
        yaw = ((float(view["yaw"]) + 180) % 360) - 180
        pitch = float(view["pitch"])
        vf = (
            f"v360=input=equirect:output=flat:yaw={yaw}:pitch={pitch}:"
            "h_fov=92:v_fov=56:w=1280:h=720"
        )
        ffmpeg = subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
             "-vf", vf, "-frames:v", "1", str(temp_png)],
            check=False, capture_output=True, text=True,
        )
        if ffmpeg.returncode:
            raise SystemExit(ffmpeg.stderr.strip() or f"無法產生 {card_id} 視角")
        cwebp = subprocess.run(
            ["cwebp", "-quiet", "-mt", "-m", "5", "-q", "82", "-resize", "960", "540",
             "-metadata", "none", str(temp_png), "-o", str(temp_webp)],
            check=False, capture_output=True, text=True,
        )
        temp_png.unlink(missing_ok=True)
        if cwebp.returncode:
            raise SystemExit(cwebp.stderr.strip() or f"無法壓縮 {card_id}")
        temp_webp.replace(target)
        check = subprocess.run(["webpinfo", "-summary", str(target)], capture_output=True, text=True)
        if check.returncode or "Width: 960" not in check.stdout or "Height: 540" not in check.stdout:
            raise SystemExit(f"入口卡驗證失敗：{target}")
        records.append({
            "id": card_id,
            "areaId": area_id,
            "entryNode": node["id"],
            "entryView": view,
            "path": f"scene-cards/{target.name}",
            "width": 960,
            "height": 540,
            "bytes": target.stat().st_size,
            "sha256": sha256(target),
        })
        print(f"完成：{card_id} ← {node['id']}")

    (OUTPUT / "manifest.json").write_text(
        json.dumps({"count": len(records), "cards": records}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"入口卡清冊：{OUTPUT / 'manifest.json'}")


if __name__ == "__main__":
    main()
