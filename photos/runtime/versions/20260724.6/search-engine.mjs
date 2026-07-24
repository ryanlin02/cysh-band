const FIELD = Object.freeze({
  photoIndex: 0,
  exact: 1,
  personCandidates: 2,
  primaryAI: 3,
  supplementalAI: 4,
  memberNumbers: 5,
  personNames: 6,
  personAliases: 7,
  albumExact: 8,
  filenameExact: 9,
  ocrExact: 10,
  primaryVisual: 11,
  dateYear: 12,
  dateConfidence: 13,
  albumIndex: 14,
  personIndexes: 15,
  sceneFilters: 16,
  activityFilters: 17,
  instrumentFilters: 18,
  hasOcr: 19,
});

const LABELS = Object.freeze({
  memberNumber: "社員編號",
  personNameExact: "人物姓名",
  personNamePartial: "人物姓名",
  personAlias: "人物別名",
  ocr: "照片文字",
  album: "相簿",
  filename: "檔名",
  date: "年份",
  exact: "既有精確標籤",
  primaryAI: "照片內容",
  supplementalAI: "補充辨識",
  personCandidate: "待確認人物",
  fuzzy: "近似內容",
});

const QUERY_FILLERS = new Set([
  "找", "搜尋", "查詢", "看", "我要", "想找", "幫我找",
  "照片", "相片", "圖片", "影像", "的", "有關", "關於",
]);
const PREFIX_FILLERS = ["幫我搜尋", "幫我查詢", "幫我找", "搜尋", "查詢", "想找", "我要找", "找"];
const SUFFIX_FILLERS = ["的照片", "照片", "的相片", "相片", "的圖片", "圖片", "的影像", "影像"];

export function normalize(value) {
  return String(value || "")
    .normalize("NFC")
    .toLocaleLowerCase("zh-Hant")
    .replace(/\u3000/g, " ")
    .trim();
}

function normalizeNaturalPhrase(value) {
  let output = normalize(value);
  output = output.replace(/民國\s*(\d{2,3})\s*年?/g, (_match, year) =>
    String(Number(year) + 1911)
  );
  output = output.replace(/([12]\d{3})\s*年/g, " $1 ");
  output = output.replace(/[，。！？、；：,.!?;:()[\]{}「」『』"'`~@#$%^&*+=|\\/<>]+/g, " ");
  output = output.replace(/\s+/g, " ").trim();
  for (const prefix of PREFIX_FILLERS) {
    if (output.startsWith(prefix) && output.length > prefix.length) {
      output = output.slice(prefix.length).trim();
      break;
    }
  }
  for (const suffix of SUFFIX_FILLERS) {
    if (output.endsWith(suffix) && output.length > suffix.length) {
      output = output.slice(0, -suffix.length).trim();
      break;
    }
  }
  return output;
}

function isYear(value) {
  return /^\d{4}$/.test(value) && Number(value) >= 1900 && Number(value) <= 2099;
}

export function parseQuery(rawQuery, maxTerms = 8) {
  const normalized = normalizeNaturalPhrase(rawQuery);
  const terms = [];
  for (const token of normalized.split(/\s+/)) {
    const term = token.trim();
    if (!term || QUERY_FILLERS.has(term) || terms.includes(term)) continue;
    terms.push(term);
    if (terms.length >= maxTerms) break;
  }
  const years = terms.filter(isYear);
  return {
    raw: String(rawQuery || ""),
    normalized,
    terms,
    years,
    contentTerms: terms.filter((term) => !isYear(term)),
    yearOnly: terms.length > 0 && terms.length === years.length,
  };
}

function buildSynonymMap(payload) {
  const result = new Map();
  for (const rawGroup of payload?.groups || []) {
    const group = [...new Set(rawGroup.map(normalize).filter(Boolean))];
    for (const term of group) result.set(term, group);
  }
  return result;
}

function variantsFor(term, synonymMap) {
  const group = synonymMap.get(term);
  return group || [term];
}

function contains(haystack, needle) {
  return Boolean(haystack) && haystack.includes(needle);
}

function equalsToken(haystack, needle) {
  return String(haystack || "").split(/\s+/).includes(needle);
}

function chooseMatch(row, queryTerm, variants, weights) {
  const matches = [];
  const add = (type, variant, baseScore, matched, exact = false) => {
    if (!matched) return;
    const synonym = variant !== queryTerm;
    const score = baseScore * (synonym ? weights.synonymMultiplier : 1);
    matches.push({
      type,
      label: LABELS[type],
      term: queryTerm,
      matched: variant,
      score,
      synonym,
      exact,
    });
  };

  for (const variant of variants) {
    add(
      "memberNumber",
      variant,
      weights.memberNumber,
      equalsToken(row[FIELD.memberNumbers], variant),
      true
    );
    add(
      "personNameExact",
      variant,
      weights.personNameExact,
      equalsToken(row[FIELD.personNames], variant),
      true
    );
    add(
      "personNamePartial",
      variant,
      weights.personNamePartial,
      !equalsToken(row[FIELD.personNames], variant)
        && contains(row[FIELD.personNames], variant)
    );
    add(
      "personAlias",
      variant,
      weights.personAlias,
      equalsToken(row[FIELD.personAliases], variant),
      true
    );
    add("ocr", variant, weights.ocr, contains(row[FIELD.ocrExact], variant));
    add("album", variant, weights.album, contains(row[FIELD.albumExact], variant));
    add("filename", variant, weights.filename, contains(row[FIELD.filenameExact], variant));
    add("exact", variant, weights.exact, contains(row[FIELD.exact], variant));
    add("primaryAI", variant, weights.primaryAI, contains(row[FIELD.primaryVisual], variant));
    if (!contains(row[FIELD.primaryVisual], variant)) {
      add("primaryAI", variant, weights.primaryAI, contains(row[FIELD.primaryAI], variant));
    }
    add(
      "supplementalAI",
      variant,
      weights.supplementalAI,
      contains(row[FIELD.supplementalAI], variant)
    );
    add(
      "personCandidate",
      variant,
      weights.personCandidate,
      contains(row[FIELD.personCandidates], variant)
    );
  }
  matches.sort((left, right) =>
    right.score - left.score
    || Number(right.exact) - Number(left.exact)
    || left.type.localeCompare(right.type)
  );
  return matches[0] || null;
}

function bigrams(value) {
  const chars = [...normalize(value).replace(/\s+/g, "")];
  if (chars.length < 2) return new Set(chars);
  const output = new Set();
  for (let index = 0; index < chars.length - 1; index += 1) {
    output.add(`${chars[index]}${chars[index + 1]}`);
  }
  return output;
}

function bigramCoverage(query, target) {
  const queryGrams = bigrams(query);
  if (!queryGrams.size) return 0;
  const targetGrams = bigrams(target);
  let hits = 0;
  for (const gram of queryGrams) {
    if (targetGrams.has(gram)) hits += 1;
  }
  return hits / queryGrams.size;
}

function looksLikePersonName(term) {
  const commonSurnames = "趙錢孫李周吳鄭王馮陳褚衛蔣沈韓楊朱秦尤許何呂施張孔曹嚴華金魏陶姜戚謝鄒喻柏水竇章雲蘇潘葛奚范彭郎魯韋昌馬苗鳳花方俞任袁柳鮑史唐費廉岑薛雷賀倪湯滕殷羅畢郝鄔安常樂于傅皮卞齊康伍余元卜顧孟平黃和穆蕭尹姚邵汪祁毛禹狄米貝明臧計伏成戴宋茅龐熊紀舒屈項祝董梁杜阮藍閔席季麻強賈路婁危江童顏郭梅盛林刁鍾徐邱駱高夏蔡田樊胡凌霍虞萬柯管盧莫房裘繆解應宗丁宣賁鄧郁單杭洪包諸左石崔吉龔程嵇邢裴陸榮翁荀羊甄曲封芮羿儲靳汲邴糜松井段富巫烏焦巴弓牧隗山谷車侯宓蓬全郗班仰秋仲伊宮寧仇欒暴甘鈄厲戎祖武符劉景詹束龍葉司黎喬蒼雙聞莘黨翟譚貢勞逄姬申扶堵冉宰酈雍郤璩桑桂濮牛壽通邊燕冀郟浦尚農溫別莊晏柴瞿閻充慕連茹習宦艾魚容向古易慎戈廖庾終暨居衡步都耿滿弘匡國文寇廣祿闕東歐利師鞏聶晁勾敖融冷辛闞那簡饒空曾毋沙乜養鞠須豐巢關蒯相查後荊紅游竺權逯蓋益桓公万俟司馬上官歐陽夏侯諸葛聞人東方赫連皇甫尉遲公羊澹臺公冶宗政濮陽淳于單于太叔申屠公孫仲孫軒轅令狐鍾離宇文長孫慕容鮮于閭丘司徒司空亓官司寇仉督子車顓孫端木巫馬公西漆雕樂正壤駟公良拓跋夾谷宰父穀梁段干百里東郭南門呼延羊舌微生梁丘左丘東門西門南宮";
  return /^[\p{Script=Han}]{2,4}$/u.test(term) && commonSurnames.includes([...term][0]);
}

function fuzzySearch(docs, parsed, rules) {
  const config = rules.fuzzy;
  if (
    !config?.enabled
    || !parsed.contentTerms.length
    || parsed.years.length
    || parsed.contentTerms.some(
      (term) =>
        term.length < config.minTermLength
        || /\d/.test(term)
        || looksLikePersonName(term)
    )
  ) {
    return [];
  }
  const fieldIndexes = config.fields
    .map((field) => FIELD[field])
    .filter((index) => index !== undefined);
  const results = [];
  for (const row of docs) {
    const target = fieldIndexes.map((index) => row[index] || "").join(" ");
    const coverages = parsed.contentTerms.map((term) => bigramCoverage(term, target));
    if (coverages.some((coverage) => coverage < config.bigramCoverage)) continue;
    const average = coverages.reduce((sum, value) => sum + value, 0) / coverages.length;
    results.push({
      photoIndex: row[FIELD.photoIndex],
      score: Number((rules.weights.primaryAI * rules.weights.fuzzyMultiplier * average).toFixed(3)),
      reasons: parsed.contentTerms.slice(0, rules.limits.maxReasonsPerResult).map(
        (term, index) => ({
          type: "fuzzy",
          label: LABELS.fuzzy,
          term,
          matched: term,
          score: Number((rules.weights.primaryAI * rules.weights.fuzzyMultiplier * coverages[index]).toFixed(3)),
          synonym: false,
        })
      ),
      dateRelation: "not_requested",
    });
  }
  results.sort((left, right) => right.score - left.score || left.photoIndex - right.photoIndex);
  return results.slice(0, config.maxResults);
}

function exactSearch(docs, parsed, rules, synonymMap, identityTerms) {
  const results = [];
  const requestedYear = parsed.years[0] || "";
  for (const row of docs) {
    const reasons = [];
    let score = 0;
    let matched = true;
    for (const term of parsed.contentTerms) {
      const reason = chooseMatch(row, term, variantsFor(term, synonymMap), rules.weights);
      if (!reason) {
        matched = false;
        break;
      }
      const identityTypes = identityTerms.get(term);
      if (identityTypes && !identityTypes.has(reason.type)) {
        matched = false;
        break;
      }
      score += reason.score;
      reasons.push(reason);
    }
    if (!matched) continue;

    let dateRelation = "not_requested";
    if (requestedYear) {
      const rowYear = row[FIELD.dateYear] || "";
      if (rowYear === requestedYear) {
        dateRelation = "matched";
        score += rules.weights.date;
        reasons.push({
          type: "date",
          label: LABELS.date,
          term: requestedYear,
          matched: rowYear,
          score: rules.weights.date,
          synonym: false,
        });
      } else if (parsed.yearOnly && rules.date.strictWhenYearOnly) {
        continue;
      } else if (!rowYear) {
        dateRelation = "unknown";
      } else {
        dateRelation = "mismatched";
        if (
          rules.date.weakWhenCombined
          && rules.date.penalizeConfidence.includes(row[FIELD.dateConfidence])
        ) {
          score += rules.weights.dateMismatchPenalty;
        }
      }
    }
    results.push({
      photoIndex: row[FIELD.photoIndex],
      score: Number(score.toFixed(3)),
      reasons: reasons
        .sort((left, right) => right.score - left.score)
        .slice(0, rules.limits.maxReasonsPerResult),
      dateRelation,
    });
  }
  results.sort((left, right) =>
    right.score - left.score
    || left.photoIndex - right.photoIndex
  );
  return results.slice(0, rules.limits.maxResults);
}

function normalizeFilters(rawFilters) {
  const raw = rawFilters || {};
  const integerOrNull = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const number = Number(value);
    return Number.isInteger(number) ? number : null;
  };
  return {
    year: isYear(String(raw.year || "")) ? String(raw.year) : "",
    albumIndex: integerOrNull(raw.albumIndex),
    personIndex: integerOrNull(raw.personIndex),
    scene: normalize(raw.scene),
    activity: normalize(raw.activity),
    instrument: normalize(raw.instrument),
    hasOcr: raw.hasOcr === true || raw.hasOcr === "true",
  };
}

function rowMatchesFilters(row, filters) {
  if (filters.year && row[FIELD.dateYear] !== filters.year) return false;
  if (
    filters.albumIndex !== null
    && row[FIELD.albumIndex] !== filters.albumIndex
  ) return false;
  if (
    filters.personIndex !== null
    && !(row[FIELD.personIndexes] || []).includes(filters.personIndex)
  ) return false;
  if (
    filters.scene
    && !(row[FIELD.sceneFilters] || []).includes(filters.scene)
  ) return false;
  if (
    filters.activity
    && !(row[FIELD.activityFilters] || []).includes(filters.activity)
  ) return false;
  if (
    filters.instrument
    && !(row[FIELD.instrumentFilters] || []).includes(filters.instrument)
  ) return false;
  if (filters.hasOcr && !row[FIELD.hasOcr]) return false;
  return true;
}

function increment(counter, value) {
  if (value === "" || value === null || value === undefined) return;
  counter.set(value, (counter.get(value) || 0) + 1);
}

function facetRows(counter, sortMode = "count") {
  return [...counter.entries()].sort((left, right) => {
    if (sortMode === "year") return String(right[0]).localeCompare(String(left[0]));
    return right[1] - left[1]
      || String(left[0]).localeCompare(String(right[0]), "zh-Hant");
  });
}

function buildFacets(results, docs) {
  const counters = {
    years: new Map(),
    albums: new Map(),
    people: new Map(),
    scenes: new Map(),
    activities: new Map(),
    instruments: new Map(),
  };
  let ocr = 0;
  for (const result of results) {
    const row = docs[result.photoIndex];
    if (!row) continue;
    increment(counters.years, row[FIELD.dateYear]);
    increment(counters.albums, row[FIELD.albumIndex]);
    for (const value of row[FIELD.personIndexes] || []) increment(counters.people, value);
    for (const value of row[FIELD.sceneFilters] || []) increment(counters.scenes, value);
    for (const value of row[FIELD.activityFilters] || []) increment(counters.activities, value);
    for (const value of row[FIELD.instrumentFilters] || []) increment(counters.instruments, value);
    if (row[FIELD.hasOcr]) ocr += 1;
  }
  return {
    years: facetRows(counters.years, "year"),
    albums: facetRows(counters.albums),
    people: facetRows(counters.people),
    scenes: facetRows(counters.scenes),
    activities: facetRows(counters.activities),
    instruments: facetRows(counters.instruments),
    ocr,
  };
}

export function createSearchEngine({ docs, rules, synonyms }) {
  if (!Array.isArray(docs)) throw new TypeError("docs必須是陣列");
  if (!rules?.weights || !rules?.limits) throw new TypeError("缺少正式搜尋規則");
  const synonymMap = buildSynonymMap(synonyms);
  const identityTerms = new Map();
  for (const [field, type] of [
    [FIELD.memberNumbers, "memberNumber"],
    [FIELD.personNames, "personNameExact"],
    [FIELD.personAliases, "personAlias"],
  ]) {
    for (const row of docs) {
      for (const term of String(row[field] || "").split(/\s+/).filter(Boolean)) {
        if (!identityTerms.has(term)) identityTerms.set(term, new Set());
        identityTerms.get(term).add(type);
      }
    }
  }
  return {
    search(rawQuery, options = {}) {
      const startedAt = performance.now();
      const parsed = parseQuery(rawQuery, rules.limits.maxTerms);
      const filters = normalizeFilters(options.filters);
      if (!parsed.terms.length) {
        return {
          query: parsed,
          filters,
          mode: "empty",
          results: [],
          total: 0,
          unfilteredTotal: 0,
          facets: {
            years: [], albums: [], people: [], scenes: [],
            activities: [], instruments: [], ocr: 0,
          },
          elapsedMs: Number((performance.now() - startedAt).toFixed(3)),
        };
      }
      let results = exactSearch(docs, parsed, rules, synonymMap, identityTerms);
      let mode = "exact";
      if (
        !results.length
        && rules.fuzzy?.enabled
        && rules.fuzzy.onlyWhenNoExactResults
      ) {
        results = fuzzySearch(docs, parsed, rules);
        if (results.length) mode = "fuzzy";
      }
      const unfilteredTotal = results.length;
      const facets = buildFacets(results, docs);
      results = results.filter((result) =>
        rowMatchesFilters(docs[result.photoIndex], filters)
      );
      return {
        query: parsed,
        filters,
        mode,
        results,
        total: results.length,
        unfilteredTotal,
        facets,
        elapsedMs: Number((performance.now() - startedAt).toFixed(3)),
      };
    },
  };
}
