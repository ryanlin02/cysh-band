#!/usr/bin/env node
/* 依 data/concerts.js 更新 concerts.html 的歷屆紀錄列表。
   用法：
   node scripts/generate-concerts-index.js
   node scripts/generate-concerts-index.js --check */
const fs = require('fs');
const path = require('path');
const { autoLinkHtml } = require('./lib/people-auto-link');

const root = path.join(__dirname, '..');

global.window = global;
require(path.join(root, 'data', 'concerts.js'));
require(path.join(root, 'data', 'people-profiles.js'));

const concerts = global.CONCERTS || [];
const profiles = global.PEOPLE_PROFILES || [];
const outputPath = path.join(root, 'concerts.html');
const isCheck = process.argv.includes('--check');

const ARCHIVE_INTROS = {
  '2025-40th': '《四方之音》呼應校友來自四面八方、齊聚一堂共襄盛舉。第 40 屆由四字頭校友承接籌辦，104 年入學的陳乃慎擔任總召，盧宓承、簡晟軒與陳乃慎共同擔任指揮；曲目依宣傳貼文與現場曲目表補入，包含《杭汀頓慶典》、《羅馬慶典》、《王者之道》、《快速音樂會》、《北門車站》與《日本風情畫 14》等，並保存三張演出照片。完整團員名單與正式節目冊仍待補齊。',
  '2024-39th': '《三生有幸》結合嘉義高中建校百年慶典，在陪伴無數嘉中人的校園中庭雨豆樹下舉辦。前副總統蕭萬長等貴賓與 180 餘位嘉中人共襄盛舉，曾膺安、盧宓承、簡晟軒三位校友跨世代同台執棒，並由鄭鈞元擔任薩克斯風協奏。曲目以《旭陵慶典》開場，連結百年校慶與校友聯演傳統。',
  '2023-38th': '《一樹起響》呼應嘉中校園老樹與樹人堂意象，副標 Saeculum illuminate 為隔年的百年校慶揭開序幕。本屆由蔡淳任擔任總召、翁啟榮籌備統籌，盧宓承、丁肇賢、簡晟軒共同擔任指揮。曲目從《創世紀》出發，串連臺灣主題、古典戲劇配樂、慶典性作品、動畫與電影音樂，下半場首演葉哲良為嘉義高中百年校慶創作的《旭陵慶典》，把校歌旋律與「質實剛健」精神帶回聯演舞台。',
  '2022-37th': '《從0開始》承接 2021 年因疫情停辦後重新集結的心情，也讓校友與在校生回到樹人堂重新建立每年相聚的節奏。目前可考指揮為簡晟軒、丁肇賢，並由莊宗儒擔任上低音號協奏。日期、曲目與完整團員名單仍待補齊，若校友保存節目冊、海報、照片或錄音，歡迎協助補充。',
  '2020-36th': '《親子九九》以親子同樂與九字頭輪值為主題，由曾膺安、簡晟軒、林唐禾共同執棒，2020 年 8 月 29 日於嘉義市文化局音樂廳演出。本屆透過兩廳院售票系統與 ibon 售票，也是疫情前最後一次回到文化局音樂廳的校友聯演；曲目與完整團員名單仍待補齊。',
  '2019-35th': '《正八音》由八字頭校友籌辦，8 月 31 日先於嘉義高中樹人堂演出，9 月 1 日移師北港文化中心家湖廳，睽違十五年再次巡迴北港。盧宓承、簡晟軒分別擔任兩場指揮，陳錫仁與洪筱涵擔任協奏獨奏，兩場合計約 550 名觀眾，動員 76 人、共 129 人次參與。',
  '2018-34th': '《青春の極短篇》以「捌月季」與「當我的七仔好嗎？」為宣傳語，由曾膺安、簡晟軒擔任指揮，2018 年 8 月 5 日於嘉義市文化局音樂廳演出。曲目包含八木澤教司《稚鳥飛翔》、酒井格《七夕》、《豪勇七蛟龍》、007 組曲與岩井直溥編曲《美國風情畫》等；現已依 2018 年校聯名單補入分部演出人員，缺漏編號保留待考。',
  '2017-33rd': '《六馬仰秣 憶當年》取成語形容樂音美妙之意，主視覺以薩克斯風與昂首的馬匹相融。羅家駒、盧宓承、簡晟軒、王騰寬共同執棒，曲目包含《Lyrical March》、《AIDA》選粹、《Songs of Sailor and Sea》、《Sedona》、《Beauty and the Beast》等；部分曲目仍待節目冊佐證。',
  '2016-32nd': '《五字頭！》由五字頭校友承接主辦，2016 年 8 月 27 日於嘉義市文化公園演奏台演出。現存 DM 已能確認主題、屆次、日期、時間、場地與指揮名單，陳錫仁、翁啟榮、丁肇賢共同執棒；曲目包含《The Days of Wine and Roses》、重奏曲目、松田聖子歌曲選粹、《On the Mall》與《新天堂樂園》等。',
  '2015-31st': '《三生。一世樂》於 2015 年 9 月 5 日在嘉義市政府文化局音樂廳演出，由鄭鈞元、簡晟軒、陳錫仁、盧宓承共同執棒，陳韋希擔任薩克斯風協奏。本屆是聯合音樂會三十年來首度嘗試售票演出，透過兩廳院售票系統與 ibon 售票；節目涵蓋管樂經典、協奏曲與岩井直溥通俗名曲。',
  '2014-30th': '《三十而樂》紀念校友聯演傳統邁入第三十屆，副標「卅有其誓 × 出磊拔粹」延伸出屆次與青春記憶的雙關。2014 年節目單草稿保存 11 位指揮與各自對應曲目，從陳錫仁《木犀草序曲》到林唐禾《諸神的命運》，形成一人一曲的校友指揮群像；日期、場地與完整演出名單仍待補。',
  '2013-29th': '第 29 屆聯合音樂會於 2013 年 8 月 23 日在嘉義市政府文化局音樂廳演出，由鄭鈞元擔任指揮，陳錫仁同時擔任客席指揮與小號獨奏，簡晟軒、蔡淳任擔任助理指揮，全團約 80 人。曲目包含管樂原創、改編作品與小號協奏，並保存安可曲、FB Banner、籌備進度報告與社群協作演出名單補充。',
  '2012-28th': '《追憶-榮耀》於 2012 年 8 月 31 日在嘉義市文化局音樂廳演出，由鄭鈞元、丁肇賢擔任指揮，李子沛擔任長笛獨奏，免費索票入場。節目安排包含《五月風》、《Ride》、《Overture No.2》、長笛協奏與多首通俗改編作品，並保存行政團隊、特別感謝、演出人員名單與 FB 封面宣傳圖。',
  '2011-27th': '第 27 屆聯合音樂會於 2011 年 7 月 16 日 13:30 至 15:30 在嘉義市文化中心音樂廳演出，並列為嘉義市國際管樂節正式節目之一。鄭鈞元與丁肇賢共同擔任指揮，鄭鈞元、黃耀瑩、謝介豪、陳佩君分別擔任薩克斯風、雙簧管、單簧管與鋼琴獨奏；懶人包亦保存分部名單、曲目順序與排練時程，正式節目冊影像仍待補。',
  '2010-26th': '《Music à la Carte》於 2010 年 8 月 21 日晚間演出，現存照片顯示舞台布條寫有「第二十六屆國立嘉義高中校友暨在校生聯合演奏會」。目前可考協奏線索為方崇任演出 Launy Grøndahl 長號協奏曲；指揮、完整曲目與正式場地名稱仍待節目冊或海報補齊。',
  '2009-25th': '第 25 屆聯合音樂會於 2009 年 8 月 23 日在嘉義市音樂廳演出。目前可考協奏線索包含王聖安、陳佩君擔任雙鋼琴協奏，曲目為 Francis Poulenc《雙鋼琴協奏曲》。指揮、演出時間、完整曲目與團員名單仍待補齊；若校友保存節目冊、海報、照片或錄音，歡迎協助補充。',
  '2008-24th': '《管樂肖像》由丁肇賢與簡晟軒共同擔任指揮，以「管樂肖像」為主題，曲目橫跨古典管樂、現代作品、臺灣歌曲與流行音樂改編。黃耀瑩擔任雙簧管協奏，演出 James Barnes《Autumn Soliloquy》；日期、正式場地與完整曲目仍待補齊。',
  '2007-23rd': '第 23 屆聯合音樂會於 2007 年 8 月 18 日在嘉義市政府文化局音樂廳演出，由丁肇賢與林唐禾共同擔任指揮，並邀請當時就讀法國梅斯音樂院的鄭鈞元返台擔任薩克斯風獨奏。曲目包含《鄉村騎士間奏曲》、《亞美尼亞舞曲》、《Lord Tullamore》與電影配樂等，是創隊 76 周年的重要紀錄。',
  '2006-22nd': '第 22 屆聯合音樂會目前可考場地為嘉義市音樂廳，協奏線索包含簡晟軒演出 Launy Grøndahl 長號協奏曲。日期、時間、指揮、完整曲目與團員名單仍待節目冊、海報或校友口述補齊；網站先保留已知資訊，歡迎校友提供更多資料協助考證。',
  '2005-21st': '《神話》目前保存了演出前後台、正式演出與謝幕照片，留下第 21 屆聯演的珍貴影像線索。日期暫列 2005 年 8 月 28 日，場地、指揮、曲目與團員名單仍待補齊；若校友保存節目冊、海報、錄音或當年活動紀錄，歡迎協助補充。',
  '2002-18th': '第 18 屆聯合音樂會於 2002 年 8 月 30 日 19:30 在嘉義市立文化中心音樂廳演出。現存活動企劃書保存了前言、團隊簡介、演出相關單位與暑期集訓分部負責人；照片則記錄 8 月 24 日起的校內團練、進音樂廳彩排與晚間正式登台。檔名留下的「Blue Midnight」仍是曲目線索；主題名稱、指揮與完整節目單仍待補齊。',
  '1998-14th': '《情誼永固》於 1998 年 8 月 29 日在嘉義市立文化中心音樂廳演出，節目冊封面與曲目頁保存度高，是早期聯演較完整的紀錄之一。羅家駒、陳錫仁擔任指揮，陳錫仁同時演出 Hummel 降 E 大調小號協奏曲；曲目另包含《Viva! Italia!》、《Symphonic Portrait》等作品。',
  '1990-6th': '《Popular Night》海報寫作「七九年校友聯合演奏會」，日期 8 月 23 日星期四與 1990 年相符，場地為嘉中樹人堂。屆次依 1985 年第 1 屆推算為第 6 屆，正式屆次文字、指揮、曲目與團員名單仍待佐證；若校友保存節目冊、照片或錄音，歡迎協助補充。',
  '1985-1st': '校友暨在校生聯合音樂會傳統自 1985 年開始，讓畢業校友每年暑假回到嘉中，與在校生共同排練、共同登台。第 1 屆的日期、場地、指揮、曲目與團員名單目前仍待考證；網站先保留傳統起點，期待校友提供節目單、海報、照片或口述記憶，一起補齊這段歷史。'
};

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function displayTitle(concert) {
  if (!concert.title) return `第 ${concert.nth || '?'} 屆聯合音樂會`;
  if (/^第\s*\d+\s*屆/.test(concert.title) || concert.title === '傳統的起點') return concert.title;
  return `《${concert.title}》`;
}

function zhDate(date) {
  const match = String(date || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  return `${match[1]}.${match[2]}.${match[3]}`;
}

function dateRange(concert) {
  const start = zhDate(concert.date);
  const end = zhDate(concert.endDate);
  if (start && end) return `${start} - ${end}`;
  return start;
}

function profileFor(person) {
  if (!person) return null;
  const key = person.num || person.id;
  return profiles.find((profile) => {
    if (key && (profile.num === key || profile.id === key || profile.output === `people/${key}.html`)) return true;
    return person.name && profile.name === person.name;
  }) || null;
}

function personLink(person) {
  const profile = profileFor(person);
  const key = person.num || person.id;
  if (key && exists(`people/${key}.html`)) return `people/${escapeHtml(key)}.html`;
  if (profile && profile.output && exists(profile.output)) return escapeHtml(profile.output);
  return '';
}

function personName(person) {
  const href = personLink(person);
  const name = escapeHtml(person.name || '');
  return href ? `<a href="${href}">${name}</a>` : name;
}

function peopleText(items, fallback = '資料待考') {
  if (!items || !items.length) return fallback;
  return items.map((person) => {
    const details = [person.role, person.instrument, person.work].filter(Boolean).map(escapeHtml).join('／');
    return details ? `${personName(person)}（${details}）` : personName(person);
  }).join('、');
}

function peopleBriefText(items, options = {}) {
  const fallback = options.fallback || '資料待考';
  if (!items || !items.length) return fallback;
  return items.map((person) => {
    const details = options.detailFields || ['instrument', 'work'];
    const detail = options.withDetail
      ? details.map((field) => person[field]).filter(Boolean).map(escapeHtml).join('／')
      : '';
    return detail ? `${personName(person)}（${detail}）` : personName(person);
  }).join('、');
}

function ticketLabel(ticket) {
  if (!ticket || ticket.type === 'unknown') return '票務待考';
  if (ticket.type === 'none') return ticket.note || '無演出';
  if (ticket.type === 'free') return ticket.note || '免票入場';
  if (ticket.type === 'free-ticket') return ticket.note || '免費索票入場';
  if (ticket.type === 'ceremony') return ticket.note || '慶典活動';
  const parts = [];
  if (ticket.price) parts.push(`${escapeHtml(ticket.price)} 元`);
  if (ticket.channels && ticket.channels.length) parts.push(ticket.channels.map(escapeHtml).join('、'));
  if (ticket.note) parts.push(escapeHtml(ticket.note));
  return parts.length ? parts.join('／') : '售票資訊待補';
}

function ticketBriefLabel(ticket) {
  if (!ticket || ticket.type === 'unknown') return '';
  if (ticket.type === 'none') return ticket.note || '無演出';
  if (ticket.type === 'free') return ticket.note || '免票入場';
  if (ticket.type === 'free-ticket') return ticket.note || '免費索票';
  if (ticket.type === 'ceremony') return ticket.note || '慶典活動';
  if (ticket.price) return `${escapeHtml(ticket.price)} 元`;
  return ticket.note ? escapeHtml(ticket.note) : '';
}

function missingFields(concert) {
  const missing = [];
  if (!concert.date) missing.push('日期');
  if (!concert.time) missing.push('時間');
  if (!concert.venue) missing.push('場地');
  if (!concert.conductors || !concert.conductors.length) missing.push('指揮');
  if (!concert.program || !concert.program.length) missing.push('曲目');
  if ((!concert.performers || !concert.performers.length) && (!concert.performerGroups || !concert.performerGroups.length)) missing.push('團員名單');
  return missing;
}

function programText(program) {
  if (!program || !program.length) return '完整曲目待考';
  const titles = program.slice(0, 5).map((work) => work.title || '曲名待考');
  return `${titles.join('、')}${program.length > 5 ? ' 等' : ''}`;
}

function metaText(concert) {
  const date = dateRange(concert);
  return [date, concert.time, concert.venue].filter(Boolean).map(escapeHtml).join('．') || `${escapeHtml(concert.year)} 年`;
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function cleanSentence(value) {
  return String(value || '')
    .replace(/不可因此誤寫[^。；]*[。；]?/g, '')
    .replace(/校友提供影像仍需交叉確認，暫不作為公開頁主證據。?/g, '')
    .replace(/場地由使用者確認為/g, '場地確認為')
    .replace(/日期由補充照片 EXIF 與演出影像檔名群組支持。?/g, '')
    .replace(/2011 聯演存在與鄧杰翔打擊聲部由人物頁名單脈絡確認；?/g, '2011 聯演已有校友名單脈絡可考；')
    .replace(/日期由 2011\.07\.16 影像 EXIF 支持，?/g, '日期暫列 2011.07.16，')
    .replace(/社群錄影清單作/g, '現存錄影資料作')
    .replace(/社群協作曲目介紹可補全本屆曲目；?/g, '現存曲目介紹可補全本屆曲目；')
    .replace(/錄影清單註明因版權因素，YouTube 上傳後多有消音或版權宣告，現存清單多為示範帶。?/g, '')
    .replace(/；?曲目檔確認部分曲目，室內樂重奏細目待補。?/, '')
    .replace(/；?日期、場地、指揮、曲目待補。?/, '')
    .replace(/；?指揮、主題與完整曲目待補。?/, '')
    .replace(/；?場地、指揮、曲目待考。?/, '')
    .replace(/；?完整日期、指揮、主題與曲目仍待節目冊或海報補齊。?/, '')
    .replace(/；?指揮、曲目、正式場地名稱待考。?/, '')
    .replace(/^[；，、\s]+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensurePunctuation(value) {
  const text = cleanSentence(value);
  if (!text) return '';
  return /[。！？；]$/.test(text) ? text : `${text}。`;
}

function trimIntro(text, max = 320) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max);
  const cut = Math.max(slice.lastIndexOf('。'), slice.lastIndexOf('；'));
  if (cut > 190) return slice.slice(0, cut + 1).trim();
  return `${slice.slice(0, max - 1).trim()}…`;
}

function expandArchiveIntro(concert, value) {
  const sentences = [ensurePunctuation(value)];
  const base = sentences.join('');
  const missing = missingFields(concert);
  if (base.length < 230 && concert.conductors && concert.conductors.length && !base.includes('指揮') && !base.includes('執棒')) {
    sentences.push(`目前可考指揮為${stripHtml(peopleBriefText(concert.conductors))}。`);
  }
  if (sentences.join('').length < 230 && concert.soloists && concert.soloists.length && !base.includes('協奏') && !base.includes('獨奏')) {
    sentences.push(`協奏／獨奏線索包含${stripHtml(peopleBriefText(concert.soloists, { withDetail: true }))}。`);
  }
  if (sentences.join('').length < 230 && concert.program && concert.program.length && !base.includes('曲目')) {
    sentences.push(`目前已整理的曲目包含${programText(concert.program)}，完整順序仍依節目冊持續校對。`);
  }
  const alreadyAsksSupplement = /待補|待考|歡迎|協助補充/.test(base);
  if (sentences.join('').length < 250 && missing.length && !alreadyAsksSupplement) {
    sentences.push(`仍待補齊${missing.join('、')}等資料；若校友保存節目冊、海報、照片或錄音，歡迎協助補充。`);
  }
  return trimIntro(sentences.join(''));
}

function introText(concert) {
  if (concert.summary) return escapeHtml(trimIntro(concert.summary));
  if (concert.lede) return escapeHtml(trimIntro(concert.lede));
  if (ARCHIVE_INTROS[concert.id]) return escapeHtml(trimIntro(ARCHIVE_INTROS[concert.id]));
  const missing = missingFields(concert);
  const sentences = [];
  const note = cleanSentence(stripHtml(concert.notes));
  if (note) sentences.push(ensurePunctuation(note));
  if (concert.venueNote && !sentences.join('').includes(concert.venueNote)) sentences.push(ensurePunctuation(concert.venueNote));
  if (concert.hostHead && sentences.join('').length < 145) {
    sentences.push(`本屆由${concert.hostHead}校友承接主辦脈絡，延續字頭輪值與跨世代共同排練的傳統。`);
  }
  if (concert.conductors && concert.conductors.length) {
    sentences.push(`目前可考指揮為${stripHtml(peopleBriefText(concert.conductors))}。`);
  }
  if (concert.soloists && concert.soloists.length) {
    sentences.push(`獨奏／協奏線索包含${stripHtml(peopleBriefText(concert.soloists, { withDetail: true }))}。`);
  }
  if (concert.program && concert.program.length && sentences.join('').length < 210) {
    sentences.push(`曲目已整理出${programText(concert.program)}，完整順序仍依節目冊持續校對。`);
  }
  if (missing.length) {
    sentences.push(`仍待補齊${missing.join('、')}等資料；若您保存節目冊、海報、照片或錄音，歡迎聯絡補充。`);
  } else if ((concert.videos && concert.videos.length) || (concert.gallery && concert.gallery.length)) {
    sentences.push('網站也會持續以影像與錄影資料交叉核對演出細節。');
  }
  if (!sentences.length) {
    sentences.push('本屆資料仍在整理中；網站先保留屆次與年度線索，等待節目冊、海報、照片或校友口述補齊。');
  }
  return escapeHtml(trimIntro(sentences.join('')));
}

function compactInfo(concert) {
  const items = [];
  items.push(`指揮：${peopleBriefText(concert.conductors)}`);
  if (concert.soloists && concert.soloists.length) items.push(`獨奏／協奏：${peopleBriefText(concert.soloists, { withDetail: true, detailFields: ['instrument'] })}`);
  const briefTicket = ticketBriefLabel(concert.ticket);
  if (briefTicket) items.push(`票務：${briefTicket}`);
  if (concert.hostHead) items.push(`主辦字頭：${escapeHtml(concert.hostHead)}`);
  return `<p class="concert-brief">${items.join('<span aria-hidden="true">／</span>')}</p>`;
}

function renderCard(concert) {
  const hasPoster = Boolean(concert.poster && exists(concert.poster));
  const href = concert.page || '';
  const title = displayTitle(concert);
  const titleHtml = href ? `<a href="${escapeHtml(href)}">${escapeHtml(title)}</a>` : escapeHtml(title);
  const altTitle = /^第\s*\d+\s*屆/.test(title) ? title : `第 ${concert.nth} 屆${title}`;
  const poster = hasPoster
    ? `<div class="poster linked"><a href="${escapeHtml(href || concert.poster)}" aria-label="查看第 ${escapeHtml(concert.nth)} 屆資料"><img src="${escapeHtml(concert.poster)}" alt="${escapeHtml(altTitle)}海報或影像" loading="lazy"></a></div>`
    : '';
  const posterBlock = poster ? `\n      ${poster}` : '';
  return `    <article class="concert-item${hasPoster ? ' has-poster' : ''}" id="concert-${escapeHtml(concert.id)}">
      <div class="no"><b>${escapeHtml(concert.nth)}</b><span>${escapeHtml(concert.year)}</span></div>
      <div>
        <h3>${titleHtml}</h3>
        <p class="meta">${metaText(concert)}</p>
        ${compactInfo(concert)}
        <p class="concert-summary">${introText(concert)}</p>
      </div>${posterBlock}
    </article>`;
}

function renderArchive() {
  const archive = concerts
    .filter((concert) => concert.page && concert.status !== 'cancelled' && concert.id !== '2026-41st')
    .slice()
    .sort((a, b) => b.year - a.year || b.nth - a.nth);

  return `    <div class="concert-archive">
      <!-- GENERATED CONCERT ARCHIVE START -->
${archive.map(renderCard).join('\n\n')}
      <!-- GENERATED CONCERT ARCHIVE END -->
    </div>`;
}

function renderConcertsIndex() {
  const current = fs.readFileSync(outputPath, 'utf8');
  const sectionStart = current.indexOf('<section class="section archive-section" id="archive">');
  if (sectionStart === -1) throw new Error('concerts.html: archive section not found.');
  const archiveMatch = /[ \t]*<div class="concert-archive">\n/.exec(current.slice(sectionStart));
  const archiveStart = archiveMatch ? sectionStart + archiveMatch.index : -1;
  if (archiveStart === -1) throw new Error('concerts.html: concert archive container not found.');
  const archiveEnd = current.indexOf('\n  </section>\n\n  <!-- 場地故事 -->', archiveStart);
  if (archiveEnd === -1) throw new Error('concerts.html: archive section end not found.');

  const posterCount = concerts.filter((concert) => concert.poster && exists(concert.poster) && concert.status !== 'cancelled').length;
  const html = `${current.slice(0, archiveStart)}${renderArchive()}${current.slice(archiveEnd)}`
    .replace(/<div><b>\d+\+?<\/b><span>(?:現存海報|主視覺)<\/span><\/div>/, `<div><b>${posterCount}</b><span>主視覺</span></div>`);
  return autoLinkHtml(html, 'concerts.html', profiles);
}

function writeConcertsIndex() {
  const next = renderConcertsIndex();
  if (isCheck) {
    const current = fs.readFileSync(outputPath, 'utf8');
    if (current !== next) {
      console.error('concerts.html: generated archive is out of sync. Run node scripts/generate-concerts-index.js');
      process.exit(1);
    }
    console.log('concerts.html archive ok');
    return;
  }
  fs.writeFileSync(outputPath, next);
  console.log('concerts.html');
}

if (require.main === module) {
  writeConcertsIndex();
}

module.exports = { renderConcertsIndex, writeConcertsIndex };
