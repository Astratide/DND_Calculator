(function () {
  "use strict";

  const root = document.documentElement;
  const button = document.getElementById("settings-button");
  const panel = document.getElementById("settings-panel");
  const themeSelect = document.getElementById("theme-select");
  const fontRange = document.getElementById("settings-font-range");
  const fontOutput = document.getElementById("settings-font-output");
  if (!button || !panel || !themeSelect || !fontRange || !fontOutput) return;

  const THEME_KEY = "dnd5e2024.theme";
  const FONT_KEY = "dnd5e2024.fontSize";
  const colorScheme = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  function readPreference() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return /^(system|light|dark)$/.test(value || "") ? value : "system";
    } catch (error) {
      return "system";
    }
  }

  function readFontSize() {
    try {
      const value = parseInt(localStorage.getItem(FONT_KEY), 10);
      return Number.isFinite(value) && value >= 8 && value <= 24 ? value : 16;
    } catch (error) {
      return 16;
    }
  }

  function resolveTheme(preference) {
    if (preference === "system") {
      return colorScheme && colorScheme.matches ? "dark" : "light";
    }
    return preference;
  }

  function updateThemeColor(resolved) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", resolved === "dark" ? "#1a1a1a" : "#800000");
  }

  function applyTheme(preference, persist = true) {
    const resolved = resolveTheme(preference);
    root.dataset.themePreference = preference;
    root.dataset.theme = resolved;
    themeSelect.value = preference;
    updateThemeColor(resolved);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, preference);
      } catch (error) {
        // 设置仍会应用到当前页面。
      }
    }
  }

  function applyFontSize(size, persist = true) {
    const value = Math.min(24, Math.max(8, Number(size) || 16));
    root.style.setProperty("--content-zoom", (value / 16).toFixed(3));
    fontRange.value = String(value);
    fontOutput.textContent = `${value}px`;
    document.dispatchEvent(new CustomEvent("dnd:content-font-size-changed"));
    if (persist) {
      try {
        localStorage.setItem(FONT_KEY, String(value));
      } catch (error) {
        // 设置仍会应用到当前页面。
      }
    }
  }

  function setPanelOpen(open) {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    if (open) themeSelect.focus();
  }

  applyTheme(readPreference(), false);
  applyFontSize(readFontSize(), false);

  themeSelect.addEventListener("change", () => applyTheme(themeSelect.value));
  fontRange.addEventListener("input", () => applyFontSize(fontRange.value));

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setPanelOpen(panel.hidden);
  });

  document.addEventListener("pointerdown", (event) => {
    if (panel.hidden) return;
    if (panel.contains(event.target) || button.contains(event.target)) return;
    setPanelOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setPanelOpen(false);
      button.focus();
    }
  });

  if (colorScheme) {
    const handleSchemeChange = () => {
      if (root.dataset.themePreference === "system") {
        applyTheme("system", false);
      }
    };
    if (colorScheme.addEventListener) colorScheme.addEventListener("change", handleSchemeChange);
    else if (colorScheme.addListener) colorScheme.addListener(handleSchemeChange);
  }
})();
