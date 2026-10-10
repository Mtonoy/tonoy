/* ═══════════════════════════════════════════════════════════
   TONOY.DEV — main.js
   Vanilla JS: preloader, cursor, particles, scroll spy,
   reveals, counters, skills bars, tilt, magnet, filter,
   testimonials, theme, form, nav
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Content is visible by default via the .no-js class on <html>. We only hide
     reveal elements once we know this script is alive and able to bring them back. */
  document.documentElement.classList.remove('no-js');

  /* ─────────── 1. PRELOADER ─────────── */
  (function preloader() {
    const pre = $('#preloader');
    /* pages without a preloader (e.g. project detail pages) must still reveal */
    if (!pre) { startReveal(); return; }

    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(finish, reduceMotion ? 0 : 380);
      }
      const bar = $('#plBar'), pct = $('#plPct');
      if (bar) bar.style.width = p + '%';
      if (pct) pct.textContent = Math.floor(p);
    }, reduceMotion ? 10 : 130);

    function finish() {
      pre.classList.add('done');
      document.body.style.overflow = '';
      startReveal();
      setTimeout(() => pre.remove(), 900);
    }

    if (reduceMotion) { pre.classList.add('done'); startReveal(); setTimeout(() => pre.remove(), 10); }
    else document.body.style.overflow = 'hidden';
  })();

  /* ─────────── 2. SCROLL REVEAL ───────────
     Driven by IntersectionObserver, but backed by a scroll/resize sweep so a
     block can never be left stuck at opacity:0 if the observer misbehaves. */
  const revealed = new Set();

  function revealNow(el) {
    if (revealed.has(el)) return;
    revealed.add(el);
    el.style.setProperty('--rd', (el.dataset.delay || 0) + 'ms');
    el.classList.add('in');
  }

  function startReveal() {
    const targets = $$('[data-reveal]');
    if (!targets.length) return;

    const io = ('IntersectionObserver' in window)
      ? new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (!e.isIntersecting) return;
            revealNow(e.target);
            io.unobserve(e.target);
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })
      : null;

    targets.forEach(el => (io ? io.observe(el) : revealNow(el)));

    /* failsafe sweep */
    const sweep = () => {
      targets.forEach(el => {
        if (revealed.has(el)) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 1.05 && r.bottom > -60) revealNow(el);
      });
      if (revealed.size >= targets.length) {
        removeEventListener('scroll', sweep);
        removeEventListener('resize', sweep);
      }
    };

    addEventListener('scroll', sweep, { passive: true });
    addEventListener('resize', sweep, { passive: true });
    addEventListener('load', () => setTimeout(sweep, 200), { once: true });
    setTimeout(sweep, 200);
    setTimeout(sweep, 1200);

    observeBars();
  }

  /* ─────────── 3. CUSTOM CURSOR ─────────── */
  (function cursor() {
    const dot = $('#cursor'), ring = $('#cursorRing');
    if (!dot || !ring || window.matchMedia('(hover:none)').matches) return;

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      document.body.classList.add('cursor-on');
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on'));

    const HOVER = 'a, button, input, textarea, [data-cursor]';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(HOVER);
      if (!t) return;
      document.body.classList.toggle('cursor-view', t.dataset.cursor === 'view');
      ring.style.borderColor = 'rgba(255,255,255,.9)';
    });
    document.addEventListener('mouseout', e => {
      if (!e.target.closest(HOVER)) return;
      document.body.classList.remove('cursor-view');
      ring.style.borderColor = 'rgba(255,255,255,.75)';
    });
  })();

  /* ─────────── 4. PARTICLE CONSTELLATION ─────────── */
  (function particles() {
    const cv = $('#particles');
    if (!cv || reduceMotion) { if (cv) cv.style.display = 'none'; return; }
    const ctx = cv.getContext('2d');
    let w, h, dpr, pts = [], running = true;

    const light = () => document.documentElement.dataset.theme === 'light';

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + 'px';
      cv.style.height = innerHeight + 'px';
      const count = Math.min(90, Math.round(innerWidth * innerHeight / 19000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .34 * dpr, vy: (Math.random() - .5) * .34 * dpr,
        r: (Math.random() * 1.6 + .7) * dpr
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const dark = !light();
      const LINK = 128 * dpr;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? 'rgba(160,190,255,.55)' : 'rgba(60,80,160,.45)';
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = dark
              ? `rgba(120,150,255,${(1 - dist / LINK) * .20})`
              : `rgba(90,110,200,${(1 - dist / LINK) * .16})`;
            ctx.lineWidth = dpr * .6;
            ctx.stroke();
          }
        }
      }
      if (running) requestAnimationFrame(draw);
    }

    addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) { resize(); draw(); }
    });

    resize(); draw();
  })();

  /* ─────────── 5. HEADER / SCROLL PROGRESS / SPY ─────────── */
  (function header() {
    const header = $('#siteHeader');
    const toTop = $('#toTop');
    const bar = $('#scrollProgress i');

    /* scroll progress + back-to-top work on every page */
    const hasBar = !!bar, hasTop = !!toTop, hasHeader = !!header;
    const links = $$('.nav-link');
    const nav = $('#nav');
    const indicator = $('#navIndicator');
    const sections = links.map(l => $(l.getAttribute('href'))).filter(Boolean);

    let ticking = false;
    function onScroll() {
      const y = scrollY;
      if (hasHeader) header.classList.toggle('scrolled', y > 40);
      if (hasTop) toTop.classList.toggle('show', y > 620);

      if (hasBar) {
        const docH = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
      }

      // scroll spy
      if (sections.length) {
        let current = sections[0];
        const probe = y + innerHeight * 0.32;
        sections.forEach(s => { if (s.offsetTop <= probe) current = s; });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
      }
      moveIndicator();
      ticking = false;
    }

    function moveIndicator() {
      const active = $('.nav-link.active');
      if (!active || !indicator || innerWidth <= 960) return;
      indicator.style.width = active.offsetWidth + 'px';
      indicator.style.opacity = '1';
      indicator.style.left = (active.offsetLeft + active.offsetWidth / 2) + 'px';
      indicator.style.transform = 'translateX(-50%)';
    }

    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    addEventListener('resize', moveIndicator, { passive: true });

    if (hasTop) toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    onScroll();
  })();

  /* ─────────── 6. MOBILE NAV ─────────── */
  (function mobileNav() {
    const burger = $('#burger'), nav = $('#nav'), backdrop = $('#navBackdrop');
    if (!burger || !nav || !backdrop) return;
    const toggle = (open) => {
      nav.classList.toggle('open', open);
      backdrop.classList.toggle('show', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.innerHTML = `<svg class="ico"><use href="#${open ? 'i-close' : 'i-menu'}"/></svg>`;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!nav.classList.contains('open')));
    backdrop.addEventListener('click', () => toggle(false));
    $$('.nav-link').forEach(l => l.addEventListener('click', () => toggle(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  })();

  /* ─────────── 7. THEME TOGGLE ─────────── */
  (function theme() {
    const btn = $('#themeToggle');
    const saved = localStorage.getItem('tonoy-theme');
    if (saved) document.documentElement.dataset.theme = saved;

    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('tonoy-theme', next);
      $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#070a18' : '#f4f6fd');
    });
  })();

  /* ─────────── 8. TYPING EFFECT ─────────── */
  (function typing() {
    const el = $('#typeText');
    if (!el) return;
    const roles = [
      'Senior Software Engineer',
      'Full-Stack Web Developer',
      'ASP.NET Core Developer',
      'Laravel Developer',
      'Problem Solver'
    ];
    if (reduceMotion) { el.textContent = roles[0]; return; }

    let r = 0, i = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      el.textContent = word.slice(0, i);

      let delay = deleting ? 45 : 85;
      if (!deleting && i === word.length) { deleting = true; delay = 1700; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 320; }
      else i += deleting ? -1 : 1;

      setTimeout(tick, delay);
    };
    tick();
  })();

  /* ─────────── 9. COUNTERS ─────────── */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }

    const dur = 1700;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateCount(e.target);
      countIO.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ─────────── 10. SKILL BARS ─────────── */
  function observeBars() {
    $$('[data-bar]').forEach(bar => {
      const fill = bar.querySelector('.bar-fill');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          setTimeout(() => { fill.style.width = fill.style.getPropertyValue('--w') || '0%'; }, 120);
          io.unobserve(bar);
        });
      }, { threshold: 0.5 });
      io.observe(bar);
    });
  }

  /* ─────────── 11. 3D TILT ─────────── */
  if (!reduceMotion && !window.matchMedia('(hover:none)').matches) {
    $$('[data-tilt]').forEach(el => {
      const MAX = 7;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = 'transform .1s linear';
        el.style.transform =
          `perspective(900px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateZ(6px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .8s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
      });
    });

    /* magnetic buttons */
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.34;
        el.style.transition = 'transform .12s linear';
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
      });
    });
  }

  /* ─────────── 12. PARALLAX ON SCROLL ─────────── */
  if (!reduceMotion) {
    const heroVisual = $('.hero-visual');
    const aboutVisual = $('.about-visual');
    let py = 0, ticking = false;

    addEventListener('scroll', () => {
      py = scrollY;
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });

    function parallax() {
      ticking = false;
      // only after the reveal transform has been handed back by the observer
      if (heroVisual && heroVisual.classList.contains('in') && py < innerHeight * 1.4) {
        heroVisual.style.transform = `translateY(${Math.min(py * 0.13, 90)}px)`;
      }
      if (aboutVisual && aboutVisual.classList.contains('in')) {
        const r = aboutVisual.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) {
          const offset = (py - (r.top + py)) / innerHeight; // -1..1 while in view
          aboutVisual.style.transform = `translateY(${(-offset * 26).toFixed(2)}px)`;
        }
      }
    }
  }

  /* ─────────── 13. PROJECT FILTER ─────────── */
  (function filter() {
    const btns = $$('.filter');
    const cards = $$('.proj-card');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const f = btn.dataset.filter;
        cards.forEach(card => {
          const show = f === 'all' || card.dataset.cat === f;
          card.classList.toggle('hide', !show);
          if (show && !reduceMotion) {
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = 'projIn .55s cubic-bezier(.22,1,.36,1) both';
          }
        });
      });
    });

    const style = document.createElement('style');
    style.textContent = '@keyframes projIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}';
    document.head.appendChild(style);
  })();

  /* ─────────── 14. TESTIMONIALS ─────────── */
  (function testimonials() {
    const track = $('#tstTrack');
    const slides = $$('.tst-slide');
    const dotsBox = $('#tstDots');
    if (!track || !slides.length) return;

    let idx = 0, timer;

    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'tst-dot' + (i === 0 ? ' is-active' : '');
      d.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      d.addEventListener('click', () => go(i));
      dotsBox.appendChild(d);
    });
    const dots = $$('.tst-dot', dotsBox);

    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }
    const next = () => go(idx + 1);
    const prev = () => go(idx - 1);

    $('#tstNext').addEventListener('click', () => { next(); restart(); });
    $('#tstPrev').addEventListener('click', () => { prev(); restart(); });

    function restart() { clearInterval(timer); timer = setInterval(next, 6000); }
    if (!reduceMotion) restart();

    // swipe
    let x0 = null;
    const vp = $('.tst-viewport');
    vp.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    vp.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
      x0 = null;
      restart();
    }, { passive: true });

    // pause when offscreen
    new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting && !reduceMotion) restart();
        else clearInterval(timer);
      });
    }, { threshold: 0.25 }).observe($('#testimonials'));
  })();

  /* ─────────── 15. CONTACT FORM ─────────── */
  (function contactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const errBox = $('#cfError');

    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#name'), email = $('#email'), subject = $('#subject'), message = $('#message');

      let bad = null;
      [[name, v => v.trim().length >= 2, 'Please enter your name.'],
       [email, isEmail, 'Please enter a valid email address.'],
       [subject, v => v.trim().length >= 3, 'Please enter a subject.'],
       [message, v => v.trim().length >= 12, 'Message should be at least 12 characters.']
      ].forEach(([input, ok, msg]) => {
        const field = input.closest('.field');
        field.classList.toggle('err', !ok(input.value));
        if (!ok(input.value) && !bad) bad = msg;
        input.addEventListener('input', () => field.classList.remove('err'), { once: true });
      });

      if (bad) { errBox.textContent = bad; return; }
      errBox.textContent = '';

      const btn = $('#cfSubmit');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span>Sending…</span>';

      // Opens the visitor's email client with everything pre-filled.
      const subjectLine = encodeURIComponent(`Portfolio enquiry: ${subject.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Tonoy,\n\n${message.value.trim()}\n\n—\n${name.value.trim()}\n${email.value.trim()}`
      );

      setTimeout(() => {
        window.location.href = `mailto:tonoy300@gmail.com?subject=${subjectLine}&body=${body}`;
        btn.innerHTML = '<span>Sent ✓ — thank you!</span>';
        form.reset();
        setTimeout(() => { btn.disabled = false; btn.innerHTML = original; }, 3200);
      }, 900);
    });
  })();

  /* ─────────── 16. MARQUEE DUPLICATION (seamless loop) ─────────── */
  $$('.marquee').forEach(mq => {
    const track = mq.querySelector('.marquee-track');
    track.innerHTML += track.innerHTML;
  });

  /* ─────────── 17. SMOOTH ANCHORS + FOCUS MGMT ─────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 62;
      scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ─────────── 18. FOOTER YEAR ─────────── */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ─────────── 19. KEYBOARD SHORTCUT ─────────── */
  document.addEventListener('keydown', e => {
    const projects = $('#projects');
    if (e.key === '/' && projects && !/input|textarea/i.test(e.target.tagName)) {
      e.preventDefault();
      projects.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();