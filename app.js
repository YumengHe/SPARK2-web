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
