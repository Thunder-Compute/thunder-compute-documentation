// Mintlify syncs same-titled tabs within a page but forgets the choice on navigation.
// Remember the reader's interface (VS Code / CLI / Console) and reopen it on every page.
(() => {
  const KEY = "tc-interface";
  const IDS = { "VS Code": "vscode", CLI: "cli", Console: "console" };
  const idOf = (tab) => IDS[tab.textContent.trim()];

  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  };
  const write = (id) => {
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  document.addEventListener(
    "click",
    (event) => {
      const tab = event.isTrusted && event.target.closest?.('[role="tab"]');
      if (tab && idOf(tab)) write(idOf(tab));
    },
    true,
  );

  let appliedFor = null;
  const apply = () => {
    if (appliedFor === location.pathname) return;
    const tabs = [...document.querySelectorAll('[role="tab"]')].filter(idOf);
    if (!tabs.length) return;
    appliedFor = location.pathname;

    // A link to a specific tab (e.g. /instances/snapshots#cli) wins and becomes the new preference.
    const linked = location.hash.slice(1);
    if (Object.values(IDS).includes(linked)) {
      write(linked);
      return;
    }
    const preferred = tabs.find((tab) => idOf(tab) === read());
    if (preferred && preferred.getAttribute("aria-selected") !== "true") preferred.click();
  };

  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
})();
