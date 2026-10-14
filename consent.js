(() => {
  if (document.getElementById("tc-consent-runtime")) return;
  for (const [id, file] of [
    ["tc-consent-runtime", "runtime-v1.js"],
    ["tc-public-analytics", "analytics-v1.js"],
  ]) {
    const script = document.createElement("script");
    script.id = id;
    script.src = `https://www.thundercompute.com/consent/${file}`;
    script.dataset.context = "docs";
    script.async = true;
    document.head.appendChild(script);
  }
})();
