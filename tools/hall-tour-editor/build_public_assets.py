#!/usr/bin/env python3
"""由 105 張原始環景建立可續跑的三級 WebP；不修改原圖、不上傳 R2。"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

TOOL = Path(__file__).resolve().parent
REPO = TOOL.parents[1]
DEFAULT_WORKSPACE = REPO / "local" / "hall-tour-editor" / "workspace.json"
DEFAULT_OUTPUT = REPO / "local" / "hall-tour-editor" / "public-assets"
TIERS = (("preview", 2048, 76), ("mid", 4096, 78), ("full", 6144, 78))


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def valid_webp(path: Path, width: int) -> bool:
    if not path.exists() or path.stat().st_size == 0:
        return False
    try:
        result = subprocess.run(
            ["webpinfo", "-summary", str(path)],
            check=False,
            capture_output=True,
            text=True,
        )
        actual_width = re.search(r"^  Width: (\d+)$", result.stdout, re.MULTILINE)
        actual_height = re.search(r"^  Height: (\d+)$", result.stdout, re.MULTILINE)
        return (
            result.returncode == 0
            and "No error detected." in result.stdout
            and actual_width
            and actual_height
            and int(actual_width.group(1)) == width
            and int(actual_height.group(1)) == width // 2
        )
    except Exception:
        return False


def process_node(job: dict) -> dict:
    node_id = job["id"]
    source = Path(job["source"])
    local_preview = Path(job["localPreview"])
    output = Path(job["output"])
    force = job["force"]
    pano_dir = output / "pano"
    pano_dir.mkdir(parents=True, exist_ok=True)
    targets = {label: pano_dir / f"{node_id}-{label}.webp" for label, _, _ in TIERS}

    preview_target = targets["preview"]
    if force or not valid_webp(preview_target, 2048):
        temp = preview_target.with_suffix(".tmp.webp")
        shutil.copy2(local_preview, temp)
        temp.replace(preview_target)

    needed = [(label, width, quality) for label, width, quality in TIERS[1:]
              if force or not valid_webp(targets[label], width)]
    for label, width, quality in needed:
        target = targets[label]
        temp = target.with_suffix(".tmp.webp")
        result = subprocess.run(
            [
                "cwebp", "-quiet", "-mt", "-m", "5", "-q", str(quality),
                "-resize", str(width), str(width // 2), "-metadata", "none",
                str(source), "-o", str(temp),
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            raise ValueError(result.stderr.strip() or f"cwebp 無法處理 {source.name}")
        temp.replace(target)

    outputs = {}
    for label, width, _ in TIERS:
        target = targets[label]
        if not valid_webp(target, width):
            raise ValueError(f"{target.name} 尺寸或格式錯誤")
        outputs[label] = {
            "path": f"pano/{target.name}",
            "width": width,
            "height": width // 2,
            "bytes": target.stat().st_size,
            "sha256": sha256(target),
        }
    return {
        "id": node_id,
        "source": source.name,
        "sourceSha256": job["sourceSha256"],
        "outputs": outputs,
    }


def collect_jobs(workspace: dict, output: Path, force: bool) -> list[dict]:
    source_root = Path(workspace["project"]["sourceRoot"])
    preview_root = DEFAULT_WORKSPACE.parent
    jobs = []
    for node in workspace["nodes"]:
        if not node.get("source", {}).get("relativePath"):
            continue
        source = source_root / node["source"]["relativePath"]
        local_preview = preview_root / node["panorama"]["preview"]
        if not source.is_file():
            raise SystemExit(f"缺少原始照片：{source}")
        if not local_preview.is_file():
            raise SystemExit(f"缺少標注預覽：{local_preview}")
        if source.stat().st_size != node["source"]["bytes"]:
            raise SystemExit(f"原始照片大小已改變：{source}")
        jobs.append({
            "id": node["id"],
            "source": str(source),
            "localPreview": str(local_preview),
            "sourceSha256": node["source"]["sha256"],
            "output": str(output),
            "force": force,
        })
    return jobs


def validate(output: Path, workspace: dict) -> list[dict]:
    manifest_path = output / "manifest.json"
    if not manifest_path.exists():
        raise SystemExit(f"缺少影像清冊：{manifest_path}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    local_nodes = [node for node in workspace["nodes"] if node.get("source", {}).get("relativePath")]
    if manifest.get("count") != len(local_nodes):
        raise SystemExit("影像清冊數量不符")
    records = manifest.get("nodes", [])
    if {item["id"] for item in records} != {node["id"] for node in local_nodes}:
        raise SystemExit("影像清冊節點不符")
    for record in records:
        for label, width, _ in TIERS:
            target = output / record["outputs"][label]["path"]
            if not valid_webp(target, width):
                raise SystemExit(f"影像驗證失敗：{target}")
            if target.stat().st_size != record["outputs"][label]["bytes"]:
                raise SystemExit(f"影像大小與清冊不符：{target}")
    return records


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", type=Path, default=DEFAULT_WORKSPACE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--jobs", type=int, default=2)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--validate-only", action="store_true")
    args = parser.parse_args()
    workspace = json.loads(args.workspace.read_text(encoding="utf-8"))

    if not shutil.which("cwebp") or not shutil.which("webpinfo"):
        raise SystemExit("缺少 cwebp 或 webpinfo，無法建立與驗證 WebP")

    if args.validate_only:
        records = validate(args.output, workspace)
        total = sum(item["outputs"][tier]["bytes"] for item in records for tier, _, _ in TIERS)
        print(f"驗證通過：{len(records)} 個節點、{len(records) * 3} 個 WebP、{total / 1024 / 1024:.1f} MiB")
        return

    args.output.mkdir(parents=True, exist_ok=True)
    jobs = collect_jobs(workspace, args.output, args.force)
    records = []
    workers = max(1, min(args.jobs, 3))
    print(f"建立 {len(jobs)} 張環景的三級 WebP，使用 {workers} 個工作行程…", flush=True)
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(process_node, job): job["id"] for job in jobs}
        for index, future in enumerate(as_completed(futures), 1):
            try:
                records.append(future.result())
            except Exception as error:
                raise SystemExit(f"{futures[future]} 轉檔失敗：{error}") from error
            if index % 5 == 0 or index == len(jobs):
                print(f"  已完成 {index}/{len(jobs)}", flush=True)

    records.sort(key=lambda item: item["id"])
    total = sum(item["outputs"][tier]["bytes"] for item in records for tier, _, _ in TIERS)
    manifest = {
        "schemaVersion": 1,
        "workspaceUpdatedAt": workspace.get("updatedAt"),
        "count": len(records),
        "tiers": {label: {"width": width, "height": width // 2, "quality": quality}
                  for label, width, quality in TIERS},
        "totalBytes": total,
        "nodes": records,
    }
    (args.output / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    validate(args.output, workspace)
    print(f"完成：{len(records) * 3} 個 WebP、{total / 1024 / 1024:.1f} MiB")
    print(f"清冊：{args.output / 'manifest.json'}")


if __name__ == "__main__":
    main()
