(function () {
    "use strict";

    const crInput = document.getElementById("monster-cr");
    if (!crInput) return;

    const errorPanel = document.getElementById("monster-error");
    const errorMessage = document.getElementById("monster-error-message");
    const resultPanel = document.getElementById("monster-result");
    const fields = {
      ac: document.getElementById("monster-ac"),
      hp: document.getElementById("monster-hp"),
      ab: document.getElementById("monster-ab"),
      dpr: document.getElementById("monster-dpr"),
      dc: document.getElementById("monster-dc"),
      cr: document.getElementById("monster-cr-out"),
      crExtra: document.getElementById("monster-cr-extra")
    };

    const fixedStats = {
      "0": { ac: 13, hp: 3, ab: 2, dpr: 1, dc: 9, xp: 0, pb: 2 },
      "1/8": { ac: 13, hp: 9, ab: 3, dpr: 3, dc: 10, xp: 25, pb: 2 },
      "1/4": { ac: 13, hp: 15, ab: 3, dpr: 6, dc: 10, xp: 50, pb: 2 },
      "1/2": { ac: 14, hp: 24, ab: 4, dpr: 9, dc: 11, xp: 100, pb: 2 }
    };

    const xpTable = [
      200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900,
      7200, 8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000, 25000,
      33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000,
      175000, 195000, 215000, 235000, 255000, 275000, 295000, 315000, 335000, 355000
    ];

    function format(value) {
      return value.toLocaleString("zh-CN");
    }

    function showError(message) {
      errorMessage.textContent = message;
      errorPanel.hidden = false;
      resultPanel.hidden = true;
      crInput.setAttribute("aria-invalid", "true");
    }

    function render(stats, crLabel) {
      fields.ac.textContent = String(stats.ac);
      fields.hp.textContent = format(stats.hp);
      fields.ab.textContent = `+${stats.ab}`;
      fields.dpr.textContent = format(stats.dpr);
      fields.dc.textContent = String(stats.dc);
      fields.cr.textContent = crLabel;
      fields.crExtra.textContent = `(XP ${format(stats.xp)}; PB+${stats.pb})`;
      errorPanel.hidden = true;
      resultPanel.hidden = false;
      crInput.setAttribute("aria-invalid", "false");
    }

    function calculate() {
      const raw = crInput.value.trim();

      if (Object.prototype.hasOwnProperty.call(fixedStats, raw)) {
        render({ ...fixedStats[raw] }, raw);
        return;
      }

      if (!/^\d+$/.test(raw)) {
        showError("请输入 0、1/8、1/4、1/2，或 1 到 40 的整数。");
        return;
      }

      const cr = Number(raw);
      if (!Number.isInteger(cr) || cr < 1 || cr > 40) {
        showError("请输入 0、1/8、1/4、1/2，或 1 到 40 的整数。");
        return;
      }

      const ac = Math.floor(14 + cr / 3);
      const hp = cr >= 21 ? 300 + 50 * (cr - 20) : 15 * (cr + 1);
      const ab = Math.floor(4 + cr / 2);
      const dpr = 6 * (cr + 1);
      const dc = Math.floor(11 + cr / 2);
      const pb = Math.floor(2 + (cr - 1) / 4);
      const xp = xpTable[cr - 1];

      render({ ac, hp, ab, dpr, dc, xp, pb }, raw);
    }

    let timer = null;
    crInput.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(calculate, 120);
    });

    calculate();
  })();
  