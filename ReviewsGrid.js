(function () {
  var STYLE_ID = 'ww-reviews-widget-styles';

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.ww-reviews-widget{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;border:1px solid #e5e7eb;border-radius:14px;padding:16px;background:#fff;color:#111827;box-shadow:0 10px 30px rgba(17,24,39,.06)}',
      '.ww-reviews-header{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:12px}',
      '.ww-business{display:flex;gap:10px;align-items:center}',
      '.ww-business-logo{width:40px;height:40px;border-radius:9999px;object-fit:cover;border:1px solid #e5e7eb;background:#f3f4f6}',
      '.ww-business-name{font-size:16px;font-weight:700;line-height:1.2}',
      '.ww-rating{font-size:14px;color:#4b5563}',
      '.ww-stars{color:#f59e0b;letter-spacing:2px;font-size:14px}',
      '.ww-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}',
      '.ww-card{border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#fafafa}',
      '.ww-card-head{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:6px}',
      '.ww-user{font-weight:600;font-size:14px;color:#111827}',
      '.ww-source{font-size:12px;color:#6b7280}',
      '.ww-comment{font-size:13px;line-height:1.45;color:#374151;margin:0}',
      '.ww-error{border:1px solid #fecaca;background:#fef2f2;color:#991b1b;border-radius:10px;padding:10px;font-size:13px}',
      '.ww-loading{font-size:13px;color:#6b7280}',
    ].join('');

    document.head.appendChild(style);
  }

  function stars(value) {
    var rounded = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));
    return '\u2605'.repeat(rounded) + '\u2606'.repeat(5 - rounded);
  }

  function createElement(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === 'string') el.textContent = text;
    return el;
  }

  function resolveTarget(script, targetId) {
    if (targetId) {
      var targetById = document.getElementById(targetId);
      if (targetById) return targetById;
    }

    var sibling = script.previousElementSibling;
    if (sibling && sibling.tagName.toLowerCase() === 'div') {
      return sibling;
    }

    var auto = document.createElement('div');
    script.parentNode.insertBefore(auto, script);
    return auto;
  }

  function renderWidget(target, payload, options) {
    var reviews = Array.isArray(payload.reviews) ? payload.reviews : [];
    var limitedReviews = reviews.slice(0, options.limit);

    var total = reviews.length;
    var avg = total
      ? reviews.reduce(function (acc, item) {
          return acc + (Number(item.rate) || 0);
        }, 0) / total
      : 0;

    target.innerHTML = '';

    var root = createElement('section', 'ww-reviews-widget');

    var header = createElement('header', 'ww-reviews-header');

    var business = createElement('div', 'ww-business');
    if (payload.logoUrl) {
      var logo = createElement('img', 'ww-business-logo');
      logo.src = payload.logoUrl;
      logo.alt = payload.businessName || 'Business logo';
      business.appendChild(logo);
    }

    var businessText = createElement('div');
    businessText.appendChild(createElement('div', 'ww-business-name', payload.businessName || 'Reviews'));
    businessText.appendChild(createElement('div', 'ww-rating', avg.toFixed(1) + ' / 5 (' + total + ')'));
    business.appendChild(businessText);

    var starSummary = createElement('div', 'ww-stars', stars(avg));

    header.appendChild(business);
    header.appendChild(starSummary);

    var grid = createElement('div', 'ww-grid');

    limitedReviews.forEach(function (review) {
      var card = createElement('article', 'ww-card');
      var cardHead = createElement('div', 'ww-card-head');

      cardHead.appendChild(createElement('div', 'ww-user', review.user || 'Anonymous'));
      cardHead.appendChild(createElement('div', 'ww-source', (review.origin || 'Unknown') + ' · ' + (review.rate || 0) + '/5'));

      card.appendChild(cardHead);
      card.appendChild(createElement('p', 'ww-comment', review.commentary || ''));
      grid.appendChild(card);
    });

    root.appendChild(header);
    root.appendChild(grid);
    target.appendChild(root);
  }

  function renderError(target, message) {
    target.innerHTML = '';
    var errorBox = createElement('div', 'ww-error', message);
    target.appendChild(errorBox);
  }

  function mountFromScript(script) {
    var widgetId = script.dataset.widgetId || script.dataset.apiKey;
    var apiBase = script.dataset.apiBase || window.location.origin;
    var targetId = script.dataset.target;
    var limit = parseInt(script.dataset.limit || '6', 10);

    if (!widgetId) {
      return;
    }

    ensureStyles();

    var target = resolveTarget(script, targetId);
    target.innerHTML = '';
    target.appendChild(createElement('div', 'ww-loading', 'Loading reviews...'));

    var endpoint = apiBase.replace(/\/$/, '') + '/api/reviews/' + encodeURIComponent(widgetId);

    fetch(endpoint)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Could not load reviews');
        }
        return response.json();
      })
      .then(function (payload) {
        renderWidget(target, payload, {
          limit: Number.isFinite(limit) && limit > 0 ? limit : 6,
        });
      })
      .catch(function () {
        renderError(target, 'The reviews widget could not be loaded right now.');
      });
  }

  function autoInit() {
    var scripts = document.querySelectorAll('script[data-widget-id], script[data-api-key]');
    scripts.forEach(function (script) {
      if (script.__wwMounted) return;
      script.__wwMounted = true;
      mountFromScript(script);
    });
  }

  window.WidgetWizzardReviews = {
    init: autoInit,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
