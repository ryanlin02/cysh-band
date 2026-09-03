/* 各屆校友聯演「參與過的校友」。
 *
 * 這裡的內容由會員平台的參與紀錄同步過來（sync-member-publishing 會整段重寫），
 * 手動改沒有用。要修改請到 members.cysh.band 的公開介紹填參與紀錄，
 * 經管理員確認之後才會出現在這裡。
 *
 * 只包含「已確認」的紀錄：節目冊匯入的（指揮、獨奏）與管理員確認過的本人補充。
 */
window.CONCERT_PARTICIPANTS = [];
// <member-publish-participants>
window.MEMBER_CONFIRMED_PARTICIPATION = [];
// </member-publish-participants>
if (Array.isArray(window.MEMBER_CONFIRMED_PARTICIPATION)) {
  window.CONCERT_PARTICIPANTS = window.MEMBER_CONFIRMED_PARTICIPATION;
}
