(function () {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const toggleBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || reveals.length === 0) {
    reveals.forEach(function (node) {
      node.classList.add('show');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    }
  );

  reveals.forEach(function (node) {
    observer.observe(node);
  });
})();
