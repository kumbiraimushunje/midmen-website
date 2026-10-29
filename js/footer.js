/* Shared footer markup, injected into <footer id="site-footer-include">
   on every page so it only needs editing in one place. */
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("site-footer-include");
  if (!mount) return;

  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="assets/images/logo-mark.png" alt="MIDMEN Execution Network" class="brand-logo-img">
          </div>
          <p class="footer-tagline">People on Your Side.</p>
          <p style="font-size:0.85rem; max-width:280px;">MIDMEN coordinates real-world tasks for individuals, families and businesses in supported locations.</p>
          <div class="social-row">
            <a class="social-icon" href="https://www.instagram.com/midmen.co" target="_blank" rel="noopener" aria-label="MIDMEN on Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a class="social-icon" href="https://facebook.com/midmenexecutionnetwork" target="_blank" rel="noopener" aria-label="MIDMEN on Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/></svg>
            </a>
            <a class="social-icon" href="https://www.linkedin.com/company/midmen-execution-network/" target="_blank" rel="noopener" aria-label="MIDMEN on LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="how-it-works.html">How It Works</a></li>
            <li><a href="request.html">Request a Service</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms of Use</a></li>
            <li><a href="cookie-notice.html">Cookie Notice</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Official Contact</h4>
          <ul class="footer-contact">
            <li>Harare, Zimbabwe</li>
            <li><a href="mailto:hello@midmen.co">hello@midmen.co</a></li>
            <li><a href="https://wa.me/263781234567" target="_blank" rel="noopener">WhatsApp Support</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="footer-year"></span> MIDMEN Execution Network. All rights reserved.</span>
        <span>Availability depends on location, timing and provider capacity.</span>
      </div>
    </div>
  `;
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
