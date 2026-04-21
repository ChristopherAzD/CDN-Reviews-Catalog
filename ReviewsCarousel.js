(function () {
  var STYLE_ID = 'ww-reviews-carousel-styles';

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.ww-carousel-widget{--ww-bg:#ffffff;--ww-surface:#f8fafc;--ww-border:#e5e7eb;--ww-text:#0f172a;--ww-muted:#64748b;--ww-star:#f59e0b;--ww-primary:#2563eb;--ww-shadow:0 16px 42px rgba(15,23,42,.08);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;border:1px solid var(--ww-border);border-radius:24px;padding:16px;background:linear-gradient(180deg,#fff 0%,#f8fafc 100%);color:var(--ww-text);box-shadow:var(--ww-shadow);overflow:hidden}',
      '.ww-carousel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}',
      '.ww-carousel-title{font-size:20px;font-weight:800;margin:0}',
      '.ww-carousel-subtitle{font-size:14px;color:var(--ww-muted);margin:2px 0 0}',
      '.ww-carousel-actions{display:flex;align-items:center;gap:8px}',
      '.ww-btn{width:36px;height:36px;border-radius:999px;border:1px solid var(--ww-border);background:#fff;color:#1e293b;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:17px;line-height:1;transition:all .2s ease}',
      '.ww-btn:hover{background:#f1f5f9;border-color:#cbd5e1}',
      '.ww-carousel-viewport{overflow:hidden;border-radius:16px}',
      '.ww-carousel-track{display:flex;gap:14px;will-change:transform;transition:transform .45s ease}',
      '.ww-review-card{flex:0 0 calc((100% - 28px) / 3);min-height:230px;border:1px solid var(--ww-border);border-radius:16px;background:var(--ww-surface);padding:18px;display:flex;flex-direction:column}',
      '.ww-card-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}',
      '.ww-avatar{width:38px;height:38px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex:none}',
      '.ww-user{font-size:14px;font-weight:700;line-height:1.2}',
      '.ww-date{font-size:12px;color:var(--ww-muted)}',
      '.ww-stars{color:var(--ww-star);letter-spacing:2px;font-size:16px;line-height:1;margin-bottom:10px}',
      '.ww-comment{font-size:14px;line-height:1.5;color:#334155;margin:0;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}',
      '.ww-source{margin-top:auto;padding-top:12px;font-size:12px;color:var(--ww-muted)}',
      '.ww-dots{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:14px}',
      '.ww-dot{width:8px;height:8px;border-radius:999px;background:#cbd5e1;cursor:pointer;transition:all .2s ease}',
      '.ww-dot.is-active{width:22px;background:var(--ww-primary)}',
      '.ww-write-review{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:10px;background:var(--ww-primary);color:#fff;text-decoration:none;font-size:13px;font-weight:700}',
      '.ww-empty{border:1px dashed var(--ww-border);border-radius:12px;padding:24px;text-align:center;color:var(--ww-muted);font-size:14px;background:#fff}',
      '.ww-error{border:1px solid #fecaca;background:#fef2f2;color:#991b1b;border-radius:10px;padding:10px;font-size:13px}',
      '.ww-loading{font-size:13px;color:#64748b}',
      '@media (max-width:980px){.ww-review-card{flex-basis:calc((100% - 14px)/2)}}',
      '@media (max-width:700px){.ww-carousel-widget{padding:14px;border-radius:18px}.ww-carousel-title{font-size:17px}.ww-review-card{flex-basis:100%}.ww-btn{width:32px;height:32px}}',
    ].join('');

    document.head.appendChild(style);
  }

  function createElement(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === 'string') el.textContent = text;
    return el;
  }

  function stars(value) {
    var rounded = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));
    return '\u2605'.repeat(rounded) + '\u2606'.repeat(5 - rounded);
  }

  function getReviewText(review) {
    return review.commentary || review.comment || review.content || review.text || review.body || '';
  }

  function getReviewDate(review) {
    var keys = ['createdAt', 'created_at', 'publishedAt', 'published_at', 'date', 'reviewDate', 'timestamp', 'time'];
    for (var i = 0; i < keys.length; i += 1) {
      if (!review[keys[i]]) continue;
      var parsed = new Date(review[keys[i]]);
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

    for (var i = 0; i < units.length; i += 1) {
      var unit = units[i];
      var amount = diffMs / unit.value;
      if (Math.abs(amount) >= 1) {
        var rounded = Math.round(amount);
        if (typeof Intl !== 'undefined' && Intl.RelativeTimeFormat) {
          return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(rounded, unit.name);
        }
        return Math.abs(rounded) + ' ' + unit.name + (Math.abs(rounded) === 1 ? '' : 's') + ' ago';
      }
    }

    return 'Just now';
  }

  function hashColor(value) {
    var text = String(value || 'review');
    var hash = 0;
    for (var i = 0; i < text.length; i += 1) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    var palette = ['#0f766e', '#166534', '#1d4ed8', '#4338ca', '#9d174d', '#b45309', '#c2410c', '#7c3aed'];
    return palette[Math.abs(hash) % palette.length];
  }

  function getInitial(user) {
    var text = String(user || 'R').trim();
    return text ? text.charAt(0).toUpperCase() : 'R';
  }

  function normalizeSource(value) {
    return String(value || 'Unknown').trim() || 'Unknown';
  }

  function getWriteReviewUrl(payload) {
    return payload.writeReviewUrl || payload.reviewUrl || payload.leaveReviewUrl || payload.externalReviewUrl || '';
  }

  function resolveTarget(script, targetId) {
    if (targetId) {
      var byId = document.getElementById(targetId);
      if (byId) return byId;
    }

    var sibling = script.previousElementSibling;
    if (sibling && sibling.tagName.toLowerCase() === 'div') return sibling;

    var auto = document.createElement('div');
    script.parentNode.insertBefore(auto, script);
    return auto;
  }

  function cardsPerView(viewport) {
    var width = viewport.clientWidth;
    if (width <= 700) return 1;
    if (width <= 980) return 2;
    return 3;
  }

  function renderCard(review) {
    var card = createElement('article', 'ww-review-card');
    var top = createElement('div', 'ww-card-top');
    var avatar = createElement('div', 'ww-avatar', getInitial(review.user || 'Anonymous'));
    var meta = createElement('div');

    avatar.style.background = hashColor(review.user || review.origin || 'review');

    meta.appendChild(createElement('div', 'ww-user', review.user || 'Anonymous'));
    meta.appendChild(createElement('div', 'ww-date', formatRelativeDate(getReviewDate(review))));

    top.appendChild(avatar);
    top.appendChild(meta);

    card.appendChild(top);
    card.appendChild(createElement('div', 'ww-stars', stars(review.rate || 0)));
    card.appendChild(createElement('p', 'ww-comment', getReviewText(review)));
    card.appendChild(createElement('div', 'ww-source', 'Posted on ' + normalizeSource(review.origin)));

    return card;
  }

  function setupLoopCarousel(track, dotsWrap, originalReviews, autoplayMs) {
    var state = {
      perView: 1,
      index: 0,
      currentX: 0,
      timer: null,
      isAnimating: false,
    };

    function clearTimer() {
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      }
    }

    function updateDots(activePage) {
      var dots = dotsWrap.querySelectorAll('.ww-dot');
      dots.forEach(function (dot, idx) {
        if (idx === activePage) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    }

    function pageCount() {
      return Math.max(1, Math.ceil(originalReviews.length / state.perView));
    }

    function build() {
      state.perView = cardsPerView(track.parentNode);
      state.index = state.perView;

      track.innerHTML = '';
      dotsWrap.innerHTML = '';

      if (!originalReviews.length) return;

      var headClones = originalReviews.slice(-state.perView);
      var tailClones = originalReviews.slice(0, state.perView);
      var all = headClones.concat(originalReviews, tailClones);

      all.forEach(function (item) {
        track.appendChild(renderCard(item));
      });

      var pages = pageCount();
      for (var i = 0; i < pages; i += 1) {
        (function (dotIndex) {
          var dot = createElement('button', 'ww-dot');
          dot.type = 'button';
          dot.addEventListener('click', function () {
            moveToPage(dotIndex);
            restartAutoplay();
          });
          dotsWrap.appendChild(dot);
        })(i);
      }

      jumpToIndex(state.index, false);
      updateDots(0);
    }

    function cardWidth() {
      var first = track.querySelector('.ww-review-card');
      if (!first) return 0;
      var gap = 14;
      return first.getBoundingClientRect().width + gap;
    }

    function jumpToIndex(index, animate) {
      var width = cardWidth();
      state.index = index;
      state.currentX = width * state.index;
      track.style.transition = animate ? 'transform .45s ease' : 'none';
      track.style.transform = 'translateX(-' + state.currentX + 'px)';
    }

    function normalizePosition() {
      var totalOriginal = originalReviews.length;
      if (state.index >= totalOriginal + state.perView) {
        jumpToIndex(state.perView, false);
      } else if (state.index < state.perView) {
        jumpToIndex(totalOriginal + state.perView - 1, false);
      }

      var logical = (state.index - state.perView) % totalOriginal;
      if (logical < 0) logical += totalOriginal;
      var page = Math.floor(logical / state.perView);
      updateDots(page);
      state.isAnimating = false;
    }

    function moveBy(step) {
      if (state.isAnimating || !originalReviews.length) return;
      state.isAnimating = true;
      jumpToIndex(state.index + step, true);
    }

    function moveToPage(page) {
      if (!originalReviews.length) return;
      var target = state.perView + page * state.perView;
      if (target > originalReviews.length + state.perView - 1) {
        target = originalReviews.length + state.perView - 1;
      }
      state.isAnimating = true;
      jumpToIndex(target, true);
    }

    function restartAutoplay() {
      clearTimer();
      if (!originalReviews.length || autoplayMs <= 0) return;
      state.timer = setInterval(function () {
        moveBy(1);
      }, autoplayMs);
    }

    track.addEventListener('transitionend', normalizePosition);

    return {
      build: build,
      next: function () {
        moveBy(1);
        restartAutoplay();
      },
      prev: function () {
        moveBy(-1);
        restartAutoplay();
      },
      restartAutoplay: restartAutoplay,
      stopAutoplay: clearTimer,
      rebuild: function () {
        build();
        restartAutoplay();
      },
    };
  }

  function renderWidget(target, payload, options) {
    var reviews = Array.isArray(payload.reviews) ? payload.reviews : [];
    var limitedReviews = reviews.slice(0, options.limit);

    target.innerHTML = '';

    var root = createElement('section', 'ww-carousel-widget');
    var head = createElement('div', 'ww-carousel-head');
    var left = createElement('div');
    var actions = createElement('div', 'ww-carousel-actions');
    var viewport = createElement('div', 'ww-carousel-viewport');
    var track = createElement('div', 'ww-carousel-track');
    var dots = createElement('div', 'ww-dots');

    left.appendChild(createElement('h3', 'ww-carousel-title', payload.businessName || 'Customer Reviews'));
    left.appendChild(createElement('p', 'ww-carousel-subtitle', limitedReviews.length + ' reviews'));

    var writeReviewUrl = getWriteReviewUrl(payload);
    if (writeReviewUrl) {
      var writeReview = createElement('a', 'ww-write-review', 'Write a Review');
      writeReview.href = writeReviewUrl;
      writeReview.target = '_blank';
      writeReview.rel = 'noopener noreferrer';
      actions.appendChild(writeReview);
    }

    var prev = createElement('button', 'ww-btn', '\u2039');
    prev.type = 'button';
    var next = createElement('button', 'ww-btn', '\u203a');
    next.type = 'button';
    actions.appendChild(prev);
    actions.appendChild(next);

    head.appendChild(left);
    head.appendChild(actions);

    if (!limitedReviews.length) {
      root.appendChild(head);
      root.appendChild(createElement('div', 'ww-empty', 'No reviews available right now.'));
      target.appendChild(root);
      return;
    }

    viewport.appendChild(track);
    root.appendChild(head);
    root.appendChild(viewport);
    root.appendChild(dots);
    target.appendChild(root);

    var carousel = setupLoopCarousel(track, dots, limitedReviews, options.autoplayMs);
    carousel.build();
    carousel.restartAutoplay();

    prev.addEventListener('click', carousel.prev);
    next.addEventListener('click', carousel.next);

    root.addEventListener('mouseenter', carousel.stopAutoplay);
    root.addEventListener('mouseleave', carousel.restartAutoplay);

    window.addEventListener('resize', carousel.rebuild);
  }

  function renderError(target, message) {
    target.innerHTML = '';
    target.appendChild(createElement('div', 'ww-error', message));
  }

  function mountFromScript(script) {
    var widgetId = script.dataset.widgetId || script.dataset.apiKey;
    var apiBase = script.dataset.apiBase || window.location.origin;
    var targetId = script.dataset.target;
    var limit = parseInt(script.dataset.limit || '12', 10);
    var autoplayMs = parseInt(script.dataset.autoplayMs || '4200', 10);

    if (!widgetId) return;

    ensureStyles();

    var target = resolveTarget(script, targetId);
    target.innerHTML = '';
    target.appendChild(createElement('div', 'ww-loading', 'Loading reviews...'));

    var endpoint = apiBase.replace(/\/$/, '') + '/api/reviews/' + encodeURIComponent(widgetId);

    fetch(endpoint)
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load reviews');
        return response.json();
      })
      .then(function (payload) {
        renderWidget(target, payload, {
          limit: Number.isFinite(limit) && limit > 0 ? limit : 12,
          autoplayMs: Number.isFinite(autoplayMs) && autoplayMs > 0 ? autoplayMs : 4200,
        });
      })
      .catch(function () {
        renderError(target, 'The reviews widget could not be loaded right now.');
      });
  }

  function autoInit() {
    var scripts = document.querySelectorAll('script[data-widget-id], script[data-api-key]');
    scripts.forEach(function (script) {
      if (script.__wwMountedCarouselWhite) return;
      if (script.src && script.src.indexOf('ReviewsCarousel.js') === -1) return;
      script.__wwMountedCarouselWhite = true;
      mountFromScript(script);
    });
  }

  window.WidgetWizzardReviewsCarousel = {
    init: autoInit,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
