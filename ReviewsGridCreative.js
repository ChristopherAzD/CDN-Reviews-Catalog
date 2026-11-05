(function () {
  'use strict';

  var STYLE_ID = 'ww-creative-grid-styles';
  var SCRIPT_NAME = 'ReviewsGridCreative.js';

  function el(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = String(value);
    return node;
  }

  function styles() {
    if (document.getElementById(STYLE_ID)) return;
    var sheet = el('style');
    sheet.id = STYLE_ID;
    sheet.textContent = [
      '.wwc-widget{--ink:#152236;--muted:#69788a;--accent:#6655ed;--line:#e9e9f3;box-sizing:border-box;width:100%;overflow:hidden;padding:clamp(20px,4vw,48px);border-radius:30px;background:radial-gradient(circle at 95% 0%,#e9e5ff 0,transparent 33%),radial-gradient(circle at 0% 100%,#e0f6f2 0,transparent 30%),#f9f9fc;color:var(--ink);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}',
      '.wwc-widget *{box-sizing:border-box}',
      '.wwc-head{display:flex;align-items:end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:25px}',
      '.wwc-eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--accent);font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}',
      '.wwc-eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:#70d7bc;box-shadow:0 0 0 5px #70d7bc33}',
      '.wwc-title{margin:9px 0 5px;font-size:clamp(27px,4vw,42px);line-height:1.08;letter-spacing:-.045em}',
      '.wwc-subtitle{margin:0;color:var(--muted);font-size:14px}',
      '.wwc-score{display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid #ffffff;background:#ffffffbd;border-radius:18px;box-shadow:0 10px 30px #2830570d}',
      '.wwc-score-number{font-size:29px;font-weight:850;letter-spacing:-.05em;line-height:1}',
      '.wwc-score-meta{display:flex;flex-direction:column;gap:2px;font-size:12px;color:var(--muted)}',
      '.wwc-stars{color:#ffaf38;letter-spacing:2px;white-space:nowrap}',
      '.wwc-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:20px}',
      '.wwc-filters{display:flex;gap:8px;overflow:auto;max-width:100%;scrollbar-width:thin;padding:3px 0}',
      '.wwc-filter{flex:none;border:1px solid var(--line);border-radius:999px;background:#fff;color:#596779;padding:9px 14px;font:600 13px inherit;cursor:pointer;transition:transform .2s,background .2s,color .2s}',
      '.wwc-filter:hover,.wwc-more:hover,.wwc-write:hover{transform:translateY(-2px)}',
      '.wwc-filter[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}',
      '.wwc-write{display:inline-flex;align-items:center;gap:7px;color:var(--accent);font-size:13px;font-weight:750;text-decoration:none;transition:transform .2s}',
      '.wwc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:14px;align-items:start}',
      '.wwc-card{position:relative;min-width:0;padding:18px;border:1px solid #eeedf5;border-radius:20px;background:#fff;box-shadow:0 5px 18px #1d255009;animation:wwc-enter .5s both;animation-delay:var(--delay,0ms);transition:transform .25s,box-shadow .25s,border-color .25s}',
      '.wwc-card:hover{transform:translateY(-5px);box-shadow:0 16px 35px #302a711c;border-color:#dcd4ff}',
      '.wwc-card:before{content:"“";position:absolute;right:16px;top:6px;color:#e8e4ff;font:700 62px Georgia,serif;line-height:1}',
      '.wwc-card-top{position:relative;display:flex;align-items:center;gap:10px;min-width:0;margin-bottom:14px}',
      '.wwc-avatar{display:grid;place-items:center;flex:none;width:37px;height:37px;border-radius:13px;background:var(--avatar,#6557eb);color:#fff;font-size:15px;font-weight:800}',
      '.wwc-identity{min-width:0;flex:1}',
      '.wwc-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:800}',
      '.wwc-date{color:#8a96a4;font-size:11px}',
      '.wwc-card-stars{color:#ffaf38;font-size:14px;letter-spacing:1px;margin-bottom:8px}',
      '.wwc-comment{margin:0;color:#4b596a;font-size:13px;line-height:1.55;overflow-wrap:anywhere;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}',
      '.wwc-comment.is-open{display:block;overflow:visible}',
      '.wwc-read{display:inline-block;padding:5px 0 0;border:0;background:none;color:var(--accent);font:700 12px system-ui,sans-serif;cursor:pointer}',
      '.wwc-card-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:15px;padding-top:11px;border-top:1px solid #f0f0f5;color:#8993a2;font-size:11px}',
      '.wwc-source{display:inline-flex;align-items:center;gap:6px;font-weight:700;color:#5a687a}',
      '.wwc-source-dot{width:7px;height:7px;border-radius:50%;background:var(--accent)}',
      '.wwc-bottom{display:flex;justify-content:center;margin-top:24px}',
      '.wwc-more{border:0;border-radius:999px;background:var(--accent);color:white;padding:13px 24px;font:750 13px system-ui,sans-serif;cursor:pointer;box-shadow:0 10px 24px #6655ed38;transition:transform .2s,box-shadow .2s}',
      '.wwc-more:hover{box-shadow:0 14px 28px #6655ed50}',
      '.wwc-empty{grid-column:1/-1;text-align:center;padding:35px;color:var(--muted);background:#fff;border-radius:18px}',
      '.wwc-status{font:14px system-ui,sans-serif;color:#69788a;padding:18px}',
      '.wwc-status.is-error{color:#b42318}',
      '@keyframes wwc-enter{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}',
      '@media(max-width:600px){.wwc-widget{padding:19px;border-radius:22px}.wwc-head{align-items:start}.wwc-grid{gap:10px}.wwc-card{padding:16px}}',
      '@media(prefers-reduced-motion:reduce){.wwc-card{animation:none}.wwc-card,.wwc-filter,.wwc-more,.wwc-write{transition:none}}'
    ].join('');
    document.head.appendChild(sheet);
  }

  function text(review) {
    return String(review.commentary || review.comment || review.content || review.text || review.body || '');
  }

  function source(review) {
    return String(review.origin || 'Other').trim() || 'Other';
  }

  function stars(rate) {
    var n = Math.max(0, Math.min(5, Math.round(Number(rate) || 0)));
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  function date(review) {
    var keys = ['createdAt', 'created_at', 'publishedAt', 'published_at', 'date', 'reviewDate', 'timestamp', 'time'];
    for (var i = 0; i < keys.length; i++) {
      if (!review[keys[i]]) continue;
      var parsed = new Date(review[keys[i]]);
      if (!isNaN(parsed.getTime())) return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(parsed);
    }
    return 'Recent review';
  }

  function targetFor(script) {
    if (script.dataset.target) {
      var found = document.getElementById(script.dataset.target);
      if (found) return found;
    }
    if (script.previousElementSibling && script.previousElementSibling.tagName === 'DIV') return script.previousElementSibling;
    var target = el('div');
    script.parentNode.insertBefore(target, script);
    return target;
  }

  function card(review, index) {
    var node = el('article', 'wwc-card');
    node.style.setProperty('--delay', Math.min(index % 12, 11) * 45 + 'ms');
    var top = el('div', 'wwc-card-top');
    var name = String(review.user || 'Anonymous');
    var avatar = el('span', 'wwc-avatar', name.trim().charAt(0).toUpperCase() || 'R');
    var colors = ['#6655ed', '#16a89a', '#ef7891', '#dd8b30', '#4e8ad4'];
    avatar.style.setProperty('--avatar', colors[index % colors.length]);
    var identity = el('div', 'wwc-identity');
    identity.appendChild(el('div', 'wwc-name', name));
    identity.appendChild(el('div', 'wwc-date', date(review)));
    top.appendChild(avatar);
    top.appendChild(identity);
    node.appendChild(top);
    var rating = el('div', 'wwc-card-stars', stars(review.rate));
    rating.setAttribute('aria-label', (Number(review.rate) || 0) + ' out of 5 stars');
    node.appendChild(rating);
    var body = el('p', 'wwc-comment', text(review));
    node.appendChild(body);
    if (text(review).length > 135) {
      var read = el('button', 'wwc-read', 'Read more');
      read.type = 'button';
      read.setAttribute('aria-expanded', 'false');
      read.addEventListener('click', function () {
        var open = body.classList.toggle('is-open');
        read.textContent = open ? 'Show less' : 'Read more';
        read.setAttribute('aria-expanded', String(open));
      });
      node.appendChild(read);
    }
    var foot = el('div', 'wwc-card-foot');
    var platform = el('span', 'wwc-source');
    platform.appendChild(el('i', 'wwc-source-dot'));
    platform.appendChild(document.createTextNode(source(review)));
    foot.appendChild(platform);
    node.appendChild(foot);
    return node;
  }

  function render(target, payload, pageSize) {
    var reviews = Array.isArray(payload.reviews) ? payload.reviews : [];
    var root = el('section', 'wwc-widget');
    var head = el('header', 'wwc-head');
    var heading = el('div');
    heading.appendChild(el('div', 'wwc-eyebrow', 'Real experiences'));
    heading.appendChild(el('h2', 'wwc-title', payload.businessName || 'What people are saying'));
    heading.appendChild(el('p', 'wwc-subtitle', 'Stories from our community'));
    head.appendChild(heading);
    if (reviews.length) {
      var average = reviews.reduce(function (sum, item) { return sum + (Number(item.rate) || 0); }, 0) / reviews.length;
      var score = el('div', 'wwc-score');
      score.appendChild(el('strong', 'wwc-score-number', average.toFixed(1)));
      var scoreMeta = el('div', 'wwc-score-meta');
      scoreMeta.appendChild(el('span', 'wwc-stars', stars(average)));
      scoreMeta.appendChild(el('span', '', reviews.length + ' reviews'));
      score.appendChild(scoreMeta);
      head.appendChild(score);
    }
    root.appendChild(head);
    var toolbar = el('div', 'wwc-toolbar');
    var filters = el('div', 'wwc-filters');
    filters.setAttribute('aria-label', 'Filter reviews by source');
    toolbar.appendChild(filters);
    var reviewUrl = payload.writeReviewUrl || payload.reviewUrl || payload.leaveReviewUrl || payload.externalReviewUrl;
    if (reviewUrl) {
      var link = el('a', 'wwc-write', 'Write a review ↗');
      link.href = reviewUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      toolbar.appendChild(link);
    }
    root.appendChild(toolbar);
    var grid = el('div', 'wwc-grid');
    root.appendChild(grid);
    var bottom = el('div', 'wwc-bottom');
    var more = el('button', 'wwc-more', 'View more reviews ↓');
    more.type = 'button';
    bottom.appendChild(more);
    root.appendChild(bottom);
    target.replaceChildren(root);

    var active = null;
    var shown = pageSize;
    var sources = [];
    reviews.forEach(function (review) { if (sources.indexOf(source(review)) < 0) sources.push(source(review)); });

    function draw() {
      var filtered = active === null ? reviews : reviews.filter(function (review) { return source(review) === active; });
      grid.replaceChildren();
      if (!filtered.length) grid.appendChild(el('div', 'wwc-empty', 'No reviews available yet.'));
      filtered.slice(0, shown).forEach(function (review, index) { grid.appendChild(card(review, index)); });
      more.hidden = filtered.length <= shown;
      more.textContent = 'View more reviews ↓  (' + Math.min(pageSize, filtered.length - shown) + ')';
    }

    function addFilter(label, value) {
      var button = el('button', 'wwc-filter', label);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(active === value));
      button.addEventListener('click', function () {
        active = value;
        shown = pageSize;
        Array.prototype.forEach.call(filters.children, function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        draw();
      });
      filters.appendChild(button);
    }
    addFilter('All reviews · ' + reviews.length, null);
    sources.forEach(function (item) {
      addFilter(item + ' · ' + reviews.filter(function (review) { return source(review) === item; }).length, item);
    });
    more.addEventListener('click', function () { shown += pageSize; draw(); });
    draw();
  }

  function mount(script) {
    var widgetId = script.dataset.widgetId || script.dataset.apiKey;
    if (!widgetId) return;
    styles();
    var target = targetFor(script);
    target.replaceChildren(el('div', 'wwc-status', 'Loading reviews...'));
    var size = parseInt(script.dataset.pageSize || '6', 10);
    if (!Number.isFinite(size) || size < 1) size = 6;
    var apiBase = script.dataset.apiBase || window.location.origin;
    fetch(apiBase.replace(/\/$/, '') + '/api/reviews/' + encodeURIComponent(widgetId))
      .then(function (response) { if (!response.ok) throw new Error('Reviews unavailable'); return response.json(); })
      .then(function (payload) { render(target, payload, size); })
      .catch(function () { target.replaceChildren(el('div', 'wwc-status is-error', 'The reviews widget could not be loaded right now.')); });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('script[data-widget-id],script[data-api-key]'), function (script) {
      if (script.__wwCreativeMounted || !script.src || script.src.indexOf(SCRIPT_NAME) === -1) return;
      script.__wwCreativeMounted = true;
      mount(script);
    });
  }

  window.WidgetWizzardReviewsGridCreative = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
