#!/usr/bin/env node
/* 把節目冊上的指揮與獨奏，產生成會員平台可以匯入的 SQL。
 *
 * 為什麼要匯入：
 *   參與紀錄的規則是「節目冊是史實，本人是補充」。史實那一半要先有東西，
 *   本人填的才有東西可以比對——不然每一筆都只能靠人記憶去判斷。
 *
 * 對應方式：用校友編號。節目冊上沒有編號、或那個人還沒有會員帳號的，
 *   就跳過（SQL 裡用 join members 自然過濾掉），不會硬塞。
 *
 * 這份 SQL 可以重複執行：同一個人同一屆同一個身分只會有一筆，
 *   而且節目冊的版本會蓋掉本人自己填的（這正是資料主權要的結果）。
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = {};
require(path.join(root, 'data', 'concerts.js'));

const rows = [];
for (const concert of global.window.CONCERTS || []) {
  if (!Number.isInteger(concert.nth) || concert.status === 'cancelled') continue;
  for (const person of concert.conductors || []) {
    if (!/^\d{4}$/.test(String(person.num || ''))) continue;
    rows.push({ num: String(person.num), nth: concert.nth, role: '指揮', section: null, note: person.role || null });
  }
  for (const person of concert.soloists || []) {
    if (!/^\d{4}$/.test(String(person.num || ''))) continue;
    rows.push({ num: String(person.num), nth: concert.nth, role: '獨奏', section: person.instrument || null, note: person.work || null });
  }
}
// 同一個人同一屆同一個身分只留一筆（節目冊偶爾會重複列名）
const seen = new Set();
const unique = rows.filter((row) => {
  const key = `${row.num}|${row.nth}|${row.role}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

const quote = (value) => (value === null || value === undefined || value === '' ? 'null' : `'${String(value).slice(0, 120).replace(/'/g, "''")}'`);
const values = unique.map((row) => `  ('${row.num}', ${row.nth}, '${row.role}', ${quote(row.section)}, ${quote(row.note)})`).join(',\n');

const sql = `-- ============================================================
-- 0060：把節目冊上的指揮與獨奏匯入參與紀錄
--
-- 執行方式照 SETUP.md：
--   supabase.com → 你的專案 → 左邊 SQL Editor → + New query
--   → 把這個檔案整個貼上 → 按 Run → 看到綠色 Success 就好
--
-- 這一份可以重複執行。
--
-- 由官網的 scripts/export-participation-sql.js 從 data/concerts.js 產生，
-- 不要手改；節目冊資料更新之後重新產生一份即可。
-- 產生時間：${new Date().toISOString().slice(0, 10)}　共 ${unique.length} 筆
--
-- 規則（見 PUBLIC_PROFILE_DESIGN.md）：
--   節目冊是史實 → source='program'、status='confirmed'，
--   而且會蓋掉本人自己填的同一筆（本人填的不能改寫節目冊）。
--   節目冊上沒有校友編號、或那個人還沒有會員帳號的，這裡自然不會匯入。
-- ============================================================

with program(alumni_number, edition, role, section, note) as (
  values
${values}
)
insert into public.alumni_participation
  (member_id, concert_edition, role, section, note, source, status, reviewed_at)
select m.id, p.edition, p.role, p.section, p.note, 'program', 'confirmed', now()
from program p
join public.members m on m.alumni_number = p.alumni_number
on conflict (member_id, concert_edition, role) do update
set section = excluded.section,
    note = excluded.note,
    source = 'program',
    status = 'confirmed',
    review_note = null,
    reviewed_at = now();
`;

const target = path.join(root, '..', 'cysh-band-community', 'supabase', 'migrations', '0060_import_program_participation.sql');
if (!fs.existsSync(path.dirname(target))) {
  console.error('找不到會員平台專案，請把兩個專案放在同一層');
  process.exit(1);
}
fs.writeFileSync(target, sql);
console.log(`0060_import_program_participation.sql：${unique.length} 筆（指揮 ${unique.filter((r) => r.role === '指揮').length}、獨奏 ${unique.filter((r) => r.role === '獨奏').length}）`);
