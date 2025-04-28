(() => {
  const link = document.querySelector("link[rel='canonical']");
  if (!link) return;

  const current = link.getAttribute("href") || "";
  // Only touch relative paths – skip absolute, protocol-relative, or hash links
  if (current.startsWith("/")) {
    link.setAttribute("href", window.location.origin + current);
  }
})();
