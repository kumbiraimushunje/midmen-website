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
   - **Both sides need to get an email, not just MIDMEN.** The access
     key's registered address is the one that receives the raw
     submission ("notify MIDMEN") — make sure that's set to
     `hello@midmen.co` once that mailbox exists (Web3Forms dashboard →
     this form → recipient email). Separately, turn on **Auto Response
     Email** (sometimes labelled Autoresponder) for the same form in the
     dashboard and write the "Request received" confirmation copy there
     — Web3Forms sends that one back to whatever the visitor typed into
     the form's own `email` field ("notify the customer"). Both forms
     already include an `email` field, so no code change is needed for
     this — it's purely a Web3Forms dashboard setting.
2. **Remaining items before public/paid traffic:**
   - `hello@midmen.co` (footer, contact page, privacy/terms) is the
     single address used for support, forms and general correspondence
     — confirm the mailbox is actually live on the domain before launch.
   - WhatsApp was deliberately removed as a contact route (footer,
     Contact page, error-fallback message) per the
     `MIDMEN_Website_Corrections_and_Interim_Legal_Pages` brief: "do not
     present an unverified WhatsApp number as an active contact route."
     Add it back once a real MIDMEN WhatsApp Business number exists —
     search the repo for the prior commit that removed it for the exact
     markup to restore.
   - Instagram, Facebook and LinkedIn in the footer (`js/footer.js`) are
     the real, confirmed official accounts — done.
   - Privacy Policy, Terms of Use and Cookie Notice are fully drafted
     (no bracket placeholders remain) per the founder-provided interim
     copy, but per that same document this is "an operational draft, not
     a lawyer-approved legal opinion" — still needs actual legal/privacy
     review before being treated as final, particularly the registered
     entity name (section 1 of the Privacy Policy still says it "will be
     displayed once verified against the company registration records").
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
