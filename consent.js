(() => {
  // The analytics in docs.json load only when localStorage holds the key and value set in
  // integrations.cookies, which Mintlify reads once per page load. These docs share the
  // www.thundercompute.com origin with the marketing site, so both run the same Termly banner
  // and mirror its analytics choice into that key.
  const TERMLY_SCRIPT_ID = "termly-cmp";
  const TERMLY_SCRIPT_SRC =
    "https://app.termly.io/resource-blocker/9d011a07-4ff3-458d-80bc-0e8519d09b1b";
  const ANALYTICS_CONSENT_KEY = "tc_analytics_consent";

  function syncAnalyticsConsent() {
    try {
      const state = window.Termly?.getConsentState?.();
      if (!state) return;
      if (state.analytics) localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
      else localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    } catch {}
  }

  if (document.getElementById(TERMLY_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = TERMLY_SCRIPT_ID;
  script.src = TERMLY_SCRIPT_SRC;
  script.async = true;
  script.addEventListener("load", () => {
    window.Termly?.on?.("initialized", syncAnalyticsConsent);
    window.Termly?.on?.("consent", syncAnalyticsConsent);
    syncAnalyticsConsent();
  });
  document.head.appendChild(script);
})();
