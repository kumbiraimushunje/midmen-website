/* MIDMEN EXECUTION NETWORK — shared site behaviour */

/* ---------------------------------------------------------------
   Form backend configuration.
   This static site has no server, so form submission uses Web3Forms
   (https://web3forms.com) — a free service that emails submissions
   straight to MIDMEN's inbox with no backend to run.
   1. Go to https://web3forms.com, enter the MIDMEN operations email,
      and copy the Access Key it gives you (no account needed).
   2. Paste it below in place of "YOUR_WEB3FORMS_ACCESS_KEY".
   Until a real key is set, forms fall back to opening the visitor's
   email client with the message pre-filled, so nothing is lost.
--------------------------------------------------------------- */
const WEB3FORMS_ACCESS_KEY = "880031d5-f575-40c8-9ec0-177d38c5275f";
const FALLBACK_EMAIL = "support@midmen.co";

/* ---------------- Mobile nav ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
      })
    );
  }

  initPromptChips();
  initForms();
});

/* ---------------- Home page example-prompt chips ---------------- */
function initPromptChips() {
  const chips = document.querySelectorAll("[data-prompt-chip]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.getAttribute("data-prompt-chip");
      window.location.href = "request.html?need=" + encodeURIComponent(text);
    });
  });

  const promptCard = document.querySelector("[data-prompt-open]");
  if (promptCard) {
    promptCard.addEventListener("click", () => {
      window.location.href = "request.html";
    });
  }
}

/* ---------------- Request reference generator ----------------
   Client-side only, for the confirmation the customer sees/receives.
   Per the brief: "do not over-engineer if this delays launch" — the
   authoritative sequential reference is assigned once MIDMEN's own
   backend takes over request intake.
----------------------------------------------------------------- */
function generateReference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return "MEN-" + n;
}

/* ---------------- Generic form handling ---------------- */
function initForms() {
  document.querySelectorAll("form[data-midmen-form]").forEach((form) => {
    setupUploadZone(form);
    prefillFromQuery(form);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;

      // Honeypot: bots fill every field, real visitors never see this one.
      const hp = form.querySelector('input[name="bot_trap"]');
      if (hp && hp.value) return;

      const statusEl = form.querySelector(".form-status");
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      const reference = generateReference();
      const refInput = form.querySelector('input[name="reference"]');
      if (refInput) refInput.value = reference;

      try {
        if (WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
          const formData = new FormData(form);
          formData.append("access_key", WEB3FORMS_ACCESS_KEY);
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
          });
          const result = await res.json();
          if (!result.success) throw new Error(result.message || "Submission failed");
        } else {
          // No access key configured yet — fall back to a mailto draft
          // so the enquiry is never silently lost during setup.
          openMailtoFallback(form, reference);
        }
        showSuccess(form, reference);
      } catch (err) {
        if (statusEl) {
          statusEl.textContent =
            "Something went wrong sending your request. Please try again, or WhatsApp us directly.";
          statusEl.classList.add("is-visible");
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.getAttribute("data-label") || "Submit";
        }
      }
    });
  });
}

function prefillFromQuery(form) {
  const params = new URLSearchParams(window.location.search);
  const need = params.get("need");
  const needField = form.querySelector('[name="need"]');
  if (need && needField) needField.value = need;
}

function openMailtoFallback(form, reference) {
  const data = new FormData(form);
  let body = "New MIDMEN enquiry (ref " + reference + ")\n\n";
  data.forEach((value, key) => {
    if (key === "bot_trap" || value instanceof File) return;
    body += key + ": " + value + "\n";
  });
  const subject = encodeURIComponent("MIDMEN website enquiry — " + reference);
  window.open(
    "mailto:" + FALLBACK_EMAIL + "?subject=" + subject + "&body=" + encodeURIComponent(body),
    "_blank"
  );
}

function showSuccess(form, reference) {
  const card = form.closest(".form-card");
  if (card) card.classList.add("is-submitted");
  const success = card ? card.querySelector(".form-success") : null;
  if (success) {
    const refEl = success.querySelector("[data-ref]");
    if (refEl) refEl.textContent = reference;
    success.classList.add("is-visible");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------------- Validation ---------------- */
function validateForm(form) {
  let valid = true;
  const statusEl = form.querySelector(".form-status");
  if (statusEl) statusEl.classList.remove("is-visible");

  form.querySelectorAll("[required]").forEach((field) => {
    const wrapper = field.closest(".field");
    let fieldValid = true;

    if (field.type === "checkbox") {
      fieldValid = field.checked;
    } else {
      fieldValid = field.value.trim() !== "";
      if (fieldValid && field.type === "email") {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      }
    }

    if (wrapper) wrapper.classList.toggle("has-error", !fieldValid);
    if (!fieldValid) valid = false;
  });

  if (!valid && statusEl) {
    statusEl.textContent = "Please check the highlighted fields and try again.";
    statusEl.classList.add("is-visible");
    const firstError = form.querySelector(".field.has-error");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return valid;
}

/* ---------------- File upload zone ---------------- */
const MAX_FILE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

function setupUploadZone(form) {
  const zone = form.querySelector("[data-upload-zone]");
  if (!zone) return;
  const input = zone.querySelector('input[type="file"]');
  const list = form.querySelector("[data-upload-list]");

  zone.addEventListener("click", () => input.click());
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.style.borderColor = "var(--gold)";
  });
  zone.addEventListener("dragleave", () => (zone.style.borderColor = ""));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.style.borderColor = "";
    input.files = e.dataTransfer.files;
    renderFileList();
  });
  input.addEventListener("change", renderFileList);

  function renderFileList() {
    if (!list) return;
    list.innerHTML = "";
    const files = Array.from(input.files || []);
    const valid = [];
    files.forEach((file) => {
      const tooBig = file.size > MAX_FILE_MB * 1024 * 1024;
      const badType = ALLOWED_TYPES.length && !ALLOWED_TYPES.includes(file.type);
      const li = document.createElement("div");
      if (tooBig || badType) {
        li.style.color = "var(--error)";
        li.textContent = file.name + (tooBig ? " — over 10MB" : " — unsupported file type");
      } else {
        li.textContent = file.name + " (" + (file.size / 1024 / 1024).toFixed(1) + "MB)";
        valid.push(file);
      }
      list.appendChild(li);
    });
  }
}
