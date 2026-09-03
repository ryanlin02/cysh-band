const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function createRenderer(root) {
  const templatesDir = path.join(root, 'templates');
  /* 樣式快取版本（全站唯一來源）：直接用 css/style.css 的內容雜湊。
     以前有兩套——最新消息用內容雜湊、其他頁用手寫字串、人物頁根本沒有——
     結果改完 CSS 之後，回訪的人可能還吃到舊樣式，新版面就會壞掉。
     改成這裡統一計算：只要 CSS 有動，全站的網址就會跟著換。 */
  const styleVersion = `?v=${crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(root, 'css', 'style.css')))
    .digest('hex')
    .slice(0, 12)}`;

  function readTemplate(relativePath) {
    return fs.readFileSync(path.join(templatesDir, relativePath), 'utf8');
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(template, values) {
    let html = template;
    html = html.replace(/{{active:([a-z-]+)}}/g, (_, key) => (
      values.navActive === key ? ' class="active"' : ''
    ));
    return html.replace(/{{([a-zA-Z0-9]+)}}/g, (_, key) => (
      Object.prototype.hasOwnProperty.call(values, key) ? values[key] : ''
    ));
  }

  function renderHead(values) {
    const title = values.title || '';
    const description = values.description || '';
    const safe = {
      ...values,
      title: escapeHtml(title),
      description: escapeHtml(description),
      ogTitle: escapeHtml(values.ogTitle || title),
      ogDescription: escapeHtml(values.ogDescription || description),
      url: escapeHtml(values.url),
      canonicalUrl: escapeHtml(values.canonicalUrl || values.url),
      ogType: escapeHtml(values.ogType || 'website'),
      ogImage: escapeHtml(values.ogImage || 'https://cysh.band/assets/img/og.jpg'),
      ogImageWidth: escapeHtml(values.ogImageWidth || '1200'),
      ogImageHeight: escapeHtml(values.ogImageHeight || '630'),
      styleVersion: escapeHtml(values.styleVersion || styleVersion),
      pwaInstallMeta: render(readTemplate('partials/pwa-install.html'), {
        assetPrefix: values.assetPrefix || ''
      })
    };
    return render(readTemplate('partials/head.html'), safe);
  }

  function renderPage(values) {
    const shared = {
      assetPrefix: values.assetPrefix || '',
      navActive: values.navActive || '',
      brandActive: values.navActive === 'index' ? ' active' : '',
      brandCurrent: values.navActive === 'index' ? ' aria-current="page"' : '',
      extraHead: values.extraHead || '',
      extraScripts: values.extraScripts || ''
    };

    const head = renderHead({ ...shared, ...values });
    const nav = render(readTemplate('partials/nav.html'), shared);
    const footer = render(readTemplate('partials/footer.html'), shared);

    return render(readTemplate('layouts/base.html'), {
      head,
      nav,
      content: values.content,
      footer
    });
  }

  function renderPartial(templateName, values = {}) {
    const navActive = values.navActive || '';
    return render(readTemplate(templateName), {
      assetPrefix: values.assetPrefix || '',
      navActive,
      brandActive: navActive === 'index' ? ' active' : '',
      brandCurrent: navActive === 'index' ? ' aria-current="page"' : '',
      ...values
    });
  }

  return { escapeHtml, renderPartial, renderPage, styleVersion };
}

module.exports = { createRenderer };
