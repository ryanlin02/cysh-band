import { createSearchEngine, normalize } from "./search-engine.mjs";

let engine = null;
let suggestions = null;

self.addEventListener("message", async (event) => {
  try {
    if (event.data?.type === "init") {
      const [
        docsResponse,
        suggestionsResponse,
        rulesResponse,
        synonymsResponse,
      ] = await Promise.all([
        fetch(event.data.docsUrl),
        fetch(event.data.suggestionsUrl),
        fetch(event.data.rulesUrl),
        fetch(event.data.synonymsUrl),
      ]);
      for (const [label, response] of [
        ["搜尋資料", docsResponse],
        ["搜尋建議", suggestionsResponse],
        ["排序規則", rulesResponse],
        ["同義詞", synonymsResponse],
      ]) {
        if (!response.ok) throw new Error(`${label}載入失敗：${response.status}`);
      }
      const [
        docsPayload,
        suggestionsPayload,
        rules,
        synonymsPayload,
      ] = await Promise.all([
        docsResponse.json(),
        suggestionsResponse.json(),
        rulesResponse.json(),
        synonymsResponse.json(),
      ]);
      engine = createSearchEngine({
        docs: docsPayload.docs,
        rules,
        synonyms: synonymsPayload,
      });
      suggestions = suggestionsPayload.suggestions.map(
        ([term, count, sourceTier]) => [
          term, normalize(term), count, sourceTier,
        ]
      );
      self.postMessage({
        type: "ready",
        documents: docsPayload.docs.length,
        suggestions: suggestions.length,
        rulesVersion: rules.version,
        synonymsVersion: synonymsPayload.version,
      });
      return;
    }
    if (event.data?.type === "query") {
      if (!engine) throw new Error("搜尋引擎尚未初始化");
      self.postMessage({
        type: "results",
        requestId: event.data.requestId,
        ...engine.search(event.data.query, { filters: event.data.filters }),
      });
      return;
    }
    if (event.data?.type === "suggest") {
      const needle = normalize(event.data.query);
      const results = needle
        ? suggestions
          .filter((row) => row[1].includes(needle) && row[1] !== needle)
          .slice(0, 8)
          .map(([term, _normalized, count, sourceTier]) => [
            term, count, sourceTier,
          ])
        : [];
      self.postMessage({
        type: "suggestions",
        requestId: event.data.requestId,
        results,
      });
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      requestId: event.data?.requestId,
      message: error instanceof Error ? error.message : String(error),
    });
  }
});
