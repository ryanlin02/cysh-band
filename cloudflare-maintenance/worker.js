/**
 * cysh.band 全站維護頁
 *
 * 此 Worker 故意不向 GitHub Pages 或 R2 請求任何資源，避免路由啟用後
 * 維護頁又因自己的 CSS、圖片或 JavaScript 被攔截而無法顯示。
 */
const HTML = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>網站維護中</title>
  <style>
    :root {
      --bg: #faf8f3;
      --ink: #2b2721;
      --gold: #a07c31;
      --line: #e6dfd0;
    }

    * { box-sizing: border-box; }

    html, body { min-height: 100%; }

    body {
      align-items: center;
      background:
        linear-gradient(90deg, transparent 0 49.8%, rgba(160, 124, 49, .05) 49.8% 50.2%, transparent 50.2%),
        var(--bg);
      color: var(--ink);
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 2rem;
    }

    main {
      border-bottom: 1px solid var(--line);
      border-top: 3px solid var(--gold);
      max-width: min(31rem, 100%);
      padding: 2rem 2.5rem 2.15rem;
      text-align: center;
      width: 100%;
    }

    h1 {
      font-family: "Noto Serif TC", "Songti TC", "PMingLiU", serif;
      font-size: clamp(1.8rem, 6vw, 2.7rem);
      font-weight: 900;
      letter-spacing: .12em;
      line-height: 1.5;
      margin: 0;
    }

    @media (max-width: 480px) {
      main { padding: 1.6rem 1.25rem 1.75rem; }
    }
  </style>
</head>
<body>
  <main><h1>網站維護中</h1></main>
</body>
</html>`;

export default {
  fetch() {
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-store, max-age=0",
        "x-robots-tag": "noindex, nofollow, noarchive",
      },
    });
  },
};
