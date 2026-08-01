/* 最新消息的原生分享控制。
   支援 Web Share 的裝置交給系統選擇分享 App；其他環境退回複製固定文章網址。 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-news-share]').forEach((button) => {
    const status = document.getElementById(button.getAttribute('aria-describedby'));

    const showStatus = (message) => {
      if (!status) return;
      status.textContent = message;
      status.hidden = false;
    };

    button.addEventListener('click', async () => {
      const shareUrl = button.dataset.shareUrl || window.location.href;
      const shareData = {
        title: button.dataset.shareTitle || document.title,
        text: button.dataset.shareText || '',
        url: shareUrl
      };

      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      if (status) status.hidden = true;

      try {
        if (navigator.share) {
          await navigator.share(shareData);
          return;
        }
        await copyPageUrl(shareUrl);
        showStatus('此裝置未提供分享選單，已複製文章連結。');
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        try {
          await copyPageUrl(shareUrl);
          showStatus('已複製文章連結。');
        } catch (copyError) {
          showStatus('無法開啟分享功能，請複製瀏覽器網址。');
        }
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
  });
});

async function copyPageUrl(url) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const input = document.createElement('textarea');
  input.value = url;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  if (!copied) throw new Error('Copy command failed.');
}
