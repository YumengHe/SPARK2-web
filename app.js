(function () {
  var root = document.getElementById('spark-clean');
  if (!root) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function settle(video) {
    if (reduceMotion) { video.removeAttribute('autoplay'); video.pause(); }
  }
  Array.prototype.forEach.call(root.querySelectorAll('video.sc-clip'), settle);

  // Play each clip only while it is on screen.
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); }
      });
    }, { rootMargin: '200px' });
    Array.prototype.forEach.call(root.querySelectorAll('video.sc-clip'), function (v) { v.removeAttribute('autoplay'); io.observe(v); });
  }

  // Gallery: arrow buttons, arrow keys and a thin position line; without this script the row still scrolls by itself.
  var track = root.querySelector('.sc-showcase');
  if (track) {
    var holder = track.parentNode;
    var smooth = reduceMotion ? 'auto' : 'smooth';
    function arrow(cls, label, d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sc-gal-btn ' + cls;
      b.setAttribute('aria-label', label);
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
      holder.appendChild(b);
      return b;
    }
    var prev = arrow('sc-gal-prev', 'Previous', 'M15 5l-7 7 7 7');
    var next = arrow('sc-gal-next', 'Next', 'M9 5l7 7-7 7');
    var bar = document.createElement('div');
    bar.className = 'sc-gal-bar';
    bar.setAttribute('aria-hidden', 'true');
    var thumb = document.createElement('span');
    bar.appendChild(thumb);
    holder.appendChild(bar);

    function step() {
      var f = track.querySelector('figure');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return f ? f.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    }
    function go(dir) { track.scrollBy({ left: dir * step(), behavior: smooth }); }
    var pending = false;
    function update() {
      pending = false;
      var max = track.scrollWidth - track.clientWidth;
      var x = track.scrollLeft;
      var scrolls = max > 2;
      prev.hidden = next.hidden = bar.hidden = !scrolls;
      prev.disabled = x <= 2;
      next.disabled = x >= max - 2;
      var w = track.clientWidth / track.scrollWidth;
      var pos = scrolls ? x / max : 0;
      thumb.style.width = (w * 100) + '%';
      thumb.style.transform = 'translateX(' + (pos * (1 - w) / w * 100) + '%)';
    }
    function later() { if (!pending) { pending = true; requestAnimationFrame(update); } }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(e.key === 'ArrowLeft' ? -1 : 1); }
    });
    track.addEventListener('scroll', later, { passive: true });
    window.addEventListener('resize', later);
    update();
  }

  // Fade sections in as they reach the screen; without this script, or with reduced motion, everything is shown as is.
  if ('IntersectionObserver' in window && !reduceMotion) {
    var parts = root.querySelectorAll('.sc-heading, .sc-wide-figure, .sc-abstract-copy, .sc-stage, .sc-results-head, .sc-results-row, .sc-task-row, .sc-motion-grid article, .sc-scroll, .sc-split > *, .sc-showcase figure');
    var shown = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sc-in'); shown.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(parts, function (el) { el.classList.add('sc-reveal'); shown.observe(el); });
    root.classList.add('sc-anim');
  }
})();
