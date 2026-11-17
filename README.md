# Lufra Rise & Associates — website

Static site for [lufrarise.com](https://www.lufrarise.com). No build step: plain HTML, CSS, and a little JavaScript.

```
index.html          Single-page site (services, industries, team, contact)
assets/styles.css   Styles
assets/main.js      Mobile nav, scroll reveal, contact form
about-us/           Redirects the old /about-us URL to /#services
contact-us/         Redirects the old /contact-us URL to /#contact
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Contact form

The form posts JSON to the URL in the `data-endpoint` attribute of `#contact-form` in `index.html`.
It is empty by default, so the form shows a "not connected" message until an endpoint
(for example a Formspree form URL) is filled in.

## Deploying

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages): serve the repository root.
