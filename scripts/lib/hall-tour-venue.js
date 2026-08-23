const CHIAYI_HALL_NAMES = [
  '嘉義市政府文化局音樂廳',
  '嘉義市文化局音樂廳',
  '嘉義市立文化中心音樂廳',
  '嘉義市文化中心音樂廳',
  '嘉義市音樂廳'
];

function isChiayiCultureHallVenue(value) {
  const text = String(value || '').replace(/\s+/g, '');
  return CHIAYI_HALL_NAMES.some((name) => text.includes(name));
}

module.exports = { CHIAYI_HALL_NAMES, isChiayiCultureHallVenue };
