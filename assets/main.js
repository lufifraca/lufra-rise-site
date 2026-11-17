(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal on scroll (content stays visible without JS or with reduced motion)
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  // Contact form
  const form = document.getElementById('contact-form');
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const say = (msg, kind) => { status.textContent = msg; status.dataset.kind = kind || ''; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = [...form.querySelectorAll('input, textarea')].find((el) => !el.checkValidity());
    form.classList.add('was-validated');
    if (invalid) {
      say('Please fill in your name and a valid email address.', 'error');
      invalid.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // bot
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      say('Our contact form is not connected yet. Please reach us on LinkedIn.', 'error');
      return;
    }
    button.disabled = true;
    say('Sending…');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      form.classList.remove('was-validated');
      say('Thank you — your message has been sent. We’ll be in touch soon.', 'ok');
    } catch {
      say('Something went wrong sending your message. Please try again, or reach us on LinkedIn.', 'error');
    } finally {
      button.disabled = false;
    }
  });
})();
