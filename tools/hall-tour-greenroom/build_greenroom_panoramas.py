#!/usr/bin/env python3
"""將地下休息室原始環景照片轉成標記工具使用的三級 WebP。"""

import argparse
import glob
import json
import os
from multiprocessing import Pool, cpu_count
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
TIERS = (("preview", 2048, 76), ("mid", 4096, 78), ("full", 6144, 78))


def process(job):
    index, source, output, force = job
    node_id = f"gre-{index + 1:02d}"
    image = Image.open(source).convert("RGB")
    if abs(image.width / image.height - 2) > 0.02:
        raise ValueError(f"{source.name} 不是 2:1 環景照片（目前 {image.width}×{image.height}）")

    sizes = {}
    for label, width, quality in TIERS:
        target = output / "pano" / f"{node_id}-{label}.webp"
        if force or not target.exists() or target.stat().st_size == 0:
            image.resize((width, width // 2), Image.Resampling.LANCZOS).save(
                target, "WEBP", quality=quality, method=5
            )
        sizes[label] = round(target.stat().st_size / 1024)

    return {
        "id": node_id,
        "name": f"地下室休息室 {index + 1:02d}",
        "floor": "B1",
        "source": source.name,
        "sizeKB": sizes,
        "plan": None,
        "heading": 0,
        "headingSet": False,
        "preview": f"pano/{node_id}-preview.webp",
        "mid": f"pano/{node_id}-mid.webp",
        "full": f"pano/{node_id}-full.webp",
        "links": [],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="28 張原始 JPG 所在資料夾")
    parser.add_argument("output", type=Path, help="本機標記資料夾")
    parser.add_argument("--force", action="store_true", help="重新轉檔，不沿用既有 WebP")
    args = parser.parse_args()

    files = sorted(args.source.glob("*.JPG"))
    if not files:
        raise SystemExit(f"找不到 JPG：{args.source}")
    if len(files) != 28:
        print(f"提醒：目前找到 {len(files)} 張；仍會依拍攝時間與檔名順序建立節點。")

    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / "pano").mkdir(exist_ok=True)
    previous_path = args.output / "nodes.json"
    previous = {}
    if previous_path.exists():
        previous = {node["id"]: node for node in json.loads(previous_path.read_text())}

    jobs = [(i, file, args.output, args.force) for i, file in enumerate(files)]
    print(f"處理 {len(jobs)} 張地下室環景照片，使用最多 {min(cpu_count(), 4)} 個工作行程…")
    with Pool(min(cpu_count(), 4)) as pool:
        nodes = pool.map(process, jobs)

    for node in nodes:
        old = previous.get(node["id"])
        if not old:
            continue
        for field in ("name", "plan", "heading", "headingSet", "links", "description", "hotspots"):
            if field in old:
                node[field] = old[field]

    previous_path.write_text(json.dumps(nodes, ensure_ascii=False, indent=2) + "\n")
    print(f"完成：{len(nodes)} 個節點，標記檔已建立於 {previous_path}")


if __name__ == "__main__":
    main()
