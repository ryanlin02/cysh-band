const path = require('path');

const SKIP_TAGS = new Set([
  'a',
  'script',
  'style',
  'textarea',
  'title',
  'pre',
  'code',
  'svg',
  'select',
  'option',
  'button'
]);

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function publicProfiles(profiles) {
  const byName = new Map();
  for (const profile of profiles || []) {
    if (!profile || !profile.name || !profile.output) continue;
    if (byName.has(profile.name)) continue;
    byName.set(profile.name, profile);
  }
  return [...byName.values()]
    .filter((profile) => profile.name.length >= 2)
    .sort((a, b) => b.name.length - a.name.length || a.name.localeCompare(b.name));
}

function relativeHref(currentRel, targetRel) {
  const fromDir = path.posix.dirname(currentRel);
  let href = path.posix.relative(fromDir === '.' ? '' : fromDir, targetRel);
  if (!href || href === '') href = path.posix.basename(targetRel);
  if (!href.startsWith('.') && !href.startsWith('/')) return href;
  return href;
}

function currentProfileFor(currentRel, profiles) {
  return (profiles || []).find((profile) => profile && profile.output === currentRel) || null;
}

/* 「每次提到都要連」對索引與短文是對的，對長篇敘事就不是。
   人物介紹頁開始出現長文之後，同一個名字在一頁裡出現三十幾次，
   就變成三十幾個金色連結，整頁像連結農場，讀者也不會點第二次。
   所以只有**人物介紹頁**改成一個人只連第一次；
   其他頁面（歷屆聯演索引、最新消息的演出者名單⋯⋯）維持每次都連——
   那些地方每一筆是獨立的一則，少一個連結就是少一條路。 */
function linkText(text, currentRel, profiles, linked) {
  if (!text || !profiles || !profiles.length) return text;
  const currentProfile = currentProfileFor(currentRel, profiles);
  const skipName = currentProfile ? currentProfile.name : '';
  const linkable = publicProfiles(profiles).filter((profile) => profile.name !== skipName);
  if (!linkable.length) return text;

  const pattern = new RegExp(linkable.map((profile) => escapeRegExp(profile.name)).join('|'), 'g');
  return text.replace(pattern, (name) => {
    const profile = linkable.find((item) => item.name === name);
    if (!profile) return name;
    if (linked && linked.has(name)) return name;
    if (linked) linked.add(name);
    return `<a href="${relativeHref(currentRel, profile.output)}">${name}</a>`;
  });
}

function tagName(tag) {
  const match = tag.match(/^<\/?\s*([a-zA-Z0-9:-]+)/);
  return match ? match[1].toLowerCase() : '';
}

function isClosingTag(tag) {
  return /^<\s*\//.test(tag);
}

function isSelfClosingTag(tag) {
  return /\/\s*>$/.test(tag) || /^<\s*(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i.test(tag);
}

function autoLinkHtml(html, currentRel, profiles) {
  const input = String(html || '');
  // 只有人物介紹頁（長篇敘事）才「一個人只連第一次」；其他頁面維持每次都連
  const linked = /^people\//.test(String(currentRel || '')) ? new Set() : null;
  /* 已經是連結的名字也要記進去。
     否則對「已經產生好的頁面」再跑一次時，第一次的連結因為在 <a> 裡被跳過，
     計數器就以為還沒連過，於是又想把第二次出現的名字連起來——
     產生器與檢查程式會永遠互相打架。 */
  const noteAlreadyLinked = (text) => {
    if (!linked || !text) return;
    for (const profile of publicProfiles(profiles)) {
      if (text.includes(profile.name)) linked.add(profile.name);
    }
  };
  const tagRegex = /<[^>]*>/g;
  let result = '';
  let lastIndex = 0;
  let inBody = false;
  const skipStack = [];
  let match;

  while ((match = tagRegex.exec(input))) {
    const text = input.slice(lastIndex, match.index);
    if (text) {
      if (inBody && !skipStack.length) {
        result += linkText(text, currentRel, profiles, linked);
      } else {
        if (skipStack.includes('a')) noteAlreadyLinked(text);
        result += text;
      }
    }

    const tag = match[0];
    const name = tagName(tag);
    const closing = isClosingTag(tag);

    if (name === 'body' && !closing) {
      result += tag;
      inBody = true;
      lastIndex = tagRegex.lastIndex;
      continue;
    }
    if (name === 'body' && closing) {
      inBody = false;
    }

    if (inBody && name && SKIP_TAGS.has(name)) {
      if (closing) {
        const index = skipStack.lastIndexOf(name);
        if (index !== -1) skipStack.splice(index, 1);
      } else if (!isSelfClosingTag(tag)) {
        skipStack.push(name);
      }
    }

    result += tag;
    lastIndex = tagRegex.lastIndex;
  }

  const tail = input.slice(lastIndex);
  result += inBody && !skipStack.length ? linkText(tail, currentRel, profiles, linked) : tail;
  return result;
}

function hasUnlinkedPeopleNames(html, currentRel, profiles) {
  return autoLinkHtml(html, currentRel, profiles) !== String(html || '');
}

module.exports = {
  autoLinkHtml,
  hasUnlinkedPeopleNames,
  relativeHref
};
