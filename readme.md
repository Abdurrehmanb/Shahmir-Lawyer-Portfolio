# Shahmir Maqbool Butt — Advocate Portfolio

A premium, single-page portfolio website for Shahmir Maqbool Butt, Advocate High Court, built with pure HTML, CSS and vanilla JavaScript — no frameworks, no build step.

## Tech Stack

- HTML5, CSS3 (custom properties, glassmorphism, responsive grid)
- Vanilla JavaScript
- GSAP + ScrollTrigger (scroll reveals, parallax, counters, magnetic buttons)
- Lenis (smooth scrolling)
- SwiperJS (testimonials slider)
- Particles.js (animated hero background)
- Font Awesome + Google Fonts (Playfair Display, Inter)
- Netlify Forms (contact form submissions)

## Project Structure

```
Lawyer-Portfolio/
├── index.html          Single-page site (all sections)
├── css/                style.css, responsive.css, animations.css
├── js/                 script.js (app logic), gsap.js, scrolltrigger.js, particles.js (vendored libs)
├── images/             profile, hero/courthouse art, logo, scales icon, client logos
├── assets/             downloadable CV (PDF)
├── robots.txt, sitemap.xml, manifest.json, favicon.ico
```

## Running Locally

No build step required. Serve the `Lawyer-Portfolio` folder with any static server, e.g.:

```bash
cd Lawyer-Portfolio
python3 -m http.server 8080
```

Or deploy directly to Netlify — the `netlify.toml` at the repo root points the publish directory to `Lawyer-Portfolio`.

## Deployment

Push the repository to Netlify or Cloudflare Pages. No build command is needed; set the publish directory to `Lawyer-Portfolio`.
