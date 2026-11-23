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
})();
