/* ============================================================
   Shahmir Maqbool Butt — Advocate Portfolio
   Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Loader ---------------- */
  const loader = document.getElementById('loader');
  const loaderBar = document.querySelector('.loader-line::after');
  window.addEventListener('load', () => {
    gsap.to('.loader-line::after', { width: '100%', duration: 0.8 });
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to('.loader-mark', { opacity: 1, duration: 0.6 })
      .to(loader, {
        yPercent: -100, duration: 0.9, ease: 'power4.inOut',
        onComplete: () => { loader.style.display = 'none'; heroIntro(); }
      }, '+=0.3');
  });
  // fallback in case load event already fired / assets slow
  setTimeout(() => { if (loader && loader.style.display !== 'none') {
    gsap.to(loader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => { loader.style.display='none'; heroIntro(); } });
  }}, 3200);

  /* ---------------- Lenis smooth scroll ---------------- */
  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Custom cursor ---------------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const glow = document.querySelector('.mouse-glow');
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (cursorDot) gsap.to(cursorDot, { x: mx, y: my, duration: 0.1 });
    if (glow) { glow.style.opacity = 1; glow.style.transform = `translate(${mx}px, ${my}px)`; }
  });
  function ringLoop() {
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    if (cursorRing) cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  }
  ringLoop();
  document.querySelectorAll('a, button, .logo-card, .practice-card, .why-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('grow'));
  });

  /* ---------------- Scroll progress ---------------- */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 60);
    const btt = document.querySelector('.back-to-top');
    if (btt) btt.classList.toggle('show', h.scrollTop > 700);
  });

  /* ---------------- Mobile nav ---------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle && navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    navToggle && navToggle.classList.remove('open');
    navLinks && navLinks.classList.remove('open');
  }));

  /* ---------------- Back to top ---------------- */
  const btt = document.querySelector('.back-to-top');
  btt && btt.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Hero intro timeline ---------------- */
  function heroIntro() {

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out"
    }
  });

  tl
    .from(".hero-badge", {
      y: 25,
      opacity: 0,
      duration: .6
    })

    .from(".hero-title", {
      y: 45,
      opacity: 0,
      duration: 1
    }, "-=0.3")

    .from(".hero-sub", {
      y: 25,
      opacity: 0,
      duration: .8
    }, "-=0.6")

    .from(".hero-actions .btn", {
      y: 20,
      opacity: 0,
      duration: .6,
      stagger: .12
    }, "-=0.5")

    .from(".hero-trust .trust-item", {
      y: 20,
      opacity: 0,
      duration: .5,
      stagger: .08
    }, "-=0.4")

    .from(".hero-stats .stat-item", {
      y: 20,
      opacity: 0,
      duration: .6,
      stagger: .12
    }, "-=0.5")

    .from(".hero-portrait-frame", {
      scale: .92,
      opacity: 0,
      duration: .9
    }, "-=0.8")

    .from(".floating-card", {
      y: 20,
      opacity: 0,
      duration: .5,
      stagger: .15
    }, "-=0.4");

  animateCounters(document.querySelectorAll(".hero-stats [data-count]"));

}
  

  /* ---------------- Scroll reveal (AOS-like via GSAP) ---------------- */
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Stagger children within groups
  document.querySelectorAll('[data-stagger]').forEach(group => {
    const items = group.children;
    gsap.set(items, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: group, start: 'top 85%',
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    });
  });

  /* ---------------- Parallax ---------------- */
  gsap.to('.hero-bg-image', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.shape-1', { y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.shape-2', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------------- Counters ---------------- */
  function animateCounters(nodes) {
    nodes.forEach(el => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const target = parseFloat(el.dataset.count);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 2, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.floor(obj.val); }
      });
    });
  }
  document.querySelectorAll('.achievements-grid [data-count], .achievements-grid').forEach(() => {});
  const achEls = document.querySelectorAll('[data-count]');
  ScrollTrigger.batch(achEls, {
    start: 'top 90%',
    onEnter: (batch) => animateCounters(batch)
  });

  /* ---------------- Magnetic buttons ---------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const relX = e.clientX - r.left - r.width / 2;
      const relY = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: relX * 0.25, y: relY * 0.4, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
  });

  /* ---------------- Logo card tilt ---------------- */
 document.querySelectorAll('.logo-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
  });
});

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------------- Swiper testimonials ---------------- */
  if (window.Swiper) {
    new Swiper('.testimonial-swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      speed: 800,
    });
  }

  /* ---------------- Particles.js ---------------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: '#D4AF37' },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 140, color: '#D4AF37', opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.6, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.3 } } }
      },
      retina_detect: true
    });
  }

  /* ---------------- Contact form (Netlify Forms) ---------------- */
 /* ---------------- Contact form (WhatsApp) ---------------- */
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    const whatsappNumber = "923436444555";

    const text = `*New Consultation Request*%0A%0A` +
      `*Full Name:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Phone:* ${encodeURIComponent(phone || "Not Provided")}%0A` +
      `*Legal Matter:* ${encodeURIComponent(subject)}%0A%0A` +
      `*Message:*%0A${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

    form.reset();

    const success = document.querySelector(".form-success");
    if (success) {
      success.classList.add("show");
      success.textContent = "Redirecting to WhatsApp...";
    }
  });
}

  /* ---------------- Current year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
