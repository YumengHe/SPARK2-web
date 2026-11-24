(function () {
  var root = document.getElementById('spark-clean');
  if (!root) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = null;
  // Play each clip only while it is on screen; with reduced motion, clips stay on their poster frame.
  if ('IntersectionObserver' in window && !reduceMotion) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); }
      });
    }, { rootMargin: '200px' });
  }
  // The autoplay attribute (kept for pages without this script) starts every clip downloading; reset each clip
  // to its poster so only those that reach the screen are fetched.
  function watch(video) {
    if (!reduceMotion && !io) return;
    if (video.hasAttribute('autoplay')) { video.removeAttribute('autoplay'); video.pause(); if (video.networkState === 2 || video.readyState) video.load(); }
    if (io) io.observe(video);
  }
  Array.prototype.forEach.call(root.querySelectorAll('video.sc-clip'), watch);

  // Gallery: an endless row that drifts slowly to the left. Copies of the entries are added on both sides and the
  // position wraps by one full set, so there is no first or last card. Without this script the row scrolls natively.
  var track = root.querySelector('.sc-showcase');
  if (track && track.children.length) {
    var SPEED = 30;          // px per second of the automatic drift
    var RESUME_MS = 1500;    // wait after hover, touch or a click before drifting again
    var section = track.closest('.sc-showcase-section');
    var holder = track.parentNode;
    var originals = Array.prototype.slice.call(track.children);
    var N = originals.length;
    section.classList.add('sc-loop');

    function copySet(before) {
      var ref = before ? track.firstChild : null;
      originals.forEach(function (f) {
        var c = f.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.classList.add('sc-copy');
        track.insertBefore(c, ref);
        Array.prototype.forEach.call(c.querySelectorAll('video'), watch);
      });
    }
    function button(cls, label, svg) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = cls;
      b.setAttribute('aria-label', label);
      b.innerHTML = svg;
      holder.appendChild(b);
      return b;
    }
    function arrow(cls, label, d) {
      return button('sc-gal-btn ' + cls, label, '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>');
    }
    var prev = arrow('sc-gal-prev', 'Previous', 'M15 5l-7 7 7 7');
    var next = arrow('sc-gal-next', 'Next', 'M9 5l7 7-7 7');
    var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
    var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>';
    var toggle = reduceMotion ? null : button('sc-gal-toggle', 'Pause gallery', ICON_PAUSE);

    var before = 1, after = 0;      // copied sets on each side of the originals
    var step = 1, W = 1, view = 1;  // card pitch, width of one set, visible width
    var pos = 0, drawn = NaN;       // drift position in px (kept fractional) and the last value written
    var v = 0, fling = 0, tween = null, drag = null;
    var hovering = false, focused = false, stopped = false, offscreen = false, holdUntil = 0;
    var raf = 0, last = 0;

    function measure() {
      var figs = track.children;
      view = holder.clientWidth;
      step = figs[1] ? figs[1].offsetLeft - figs[0].offsetLeft : figs[0].offsetWidth;
      W = N * step;
      while (after < Math.ceil(view / W) + 1) { copySet(false); after++; }
    }
    copySet(true);
    measure();
    pos = before * W;

    function wrap() {
      var lo = before * W, shift = 0;
      while (pos < lo) { pos += W; shift += W; }
      while (pos >= lo + W) { pos -= W; shift -= W; }
      if (shift && tween) { tween.from += shift; tween.to += shift; }
    }
    function draw() {
      if (pos === drawn) return;
      drawn = pos;
      track.style.transform = 'translate3d(' + (-pos).toFixed(2) + 'px,0,0)';
    }
    function auto() { return !reduceMotion && !stopped && !hovering && !focused && !drag && !offscreen && !document.hidden; }
    function busy() { return tween || drag || fling || v || auto(); }
    function frame(now) {
      raf = 0;
      var dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      if (tween) {
        var k = Math.min(1, (now - tween.t0) / tween.dur);
        var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        pos = tween.from + (tween.to - tween.from) * e;
        if (k >= 1) tween = null;
        v = 0;
      } else if (!drag) {
        if (Math.abs(fling) > 1) { pos += fling * dt; fling *= Math.exp(-dt / 0.325); } else { fling = 0; }
        var target = auto() && now >= holdUntil && !fling ? SPEED : 0;
        v += (target - v) * (1 - Math.exp(-dt / 0.35));
        if (target === 0 && v < 0.05) v = 0;
        pos += v * dt;
      }
      wrap();
      draw();
      if (document.hidden || offscreen) { v = 0; return; }
      if (busy()) raf = requestAnimationFrame(frame);
    }
    function kick() {
      if (!raf && !document.hidden && !offscreen) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }
    function hold() { holdUntil = performance.now() + RESUME_MS; kick(); }

    function go(dir) {
      var base = tween ? tween.to : pos;
      var rel = (base - before * W) / step;
      var k = dir > 0 ? Math.floor(rel + 1e-3) + 1 : Math.ceil(rel - 1e-3) - 1;
      var to = before * W + k * step;
      fling = 0; v = 0;
      if (reduceMotion) { pos = to; tween = null; wrap(); draw(); }
      else tween = { from: pos, to: to, t0: performance.now(), dur: 650 };
      hold();
    }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(e.key === 'ArrowLeft' ? -1 : 1); }
    });
    if (toggle) toggle.addEventListener('click', function () {
      stopped = !stopped;
      toggle.setAttribute('aria-label', stopped ? 'Play gallery' : 'Pause gallery');
      toggle.innerHTML = stopped ? ICON_PLAY : ICON_PAUSE;
      if (!stopped) { hovering = false; focused = false; holdUntil = 0; }
      kick();
    });

    // Pause while a mouse is over the gallery or the keyboard is in it; resume a moment after it leaves.
    holder.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; kick(); } });
    holder.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hovering = false; hold(); } });
    holder.addEventListener('focusin', function (e) {
      var t = e.target;
      if (t !== toggle && t.matches && t.matches(':focus-visible')) { focused = true; kick(); }
    });
    holder.addEventListener('focusout', function (e) {
      if (!holder.contains(e.relatedTarget)) { focused = false; hold(); }
    });

    // Drag with a finger, pen or mouse; a quick release keeps gliding and slows down.
    track.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      drag = { id: e.pointerId, x: e.clientX, t: e.timeStamp, vx: 0, moved: false };
      tween = null; fling = 0; v = 0;
      kick();
    });
    track.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 4) return;
      if (!drag.moved) { drag.moved = true; try { track.setPointerCapture(e.pointerId); } catch (err) {} section.classList.add('sc-dragging'); }
      var dt = Math.max(1, e.timeStamp - drag.t);
      drag.vx = 0.8 * (-dx / dt * 1000) + 0.2 * drag.vx;
      drag.x = e.clientX; drag.t = e.timeStamp;
      pos -= dx; wrap(); draw();
    });
    function release(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved && e.timeStamp - drag.t < 80) fling = Math.max(-3000, Math.min(3000, drag.vx));
      drag = null;
      section.classList.remove('sc-dragging');
      hold();
    }
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    track.addEventListener('wheel', function (e) {
      var dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (!dx || Math.abs(dx) < Math.abs(e.deltaY) && !e.shiftKey) return;
      e.preventDefault();
      tween = null; fling = 0; v = 0;
      pos += dx * (e.deltaMode === 1 ? 16 : 1); wrap(); draw();
      hold();
    }, { passive: false });

    // Stop the clock while the gallery is off screen or the tab is hidden.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        offscreen = !entries[entries.length - 1].isIntersecting;
        if (!offscreen) kick();
      }).observe(holder);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });
    window.addEventListener('resize', function () {
      var phase = (pos - before * W) / W;
      measure();
      pos = before * W + phase * W;
      wrap(); draw();
    });
    draw();
    kick();
  }

  // Fade sections in as they reach the screen; without this script, or with reduced motion, everything is shown as is.
  if ('IntersectionObserver' in window && !reduceMotion) {
    var parts = root.querySelectorAll('.sc-heading, .sc-wide-figure, .sc-abstract-copy, .sc-stage, .sc-results-head, .sc-results-row, .sc-task-row, .sc-motion-grid article, .sc-scroll, .sc-split > *, .sc-showcase-section .sc-container');
    var shown = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sc-in'); shown.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(parts, function (el) { el.classList.add('sc-reveal'); shown.observe(el); });
    root.classList.add('sc-anim');
  }
})();
