(function () {
  var STYLE_ID = 'ww-reviews-widget-dark-styles';
  var EXPANDED_REVIEWS = Object.create(null);

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.ww-reviews-widget{--ww-bg:#05070b;--ww-surface:#0f131a;--ww-surface-strong:#171d26;--ww-border:#222b38;--ww-text:#e5ebf5;--ww-muted:#9aa8bf;--ww-star:#ffbf1a;--ww-primary:#38bdf8;--ww-shadow:0 20px 50px rgba(0,0,0,.45);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;border:1px solid var(--ww-border);border-radius:24px;padding:16px;background:radial-gradient(circle at top,#131b27 0%,#05070b 70%);color:var(--ww-text);box-shadow:var(--ww-shadow)}',
      '.ww-tabs{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:0 2px 14px;border-bottom:1px solid var(--ww-border);margin-bottom:18px;overflow:auto hidden;scrollbar-width:none}',
      '.ww-tabs::-webkit-scrollbar{display:none}',
      '.ww-tab{display:inline-flex;align-items:center;gap:10px;border:0;background:transparent;border-radius:999px;padding:10px 14px;font-size:15px;font-weight:500;color:var(--ww-text);cursor:pointer;white-space:nowrap;transition:background-color .2s ease,color .2s ease,box-shadow .2s ease}',
      '.ww-tab:hover{background:#1a2331}',
      '.ww-tab.is-active{background:var(--ww-surface-strong);box-shadow:inset 0 -2px 0 #7dd3fc}',
      '.ww-tab-label{display:inline-flex;align-items:center;gap:8px}',
      '.ww-tab-score{font-weight:700}',
      '.ww-tab-icon{width:22px;height:22px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex:none}',
      '.ww-tab-icon.is-google{background:conic-gradient(from 210deg,#4285f4 0 25%,#34a853 25% 50%,#fbbc05 50% 75%,#ea4335 75% 100%)}',
      '.ww-tab-icon.is-homeadvisor{background:linear-gradient(135deg,#f59e0b,#fb7185)}',
      '.ww-tab-icon.is-yelp{background:#ef4444}',
      '.ww-tab-icon.is-facebook{background:#1877f2}',
      '.ww-tab-icon.is-default{background:#64748b}',
      '.ww-overview{display:flex;justify-content:space-between;gap:18px;align-items:center;flex-wrap:wrap;padding:28px;background:linear-gradient(135deg,#121926 0%,#0c121c 100%);border:1px solid var(--ww-border);border-radius:18px;margin-bottom:22px}',
      '.ww-overview-copy{display:flex;flex-direction:column;gap:10px;min-width:220px}',
      '.ww-overview-title{font-size:18px;font-weight:700;line-height:1.2}',
      '.ww-overview-meta{display:flex;gap:10px;align-items:center;flex-wrap:wrap}',
      '.ww-overview-score{font-size:21px;font-weight:800;line-height:1}',
      '.ww-rating-count{font-size:14px;color:var(--ww-muted)}',
      '.ww-stars{color:var(--ww-star);letter-spacing:2px;font-size:26px;line-height:1}',
      '.ww-business{display:flex;gap:12px;align-items:center}',
      '.ww-business-logo{width:48px;height:48px;border-radius:16px;object-fit:cover;border:1px solid var(--ww-border);background:#0b0f16}',
      '.ww-business-name{font-size:14px;font-weight:600;color:var(--ww-muted)}',
      '.ww-write-review{display:inline-flex;align-items:center;justify-content:center;min-width:136px;padding:13px 20px;border-radius:10px;background:var(--ww-primary);color:#00111a;text-decoration:none;font-size:15px;font-weight:700;box-shadow:0 10px 24px rgba(56,189,248,.25);transition:transform .2s ease,box-shadow .2s ease}',
      '.ww-write-review:hover{transform:translateY(-1px);box-shadow:0 14px 28px rgba(56,189,248,.35)}',
      '.ww-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px}',
      '.ww-card{border:1px solid var(--ww-border);border-radius:16px;padding:26px 26px 22px;background:linear-gradient(180deg,#0f141d 0%,#0b1018 100%);min-height:246px;display:flex;flex-direction:column;box-shadow:0 12px 26px rgba(0,0,0,.25)}',
      '.ww-card-head{display:flex;gap:14px;align-items:flex-start;margin-bottom:16px}',
      '.ww-avatar{width:44px;height:44px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#fff;flex:none;text-transform:lowercase}',
      '.ww-card-meta{min-width:0;display:flex;flex-direction:column;gap:3px}',
      '.ww-user{font-weight:700;font-size:15px;color:var(--ww-text);line-height:1.3;word-break:break-word}',
      '.ww-date{font-size:14px;color:var(--ww-muted)}',
      '.ww-card-stars{color:var(--ww-star);letter-spacing:2px;font-size:18px;margin-bottom:12px;line-height:1}',
      '.ww-comment{font-size:16px;line-height:1.55;color:#ccd6e7;margin:0 0 8px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}',
      '.ww-comment.is-expanded{display:block;-webkit-line-clamp:unset;overflow:visible}',
      '.ww-read-more{border:0;padding:0;background:transparent;color:#9ab0cf;font-size:14px;font-weight:500;cursor:pointer;align-self:flex-start;margin-bottom:auto}',
      '.ww-card-footer{display:flex;align-items:center;gap:10px;margin-top:22px;color:#9ab0cf;font-size:14px}',
      '.ww-source-stack{display:flex;flex-direction:column;line-height:1.15}',
      '.ww-source-note{font-size:12px;color:#7e8da8}',
      '.ww-source-name{font-size:15px;color:#7dd3fc;font-weight:500}',
      '.ww-source-badge{width:30px;height:30px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex:none}',
      '.ww-empty{border:1px dashed var(--ww-border);border-radius:16px;padding:32px;background:#0d131c;color:#99a9c4;text-align:center;font-size:15px}',
      '.ww-error{border:1px solid #7f1d1d;background:#2a1111;color:#fecaca;border-radius:10px;padding:10px;font-size:13px}',
      '.ww-loading{font-size:13px;color:#9ab0cf}',
      '@media (max-width:700px){.ww-reviews-widget{padding:14px;border-radius:18px}.ww-tabs{gap:8px;padding-bottom:12px;margin-bottom:14px}.ww-tab{padding:9px 12px;font-size:14px}.ww-overview{padding:20px}.ww-overview-title{font-size:16px}.ww-overview-score{font-size:18px}.ww-stars{font-size:22px}.ww-grid{grid-template-columns:1fr;gap:16px}.ww-card{padding:20px;min-height:0}.ww-comment{font-size:15px}}',
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

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function normalizeSource(value) {
    return String(value || 'Unknown').trim() || 'Unknown';
  }

  function getSourceClass(source) {
    var slug = slugify(source);
    if (slug.indexOf('google') !== -1) return 'is-google';
    if (slug.indexOf('homeadvisor') !== -1 || slug.indexOf('home-advisor') !== -1) return 'is-homeadvisor';
    if (slug.indexOf('yelp') !== -1) return 'is-yelp';
    if (slug.indexOf('facebook') !== -1) return 'is-facebook';
    return 'is-default';
  }

  function getSourceLetter(source) {
    return normalizeSource(source).charAt(0).toUpperCase() || 'R';
  }

  function getReviewText(review) {
    return review.commentary || review.comment || review.content || review.text || review.body || '';
  }

  function getReviewDate(review) {
    var keys = ['createdAt', 'created_at', 'publishedAt', 'published_at', 'date', 'reviewDate', 'timestamp', 'time'];
    var index;

    for (index = 0; index < keys.length; index += 1) {
      if (!review[keys[index]]) continue;
      var parsed = new Date(review[keys[index]]);
      if (!isNaN(parsed.getTime())) return parsed;
    }

    return null;
  }

  function formatRelativeDate(date) {
    if (!date) return 'Recently';

    var diffMs = date.getTime() - Date.now();
    var units = [
      { name: 'year', value: 1000 * 60 * 60 * 24 * 365 },
      { name: 'month', value: 1000 * 60 * 60 * 24 * 30 },
      { name: 'week', value: 1000 * 60 * 60 * 24 * 7 },
      { name: 'day', value: 1000 * 60 * 60 * 24 },
      { name: 'hour', value: 1000 * 60 * 60 },
      { name: 'minute', value: 1000 * 60 },
    ];
    var index;

    for (index = 0; index < units.length; index += 1) {
      var unit = units[index];
      var amount = diffMs / unit.value;
      if (Math.abs(amount) >= 1) {
        var rounded = Math.round(amount);
        if (typeof Intl !== 'undefined' && Intl.RelativeTimeFormat) {
          return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(rounded, unit.name);
        }
        return rounded < 0 ? Math.abs(rounded) + ' ' + unit.name + (Math.abs(rounded) === 1 ? '' : 's') + ' ago' : 'in ' + rounded + ' ' + unit.name + (rounded === 1 ? '' : 's');
      }
    }

    return 'Just now';
  }

  function hashColor(value) {
    var text = String(value || 'review');
    var hash = 0;
    var index;

    for (index = 0; index < text.length; index += 1) {
      hash = text.charCodeAt(index) + ((hash << 5) - hash);
    }

    var palette = ['#0f766e', '#166534', '#1d4ed8', '#4338ca', '#9d174d', '#b45309', '#c2410c', '#7c3aed', '#0f766e', '#9a3412'];
    return palette[Math.abs(hash) % palette.length];
  }

  function getInitial(user) {
    var text = String(user || 'R').trim();
    return text ? text.charAt(0).toUpperCase() : 'R';
  }

  function createStars(score, className) {
    return createElement('div', className, stars(score));
  }

  function getReviewId(review, index) {
    return slugify([review.user, review.origin, review.date, review.createdAt, index].join('-')) || 'review-' + index;
  }

  function getWriteReviewUrl(payload) {
    return payload.writeReviewUrl || payload.reviewUrl || payload.leaveReviewUrl || payload.externalReviewUrl || '';
  }

  function summarizeSources(reviews) {
    var summaryMap = Object.create(null);

    reviews.forEach(function (review) {
      var source = normalizeSource(review.origin);
      if (!summaryMap[source]) {
        summaryMap[source] = {
          source: source,
          count: 0,
          total: 0,
        };
      }

      summaryMap[source].count += 1;
      summaryMap[source].total += Number(review.rate) || 0;
    });

    return Object.keys(summaryMap)
      .map(function (source) {
        var item = summaryMap[source];
        item.avg = item.count ? item.total / item.count : 0;
        return item;
      })
      .sort(function (left, right) {
        return right.count - left.count;
      });
  }

  function renderGrid(grid, reviews) {
    grid.innerHTML = '';

    if (!reviews.length) {
      grid.appendChild(createElement('div', 'ww-empty', 'No reviews available for this source.'));
      return;
    }

    reviews.forEach(function (review, index) {
      var card = createElement('article', 'ww-card');
      var cardHead = createElement('div', 'ww-card-head');
      var avatar = createElement('div', 'ww-avatar', getInitial(review.user || 'Anonymous'));
      var cardMeta = createElement('div', 'ww-card-meta');
      var reviewId = getReviewId(review, index);
      var reviewText = getReviewText(review);
      var shouldClamp = reviewText.length > 115;
      var comment = createElement('p', 'ww-comment', reviewText);
      var source = normalizeSource(review.origin);
      var sourceBadge = createElement('div', 'ww-source-badge ' + getSourceClass(source), getSourceLetter(source));
      var sourceStack = createElement('div', 'ww-source-stack');

      avatar.style.background = hashColor(review.user || reviewId);

      cardMeta.appendChild(createElement('div', 'ww-user', review.user || 'Anonymous'));
      cardMeta.appendChild(createElement('div', 'ww-date', formatRelativeDate(getReviewDate(review))));

      cardHead.appendChild(avatar);
      cardHead.appendChild(cardMeta);

      if (EXPANDED_REVIEWS[reviewId]) {
        comment.className += ' is-expanded';
      }

      card.appendChild(cardHead);
      card.appendChild(createStars(review.rate || 0, 'ww-card-stars'));
      card.appendChild(comment);

      if (shouldClamp) {
        var readMore = createElement('button', 'ww-read-more', EXPANDED_REVIEWS[reviewId] ? 'Show less' : 'Read more');
        readMore.type = 'button';
        readMore.addEventListener('click', function () {
          EXPANDED_REVIEWS[reviewId] = !EXPANDED_REVIEWS[reviewId];
          if (EXPANDED_REVIEWS[reviewId]) {
            comment.classList.add('is-expanded');
            readMore.textContent = 'Show less';
          } else {
            comment.classList.remove('is-expanded');
            readMore.textContent = 'Read more';
          }
        });
        card.appendChild(readMore);
      }

      sourceStack.appendChild(createElement('span', 'ww-source-note', 'Posted on'));
      sourceStack.appendChild(createElement('span', 'ww-source-name', source));

      var footer = createElement('div', 'ww-card-footer');
      footer.appendChild(sourceBadge);
      footer.appendChild(sourceStack);

      card.appendChild(footer);
      grid.appendChild(card);
    });
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
    var sourceSummary = summarizeSources(limitedReviews);

    var total = reviews.length;
    var avg = total
      ? reviews.reduce(function (acc, item) {
          return acc + (Number(item.rate) || 0);
        }, 0) / total
      : 0;

    target.innerHTML = '';

    var root = createElement('section', 'ww-reviews-widget');

    var tabs = createElement('div', 'ww-tabs');
    var overview = createElement('section', 'ww-overview');
    var overviewCopy = createElement('div', 'ww-overview-copy');
    var overviewMeta = createElement('div', 'ww-overview-meta');
    var business = createElement('div', 'ww-business');
    var grid = createElement('div', 'ww-grid');
    var activeSource = 'all';

    if (payload.logoUrl) {
      var logo = createElement('img', 'ww-business-logo');
      logo.src = payload.logoUrl;
      logo.alt = payload.businessName || 'Business logo';
      business.appendChild(logo);
    }

    var businessText = createElement('div');
    businessText.appendChild(createElement('div', 'ww-business-name', payload.businessName || 'Reviews'));
    businessText.appendChild(createElement('div', 'ww-overview-title', 'Overall Rating'));
    business.appendChild(businessText);

    overviewMeta.appendChild(createElement('div', 'ww-overview-score', avg.toFixed(1)));
    overviewMeta.appendChild(createStars(avg, 'ww-stars'));
    overviewMeta.appendChild(createElement('div', 'ww-rating-count', '(' + total + ')'));

    overviewCopy.appendChild(business);
    overviewCopy.appendChild(overviewMeta);
    overview.appendChild(overviewCopy);

    var writeReviewUrl = getWriteReviewUrl(payload);
    if (writeReviewUrl) {
      var writeReview = createElement('a', 'ww-write-review', 'Write a Review');
      writeReview.href = writeReviewUrl;
      writeReview.target = '_blank';
      writeReview.rel = 'noopener noreferrer';
      overview.appendChild(writeReview);
    }

    function setActiveTab(source, tabButtons) {
      activeSource = source;
      tabButtons.forEach(function (tabButton) {
        if (tabButton.dataset.source === source) {
          tabButton.classList.add('is-active');
        } else {
          tabButton.classList.remove('is-active');
        }
      });

      renderGrid(
        grid,
        source === 'all'
          ? limitedReviews
          : limitedReviews.filter(function (review) {
              return normalizeSource(review.origin) === source;
            })
      );
    }

    var tabButtons = [];

    function buildTab(label, score, source, iconClass) {
      var tab = createElement('button', 'ww-tab');
      var tabLabel = createElement('span', 'ww-tab-label');

      tab.type = 'button';
      tab.dataset.source = source;

      if (iconClass) {
        tabLabel.appendChild(createElement('span', 'ww-tab-icon ' + iconClass, getSourceLetter(label)));
      }

      tabLabel.appendChild(createElement('span', '', label));
      tab.appendChild(tabLabel);
      tab.appendChild(createElement('span', 'ww-tab-score', score.toFixed(1)));
      tab.addEventListener('click', function () {
        setActiveTab(source, tabButtons);
      });

      tabButtons.push(tab);
      tabs.appendChild(tab);
    }

    buildTab('All Reviews', avg, 'all', '');
    sourceSummary.forEach(function (item) {
      buildTab(item.source, item.avg, item.source, getSourceClass(item.source));
    });

    root.appendChild(tabs);
    root.appendChild(overview);
    root.appendChild(grid);
    target.appendChild(root);

    setActiveTab(activeSource, tabButtons);
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
      if (script.__wwMountedDarkGrid) return;
      var layout = String(script.dataset.layout || '').toLowerCase();
      var theme = String(script.dataset.theme || '').toLowerCase();
      if (layout && layout !== 'grid') return;
      if (theme !== 'black' && theme !== 'dark') return;
      script.__wwMountedDarkGrid = true;
      mountFromScript(script);
    });
  }

  window.WidgetWizzardReviewsDark = {
    init: autoInit,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();