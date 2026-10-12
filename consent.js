(() => {
  // The analytics in docs.json load only when localStorage holds the key and value set in
  // integrations.cookies, which Mintlify reads once per page load. These docs share the
  // www.thundercompute.com origin with the marketing site, so both run the same Termly banner
  // and mirror its analytics choice into that key. Like the marketing site and the console, a
  // denied advertising choice also deletes the ad click IDs saved for the console in a
  // parent-domain cookie and the cookies in which the ad tags (Google Ads, Reddit and OpenAI) keep
  // their IDs. Every choice is also shared with the console in the tc_consent cookie, written as
  // the marketing site writes it (see console/CONSENT.md in thundernetes).
  const TERMLY_SCRIPT_ID = "termly-cmp";
  const TERMLY_SCRIPT_SRC =
    "https://app.termly.io/resource-blocker/9d011a07-4ff3-458d-80bc-0e8519d09b1b";
  const ANALYTICS_CONSENT_KEY = "tc_analytics_consent";
  const AD_CLICK_COOKIE_REMOVAL =
    "tc_ad_click=;Max-Age=0;Path=/;Domain=.thundercompute.com;SameSite=Lax;Secure";
  const AD_TAG_COOKIE = /^(?:_gcl_|_gac_|_rdt_|__oaiq_|__oppref$|__obref$)/;
  const SHARED_CONSENT_COOKIE_ATTRIBUTES =
    ";Max-Age=31536000;Path=/;Domain=.thundercompute.com;SameSite=Lax;Secure";

  // When the visitor saved this choice. Termly's public API does not say, so this reads the record
  // Termly keeps in localStorage, which it writes only when a choice is saved; a regional default
  // has none. If Termly changes that format, the cookie omits at and the console withdraws and
  // resubmits less.
  function consentDecidedAt(state) {
    try {
      const record = JSON.parse(localStorage.getItem("TERMLY_API_CACHE")).TERMLY_COOKIE_CONSENT;
      const matches =
        Boolean(record.value.analytics) === Boolean(state.analytics) &&
        Boolean(record.value.advertising) === Boolean(state.advertising);
      if (matches && Number.isSafeInteger(record.createdAt) && record.createdAt > 0) {
        return record.createdAt;
      }
    } catch {}
    return null;
  }

  function shareConsent(state) {
    const choice = new URLSearchParams({
      v: "1",
      analytics: state.analytics ? "1" : "0",
      advertising: state.advertising ? "1" : "0",
    });
    const decidedAt = consentDecidedAt(state);
    if (decidedAt) choice.set("at", String(decidedAt));
    document.cookie = `tc_consent=${encodeURIComponent(choice.toString())}${SHARED_CONSENT_COOKIE_ATTRIBUTES}`;
  }

  function deleteAdTagCookies() {
    const labels = location.hostname.split(".");
    for (const entry of document.cookie.split("; ")) {
      const name = entry.split("=", 1)[0];
      if (!AD_TAG_COOKIE.test(name)) continue;
      document.cookie = `${name}=;Max-Age=0;Path=/;SameSite=Lax;Secure`;
      for (let i = 0; i < labels.length - 1; i++) {
        const domain = labels.slice(i).join(".");
        document.cookie = `${name}=;Max-Age=0;Path=/;Domain=${domain};SameSite=Lax;Secure`;
      }
    }
  }

  function syncConsent() {
    let state;
    try {
      state = window.Termly?.getConsentState?.();
    } catch {
      return;
    }
    if (!state) return;
    shareConsent(state);
    try {
      if (!state.advertising) {
        document.cookie = AD_CLICK_COOKIE_REMOVAL;
        deleteAdTagCookies();
        localStorage.removeItem("_gcl_ls");
      }
    } catch {}
    try {
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
    window.Termly?.on?.("initialized", syncConsent);
    window.Termly?.on?.("consent", syncConsent);
    syncConsent();
  });
  document.head.appendChild(script);
})();
