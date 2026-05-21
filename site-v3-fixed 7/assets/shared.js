/* be-rehber — shared.js */

(function () {
  var theme = localStorage.getItem('theme');
  var getir = localStorage.getItem('getir');
  var classes = [];
  if (theme === 'light') classes.push('light-mode');
  if (getir === 'on') classes.push('getir-mode');
  if (classes.length) {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.className = (document.body.className + ' ' + classes.join(' ')).trim();
    });
  }
})();

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

function toggleGetir() {
  document.body.classList.toggle('getir-mode');
  localStorage.setItem('getir', document.body.classList.contains('getir-mode') ? 'on' : 'off');
}

document.addEventListener('DOMContentLoaded', function () {

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .concept-block, .callout, .diagram, .content-block, .compare-card, .fade-in')
    .forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 40, 300) + 'ms';
      el.classList.add('anim-ready');
      observer.observe(el);
    });

  document.body.classList.add('page-enter');
  requestAnimationFrame(function () {
    document.body.classList.add('page-entered');
  });

  var bar = document.getElementById('progress-bar');
  if (bar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? ((scrolled / total) * 100) + '%' : '0%';
    }, { passive: true });
  }
});
