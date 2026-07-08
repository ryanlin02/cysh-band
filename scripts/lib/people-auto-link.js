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

function linkText(text, currentRel, profiles) {
  if (!text || !profiles || !profiles.length) return text;
  const currentProfile = currentProfileFor(currentRel, profiles);
  const skipName = currentProfile ? currentProfile.name : '';
  const linkable = publicProfiles(profiles).filter((profile) => profile.name !== skipName);
  if (!linkable.length) return text;

  const pattern = new RegExp(linkable.map((profile) => escapeRegExp(profile.name)).join('|'), 'g');
  return text.replace(pattern, (name) => {
    const profile = linkable.find((item) => item.name === name);
    if (!profile) return name;
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
  const tagRegex = /<[^>]*>/g;
  let result = '';
  let lastIndex = 0;
  let inBody = false;
  const skipStack = [];
  let match;

  while ((match = tagRegex.exec(input))) {
    const text = input.slice(lastIndex, match.index);
    if (text) {
      result += inBody && !skipStack.length ? linkText(text, currentRel, profiles) : text;
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
  result += inBody && !skipStack.length ? linkText(tail, currentRel, profiles) : tail;
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
