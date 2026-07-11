const fs = require('fs');
const path = require('path');

function createRenderer(root) {
  const templatesDir = path.join(root, 'templates');

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
      ogImage: escapeHtml(values.ogImage || 'https://cysh.band/assets/img/og.jpg')
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

  return { escapeHtml, renderPartial, renderPage };
}

module.exports = { createRenderer };
