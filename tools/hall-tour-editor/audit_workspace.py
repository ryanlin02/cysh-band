#!/usr/bin/env python3
"""稽核新版 360 導覽工作區；內容可留待後續補充，不修改人工資料。"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import statistics
from collections import Counter, defaultdict
from pathlib import Path


TOOL = Path(__file__).resolve().parent
REPO = TOOL.parents[1]
DEFAULT_WORKSPACE = REPO / "local" / "hall-tour-editor" / "workspace.json"
DEFAULT_REPORT_DIR = REPO / "local" / "hall-tour-editor" / "reports"


def reachable(start: str | None, graph: dict[str, set[str]], allowed: set[str]) -> set[str]:
    if not start or start not in allowed:
        return set()
    seen = {start}
    queue = [start]
    for node_id in queue:
        for target_id in graph.get(node_id, set()) & allowed:
            if target_id not in seen:
                seen.add(target_id)
                queue.append(target_id)
    return seen


def audit(workspace: dict) -> dict:
    nodes = workspace.get("nodes", [])
    areas = workspace.get("areas", [])
    by_id = {node.get("id"): node for node in nodes}
    area_by_id = {area.get("id"): area for area in areas}
    graph = {node["id"]: set() for node in nodes}
    invalid: list[dict] = []
    reciprocal = 0
    cross_region = Counter()
    out_counts: list[int] = []

    for node in nodes:
        seen: set[str] = set()
        links = node.get("links") or []
        out_counts.append(len(links))
        for link in links:
            target_id = link.get("to")
            kind = None
            if target_id == node["id"]:
                kind = "self"
            elif target_id in seen:
                kind = "duplicate"
            elif target_id not in by_id:
                kind = "missing-target"
            if kind:
                invalid.append({"kind": kind, "from": node["id"], "to": target_id})
                continue
            seen.add(target_id)
            graph[node["id"]].add(target_id)
            target = by_id[target_id]
            if target["areaId"] != node["areaId"]:
                cross_region[(node["areaId"], target["areaId"])] += 1
            if any(item.get("to") == node["id"] for item in target.get("links") or []):
                reciprocal += 1

    area_results = []
    unreachable_total = 0
    bridge_suggestions = []
    for area in areas:
        area_nodes = [node for node in nodes if node.get("areaId") == area["id"]]
        ids = {node["id"] for node in area_nodes}
        reached = reachable(area.get("entryNode"), graph, ids)
        unreachable = sorted(
            (by_id[node_id] for node_id in ids - reached),
            key=lambda node: node.get("number", 0),
        )
        unreachable_total += len(unreachable)
        for node in unreachable:
            candidates = sorted(
                (by_id[target_id] for target_id in graph[node["id"]] & reached),
                key=lambda target: target.get("number", 0),
            )
            if candidates:
                target = candidates[0]
                bridge_suggestions.append({
                    "areaId": area["id"],
                    "areaName": area["name"],
                    "addFrom": target["id"],
                    "addFromNumber": target.get("number"),
                    "addTo": node["id"],
                    "addToNumber": node.get("number"),
                    "reason": f"反向 {node.get('number')} → {target.get('number')} 已存在",
                })
        area_results.append({
            "id": area["id"],
            "name": area["name"],
            "total": len(area_nodes),
            "positioned": sum(bool(node.get("seat") or node.get("plan")) for node in area_nodes),
            "headed": sum(bool(node.get("headingSet")) for node in area_nodes),
            "linkedScenes": sum(bool(node.get("links")) for node in area_nodes),
            "links": sum(len(node.get("links") or []) for node in area_nodes),
            "described": sum(bool(str(node.get("description", "")).strip()) for node in area_nodes),
            "infoMarkers": sum(len(node.get("infoMarkers") or []) for node in area_nodes),
            "entryNode": area.get("entryNode"),
            "entryViewSet": bool(area.get("entryView")),
            "reachableFromEntry": len(reached),
            "unreachable": [
                {"id": node["id"], "number": node.get("number"), "name": node.get("name")}
                for node in unreachable
            ],
        })

    total_links = sum(out_counts)
    all_basic = all(
        result["positioned"] == result["total"]
        and result["headed"] == result["total"]
        and result["linkedScenes"] == result["total"]
        and result["entryNode"]
        and result["entryViewSet"]
        for result in area_results
    )
    one_way = total_links - reciprocal
    cross_pairs = [
        {
            "from": source,
            "fromName": area_by_id.get(source, {}).get("name", source),
            "to": target,
            "toName": area_by_id.get(target, {}).get("name", target),
            "count": count,
            "reverseCount": cross_region.get((target, source), 0),
        }
        for (source, target), count in sorted(cross_region.items())
    ]
    stage_unclassified = sum(
        node.get("areaId") == "stage-services" and node.get("spaceType") in (None, "", "待分類")
        for node in nodes
    )
    high_density = sorted(
        (
            {
                "id": node["id"],
                "areaId": node["areaId"],
                "number": node.get("number"),
                "name": node.get("name"),
                "links": len(node.get("links") or []),
            }
            for node in nodes
            if len(node.get("links") or []) > 12
        ),
        key=lambda item: (-item["links"], item["id"]),
    )

    return {
        "generatedAt": dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).isoformat(timespec="seconds"),
        "workspaceUpdatedAt": workspace.get("updatedAt"),
        "summary": {
            "nodes": len(nodes),
            "basicAnnotationsComplete": all_basic,
            "positions": sum(bool(node.get("seat") or node.get("plan")) for node in nodes),
            "headings": sum(bool(node.get("headingSet")) for node in nodes),
            "linkedScenes": sum(bool(node.get("links")) for node in nodes),
            "links": total_links,
            "reciprocalLinks": reciprocal,
            "oneWayLinks": one_way,
            "invalidLinks": len(invalid),
            "descriptions": sum(bool(str(node.get("description", "")).strip()) for node in nodes),
            "infoMarkers": sum(len(node.get("infoMarkers") or []) for node in nodes),
            "stageUnclassified": stage_unclassified,
            "unreachableFromAreaEntries": unreachable_total,
            "linkDegreeMin": min(out_counts, default=0),
            "linkDegreeMedian": statistics.median(out_counts) if out_counts else 0,
            "linkDegreeMax": max(out_counts, default=0),
        },
        "readyForStaging": all_basic and not invalid,
        "readyForPublicRelease": all_basic and not invalid and unreachable_total == 0,
        "contentMayBeAddedLater": True,
        "areas": area_results,
        "invalidLinks": invalid,
        "crossRegion": cross_pairs,
        "bridgeSuggestions": bridge_suggestions,
        "highDensityScenes": high_density,
    }


def markdown(report: dict) -> str:
    summary = report["summary"]
    lines = [
        "# 360 導覽工作區稽核報告",
        "",
        f"- 產生時間：{report['generatedAt']}",
        f"- 工作區更新：{report.get('workspaceUpdatedAt') or '未記錄'}",
        f"- 基本標註：{'完成' if summary['basicAnnotationsComplete'] else '未完成'}",
        f"- 可建立本機正式草稿：{'是' if report['readyForStaging'] else '否'}",
        f"- 可直接公開：{'是' if report['readyForPublicRelease'] else '否，需先檢查動線'}",
        "- 內容欄位：可在之後增量補充，不必重做影像與定位",
        "",
        "## 完成度",
        "",
        "| 區域 | 位置 | 方向 | 有動線場景 | 動線 | 介紹 | 開場可達 |",
        "|---|---:|---:|---:|---:|---:|---:|",
    ]
    for area in report["areas"]:
        lines.append(
            f"| {area['name']} | {area['positioned']}/{area['total']} | {area['headed']}/{area['total']} | "
            f"{area['linkedScenes']}/{area['total']} | {area['links']} | {area['described']} | "
            f"{area['reachableFromEntry']}/{area['total']} |"
        )
    lines += [
        "",
        "## 動線摘要",
        "",
        f"- 總動線：{summary['links']}；雙向對應：{summary['reciprocalLinks']}；只有單向：{summary['oneWayLinks']}。",
        f"- 無效、自連或重複：{summary['invalidLinks']}。",
        f"- 每景動線數：最少 {summary['linkDegreeMin']}、中位數 {summary['linkDegreeMedian']}、最多 {summary['linkDegreeMax']}。",
        f"- 超過 12 顆移動點的場景：{len(report['highDensityScenes'])}。",
        "",
    ]
    for area in report["areas"]:
        if area["unreachable"]:
            points = "、".join(str(item["number"]) for item in area["unreachable"])
            lines.append(f"- {area['name']}從開場點無法依目前箭頭到達：{points}。")
    if report["bridgeSuggestions"]:
        lines += ["", "最少可先補以下返回位置（仍需在環景中人工點正確方向）："]
        for item in report["bridgeSuggestions"]:
            lines.append(
                f"- {item['areaName']}：在 #{item['addFromNumber']} 補一顆前往 #{item['addToNumber']} 的點；{item['reason']}。"
            )
    for pair in report["crossRegion"]:
        lines.append(
            f"- 跨區：{pair['fromName']} → {pair['toName']} {pair['count']} 條；反向 {pair['reverseCount']} 條。"
        )
    lines += [
        "",
        "## 後續處理界線",
        "",
        "- 本報告不修改 `workspace.json`。",
        "- 介紹與資訊點不是影像轉檔或本機草稿的阻擋項目，可稍後補充後重跑轉換。",
        "- 正式公開前仍需確認過密場景、跨區返回連線，以及既有前廳與新版觀眾席的門口銜接。",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", type=Path, default=DEFAULT_WORKSPACE)
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    args = parser.parse_args()
    workspace = json.loads(args.workspace.read_text(encoding="utf-8"))
    report = audit(workspace)
    args.report_dir.mkdir(parents=True, exist_ok=True)
    json_path = args.report_dir / "workspace-audit.json"
    md_path = args.report_dir / "workspace-audit.md"
    json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    md_path.write_text(markdown(report), encoding="utf-8")
    summary = report["summary"]
    print(f"基本標註：{'完成' if summary['basicAnnotationsComplete'] else '未完成'}")
    print(f"{summary['nodes']} 個場景：位置 {summary['positions']}、方向 {summary['headings']}、有動線 {summary['linkedScenes']}")
    print(f"動線：{summary['links']}（單向 {summary['oneWayLinks']}、無效 {summary['invalidLinks']}）")
    print(f"內容：介紹 {summary['descriptions']}、資訊點 {summary['infoMarkers']}；可稍後補充")
    print(f"報告：{md_path}")


if __name__ == "__main__":
    main()
