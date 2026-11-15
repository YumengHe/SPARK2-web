(function () {
  var root = document.getElementById('spark-clean');
  if (!root) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function settle(video) {
    if (reduceMotion) { video.removeAttribute('autoplay'); video.pause(); }
  }
  Array.prototype.forEach.call(root.querySelectorAll('video'), settle);

  // Play each clip only while it is on screen.
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); }
      });
    }, { rootMargin: '200px' });
    Array.prototype.forEach.call(root.querySelectorAll('video'), function (v) { if (v.closest('.sc-hero')) return; v.removeAttribute('autoplay'); io.observe(v); });
  }

  var methods = {
    seams: {
      title: 'Find the boundary on the shell.',
      copy: 'A generated surface rarely has a clean gap between a door and its frame. An image model draws a closed loop around the named part on a render of the shell; the loop is registered to the render and each piece moves to the strongest nearby crease, which gives the seam. Shown on a chest drawer.',
      img: 'assets/figures/seams.jpg', w: 1300, h: 705,
      alt: 'Outline guide on a chest drawer: the drawn loop on the render, and a close-up with the drawn line, the searched band and the refined seam.'
    },
    agent: {
      title: 'Plan, write, clip and repair.',
      copy: 'One call plans every link as components and gives each a box. The components are written and compiled in parallel, clipped to the inside of the shell, and a repair round rewrites only the components that fail a check. Shown on a motorbike.',
      img: 'assets/figures/cad_agent.jpg', w: 1300, h: 840,
      alt: 'CAD agent on a motorbike: (a) planned component boxes, (b) written components, (c) components clipped to the shell, (d) a repair round rewriting the failing components in red.'
    },
    hinges: {
      title: 'A pivot a few millimetres off matters.',
      copy: 'On the hybrid model, the pivot of a hinged part moves step by step to lower how far the part cuts into or comes away from its parent over the whole opening. On this wardrobe door the search lowers the largest detachment from 3.6 to 0.8 mm.',
      img: 'assets/figures/joint_search.jpg', w: 1300, h: 1104,
      alt: 'Hinge search on a wardrobe door: the open wardrobe, a top section through the hinge with the initial and searched pivots, and penetration and detachment over the opening for both pivots.'
    }
  };
  var methodButtons = Array.prototype.slice.call(root.querySelectorAll('[data-method]'));
  function setMethod(key) {
    var m = methods[key];
    root.querySelector('#sc-method-title').textContent = m.title;
    root.querySelector('#sc-method-copy').textContent = m.copy;
    var img = root.querySelector('#sc-method-img');
    img.src = m.img; img.width = m.w; img.height = m.h; img.alt = m.alt;
    root.querySelector('#sc-method-panel').setAttribute('aria-labelledby', 'sc-tab-' + key);
    methodButtons.forEach(function (b) {
      var on = b.getAttribute('data-method') === key;
      b.setAttribute('aria-selected', String(on));
      b.setAttribute('tabindex', on ? '0' : '-1');
    });
  }
  methodButtons.forEach(function (b, i) {
    b.addEventListener('click', function () { setMethod(b.getAttribute('data-method')); });
    b.addEventListener('keydown', function (e) {
      var n = methodButtons.length, next;
      if (e.key === 'ArrowRight') next = (i + 1) % n;
      else if (e.key === 'ArrowLeft') next = (i + n - 1) % n;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = n - 1;
      if (next === undefined) return;
      e.preventDefault();
      methodButtons[next].focus();
      setMethod(methodButtons[next].getAttribute('data-method'));
    });
  });
})();
