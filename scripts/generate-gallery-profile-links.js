#!/usr/bin/env node
/* 由 PEOPLE_PROFILES 產生影像館可使用的人物介紹頁對照表。
   影像館照片資料存放在 R2；本檔只同步官網人物頁連結與正式大頭照。 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

global.window = global;
require(path.join(root, 'data', 'people-profiles.js'));

const profiles = global.PEOPLE_PROFILES || [];

function profileKey(profile) {
  return profile.id || profile.num;
}

function profilePhotoForPhotosApp(photo) {
  if (!photo) return '';
  if (/^(https?:|\/\/)/i.test(photo)) return photo;
  return `../${String(photo).replace(/^\.\.\//, '')}`;
}

function recordFor(profile) {
  return {
    name: profile.name,
    url: `../${profile.output}`,
    photo: profilePhotoForPhotosApp(profile.photo)
  };
}

const byNum = {};
const byId = {};

for (const profile of profiles) {
  const key = profileKey(profile);
  if (!key) continue;
  if (profile.num) byNum[profile.num] = recordFor(profile);
  else byId[key] = recordFor(profile);
}

const output = `/* 由 scripts/generate-gallery-profile-links.js 產生，請勿手動修改。
   用途：讓 photos/ 影像館可連回 people/ 個人介紹頁，並優先使用個人頁正式大頭照。 */
window.PEOPLE_PROFILE_LINKS = ${JSON.stringify({ byNum, byId }, null, 2)};
`;

fs.writeFileSync(path.join(root, 'photos', 'profile-links.js'), output);
console.log('photos/profile-links.js');
