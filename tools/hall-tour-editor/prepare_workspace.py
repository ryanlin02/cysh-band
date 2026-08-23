#!/usr/bin/env python3
"""清點新版 105 張環景照片，建立整合標注工具的本機工作區。"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import json
import os
import re
import shutil
import struct
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


REPO = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT = REPO / "local" / "hall-tour-editor"
PLAN_SOURCE = REPO / "assets" / "hall-tour" / "plan"
PREVIEW_WIDTH = 2048
PREVIEW_HEIGHT = 1024

AREAS = (
    {
        "id": "auditorium-1f",
        "name": "觀眾席一樓",
        "folder": "20260820_照片｜觀眾席一樓",
        "floor": "1F",
        "prefix": "aud",
        "numberStart": 1,
        "expected": 35,
        "publicRegionId": "auditorium",
        "mapType": "seats",
        "plan": None,
    },
    {
        "id": "auditorium-2f",
        "name": "觀眾席二樓",
        "folder": "20260820_照片｜觀眾席二樓",
        "floor": "2F",
        "prefix": "aud",
        "numberStart": 36,
        "expected": 16,
        "publicRegionId": "auditorium",
        "mapType": "seats",
        "plan": None,
    },
    {
        "id": "stage-services",
        "name": "舞台與貴賓室",
        "folder": "20260820_照片｜演出舞台與樂池與貴賓室",
        "floor": "待確認",
        "prefix": "stg",
        "numberStart": 1,
        "expected": 17,
        "publicRegionId": "stage",
        "mapType": "plan",
        "plan": "plans/1F.png",
    },
    {
        "id": "greenroom",
        "name": "演出團隊休息區",
        "folder": "20260820_照片｜地下室休息室",
        "floor": "B1",
        "prefix": "gre",
        "numberStart": 1,
        "expected": 37,
        "publicRegionId": "greenroom",
        "mapType": "plan",
        "plan": "plans/B1.png",
    },
)


def now_iso() -> str:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).isoformat(timespec="seconds")


def capture_number(path: Path) -> int:
    match = re.search(r"_(\d{4})_D\.[^.]+$", path.name, re.IGNORECASE)
    return int(match.group(1)) if match else 10**9


def jpeg_size(path: Path) -> tuple[int, int]:
    """Read JPEG dimensions without third-party Python packages."""
    with path.open("rb") as file:
        if file.read(2) != b"\xff\xd8":
            raise ValueError(f"不是 JPEG：{path}")
        while True:
            byte = file.read(1)
            if not byte:
                break
            if byte != b"\xff":
                continue
            while byte == b"\xff":
                byte = file.read(1)
            marker = byte[0]
            if marker in (0xD8, 0xD9) or 0xD0 <= marker <= 0xD7:
                continue
            length_raw = file.read(2)
            if len(length_raw) != 2:
                break
            length = struct.unpack(">H", length_raw)[0]
            if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
                data = file.read(5)
                if len(data) != 5:
                    break
                height, width = struct.unpack(">HH", data[1:5])
                return width, height
            file.seek(length - 2, os.SEEK_CUR)
    raise ValueError(f"讀不到 JPEG 尺寸：{path}")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def list_photos(folder: Path) -> list[Path]:
    photos = [p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg"}]
    return sorted(photos, key=lambda p: (capture_number(p), p.name.casefold()))


def copy_plans(output: Path) -> None:
    target = output / "plans"
    target.mkdir(parents=True, exist_ok=True)
    for name in ("1F.png", "2F.png", "B1.png"):
        source = PLAN_SOURCE / name
        if not source.exists():
            raise FileNotFoundError(f"缺少既有平面圖：{source}")
        shutil.copy2(source, target / name)


def encode_preview(source: Path, target: Path, force: bool) -> tuple[str, int]:
    if target.exists() and target.stat().st_size > 0 and not force:
        return target.name, target.stat().st_size
    target.parent.mkdir(parents=True, exist_ok=True)
    temp = target.with_suffix(".tmp.webp")
    command = [
        "cwebp",
        "-quiet",
        "-mt",
        "-q",
        "72",
        "-resize",
        str(PREVIEW_WIDTH),
        str(PREVIEW_HEIGHT),
        str(source),
        "-o",
        str(temp),
    ]
    try:
        subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
        temp.replace(target)
    except Exception:
        temp.unlink(missing_ok=True)
        raise
    return target.name, target.stat().st_size


def preserved_fields(previous: dict | None) -> dict:
    if not previous:
        return {}
    fields = (
        "name",
        "floor",
        "spaceType",
        "description",
        "seat",
        "plan",
        "heading",
        "headingSet",
        "links",
        "infoMarkers",
        "notes",
    )
    return {field: previous[field] for field in fields if field in previous}


def create_snapshot(output: Path) -> Path:
    backups = output / "backups"
    backups.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    snapshot = backups / f"tour-baseline-{stamp}.tar.gz"
    tracked = (
        "data/tour.js",
        "data/tour-entry-views.js",
        "assets/hall-tour/links.js",
        "assets/hall-tour/plan-map.js",
        "tools/hall-tour-greenroom",
        "tools/hall-tour-scene-calibrator",
        "scripts/import-region.js",
        "scripts/prepare-greenroom-public.js",
        "音樂廳導覽維護手冊.md",
    )
    import tarfile

    with tarfile.open(snapshot, "w:gz") as archive:
        for relative in tracked:
            source = REPO / relative
            if source.exists():
                archive.add(source, arcname=relative)
    return snapshot


def validate_workspace(output: Path, workspace: dict | None = None) -> list[str]:
    errors: list[str] = []
    workspace_path = output / "workspace.json"
    inventory_path = output / "inventory.json"
    if workspace is None:
        if not workspace_path.exists():
            return [f"缺少 {workspace_path}"]
        workspace = json.loads(workspace_path.read_text(encoding="utf-8"))
    nodes = workspace.get("nodes", [])
    expected_total = workspace.get("project", {}).get("photoCount")
    if isinstance(expected_total, int) and len(nodes) != expected_total:
        errors.append(f"節點應為 {expected_total} 個，目前 {len(nodes)} 個")
    ids = [node.get("id") for node in nodes]
    if len(ids) != len(set(ids)):
        errors.append("節點 ID 有重複")
    local_nodes = [node for node in nodes if node.get("source", {}).get("relativePath")]
    sources = [node.get("source", {}).get("relativePath") for node in local_nodes]
    if len(sources) != len(set(sources)):
        errors.append("來源照片有重複")
    for node in local_nodes:
        source = node.get("source", {})
        width, height = source.get("width", 0), source.get("height", 0)
        if not width or not height or abs(width / height - 2) > 0.02:
            errors.append(f"{node.get('id')} 不是有效的 2:1 環景尺寸")
        preview = output / node.get("panorama", {}).get("preview", "")
        if not preview.is_file() or preview.stat().st_size == 0:
            errors.append(f"{node.get('id')} 缺少 WebP 預覽")
    if not inventory_path.exists():
        errors.append("缺少 inventory.json")
    for area in workspace.get("areas", []):
        count = sum(node.get("areaId") == area.get("id") for node in nodes)
        if count != area.get("expectedCount"):
            errors.append(f"{area.get('name')} 應有 {area.get('expectedCount')} 張，目前 {count} 張")
        if area.get("mapType") == "seats":
            for node in (item for item in nodes if item.get("areaId") == area.get("id") and item.get("seat")):
                if not re.match(rf"^{re.escape(area.get('floor', ''))}-\d+-\d+$", node["seat"]):
                    errors.append(f"{node.get('id')} 的座位代碼錯誤")
        else:
            plan_value = area.get("plan")
            plan = output / plan_value if plan_value else None
            if not plan or not plan.is_file():
                errors.append(f"{area.get('name')} 缺少平面圖")
    return errors


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source_root", type=Path, help="包含四個照片資料夾的根目錄")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="本機工作區")
    parser.add_argument("--jobs", type=int, default=2, help="同時轉檔數，預設 2")
    parser.add_argument("--force", action="store_true", help="強制重做 WebP 預覽")
    parser.add_argument("--validate-only", action="store_true", help="只驗證既有工作區")
    parser.add_argument("--no-snapshot", action="store_true", help="不建立基準備份")
    args = parser.parse_args()
    source_root = args.source_root.expanduser().resolve()
    output = args.output.expanduser().resolve()

    if args.validate_only:
        errors = validate_workspace(output)
        if errors:
            print("驗證失敗：")
            print("\n".join(f"- {error}" for error in errors))
            raise SystemExit(1)
        workspace = json.loads((output / "workspace.json").read_text(encoding="utf-8"))
        local_count = sum(bool(node.get("source", {}).get("relativePath")) for node in workspace["nodes"])
        print(f"驗證通過：{len(workspace['nodes'])} 個節點、{local_count} 張本機 2:1 照片與 WebP 預覽。")
        return

    if shutil.which("cwebp") is None:
        raise SystemExit("找不到 cwebp；請先安裝 WebP 工具後再執行。")
    if not source_root.is_dir():
        raise SystemExit(f"找不到來源根目錄：{source_root}")

    output.mkdir(parents=True, exist_ok=True)
    (output / "panos").mkdir(exist_ok=True)
    copy_plans(output)

    snapshot = None
    if not args.no_snapshot and not list((output / "backups").glob("tour-baseline-*.tar.gz")):
        snapshot = create_snapshot(output)

    previous_path = output / "workspace.json"
    previous_workspace = json.loads(previous_path.read_text(encoding="utf-8")) if previous_path.exists() else {}
    previous_by_source = {
        node.get("source", {}).get("relativePath"): node for node in previous_workspace.get("nodes", [])
    }
    previous_areas = {area.get("id"): area for area in previous_workspace.get("areas", [])}

    inventory: list[dict] = []
    nodes: list[dict] = []
    area_records: list[dict] = []
    preview_jobs: list[tuple[Path, Path, bool]] = []

    print("清點來源照片並計算 SHA-256…", flush=True)
    for area in AREAS:
        folder = source_root / area["folder"]
        if not folder.is_dir():
            raise SystemExit(f"缺少照片資料夾：{folder}")
        photos = list_photos(folder)
        if len(photos) != area["expected"]:
            raise SystemExit(f"{area['name']} 應有 {area['expected']} 張，目前找到 {len(photos)} 張")
        prior_area = previous_areas.get(area["id"], {})
        area_record = {
            "id": area["id"],
            "name": area["name"],
            "floor": area["floor"],
            "expectedCount": area["expected"],
            "publicRegionId": area["publicRegionId"],
            "mapType": area["mapType"],
            "plan": area["plan"],
            "planNote": "舞台與貴賓室目前暫用 1F 平面圖，需由現場熟悉者確認。" if area["id"] == "stage-services" else "",
            "entryNode": prior_area.get("entryNode"),
            "entryView": prior_area.get("entryView"),
        }
        area_records.append(area_record)

        for local_index, photo in enumerate(photos):
            number = area["numberStart"] + local_index
            node_id = f"{area['prefix']}-{number:03d}"
            relative_source = str(photo.relative_to(source_root))
            width, height = jpeg_size(photo)
            if abs(width / height - 2) > 0.02:
                raise SystemExit(f"不是 2:1 環景照片：{photo.name}（{width}×{height}）")
            digest = sha256(photo)
            source_record = {
                "file": photo.name,
                "relativePath": relative_source,
                "bytes": photo.stat().st_size,
                "width": width,
                "height": height,
                "sha256": digest,
                "captureNumber": capture_number(photo),
            }
            inventory.append({"id": node_id, "areaId": area["id"], **source_record})
            preview_path = output / "panos" / f"{node_id}.webp"
            preview_jobs.append((photo, preview_path, args.force))
            old = previous_by_source.get(relative_source)
            default_node = {
                "id": node_id,
                "number": number,
                "areaId": area["id"],
                "publicRegionId": area["publicRegionId"],
                "name": f"{area['name']} {number:02d}",
                "floor": area["floor"],
                "spaceType": "待分類" if area["id"] == "stage-services" else "",
                "description": "",
                "source": source_record,
                "panorama": {"preview": f"panos/{node_id}.webp"},
                "seat": None,
                "plan": None,
                "heading": 0,
                "headingSet": False,
                "links": [],
                "infoMarkers": [],
                "notes": "",
            }
            default_node.update(preserved_fields(old))
            if area["id"] == "greenroom" and default_node["name"] == f"地下室休息室 {number:02d}":
                default_node["name"] = f"演出團隊休息區 {number:02d}"
            nodes.append(default_node)

    configured_total = sum(area["expected"] for area in AREAS)
    if len(nodes) != configured_total:
        raise SystemExit(f"目前設定的本機照片應為 {configured_total} 張，實際為 {len(nodes)} 張")
    hashes = [item["sha256"] for item in inventory]
    if len(hashes) != len(set(hashes)):
        raise SystemExit("照片內容 SHA-256 有重複；請先確認來源。")

    print(f"建立 {len(preview_jobs)} 張 {PREVIEW_WIDTH}×{PREVIEW_HEIGHT} WebP 標注預覽…", flush=True)
    completed = 0
    with ThreadPoolExecutor(max_workers=max(1, min(args.jobs, 4))) as executor:
        futures = {executor.submit(encode_preview, *job): job[0] for job in preview_jobs}
        for future in as_completed(futures):
            source = futures[future]
            try:
                future.result()
            except Exception as error:
                raise SystemExit(f"WebP 轉檔失敗：{source.name}\n{error}") from error
            completed += 1
            if completed % 10 == 0 or completed == len(preview_jobs):
                print(f"  已完成 {completed}/{len(preview_jobs)}", flush=True)

    generated_area_by_id = {area["id"]: area for area in area_records}
    ordered_areas = []
    for previous_area in previous_workspace.get("areas", []):
        area_id = previous_area.get("id")
        ordered_areas.append(generated_area_by_id.pop(area_id, previous_area))
    ordered_areas.extend(generated_area_by_id.values())
    external_nodes = [
        node for node in previous_workspace.get("nodes", [])
        if not node.get("source", {}).get("relativePath")
    ]
    all_nodes = external_nodes + nodes

    workspace = {
        "schemaVersion": 1,
        "project": {
            "name": "嘉義市政府文化局音樂廳 360 導覽",
            "mode": "local-integrated-annotation" if external_nodes else "local-annotation-draft",
            "sourceRoot": str(source_root),
            "photoCount": len(all_nodes),
            "localPhotoCount": len(nodes),
            "existingPhotoCount": len(external_nodes),
            "publicDataUntouched": True,
        },
        "createdAt": previous_workspace.get("createdAt", now_iso()),
        "updatedAt": now_iso(),
        "areas": ordered_areas,
        "nodes": all_nodes,
    }

    if previous_path.exists():
        backup_dir = output / "backups"
        backup_dir.mkdir(exist_ok=True)
        stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
        shutil.copy2(previous_path, backup_dir / f"workspace-before-prepare-{stamp}.json")
    previous_path.write_text(json.dumps(workspace, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (output / "inventory.json").write_text(
        json.dumps({"generatedAt": now_iso(), "sourceRoot": str(source_root), "count": len(inventory), "photos": inventory}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    with (output / "inventory.csv").open("w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=("id", "areaId", "file", "relativePath", "captureNumber", "width", "height", "bytes", "sha256"))
        writer.writeheader()
        writer.writerows(inventory)

    errors = validate_workspace(output, workspace)
    if errors:
        print("建立完成但驗證失敗：", file=sys.stderr)
        print("\n".join(f"- {error}" for error in errors), file=sys.stderr)
        raise SystemExit(1)

    print(f"完成：{len(nodes)} 張本機照片與預覽、工作區共 {len(all_nodes)} 個節點。")
    print(f"清冊：{output / 'inventory.csv'}")
    print(f"標注資料：{previous_path}")
    if snapshot:
        print(f"基準備份：{snapshot}")


if __name__ == "__main__":
    main()
