(function () {
  "use strict";

  const panel = document.getElementById("panel-attributes");
  if (!panel) return;

  const abilityDefs = [
    { key: "str", name: "力量" },
    { key: "dex", name: "敏捷" },
    { key: "con", name: "体质" },
    { key: "int", name: "智力" },
    { key: "wis", name: "感知" },
    { key: "cha", name: "魅力" }
  ];
  const defaultCosts = [
    { score: 8, cost: 0 },
    { score: 9, cost: 1 },
    { score: 10, cost: 2 },
    { score: 11, cost: 3 },
    { score: 12, cost: 4 },
    { score: 13, cost: 5 },
    { score: 14, cost: 7 },
    { score: 15, cost: 9 }
  ];
  const standardArray = [15, 14, 13, 12, 10, 8];

  const modeTabs = [...panel.querySelectorAll("[data-attribute-mode]")];
  const modePanels = [...panel.querySelectorAll("[data-attribute-panel]")];
  const costPanel = document.getElementById("attribute-cost-panel");
  const buyBody = document.getElementById("attribute-buy-body");
  const costBody = document.getElementById("attribute-cost-body");
  const costTable = document.querySelector(".pointbuy-cost-table");
  const budgetInput = document.getElementById("attribute-point-budget");
  const spentOutput = document.getElementById("attribute-point-spent");
  const remainingOutput = document.getElementById("attribute-point-remaining");
  const customCheckbox = document.getElementById("attribute-custom-rules");
  const costToolbar = panel.querySelector(".attribute-cost-toolbar");
  const addLow = document.getElementById("attribute-add-low");
  const addHigh = document.getElementById("attribute-add-high");
  const costReset = document.getElementById("attribute-cost-reset");
  const standardBody = document.getElementById("attribute-standard-body");
  const rollBody = document.getElementById("attribute-roll-body");
  const rollButton = document.getElementById("attribute-roll-button");
  const rollResult = document.getElementById("attribute-roll-result");
  const manualBody = document.getElementById("attribute-manual-body");

  let costRows = defaultCosts.map((row) => ({ ...row }));
  let customRules = false;
  let currentMode = "pointbuy";
  let abilityScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 8]));
  let backgroundScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let growthScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let standardScores = Object.fromEntries(
    abilityDefs.map((ability, index) => [ability.key, standardArray[index]])
  );
  let standardBackgroundScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let standardGrowthScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let rolledScores = [];
  let rolledInitialScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, ""]));
  let rollBackgroundScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let rollGrowthScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let manualInitialScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 10]));
  let manualBackgroundScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));
  let manualGrowthScores = Object.fromEntries(abilityDefs.map((ability) => [ability.key, 0]));

  const ATTRIBUTE_INITIALS_STORAGE_KEY = "dnd5e2024.attributeInitialScores";

  function currentInitialScores(mode) {
    const scores = {};
    for (const ability of abilityDefs) {
      let value;
      if (mode === "pointbuy") {
        value = abilityScores[ability.key];
      } else if (mode === "standard") {
        value = standardScores[ability.key];
      } else if (mode === "manual") {
        value = manualInitialScores[ability.key];
      } else if (mode === "roll") {
        const token = rolledInitialScores[ability.key];
        value = token === "" || token === undefined
          ? null
          : rolledScores[Number(token)];
      }
      if (value === "" || value === null || value === undefined) return null;
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) return null;
      scores[ability.key] = numeric;
    }
    return scores;
  }

  function publishInitialScores(mode) {
    const scores = currentInitialScores(mode);
    if (!scores) return;
    try {
      localStorage.setItem(ATTRIBUTE_INITIALS_STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
      // 存储不可用时仍把当前数组传给角色构筑。
    }
    document.dispatchEvent(new CustomEvent("dnd:attribute-initials-changed", {
      detail: { mode, scores }
    }));
  }

  function modifier(score) {
    const value = Math.floor((Number(score) - 10) / 2);
    return value >= 0 ? `+${value}` : String(value);
  }

  function sortedRows() {
    return [...costRows].sort((a, b) => a.score - b.score);
  }

  function costForScore(score) {
    return Number(costRows.find((row) => row.score === score)?.cost) || 0;
  }

  function budget() {
    const value = Number.parseInt(budgetInput.value, 10);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }

  function readScore(input) {
    const value = Number.parseInt(input.value, 10);
    return Number.isFinite(value) ? value : 0;
  }

  function renderCostTable() {
    costRows = sortedRows();
    costBody.replaceChildren();
    const headerRow = costTable?.querySelector("thead tr");
    let actionHead = headerRow?.querySelector(".pointbuy-action-head");
    if (customRules && headerRow && !actionHead) {
      actionHead = document.createElement("th");
      actionHead.className = "pointbuy-action-head";
      headerRow.append(actionHead);
    } else if (!customRules && actionHead) {
      actionHead.remove();
      actionHead = null;
    }
    const lastIndex = costRows.length - 1;
    costRows.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.dataset.score = String(row.score);

      const scoreCell = document.createElement("td");
      scoreCell.textContent = String(row.score);
      const modCell = document.createElement("td");
      modCell.textContent = modifier(row.score);
      const costCell = document.createElement("td");
      costCell.className = "pointbuy-cost-cell";

      const input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.step = "1";
      input.className = "pointbuy-cost-input";
      input.value = String(row.cost);
      input.readOnly = !customRules;
      input.setAttribute("aria-label", `${row.score} 点数花费`);
      input.addEventListener("input", () => {
        row.cost = Math.max(0, Math.floor(Number(input.value) || 0));
        updatePointBuy();
      });
      costCell.append(input);

      if (customRules) {
        const actionCell = document.createElement("td");
        actionCell.className = "pointbuy-action-cell";
        if ((index === 0 || index === lastIndex) && costRows.length > 1) {
          const trash = document.createElement("button");
          trash.type = "button";
          trash.className = "pointbuy-trash";
          trash.textContent = "🗑";
          trash.title = "删除此属性值";
          trash.setAttribute("aria-label", `删除属性值 ${row.score}`);
          trash.addEventListener("click", () => {
            if (costRows.length <= 1) return;
            costRows = costRows.filter((item) => item !== row);
            renderCostTable();
            rebuildBuyTable();
          });
          actionCell.append(trash);
        }
        tr.append(scoreCell, modCell, costCell, actionCell);
      } else {
        tr.append(scoreCell, modCell, costCell);
      }
      costBody.append(tr);
    });
    costToolbar.hidden = !customRules;
  }

  function rebuildBuyTable() {
    const rows = sortedRows();
    const values = rows.map((row) => row.score);
    buyBody.replaceChildren();
    for (const ability of abilityDefs) {
      if (!values.includes(abilityScores[ability.key])) {
        abilityScores[ability.key] = values[0];
      }
      const tr = document.createElement("tr");
      const label = document.createElement("th");
      label.scope = "row";
      label.textContent = ability.name;

      const finalCell = document.createElement("td");
      finalCell.className = "attribute-final-cell";
      finalCell.dataset.finalFor = ability.key;

      const gapBefore = document.createElement("td");
      gapBefore.className = "attribute-gap-cell";

      const initialCell = document.createElement("td");
      const stepper = document.createElement("div");
      stepper.className = "pointbuy-stepper";

      const decrease = document.createElement("button");
      decrease.type = "button";
      decrease.className = "pointbuy-stepper-button";
      decrease.textContent = "−";
      decrease.setAttribute("aria-label", `${ability.name}初始值减少`);
      const valueLabel = document.createElement("span");
      valueLabel.className = "pointbuy-stepper-value";
      valueLabel.setAttribute("aria-live", "polite");
      const increase = document.createElement("button");
      increase.type = "button";
      increase.className = "pointbuy-stepper-button";
      increase.textContent = "+";
      increase.setAttribute("aria-label", `${ability.name}初始值增加`);

      const minValue = values[0];
      const maxValue = values[values.length - 1];
      const syncStepper = () => {
        valueLabel.textContent = String(abilityScores[ability.key]);
        decrease.disabled = abilityScores[ability.key] <= minValue;
        increase.disabled = abilityScores[ability.key] >= maxValue;
      };
      const stepScore = (direction) => {
        const currentIndex = values.indexOf(abilityScores[ability.key]);
        if (currentIndex < 0) return;
        const nextIndex = Math.max(0, Math.min(values.length - 1, currentIndex + direction));
        if (nextIndex === currentIndex) return;
        abilityScores[ability.key] = values[nextIndex];
        syncStepper();
        updatePointBuy();
        publishInitialScores("pointbuy");
      };
      decrease.addEventListener("click", () => stepScore(-1));
      increase.addEventListener("click", () => stepScore(1));

      stepper.append(decrease, valueLabel, increase);
      initialCell.append(stepper);
      syncStepper();

      const backgroundCell = document.createElement("td");
      const backgroundWrap = document.createElement("div");
      backgroundWrap.className = "attribute-mod-wrap";
      const backgroundPlus = document.createElement("span");
      backgroundPlus.className = "attribute-mod-plus";
      backgroundPlus.textContent = "+";
      backgroundPlus.setAttribute("aria-hidden", "true");
      const backgroundInput = document.createElement("input");
      backgroundInput.type = "number";
      backgroundInput.step = "1";
      backgroundInput.className = "attribute-mod-input";
      backgroundInput.value = String(backgroundScores[ability.key] || "");
      backgroundInput.setAttribute("aria-label", `${ability.name}背景加值`);
      backgroundWrap.classList.toggle("has-value", backgroundInput.value !== "");
      backgroundInput.addEventListener("input", () => {
        backgroundScores[ability.key] = Number(backgroundInput.value) || 0;
        backgroundWrap.classList.toggle("has-value", backgroundInput.value.trim() !== "");
        updatePointBuy();
      });
      backgroundInput.addEventListener("blur", () => {
        if ((Number(backgroundInput.value) || 0) === 0) {
          backgroundInput.value = "";
          backgroundWrap.classList.remove("has-value");
        }
      });
      backgroundWrap.append(backgroundPlus, backgroundInput);
      backgroundCell.append(backgroundWrap);

      const growthCell = document.createElement("td");
      const growthWrap = document.createElement("div");
      growthWrap.className = "attribute-mod-wrap";
      const growthPlus = document.createElement("span");
      growthPlus.className = "attribute-mod-plus";
      growthPlus.textContent = "+";
      growthPlus.setAttribute("aria-hidden", "true");
      const growthInput = document.createElement("input");
      growthInput.type = "number";
      growthInput.step = "1";
      growthInput.className = "attribute-mod-input";
      growthInput.value = String(growthScores[ability.key] || "");
      growthInput.setAttribute("aria-label", `${ability.name}成长加值`);
      growthWrap.classList.toggle("has-value", growthInput.value !== "");
      growthInput.addEventListener("input", () => {
        growthScores[ability.key] = Number(growthInput.value) || 0;
        growthWrap.classList.toggle("has-value", growthInput.value.trim() !== "");
        updatePointBuy();
      });
      growthInput.addEventListener("blur", () => {
        if ((Number(growthInput.value) || 0) === 0) {
          growthInput.value = "";
          growthWrap.classList.remove("has-value");
        }
      });
      growthWrap.append(growthPlus, growthInput);
      growthCell.append(growthWrap);

      const gapAfter = document.createElement("td");
      gapAfter.className = "attribute-gap-cell";
      const adjustCell = document.createElement("td");
      adjustCell.className = "attribute-adjust-cell";
      adjustCell.dataset.adjustFor = ability.key;

      tr.append(label, finalCell, gapBefore, initialCell, backgroundCell, growthCell, gapAfter, adjustCell);
      buyBody.append(tr);
    }
    updatePointBuy();
  }

  function updatePointBuy() {
    let spent = 0;
    for (const ability of abilityDefs) {
      const initial = abilityScores[ability.key];
      const final = initial + (Number(backgroundScores[ability.key]) || 0) +
        (Number(growthScores[ability.key]) || 0);
      spent += costForScore(initial);
      const finalCell = buyBody.querySelector(`[data-final-for="${ability.key}"]`);
      const adjustCell = buyBody.querySelector(`[data-adjust-for="${ability.key}"]`);
      if (finalCell) finalCell.textContent = String(final);
      if (adjustCell) adjustCell.textContent = modifier(final);
    }
    const available = budget();
    const remaining = available - spent;
    spentOutput.textContent = String(spent);
    remainingOutput.textContent = String(remaining);
    remainingOutput.classList.toggle("is-negative", remaining < 0);
  }

  function createDistributionModifier(ability, label, state, onChange) {
    const wrap = document.createElement("div");
    wrap.className = "attribute-mod-wrap";
    const plus = document.createElement("span");
    plus.className = "attribute-mod-plus";
    plus.textContent = "+";
    plus.setAttribute("aria-hidden", "true");
    const input = document.createElement("input");
    input.type = "number";
    input.step = "1";
    input.className = "attribute-mod-input";
    input.value = state[ability.key] ? String(state[ability.key]) : "";
    input.setAttribute("aria-label", `${ability.name}${label}`);
    wrap.classList.toggle("has-value", input.value !== "");
    input.addEventListener("input", () => {
      state[ability.key] = Number(input.value) || 0;
      wrap.classList.toggle("has-value", input.value.trim() !== "");
      onChange();
    });
    input.addEventListener("blur", () => {
      if ((Number(input.value) || 0) === 0) {
        input.value = "";
        wrap.classList.remove("has-value");
      }
    });
    wrap.append(plus, input);
    return wrap;
  }

  function updateDistributionTable(container, values, background, growth, resolveInitial) {
    for (const row of container.querySelectorAll("tr[data-ability]")) {
      const key = row.dataset.ability;
      const initial = values[key];
      const base = initial === "" || initial === undefined
        ? ""
        : resolveInitial
          ? resolveInitial(initial)
          : Number(initial);
      const final = base === "" || base === null || base === undefined
        ? ""
        : Number(base) + (Number(background[key]) || 0) + (Number(growth[key]) || 0);
      const finalCell = row.querySelector("[data-final-for]");
      const adjustCell = row.querySelector("[data-adjust-for]");
      if (finalCell) finalCell.textContent = final === "" ? "" : String(final);
      if (adjustCell) adjustCell.textContent = final === "" ? "" : modifier(final);
    }
  }

  function updateDistributionHighlights(container, config) {
    if (!config.highlightUnused) return;
    const selects = [...container.querySelectorAll(".attribute-score-select")];
    const used = new Set(selects.map((select) => select.value).filter(Boolean));
    for (const select of selects) {
      for (const option of select.options) {
        option.classList.toggle(
          "is-unassigned",
          Boolean(option.value) && !used.has(option.value)
        );
      }
    }
  }

  function renderDistributionTable(container, options, values, background, growth, ariaPrefix, config = {}) {
    container.replaceChildren();
    const entries = [...options];
    const optionValues = entries.map((entry) => entry.value);
    const resolveInitial = config.resolveInitial || ((value) => Number(value));
    for (const ability of abilityDefs) {
      if (optionValues.length && !optionValues.includes(String(values[ability.key]))) {
        values[ability.key] = optionValues[0];
      }
      if (!optionValues.length) values[ability.key] = "";

      const tr = document.createElement("tr");
      tr.dataset.ability = ability.key;
      const label = document.createElement("th");
      label.scope = "row";
      label.textContent = ability.name;

      const finalCell = document.createElement("td");
      finalCell.className = "attribute-final-cell";
      finalCell.dataset.finalFor = ability.key;
      const gapBefore = document.createElement("td");
      gapBefore.className = "attribute-gap-cell";

      const initialCell = document.createElement("td");
      const select = document.createElement("select");
      select.className = "attribute-score-select";
      select.setAttribute("aria-label", `${ability.name}${ariaPrefix}初始数值`);
      if (!optionValues.length) {
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "—";
        select.append(placeholder);
        select.disabled = true;
      } else {
        if (config.allowEmpty) {
          const placeholder = document.createElement("option");
          placeholder.value = "";
          placeholder.textContent = "—";
          select.append(placeholder);
        }
        for (const entry of entries) {
          const option = document.createElement("option");
          option.value = entry.value;
          option.textContent = entry.label;
          select.append(option);
        }
      }
      select.value = values[ability.key] === "" ? "" : String(values[ability.key]);
      select.addEventListener("change", () => {
        if (config.unique && select.value !== "") {
          for (const otherRow of container.querySelectorAll("tr[data-ability]")) {
            if (otherRow === tr) continue;
            const otherSelect = otherRow.querySelector(".attribute-score-select");
            if (otherSelect && otherSelect.value === select.value) {
              otherSelect.value = "";
              values[otherRow.dataset.ability] = "";
            }
          }
        }
        values[ability.key] = select.value;
        updateDistributionTable(container, values, background, growth, resolveInitial);
        updateDistributionHighlights(container, config);
        config.onInitialChange?.();
      });
      initialCell.append(select);

      const backgroundCell = document.createElement("td");
      backgroundCell.append(createDistributionModifier(
        ability,
        "背景加值",
        background,
        () => updateDistributionTable(container, values, background, growth, resolveInitial)
      ));
      const growthCell = document.createElement("td");
      growthCell.append(createDistributionModifier(
        ability,
        "成长加值",
        growth,
        () => updateDistributionTable(container, values, background, growth, resolveInitial)
      ));

      const gapAfter = document.createElement("td");
      gapAfter.className = "attribute-gap-cell";
      const adjustCell = document.createElement("td");
      adjustCell.className = "attribute-adjust-cell";
      adjustCell.dataset.adjustFor = ability.key;

      tr.append(label, finalCell, gapBefore, initialCell, backgroundCell, growthCell, gapAfter, adjustCell);
      container.append(tr);
    }
    updateDistributionTable(container, values, background, growth, resolveInitial);
    updateDistributionHighlights(container, config);
  }

  function renderStandardTable() {
    renderDistributionTable(
      standardBody,
      standardArray.map((value) => ({ value: String(value), label: String(value) })),
      standardScores,
      standardBackgroundScores,
      standardGrowthScores,
      "标准数组",
      {
        allowEmpty: true,
        unique: true,
        highlightUnused: true,
        resolveInitial: (value) => Number(value),
        onInitialChange: () => publishInitialScores("standard")
      }
    );
  }

  function roll4d6() {
    const dice = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    dice.sort((a, b) => a - b);
    return dice.slice(1).reduce((sum, die) => sum + die, 0);
  }

  function renderRollTable() {
    renderDistributionTable(
      rollBody,
      rolledScores.map((score, index) => ({
        value: String(index),
        label: String(score)
      })),
      rolledInitialScores,
      rollBackgroundScores,
      rollGrowthScores,
      "掷骰",
      {
        allowEmpty: true,
        unique: true,
        highlightUnused: true,
        resolveInitial: (value) => rolledScores[Number(value)] ?? "",
        onInitialChange: () => publishInitialScores("roll")
      }
    );
  }

  function updateManualTable() {
    for (const row of manualBody.querySelectorAll("tr[data-ability]")) {
      const key = row.dataset.ability;
      const initial = Number(manualInitialScores[key]) || 0;
      const final = initial + (Number(manualBackgroundScores[key]) || 0) +
        (Number(manualGrowthScores[key]) || 0);
      const finalCell = row.querySelector("[data-final-for]");
      const adjustCell = row.querySelector("[data-adjust-for]");
      if (finalCell) finalCell.textContent = String(final);
      if (adjustCell) adjustCell.textContent = modifier(final);
    }
  }

  function renderManualTable() {
    manualBody.replaceChildren();
    for (const ability of abilityDefs) {
      const tr = document.createElement("tr");
      tr.dataset.ability = ability.key;
      const label = document.createElement("th");
      label.scope = "row";
      label.textContent = ability.name;

      const finalCell = document.createElement("td");
      finalCell.className = "attribute-final-cell";
      finalCell.dataset.finalFor = ability.key;
      const gapBefore = document.createElement("td");
      gapBefore.className = "attribute-gap-cell";

      const initialCell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.max = "30";
      input.step = "1";
      input.value = String(manualInitialScores[ability.key] ?? "");
      input.className = "attribute-mod-input attribute-initial-input";
      input.setAttribute("aria-label", `${ability.name}初始数值`);
      input.addEventListener("input", () => {
        manualInitialScores[ability.key] = Number(input.value) || 0;
        updateManualTable();
        publishInitialScores("manual");
      });
      input.addEventListener("blur", () => {
        if (input.value === "") input.value = "0";
      });
      initialCell.append(input);

      const backgroundCell = document.createElement("td");
      backgroundCell.append(createDistributionModifier(
        ability,
        "背景加值",
        manualBackgroundScores,
        updateManualTable
      ));
      const growthCell = document.createElement("td");
      growthCell.append(createDistributionModifier(
        ability,
        "成长加值",
        manualGrowthScores,
        updateManualTable
      ));

      const gapAfter = document.createElement("td");
      gapAfter.className = "attribute-gap-cell";
      const adjustCell = document.createElement("td");
      adjustCell.className = "attribute-adjust-cell";
      adjustCell.dataset.adjustFor = ability.key;

      tr.append(label, finalCell, gapBefore, initialCell, backgroundCell, growthCell, gapAfter, adjustCell);
      manualBody.append(tr);
    }
    updateManualTable();
  }

  function setMode(mode) {
    currentMode = mode;
    for (const tab of modeTabs) {
      const active = tab.dataset.attributeMode === mode;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    }
    for (const modePanel of modePanels) {
      modePanel.hidden = modePanel.dataset.attributePanel !== mode;
    }
    costPanel.hidden = mode !== "pointbuy";
  }

  for (const tab of modeTabs) {
    tab.addEventListener("click", () => setMode(tab.dataset.attributeMode));
  }

  budgetInput.addEventListener("input", updatePointBuy);

  customCheckbox.addEventListener("change", () => {
    customRules = customCheckbox.checked;
    renderCostTable();
  });

  addLow.addEventListener("click", () => {
    if (!customRules) return;
    const first = sortedRows()[0];
    if (!first) return;
    costRows.push({ score: first.score - 1, cost: 0 });
    renderCostTable();
    rebuildBuyTable();
  });

  addHigh.addEventListener("click", () => {
    if (!customRules) return;
    const rows = sortedRows();
    const last = rows[rows.length - 1];
    if (!last) return;
    costRows.push({ score: last.score + 1, cost: (Number(last.cost) || 0) + 2 });
    renderCostTable();
    rebuildBuyTable();
  });

  costReset.addEventListener("click", () => {
    costRows = defaultCosts.map((row) => ({ ...row }));
    customRules = false;
    customCheckbox.checked = false;
    renderCostTable();
    rebuildBuyTable();
  });

  rollButton.addEventListener("click", () => {
    rolledScores = Array.from({ length: 6 }, roll4d6).sort((a, b) => b - a);
    rolledInitialScores = Object.fromEntries(
      abilityDefs.map((ability, index) => [ability.key, index < rolledScores.length ? String(index) : ""])
    );
    rollResult.textContent = `掷骰结果：${rolledScores.join("、")}`;
    renderRollTable();
    publishInitialScores("roll");
  });

  renderCostTable();
  rebuildBuyTable();
  renderStandardTable();
  renderRollTable();
  renderManualTable();
  setMode("pointbuy");
})();
