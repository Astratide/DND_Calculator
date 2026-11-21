(function () {
    "use strict";

    const core = window.DiceCore;
    if (!core) return;

    const byId = (id) => document.getElementById(id);
    const ACTIVE_TAB_KEY = "dnd5e2024.activeTab";
    const MAX_ATTACKS = 20;

    function readSavedTab() {
      try {
        return localStorage.getItem(ACTIVE_TAB_KEY);
      } catch (error) {
        return null;
      }
    }

    function saveActiveTab(name) {
      try {
        localStorage.setItem(ACTIVE_TAB_KEY, name);
      } catch (error) {
        // 本机存储不可用时不影响页面切换。
      }
    }

    function isWebProtocol() {
      return window.location.protocol === "http:" ||
        window.location.protocol === "https:";
    }

    function clearVirtualHash() {
      if (isWebProtocol() || !window.location.hash) return;
      try {
        history.replaceState(null, "", window.location.href.split("#")[0]);
      } catch (error) {
        // content:// 等虚拟路径可能不允许 history API。
      }
    }
    const state = { lastResult: null };
    const attackState = {
      rows: [],
      lastResult: null,
      timer: null
    };

    const els = {
      form: byId("dice-form"),
      input: byId("dice-input"),
      notice: byId("notice"),
      errorPanel: byId("error-panel"),
      errorMessage: byId("error-message"),
      result: byId("result"),
      expectedValue: byId("expected-value"),
      chart: byId("chart"),
      formulaLines: byId("formula-lines"),
      diceTable: byId("dice-table"),
      diceList: byId("dice-list"),
      noDiceNote: byId("no-dice-note"),
      targetAc: byId("target-ac"),
      attackCount: byId("attack-count"),
      critEnabled: byId("crit-enabled"),
      critThresholdWrap: byId("crit-threshold-wrap"),
      critThreshold: byId("crit-threshold"),
      critNote: byId("crit-note"),
      attackRows: byId("attack-rows"),
      attackError: byId("attack-error"),
      attackErrorMessage: byId("attack-error-message"),
      attackResult: byId("attack-result"),
      totalDamage: byId("total-damage"),
      attackChart: byId("attack-chart"),
      attackBreakdownBody: byId("attack-breakdown-body"),
      attackTotalCell: byId("attack-total-cell"),
      panelCalculator: byId("panel-calculator"),
      panelAttributes: byId("panel-attributes"),
      panelBuilder: byId("panel-builder"),
      panelMonster: byId("panel-monster"),
      tabCalculator: byId("tab-calculator"),
      tabAttributes: byId("tab-attributes"),
      tabBuilder: byId("tab-builder"),
      tabMonster: byId("tab-monster")
    };

    const numberFormatter = new Intl.NumberFormat("zh-CN", {
      maximumFractionDigits: 4
    });

    const modeLabels = {
      none: "无",
      advantage: "优势",
      disadvantage: "劣势",
      elven: "精灵之准"
    };

    function formatNumber(value) {
      if (!Number.isFinite(value)) return "—";
      if (Math.abs(value) >= 1e12) return value.toExponential(3);
      return numberFormatter.format(value);
    }

    function formatCompact(value) {
      if (!Number.isFinite(value)) return "—";
      if (Math.abs(value) >= 1e9) return value.toExponential(2);
      return new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(value);
    }

    function formatChance(value) {
      if (!Number.isFinite(value)) return "—";
      const percent = value * 100;
      if (percent === 0) return "0%";
      if (percent === 100) return "100%";
      return `${percent.toFixed(2)}%`;
    }

    function isGreenMode(mode) {
      return mode === "advantage" || mode === "disadvantage";
    }

    function updateBonusSign(input) {
      const wrapper = input.closest(".bonus-input");
      if (!wrapper) return;
      const value = input.value.trim();
      wrapper.classList.toggle("is-prefixed", value.startsWith("+") || value.startsWith("-"));
    }

    function updateModeTerm(select) {
      select.classList.toggle("term-green", isGreenMode(select.value));
    }

    function formatBonusText(text) {
      const value = String(text).trim();
      return /^[+-]/.test(value) ? value : `+${value}`;
    }

    function formatAxisPercent(value) {
      const percent = value * 100;
      if (percent === 0) return "0%";
      if (percent >= 10) return `${percent.toFixed(0)}%`;
      if (percent >= 1) return `${percent.toFixed(1)}%`;
      return `${percent.toFixed(2)}%`;
    }

    function formatError(error) {
      const message = error && error.message ? error.message : "计算时遇到未知错误。";
      const position = error && Number.isInteger(error.position) ? error.position : null;
      return position === null ? message : `${message}（第 ${position + 1} 个字符附近）`;
    }

    function signedTermText(term, index, useValues) {
      const body = useValues
        ? formatNumber(term.expectedNumber)
        : (term.isRandom ? `E(${term.text})` : term.text);
      if (index === 0) return `${term.sign < 0 ? "−" : ""}${body}`;
      return `${term.sign < 0 ? "−" : "+"} ${body}`;
    }

    function renderFormula(result) {
      const terms = result.terms;
      const left = terms.map((term, index) => signedTermText(term, index, false)).join(" ");
      const right = terms.map((term, index) => signedTermText(term, index, true)).join(" ");
      const lines = [];
      const hasRandom = terms.some((term) => term.isRandom);

      if (!hasRandom) {
        lines.push(`E = ${formatNumber(result.expectedNumber)}`);
      } else if (terms.length === 1) {
        const term = terms[0];
        const termValue = term.expectedNumber * (term.sign < 0 ? -1 : 1);
        lines.push(`${term.sign < 0 ? "−" : ""}E(${term.text}) = ${formatNumber(termValue)}`);
      } else {
        lines.push(`E = ${left}`);
        lines.push(`  = ${right}`);
        lines.push(`  = ${formatNumber(result.expectedNumber)}`);
      }

      els.formulaLines.textContent = lines.join("\n");
    }

    function diceRuleText(info) {
      const pieces = [`${info.count} 枚 d${info.faces}`];
      if (info.keepMode) {
        pieces.push(info.keepMode === "highest"
          ? `取最高 ${info.keepCount} 枚`
          : `取最低 ${info.keepCount} 枚`);
      }
      if (info.min !== null) pieces.push(`每枚最低按 ${info.min} 计`);
      if (info.max !== null) pieces.push(`每枚最高按 ${info.max} 计`);
      if (!info.keepMode && info.min === null && info.max === null) pieces.push("求和");
      return pieces.join("，");
    }

    function renderDice(result) {
      els.diceList.replaceChildren();

      if (!result.dice.length) {
        els.diceTable.hidden = true;
        els.noDiceNote.hidden = false;
        return;
      }

      els.diceTable.hidden = false;
      els.noDiceNote.hidden = true;

      for (const info of result.dice) {
        const row = document.createElement("tr");

        const notationCell = document.createElement("td");
        const notation = document.createElement("code");
        notation.textContent = info.notation;
        notationCell.appendChild(notation);

        const ruleCell = document.createElement("td");
        ruleCell.textContent = diceRuleText(info);

        const expectedCell = document.createElement("td");
        expectedCell.className = "num";
        expectedCell.textContent = formatNumber(info.expectedNumber);

        row.append(notationCell, ruleCell, expectedCell);
        els.diceList.appendChild(row);
      }
    }

    function chartPointsFromDice(result) {
      return result.distribution.map((point) => ({
        value: point.valueNumber,
        probability: point.probabilityNumber
      }));
    }

    function buildChartBins(points) {
      if (points.length <= 64) {
        return points.map((point) => ({
          min: point.value,
          max: point.value,
          probability: point.probability,
          label: formatCompact(point.value)
        }));
      }

      const minimum = points[0].value;
      const maximum = points[points.length - 1].value;
      const count = 60;
      const width = (maximum - minimum) / count || 1;
      const bins = Array.from({ length: count }, (_, index) => ({
        min: minimum + index * width,
        max: index === count - 1 ? maximum : minimum + (index + 1) * width,
        probability: 0
      }));

      for (const point of points) {
        const index = Math.min(count - 1, Math.max(0, Math.floor((point.value - minimum) / width)));
        bins[index].probability += point.probability;
      }

      return bins
        .filter((bin) => bin.probability > 0)
        .map((bin) => ({
          ...bin,
          label: `${formatCompact(bin.min)}–${formatCompact(bin.max)}`
        }));
    }

    function svgNode(name, attributes = {}) {
      const node = document.createElementNS("http://www.w3.org/2000/svg", name);
      for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
      return node;
    }

    function niceCeiling(value) {
      if (!(value > 0)) return 1;
      const exponent = Math.floor(Math.log10(value));
      const base = 10 ** exponent;
      const fraction = value / base;
      const step = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
      return step * base;
    }

    function renderDistributionChart(container, points, ariaLabel) {
      if (!points.length) {
        container.replaceChildren();
        return;
      }

      const width = Math.max(260, Math.min(700, Math.round(container.clientWidth || 640)));
      const height = width < 480 ? 230 : 220;
      const margin = { top: 10, right: 10, bottom: 28, left: 44 };
      const plotWidth = width - margin.left - margin.right;
      const plotHeight = height - margin.top - margin.bottom;
      const bins = buildChartBins(points);
      const maxProbability = Math.max(...bins.map((bin) => bin.probability), 0);
      const yMax = Math.min(1, niceCeiling(maxProbability * 1.06));

      const svg = svgNode("svg", {
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": ariaLabel
      });

      const gridCount = 4;
      for (let i = 0; i <= gridCount; i += 1) {
        const ratio = i / gridCount;
        const y = margin.top + plotHeight - plotHeight * ratio;
        svg.appendChild(svgNode("line", {
          x1: margin.left,
          y1: y,
          x2: width - margin.right,
          y2: y,
          stroke: i === 0 ? "#999" : "#ddd",
          "stroke-width": 1
        }));

        const label = svgNode("text", {
          x: margin.left - 8,
          y: y + 4,
          "text-anchor": "end",
          fill: "#666",
          "font-size": "10.5",
          "font-family": "Arial, Helvetica, sans-serif"
        });
        label.textContent = formatAxisPercent(yMax * ratio);
        svg.appendChild(label);
      }

      const gap = bins.length > 50 ? 0.4 : bins.length > 24 ? 1 : 2;
      const slot = plotWidth / Math.max(bins.length, 1);
      const barWidth = bins.length === 1
        ? Math.min(plotWidth * 0.3, 110)
        : Math.max(1.2, slot - gap);

      bins.forEach((bin, index) => {
        const barHeight = bin.probability > 0
          ? Math.max(1.5, (bin.probability / yMax) * plotHeight)
          : 0;
        const x = bins.length === 1
          ? margin.left + (plotWidth - barWidth) / 2
          : margin.left + index * slot + (slot - barWidth) / 2;
        const y = margin.top + plotHeight - barHeight;

        const rect = svgNode("rect", {
          x,
          y,
          width: barWidth,
          height: barHeight,
          fill: "#800000",
          opacity: bins.length > 50 ? 0.72 : 0.82
        });

        const title = svgNode("title");
        title.textContent = bin.min === bin.max
          ? `结果 ${formatCompact(bin.min)}：${formatChance(bin.probability)}`
          : `结果 ${formatCompact(bin.min)} 至 ${formatCompact(bin.max)}：${formatChance(bin.probability)}`;
        rect.appendChild(title);
        svg.appendChild(rect);
      });

      const tickCount = Math.min(5, bins.length);
      for (let i = 0; i < tickCount; i += 1) {
        const index = tickCount === 1 ? 0 : Math.round((i * (bins.length - 1)) / (tickCount - 1));
        const bin = bins[index];
        const x = bins.length === 1
          ? margin.left + plotWidth / 2
          : margin.left + index * slot + slot / 2;

        const label = svgNode("text", {
          x,
          y: height - 8,
          "text-anchor": i === 0 ? "start" : i === tickCount - 1 ? "end" : "middle",
          fill: "#666",
          "font-size": "10.5",
          "font-family": "Arial, Helvetica, sans-serif"
        });
        label.textContent = bin.label;
        svg.appendChild(label);
      }

      container.replaceChildren(svg);
    }

    function renderDiceChart(result) {
      renderDistributionChart(
        els.chart,
        chartPointsFromDice(result),
        `概率分布图：结果从 ${formatCompact(result.minOutcome)} 到 ${formatCompact(result.maxOutcome)}。`
      );
    }

    function renderNotice(warnings) {
      if (!warnings.length) {
        els.notice.hidden = true;
        els.notice.textContent = "";
        return;
      }
      els.notice.textContent = warnings.join(" ");
      els.notice.hidden = false;
    }

    function hideError() {
      els.errorPanel.hidden = true;
      els.input.setAttribute("aria-invalid", "false");
    }

    function showError(error) {
      els.errorMessage.textContent = formatError(error);
      els.errorPanel.hidden = false;
      els.result.hidden = true;
      els.notice.hidden = true;
      els.input.setAttribute("aria-invalid", "true");
    }

    function renderResult(result) {
      state.lastResult = result;
      hideError();
      renderNotice(result.warnings);

      els.expectedValue.textContent = formatNumber(result.expectedNumber);
      els.result.hidden = false;

      renderDiceChart(result);
      renderFormula(result);
      renderDice(result);
    }

    function runCalculation() {
      const raw = els.input.value;
      if (!raw.trim()) {
        showError(new core.DiceError("先输入一条掷骰指令，例如 4d6k3。"));
        els.input.focus();
        return;
      }

      try {
        renderResult(core.calculate(raw));
      } catch (error) {
        showError(error);
      }
    }

    function parseInteger(value, label, min, max) {
      const text = String(value).trim();
      if (!/^-?\d+$/.test(text)) {
        throw new Error(`${label} 必须填写整数。`);
      }
      const number = Number(text);
      if (!Number.isSafeInteger(number) || number < min || number > max) {
        throw new Error(`${label} 必须在 ${min} 到 ${max} 之间。`);
      }
      return number;
    }

    function defaultAttack() {
      return { bonus: "5", mode: "none", damage: "1d8+3" };
    }

    function createAttackRow(row, index) {
      const tr = document.createElement("tr");
      tr.dataset.index = String(index);

      const indexCell = document.createElement("td");
      indexCell.className = "attack-index";
      indexCell.textContent = String(index + 1);

      const bonusCell = document.createElement("td");
      bonusCell.dataset.label = "攻击加值";
      const bonusWrapper = document.createElement("div");
      bonusWrapper.className = "bonus-input";
      const bonusSign = document.createElement("span");
      bonusSign.className = "bonus-sign";
      bonusSign.setAttribute("aria-hidden", "true");
      bonusSign.textContent = "+";
      const bonusInput = document.createElement("input");
      bonusInput.type = "text";
      bonusInput.value = row.bonus;
      bonusInput.placeholder = "5 或 9+1d4";
      bonusInput.dataset.field = "bonus";
      bonusInput.setAttribute("aria-label", `第 ${index + 1} 次攻击的攻击加值`);
      bonusWrapper.append(bonusSign, bonusInput);
      updateBonusSign(bonusInput);
      bonusCell.appendChild(bonusWrapper);

      const modeCell = document.createElement("td");
      modeCell.dataset.label = "检定方式";
      const modeSelect = document.createElement("select");
      modeSelect.dataset.field = "mode";
      modeSelect.setAttribute("aria-label", `第 ${index + 1} 次攻击的检定方式`);
      for (const [value, label] of Object.entries(modeLabels)) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        if (isGreenMode(value)) option.className = "term-green";
        modeSelect.appendChild(option);
      }
      modeSelect.value = row.mode;
      updateModeTerm(modeSelect);
      modeCell.appendChild(modeSelect);

      const damageCell = document.createElement("td");
      damageCell.dataset.label = "命中伤害";
      const damageInput = document.createElement("input");
      damageInput.type = "text";
      damageInput.value = row.damage;
      damageInput.placeholder = "1d8+3";
      damageInput.dataset.field = "damage";
      damageInput.setAttribute("aria-label", `第 ${index + 1} 次攻击的命中伤害`);
      damageCell.appendChild(damageInput);

      const actionCell = document.createElement("td");

      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "copy-attack";
      copyButton.textContent = "复制";
      copyButton.dataset.copy = String(index);
      copyButton.disabled = attackState.rows.length >= MAX_ATTACKS;
      copyButton.setAttribute("aria-label", `复制第 ${index + 1} 次攻击`);
      copyButton.title = "复制这一栏";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-attack";
      deleteButton.textContent = "删除";
      deleteButton.dataset.delete = String(index);
      deleteButton.disabled = attackState.rows.length <= 1;
      deleteButton.setAttribute("aria-label", `删除第 ${index + 1} 次攻击`);
      deleteButton.title = attackState.rows.length <= 1 ? "至少保留 1 次攻击" : "删除这一栏";

      actionCell.append(copyButton, deleteButton);
      tr.append(indexCell, bonusCell, modeCell, damageCell, actionCell);
      return tr;
    }

    function renderAttackRows() {
      els.attackRows.replaceChildren(...attackState.rows.map(createAttackRow));
      els.attackCount.value = String(attackState.rows.length);
    }

    function syncAttackRows(count) {
      while (attackState.rows.length < count) {
        const previous = attackState.rows[attackState.rows.length - 1] || defaultAttack();
        attackState.rows.push({ ...previous });
      }
      while (attackState.rows.length > count) {
        attackState.rows.pop();
      }
      renderAttackRows();
    }

    const attackRollCache = new Map();

    function attackRollCounts(mode) {
      if (attackRollCache.has(mode)) return attackRollCache.get(mode);

      const counts = new Map();

      if (mode === "elven") {
        for (let first = 1; first <= 20; first += 1) {
          for (let second = 1; second <= 20; second += 1) {
            for (let third = 1; third <= 20; third += 1) {
              const roll = Math.max(first, second, third);
              counts.set(roll, (counts.get(roll) || 0) + 1);
            }
          }
        }
      } else if (mode === "advantage" || mode === "disadvantage") {
        for (let first = 1; first <= 20; first += 1) {
          for (let second = 1; second <= 20; second += 1) {
            const roll = mode === "advantage"
              ? Math.max(first, second)
              : Math.min(first, second);
            counts.set(roll, (counts.get(roll) || 0) + 1);
          }
        }
      } else {
        for (let roll = 1; roll <= 20; roll += 1) {
          counts.set(roll, 1);
        }
      }

      attackRollCache.set(mode, counts);
      return counts;
    }

    function attackRollProfile(ac, bonusDistribution, mode, critEnabled, critThreshold) {
      const counts = attackRollCounts(mode);
      let totalRolls = 0;
      for (const count of counts.values()) totalRolls += count;

      let hitProbability = 0;
      let criticalProbability = 0;

      for (const [roll, count] of counts) {
        const rollProbability = count / totalRolls;
        for (const bonus of bonusDistribution) {
          const probability = rollProbability * bonus.probabilityNumber;
          const isHit = roll === 20 || (roll !== 1 && roll + bonus.valueNumber >= ac);
          if (!isHit) continue;
          hitProbability += probability;
          if (critEnabled && roll >= critThreshold) criticalProbability += probability;
        }
      }

      return {
        hitProbability,
        criticalProbability,
        normalHitProbability: hitProbability - criticalProbability
      };
    }

    function roundDamage(value) {
      return Math.round(value * 1e6) / 1e6;
    }

    function buildAttackDistribution(damage, profile) {
      const distribution = new Map();

      function add(value, probability) {
        if (!(probability > 0)) return;
        const key = roundDamage(value);
        distribution.set(key, (distribution.get(key) || 0) + probability);
        if (distribution.size > 30000) {
          throw new Error("单次攻击的伤害分布过大，暂不支持。");
        }
      }

      add(0, 1 - profile.hitProbability);

      for (const point of damage.distribution) {
        add(point.valueNumber, point.probabilityNumber * profile.normalHitProbability);
      }

      for (const point of damage.crit.distribution) {
        add(point.valueNumber, point.probabilityNumber * profile.criticalProbability);
      }

      return distribution;
    }

    function convolveAttackDistributions(distributions) {
      let total = new Map([[0, 1]]);
      let operations = 0;

      for (const distribution of distributions) {
        const next = new Map();

        for (const [leftValue, leftProbability] of total) {
          for (const [rightValue, rightProbability] of distribution) {
            const value = roundDamage(leftValue + rightValue);
            next.set(value, (next.get(value) || 0) + leftProbability * rightProbability);
            operations += 1;
            if (operations > 12000000) {
              throw new Error("总伤害分布过于复杂，暂不绘制。");
            }
          }
        }

        if (next.size > 30000) {
          throw new Error("总伤害分布过于复杂，暂不绘制。");
        }
        total = next;
      }

      return [...total.entries()]
        .map(([value, probability]) => ({ value, probability }))
        .sort((a, b) => a.value - b.value);
    }

    function renderAttackChart(result) {
      if (!result.totalDistribution) {
        const note = document.createElement("p");
        note.className = "no-dice-note";
        note.textContent = result.chartError || "总伤害分布暂不绘制。";
        els.attackChart.replaceChildren(note);
        return;
      }

      const points = result.totalDistribution;
      const minimum = points[0].value;
      const maximum = points[points.length - 1].value;
      renderDistributionChart(
        els.attackChart,
        points,
        `总伤害分布图：伤害从 ${formatCompact(minimum)} 到 ${formatCompact(maximum)}。`
      );
    }

    function renderAttackBreakdown(result) {
      els.attackBreakdownBody.replaceChildren();

      for (const attack of result.attacks) {
        const row = document.createElement("tr");

        const indexCell = document.createElement("td");
        indexCell.dataset.label = "攻击";
        indexCell.textContent = String(attack.index + 1);

        const bonusCell = document.createElement("td");
        bonusCell.dataset.label = "加值";
        bonusCell.textContent = formatBonusText(attack.bonusText);
        bonusCell.title = `期望加值 ${formatNumber(attack.bonusExpectedNumber)}`;

        const modeCell = document.createElement("td");
        modeCell.dataset.label = "状态";
        if (isGreenMode(attack.mode)) {
          const term = document.createElement("span");
          term.className = "term-green";
          term.textContent = modeLabels[attack.mode];
          modeCell.appendChild(term);
        } else {
          modeCell.textContent = modeLabels[attack.mode];
        }

        const hitCell = document.createElement("td");
        hitCell.dataset.label = "命中率";
        hitCell.className = "num";
        hitCell.textContent = formatChance(attack.profile.hitProbability);

        const critCell = document.createElement("td");
        critCell.dataset.label = "重击率";
        critCell.className = "num";
        critCell.textContent = result.critEnabled
          ? formatChance(attack.profile.criticalProbability)
          : "—";

        const damageCell = document.createElement("td");
        damageCell.dataset.label = "命中伤害";
        damageCell.className = "num";
        damageCell.textContent = formatNumber(attack.damage.expectedNumber);

        const expectedCell = document.createElement("td");
        expectedCell.dataset.label = "期望";
        expectedCell.className = "num";
        expectedCell.textContent = formatNumber(attack.expected);
        expectedCell.title = result.critEnabled
          ? `普通命中贡献 ${formatNumber(attack.normalHitProbability * attack.damage.expectedNumber)}；重击贡献 ${formatNumber(attack.profile.criticalProbability * attack.damage.crit.expectedNumber)}`
          : `普通命中贡献 ${formatNumber(attack.expected)}；未计入重击`;

        row.append(indexCell, bonusCell, modeCell, hitCell, critCell, damageCell, expectedCell);
        els.attackBreakdownBody.appendChild(row);
      }

      els.attackTotalCell.textContent = formatNumber(result.totalExpected);
    }

    function hideAttackError() {
      els.attackError.hidden = true;
      els.attackErrorMessage.textContent = "";
    }

    function showAttackError(error) {
      els.attackErrorMessage.textContent = formatError(error);
      els.attackError.hidden = false;
      els.attackResult.hidden = true;
      attackState.lastResult = null;
    }

    function calculateAttacks() {
      attackState.timer = null;

      try {
        const ac = parseInteger(els.targetAc.value, "目标 AC", 0, 50);
        const count = parseInteger(els.attackCount.value, "攻击次数", 1, MAX_ATTACKS);
        const critEnabled = els.critEnabled.checked;
        const critThreshold = critEnabled
          ? parseInteger(els.critThreshold.value, "重击阈值", 1, 20)
          : 20;

        if (count !== attackState.rows.length) {
          syncAttackRows(count);
        }

        const attacks = attackState.rows.map((row, index) => {
          const mode = row.mode;
          if (!modeLabels[mode]) {
            throw new Error(`第 ${index + 1} 次攻击的检定方式无效。`);
          }
          if (!String(row.bonus).trim()) {
            throw new Error(`第 ${index + 1} 次攻击的攻击加值不能为空。`);
          }
          if (!String(row.damage).trim()) {
            throw new Error(`第 ${index + 1} 次攻击的命中伤害不能为空。`);
          }

          let bonusRoll;
          try {
            bonusRoll = core.calculate(row.bonus);
          } catch (error) {
            const wrapped = new Error(`第 ${index + 1} 次攻击的攻击加值：${error.message}`);
            if (error && Number.isInteger(error.position)) wrapped.position = error.position;
            throw wrapped;
          }

          let damage;
          try {
            damage = core.analyzeDamage(row.damage);
          } catch (error) {
            const wrapped = new Error(`第 ${index + 1} 次攻击的命中伤害：${error.message}`);
            if (error && Number.isInteger(error.position)) wrapped.position = error.position;
            throw wrapped;
          }

          const profile = attackRollProfile(
            ac,
            bonusRoll.distribution,
            mode,
            critEnabled,
            critThreshold
          );
          const normalHitProbability = profile.normalHitProbability;
          const expected = normalHitProbability * damage.expectedNumber
            + profile.criticalProbability * damage.crit.expectedNumber;
          const distribution = buildAttackDistribution(damage, profile);

          return {
            index,
            bonusText: bonusRoll.canonical,
            bonusExpectedNumber: bonusRoll.expectedNumber,
            mode,
            damage,
            profile,
            normalHitProbability,
            expected,
            distribution
          };
        });

        const totalExpected = attacks.reduce((sum, attack) => sum + attack.expected, 0);
        let totalDistribution = null;
        let chartError = null;

        try {
          totalDistribution = convolveAttackDistributions(attacks.map((attack) => attack.distribution));
        } catch (error) {
          chartError = error.message;
        }

        attackState.lastResult = {
          attacks,
          totalExpected,
          totalDistribution,
          chartError,
          critEnabled,
          critThreshold
        };
        hideAttackError();

        els.totalDamage.textContent = formatNumber(totalExpected);
        els.critNote.textContent = critEnabled ? "含重击" : "不计重击";
        els.attackResult.hidden = false;
        renderAttackChart(attackState.lastResult);
        renderAttackBreakdown(attackState.lastResult);
      } catch (error) {
        showAttackError(error);
      }
    }

    function scheduleAttackCalculation(delay = 180) {
      window.clearTimeout(attackState.timer);
      attackState.timer = window.setTimeout(calculateAttacks, delay);
    }

    function syncCritControls() {
      const enabled = els.critEnabled.checked;
      els.critThresholdWrap.hidden = !enabled;
      els.critThreshold.disabled = !enabled;
      if (enabled && !els.critThreshold.value) els.critThreshold.value = "20";
    }

    function initializeAttackCalculator() {
      attackState.rows = [defaultAttack()];
      renderAttackRows();
      syncCritControls();
      calculateAttacks();
    }

    const tabOrder = ["calculator", "attributes", "builder", "monster"];
    const tabConfig = {
      calculator: {
        tab: els.tabCalculator,
        panel: els.panelCalculator,
        title: "DND 5e 2024 数据计算器"
      },
      attributes: {
        tab: els.tabAttributes,
        panel: els.panelAttributes,
        title: "属性生成 - DND 5e 2024 数据计算器"
      },
      builder: {
        tab: els.tabBuilder,
        panel: els.panelBuilder,
        title: "角色构筑 - DND 5e 2024 数据计算器"
      },
      monster: {
        tab: els.tabMonster,
        panel: els.panelMonster,
        title: "怪物设计 - DND 5e 2024 数据计算器"
      }
    };

    function selectTab(name, updateHash = true, shouldScroll = true) {
      const selected = tabConfig[name] ? name : "calculator";

      for (const [key, config] of Object.entries(tabConfig)) {
        config.tab.setAttribute("aria-selected", String(key === selected));
        config.tab.tabIndex = key === selected ? 0 : -1;
        config.panel.hidden = key !== selected;
      }

      document.title = tabConfig[selected].title;
      saveActiveTab(selected);

      if (updateHash) {
        if (isWebProtocol()) {
          history.replaceState(null, "", `#${selected}`);
        } else {
          clearVirtualHash();
        }
      }

      if (shouldScroll) window.scrollTo(0, 0);

      if (selected === "calculator") {
        requestAnimationFrame(() => {
          if (state.lastResult && !els.result.hidden) renderDiceChart(state.lastResult);
          if (attackState.lastResult && !els.attackResult.hidden) {
            renderAttackChart(attackState.lastResult);
          }
        });
      }
    }

    let diceTimer = null;
    function scheduleDiceCalculation(delay = 120) {
      window.clearTimeout(diceTimer);
      diceTimer = window.setTimeout(runCalculation, delay);
    }

    els.form.addEventListener("submit", (event) => {
      event.preventDefault();
      window.clearTimeout(diceTimer);
      runCalculation();
    });

    els.input.addEventListener("input", () => scheduleDiceCalculation());

    document.querySelectorAll("[data-expr]").forEach((button) => {
      button.addEventListener("click", () => {
        window.clearTimeout(diceTimer);
        els.input.value = button.dataset.expr;
        runCalculation();
      });
    });

    els.attackRows.addEventListener("input", (event) => {
      const field = event.target.dataset.field;
      if (!field) return;
      const rowElement = event.target.closest("tr[data-index]");
      if (!rowElement) return;
      const row = attackState.rows[Number(rowElement.dataset.index)];
      if (!row) return;
      row[field] = event.target.value;
      if (field === "bonus") updateBonusSign(event.target);
      if (field === "mode") updateModeTerm(event.target);
      scheduleAttackCalculation();
    });

    els.attackRows.addEventListener("change", (event) => {
      const field = event.target.dataset.field;
      if (!field) return;
      const rowElement = event.target.closest("tr[data-index]");
      if (!rowElement) return;
      const row = attackState.rows[Number(rowElement.dataset.index)];
      if (!row) return;
      row[field] = event.target.value;
      if (field === "bonus") updateBonusSign(event.target);
      if (field === "mode") updateModeTerm(event.target);
      scheduleAttackCalculation();
    });

    els.attackRows.addEventListener("click", (event) => {
      const copyButton = event.target.closest("[data-copy]");
      const deleteButton = event.target.closest("[data-delete]");

      if (copyButton) {
        if (attackState.rows.length >= MAX_ATTACKS) {
          showAttackError(new Error(`最多支持 ${MAX_ATTACKS} 次攻击。`));
          return;
        }

        const index = Number(copyButton.dataset.copy);
        const source = attackState.rows[index];
        if (!source) return;

        attackState.rows.splice(index + 1, 0, { ...source });
        renderAttackRows();
        const inserted = els.attackRows.querySelector(`tr[data-index="${index + 1}"]`);
        const focusTarget = inserted && inserted.querySelector('input[data-field="bonus"]');
        if (focusTarget) focusTarget.focus();
        scheduleAttackCalculation(0);
        return;
      }

      if (deleteButton) {
        if (attackState.rows.length <= 1) {
          showAttackError(new Error("至少保留 1 次攻击。"));
          return;
        }

        const index = Number(deleteButton.dataset.delete);
        if (!attackState.rows[index]) return;

        attackState.rows.splice(index, 1);
        renderAttackRows();
        els.attackCount.focus({ preventScroll: true });
        scheduleAttackCalculation(0);
      }
    });

    els.attackCount.addEventListener("input", () => {
      const text = els.attackCount.value.trim();
      if (/^\d+$/.test(text)) {
        const count = Number(text);
        if (Number.isInteger(count) && count >= 1 && count <= MAX_ATTACKS) {
          if (count !== attackState.rows.length) syncAttackRows(count);
        }
      }
      scheduleAttackCalculation();
    });

    els.targetAc.addEventListener("input", () => scheduleAttackCalculation());

    els.critEnabled.addEventListener("change", () => {
      syncCritControls();
      scheduleAttackCalculation(0);
    });

    els.critThreshold.addEventListener("input", () => {
      if (els.critEnabled.checked) scheduleAttackCalculation();
    });

    document.querySelectorAll("[data-tab]").forEach((tab) => {
      tab.addEventListener("click", () => selectTab(tab.dataset.tab));
    });

    document.querySelectorAll("[role=tab]").forEach((tab) => {
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const current = tab.dataset.tab;
        const index = tabOrder.indexOf(current);
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = tabOrder[(index + direction + tabOrder.length) % tabOrder.length];
        selectTab(next);
        tabConfig[next].tab.focus();
      });
    });

    window.addEventListener("hashchange", () => {
      if (!isWebProtocol()) return;
      const name = window.location.hash.slice(1);
      selectTab(tabConfig[name] ? name : "calculator", false, false);
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (state.lastResult && !els.result.hidden) renderDiceChart(state.lastResult);
        if (attackState.lastResult && !els.attackResult.hidden) {
          renderAttackChart(attackState.lastResult);
        }
      }, 160);
    });

    const hashTab = window.location.hash.slice(1);
    const documentTab = document.body.dataset.initialTab;
    const savedTab = readSavedTab();
    const initialTab = tabConfig[hashTab]
      ? hashTab
      : tabConfig[documentTab]
        ? documentTab
        : tabConfig[savedTab]
          ? savedTab
          : "calculator";
    selectTab(initialTab, false, false);
    clearVirtualHash();
    initializeAttackCalculator();
  })();

  