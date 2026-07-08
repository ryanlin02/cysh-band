function stripParenthetical(value) {
  return String(value || '').replace(/（.*?）|\(.*?\)/g, '').trim();
}

function cleanName(value) {
  return stripParenthetical(value)
    .replace(/^\d{4}\s+/, '')
    .replace(/^\d{2,3}[-－]/, '')
    .replace(/^.+?[：:]/, '')
    .trim();
}

function nameVariants(name) {
  const raw = String(name || '').trim();
  const base = stripParenthetical(raw);
  const variants = new Set([raw, base]);
  for (const match of raw.matchAll(/[（(]([^）)]+)[）)]/g)) {
    if (match[1]) variants.add(match[1].trim());
  }
  return [...variants].filter(Boolean);
}

function createAlumniRosterResolver(alumni) {
  const byNum = new Map();
  const byName = new Map();

  for (const person of alumni || []) {
    if (!person || !person.name) continue;
    if (person.num) byNum.set(person.num, person);
    for (const variant of nameVariants(person.name)) {
      if (!byName.has(variant)) byName.set(variant, []);
      byName.get(variant).push(person);
    }
  }

  function uniqueByName(name) {
    const hits = byName.get(cleanName(name)) || [];
    return hits.length === 1 ? hits[0] : null;
  }

  function parseText(rawValue) {
    const raw = String(rawValue || '').trim();
    const explicit = raw.match(/^(\d{4})\s+(.+)$/);
    if (explicit) {
      return { raw, num: explicit[1], name: stripParenthetical(explicit[2]), mode: 'explicit-num' };
    }

    const yearTag = raw.match(/^(\d{2,3})[-－](.+)$/);
    if (yearTag) {
      return { raw, name: stripParenthetical(yearTag[2]), prefix: '', mode: 'year-tag' };
    }

    const prefixed = raw.match(/^(.+?[：:])\s*(.+)$/);
    if (prefixed) {
      return { raw, name: stripParenthetical(prefixed[2]), prefix: prefixed[1], mode: 'role-prefix' };
    }

    return { raw, name: stripParenthetical(raw), prefix: '', mode: 'plain' };
  }

  function resolveEntry(entry) {
    if (!entry) return null;

    if (typeof entry === 'object') {
      const key = entry.num || entry.id;
      if (key && byNum.has(key)) {
        return { person: byNum.get(key), name: entry.name || byNum.get(key).name, num: key, prefix: '', raw: entry.name || '', object: entry };
      }
      const person = uniqueByName(entry.name);
      if (!person) return { name: entry.name || '', raw: entry.name || '', object: entry };
      return { person, name: entry.name || person.name, num: person.num, prefix: '', raw: entry.name || '', object: entry };
    }

    const parsed = parseText(entry);
    if (parsed.num) {
      const person = byNum.get(parsed.num);
      return { person, name: parsed.name, num: parsed.num, prefix: parsed.prefix || '', raw: parsed.raw, parsed };
    }

    const person = uniqueByName(parsed.name);
    if (!person) return { name: parsed.name, prefix: parsed.prefix || '', raw: parsed.raw, parsed };
    return { person, name: person.name, num: person.num, prefix: parsed.prefix || '', raw: parsed.raw, parsed };
  }

  return { byNum, byName, cleanName, resolveEntry, uniqueByName };
}

module.exports = { createAlumniRosterResolver, cleanName };
