#!/usr/bin/env node
/* 全站連結檢查：每一次改導覽、改檔名、改分類都可能留下死連結，
   而死連結不會讓網站壞掉——它只會安靜地存在，直到有人點到。
   這支把站內每一個 href/src 都走過一次，確認目標真的存在。

   檢查四件事：
     1. 站內連結指到不存在的檔案
     2. #錨點 指到頁面上不存在的 id
     3. 圖片、CSS、JS 的來源檔不存在
     4. 導覽列「孤兒設定」：navActive 指到導覽列裡已經沒有的項目
*/
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];
// templates/ 是含 {{變數}} 的模板碎片，tools/ 是本機小工具（用自己的伺服器根路徑），
// 兩者都不是網站上的頁面，檢查它們只會製造假警報。
const skipDirs = new Set(['node_modules', '.git', 'scripts', 'content', 'data', '.github', 'templates', 'tools']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(root);
const idsByFile = new Map();
function idsOf(file) {
  if (idsByFile.has(file)) return idsByFile.get(file);
  let set = new Set();
  try {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/\sid="([^"]+)"/g)) set.add(match[1]);
    for (const match of html.matchAll(/\sname="([^"]+)"/g)) set.add(match[1]);
  } catch { /* 讀不到就當作沒有 id */ }
  idsByFile.set(file, set);
  return set;
}

let checked = 0;
for (const file of files) {
  const rel = path.relative(root, file);
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  // 導覽列孤兒設定：如果這一頁本身就在導覽列裡（或屬於某個導覽分區），
  // 那一定要剛好有一個亮著。首頁、網站地圖這種不在導覽列裡的頁面本來就是 0 個。
  if (/<ul class="nav-links">/.test(html)) {
    const nav = html.match(/<ul class="nav-links">[\s\S]*?<\/ul>/)[0];
    const active = (nav.match(/class="[^"]*\bactive\b[^"]*"/g) || []).length;
    const targets = [...nav.matchAll(/href="([^"]+)"/g)]
      .map((m) => m[1].split('#')[0])
      .filter((href) => href.endsWith('.html') && !/^https?:/i.test(href))
      .map((href) => path.relative(root, path.resolve(dir, href)));
    const own = rel;
    const insideSection = /^(news|people|concerts|gallery)\//.test(rel);
    const shouldHaveActive = insideSection || targets.includes(own);
    if (shouldHaveActive && active !== 1) {
      errors.push(`${rel}: 導覽列有 ${active} 個亮著的項目（應該剛好 1 個）`);
    }
    if (!shouldHaveActive && active > 1) {
      errors.push(`${rel}: 導覽列有 ${active} 個亮著的項目（這一頁不在導覽列裡，應該 0 個）`);
    }
  }

  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].trim();
    if (!raw) continue;
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(raw)) {
      // 頁內錨點
      if (raw.startsWith('#') && raw.length > 1) {
        const id = decodeURIComponent(raw.slice(1));
        if (!idsOf(file).has(id)) warnings.push(`${rel}: 頁內錨點 ${raw} 找不到對應的 id`);
      }
      continue;
    }
    checked += 1;
    const [pathPart, hash] = raw.split('#');
    const clean = decodeURIComponent(pathPart.split('?')[0]);
    if (!clean) continue;
    const target = clean.startsWith('/')
      ? path.join(root, clean.replace(/^\/+/, ''))
      : path.resolve(dir, clean);
    const finalTarget = fs.existsSync(target) && fs.statSync(target).isDirectory()
      ? path.join(target, 'index.html')
      : target;
    if (!fs.existsSync(finalTarget)) {
      errors.push(`${rel}: 連到不存在的檔案 → ${raw}`);
      continue;
    }
    // 名錄、影像館、編號這幾頁的內容是打開後才用 JavaScript 產生的，
    // 靜態檔裡查不到那些 id，錨點檢查會全部誤報。
    const jsRendered = /(?:^|\/)(roster|numbers)\.html$/.test(clean) || /(?:^|\/)photos\//.test(clean);
    if (hash && finalTarget.endsWith('.html') && !jsRendered) {
      const id = decodeURIComponent(hash);
      if (id && !idsOf(finalTarget).has(id)) {
        warnings.push(`${rel}: ${raw} 的錨點在目標頁面找不到`);
      }
    }
  }
}

console.log(`檢查 ${files.length} 個頁面、${checked} 條站內連結`);
if (warnings.length) {
  console.log(`\n提醒（${warnings.length}）：`);
  for (const w of warnings.slice(0, 40)) console.log('  ·', w);
  if (warnings.length > 40) console.log(`  …還有 ${warnings.length - 40} 條`);
}
if (errors.length) {
  console.log(`\n錯誤（${errors.length}）：`);
  for (const e of errors) console.log('  ✗', e);
  process.exitCode = 1;
} else {
  console.log('\n結果：沒有死連結');
}
