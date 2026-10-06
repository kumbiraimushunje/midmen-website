# MIDMEN Execution Network — Pre-Launch Website

A hand-coded, responsive, mobile-first static website matching the
`MIDMEN_WordPress_PreLaunch_Website_Implementation_Brief` — built as plain
HTML/CSS/JS instead of WordPress so the design could be matched exactly to
the brand tokens and layout references, with no CMS/plugin overhead for a
5-page marketing + request site. See that brief for the full rationale,
copy direction and QA checklist this site was built against.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Services |
| `how-it-works.html` | How MIDMEN Works |
| `request.html` | Request a Service (the main functional page) |
| `contact.html` | Contact & Support |
| `privacy.html` / `terms.html` / `cookie-notice.html` | Legal utility pages |
| `404.html` | Not-found page |

Shared header markup is duplicated per page (plain static HTML, no build
step required — just open and edit). The footer is injected by
`js/footer.js` so it only needs editing in one place.

## Before this goes live — required setup

1. **Form delivery (Web3Forms).** Forms currently have no backend. Go to
   https://web3forms.com, enter the MIDMEN operations inbox, and it emails
   you a free Access Key (no account needed). Paste it into
   `WEB3FORMS_ACCESS_KEY` at the top of `js/main.js`. Until this is set,
   submitting a form opens the visitor's email client with the message
   pre-filled instead, so nothing is lost — but that's a fallback, not the
   real flow.
2. **Replace every placeholder:**
   - `support@midmen.co` (footer, contact page, privacy/terms) — swap for
     the real support inbox once it's set up on the domain.
   - `+263 78 123 4567` WhatsApp number (footer, contact page) — swap for
     the real MIDMEN WhatsApp Business number.
   - Instagram/Facebook URLs in the footer (`js/footer.js`) — point to the
     real official accounts. Add the LinkedIn link when it exists (the
     icon is already in place, currently a disabled placeholder).
   - `[DATE]`, `[Insert registered entity name...]` and the other bracketed
     placeholders in `privacy.html` / `terms.html` — have a lawyer finalise
     this copy before launch, per the brief.
3. **Spam protection.** A honeypot field is built in (works with zero
   setup). For stronger protection, Web3Forms supports adding hCaptcha —
   see their dashboard once you have an account.
4. **Social preview image.** `og:image` tags currently point at existing
   layout photos. Brief calls for one official Open Graph image (navy +
   gold, logo dominant) — create and swap in once the designer delivers it.

## Deploying — GitHub Pages + midmen.co (GoDaddy)

This repo is set up for GitHub Pages with the custom domain `midmen.co`
(see the `CNAME` file at the repo root — GitHub Pages reads that to know
which domain to serve).

1. **Push this repo to GitHub**, then in the repo's Settings → Pages, set
   the source to the `main` branch, root folder. GitHub will detect the
   `CNAME` file automatically.
2. **In GoDaddy's DNS for `midmen.co`**, add:
   - Four **A** records on `@` (the apex/root domain) pointing to GitHub
     Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record on `www` pointing to `<your-github-username>.github.io`
   - Remove/replace any existing GoDaddy "parked domain" A record or
     forwarding first, or it'll conflict.
3. Back in GitHub Pages settings, once DNS propagates (can take up to a
   few hours), tick **Enforce HTTPS**.
4. DNS propagation can take anywhere from a few minutes to ~24 hours.

Other options this static site also works with, no changes needed:
- **Netlify / Vercel:** connect the same GitHub repo for auto-deploy on
  every push, or drag the folder onto Netlify Drop.
- **Your own hosting:** upload the whole folder via FTP/cPanel.
- **Later, into WordPress:** the page markup is plain semantic HTML/CSS
  with no framework — a developer can port it into a custom WordPress
  theme (or an HTML block/Elementor "Custom HTML" section) if/when you
  want WordPress's CMS and plugin ecosystem for ongoing content edits.

## Design tokens

Colours, radii and spacing live as CSS variables at the top of
`css/style.css` (`--navy`, `--gold`, `--bg`, etc.) — matching the brief's
Section 3 exactly. Change them there to restyle the whole site at once.

## Service taxonomy

Service families/categories on `services.html` and in the Request form's
category dropdown are pulled from the real MIDMEN app taxonomy
(`backend/app/service_taxonomy.py` in the `midman` repo), not generic
placeholder categories — keep both in sync if the app's taxonomy changes.
