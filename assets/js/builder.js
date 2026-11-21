(function () {
    "use strict";

    const adventureTraits = window.AdventureTraits || {};

    const CUSTOM_VALUE = "__custom__";
    const raceSelect = document.getElementById("builder-race");
    const subraceField = document.getElementById("builder-subrace-field");
    const subraceSelect = document.getElementById("builder-subrace");
    const customRaceInput = document.getElementById("builder-race-custom");
    const raceReset = document.getElementById("builder-race-reset");
    const customRaceEditor = document.getElementById("builder-custom-race-editor");
    const customRaceTraits = document.getElementById("builder-custom-race-traits");
    const characterName = document.getElementById("builder-character-name");
    const alignmentSelect = document.getElementById("builder-alignment");
    const classSelect = document.getElementById("builder-class");
    const levelInput = document.getElementById("builder-level");
    const subclassSelect = document.getElementById("builder-subclass");
    const customClassInput = document.getElementById("builder-class-custom");
    const customSubclassInput = document.getElementById("builder-subclass-custom");
    const subclassReset = document.getElementById("builder-subclass-reset");
    const classReset = document.getElementById("builder-class-reset");
    const multiClassAdd = document.getElementById("multi-class-add");
    const multiClassSelect = document.getElementById("builder-multi-class");
    const multiLevelInput = document.getElementById("builder-multi-level");
    const multiSubclassSelect = document.getElementById("builder-multi-subclass");
    const customMultiClassInput = document.getElementById("builder-multi-class-custom");
    const customMultiSubclassInput = document.getElementById("builder-multi-subclass-custom");
    const multiClassReset = document.getElementById("builder-multi-class-reset");
    const customSavePanel = document.getElementById("custom-save-panel");
    const builderPanel = document.getElementById("panel-builder");
    const raceTraitsBox = document.getElementById("builder-race-traits");
    const backgroundSelect = document.getElementById("builder-background");
    const backgroundTraitsBox = document.getElementById("builder-background-traits");
    const customBackgroundEditor = document.getElementById("builder-custom-background-editor");
    const summary = document.getElementById("builder-summary");
    const dstToggle = document.getElementById("dst-toggle");
    const dstBox = document.getElementById("dst-box");
    const dstCommand = document.getElementById("dst-command");
    const dstCopy = document.getElementById("dst-copy");
    const dstHelp = document.getElementById("dst-help");
    const totalLevelOutput = document.getElementById("builder-total-level");
    const pbOutput = document.getElementById("builder-pb");
    const saveProfOutput = document.getElementById("builder-save-prof");
    const abilityTooltip = document.getElementById("ability-tooltip");
    const referenceTooltip = document.getElementById("reference-tooltip");
    const combatHp = document.getElementById("combat-hp");
    const combatHpGrowth = document.getElementById("combat-hp-growth");
    const combatHpGrowthPlus = document.getElementById("combat-hp-growth-plus");
    let hpGrowthAutoValue = null;
    const combatInitiative = document.getElementById("combat-initiative");
    const combatSpellAbility = document.getElementById("combat-spell-ability");
    const combatSpellDc = document.getElementById("combat-spell-dc");
    const combatSpellAttack = document.getElementById("combat-spell-attack");
    const combatAc = document.getElementById("combat-ac");
    const combatPassive = document.getElementById("combat-passive");
    const combatHitDice = document.getElementById("combat-hit-dice");
    const combatInitiativeCorrection = document.getElementById("combat-initiative-correction");
    const combatAcCorrection = document.getElementById("combat-ac-correction");
    const combatPassiveCorrection = document.getElementById("combat-passive-correction");
    const combatSpellDcCorrection = document.getElementById("combat-spell-dc-correction");
    const combatSpellAttackCorrection = document.getElementById("combat-spell-attack-correction");
    const customSaveBlock = document.getElementById("custom-save-block");
    const professionCustomHitDie = document.getElementById("profession-custom-hit-die");
    const combatResistance = document.getElementById("combat-resistance");
    const combatImmunity = document.getElementById("combat-immunity");
    const combatAdvantage = document.getElementById("combat-advantage");
    const combatDarkvision = document.getElementById("combat-darkvision");
    const combatSize = document.getElementById("combat-size");
    const combatSpeed = document.getElementById("combat-speed");
    const featTableBody = document.getElementById("feat-table-body");
    const featAdd = document.getElementById("feat-add");
    const skillTables = document.getElementById("skill-tables");
    const skillSummary = document.getElementById("skill-summary");
    const coreTraitBody = document.getElementById("core-trait-body");
    const coreTraitTitle = document.getElementById("core-trait-title");
    const mainClassFeatureBlock = document.getElementById("main-class-feature-block");
    const mainClassFeatureTitle = document.getElementById("main-class-feature-title");
    const mainClassFeatureText = document.getElementById("main-class-feature-text");
    const mainSubclassFeatureBlock = document.getElementById("main-subclass-feature-block");
    const mainSubclassFeatureTitle = document.getElementById("main-subclass-feature-title");
    const mainSubclassFeatureText = document.getElementById("main-subclass-feature-text");
    const multiClassFeatureBlock = document.getElementById("multi-class-feature-block");
    const multiSubclassFeatureBlock = document.getElementById("multi-subclass-feature-block");
    const multiSubclassFeatureTitle = document.getElementById("multi-subclass-feature-title");
    const multiSubclassFeatureText = document.getElementById("multi-subclass-feature-text");
    const multiClassFeatureTitle = document.getElementById("multi-class-feature-title");
    const multiClassFeatureText = document.getElementById("multi-class-feature-text");
    const equipmentArmorType = document.getElementById("equipment-armor-type");
    const equipmentArmorName = document.getElementById("equipment-armor-name");
    const equipmentArmorCustomName = document.getElementById("equipment-armor-custom-name");
    const equipmentArmorReset = document.getElementById("equipment-armor-reset");
    const equipmentArmorAc = document.getElementById("equipment-armor-ac");
    const equipmentArmorStealth = document.getElementById("equipment-armor-stealth");
    const equipmentShieldAc = document.getElementById("equipment-shield-ac");
    const equipmentShieldEquipped = document.getElementById("equipment-shield-equipped");
    const equipmentWeaponTable = document.querySelector(".equipment-weapon-table");
    const equipmentWeaponBody = equipmentWeaponTable
      ? equipmentWeaponTable.querySelector("tbody")
      : null;
    const magicEquipmentTable = document.querySelector(".magic-equipment-table");
    const magicEquipmentBody = magicEquipmentTable
      ? magicEquipmentTable.querySelector("tbody")
      : null;
    const ledgerBody = document.getElementById("ledger-body");
    const ledgerAdd = document.getElementById("ledger-add");
    const ledgerBalance = document.getElementById("ledger-balance");
    const characterNotes = document.getElementById("character-notes");
    const appearanceImageFrame = document.getElementById("appearance-image-frame");
    const appearanceImage = document.getElementById("appearance-image");
    const appearanceImageImport = document.getElementById("appearance-image-import");
    const appearanceImageFile = document.getElementById("appearance-image-file");
    const appearanceImageRemove = document.getElementById("appearance-image-remove");
    const appearanceImageState = {
      src: "",
      scale: 1,
      offsetX: 0,
      offsetY: 0
    };
    const languageBody = document.getElementById("language-body");
    const languageAdd = document.getElementById("language-add");
    const toolBody = document.getElementById("tool-body");
    const toolAdd = document.getElementById("tool-add");
    const featStyleAdd = document.getElementById("feat-style-add");
    const combatFeatBlock = document.getElementById("combat-feat-block");
    const combatFeatBody = document.getElementById("combat-feat-body");
    const specialAbilityAdd = document.getElementById("special-ability-add");
    const specialAbilityBlock = document.getElementById("special-ability-block");
    const specialAbilityBody = document.getElementById("special-ability-body");
    const spellCasterLabel = document.getElementById("spell-caster-label");
    const spellCasterLevel = document.getElementById("spell-caster-level");
    const spellCantripCount = document.getElementById("spell-cantrip-count");
    const spellPreparedCount = document.getElementById("spell-prepared-count");
    const spellMulticlassNote = document.getElementById("spell-multiclass-note");
    const spellMainClass = document.getElementById("spell-main-class");
    const builderClearData = document.getElementById("builder-clear-data");
    const builderExportJson = document.getElementById("builder-export-json");
    const builderImportJson = document.getElementById("builder-import-json");
    const builderExportPdf = document.getElementById("builder-export-pdf");
    const builderExportPng = document.getElementById("builder-export-png");
    const builderPngMenu = document.getElementById("builder-png-menu");
    const builderExportHtml = document.getElementById("builder-export-html");
    const builderImportFile = document.getElementById("builder-import-file");
    const builderSaveStatus = document.getElementById("builder-save-status");
    const spellCantripGift = document.getElementById("spell-cantrip-gift");
    const spellAlwaysPrepared = document.getElementById("spell-always-prepared");
    const spellGiftSpells = document.getElementById("spell-gift-spells");
    const spellSlotOutputs = Array.from({ length: 9 }, (_, index) =>
      document.getElementById(`spell-slot-${index + 1}`));
    const backpackGearBody = document.getElementById("backpack-gear-body");
    const backpackToolBody = document.getElementById("backpack-tool-body");
    const backpackMagicBody = document.getElementById("backpack-magic-body");
    const backpackGearSection = document.getElementById("backpack-gear-section");
    const backpackToolSection = document.getElementById("backpack-tool-section");
    const backpackMagicSection = document.getElementById("backpack-magic-section");
    const backpackAddGear = document.getElementById("backpack-add-gear");
    const backpackAddTool = document.getElementById("backpack-add-tool");
    const backpackAddMagic = document.getElementById("backpack-add-magic");
    const backpackGearTotalWeight = document.getElementById("backpack-gear-total-weight");
    const backpackGearTotalPrice = document.getElementById("backpack-gear-total-price");
    if (!raceSelect || !subraceField || !subraceSelect || !customRaceInput || !raceReset ||
        !customRaceEditor || !customRaceTraits || !characterName || !alignmentSelect ||
        !classSelect || !levelInput || !subclassSelect || !customClassInput ||
        !customSubclassInput || !subclassReset || !classReset || !multiClassAdd ||
        !multiClassSelect || !multiLevelInput ||
        !multiSubclassSelect || !customMultiClassInput || !customMultiSubclassInput ||
        !multiClassReset || !customSavePanel || !builderPanel || !raceTraitsBox || !backgroundSelect ||
        !backgroundTraitsBox || !customBackgroundEditor ||
        !summary || !totalLevelOutput || !dstToggle || !dstBox || !dstCommand || !dstCopy || !dstHelp ||
        !pbOutput || !saveProfOutput || !abilityTooltip || !referenceTooltip || !combatHp ||
        !combatHpGrowth || !combatHpGrowthPlus || !combatInitiative ||
        !combatSpellAbility || !combatSpellDc || !combatSpellAttack || !combatAc ||
        !combatPassive || !combatHitDice || !combatInitiativeCorrection || !combatAcCorrection ||
        !combatPassiveCorrection || !combatSpellDcCorrection || !combatSpellAttackCorrection ||
        !customSaveBlock || !professionCustomHitDie || !combatResistance || !combatImmunity ||
        !combatAdvantage || !combatDarkvision || !combatSize || !combatSpeed ||
        !featTableBody || !featAdd || !featStyleAdd || !combatFeatBlock ||
        !combatFeatBody || !specialAbilityAdd || !specialAbilityBlock ||
        !specialAbilityBody || !spellCasterLabel || !spellCasterLevel || !spellCantripCount ||
        !spellMulticlassNote ||
        !spellPreparedCount || !spellMainClass || !spellCantripGift ||
        !spellAlwaysPrepared || !spellGiftSpells ||
        !builderClearData || !builderExportJson || !builderImportJson || !builderExportPdf ||
        !builderExportHtml || !builderExportPng || !builderPngMenu ||
        !builderImportFile || !builderSaveStatus ||
        spellSlotOutputs.some((output) => !output) ||
        !backpackGearBody || !backpackToolBody || !backpackMagicBody ||
        !backpackGearSection || !backpackToolSection || !backpackMagicSection ||
        !backpackAddGear || !backpackAddTool || !backpackAddMagic ||
        !backpackGearTotalWeight || !backpackGearTotalPrice ||
        !skillTables || !skillSummary || !coreTraitBody || !coreTraitTitle ||
        !mainClassFeatureBlock || !mainClassFeatureTitle || !mainClassFeatureText ||
        !mainSubclassFeatureBlock || !mainSubclassFeatureTitle || !mainSubclassFeatureText ||
        !multiClassFeatureBlock || !multiClassFeatureTitle || !multiClassFeatureText ||
        !multiSubclassFeatureBlock || !multiSubclassFeatureTitle || !multiSubclassFeatureText ||
        !equipmentArmorType || !equipmentArmorName || !equipmentArmorCustomName ||
        !equipmentArmorReset || !equipmentArmorAc ||
        !equipmentArmorStealth || !equipmentShieldAc || !equipmentShieldEquipped ||
        !equipmentWeaponTable || !equipmentWeaponBody ||
        !magicEquipmentTable || !magicEquipmentBody ||
        !ledgerBody || !ledgerAdd || !ledgerBalance || !characterNotes ||
        !appearanceImageFrame || !appearanceImage || !appearanceImageImport ||
        !appearanceImageFile || !appearanceImageRemove ||
        !languageBody || !languageAdd || !toolBody || !toolAdd) {
      return;
    }

    // Keep the fixed lookup popover outside the zoomed page container.
    // Chrome Android otherwise clips fixed descendants to the zoomed block.
    document.body.append(referenceTooltip);

    const coreClassNames = [
      "野蛮人", "吟游诗人", "牧师", "德鲁伊", "战士", "武僧", "圣武士",
      "游侠", "游荡者", "术士", "魔契师", "法师", "奇械师"
    ];
    const thirdPartyClassNames = ["铳士", "怪物猎人", "拳斗士", "血族"];
    const classNames = [...coreClassNames, ...thirdPartyClassNames];
    let customCoreTraits = {
      ability: "",
      skills: "",
      weapons: "",
      armor: "",
      equipment: ""
    };

    const subclassCatalog = {
      "野蛮人": [
        ["狂战士道途"], ["兽心道途"], ["世界树道途"], ["狂热者道途"],
        ["战狂道途", "SCAG"], ["先祖守卫道途", "XGE"], ["风暴先驱道途", "XGE"],
        ["狂野魔法道途", "TCE"], ["野兽道途", "TCE"], ["巨人道途", "BPGG"]
      ],
      "吟游诗人": [
        ["舞蹈学院"], ["魅心学院"], ["逸闻学院"], ["勇气学院"],
        ["剑舞学院", "XGE"], ["低语学院", "XGE"], ["创造学院", "TCE"],
        ["雄辩学院", "TCE"], ["皓月学院", "FR"], ["精魂学院", "RHW"]
      ],
      "牧师": [
        ["生命领域"], ["光明领域"], ["诡术领域"], ["战争领域"],
        ["自然领域", "PHB14"], ["风暴领域", "PHB14"], ["死亡领域", "DMG14"],
        ["锻造领域", "XGE"], ["秩序领域", "TCE"], ["和平领域", "TCE"],
        ["暮光领域", "TCE"], ["知识领域", "FR"], ["坟墓领域", "RHW"],
        ["奥秘领域", "AU"]
      ],
      "德鲁伊": [
        ["大地结社"], ["月亮结社"], ["海洋结社"], ["星辰结社"],
        ["梦境结社", "XGE"], ["牧人结社", "XGE"], ["孢子结社", "TCE"],
        ["野火结社", "TCE"]
      ],
      "战士": [
        ["战斗大师"], ["勇士"], ["奥法骑士"], ["灵能武士"],
        ["骑兵", "XGE"], ["武士", "XGE"], ["回音骑士", "EGW"],
        ["符文骑士", "TCE"], ["旗将", "FR"], ["魔射手", "AU"]
      ],
      "武僧": [
        ["命流武者"], ["暗影武者"], ["四象武者"], ["散打武者"],
        ["永亡宗", "SCAG"], ["醉拳宗", "XGE"], ["剑圣宗", "XGE"],
        ["日魂宗", "XGE"], ["星我宗", "TCE"], ["神龙宗", "FTD"],
        ["秘术武者", "AU"]
      ],
      "圣武士": [
        ["奉献之誓"], ["荣耀之誓"], ["古贤之誓"], ["复仇之誓"],
        ["破誓者", "DMG14"], ["王冠之誓", "SCAG"], ["征服之誓", "XGE"],
        ["救赎之誓", "XGE"], ["守望之誓", "TCE"], ["巨灵贵族之誓", "FR"]
      ],
      "游侠": [
        ["驯兽师"], ["妖精漫游者"], ["幽域追猎者"], ["猎人"],
        ["边界行者", "XGE"], ["怪物杀手", "XGE"], ["集群牧者", "TCE"],
        ["龙兽守卫", "FTD"], ["凛冬行者", "FR"], ["幽邃戌卫", "RHW"]
      ],
      "游荡者": [
        ["诡术师"], ["刺客"], ["魂刃"], ["盗贼"],
        ["调查员", "XGE"], ["策士", "XGE"], ["斥候", "XGE"],
        ["风流剑客", "XGE"], ["三神门徒", "FR"], ["鬼魅", "RHW"]
      ],
      "术士": [
        ["畸变术法"], ["时械术法"], ["龙族术法"], ["狂野术法"],
        ["神圣之魂", "XGE"], ["风暴术法", "XGE"], ["月之术法", "DSDQ"],
        ["咒火术法", "FR"], ["幽影术法", "RHW"]
      ],
      "魔契师": [
        ["至高妖精宗主"], ["天界宗主"], ["邪魔宗主"], ["旧日支配者宗主"],
        ["不朽者", "SCAG"], ["咒剑", "XGE"], ["深海意志", "TCE"],
        ["巨灵宗主", "TCE"], ["死灵宗主", "RHW"], ["契灵宗主", "AU"]
      ],
      "法师": [
        ["防护师"], ["预言师"], ["塑能师"], ["幻术师"],
        ["战争魔法", "XGE"], ["时间魔法", "EGW"], ["重力魔法", "EGW"],
        ["书士会", "TCE"], ["剑咏者", "FR"], ["咒法师", "AU"],
        ["惑控师", "AU"], ["死灵师", "AU"], ["变化师", "AU"]
      ],
      "奇械师": [
        ["炼金师"], ["装甲师"], ["魔炮师"], ["战地匠师"],
        ["制图师"], ["苏生师", "RHW"]
      ],
      "铳士": [
        ["死眼客"], ["豪赌客"], ["密间客"], ["魔弹客"],
        ["花枪客"], ["白帽客"], ["快枪客"]
      ],
      "怪物猎人": [
        ["刻肉会"], ["吞噬会"], ["秘学会"], ["捕猎会"]
      ],
      "拳斗士": [
        ["犬师拳狩"], ["惧恶之手"], ["怒雷恶氓"], ["街角圣徒"],
        ["方圆擂尊"], ["甜蜜科学"]
      ],
      "血族": [
        ["布鲁赫"], ["冈格罗"], ["勒森魃"], ["诺斯费拉图"],
        ["妥芮朵"], ["梵卓"]
      ]
    };

    const subclassMap = Object.fromEntries(
      Object.entries(subclassCatalog).map(([className, entries]) => [
        className,
        entries.map(([name]) => name)
      ])
    );

    function subclassOptionLabel(name, source) {
      return source ? `${name}(${source})` : name;
    }

    function restoreSubclassOptionLabels(select) {
      for (const option of select.options) {
        if (option.dataset.fullLabel) option.textContent = option.dataset.fullLabel;
      }
    }

    function syncSubclassOptionLabels(select) {
      restoreSubclassOptionLabels(select);
      const selected = select.selectedOptions[0];
      if (selected?.dataset.baseLabel) {
        selected.textContent = selected.dataset.baseLabel;
      }
    }

    function syncAllSubclassOptionLabels() {
      for (const select of builderPanel.querySelectorAll(
        "#builder-subclass, .profession-row-subclass"
      )) {
        syncSubclassOptionLabels(select);
      }
    }

    function termList(names) {
      return names.map((name) => `<b class="term-green">${name}</b>`).join("、");
    }

    const classEnglishNames = {
      "野蛮人": "Barbarian",
      "吟游诗人": "Bard",
      "牧师": "Cleric",
      "德鲁伊": "Druid",
      "战士": "Fighter",
      "武僧": "Monk",
      "圣武士": "Paladin",
      "游侠": "Ranger",
      "游荡者": "Rogue",
      "术士": "Sorcerer",
      "魔契师": "Warlock",
      "法师": "Wizard",
      "奇械师": "Artificer",
      "铳士": "Gunslinger",
      "怪物猎人": "Monster Hunter",
      "拳斗士": "Pugilist",
      "血族": "Kindred"
    };

    const classCoreTraits = {
      "野蛮人": {
        ability: "力量",
        hitDie: "每野蛮人等级D12",
        saves: "力量与体质",
        skillsHtml: `选择2项：${termList(["驯兽", "运动", "威吓", "自然", "察觉", "求生"])}`,
        weapons: "简易和军用武器",
        armor: "轻甲、中甲和盾牌",
        equipment: "选择A或B：（A）巨斧，4把手斧，探索套组以及15GP；或者（B）75GP"
      },
      "吟游诗人": {
        ability: "魅力",
        hitDie: "每吟游诗人等级D8",
        saves: "敏捷与魅力",
        skillsHtml: "任选3项",
        weapons: "简易武器",
        tools: "任选3项乐器",
        armor: "轻甲",
        equipment: "选择A或B：（A）皮甲，2把匕首，你选择的乐器，艺人套组以及19GP；或者（B）90GP"
      },
      "牧师": {
        ability: "感知",
        hitDie: "每牧师等级D8",
        saves: "感知与魅力",
        skillsHtml: `选择2项：${termList(["历史", "洞悉", "医药", "游说", "宗教"])}`,
        weapons: "简易武器",
        armor: "轻甲、中甲和盾牌",
        equipment: "选择A或B：（A）链甲衫，盾牌，硬头锤，圣徽，祭司套组以及7GP；或（B）110GP"
      },
      "德鲁伊": {
        ability: "感知",
        hitDie: "每德鲁伊等级D8",
        saves: "智力与感知",
        skillsHtml: `选择2项：${termList(["奥秘", "驯兽", "洞悉", "医药", "自然", "察觉", "宗教", "求生"])}`,
        weapons: "简易武器",
        tools: "草药工具",
        armor: "轻甲和盾牌",
        equipment: "选择A或B：（A）皮甲，盾牌，镰刀，德鲁伊法器（长棍），探索套组，草药工具以及9GP；或者（B）50GP"
      },
      "战士": {
        ability: "力量或敏捷",
        hitDie: "每战士等级D10",
        saves: "力量与体质",
        skillsHtml: `选择2项：${termList(["特技", "驯兽", "运动", "历史", "洞悉", "威吓", "游说", "察觉", "求生"])}`,
        weapons: "简易和军用武器",
        armor: "轻甲、中甲、重甲和盾牌",
        equipment: "选择A、B或C：（A）链甲，巨剑，链枷，8杆标枪，地城套组以及4GP；或者（B）镶钉皮甲，弯刀，短剑，长弓，20支箭矢，箭袋，地城套组以及11GP；或者（C）155GP"
      },
      "武僧": {
        ability: "敏捷与感知",
        hitDie: "每武僧等级D8",
        saves: "力量与敏捷",
        skillsHtml: `选择2项：${termList(["特技", "运动", "历史", "洞悉", "宗教", "隐匿"])}`,
        weapons: "简易与具有轻型词条的军用武器",
        tools: "选择1种工匠工具或乐器",
        armor: "无",
        equipment: "选择A或B：（A）矛，5把匕首，你在工具熟练中所选择的工匠工具或乐器，探索套组以及11GP；或者（B）50GP"
      },
      "圣武士": {
        ability: "力量与魅力",
        hitDie: "每圣武士等级D10",
        saves: "感知与魅力",
        skillsHtml: `选择2项：${termList(["运动", "洞悉", "威吓", "医疗", "游说", "宗教"])}`,
        weapons: "简易和军用武器",
        armor: "轻甲、中甲、重甲和盾牌",
        equipment: "选择A或B：（A）链甲，盾牌，长剑，6杆标枪，圣徽，祭司套组以及9GP；或者（B）150GP"
      },
      "游侠": {
        ability: "敏捷与感知",
        hitDie: "每游侠等级D10",
        saves: "力量与敏捷",
        skillsHtml: `选择3项：${termList(["驯兽", "运动", "洞悉", "调查", "自然", "察觉", "隐匿", "求生"])}`,
        weapons: "简易和军用武器",
        armor: "轻甲、中甲和盾牌",
        equipment: "选择A或B：（A）镶钉皮甲，弯刀，短剑，长弓，20支箭矢，箭袋，德鲁伊法器（槲寄生枝条），探索套组以及7GP；或者（B）150GP"
      },
      "游荡者": {
        ability: "敏捷",
        hitDie: "每游荡者等级D8",
        saves: "敏捷与智力",
        skillsHtml: `选择4项：${termList(["特技", "运动", "欺瞒", "洞悉", "威吓", "调查", "察觉", "游说", "巧手", "隐匿"])}`,
        weapons: "简易武器和具有灵巧或轻型词条的军用武器",
        tools: "盗贼工具",
        armor: "轻甲",
        equipment: "选择A或B：（A）皮甲，2把匕首，短剑，短弓，20支箭矢，箭袋，盗贼工具，窃贼套组以及8GP；或者（B）100GP"
      },
      "术士": {
        ability: "魅力",
        hitDie: "每术士等级D6",
        saves: "体质与魅力",
        skillsHtml: `选择2项：${termList(["奥秘", "欺瞒", "洞悉", "威吓", "游说", "宗教"])}`,
        weapons: "简易武器",
        armor: "无",
        equipment: "选择A或B：（A）矛，2把匕首，奥术法器（水晶），地城套组以及28 GP；或者（B）50GP"
      },
      "魔契师": {
        ability: "魅力",
        hitDie: "每魔契师等级D8",
        saves: "感知与魅力",
        skillsHtml: `选择2项：${termList(["奥秘", "欺瞒", "历史", "威吓", "调查", "自然"])}或${termList(["宗教"])}`,
        weapons: "简易武器",
        armor: "轻甲",
        equipment: "选择A或B：（A）皮甲，镰刀，2把匕首，奥术法器（法球），书（隐秘学识），学者套组以及15GP；或者（B）100GP"
      },
      "法师": {
        ability: "智力",
        hitDie: "每法师等级D6",
        saves: "智力与感知",
        skillsHtml: `选择2项：${termList(["奥秘", "历史", "洞悉", "调查", "医疗", "自然", "宗教"])}`,
        weapons: "简易武器",
        armor: "无",
        equipment: "选择A或B：（A）2把匕首，奥术法器（长棍），长袍，法术书，学者套组以及5GP；或（B）55GP"
      },
      "奇械师": {
        ability: "智力",
        hitDie: "每奇械师等级D8",
        saves: "体质与智力",
        skillsHtml: `选择2项：${termList(["奥秘", "历史", "调查", "医药", "自然", "察觉", "巧手"])}`,
        weapons: "简易武器",
        tools: "盗贼工具，修补工具，以及一种你选择的工匠工具",
        armor: "轻甲，中甲和盾牌",
        equipment: "选择A或B：（A）镶钉皮甲，匕首，盗贼工具，修补工具，地城套组，和16GP；或（B）150GP"
      },
      "铳士": {
        ability: "敏捷",
        hitDie: "每铳士等级D8",
        saves: "敏捷与魅力",
        skillsHtml: "选择2项：特技、驯兽、运动、欺瞒、洞悉、威吓、察觉、游说、巧手和隐匿",
        weapons: "简易武器和军用远程武器",
        armor: "轻甲",
        equipment: "选择A或B：（A）皮甲，4把匕首，左轮枪，50发子弹，探索套组以及11GP；或者（B）175GP"
      },
      "怪物猎人": {
        ability: "力量或敏捷，智力",
        hitDie: "每怪物猎人等级D10",
        saves: "敏捷与智力",
        skillsHtml: "选择3项：运动、历史、调查、医药、自然、察觉、宗教和求生",
        weapons: "简易和军用武器",
        armor: "轻甲、中甲和盾牌",
        equipment: "选择A、B或C：（A）鳞甲，长剑，轻弩，20支弩矢，探索套组以及5GP；（B）镶钉皮甲，弯刀，短剑，长弓，20支箭矢，箭袋，探索套组以及10GP；或者（C）160GP"
      },
      "拳斗士": {
        ability: "力量",
        hitDie: "每拳斗士等级D10",
        saves: "力量与体质",
        skillsHtml: "选择2项：特技、运动、欺瞒、威吓、察觉、巧手或隐匿",
        weapons: "简易和临时武器",
        tools: "任选1项赌具",
        armor: "轻甲",
        equipment: "选择A或B：（A）短棒，手斧，赌具（与上述工具熟练的种类相同），地城套组以及31GP；或者（B）50GP"
      },
      "血族": {
        ability: "魅力",
        hitDie: "每血族等级D10",
        saves: "体质与魅力",
        skillsHtml: "选择2项：运动、欺瞒、历史、威吓、察觉、游说、求生、隐匿",
        weapons: "简易武器和具有轻型词条的军用武器",
        armor: "轻甲和胸甲",
        equipment: "选择A或B：（A）皮甲，2把匕首，短剑，你选择的工匠工具，探索套组以及15GP；或者（B）75GP"
      }
    };

    const saveMap = {
      "野蛮人": ["力量", "体质"],
      "吟游诗人": ["敏捷", "魅力"],
      "牧师": ["感知", "魅力"],
      "德鲁伊": ["智力", "感知"],
      "战士": ["力量", "体质"],
      "武僧": ["力量", "敏捷"],
      "圣武士": ["感知", "魅力"],
      "游侠": ["力量", "敏捷"],
      "游荡者": ["敏捷", "智力"],
      "术士": ["体质", "魅力"],
      "魔契师": ["感知", "魅力"],
      "法师": ["智力", "感知"],
      "奇械师": ["体质", "智力"],
      "铳士": ["敏捷", "魅力"],
      "怪物猎人": ["敏捷", "智力"],
      "拳斗士": ["力量", "体质"],
      "血族": ["体质", "魅力"]
    };

    const abilityRows = [
      { key: "str", name: "力量" },
      { key: "dex", name: "敏捷" },
      { key: "con", name: "体质" },
      { key: "int", name: "智力" },
      { key: "wis", name: "感知" },
      { key: "cha", name: "魅力" }
    ];

    const saveState = new Set();

    const hitDieMap = {
      "野蛮人": 12,
      "战士": 10,
      "圣武士": 10,
      "游侠": 10,
      "吟游诗人": 8,
      "牧师": 8,
      "德鲁伊": 8,
      "武僧": 8,
      "游荡者": 8,
      "魔契师": 8,
      "奇械师": 8,
      "铳士": 8,
      "怪物猎人": 10,
      "拳斗士": 10,
      "血族": 10,
      "术士": 6,
      "法师": 6
    };

    const raceCombatDefaults = {
      "阿斯莫": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "光耀、暗蚀", immunity: "", advantage: "" },
      "龙裔": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "矮人": { darkvision: "120尺", size: "中型", speed: "30尺", resistance: "毒素", immunity: "", advantage: "中毒" },
      "精灵": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "侏儒": { darkvision: "60尺", size: "小型", speed: "30尺", resistance: "", immunity: "", advantage: "智力、感知、魅力豁免" },
      "歌利亚": { darkvision: "—", size: "中型", speed: "35尺", resistance: "", immunity: "", advantage: "" },
      "半身人": { darkvision: "—", size: "小型", speed: "30尺", resistance: "", immunity: "", advantage: "恐慌" },
      "人类": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "兽人": { darkvision: "120尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "提夫林": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "枭人": { darkvision: "120尺", size: "中型或小型", speed: "30尺，飞行30尺", resistance: "", immunity: "", advantage: "" },
      "鸟羽人": { darkvision: "—", size: "中型", speed: "30尺，飞行30尺", resistance: "", immunity: "", advantage: "" },
      "熊地精": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "人马": { darkvision: "—", size: "中型", speed: "40尺", resistance: "", immunity: "", advantage: "" },
      "地底侏儒": { darkvision: "60尺", size: "小型", speed: "30尺", resistance: "", immunity: "", advantage: "智力、感知、魅力豁免" },
      "灰矮人": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "毒素", immunity: "", advantage: "中毒、魅惑、震慑" },
      "雅灵": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "仙灵": { darkvision: "—", size: "小型", speed: "30尺，飞行30尺", resistance: "", immunity: "", advantage: "" },
      "费尔伯格人": { darkvision: "—", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "元素裔": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "吉斯洋基人": { darkvision: "—", size: "中型", speed: "30尺", resistance: "心灵", immunity: "", advantage: "" },
      "吉斯泽莱人": { darkvision: "—", size: "中型", speed: "30尺", resistance: "心灵", immunity: "", advantage: "魅惑、恐慌" },
      "地精": { darkvision: "60尺", size: "小型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "兔人": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "大地精": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "天狗": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "狗头人": { darkvision: "60尺", size: "小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "蜥蜴人": { darkvision: "—", size: "中型", speed: "30尺，游泳30尺", resistance: "", immunity: "", advantage: "" },
      "牛头人": { darkvision: "—", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "半羊人": { darkvision: "—", size: "中型", speed: "35尺", resistance: "", immunity: "", advantage: "法术豁免" },
      "海精灵": { darkvision: "60尺", size: "中型", speed: "30尺，游泳30尺", resistance: "寒冷", immunity: "", advantage: "魅惑" },
      "影灵": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "暗蚀", immunity: "", advantage: "魅惑" },
      "斑猫人": { darkvision: "60尺", size: "中型或小型", speed: "30尺，攀爬30尺", resistance: "", immunity: "", advantage: "" },
      "龟人": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "力量豁免、体质豁免（龟壳防御）" },
      "梭螺鱼人": { darkvision: "60尺", size: "中型", speed: "30尺，游泳30尺", resistance: "寒冷", immunity: "", advantage: "" },
      "蛇人": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "毒素", immunity: "", advantage: "法术豁免、中毒" },
      "星界精灵": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "自动侏儒": { darkvision: "—", size: "小型", speed: "30尺", resistance: "毒素", immunity: "疾病", advantage: "麻痹、中毒" },
      "诘弗人": { darkvision: "—", size: "中型", speed: "30尺，游泳30尺", resistance: "", immunity: "", advantage: "力量检定、力量豁免" },
      "鼯猴人": { darkvision: "—", size: "中型或小型", speed: "30尺，攀爬30尺", resistance: "", immunity: "", advantage: "" },
      "流浆体": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "强酸、毒素", immunity: "", advantage: "中毒" },
      "螳螂人": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "精灵-洛温/影原血系": { darkvision: "60尺", size: "中型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "洁英": { darkvision: "120尺", size: "小型", speed: "30尺", resistance: "", immunity: "", advantage: "恐慌" },
      "洛温幻身灵": { darkvision: "120尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "霜身": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "寒冷", immunity: "", advantage: "" },
      "幻身灵": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "离梦人": { darkvision: "—", size: "中型", speed: "30尺", resistance: "心灵", immunity: "", advantage: "感知、魅力豁免" },
      "科拉瓦": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "魅惑" },
      "化兽者": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "战俑": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "毒素", immunity: "疾病", advantage: "中毒" },
      "半血裔": { darkvision: "60尺", size: "中型或小型", speed: "35尺", resistance: "暗蚀", immunity: "", advantage: "" },
      "巫咒之子": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "人狼裔": { darkvision: "60尺", size: "中型或小型", speed: "30尺", resistance: "", immunity: "", advantage: "" },
      "复生者": { darkvision: "—", size: "中型或小型", speed: "30尺", resistance: "寒冷、暗蚀、毒素（任选）", immunity: "", advantage: "死亡豁免" }
    };

    const raceCombatSubraceDefaults = {
      "狗头人": {
        "逆反": { advantage: "恐慌" }
      },
      "元素裔": {
        "气元素裔": { speed: "35尺", resistance: "闪电" },
        "土元素裔": { speed: "30尺" },
        "火元素裔": { speed: "30尺", resistance: "火焰" },
        "水元素裔": { speed: "30尺，游泳30尺", resistance: "强酸" }
      },
      "精灵-洛温/影原血系": {
        "洛温精灵": {},
        "影原精灵": { darkvision: "120尺" }
      }
    };

    const tieflingResistance = {
      "深渊": "毒素",
      "幽冥": "暗蚀",
      "炼狱": "火焰"
    };

    const spellAbilityMap = {
      "吟游诗人": "cha",
      "牧师": "wis",
      "德鲁伊": "wis",
      "圣武士": "cha",
      "游侠": "wis",
      "术士": "cha",
      "魔契师": "cha",
      "法师": "int",
      "奇械师": "int"
    };

    const combatBase = {
      initiative: null,
      ac: null,
      passive: null,
      dc: null,
      attack: null
    };

    const combatBaseManual = {
      initiative: false,
      ac: false,
      passive: false,
      dc: false,
      attack: false
    };

    const combatManual = { hp: false };

    const subraceMap = {
      "龙裔": ["黑龙（强酸）", "蓝龙（闪电）", "黄铜龙（火焰）", "青铜龙（闪电）", "赤铜龙（强酸）", "金龙（火焰）", "绿龙（毒素）", "红龙（火焰）", "银龙（寒冷）", "白龙（寒冷）"],
      "提夫林": ["深渊", "幽冥", "炼狱"],
      "歌利亚": ["云巨人", "火巨人", "霜巨人", "山丘巨人", "石巨人", "风暴巨人"],
      "精灵": ["卓尔", "高等精灵", "木精灵"],
      "侏儒": ["森林侏儒", "岩石侏儒"],
      "狗头人": ["机智", "逆反", "龙术"],
      "元素裔": ["气元素裔", "土元素裔", "火元素裔", "水元素裔"],
      "精灵-洛温/影原血系": ["洛温精灵", "影原精灵"]
    };

    const raceTraits = {
"阿斯莫": `<b class="maroon">阿斯莫特质 Aasimar Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高），在选取该种族时选择<br>
<b>速度：</b>30尺<br><br>
作为阿斯莫，你有以下特殊特质：<br>
<b>天界抗性 Celestial Resistance。</b>你具有光耀伤害与暗蚀伤害的抗性。<br>
<b>黑暗视觉 Darkvision。</b>你拥有60尺黑暗视觉。<br>
<b>治愈之手 Healing Hands。</b>以一个魔法动作，你触碰一个生物，并掷数量等于你熟练加值枚d4。该生物恢复等于掷骰结果之和的生命值。使用此特质后，直到你完成一次长休为止都不能再次使用。<br>
<b>光辉掌者 Light Bearer。</b>你习得<b class="spell">光亮术 Light</b>戏法。其施法属性为魅力。<br>
<b>天启 Celestial Revelation。</b>当你到达3级时，你将获得用附赠动作进行变身的能力。每次使用此能力时，选择下列变身选项之一。你的变身会持续1分钟，你也可以主动提前终止它（无需动作）。使用此能力变身之后，直到你完成一次长休为止都不能再次使用此能力。<br>
在变身期间，每个你的回合一次，当你以攻击或法术对一个目标造成伤害时，你可以对其额外造成等同于你熟练加值的伤害，其伤害类型取决于你选择的选项，选择死灵环绕则该伤害为暗蚀，选择天堂飞翼或内耀辉光则该伤害为光耀伤害。<br>
变身选项如下：<ul>
<li><b>天堂飞翼 Heavenly Wings。</b>你的后背暂时伸出两片灵体飞翼。直到变身结束前，你获得等于你速度的飞行速度。</li>
<li><b>内耀辉光 Inner Radiance。</b>你的双眼与嘴巴暂时放出灼热的光芒。持续时间内，你散发出10尺明亮光照与其外10尺的微光光照。在你每个回合结束时，位于你10尺内的每个生物都会受到等于你熟练加值的光耀伤害。</li>
<li><b>死灵环绕 Necrotic Shroud。</b>你的双目暂时变得如同黑暗深潭一般，无法飞行的双翼从你的背上涌出。除你盟友外，任何在你10尺内可以看见你的生物都必须通过一次魅力豁免检定（DC=8+你的熟练加值+你的魅力调整值），否则将会陷入恐慌状态，持续至你的下一回合结束。</li>
</ul>`,
"龙裔": `<b class="maroon">龙裔特质 Dragonborn Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约5-7尺高）<br>
<b>速度：</b>30尺<br><br>
作为龙裔，你有以下特殊特质：<br>
<b>龙族血统 Draconic Ancestry。</b>你的血脉可以追溯到某种巨龙祖先。从下列龙种中选择其一，其会决定你的吐息武器、伤害抗性与外表：黑（强酸）、蓝（闪电）、黄铜（火焰）、青铜（闪电）、赤铜（强酸）、金（火焰）、绿（毒素）、红（火焰）、银（寒冷）、白（寒冷）。<br>
<b>吐息武器 Breath Weapon。</b>每当你在自己回合内进行攻击动作时，你可以将其中一次攻击替换为释放魔法性的能量，覆盖15尺锥状区域或30尺长、5尺宽的线状区域（每次吐息时选择其范围）。区域内的生物必须进行一次敏捷豁免检定（DC=8+你的体质调整值+你的熟练加值）。豁免失败的生物受到1d10伤害，伤害类型为你龙族血统所选龙种对应的类型；豁免成功的生物只受到一半伤害。此伤害会在你达到5级（2d10）、11级（3d10）和17级（4d10）时各提升1d10。你可以使用此吐息武器的次数等于你的熟练加值，完成一次长休后，你重获全部已消耗的使用次数。<br>
<b>伤害抗性 Damage Resistance。</b>根据你龙族血统所选龙种，你获得对应伤害类型的抗性。<br>
<b>黑暗视觉 Darkvision。</b>你拥有60尺黑暗视觉。<br>
<b>龙族飞翼 Draconic Flight。</b>到达5级后，你可以引导体内龙之魔法的能力，让自己暂时获得飞行能力。以一个附赠动作，你的后背临时伸出两片灵体飞翼，持续10分钟，陷入失能状态时或你主动收起它时（无需动作）它将提前消失。飞翼存在期间，你获得等于你速度的飞行速度。你的翅膀看起来像是和你吐息武器相同的能量凝聚而成。使用此特质后，直到你完成一次长休为止你都不能再次使用它。`,
"矮人": `<b class="maroon">矮人特质 Dwarf Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-5尺高）<br>
<b>速度：</b>30尺<br><br>
作为矮人，你有以下特殊特质：<br>
<b>黑暗视觉 Darkvision。</b>你拥有120尺黑暗视觉。<br>
<b>矮人体魄 Dwarven Resilience。</b>你具有毒素伤害的抗性。此外，你为避免或结束中毒状态所做的豁免检定具有优势。<br>
<b>矮人刚毅 Dwarven Toughness。</b>你的生命值上限加1，且此后每次升级时再加1。<br>
<b>石中精妙 Stonecunning。</b>以一个附赠动作，你获得60尺震颤感知，持续10分钟。你必须位于岩石表面上或是触碰着岩石的表面才能使用此震颤感知，不过其可以是天然的岩石，也可以是加工过的岩石。你可以使用此附赠动作的次数等于你的熟练加值，完成长休后你重获全部已消耗的使用次数。`,
"精灵": `<b class="maroon">精灵特质 Elf Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约5-6尺高）<br>
<b>速度：</b>30尺<br><br>
作为精灵，你有以下特殊特质：<br>
<b>黑暗视觉 Darkvision。</b>你拥有60尺黑暗视觉。<br>
<b>精灵血系 Elven Lineage。</b>你属于一支精灵血系，并因此获得了超自然能力。从下列血系中选择其一，你获得该血系的1级好处。当你到达3级和5级时，你分别习得一道更高级的法术；你时刻准备着这道习得的法术，且可以不消耗法术位施展此法术一次，当你完成一次长休时，你重获施展该道法术的能力。你也可以用任何你拥有的相应环阶法术位施展该道法术。当你选择血系时，选择智力、感知或魅力之一，该属性即是你用此特质施展法术时的施法属性。<ul>
<li><b>卓尔 Drow。</b>你的黑暗视觉提升至120尺。你习得戏法<b class="spell">舞光术 Dancing Lights</b>；3级习得<b class="spell">妖火 Faerie Fire</b>；5级习得<b class="spell">黑暗术 Darkness</b>。</li>
<li><b>高等精灵 High Elf。</b>你知晓戏法<b class="spell">魔法伎俩 Prestidigitation</b>，每当你完成长休时，你可以将它替换为另一道戏法；3级习得<b class="spell">侦测魔法 Detect Magic</b>；5级习得<b class="spell">迷踪步 Misty Step</b>。</li>
<li><b>木精灵 Wood Elf。</b>你的速度提升至35尺。你知晓戏法<b class="spell">德鲁伊伎俩 Druidcraft</b>；3级习得<b class="spell">大步奔行 Longstrider</b>；5级习得<b class="spell">行动无踪 Pass without Trace</b>。</li>
</ul>
<b>精类祖先 Fey Ancestry。</b>你在为避免或结束魅惑状态所做的豁免检定中具有优势。<br>
<b>敏锐感官 Keen Senses。</b>你获得洞察、察觉或生存中一个技能的熟练。<br>
<b>出神 Trance。</b>你不需要睡眠，且魔法无法使你入睡。你可以花费4小时进行出神冥想来完成一次长休，在此期间你保持意识。`,
"侏儒": `<b class="maroon">侏儒特质 Gnome Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>小型（约3-4尺高）<br>
<b>速度：</b>30尺<br><br>
作为侏儒，你有以下特殊特质：<br>
<b>黑暗视觉 Darkvision。</b>你拥有60尺黑暗视觉。<br>
<b>侏儒狡黠 Gnomish Cunning。</b>你进行的智力、感知、魅力豁免检定均具有优势。<br>
<b>侏儒血系 Gnomish Lineage。</b>你属于一支侏儒血系，并因此获得了超自然能力。选择以下选项之一；无论你选择哪一个，智力、感知或魅力是你使用此特性施展法术的施法属性（在选择血系时选择）：<ul>
<li><b>森林侏儒 Forest Gnome。</b>你知晓<b class="spell">次级幻象 Minor Illusion</b>戏法。你也始终准备着<b class="spell">动物交谈 Speak with Animals</b>法术，你可以不消耗法术位施展此法术，次数等于你的熟练加值，完成长休后，你重获全部已消耗的使用次数。你也可以用任何你拥有的法术位施展那道法术。</li>
<li><b>岩石侏儒 Rock Gnome。</b>你知晓<b class="spell">修复术 Mending</b>和<b class="spell">魔法伎俩 Prestidigitation</b>这两道戏法。此外，你可以花费10分钟时间，通过施展<b class="spell">魔法伎俩 Prestidigitation</b>法术来创造一个微型发条装置（AC为5，HP为1），比如一件玩具、一个打火机、一个音乐盒。当你创造这个设备时，你可以从该戏法中选择一个效果来决定它的功能；你与其他生物可以使用附赠动作触碰该装置来激活它，此时该装置就会产生对应的效果。如果选择的效果存在选项，则在创建时选择其中一项应用。例如，如果你选择了法术中的那个点燃与熄灭的效果，你就需要决定设备是用来点火还是熄火的——一台设备无法同时做到两个功能。你同时最多拥有三台这样的装置，每一个都会在被创造出来的8小时后解体消失。你也可以用动作，触摸你的一台设备将其拆除。</li>
</ul>`,
"歌利亚": `<b class="maroon">歌利亚特质 Goliath Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约7-8尺高）<br>
<b>速度：</b>35尺<br><br>
作为歌利亚，你有以下特殊特质：<br>
<b>巨人先祖 Giant Ancestry。</b>你是巨人的后裔。选择以下好处之一——它们是来自你祖先的超自然恩惠；你可以使用所选恩惠的次数等于你的熟练加值，完成长休后，你重获全部已消耗的使用次数。<ul>
<li><b>云之远迹（云巨人） Cloud's Jaunt。</b>以一个附赠动作，你可以魔法性地传送到30尺内一处你可见的未占据空间中。</li>
<li><b>火之燃烧（火巨人） Fire's Burn。</b>当你以攻击检定击中目标并对其造成伤害时，你可以对该目标额外造成1d10火焰伤害。</li>
<li><b>霜之刺骨（霜巨人） Frost's Chill。</b>当你以攻击检定击中目标并对其造成伤害时，你可以对该目标额外造成1d6寒冷伤害，并使其速度降低10尺，持续至你的下一回合开始。</li>
<li><b>山之翻撞（山丘巨人） Hill's Tumble。</b>当你以攻击检定击中一个体型不超过大型的生物并对其造成伤害时，你可以令其陷入倒地状态。</li>
<li><b>石之坚韧（石巨人） Stone's Endurance。</b>当你受到伤害时，你可以用反应掷一枚1d12。此次所受伤害减少掷骰结果+你的体质调整值点。</li>
<li><b>岚之暴鸣（风暴巨人） Storm's Thunder。</b>当你被你60尺内的生物造成伤害时，你可以使用反应对该生物造成1d8雷鸣伤害。</li>
</ul>
<b>大型形态 Large Form。</b>从第5级开始，你可以用附赠动作将自己体型变为大型（只要你所处的空间大小足够）。转变持续10分钟，或者直到你主动结束（无需动作）。在这段时间内，你进行的力量检定具有优势，你的速度增加10尺。使用此特质后，直到你完成一次长休为止你都不能再次使用它。<br>
<b>强壮体格 Powerful Build。</b>你在为结束被擒抱状态而进行的任何属性检定中具有优势。此外，你在确定负重能力时视为大一个体型。`,
"半身人": `<b class="maroon">半身人特质 Halfling Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>小型（约2-3尺高）<br>
<b>速度：</b>30尺<br><br>
作为半身人，你有以下特殊特质：<br>
<b>勇气 Brave。</b>你在为避免或结束恐慌状态而进行的豁免检定中具有优势。<br>
<b>半身人灵巧 Halfling Nimbleness。</b>你可以穿越任何体型比你大的生物所在空间，但你不能在其内停下。<br>
<b>幸运 Luck。</b>当你在D20检定中的d20掷出1时，你可以重新掷骰，但你必须使用重骰的结果。<br>
<b>天生善匿 Naturally Stealthy。</b>在有体型至少比你大1级的生物遮蔽你的情况下，你也可以执行躲藏动作。`,
"人类": `<b class="maroon">人类特质 Human Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高）<br>
<b>速度：</b>30尺<br><br>
作为人类，你有以下特殊特质：<br>
<b>适应力 Resourceful。</b>每当你完成长休时，你获得英雄激励。<br>
<b>娴熟 Skillful。</b>你自选一个技能并获得其熟练。<br>
<b>多用 Versatile。</b>你获得一项自选的起源专长。`,
"兽人": `<b class="maroon">兽人特质 Orc Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约6-7尺高）<br>
<b>速度：</b>30尺<br><br>
作为兽人，你有以下特殊特质：<br>
<b>激昂冲锋 Adrenaline Rush。</b>你能以一个附赠动作执行疾走动作。而当你这么做时，你还会获得等同于你熟练加值的临时生命值。你可以使用此特质次数等于你的熟练加值，完成短休或长休时，你重获全部已消耗的使用次数。<br>
<b>黑暗视觉 Darkvision。</b>你拥有120尺黑暗视觉。<br>
<b>坚韧不屈 Relentless Endurance。</b>当你生命值降至0而没有立即死亡时，可以改为使生命值降至1。此特质一经使用，直至完成长休你都无法再次使用。`,
"提夫林": `<b class="maroon">提夫林特质 Tiefling Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约3-4尺高）<br>
<b>速度：</b>30尺<br><br>
作为提夫林，你有以下特殊特质：<br>
<b>黑暗视觉 Darkvision。</b>你拥有60尺黑暗视觉。<br>
<b>邪魔遗赠 Fiendish Legacy。</b>你承载着一份给予了你超自然能力的邪魔遗赠。从下列遗赠中选择其一，你获得该遗赠的1级好处。当你到达3级和5级时，你分别学会一道更高级的法术；你时刻准备着这道习得的法术，且可以不消耗法术位施展此法术一次，当你完成一次长休时，你重获施展该道法术的能力。你也可以用任何你拥有的相应环阶法术位施展该道法术。选择遗赠时，选择智力、感知或魅力之一，该属性即是你用此特质施展法术时的施法属性。<ul>
<li><b>深渊 Abyssal。</b>你获得对毒素伤害的抗性。你习得戏法<b class="spell">毒气喷涌 Poison Spray</b>；3级习得<b class="spell">致病射线 Ray of Sickness</b>；5级习得<b class="spell">定身类人 Hold Person</b>。</li>
<li><b>幽冥 Chthonic。</b>你获得对暗蚀伤害的抗性。你习得戏法<b class="spell">颤栗之触 Chill Touch</b>；3级习得<b class="spell">虚假生命 False Life</b>；5级习得<b class="spell">衰弱射线 Ray of Enfeeblement</b>。</li>
<li><b>炼狱 Infernal。</b>你获得对火焰伤害的抗性。你习得戏法<b class="spell">火焰箭 Fire Bolt</b>；3级习得<b class="spell">炼狱叱喝 Hellish Rebuke</b>；5级习得<b class="spell">黑暗术 Darkness</b>。</li>
</ul>
<b>异界存在 Otherworldly Presence。</b>你习得<b class="spell">奇术 Thaumaturgy</b>戏法。以该特质施展此法术时，使用的施法属性与你邪魔遗赠特质相同。`,
"枭人": `
<b class="maroon">枭人特质 Owlin Traits</b><br><br>
<b>生物类型：</b>你是类人生物。<br>
<b>体型：</b>你的体型为中型或小型。当你选择该种族的时候进行决定。<br>
<b>速度：</b>你的步行速度为30尺。<br>
<b>黑暗视觉。</b>在微光光照下，你身边120尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>飞行。</b>得益于你的翅膀，你拥有等同于你步行速度的飞行速度。当你穿着中甲或重甲时，你无法使用该飞行速度。<br>
<b>无声羽毛。</b>你拥有隐匿技能的熟练项。`,
"鸟羽人": `
<b class="maroon">鸟羽人特质 Aarakocra Traits</b><br>
作为一位鸟羽人，你拥有以下角色特质：<br>
<b> 生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型是中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>飞行Flight。</b>因为你的双翼，你拥有等同于你步行速度的飞行速度。如果你穿戴中甲和重甲，则你不能使用此飞行速度。<br>
<b>禽爪Talons。</b>你可以使用你的禽爪进行徒手打击。当你使用它们命中时，这次徒手打击会造成1d6+你力量调整值的挥砍伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>呼风者Wind Caller。</b>从3级开始，你可以施展<b class="spell">造风术Gust of Wind</b>，且无需材料成分。一旦你使用了该特质施展法术，直到完成一次长休前你不能再次使用。你也可以使用你拥有的2环或更高的法术位施展该法术。<br>当你使用该特质施展<b class="spell">造风术</b>时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。`,
"熊地精": `
<b class="maroon">熊地精特质 Bugbear Traits</b><br>
作为一位熊地精，你拥有以下角色特质：<br>
<b>生物种类 Creature Type。</b>你是类人生物。对于任何需要你是类地精的先决条件或效果而言，你也被视作一个类地精。<br>
<b>体型 Size。</b>你的体型是中型。<br>
<b>速度 Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉 Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>妖精血统Fey Ancestry。</b>你为避免或结束魅惑状态所作的豁免检定具有优势。<br>
<b>长肢Long-Limbed。</b>当你在你的回合使用近战攻击时，你的触及范围比通常范围多5尺。<br>
<b>身强力壮Powerful Build。</b>在决定你的载重、和你可以推、拉及抬的重量时，你视作为体型大一级的生物。<br>
<b>隐秘Sneaky。</b>你获得隐匿技能的熟练项。此外，你可以无需跻身地在仅够容纳小型生物的空间穿行与停留。<br>
<b>突袭攻击Surprise Attack。</b>如果你的攻击检定命中了一个战斗开始后还没开始过自己回合的生物，该生物受到额外2d6的伤害。`,
"人马": `
<b class="maroon">人马特质 Centaur Traits</b><br>
作为一位人马，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是妖精生物。<br>
<b>体型Size。</b>你的体型是中型。<br>
<b>速度Speed。</b>你的步行速度为40尺。<br>
<b>冲锋Charge。</b>如果你向着目标直线移动了至少30尺，并在同一轮内以近战武器攻击命中了目标，你可以在此攻击后立即使用附赠动作，用你的蹄击对目标进行一次攻击。<br>
<b>蹄击Hooves。</b>你可以用你的马蹄来进行徒手打击。当你使用蹄击命中时，将造成1d6+力量调整值的钝击伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>马体构造Equine Build。</b>在决定你的载重、和你可以推、和拉的重量时，你视作为体型大一级的生物。<br>另外，因为你的马腿，任何需要手脚并用的攀爬对你而言尤其困难。当你进行攀爬时，每移动1尺需要花费额外4尺移动力，而非往常的额外1尺。<br>
<b>自然亲和Natural Affinity。</b>你的妖精血统连接着自然，这给予了你与自然界与其中的动物有着一种直觉上的联系。因此，你拥有以下一项自选技能的熟练项：驯兽、医药、自然、生存。`,
"地底侏儒": `
<b class="maroon">地底侏儒特质 Deep Gnome Traits</b><br>
作为一位地底侏儒，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。对于任何需要你是侏儒的先决条件或效果而言，你也被视作一个侏儒。<br>
<b>体型Size。</b>你的体型为小型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>斯涅布力赠礼Gift of the Svirfneblin。</b>从3级开始，你可以使用该特质施展<b class="spell">易容术Disguise Self</b>。从5级开始，你同样可以使用该特质施展<b class="spell">回避侦测Nondetection</b>，且无需材料成分。一旦你使用了该特质施展了这些法术中的任何一个，直到完成一次长休前，你不能再次使用该特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用此特质施展法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br>
<b>侏儒魔法抗性Gnomish Magic Resistance。</b>你为对抗法术所做的智力、感知、魅力豁免具有优势。<br>
<b>斯涅布力伪装Svirfneblin Camouflage。</b>当你进行敏捷（隐匿）检定时，你可以使该次检定具有优势。你可以使用此特质的次数等于你的熟练加值，当你完成一次长休后，你重新获得所有消耗的次数。`,
"灰矮人": `
<b class="maroon">灰矮人特质 Duergar Traits</b><br>作为一位灰矮人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。对于任何需要你是矮人的先决条件或效果而言，你也被视作一个矮人。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>灰矮人魔法Duergar Magic。</b>从3级开始，你可以使用该特质对你自己施展<b class="spell">变巨术/缩小术 Enlarge/reduce</b>，且无需材料成分。从5级开始，你同样可以使用该特质对你自己施展<b class="spell">隐形术Invisibility</b>，且无需材料成分。一旦你使用了该特质施展了这些法术中的任何一个，直到完成一次长休前，你不能再次使用该特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用此特质施展法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br>
<b>矮人抗性Dwarven Resilience。</b>你为避免或结束中毒状态所作的豁免检定具有优势。你同样具有毒素伤害的抗性。<br>
<b>灵能坚韧Psionic Fortitude。</b>你为避免或结束魅惑和震慑状态所作的豁免检定具有优势。`,
"雅灵": `
<b class="maroon">雅灵特质 Eladrin Traits</b><br>
作为一位雅灵，你拥有以下角色特质：<br>
<b> 生物种类Creature Type。</b>你是类人生物。对于任何需要你是精灵的先决条件或效果而言，你也被视作一个精灵。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>妖精血统Fey Ancestry。</b>你在为自己避免或结束魅惑状态的豁免检定时具有优势。<br>
<b>妖精步Fey Step。</b>用一个附赠动作，你可以魔法地传送到一处30尺内且未被占据的可见空间。你可以使用该特质的次数等于你的熟练加值，当你完成一次长休后，你重新获得所有消耗的次数。<br>当你到达3级时，你的妖精步会根据你的季节获得额外的效果；如果该效果需要进行一次豁免，该DC等于8+你的熟练加值+你的智力，感知或魅力调整值（当你选择该种族时进行决定）： <br><ul>
<li><b>秋Autumn。</b>在你使用妖精步后，立即选择至多两个10尺内的可见生物，这些生物必须进行一次感知豁免，如果豁免失败则被你魅惑1分钟，或者直到你或你的同伴对他做出伤害行为为止。</li>
<li><b>冬Winter。</b>在你使用妖精步时，选择传送前位于你5尺内的一个可见生物，这个生物必须进行一次感知豁免，如果失败则对你陷入恐慌，该效应持续至你的下一回合结束。</li>
<li><b>春Spring。</b>在你使用妖精步时，你碰触5尺内的一个自愿的生物。这个生物代替你进行传送，出现在你选择的一处在你30尺范围内且未被占据的可见空间。</li>
<li><b>夏Summer。</b>在你使用妖精步后，立即选择的5尺范围内的每个可见生物，它们将受到等同于你熟练加值的火焰伤害。</li>
</ul>
<b>敏锐感官Keen Senses。</b>你拥有察觉技能的熟练项。<br>
<b>出神Trance。</b>你不需要睡眠，并且不会因魔法效应而陷入睡眠。你能够以4小时的时间完成长休，前提是如果你将这些时间花在一次出神冥想中，在此期间你保留意识。<br>每当你结束冥想时，你可以改变你的季节，并能够获得两项你未拥有的熟练，其中每一项都是你从《玩家手册》中选择的一个武器或是工具。你通过抽取精灵共有记忆来神秘的获得这些熟练项，并且你保留他们直到你完成下次长休。`,
"仙灵": `
<b class="maroon">仙灵特质 Fairy Traits</b><br>
作为一位仙灵，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是妖精生物。<br>
<b>体型Size。</b>你的体型为小型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>仙灵魔法Fairy Magic。</b>你知晓<b class="spell">德鲁伊伎俩Druidcraft</b>。<br>从3级开始，你能用该特质施展<b class="spell">妖火Faerie Fire</b>。从5级开始，你能使用该特质施展<b class="spell">变巨术/缩小术 Enlarge/Reduce</b>。一旦你使用了该特质施展了妖火或变巨术/缩小术，直到完成一次长休前，你不能再次使用该特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br>
<b>飞行Flight。</b>因为你的翅膀，你拥有等于你步行速度的飞行速度。如果你穿戴中甲和重甲，则你不能使用此飞行速度。`,
"费尔伯格人": `
<b class="maroon">费尔伯格人特质 Firbolg Traits</b><br>作为一位费尔伯格人，你拥有以下角色特质： <br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>费尔伯格人魔法Firbolg Magic。</b>你能用本特质施展侦测魔法Detect Magic和易容术 Disguise Self。当你施展这个版本的易容术Disguise Self时，你可以看起来变矮或变高3尺。一旦你使用了该特质施展了这些法术中的任何一个，直到完成一次长休前，你不能再次使用该特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用此特性施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br>
<b>神隐步Hidden Step。</b>以一个附赠动作，你能魔法性的化为隐形，直到你的下一回合开始，若直到你攻击，进行一次伤害掷骰，或强迫某人进行一次豁免检定，这一隐形也将提前结束。你可以使用该特质的次数等于你的熟练加值，当你完成一次长休后，你重获全部消耗的使用次数。<br>
<b>身强力壮Powerful Build。</b>在决定你的载重、和你可以推、拉及抬的重量时，你视作为体型大一级的生物。<br>
<b>兽与叶之语Speech of Beast and Leaf。</b>你有能力以有限的方式与野兽，植物与植被交流。它们可以理解你的话的意思，虽然你没有特殊的能力来明白它们的回应。你在所有试图影响它们的魅力检定具有优势。`,
"元素裔": `
<b class="maroon">元素裔特质 Genasi Traits</b><br>作为一位气元素裔，你拥有以下角色特质： <br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。在你选择该种族时选择体型。<br>
<b>速度Speed。</b>你的步行速度为35尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>魔息Unending Breath。</b>只要你未陷入失能，就可以一直保持闭气。<br>
<b>闪电抗性Lighting Resistance。</b>你具有闪电伤害的抗性。<br>
<b>融入清风Mingle with the Wind。</b>你知晓戏法<b class="spell">电爪Shocking Grasp</b >。从3级开始，你可以使用该特质施展<b class="spell">羽落术Feather Fall</b>，且无需材料成分。从5级开始，你同样可以使用该特质施展<b class="spell">浮空术Levitate</b>，且无需材料成分。一旦你使用了该特质施展了这些法术中的任何一个，直到完成一次长休前，你不能再次使用该特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。 <br><br>
<b>土元素裔特质 Earth Genasi Traits</b><br>作为一位土元素裔，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。在你选择该种族时选择体型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>土行Earth Walk。</b>在使用步行速度在地面或地板上移动的情况下，你在穿越困难地形时可以不消耗额外的移动力。<br>
<b>混入大地Merge with Stone。</b>你知晓戏法<b class="spell">剑刃防护Blade Ward</b>。你可以正常地施展该戏法，也可以使用附赠动作施展该戏法等同于你熟练加值次；当你完成一次长休时，你重新获得所有已消耗的附赠施展次数。<br>从5级开始，你可以使用该特质施展<b class="spell">行动无踪Pass without Trace</b>，且无需材料成分。使用了该特质施展了该法术后，直到你完成长休前都不能再次使用该特质施展该法术。你也能用你拥有的二环或更高环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br><br>
<b>火元素裔特质 Fire Genasi Traits</b><br>作为一位火元素裔，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。在你选择该种族时选择体型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>火焰抗性Fire Resistance。</b>你具有火焰伤害的抗性。<br>
<b>烈焰之触Reach to the Blaze。</b>你知晓戏法<b class="spell">燃火术Produce Flame</b>。从3级开始，你可以使用该特质施展<b class="spell">燃烧之手Burning Hands</b>。从5级开始，你可以使用该特质施展<b class="spell">火焰刀Flame Blade</b>，且无需材料成分。使用了此特质施展了燃烧之手或火焰刀后，直到完成一次长休前，你不能再次使用此特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。 <br><br>
<b>水元素裔特质 Water Genasi Traits</b><br>作为一位水元素裔，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。在你选择该种族时选择体型。<br>
<b>速度Speed。</b>你的步行速度为30尺，同时你拥有等同于你步行速度的游泳速度。<br>
<b>强酸抗性Acid Resistance。</b>你具有强酸伤害的抗性。<br>
<b>水陆两栖Amphibious 。</b>你可以在空气和水中呼吸。<br>
<b>呼唤波浪Call to the Wave。</b>你知晓戏法<b class="spell">酸液飞溅Acid Splash</b>。从3级开始，你可以使用该特质施展<b class="spell">造水术/枯水术Create or Destroy Water</b>。从5级开始，你可以使用该特质施展<b class="spell">水墙术Wall of Water</b>，且无需材料成分。一旦你使用了此特质施展了造水/枯水术或水墙术，直到完成一次长休前，你不能再次使用此特质施展那个法术。你也能用你拥有的"
你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br>
<b>黑暗视觉 Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。`,
"吉斯洋基人": `
<b class="maroon">吉斯洋基人特质 Githyanki Traits</b><br>作为一位吉斯洋基人，你拥有以下角色特质： <br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>星界知识Astral Knowledge。</b>你可以神秘地进入一个与星光位面相连接的实体经验储存池。当你完成一次长休后，你能够获得一项你选择技能的熟练，和一项你从《玩家手册》中选择的一个武器或工具的熟练，如同你短暂地将自己的意识投影到了星光位面。以此获得的这些熟练会在你完成下次长休时消失。<br>
<b>吉斯洋基灵能Githyanki Psionics。</b>你知晓戏法<b class="spell">法师之手Mage Hand</b>，使用此特质施展此戏法时，这只手是隐形的。<br>从3级开始，你可以使用该特质施展<b class="spell">跳跃术Jump</b>。从5级开始，你可以使用该特质施展<b class="spell">迷踪步Misty Step</b>，且无需材料成分。使用此特质施展了跳跃术或迷踪步后，直到完成一次长休前，你不能再次使用该特质再施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。当你使用该特质施展这些法术时，无需法术成分。<br>
<b>心灵抗性Psychic Resistance。</b>你具有心灵伤害的抗性。`,
"吉斯泽莱人": `
<b class="maroon">吉斯泽莱人特质 Githzerai Traits</b><br>
作为一位吉斯泽莱人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>吉斯泽莱灵能Githzerai Psionics。</b>你知晓戏法<b class="spell">法师之手Mage Hand</b>，使用此特质施展此戏法时，这只手是隐形的。<br>从3级开始，你可以使用该特质施展<b class="spell">护盾术Shield</b>。从5级开始，你可以使用该特质施展<b class="spell">侦测思想Detect Thoughts</b>。使用此特质施展了护盾术或侦测思想后，直到你完成一次长休前，你不能再次使用此特质再施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。当你使用该特质施展这些法术时，无需法术成分。<br>
<b>精神戒训Mental Discipline。</b>你与生俱来的心灵防御能力，使你在为避免或结束魅惑和恐慌状态所做的豁免检定具有优势。<br>
<b>心灵抗性Psychic Resistance。</b>你具有心灵伤害的抗性。`,
"地精": `
<b class="maroon">地精特质 Goblin Traits</b><br>
作为一位地精，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。对于任何需要你是类地精的先决条件或效果而言，你也被视作一个类地精。<br>
<b> \n体型Size。</b>你的体型为小型。<br> 速度Speed。你的步行速度为30尺。<br>
<b> \n黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>妖精血统Fey Ancestry。</b>你在为自己避免或结束魅惑状态的豁免检定时具有优势。<br>
<b>以小博大Fury of the Small。</b>当你使用一次攻击或一道法术对一个生物造成伤害时，如果该生物的体型大于你，你可以使该次攻击或该道法术对该生物造成额外伤害。该额外伤害等于你的熟练加值。<br>你可以使用此特质的次数等于你的熟练加值，当你完成一次长休后，你重获所有已消耗的使用次数。并且你每个回合不能使用此特质超过一次。<br>
<b>迅捷逃生Nimble Escape。</b>你在每个自己的回合中，可以用附赠动作来执行撤离动作或躲藏动作。`,
"兔人": `
<b class="maroon">兔人特质 Harengon Traits</b><br>
作为一位兔人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。在你选择该种族时选择体型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>狡兔敏锐Hare-Trigger。</b>你可以将你的熟练加值加入你的先攻数值。<br>
<b>小兔感官Leporine Senses。</b>你拥有察觉技能的熟练。<br>
<b>幸运步伐Lucky Footwork。</b>当你的敏捷豁免检定失败时，你可以用反应投掷一枚d4并将其加入到豁免检定中，此举可能会将失败转变为成功。若你的速度为0或处于倒地状态，你不能使用该反应。<br>
<b>兔子跳Rabbit Hop。</b>作为一个附赠动作，你能够跳跃等同于五倍熟练加值尺距离，且不会因此触发借机攻击。你只能在你的速度高于0时才能使用该特质。你可以使用此特质的次数等于你的熟练加值，当你完成一次长休后，你重获所有已消耗的使用次数。`,
"大地精": `
<b class="maroon">大地精特质 Hobgoblin Traits</b><br>
作为一位大地精，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。对于任何需要你是类地精的先决条件或效果而言，你也被视作一个类地精。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>妖精血统Fey Ancestry。</b>你为避免或结束魅惑状态所做的豁免检定具有优势。<br>
<b>妖精赠礼Fey Gift。</b>你可以借由此特质，以附赠动作执行协助动作。你可以使用此特质的次数等于你的熟练加值。完成一次长休后，你重获所有已消耗的使用次数。<br>从3级开始，每当你使用此特质执行协助动作时，从下列选项中选择一项： <br>
<ul>
<li><b> 好客Hospitality。</b>你与受你协助的生物都获得等于1d6加你的熟练加值的临时生命值。</li>
<li><b>通行Passage。</b>你与受你协助的生物的步行速度都增加10尺，直到你下一个的回合开始。</li>
<li><b> 恶意Spite。</b>若受你协助的生物在你下一个的回合开始前的首次攻击检定命中了目标，则该目标在接下来的一分钟内进行的下一次攻击检定具有劣势。</li>
</ul>
<b>集众之运Fortune from the Many。</b>如果你在一次攻击检定没有命中，或是在一次属性检定或豁免检定中失败，你可以利用互相帮助的纽带获得骰值的加值，该加值等于30尺内所有你可见的盟友的数量（最多+3加值）。你可以使用此特质的次数等于你的熟练加值，当你完成一次长休后，你重新获得所有消耗的次数。`,
"天狗": `
<b class="maroon">天狗特质 Kenku Traits</b><br>
作为一位天狗，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。选择此种族时决定你的体型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>复制专家Expert Duplication。</b>当你抄写，或仿造自己或其他人制作的工艺品时，你在用以制造一个一模一样复制品的属性检定中具有优势。<br>
<b>天狗回想Kenku Recall。</b>感谢你超自然的强大记忆力，你拥有两项自选技能的熟练。<br>此外，当你使用任何你具有熟练的技能进行一次属性检定时，在你投掷d20前，你可以让自己进行的该检定具有优势。你可以使用这种方式给予自身优势的次数等于你的熟练加值，当你完成一次长休后，你重新获得所有消耗的次数。<br>
<b>拟声Mimicry。</b>你可以确切地模仿你曾听到过的声音，包括嗓音。一个生物只有在进行一次成功的对抗DC为8+你熟练加值+你魅力调整值的感知（洞悉）检定后，才能听出你发出的声音是模仿的。`,
"狗头人": `
<b class="maroon">狗头人特质 Kobold Traits</b><br>
作为一位狗头人，你拥有以下角色特质：<br>
<b> 生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为小型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>龙吼Dracoinc Cry。</b>你能用附赠动作吼向自身周围10尺内的敌人。若其中某个敌人有能听见你，则你和你的盟友对该敌人发动的攻击检定具有优势，持续直至你的下一个回合开始。你可以使用此特质的次数等于你的熟练加值，当你完成一次长休后，你重新获得所有消耗的次数。<br>
<b>狗头人遗赠Kobold Legacy。</b>狗头人这一种族与龙之间的联系能够以各种不可思议的方式显现在每个狗头人个体的身上。从下列遗赠选项中为你的狗头人选择一项：<br>
<ul>
<li><b>机智Craftiness。</b>你拥有以下一项自选技能的熟练：奥秘、调查、医药、巧手、生存。 <br></li>
<li><b>逆反Defiance。</b>你为避免或结束恐慌状态所做的豁免检定具有优势。 <br></li>
<li><b>龙术Draconic Sorcery。</b>你知晓一项你从术士法术列表中选择的戏法。智力，感知或魅力是你的施展该戏法的施法属性（当你选择该种族时进行决定）。</li></ul>`,
"蜥蜴人": `
<b class="maroon">蜥蜴人特质 Lizardfolk Traits</b><br>
作为一位蜥蜴人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。同时你拥有等同于你步行速度的游泳速度。<br>
<b>啃咬Bite。</b>你可以使用你布满尖牙的嘴进行徒手打击。当你使用它命中时，该次徒手打击将造成1d6+力量调整值的挥砍伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>屏息Hold Breath。</b>你每次可以屏住呼吸至多15分钟。<br>
<b>饥渴之喉Hungry Jaws。</b>你可以让你自己进入一种凶狠的暴食状态。用一个附赠动作，你能使用你的啃咬进行一次特殊攻击，如果该攻击命中，它会造成正常伤害，同时你获得等同于你熟练加值的临时生命值。你可以使用此特质的次数等于你的熟练加值，完成一次长休后，你重获所有已消耗的使用次数。<br>
<b>天生护甲Natural Armor。</b>你拥有坚韧的鳞片皮肤，在未着装护甲时，你的基础AC为13+你的敏捷调整值。如果你着装护甲的AC较之更低，你可以用你的天生护甲来确定你的AC。当你使用你的天生护甲时，你可以正常获得盾牌提供的加值。<br>
<b>自然直觉Nature's Intuition。</b>感谢你与大自然的神秘联系，你拥有以下两项自选技能的熟练：驯兽、医药、自然、察觉、隐匿、生存。`,
"牛头人": `
<b class="maroon">牛头人特质 Minotaur Traits</b><br>
作为一位牛头人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>角击Horns。</b>你可以使用你的双角进行徒手打击。当你使用它们命中时，该次徒手打击将造成1d6+力量调整值的穿刺伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>猛抵冲撞Goring Rush。</b>当你在自己的回合中执行疾走动作，并移动至少20尺后，你可以紧接着用附赠动作以你的角击发动一次近战攻击。<br>
<b>角锤Hammering Horns。</b>在你的回合中，当你用作为攻击动作中的一部分的近战攻击命中一个生物时，你可以用附赠动作以牛角尝试推开他。目标生物必须在你的5尺范围内，且体型不能比你大超过一级。除非该生物在进行对抗DC为8+你的熟练加值+你的力量调整值的力量豁免中成功。否则，你可以将其从你的身边推离至多10尺。<br>
<b>迷宫追忆Labyrinthine Recall。</b>你总是能知道哪个方向是北方， 同时你在任何为导航和追踪所进行的感知（求生）检定具有优势。`,
"半羊人": `
<b class="maroon">半羊人特质 Satyr Traits</b><br>
作为一位半羊人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是妖精。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为35尺。<br>
<b>顶撞Ram。</b>你可以使用你头与的双角进行徒手打击。当你用它们命中时，该次徒手打击将造成1d6+力量调整值的钝击伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>魔法抗性Magic Resistance。</b>你对抗法术所做的豁免检定具有优势。<br>
<b>欢喜之跃Mirthful Leaps。</b>每当你你进行一次跳远或跳高时，你都可以掷一枚d8，并将掷骰结果的数字加到你所跳跃的尺数上（即使这是一次立定跳远）。这段额外的距离也会如常花费你的移动力。<br>
<b>贪欢者Reveler。</b>作为狂欢的化身，你拥有表演和游说技能的熟练，并且你拥有一项自选乐器的熟练。`,
"海精灵": `
<b class="maroon">海精灵特质 Sea Elf Traits</b><br>作为一位海精灵，你拥有以下角色特质： <br>
<b>生物种类Creature Type。</b>你是类人生物。对于任何需要你是精灵的先决条件或效果而言，你也被视作一个精灵。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺，同时你拥有等同于你步行速度的游泳速度。<br>
<b>海之子Child of the Sea。</b>你可以在空气和水中呼吸，同时你具有寒冷伤害的抗性。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>妖精血统Fey Ancestry。</b>你为避免或结束魅惑状态所做的豁免检定具有优势。<br>
<b>海之友Friend of the Sea。</b>你的族人与水生动物拥有非凡的亲和力。你可以向任何拥有游泳速度的野兽传达简单的想法。它们可以理解你的话的意思，虽然你没有特殊的能力来明白它们的回应。<br>
<b>敏锐感官Keen Senses。</b>你拥有察觉技能的熟练项。<br>
<b>出神Trance。</b>你不需要睡眠，并且不会因魔法效应而陷入睡眠。你能够以4小时的时间完成长休，前提是如果你将这些时间花在一次出神冥想中，在此期间你保留意识。<br>每当你结束冥想时，你能够获得两项你未拥有的熟练，其中每一项都是你从《玩家手册》中选择的一个武器或是工具。你通过抽取精灵共有记忆来神秘的获得这些熟练项，并且你保留他们直到你完成下次长休。`,
"影灵": `
<b class="maroon">影灵特质 Shadar-kai Traits</b><br>
作为一位影灵，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。对于任何需要你是精灵的先决条件或效果而言，你也被视作一个精灵。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>渡鸦女王的祝福Blessing of the Raven Queen。</b>用一个附赠动作，你可以魔法性地传送到你可见的一处30尺内且未占据空间。你可以使用该特质的次数等于你的熟练加值，当你完成一次长休后，你重获所有已消耗的使用次数。<br>到达3级后，当你使用该特质进行传送时，你将获得所有伤害的抗性。该抗性持续直至你的下一个回合开始前，在此期间，你的外观会变得如同幽灵一般且全身半透明。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>妖精血统Fey Ancestry。</b>你为避免或结束魅惑状态所做的豁免检定具有优势。<br>
<b>敏锐感官Keen Senses。</b>你拥有察觉技能的熟练。<br>
<b>暗蚀抗性Necrotic Resistance。</b>你具有暗蚀伤害的抗性。<br>
<b>出神Trance。</b>你不需要睡眠，并且不会因魔法效应而陷入睡眠。你能够以4小时的时间完成长休，前提是如果你将这些时间花在一次出神冥想中，在此期间你保留意识。<br>每当你结束冥想时，你能够获得两项你未拥有的熟练，其中每一项都是你从《玩家手册》中选择的一个武器或是工具。你通过抽取精灵共有记忆来神秘的获得这些熟练项，并且你保留他们直到你完成下次长休。`,
"斑猫人": `
<b class="maroon">斑猫人特质 Tabaxi Traits</b><br>
作为一位斑猫人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。选择此种族时决定你的体型。<br>
<b>速度Speed。</b>你的步行速度为30尺，并且拥有等于你行走速度的攀爬速度。<br>
<b>猫之利爪Cat's Claws。</b>你能够以爪子发动徒手打击。当你使用它命中时，该次徒手打击将造成1d6+力量调整值的挥砍伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>猫之天性Cat's Talent。</b>你拥有察觉和隐匿技能的熟练。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>猫之迅捷Feline Agility。</b>你的反应和敏捷允许你能以爆发性的速度移动。在战斗中你的回合里，当你移动时，你可以让你的速度翻倍，直到回合结束。一旦你使用了这个特性，你需要在你的一个回合中移动0尺，之后才能再次使用它。`,
"龟人": `
<b class="maroon">龟人特质 Tortle Traits</b><br>
作为一位龟人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。选择此种族时决定你的体型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>利爪Claws。</b>你能够以爪子进行徒手打击。当你使用它命中时，该次徒手打击造成1d6+力量调整值的挥砍伤害，以代替通常情况下徒手打击的钝击伤害。<br>
<b>屏息Hold Breath。</b>你能屏住呼吸长达1小时。<br>
<b>天生护甲Natural Armor。</b>你的外壳提供充足的防御，你的基础AC是17（你的敏捷调整值不会影响这个数字）。你无法穿戴轻甲、中甲和重甲，但你在使用盾牌时，仍能获得盾牌的AC加值。<br>
<b>自然直觉Nature's Intuition。</b>感谢你与自然的神秘联系，拥有以下一项自选技能的熟练：驯兽、医药、自然、察觉、隐匿、生存。<br>
<b>龟壳防御Shell Defense。</b>你能用一个动作缩回壳内。直到你出壳前，你的AC获得+4加值，你的力量豁免与体质豁免具有优势。处于龟壳内期间，你处于倒地状态，速度为0且不能增加。你的敏捷豁免具有劣势，你不能执行反应，你唯一能执行的动作是用附赠动作从壳中出来。`,
"梭螺鱼人": `
<b class="maroon">梭螺鱼人特质 Triton Traits</b><br>
作为一位梭螺鱼人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型。<br>
<b>速度Speed。</b>你的步行速度为30尺，并且拥有等于你行走速度的游泳速度。<br>
<b>两栖Amphibious。</b>你能在水和空气中呼吸。<br>
<b>控风操水Control Air and Water。</b>你可以用此特质施展<b class="spell">云雾术Fog Cloud</b>。从3级开始，你能用它施展<b class="spell">造风术Gust of Wind</b>，从5级开始，你也能用此特质施展<b class="spell">水上行走Water Walk</b>。一旦你使用了该特质施展了这三个法术之一，直到你完成一次长休前，你都不能再次使用此特质施展那个法术。你也能用你拥有的相应法术环阶的法术位来施展这些法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>海之使者Emissary of the Sea。</b>你可以与具有游泳速度的野兽、元素、怪兽沟通。它们能够理解你的话的意思，虽然你没有特殊的能力来明白它们的回应。<br>
<b>海渊守卫Guardian of the Depth。</b>你具有寒冷伤害的抗性，能够适应海洋深处的严寒。`,
"蛇人": `
<b class="maroon">蛇人特质 Yuan-ti Traits</b><br>
作为一位蛇人，你拥有以下角色特质：<br>
<b>生物种类Creature Type。</b>你是类人生物。<br>
<b>体型Size。</b>你的体型为中型或小型。选择此种族时决定你的体型。<br>
<b>速度Speed。</b>你的步行速度为30尺。<br>
<b>黑暗视觉Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>魔法抗性Magic Resistance。</b>你对抗法术所做的豁免检定具有优势。<br>
<b>毒素抗性Poison Resilience。</b>你在避免或结束自己的中毒状态的豁免检定中具有优势。你也具有对毒素伤害的抗性。<br>
<b>巨蛇法术Serpentine Spellcasting。</b>你知晓戏法<b class="spell">毒气喷涌Poison Spray</b>。你能够用此特质无限次地施展<b class="spell">化兽为友Animal Friendship</b>，不过此法术只能以蛇为目标。自3级起，你还能用此特质施展<b class="spell">暗示术Suggestion</b>，不过用此特质施展它后，在你完成一次长休前你都无法再次以此施展该法术；你也能用你拥有的2环以上的法术位来施展该法术。<br>当你使用该特质施展这些法术时，智力，感知或魅力是你的施法属性（当你选择该种族时进行决定）。`,
"星界精灵": `
<b class="maroon">星界精灵特质 Astral Elf Traits</b><br>
<b>生物类型 Creature  Type。</b>
你是类人生物。当任何效果的前提需要你是精灵时，你同时也被视作一位精灵。 <br>
<b>体型 Size。</b> 你的体型为中等。<br>
<b>速度 Speed。</b>你的步行速度为30尺。 <br><b>星界之火 Astral Fire。</b>
你习得下列一项你选择的戏法：<b class="spell">舞光术Dacing Lights</b>、<b class="spell">光亮术Light</b>、或 <b class="spell">圣火术Sacred Flame</b>。你施展该戏法的施法属性为智力、感知、或魅力。（选择此种族的时候决定）。 <br>
<b>黑暗视觉 Darkvision。</b>在微光光照下，你身边60尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。 <br><b>妖精血统 Fey Ancestry。</b> 你进行的为避免魅惑状态或结束你身上的魅惑状态所做的豁免具有优势。 <br>
<b>敏锐感官 Keen Senses。</b> 你拥有察觉技能的熟练项。 <br>
<b>星光步Starlight Step。</b>使用一个附赠动作，你能魔法地传送到30尺内一处你可见且未占据空间里。你能使用本特质的次数与你的熟练加值相同，当你完成一次长休后，你恢复所有已使用的次数。<br>
<b>星界出神 Astral Trance。</b>你不需要睡眠，魔法效应亦无法使你陷入睡眠。你能花费4小时进行出神般的冥想来完成一次长休，且整个冥想过程中你都能保持清醒。<br>
当你完成出神时，你获得一个自选技能的熟练项，与一件自选武器或自选工具的熟练项（从《玩家手册》中选择它们）。你通过抽取共享的精灵记忆及星光位面的实体经历，神秘地获得了这些熟练，这个好处会一直持续到你完成下一次长休。`,
"自动侏儒": `
<b class="maroon">自动侏儒特质 Autognome Traits</b><br>
\n <br><b>生物类型 Creature Type。</b> 你是构装生物。 <br>
<b>体型 Size。</b> 你的体型为小型。<br>
<b>速度 Speed。</b>你的步行速度为30尺。<br>
<b>装甲外壳 Armored Casing。</b>你的身体有着由薄金属或其他的耐用材料制成的外壳。若你未穿着护甲，你的基础护甲等级变为 13+你的敏捷调整值。 <br>
此外，你的创造者将你设计为能受益于一些保护生命但通常不影响构装生物的法术：<b class="spell">疗伤术Cure Wound</b>、<b class="spell">治愈真言Healing Word</b>、<b class="spell">群体疗伤术Mass Cure Wound</b>，<b class="spell">群体治愈真言Mass Healing Word</b> 和 <b class="spell">维生术Spare the Dying</b>。 <br><b>机械本质 Mechanical Nature。</b> 你具有毒素伤害抗性，并免疫于疾病。你为防止陷入麻痹或中毒所做的豁免具有优势。你不需要吃、喝、呼吸。 <br>
<b>哨兵式休息 Sentry's  Rest。</b> 当你进行长休时，你需要花费6小时处于一种静止的、非激活的状态，以代替睡眠。这种状态下，你会表现的十分迟缓，但不会失去意识。 <br>
<b>专业设计 Specialized Design。</b> 你获得两项自选的工具熟练，从《玩家手册》中进行选择。`,
"诘弗人": `
<b class="maroon">诘弗人特质 Giff Traits</b><br>
\n\n <br>\n<b>生物类型 Creature Type。</b> 你是类人生物。 <br>\n<b>\n  体型 Size。</b> 你的体型为中型。 \n<br>\n<b>速度 Speed。</b>\n你的步行速度为30尺，你拥有与你步行速度相同的游泳速度。<br><b> 星界火花 Astral Spark。</b>
你与星光位面的精神连接让你拥有一簇神力火花的神秘权能，并通过你的武器来引导之。当你使用简易或军用武器命中一个目标时，你能对目标额外造成等同于你熟练加值点的力场伤害。 <br>
你能使用此特质的次数等同于你的熟练加值，但每回合中只能使用一次。当你完成一次长休后，你重获全部已消耗的使用次数。<br>
<b>枪械精通 Firearms Mastery。</b>你和枪械有一种神秘的联系，这背后的渊源可追寻至诘弗人那钟情枪械的神祇们。因为祂们，你拥有所有枪械的熟练项，并无视任何枪械的<b>装填loading</b>属性。此外，使用枪械攻击最大射程内的敌人时，你的远程武器攻击检定不会因为超过常规射程具有劣势。 <br>
<b>河马体格 Hippo Build。</b>你在进行基于力量的属性检定与力量豁免时具有优势。此外，当决定你的载货量和推，拉，抬的重量时，你的体型视为比当前大一级。`,
"鼯猴人": `
<b class="maroon">鼯猴人特质 Hadozee Traits</b><br>
<b>生物类型 Creature Type。</b> 你是类人生物。 <br>
<b>体型 Size。</b>你的体型为中型或小型。选择此种族的时候决定你的体型。<br>
<b>速度 Speed。</b> 你的步行速度为 30 尺，你拥有与你步行速度相同的攀爬速度。<br>
<b>巧足 Dexterous Feet。</b>以一个附赠动作，你能用你的脚操纵一个物件、打开或关上一扇门或容器、或是捡起或放下一个微型物件。 <br>
<b>滑翔 Glide。</b>当你从至少离地10尺的高度坠落时，你可以用你的反应展开你的翼膜，水平滑行一段等同于你步行速度的距离（其方向由你决定），本次摔落对你造成的伤害变为0。<br><b>鼯猴坚毅 Hadozee Resilience。</b> 你血管中流淌的魔法增强了你的天生防御力。当你受到伤害时，你可以用反应投掷一枚d6。你受到的伤害减少投掷结果+你的熟练加值 点（最低降至0） 。 <br>你能使用此特质次数等同于你的熟练加值，完成一次长休后，你重获全部已消耗的使用次数。`,
"流浆体": `
<b class="maroon">流浆体特质 Plasmoid Traits</b><br>
<b>生物类型 Creature Type。</b> 你是泥怪。<br>
<b>体型 Size。</b>你的体型为中型或小型。当你选择该种族的时候决定体型。<br>
<b>速度 Speed。</b> 你的步行速度为 30 尺。<br>
<b>无定型体 Amorphous。</b>只要你没有携带或穿着任何东西，你就能跻身通过最窄1寸宽的空间。你为发起或逃脱擒抱所进行的属性检定具有优势。<br>
<b>黑暗视觉 Darkvision。</b>在微光光照下，你身边 60 尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。<br>
<b>屏息 Hold Breath。</b> 你能屏住呼吸达1个小时。<br>
<b>天生坚韧 Natural Resilience。</b>你具有强酸和毒素伤害的抗性，你为防止陷入中毒状态所做的豁免具有优势。<br>
<b>变化自身 Shape Self。</b>使用一个动作，你可以重塑你的身体，让你拥有一个头、1~2只手臂、1~2条腿，以及临时的手和脚，你也可以变回没有肢体的浆团。当你具有人类般的身形时，你能穿着和你体型相同的类人生物的衣服和护甲。 <br>以一个附赠动作，你能挤出一条伪肢（或是将已有的伪肢收回你的体内），这条伪肢至多 6 寸宽，10 尺长。作为该附赠动作的一部分，你能用这条伪肢操纵一个物件，打开或关闭一扇门或容器，或是捡起或放下一个微型物件。这条伪肢不具有感知器官，不能用来攻击、激活魔法物品，或是举起超过 10 磅重的物体。`,
"螳螂人": `
<b class="maroon">螳螂人特质 Thri-kreen Traits</b><br>
<b>生物类型 Creature Type。</b> 你是怪兽。 <br>
<b>体型 Size。</b>
你的体型为中型或小型。当你选择此种族的时候决定体型。<br>
<b>速度 Speed。</b>你的步行速度为30尺。<br>
<b>变色甲壳 Chameleon Carapace。</b>若你不穿着护甲时，你的甲壳让你的基础护甲等级变为 13+敏捷调整值。<br>
以一个动作，你能改变你甲壳的颜色来与你身边环境的颜色与纹理相匹配，这让你在这些环境中躲藏时，所进行的敏捷（隐匿）检定具有优势。 <br>
<b>黑暗视觉 Darkvision。</b>在微光光照下，你身边 60 尺内可以视为等同于明亮光照。而在黑暗中，该范围内可视为等同于微光光照。你无法在黑暗中分辨颜色，只能看到有灰度的黑白画面。 <br>
<b>副臂 Secondary Arms。</b>在你的两只主臂下，还拥有两只稍微小一些的副臂。这些副臂各能用于操纵一个物件、打开或关闭一扇门或容器、或是捡起或放下一个微型物件、或持用一把具有轻型属性的武器。<br>
<b>无眠 Sleepless。</b>你不需要睡眠且能在长休期间保持清醒，但你仍然必须避免剧烈活动以获得休息的好处。<br>
<b>螳螂人心灵感应 Thri-kreen Telepathy。</b>
即使你知晓其他语言，倘若没有魔法的协助，你也无法说出斯里克林语以外的语言。你使用心灵感应作为替代来传达你的想法。你拥有一种能将你的想法通过心灵传递给你120尺内且你可见的自愿生物的魔法能力。一个被你连接的生物无需与你拥有共通语言就可以理解你的思想，但是需要至少能够理解一种语言。你与一个生物的心灵感应连接会在以下情况下断裂：你和该生物之间的距离超过 120 尺，你们两者之一失能，或你们两者之一心灵上断开连接（无需动作）。`,
"精灵-洛温/影原血系": `
<b class="maroon">精灵-洛温/影原血系特质 Lorwyn/Shadowmoor Elf Traits</b><br>
<b>精灵 Elves</b><br>
洛温-暗影荒原国度的精灵们有着一对黑色无瞳的眼睛；弯曲的角；腿部一对双蹄足；以及尖耳朵。洛温的精灵与暗影荒原对立面的同族在肉体与文化上存在很大的差异。<br>
<b>洛温的精灵 In Lorwyn</b><br>
洛温的精灵有着山羊一般的短角或公绵羊一般的弯角，但总会带有脊线。它们的尖耳朵又长又细。<br>
在洛温，精灵们将美奉为至高信条——尽管每位精灵对美的定义都显得随心所欲。洛温的精灵借它们那早已陨落的帝国，掌管这片土地上的其他生物。<br>这些精灵将帝国的陨落归咎于外来威胁，尤其是非瑞克西亚Phyrexian的入侵（见介绍章"洛温-暗影荒原的历史"）。然而此次入侵只是帝国毁灭的丧钟，其人民的自大与对其他种族的狂妄早已为帝国衰败埋下祸患。<br>
<b>暗影荒原的精灵 In Shadowmoor</b><br>
暗影荒原的精灵的角又长又卷，还有着粗糙剌手的纹理。它们的尖耳朵要比洛温对立面的同族还要长。<br>
像洛温的精灵一样，暗影荒原的精灵们守护美——尽管一位暗影荒原精灵对"美"的定义会很抽象。许多精灵相信，美会随个人所为而增辉或蒙尘；他们尤其将英雄气概与自我牺牲视为美的最高境界。 <br>寻华师是研究与探索洛温的暗影荒原精灵。它们每个人都携带着薄暮圣物匣 Reliquary of Twilight（见介绍章）。在暗影荒原，美境卫——那些为追寻美而在自己位面游历的精灵——与寻华师同为族群中最受信赖与尊崇的成员。<br><br>
<b>扮演精灵 Playing an Elf</b>
<br>当你创建一名来自洛温或暗影荒原的精灵玩家角色时，使用精灵种族（见《玩家手册》）。对于该角色的精灵血系特性，从下方的精灵血系表中选择其中一个血系。 <br>
<b>精灵血系Elves Lineages</b><br>
<table><tr>
<td><b>血系</b></td><td><b>1级</b></td><td><b>3级</b></td>   <td><b>5级</b></td></tr>
<tr><td>洛温精灵Lorwyn Elf</td><td>你知晓戏法<b class="spell">荆棘之鞭Thorn Whip</b>，每当你完成长休时，你可以将它替换为德鲁伊法术列表中的另一个戏法。<br></td><td><b class="spell">命令术Command</b></td><td><b class="spell">沉默术Silence</b></td></tr>\n  <tr><td>影原精灵Shadowmoor Elf</td><td>你的黑暗视觉提升至120尺。你也知晓戏法<b class="spell">点点星芒Starry Wisp</b>。<br></td><td><b class="spell">英雄气概Heroism</b></td><td><b class="spell">遗体防腐Gentle Repose</b></td></tr>
</table>`,
"洁英": `
<b class="maroon">洁英特质 Kithkin Traits</b><br>
<b>洁英 Kithkin</b><br>
洁英是身材矮小的种族，他们拥有健壮的腿部、修长的手臂和结实的躯干。他们宽阔的面庞、圆润的耳朵和一双传神的大眼睛，让他们看起来隐约有些像熊。<br>
大多数洁英通过一张心灵感应的网络相互连接，这张网络使他们能够感知到附近同族的情感。由于这种联系，许多洁英彼此之间毫无保留地信任。<br>一些洁英出于各种原因——通常是遭受非瑞克西亚入侵带来的创伤（见导言部分“洛温-暗影荒原历史”）——会暂时或永久地从这张心灵感应网络中剥离。然而，无论如何，洁英普遍认为背叛同族是一种滔天大罪。<br>
<b>洛温的洁英 In Lorwyn</b><br>洛温的洁英生活在田园般的小村庄中，并欢迎外来者进入他们的社区。这些洁英将他们的文化遗产收录在一本名为《洁与英之书》的典籍中。他们也经常持有许多迷信，尤其是与洛温的自然化身相关的迷信（见第三章）。<br>
<b>暗影荒原的洁英 In Shadowmoor</b><br>暗影荒原的洁英更加孤立和仇外。他们大多居住在被称为“道恩”的强化定居点中，那里有着严格的习俗来维护社会秩序。暗影荒原洁英的领袖们密切关注着他们的社区，监视任何犯罪或叛国的迹象。<br>
<b>扮演洁英 Playing a Kithkin</b><br>创建洁英玩家角色时，请使用半身人种族（见《玩家手册》）。暗影荒原的洁英具有120尺黑暗视觉。`,
"洛温幻身灵": `
<b class="maroon">洛温幻身灵特质 Lorwyn Changeling Traits</b><br>
<b>生物类型：</b>妖精<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高），在选择此种族时决定<br>
<b>速度：</b> 30尺<br><br>
<br>作为洛温幻身灵，你有以下特殊特质：<br>
<b>自我塑造Shape Self。</b>
以一个动作，你重塑你的身躯为两足类人的形状或四足野兽的形状。若你的形状为类人，你能够穿着为与你体型相同的类人生物制造的衣物或护甲。<br>
<b>黑暗视觉Darkvision。</b>你具有120尺黑暗视觉。<br>
<b>欢乐模仿Delightful Imitator。</b>你具有表演或欺瞒技能的熟练。<br>
<b>莫测诡移Unpredictable Movement。</b>每当你投掷先攻时，只要本次先攻掷骰不具有劣势，你就能够立即移动等于你速度一半的距离`,
"霜身": `
<b class="maroon">霜身特质 Rimekin Traits</b><br>
<b>霜身特质 Rimekin Traits<br>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高），在选择此种族时决定<br>
<b>速度：</b>30尺<br><br>
作为霜身，你有以下特殊特质：<br>
<b>冷火魔法Cold Fire Magic。</b>你知晓戏法<b class="spell">冷冻射线Ray of Frost。</b>当你的角色等级到达3级和5级时，你分别习得法术<b class="spell">冰刃Ice Knife</b>和<b class="spell">火焰刀Flame Blade</b>。你始终准备着这些习得的法术，且可以不消耗法术位施展这些法术各一次，当你完成一次长休时，你重获以此法施展该道法术的能力。你也可以用任何你拥有的相应环阶法术位施展该道法术。你使用此特质施展<b class="spell">火焰刀Flame Blade</b>时，此法术造成寒冷伤害而非火焰伤害。<br>智力、感知、或魅力是你用此特质施展法术时的施法属性（在你选择此种族时选择施法属性）。<br>
<b>寒冷抗性Cold Resistance。</b>你拥有对寒冷伤害的抗性。<br>
<b>黑暗视觉Darkvision。</b>你拥有60尺黑暗视觉。`,
"幻身灵": `
<b class="maroon">幻身灵特质 Changeling Traits</b><br>
<b>生物类型：</b>妖精<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4英尺高），在选取此种族时选择<br>
<b>速度：</b>30尺<br><br>
作为一名幻身灵，你具有以下特殊特质。<br>
<b>幻身本能Changeling Instincts。</b>多亏了和妖精领域的联系，你自以下技能中选择两项获得熟练：欺瞒，洞悉，威吓，表演或游说。<br>
<b>变形Shape-Shifter。</b>你能以动作变形来改变你的外貌和声音。你可以决定变形的细节，包括你的肤色、发长和性别。你也能调整你的身高和体重并令你的体型在中型和小型间转变。你可以让你看起来好像其他玩家可玩种族的成员，但你的游戏数据不会因此改变。你无法复制你从未见过的外貌，且你变形形态的肢体基本结构需与你本体相同。<br>此特质不会改变你的衣物和装备。<br>以此特质变形期间，你的魅力检定具有优势。<br>你将保持新形态直至你以动作变回你的真实形态。`,
"离梦人": `
<b class="maroon">离梦人特质 Kalashtar Traits</b><br>
<b>生物类型：</b>异怪<br>
<b>体型：</b>中型（约6-7尺高）<br>
<b>速度：</b>30尺<br><br>
作为一名离梦人，你拥有以下特殊特性。<br>
<b>双重心灵Dual Mind。</b>你在感知和魅力豁免中具有优势。<br>
<b>心能训练Mental Discipline。</b>你对心灵伤害具有抗性。<br>
<b>心灵链接Mind Link。</b>你拥有心灵感应能力，其距离尺数等于你等级的十倍。当你使用此特质与一个生物进行心灵感应沟通时，你可以用一个魔法动作给予该生物与你心灵感应沟通的能力，持续1小时或直到你用一个魔法动作结束此效应。<br>
<b>离梦Severed from Dreams。</b>你不能成为托梦术Dream法术的目标。此外，当你完成一次长休时，你获得自选的一项技能熟练。此熟练会持续到你完成另一次长休为止。`,
"科拉瓦": `
<b class="maroon">科拉瓦特质 Khoravar Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-6尺高）或小型（约2-4英尺高），在选取此种族时选择<br>
<b>速度：</b>30尺<br><br>
作为一名科拉瓦，你拥有以下特殊特质。<br>
<b>黑暗视觉Darkvision。</b>
你拥有60尺黑暗视觉。<br>
<b>妖精血统Fey Ancestry。</b>  \n你在为避免或结束魅惑状态进行的豁免中具有优势。<br>
<b>妖精赠礼Fey Gift。</b>你知晓戏法交友术Friends  \n。每当你完成一次长休时，你可以将该戏法替换为牧师、德鲁伊或法师法术表中的一道不同戏法。你在使用此特性进行施法时使用的施法属性为智力、感知或魅力（在你选择此种族时进行选择）。<br>
<b>昏睡抗力Lethargy Resilience。</b>\n当你在为避免或结束昏迷状态进行的豁免中失败时，你可以令其变为成功。此特质一经使用，直到你完成1d4次长休前不能再次使用。<br>
<b>多才多艺Skill Versatility。</b>  \n你获得由你选择的一项技能或工具的熟练。每当你完成一次长休时，你可以将其替换为另一技能或工具的熟练。`,
"化兽者": `
<b class="maroon">化兽者特质 Shifter Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4英尺高），在选取此种族时选择<br>
<b>速度：</b>30尺<br><br>
作为一名化兽者，你具有以下特殊特质。<br>
<b>兽性本能Bestial Instincts。</b>\n你与野兽的联系，令你获得以下技能中选择一项获得熟练：特技，运动，威吓或求生。<br>
<b>黑暗视觉Darkvision。</b>
你具有60尺黑暗视觉。<br>
<b>化兽Shifting。</b>
你能以附赠动作变形成更加野性的样貌。这种转变持续1分钟或在你以附赠动作恢复原状时提前结束。当你化兽时，你获得等于你熟练加值2倍的临时生命值。你能够化兽的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。<br>每当你化兽时，你获得以下增益中的一种（当你选取此种族时选择）。<br>
<ul>
<li><b>兽皮Beasthide。</b>
你额外获得1d6临时生命值。化兽期间，你的护甲等级获得+1加值。</li>
<li><b>长牙Longtooth。</b>当你化兽时及化兽期间的其他回合中作为附赠动作，你能使用伸长的獠牙发动一次徒手打击。若你以此徒手打击命中并造成伤害，你可以造成等于1d6+你的力量调整值的穿刺伤害以替代徒手打击通常的伤害。</li>
<li><b>迅捷Swiftstride。</b>当你处于化兽期间，你的速度提升10尺。此外，当一名生物在你5尺内结束其回合时，你能以反应移动至多10尺。该反应不会引发借机攻击动作。</li>
<li><b>猎食Wildhunt。</b>化兽期间，你的感知检定具有优势。此外，只要你未陷入失能状态，位于你30尺内的生物对你的攻击检定就无法具有优势。</li></ul>`,
"战俑": `
<b class="maroon">战俑特质 Warforged Traits</b><br>
<b>生物类型：</b>构装<br>
<b>体型：</b>中型（约6-8尺高）或小型（约3-4英尺高），在选取此种族时选择<br>
<b>速度：</b> 30尺 <br><br>
作为一名战俑，你拥有以下特殊特质。<br>
<b>构装坚韧Construct Resilience。</b>你拥有对毒素伤害的抗性，且你在为避免或结束中毒状态而进行的豁免时具有优势。<br>
<b>内嵌防护Integrated Protection。</b>你的AC具有+1加值。此外，只要你还活着，你所着装的护甲就不能在你非自愿的情况下被卸下。<br>
<b>哨兵之憩Sentry's Rest。</b>你不需要睡眠，魔法不能令你入睡。你可以花费6小时进入一种非激活的静止状态，以完成一次长休。这段时间内，你变得迟缓，但仍具有意识。<br>
<b>特化设计SpecializedDesign。</b>你获得由你选择的一项技能和一项工具的熟练。<br>
<b>不知疲倦Tireless。</b>你不会因脱水、饥饿或窒息而获得力竭等级。`,
"半血裔": `
<b class="maroon">半血裔特质 Dhampir Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4英尺高），在选取此种族时选择<br>
<b>速度：</b>35尺<br><br>
作为半血裔，你有以下特殊特质：<br>
<b>黑暗视觉Darkvision。</b>你具有60尺黑暗视觉。<br>
<b>蛛行SpiderClimb。</b>你具有等于你速度的攀爬速度。当你到达3级后，你可以在垂直表面上下左右移动，且能倒挂在天花板上，期间你的双手可以保持空闲。<br>
<b>不死之痕Traceof Undeath。</b>你具有对暗蚀伤害的抗性。<br>
<b>吸血啃咬VampiricBite。</b>当你使用徒手打击造成伤害时，你可以选择使用你的獠牙啃咬敌人。你对目标造成1d4+体质调整值的穿刺伤害，而非徒手打击原本的伤害。<br>此外，当你对非构装非亡灵的生物造成此伤害时，你可以选择以下方式之一来增幅你自己：<br>
<ul>
<li><b>汲取Drain。</b>你恢复等于此啃咬造成的穿刺伤害的生命值。</li>
<li><b>强化Strengthen。</b>在接下来的一分钟内，你进行的下一次属性检定或攻击检定获得加值，加值等于此啃咬造成的穿刺伤害。</li>
</ul>
你能够以此啃咬增幅你自己的次数等于你的熟练加值，在你完成长休时你将重获所有已消耗的增幅次数。`,
"巫咒之子": `
<b class="maroon">巫咒之子特质 Hexblood Traits</b><br>
<b>生物类型：</b>妖精<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高），在选取该种族时选择<br>
<b>速度：</b>30尺<br><br>
作为巫咒之子，你拥有以下特殊特质。<br>
<b>黑暗视觉Darkvision。</b> 你具有60尺黑暗视觉。<br>
<b>神秘信物Eerie Token。</b>你能以附赠动作无害地剪下一缕头发，拔下一片指甲或其他方式，来创造一件魔法信物。信物存在期间，你获得以下增益：<br><ul>
<li><b>远程传信Distant Message。</b>只要你位于信物的10里内，你能以魔法动作向携带或持握该信物的生物传递一条不超过二十五个单词的心灵感应信息。</li>
<li><b>遥远视野Remote Viewing。</b>若你位于信物的10里内，你能以魔法动作将感官延伸至信物处，持续1分钟，或在你解除该状况（无需动作）或陷入失能状态时提前结束。此状况下，你能如同身处信物所在位置一样看和听。此状况结束时，信物被无害地摧毁。</li>
</ul>
除非信物被提前摧毁，否则其存在持续至你完成长休。一旦你以此特性创造一件信物，直至你完成长休都无法再如此做。<br>
<b>巫咒魔法Hex Magic。</b>你始终准备着法术<b class="spell">易容术Disguise Self</b>和<b class="spell">脆弱诅咒Hex</b>。你可以无需消耗法术位地施展每道法术各一次，当你完成长休时，你重获以此法施展这些法术的能力。你也能够以你拥有的任意合适环阶的法术位施展这些法术。你的这些法术的施法属性是感知、智力或魅力（在你选取该种族时选择）。`,
"人狼裔": `
<b class="maroon">人狼裔特质 Werewolf Traits</b><br>
<b>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高），在选取该种族时选择<br>
<b>速度：</b>30尺<br><br>
作为人狼裔，你拥有以下特殊特质。<br>
<b>黑暗视觉Darkvision。</b>你具有60尺黑暗视觉。<br>
<b>野性扑击Feral Pounce。</b>你的徒手打击造成挥砍伤害，而非钝击伤害。此外，当你在自己回合内作为攻击动作的一部分使用徒手打击命中一个生物时，你可以同时使用伤害选项与推撞选项。你每回合只能使用一次该增益。<br>
<b>嚎叫Howl。</b>你可以使用附赠动作发出一声阴森骇人的嚎叫。位于你15尺内由你选择的每名生物都必须进行一次感知豁免（DC=8+你的体质调整值+你的熟练加值），豁免失败的生物的攻击和豁免检定具有劣势，直至你的下个回合开始。<br>你能使用该特质的次数等于你的熟练加值。完成长休时，你重获所有已消耗的使用次数。<br>
<b>狼人本能Werewolf Instincts。</b>你具有察觉、隐匿或求生技能的熟练。`,
"复生者": `
<b class="maroon">复生者特质 Reborn Traits</b><br>
复生者是指那些已经死去却又莫名依然存活的个体。有些复生者的身上有着致命伤留下的疤痕，那死灰般的血肉和无血的血管无不表明着他们曾死里逃生。<br>另一些复生者则是魔法或科学造就的奇迹，他们或由迥然不同的生命缝合而成，或是在人造躯壳中承载着神秘的心智。无论起源如何，复生者都迎来了新生，并寻求属于他们自己的经历和答案。<br>
<b>复生者特质 Reborn Traits<br>生物类型：</b>类人<br>
<b>体型：</b>中型（约4-7尺高）或小型（约2-4尺高），在选取该种族时选择<br>
<b>速度：</b>30尺<br><br>
作为复生者，你拥有以下特殊特质。<br>
<b>死里逃生Escaped Death。</b>你的死亡豁免具有优势。<br>
<b>永固不朽Everlasting。</b>你不会因脱水、饥饿或窒息获得力竭等级。你无需睡眠，魔法也无法使你陷入睡眠。你可以保持非活动的静止状态来仅用4小时完成长休，且在这期间保持意识清醒。<br>
<b>往昔知识Knowledge from a Past Life。</b>你获得一项自选技能的熟练。<br>此外，你能暂时窥探过去来助你应付现在。当你属性检定失败时，你能投掷1d6并将骰值加入d20中，这可能使该次失败改为成功。你可以如此做的次数等于你的熟练加值，当你完成长休时，你重获所有已消耗的使用次数。<br>
<b>奇异耐性Strange Endurance。</b>你对以下一种你选择的伤害类型具有抗性：寒冷、暗蚀或毒素。`,
};

    const backgroundData = {
      "侍僧": {
        english: "Acolyte",
        abilities: ["智力", "感知", "魅力"],
        feat: "魔法学徒（牧师）",
        skills: ["洞悉", "宗教"],
        tool: "书法工具",
        equipment: "选择 A 或 B：(A) 书法工具、祈祷书、圣徽、羊皮纸（10 张）、法袍、8 GP；或 (B) 50 GP",
        description: "你在一座寺庙中全心全意地侍奉，或是挂单在城镇中，或是幽居在圣所。你在那里执掌祭仪，崇敬一位神祇或是众神。多亏了祭司的教导和你的虔诚，你也掌握了如何引导一点点神力，来为你的崇敬祈祷和在那里祷告的人们提供司教服务。"
      },
      "工匠": {
        english: "Artisan",
        abilities: ["力量", "敏捷", "智力"],
        feat: "工匠",
        skills: ["调查", "游说"],
        tool: "工匠工具（任选一种）",
        equipment: "选择 A 或 B：(A) 工匠工具（同上所选）、2 个小包、旅行服装、32 GP；或 (B) 50 GP",
        description: "你在力气足以提起水桶时，就开始在工匠工坊里以拖地和擦洗度日，每天挣那么几个铜板。当你长到成为学徒的年龄时，你学会了自己制作基本的手工艺品，还有面对刁钻客户时该说什么好话。你的买卖也让你对消息琐事有敏锐的洞察力。"
      },
      "骗子": {
        english: "Charlatan",
        abilities: ["敏捷", "体质", "魅力"],
        feat: "熟习",
        skills: ["欺瞒", "巧手"],
        tool: "文书伪造工具",
        equipment: "选择 A 或 B：(A) 文书伪造工具、戏服、高档服装、15 GP；或 (B) 50 GP",
        description: "在你长到能买酒的年纪后，你立刻就在家乡方圆十里内的所有酒吧拥有了自己专属的钟意座位。当你在各个酒吧间穿梭时，你学会了如何用善意的谎言去安抚那些需要安慰的可怜人——也许是一剂包治百病的良方或是一份伪造的血统证明。"
      },
      "罪犯": {
        english: "Criminal",
        abilities: ["敏捷", "体质", "智力"],
        feat: "警觉",
        skills: ["巧手", "隐匿"],
        tool: "盗贼工具",
        equipment: "选择 A 或 B：(A) 2 把匕首、盗贼工具、撬棍、2 个小包、旅行服装、16 GP；或 (B) 50 GP",
        description: "你潜藏在阴暗的小巷里，靠着偷鸡摸狗苟且偷生。也许你曾与一帮称兄道弟的法外狂徒患难与共；又或者，你是一个孤勇者，自力更生的同时与当地的盗贼公会乃至更可怕的违法者们明争暗斗。"
      },
      "艺人": {
        english: "Entertainer",
        abilities: ["力量", "敏捷", "魅力"],
        feat: "音乐家",
        skills: ["特技", "表演"],
        tool: "乐器（任选一种）",
        equipment: "选择 A 或 B：(A) 乐器（同上所选）、2 套服装、镜子、香水、旅行服装、11 GP；或 (B) 50 GP",
        description: "你年轻时大部分时间都在参加巡回演出和嘉年华会，为音乐家和杂技演员们做零工以换取学习的机会。你可能已经学会了如何走钢丝，如何弹奏风格独特的鲁特琴，或是用怎样无可挑剔的发音方式吟诵诗歌。而现如今，你在喝彩声中茁壮成长，渴望登上舞台。"
      },
      "农民": {
        english: "Farmer",
        abilities: ["力量", "体质", "感知"],
        feat: "健壮",
        skills: ["驯兽", "自然"],
        tool: "木匠工具",
        equipment: "选择 A 或 B：(A) 镰刀、木匠工具、医疗包、铁壶、铲子、旅行服装、30 GP；或 (B) 50 GP",
        description: "你从小就生在农家地，长在农家地。多年照料动物和耕种土地回报你以耐心和一个倍儿棒的健康身体。你对大自然的甘霖充满感激之情，也对自然之怒抱以敬畏之心。"
      },
      "警卫": {
        english: "Guard",
        abilities: ["力量", "智力", "感知"],
        feat: "警觉",
        skills: ["运动", "察觉"],
        tool: "赌具（任选一套）",
        equipment: "选择 A 或 B：(A) 矛、轻弩、20 支弩箭、赌具（同上所选）、附盖提灯、镣铐、箭袋、旅行服装、12 GP；或 (B) 50 GP",
        description: "你脚上的疼痛让你无法忘怀在塔楼驻岗上站班的无数时光。你曾被训练一只眼睛紧盯着墙外，小心提防那附近森林而来的掠夺者，而另一只眼睛则要盯着墙内，细细查探小偷小摸和惹是生非之人。"
      },
      "向导": {
        english: "Guide",
        abilities: ["敏捷", "体质", "感知"],
        feat: "魔法学徒（德鲁伊）",
        skills: ["隐匿", "求生"],
        tool: "制图工具",
        equipment: "选择 A 或 B：(A) 短弓、20 支箭、制图工具、铺盖、箭袋、帐篷、旅行服装、3 GP；或 (B) 50 GP",
        description: "你在野外长大，远离定居区，你的家就在你决定打开铺盖的任何地方。荒野中自有奇妙之处——奇特的怪物、原始的森林和溪流、杂草丛生的曾被巨人踏过的大殿废墟，你在探索它们的过程中学会了保护自己。而时不时的，你会遇到亲爱的自然祭司，他们会指导你掌握怎样运用荒野的魔法。"
      },
      "隐士": {
        english: "Hermit",
        abilities: ["体质", "感知", "魅力"],
        feat: "医疗师",
        skills: ["医药", "宗教"],
        tool: "草药工具",
        equipment: "选择 A 或 B：(A) 长棍、草药工具、铺盖、书籍（哲学）、油灯、燃油（3 扁瓶）、旅行服装、16 GP；或 (B) 50 GP",
        description: "你早年住在远离聚集地的、与世隔绝的小屋或是隐修院中。在那些日子里，你唯一的伙伴是森林中的生灵，以及那些偶尔带来给养和外界消息的访客。孤独让你花了很多时间琢磨天道的未解之谜。"
      },
      "商人": {
        english: "Merchant",
        abilities: ["体质", "智力", "魅力"],
        feat: "幸运",
        skills: ["驯兽", "游说"],
        tool: "领航工具",
        equipment: "选择 A 或 B：(A) 领航工具、2 个小包、旅行服装、22 GP；或 (B) 50 GP",
        description: "你曾作为一名学徒学习着商业的基础知识，你的师傅是一名商贩、商队的领队或是某位商铺的店主。你旅行八方，靠着买入和卖出工匠们所需的原材料和这些工匠的制品赚钱谋生。你可能曾在多地之间运输过不少货物，又或是从旅行商人那里订货，然后在自己店里销售。"
      },
      "贵族": {
        english: "Noble",
        abilities: ["力量", "智力", "魅力"],
        feat: "熟习",
        skills: ["历史", "游说"],
        tool: "赌具（任选一套）",
        equipment: "选择 A 或 B：(A) 赌具（同上所选）、高档服装、香水、29 GP；或 (B) 50 GP",
        description: "权力、财富还有荣耀伴随你在城堡中长大，你那贵不可言的小家族确保你受到了一流的教育，其中有些教导令你感激，而有些则只让你觉得愤慨。在城堡中的时光，尤其是在长久以来耳濡目染于宫廷中的家族往来，也培养了你足以胜任领袖的许多才能。"
      },
      "智者": {
        english: "Sage",
        abilities: ["体质", "智力", "感知"],
        feat: "魔法学徒（法师）",
        skills: ["奥秘", "历史"],
        tool: "书法工具",
        equipment: "选择 A 或 B：(A) 长棍、书法工具、书籍（历史）、羊皮纸（8 张）、法袍、8 GP；或 (B) 50 GP",
        description: "你长大的岁月便在宅邸和修行院之间的奔波中过去，做着各式各样的零活和服务，以此访问他们的图书馆藏。你花了那么多漫长的夜晚学习书籍和卷册，阅览多元宇宙的见闻，甚至涉猎魔法的本质——而你的心灵正渴望着了解更多。"
      },
      "水手": {
        english: "Sailor",
        abilities: ["力量", "敏捷", "感知"],
        feat: "酒馆斗殴者",
        skills: ["特技", "察觉"],
        tool: "领航工具",
        equipment: "选择 A 或 B：(A) 匕首、领航工具、绳索、旅行服装、20 GP；或 (B) 50 GP",
        description: "你作为一名海员生活，背上吹的是海风，脚下站的是摇晃的甲板。你在停泊港总是坐在酒吧的高脚凳上，回忆你曾直面猛烈的风暴，与那些在波涛下生活的人们高谈阔论着过去。"
      },
      "抄写员": {
        english: "Scribe",
        abilities: ["敏捷", "智力", "感知"],
        feat: "熟习",
        skills: ["调查", "察觉"],
        tool: "书法工具",
        equipment: "选择 A 或 B：(A) 书法工具、高档服装、油灯、燃油（3 瓶）、羊皮纸（12 张）、23 GP；或 (B) 50 GP",
        description: "你成长的时期都在缮写室度过，那是一座致力于保存知识的修道院，或是某个政府机关。你在那里学会了如何书写思维敏锐有逻辑的文字和怎样制作得体的书面文本，有时你会抄录政府文件或是誊抄文献巨著。最重要的是，你对琐碎处的关注很细致，这能帮助你避免在誊录和撰写文稿时出现错误。"
      },
      "士兵": {
        english: "Soldier",
        abilities: ["力量", "敏捷", "体质"],
        feat: "凶蛮打手",
        skills: ["运动", "威吓"],
        tool: "赌具（任选一套）",
        equipment: "选择 A 或 B：(A) 矛、短弓、20 支箭、赌具（同上所选）、医疗包、箭袋、旅行服装、14 GP；或 (B) 50 GP",
        description: "你从成年开始便接受战阵训练，鲜少有拿起武器之前的生活回忆，战斗已融入你的血液。有时候你会发现自己正在反复操练着最初学会的基本战斗训练。而最终，你会将这些训练运用到战场上，在战争中行使武力，保护你的王国。"
      },
      "流浪者": {
        english: "Wayfarer",
        abilities: ["敏捷", "感知", "魅力"],
        feat: "幸运",
        skills: ["洞悉", "隐匿"],
        tool: "盗贼工具",
        equipment: "选择 A 或 B：(A) 2 把匕首、盗贼工具、赌具（任意）、铺盖、2 个小包、旅行服装、16 GP；或 (B) 50 GP",
        description: "你在街头长大，身边都是同样命途多舛的孤儿，有些是朋友有些是对头。你露宿街头，只靠着打零工来换取食物；有些时候你会感到饥饿难耐，但却只能以盗窃维生。尽管如此，你从未抛弃你的自尊，也从未放弃希望——命运还没有就此关上大门。"
      },
      "琼达斯海盗": {
        english: "Chondathan Freebooter",
        abilities: ["力量", "敏捷", "感知"],
        feat: "熟习",
        skills: ["运动", "巧手"],
        tool: "织布工具",
        equipment: "选择A或B：（A）匕首、织布工具、背包、滚珠、篮子、铺盖、吊桶、口粮（3日份）、绳索、信号笛、旅行服装、38GP；或（B）50GP。",
        description: "虽然琼达斯的大部分年轻人都需要义务服四年兵役，但你却对专制政府试图操纵你的人生而感到不满。你抛弃了自己的国民身份，抛弃了自己的姓名，并在第一艘接纳了自己的船上成为了海盗。自此，你便航行于维洪海域之中。虽然你从未在离陆地距离超过几十里格（译注：长度名，约为三英里或三海里）的海域航行过，但你与当地的深刻联系以及广泛的人生阅历弥补了这一点。"
      },
      "死魔区住民": {
        english: "Dead Magic Dweller",
        abilities: ["力量", "体质", "感知"],
        feat: "医疗师",
        skills: ["医药", "求生"],
        tool: "皮匠工具",
        equipment: "选择A或B：（A）巨棒、皮匠工具、铺盖、吊桶、医疗包、长杆、口粮（3日份）、帐篷、火绒盒、5支火把、旅行服装、水袋、32GP；或（B）50GP。",
        description: "埃诺奥克沙漠的死魔法区域对于施法者以及那些依赖魔法的怪物来说无法忍受——而这却正是你在此生活的原因。你可能是正在为了摆脱红袍巫师而奔波，又或者是因为忤逆了卡林珊的某位强大气巨灵而逃亡。无论情况如何，你最终认为在埃诺奥克居住才是最好的选择。在若干年月之后，你变得更加智慧，更加强大，并拥有着从沙漠医药与荒漠生存当中艰难获得的知识。"
      },
      "焰拳佣兵": {
        english: "Flaming Fist Mercenary",
        abilities: ["力量", "体质", "魅力"],
        feat: "健壮",
        skills: ["威吓", "察觉"],
        tool: "铁匠工具",
        equipment: "选择A或B：（A）硬头锤、铁匠工具、高档服装、镣铐、便携式攻城锤、4GP；或（B）50GP。",
        description: "博德之门最主要的执法机构便是焰拳，一个由该城市的大公爵所领导的庞大佣兵协会。你曾经担任过焰拳的一员，并因此学会了如何用你令人生畏的眼神提前发现并解决问题，以及在必要的时候承受致命打击。焰拳的雇佣兵无论是在编还是已经退休，都以剑湾最顽强，最坚韧的战士著称，而你也在寻求将这样的声誉延续下去。"
      },
      "巨灵接触者": {
        english: "Genie Touched",
        abilities: ["敏捷", "感知", "魅力"],
        feat: "魔法学徒（法师）",
        skills: ["察觉", "游说"],
        tool: "玻璃匠工具",
        equipment: "选择A或B：（A）轻锤、玻璃匠工具、高档服装、油灯、燃油（3瓶）、水袋、2GP；或（B）50GP。",
        description: "虽然巨灵已不再统治卡林珊，但在你的家乡，巨灵魔法依然很常见。你可能不小心就从某个魔法油灯里面召唤出了一位气巨灵，又或者可能偶然来到一片由某位水巨灵守卫着的绿洲。可能有一位土巨灵在山体滑坡时将你救了下来，还可能是你与某位火巨灵在为了某笔稍纵即逝的财富而讨价还价。无论你是通过什么方式而与某位巨灵产生了命运的交集，这种经历都给予了你敏锐的眼光，伶俐的口舌，而不仅仅只是些许魔法。"
      },
      "冰上钓客": {
        english: "Ice Fisher",
        abilities: ["力量", "敏捷", "体质"],
        feat: "警戒",
        skills: ["驯兽", "运动"],
        tool: "木雕工具",
        equipment: "选择A或B：（A）木雕工具、篮子、滑轮组、吊桶、链条、捕猎陷阱、捕网、长杆、口粮（3日份）、绳索、旅行服装、32GP；或（B）50GP。",
        description: "你出身于冰风谷十镇的冰钓世家。捕捉硬头鳟并非北地最辉煌的产业，但确实是诚实勤恳的谋生手段。你的感官被训练得足以察觉到渔线最细微的扯动，从而将大鳟鱼拉出结冰的湖泊，并钓上足够整个村庄吃上好几顿的硬头鳟。这些经历使得你的身心变得坚韧，进而为冒险生涯做好了准备。"
      },
      "月井朝圣者": {
        english: "Moonwell Pilgrim",
        abilities: ["体质", "感知", "魅力"],
        feat: "魔法学徒（德鲁伊）",
        skills: ["自然", "表演"],
        tool: "画家工具",
        equipment: "选择A或B：（A）长棍、画家工具、铺盖、铃铛、小包、长袍、细线、旅行服装、水袋、34GP；或（B）50GP。",
        description: "与许多来自月影群岛的人一样，你从小便对这片圣洁的岛屿，岛上独一无二的神明以及被称作月井的神秘圣坛充满了敬畏。作为一位月井朝圣者，你踏上了探访地图上（或地图外）每座月井并通过它们来与神明对话的旅途。在你如田园牧歌一般的旅途当中，你收集了许多月影群岛人的民歌，画出了许多曾见过的迷人风景，甚至学会了如何支配一些原初魔法。"
      },
      "穆尔霍兰德盗墓者": {
        english: "Mulhorandi Tomb Raider",
        abilities: ["敏捷", "体质", "智力"],
        feat: "幸运",
        skills: ["调查", "宗教"],
        tool: "石匠工具",
        equipment: "选择A或B：（A）匕首、轻锤、石匠工具、背包、铺盖、撬棍、梯子、长杆、2个小包、绳索、细线、火绒盒、5支火把、旅行服装、水袋、26GP；或（B）50GP。",
        description: "你出生在神王们生活的土地上，而自从孩提时起，你便听过了无数有关古代帝国与被掩埋城邦的故事。在这些故事当中，穆尔霍兰德是一片充满了被遗忘财富的土地——无价之宝等待着足够狡诈又足够勇敢的人来将它们发掘。你主动出发去探索墓穴、坟冢与金字塔，以发掘自己的民族遗产。"
      },
      "迷锁守卫者": {
        english: "Mythalkeeper",
        abilities: ["智力", "感知", "魅力"],
        feat: "巧匠",
        skills: ["奥秘", "历史"],
        tool: "珠宝匠工具",
        equipment: "选择A或B：（A）长棍、珠宝匠工具、香水、小包、长袍、铲子、细线、水袋、16GP；或（B）50GP。",
        description: "迷锁是能够改造魔网甚至改变现实本源的强大魔法力量之源。大部分迷锁都建立在古代，其中很多都已损毁或进入休眠状态。作为一位来自谷地的迷锁守卫者，你第一次接触迷锁可能是在迷斯卓诺Myth Drannor的废墟中。你为了寻找其他迷锁力量的遗迹而漫游于费伦大陆，希望能够对迷锁的历史以及迷锁的力量有更多的了解——乃至于足以修复发生故障的迷锁。"
      },
      "莱瑟曼流浪者": {
        english: "Rashemi Wanderer",
        abilities: ["力量", "体质", "魅力"],
        feat: "健壮",
        skills: ["威吓", "察觉"],
        tool: "制图工具",
        equipment: "选择A或B：（A）制图工具、背包、铺盖、附盖提灯、燃油（3瓶）、绳索、火绒盒、旅行服装、水袋、23GP；或（B）50GP。",
        description: "你在莱瑟曼的高原之上漂泊了许多年，这片狂风席卷的危险荒原上不但星罗密布着用以禁锢邪魔的附魔方尖碑，而且还是巨龙，鬣狗人与其他致命生物的栖息地。在这样一片与世隔绝的土地上很难找到友谊，而你也明白应该与陌生人保持距离。"
      },
      "影宗流亡者": {
        english: "Shadowmasters Exile",
        abilities: ["敏捷", "智力", "魅力"],
        feat: "凶蛮打手",
        skills: ["特技", "隐匿"],
        tool: "盗贼工具",
        equipment: "选择A或B：（A）2把匕首、盗贼工具、铁蒺藜、戏服、爪钩、铁钉、镜子、2个小包、长袍、旅行服装、3GP；或（B）50GP。",
        description: "你毕生训练便是为了成为在幕后控制着赛斯克Thesk的神秘盗贼协会——影宗的一员。潜行与快速反应的能力只是你影宗课程的开始，你还需要变得更加残忍无情，以此来保障协会秘密的安全。但某个错误之举导致你被逐出了协会。现在你必须走上自己的道路。"
      },
      "龙巫教信徒": {
        english: "Dragon Cultist",
        abilities: ["敏捷", "体质", "智力"],
        feat: "新晋龙巫教徒",
        skills: ["欺瞒", "隐匿"],
        tool: "书法工具",
        equipment: "选择A或B：（A）书法工具、匕首、玻璃瓶、油灯、镣铐、燃油（5瓶）、2个小包、长袍、绳索、30GP；或（B）50GP。",
        description: "你是一位新晋龙巫教徒。你了解到或被人带进了某个基层邪教组织，在那里，你彰显着龙巫教徒引以为豪的品质：虚伪狡诈，恪守秘密，以及坚定决心。以你为龙巫教效命的誓言作为交换，龙巫教为你提供了随行的拜龙者为同伴，以及能够助你在奥法及神秘学领域中展开进一步研究的资源。"
      },
      "翠绿闲庭庇护者": {
        english: "Emerald Enclave Caretaker",
        abilities: ["体质", "智力", "感知"],
        feat: "翠绿闲庭新羽",
        skills: ["自然", "求生"],
        tool: "草药工具",
        equipment: "选择A或B：（A）短弓、20支箭、草药工具、铺盖、毯子、小包、帐篷、旅行服装、13GP；或（B）50GP。",
        description: "作为一位翠绿闲庭庇护者，你悉心地照顾着那些对世间充满了关爱的人。你或是通过陪同翠绿闲庭成员，或是自行摸索，学会了生活在这片大地上所需的关键技巧：如何追捕猎物，到哪里去搜寻有用的药草，甚至如何预测天气。你运用这些才赋维持文明与荒野的平衡，以及消灭世上的非自然生物。"
      },
      "竖琴手": {
        english: "Harper",
        abilities: ["敏捷", "智力", "魅力"],
        feat: "竖琴手特工",
        skills: ["表演", "巧手"],
        tool: "易容工具",
        equipment: "选择A或B：（A）易容工具、铺盖、戏服、爪钩、绳索、旅行服装、14GP；或（B）50GP。",
        description: "你收到一封加入竖琴手的邀请函，从此立下誓言拥护竖琴手的行为准则并为服务公共利益而行动。与所有竖琴手一样，你理解团队协作的价值，也明白什么时候独自行动最为合适。资历丰富的竖琴手向你传授了竖琴手的秘密——那些魔法旋律，特殊暗号，以及一些花招诈术——并将利用这些知识以监视并削弱邪恶力量的重任托付给了你。"
      },
      "臂铠骑士": {
        english: "Knight of the Gauntlet",
        abilities: ["力量", "智力", "感知"],
        feat: "新锻臂铠",
        skills: ["运动", "医药"],
        tool: "铁匠工具",
        equipment: "选择A或B：（A）矛、铁匠工具、牛眼提灯、圣徽、镣铐、燃油（5瓶）、火绒盒、旅行服装、9GP；或（B）50GP。",
        description: "并非所有回应更加强大力量召唤之人都甘心于待在沉闷的神庙后殿里面苦苦钻研经文。你以加入臂铠骑士团的方式走上了神圣武者的道路。作为一位臂铠骑士，你对邪恶力量报以正义的轻蔑，将坚定不移的同志视为携手并肩的骨肉同胞，并对战争的幸存者抱以由衷的怜悯。武器与圣徽在手，你发誓永不停歇，直至正义的光芒驱散费伦大陆上每一片混沌的阴影。"
      },
      "领主联盟臣属": {
        english: "Lords' Alliance Vassal",
        abilities: ["力量", "智力", "魅力"],
        feat: "领主联盟特工",
        skills: ["洞悉", "游说"],
        tool: "书法工具",
        equipment: "选择A或B：（A）2支标枪、书法工具、高档服装、墨水、5支墨水笔、羊皮纸（9张）、13GP；或（B）50GP。",
        description: "你向领主联盟的其中一个加盟城镇宣誓效忠。作为一位联盟特工，你必须拥护联盟的信条并致力于提高剑湾的安全与繁荣程度。你发誓要为自己的领主带来辉煌与荣耀，既可以指的是为深水城的商业领主保护商路，也可以是指消灭匕首滩上游的怪物。无论是用剑的艺术还是治理城邦的艺术，你都早已训练掌握，你挥舞利剑就宛如挥舞羽毛一般灵巧。"
      },
      "紫龙骑士侍从": {
        english: "Purple Dragon Squire",
        abilities: ["力量", "感知", "魅力"],
        feat: "紫龙新兵",
        skills: ["驯兽", "洞悉"],
        tool: "领航工具",
        equipment: "选择A或B：（A）矛、领航工具、高档服装、9GP；或（B）50GP。",
        description: "你将自己的生命献给了维护科米尔Cormyr的安全，并渴望加入当地的精英骑士团体：紫龙骑士团。但在你正式加入紫龙骑士团之前，你必须先担任骑士侍从。你找到了一位愿意提携你并将骑士团的信条教授于你的领主。你愿意拥护紫龙骑士团荣耀、辉煌与力量的理念，并证明自己有成为骑士的资格吗？"
      },
      "散塔林会佣兵": {
        english: "Zhentarim Mercenary",
        abilities: ["力量", "敏捷", "魅力"],
        feat: "散塔林会暴徒",
        skills: ["威吓", "察觉"],
        tool: "文书伪造工具",
        equipment: "选择A或B：（A）短棒、匕首、文书伪造工具、高档服装、附盖提灯、燃油（3瓶）、2个小包、细线、火绒盒、11GP；或（B）50GP。",
        description: "或许是你需要钱。或许是你渴望加入某个大家庭，无论它有多么可疑。又或许你只是擅长为达成目的而不择手段。无论理由如何，总之你加入了散塔林会，这个整个国度最为臭名昭著的雇佣兵协会。虽然散塔林会的领袖宣称该组织比起幕后财团更像是一个大家庭，但很少会有家庭展现出像这个家庭一样这么多的尔虞我诈、任人唯亲、贪污腐败现象。你磨砺着自己的狡诈与反应能力，并矢志于提升在协会内的地位。"
      },
      "咒火学徒": {
        english: "Spellfire Initiate",
        abilities: ["体质", "智力", "魅力"],
        feat: "咒火火花",
        skills: ["奥秘", "察觉"],
        tool: "自选一套赌具",
        equipment: "选择A或B：（A）赌具（同上所选）、奥术法器（水晶或魔杖）、2个小包、旅行服装、36GP；或（B）50GP。",
        description: "你身上具有咒火的天赋：一种稀有的魔法形式，能够引导魔网的原始力量。操纵咒火会对身体造成很重的负担。因此你锻炼了自己的身心，以此来更有效地操纵这股神圣的力量。"
      },
      "第九翎羽特工": {
        english: "Agent of the Ninth Quill",
        abilities: ["敏捷", "智力", "魅力"],
        feat: "奥法渗透者",
        skills: ["奥秘", "巧手"],
        tool: "盗贼工具",
        equipment: "选择A或B：（A）匕首、轻锤、盗贼工具、铁钉、绳索、旅行服装、17GP；或（B）50GP",
        description: "你敏锐的头脑和高超的盗窃技巧，让你结识并加入了第九翎羽——一个由盗贼、破坏者和间谍组成的团体，专门从他人手中窃取魔法学识与圣物。在你的冒险生涯中——从盗取魔法物品和奥术典籍，到破坏法师团体的行动——你磨砺出了狡诈的技巧与魔法戏法，从而让你的谍报手腕更进一步。"
      },
      "瑰宝秘社间谍": {
        english: "Bejeweled Conclave Spy",
        abilities: ["敏捷", "感知", "魅力"],
        feat: "奥法雄辩家",
        skills: ["欺瞒", "察觉"],
        tool: "易容工具",
        equipment: "选择A或B：（A）易容工具、高档服装、香水、5GP；或（B）50GP",
        description: "在公开场合，你是一名朝臣、调停者或艺人。然而，在那光鲜亮丽的外表之下，却隐藏着一颗专为刺探秘密而千锤百炼出的敏锐心智。经过瑰宝秘社惑控师们的训练，你深谙如何运用自身的魅力与机智，再加上一点小小的魔法，来渗透组织、发掘情报以及促成交易。"
      },
      "寰宇黎明实验体": {
        english: "Cosmic Dawn Experiment",
        abilities: ["力量", "敏捷", "体质"],
        feat: "万化本质",
        skills: ["运动", "求生"],
        tool: "选择一种工匠工具",
        equipment: "选择A或B：（A）工匠工具（与上述相同）、背包、长袍、旅行服装、30GP；或（B）50GP",
        description: "你的躯体因寰宇黎明使徒会的变化系魔法实践而发生了扭曲。也许你是意外被卷入了该组织的某场实验，又或者你本就是其中的一员，妄图借助魔法伟力来升华自己的物理形态。无论情况如何，你都能将这奇异的躯体化作自己的优势。"
      },
      "亡陵誓盟新晋者": {
        english: "Covenant of the Grave Recruit",
        abilities: ["力量", "智力", "感知"],
        feat: "奥法殡葬师",
        skills: ["历史", "医药"],
        tool: "草药工具",
        equipment: "选择A或B：（A）匕首、草药工具、书籍（解剖学）、铁锹、16GP；或（B）50GP",
        description: "死亡始终令你深深着迷。你曾与亡陵誓盟的成员们一道钻研这一阴郁的课题，以科学般的严谨态度去剖析那些可怖之物。借由这些研究，你积累了丰富的药物学、死灵术以及历史学识。"
      },
      "熔炉追风者": {
        english: "Crucible Storm Chaser",
        abilities: ["力量", "体质", "智力"],
        feat: "奥法超负荷",
        skills: ["运动", "自然"],
        tool: "玻璃匠工具",
        equipment: "选择A或B：（A）玻璃匠工具、背包、绳索、旅行服装、15GP；或（B）50GP",
        description: "你天生的冒险精神与对刺激的渴望，使你加入了熔炉司守——一个致力于研究自然与魔法灾害的组织。从把玩熔融的玻璃，到冲入飓风的风眼，当灾难近在咫尺时，你反而能够大放异彩。"
      },
      "魔宠训练家": {
        english: "Familiar Trainer",
        abilities: ["体质", "智力", "感知"],
        feat: "魔宠密友",
        skills: ["驯兽", "奥秘"],
        tool: "选择一种赌具",
        equipment: "选择A或B：（A）长棍、赌具（与上述相同）、铺盖、铃铛、细线、火绒盒、旅行服装、水袋、44GP；或（B）50GP",
        description: "一只魔法宠物在你年幼时与你结下羁绊，陪伴你度过整个青春岁月。如今，你已经无法想象没有这个毛茸茸——或羽翼丰满、鳞甲覆盖、黏滑湿润——的朋友陪伴的生活。你学会了与你的魔宠协同行动，而当冒险带来挑战时，你的伙伴总会提醒你留意生活中的那些小确幸。"
      },
      "织界者门徒": {
        english: "Horizon Weaver Initiate",
        abilities: ["敏捷", "体质", "感知"],
        feat: "穿界者",
        skills: ["特技", "生存"],
        tool: "织布工具",
        equipment: "选择A或B：（A）短弓、20支箭、织布工具、地图、箭袋、绳索、旅行服装、18GP；或（B）50GP",
        description: "难以抑制的远行渴望，是你青春期最鲜明的特点。只要能力所及，你便离开家乡踏上旅途。在旅途中，你遇到了织界者中那些富有冒险精神的咒法师，他们传授了你部分传送魔法，使你的探索之路能够延伸得更远。"
      },
      "幻影马戏团艺人": {
        english: "Phantasmic Circus Trouper",
        abilities: ["敏捷", "体质", "魅力"],
        feat: "奥法艺术家",
        skills: ["欺瞒", "表演"],
        tool: "易容工具",
        equipment: "选择A或B：（A）易容工具、赌具（任意）、戏服、镜子、旅行服装、12GP；或（B）50GP",
        description: "无论是作为表演者还是幕后工作人员，你都在幻影马戏团成员中找到了归属。在你周游世界、为激动的观众带去魔法与奇观的过程中，你学习了一些幻术魔法，并磨炼了自己表演与错引方面的天赋。"
      },
      "先知学徒": {
        english: "Seer Apprentice",
        abilities: ["智力", "感知", "魅力"],
        feat: "奥法预言家",
        skills: ["历史", "洞悉"],
        tool: "领航工具",
        equipment: "选择A或B：（A）领航工具、8根蜡烛、墨水、墨水笔、羊皮纸（9张）、小包、火绒盒、旅行服装、11GP；或（B）50GP",
        description: "作为沧穹先知会中的一名学徒，你学会了解读天穹云层与幽深沧海中蕴含的微小预兆。该组织庞大的图书馆网络进一步拓展了你的学识，如今你周游世界，为他人提供指引与援助。"
      },
      "庇护之手受护者": {
        english: "Ward of the Sheltering Hands",
        abilities: ["体质", "感知", "魅力"],
        feat: "奥法护佑者",
        skills: ["洞悉", "医药"],
        tool: "厨师工具",
        equipment: "选择A或B：（A）厨师工具、毯子、医疗包、油灯、燃油（3扁瓶）、火绒盒、旅行服装、水袋、40GP；或（B）50GP",
        description: "命运的一次转折将你带到了庇护之手——一个致力于保护弱势群体的无私组织。该组织帮助你重新站稳脚跟，并传授了你一些防护魔法，希望有一天，你也能在那些不幸之人需要帮助时，为他们提供庇护。"
      },
      "洛温专家": {
        english: "Lorwyn Expert",
        abilities: ["力量", "体质", "感知"],
        feat: "骄阳之子",
        skills: ["运动", "自然"],
        tool: "制图工具",
        equipment: "选择A或B：（A）长棍、制图工具、背包、篮子、羊皮纸（4张）、绳索、旅行服装、29GP；或（B）50GP",
        description: "你来自洛温——一片永沐阳光的土地，或是对此地有过深入研究。你将艾尔杜这一崇高的存在视作太阳的化身，且热衷于踏上奇幻冒险。你珍视所爱之人，即便这份联系仅存于情感层面，因为你曾目睹一些人踏入暗影荒原或更遥远之地后，变得如褪色般失去了自我。尽管如此，你依旧勇敢无畏，始终渴望新的体验。"
      },
      "影原专家": {
        english: "Shadowmoor Expert",
        abilities: ["敏捷", "智力", "魅力"],
        feat: "影原咒者",
        skills: ["特技", "欺瞒"],
        tool: "玻璃匠工具",
        equipment: "选择A或B：（A）匕首、玻璃匠工具、背包、捕猎陷阱 、油灯、燃油（3扁瓶）、旅行服装、水袋、8GP；或（B）50GP",
        description: "你来自暗影荒原，或是对此地进行了多年研究。这是一片阴暗的混乱之地，唯有苍白的月光永恒映照。你或许凭借机智与狡黠在暗影荒原的严酷环境中生存下来，又或许依靠强健的体魄与无畏的勇气击退威胁。无论你身处何方，你都明白友谊是何等稀缺之物。你认为，判断该信任谁、又该与谁保持距离，这不仅仅是务实之举——往往更是关乎生死的要事。"
      },
      "狂欢客": {
        english: "Carouser",
        abilities: ["敏捷", "智力", "魅力"],
        feat: "无休狂宴",
        skills: ["欺瞒", "游说"],
        tool: "选择一种赌具",
        equipment: "选择A或B：（A）匕首、赌具（同上所选）、高档服装、玻璃瓶、镜子、香水、小包、火绒盒、19GP；或（B）50GP。",
        description: "你在博德之门这类大都市的繁华中心长大成人。无数个夜晚，你流连于酒馆、戏院、厅堂和赌场，尽情享受这座城市所能提供的一切。你天生擅长与人打交道，无论是通过千金豪赌，还是参加高档的社交晚会，都能轻松探得他人的秘密。或许你曾被一家或好几家场所赶出去过，但赶你的人不过是些不懂得寻欢作乐的家伙罢了。"
      },
      "吸血鬼皈依者": {
        english: "Vampire Devotee",
        abilities: ["力量", "体质", "魅力"],
        feat: "吸血鬼玩物",
        skills: ["游说", "隐匿"],
        tool: "厨师工具",
        equipment: "选择A或B：（A）厨师工具、高档服装、2个玻璃瓶、医疗包、香水、油灯、燃油（3扁瓶）、水袋、19GP；或（B）50GP。",
        description: "你曾为一名吸血鬼或一个小聚居地的数个吸血鬼效力。那些亡灵吸食你鲜血的次数，多到你都数不清。你或许曾自愿为他们服务，甚至可能怀揣着自己有朝一日也能成为吸血鬼的野心。你也可能被魔法魅惑了，对于自己身为血仆的那段日子，只留下了一些模糊混乱的记忆。但无论如何，你在吸血鬼巢穴里的那段日子已经结束了。"
      },
      "吸血鬼幸存者": {
        english: "Vampire Survivor",
        abilities: ["敏捷", "体质", "感知"],
        feat: "吸血鬼猎人",
        skills: ["洞悉", "宗教"],
        tool: "木雕工具",
        equipment: "选择A或B：（A）木雕工具、撬棍、附盖提灯、圣徽（圣物匣）、圣水、镜子、燃油（3扁瓶）、火绒盒、旅行服装、水袋、4GP；或（B）50GP。",
        description: "你曾目睹或幸免于一场吸血鬼的袭击。你或许直接参与了那场冲突，又或许只是被眼前的恐怖景象吓得呆立当场。但无论如何，你始终对怪物的袭击保持警惕，并以自己能随时应对任何状况为傲。绝不会再有吸血鬼能出其不意地袭击你或你的同伴了。"
      },
      "噩梦缠身者": {
        english: "Haunted One",
        abilities: ["体质", "感知", "魅力"],
        feat: "幸存者或一项由你选择的黑暗赠礼专长",
        skills: ["奥秘", "求生"],
        tool: "选择一种赌具",
        equipment: "选择A或B：（A）赌具（同上）、撬棍、圣水（1扁瓶）、镜子、燃油（2扁瓶）、信号笛、火绒盒、旅行服装，五支火把、水袋以及14GP；或（B）50GP。",
        description: "你始终被过去的阴霾所纠缠。无论那是一场孤立的惨剧，还是无数痛苦瞬间的堆叠，那些降临在你身上的遭遇已经化作了无法撼动的重担。你曾试图将其深埋心底并仓皇逃离，却终是徒劳；它无法被利刃斩杀，也无法被魔法放逐。尽管如此，你依然继续前行。"
      },
      "调查员": {
        english: "Investigator",
        abilities: ["智力", "感知", "魅力"],
        feat: "锐眼或一项由你选择的黑暗赠礼专长",
        skills: ["洞悉", "调查"],
        tool: "易容工具",
        equipment: "选择A或B：（A） 易容工具、镣铐、铲子、旅行服装、三个小瓶以及16GP；或（B）50GP。",
        description: "你不懈地追寻着真相。也许你曾目睹过某种超常或恐怖的事物，如今只渴望揭开它的终极谜团；又或者，你是被世俗的公理与正义所驱使寻求真相。无论你所卷入的案件是纯粹的地方犯罪，还是骇人的怪异阴谋，你都被一种强烈的冲动所支配，想要去揭露那些被他人极力掩藏的秘密。"
      },
      "迷雾漫游者": {
        english: "Mist Wanderer",
        abilities: ["敏捷", "体质", "感知"],
        feat: "一项由你选择的黑暗赠礼专长",
        skills: ["求生", "隐匿"],
        tool: "选择一种工匠工具",
        equipment: "选择A或B：（A）工匠工具（同上）、油灯、燃油（5扁瓶）、小包、绳索、火绒盒、旅行服装以及30GP；或（B）50GP。",
        description: "你曾拥有一个熟悉的家园。直到某一天，诡异的迷雾升腾而起，将你卷入了一处恐惧领域。自那以后，你便在各个领域间流浪，在变幻莫测的迷雾中艰难跋涉，只为寻找那遥不可及的归途。在这些被诅咒的界域里度过的岁月已经彻底改变了你，但你仍在迷雾各处的流浪者聚落中找到了些许慰藉。"
      },
      "降灵师": {
        english: "Spirit Medium",
        abilities: ["体质", "智力", "感知"],
        feat: "一项由你选择的黑暗赠礼专长",
        skills: ["洞悉", "宗教"],
        tool: "选择一种赌具",
        equipment: "选择A或B：（A）匕首、赌具（同上）、篮子、铃铛、8根蜡烛、墨水、墨水笔、纸（5张）、火绒盒、旅行服装以及32GP；或（B）50GP。",
        description: "通过奇诡的仪式与宿命般的遭遇，你发觉自己与那些死者和受诅者的灵魂之间，存在着某种极为独特的链接。你的肉身化作了导引这些灵体的灵媒，它们则赐予你来自彼岸的洞察。然而，这些怨魂的意图并不总是那么纯粹，它们赐下的恩惠往往伴随着挥之不去的骇人代价。"
      },
    };

    function populateClassSelect(select, noneLabel) {
      const previousValue = select.value;
      select.replaceChildren();
      if (noneLabel) {
        const none = document.createElement("option");
        none.value = "";
        none.textContent = noneLabel;
        select.appendChild(none);
      }
      const appendGroup = (label, names) => {
        const group = document.createElement("option");
        group.value = "";
        group.textContent = label;
        group.disabled = true;
        select.appendChild(group);
        for (const className of names) {
          const option = document.createElement("option");
          option.value = className;
          option.textContent = className;
          select.appendChild(option);
        }
      };
      appendGroup("—核心职业—", coreClassNames);
      appendGroup("—第三方职业—", thirdPartyClassNames);
      appendGroup("—其他—", []);

      const custom = document.createElement("option");
      custom.value = CUSTOM_VALUE;
      custom.textContent = "自定义";
      select.appendChild(custom);

      if (previousValue && [...select.options].some((option) => option.value === previousValue)) {
        select.value = previousValue;
      }
    }

    function getLevel(input) {
      const value = Number(input.value);
      return Number.isInteger(value) && value >= 1 && value <= 20 ? value : null;
    }

    function normalizeLevel(input) {
      const value = Number(input.value);
      const normalized = Number.isFinite(value)
        ? Math.min(20, Math.max(1, Math.round(value)))
        : 1;
      input.value = String(normalized);
      return normalized;
    }

    function clampLevelInput(input) {
      const match = input.value.trim().match(/^\d{0,2}/);
      const digits = match ? match[0] : "";
      input.value = digits;

      if (digits === "") return;
      const value = Number(digits);
      if (value > 20) input.value = "20";
      else if (value < 1) input.value = "1";
    }

    function syncSelectEmpty(select) {
      select.classList.toggle("is-empty", !select.value);
    }

    function emptySubclass(select, label, disabled) {
      select.replaceChildren();
      const option = document.createElement("option");
      option.value = "";
      option.textContent = label;
      select.appendChild(option);
      select.value = "";
      select.disabled = disabled;
      syncSelectEmpty(select);
    }

    function updateSubclassFor(classSelect, levelField, subclassField, preserve) {
      const className = classSelect.value;
      const level = getLevel(levelField);
      if (preserve && subclassField.value) {
        subclassField.dataset.lastValue = subclassField.value;
      }
      if (!preserve) subclassField.dataset.lastValue = "";
      const previous = preserve
        ? (subclassField.dataset.lastValue || subclassField.value)
        : "";

      if (subclassField === subclassSelect && !preserve) {
        customSubclassInput.value = "";
      }

      if (!className) {
        emptySubclass(subclassField, "—", true);
        syncSubclassCustomUI();
        updateSummary();
        return;
      }

      const subclassEntries = subclassCatalog[className] || [];
      const subclasses = subclassMap[className] || [];
      subclassField.replaceChildren();
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = level !== null && level >= 3 ? "请选择" : "—";
      subclassField.appendChild(placeholder);

      for (const [name, source = ""] of subclassEntries) {
        const option = document.createElement("option");
        option.value = name;
        option.dataset.baseLabel = name;
        option.dataset.fullLabel = subclassOptionLabel(name, source);
        option.textContent = option.dataset.fullLabel;
        subclassField.appendChild(option);
      }

      if (subclassField === subclassSelect) {
        const customOption = document.createElement("option");
        customOption.value = CUSTOM_VALUE;
        customOption.textContent = "自定义";
        subclassField.appendChild(customOption);
      }

      subclassField.disabled = false;
      subclassField.value = previous === CUSTOM_VALUE ||
        (previous && subclasses.includes(previous))
        ? previous
        : "";
      syncSelectEmpty(subclassField);
      syncSubclassOptionLabels(subclassField);
      if (subclassField === subclassSelect) syncSubclassCustomUI();
      updateSummary();
    }

    function setSubclassMuted(control, muted) {
      if (!control) return;
      control.classList.toggle("subclass-under-level", muted);
      const wrapper = control.closest(".field-control") || control.parentElement;
      if (wrapper) wrapper.classList.toggle("subclass-under-level", muted);
    }

    function updateSubclassLevelColor() {
      const mainLevel = getLevel(levelInput);
      setSubclassMuted(subclassSelect, mainLevel !== null && mainLevel < 3);
      setSubclassMuted(customSubclassInput, mainLevel !== null && mainLevel < 3);

      for (const row of getExtraMultiRows()) {
        const level = getLevel(row.querySelector(".profession-row-level"));
        setSubclassMuted(row.querySelector(".profession-row-subclass"), level !== null && level < 3);
      }
    }

    function highlightTerms(root) {
      const test = /英雄激励|黑暗视觉|附赠动作|长休|明亮光照|临时生命值|恐慌|中毒|抗性|优势|躲藏|疾走/;
      const split = /(英雄激励|黑暗视觉|附赠动作|长休|明亮光照|临时生命值|恐慌|中毒|抗性|优势|躲藏|疾走)/g;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !test.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          if (node.parentElement && node.parentElement.closest("b, strong, .term-green")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      const nodes = [];
      let current;
      while ((current = walker.nextNode())) nodes.push(current);

      for (const node of nodes) {
        const text = node.nodeValue;
        const fragment = document.createDocumentFragment();
        let last = 0;

        for (const match of text.matchAll(split)) {
          if (match.index > last) {
            fragment.appendChild(document.createTextNode(text.slice(last, match.index)));
          }
          const term = document.createElement("span");
          term.className = "term-green";
          term.textContent = match[0];
          fragment.appendChild(term);
          last = match.index + match[0].length;
        }

        if (last < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(last)));
        }
        node.replaceWith(fragment);
      }
    }

    function isCustomRace() {
      return raceSelect.value === CUSTOM_VALUE;
    }

    function currentRaceName() {
      return isCustomRace() ? (customRaceInput.value.trim() || "自定义种族") : raceSelect.value;
    }

    function syncRaceCustomUI() {
      const custom = isCustomRace();
      raceSelect.hidden = custom;
      customRaceInput.hidden = !custom;
      raceReset.hidden = !custom;
      customRaceEditor.hidden = !custom;
      raceTraitsBox.hidden = custom;
      if (custom) subraceField.hidden = true;
    }

    function updateSubrace() {
      if (isCustomRace()) {
        subraceField.hidden = true;
        subraceSelect.replaceChildren();
        subraceSelect.value = "";
        subraceSelect.classList.remove("is-empty");
        return;
      }

      const options = subraceMap[raceSelect.value] || [];

      if (!options.length) {
        subraceField.hidden = true;
        subraceSelect.replaceChildren();
        subraceSelect.value = "";
        subraceSelect.classList.remove("is-empty");
        return;
      }

      subraceField.hidden = false;
      subraceSelect.replaceChildren();

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "请选择";
      subraceSelect.appendChild(placeholder);

      for (const name of options) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        subraceSelect.appendChild(option);
      }

      subraceSelect.value = "";
      subraceSelect.classList.add("is-empty");
    }

    function renderRaceTraits() {
      if (isCustomRace()) {
        raceTraitsBox.hidden = true;
        customRaceEditor.hidden = false;
        return;
      }

      raceTraitsBox.hidden = false;
      customRaceEditor.hidden = true;
      const race = raceSelect.value;
      raceTraitsBox.innerHTML = raceTraits[race] || "";
      highlightTerms(raceTraitsBox);
    }

    function isValidAppearanceImageSource(src) {
      return typeof src === "string" &&
        /^data:image\/(png|jpeg|webp);base64,/i.test(src);
    }

    function getAppearanceImageBaseSize() {
      const frameWidth = appearanceImageFrame.clientWidth;
      const frameHeight = appearanceImageFrame.clientHeight;
      if (!frameWidth || !frameHeight) return { width: 0, height: 0 };

      const naturalWidth = appearanceImage.naturalWidth;
      const naturalHeight = appearanceImage.naturalHeight;
      if (!naturalWidth || !naturalHeight) {
        return { width: frameWidth, height: frameHeight };
      }

      const frameRatio = frameWidth / frameHeight;
      const imageRatio = naturalWidth / naturalHeight;
      if (imageRatio > frameRatio) {
        const height = frameHeight;
        return { width: height * imageRatio, height };
      }
      const width = frameWidth;
      return { width, height: width / imageRatio };
    }

    function clampAppearanceImageTransform() {
      const frameWidth = appearanceImageFrame.clientWidth;
      const frameHeight = appearanceImageFrame.clientHeight;
      if (!frameWidth || !frameHeight) return;

      const base = getAppearanceImageBaseSize();
      const scale = Math.min(4, Math.max(0.2, Number(appearanceImageState.scale) || 1));
      const maxX = Math.max(0, (base.width * scale - frameWidth) / 2);
      const maxY = Math.max(0, (base.height * scale - frameHeight) / 2);
      appearanceImageState.scale = scale;
      appearanceImageState.offsetX = Math.min(maxX, Math.max(-maxX, Number(appearanceImageState.offsetX) || 0));
      appearanceImageState.offsetY = Math.min(maxY, Math.max(-maxY, Number(appearanceImageState.offsetY) || 0));
    }

    function applyAppearanceImageTransform() {
      const base = getAppearanceImageBaseSize();
      const scale = appearanceImageState.scale;
      if (base.width && base.height) {
        appearanceImage.style.width = `${base.width * scale}px`;
        appearanceImage.style.height = `${base.height * scale}px`;
      }
      appearanceImage.style.transform =
        `translate(-50%, -50%) translate(${appearanceImageState.offsetX}px, ${appearanceImageState.offsetY}px)`;
    }

    function renderAppearanceImage() {
      if (!appearanceImageState.src) {
        appearanceImageFrame.hidden = true;
        appearanceImage.removeAttribute("src");
        return;
      }

      appearanceImageFrame.hidden = false;
      if (appearanceImage.getAttribute("src") !== appearanceImageState.src) {
        appearanceImage.src = appearanceImageState.src;
      }
      clampAppearanceImageTransform();
      applyAppearanceImageTransform();
    }

    function restoreAppearanceImage(data) {
      if (!data || !isValidAppearanceImageSource(data.src)) {
        appearanceImageState.src = "";
        appearanceImageState.scale = 1;
        appearanceImageState.offsetX = 0;
        appearanceImageState.offsetY = 0;
        renderAppearanceImage();
        return;
      }

      appearanceImageState.src = data.src;
      appearanceImageState.scale = Number(data.scale) || 1;
      appearanceImageState.offsetX = Number(data.offsetX) || 0;
      appearanceImageState.offsetY = Number(data.offsetY) || 0;
      renderAppearanceImage();
    }

    function clearAppearanceImage() {
      appearanceImageState.src = "";
      appearanceImageState.scale = 1;
      appearanceImageState.offsetX = 0;
      appearanceImageState.offsetY = 0;
      renderAppearanceImage();
      scheduleBuilderSave();
    }

    function readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(reader.error || new Error("读取图片失败。"));
        reader.readAsDataURL(file);
      });
    }

    async function handleAppearanceImageFile(file) {
      if (!file) return;
      const type = (file.type || "").toLowerCase();
      const extensionMatches = /\.(png|jpe?g|webp)$/i.test(file.name || "");
      if (!["image/png", "image/jpeg", "image/webp"].includes(type) &&
          !(type === "" && extensionMatches)) {
        window.alert("请选择 PNG、JPG 或 WebP 图片。");
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        window.alert("图片不能超过 8MB。");
        return;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);
        const image = new Image();
        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = () => reject(new Error("无法解析这张图片。"));
          image.src = dataUrl;
        });

        const maxSize = 1600;
        const ratio = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        let source = canvas.toDataURL("image/webp", 0.86);
        if (!source.startsWith("data:image/webp")) {
          context.fillStyle = "#fff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          source = canvas.toDataURL("image/jpeg", 0.88);
        }

        appearanceImageState.src = source;
        appearanceImageState.scale = 1;
        appearanceImageState.offsetX = 0;
        appearanceImageState.offsetY = 0;
        renderAppearanceImage();
        scheduleBuilderSave();
      } catch (error) {
        window.alert(error.message || "图片导入失败。");
      } finally {
        appearanceImageFile.value = "";
      }
    }

    let appearancePointers = new Map();
    let appearanceDrag = null;
    let appearancePinch = null;

    function setupAppearanceImageInteraction() {
      appearanceImage.addEventListener("load", () => {
        clampAppearanceImageTransform();
        applyAppearanceImageTransform();
      });

      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(() => {
          if (!appearanceImageState.src) return;
          clampAppearanceImageTransform();
          applyAppearanceImageTransform();
        }).observe(appearanceImageFrame);
      }

      appearanceImageImport.addEventListener("click", () => appearanceImageFile.click());
      appearanceImageFile.addEventListener("change", () => {
        const file = appearanceImageFile.files && appearanceImageFile.files[0];
        handleAppearanceImageFile(file);
      });
      appearanceImageRemove.addEventListener("click", clearAppearanceImage);

      appearanceImageFrame.addEventListener("pointerdown", (event) => {
        if (!appearanceImageState.src) return;
        if (event.target.closest(".appearance-image-remove")) return;

        const frameRect = appearanceImageFrame.getBoundingClientRect();
        const nearResizeHandle =
          event.clientX >= frameRect.right - 24 &&
          event.clientY >= frameRect.bottom - 24;
        if (nearResizeHandle) return;

        event.preventDefault();
        appearanceImageFrame.setPointerCapture(event.pointerId);
        appearancePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (appearancePointers.size === 1) {
          appearanceDrag = {
            startX: event.clientX,
            startY: event.clientY,
            startOffsetX: appearanceImageState.offsetX,
            startOffsetY: appearanceImageState.offsetY
          };
          appearancePinch = null;
        } else if (appearancePointers.size === 2) {
          const points = [...appearancePointers.values()];
          appearancePinch = {
            distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y),
            scale: appearanceImageState.scale
          };
          appearanceDrag = null;
        }
      });

      appearanceImageFrame.addEventListener("pointermove", (event) => {
        if (!appearancePointers.has(event.pointerId)) return;
        appearancePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (appearancePointers.size >= 2 && appearancePinch) {
          const points = [...appearancePointers.values()];
          const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
          appearanceImageState.scale = appearancePinch.scale * (distance / appearancePinch.distance);
          clampAppearanceImageTransform();
          applyAppearanceImageTransform();
        } else if (appearanceDrag) {
          appearanceImageState.offsetX = appearanceDrag.startOffsetX + event.clientX - appearanceDrag.startX;
          appearanceImageState.offsetY = appearanceDrag.startOffsetY + event.clientY - appearanceDrag.startY;
          clampAppearanceImageTransform();
          applyAppearanceImageTransform();
        }
      });

      const endPointer = (event) => {
        appearancePointers.delete(event.pointerId);
        if (appearancePointers.size < 2) appearancePinch = null;
        if (appearancePointers.size === 1) {
          const point = [...appearancePointers.values()][0];
          appearanceDrag = {
            startX: point.x,
            startY: point.y,
            startOffsetX: appearanceImageState.offsetX,
            startOffsetY: appearanceImageState.offsetY
          };
        } else if (appearancePointers.size === 0) {
          appearanceDrag = null;
        }
        scheduleBuilderSave();
      };

      appearanceImageFrame.addEventListener("pointerup", endPointer);
      appearanceImageFrame.addEventListener("pointercancel", endPointer);

      appearanceImageFrame.addEventListener("wheel", (event) => {
        if (!appearanceImageState.src) return;
        event.preventDefault();
        const factor = event.deltaY < 0 ? 1.08 : 0.92;
        appearanceImageState.scale *= factor;
        clampAppearanceImageTransform();
        applyAppearanceImageTransform();
        scheduleBuilderSave();
      }, { passive: false });

      window.addEventListener("resize", () => {
        if (!appearanceImageState.src) return;
        clampAppearanceImageTransform();
        applyAppearanceImageTransform();
      });
    }

    function renderBackgroundTraits() {
      const value = backgroundSelect.value;

      if (!value) {
        backgroundTraitsBox.hidden = true;
        customBackgroundEditor.hidden = true;
        return;
      }

      if (value === "自定义背景") {
        backgroundTraitsBox.hidden = true;
        customBackgroundEditor.hidden = false;
        return;
      }

      const data = backgroundData[value];
      if (!data) {
        backgroundTraitsBox.hidden = true;
        customBackgroundEditor.hidden = true;
        return;
      }

      const abilities = Array.isArray(data.abilities) ? data.abilities.join("、") : data.abilities;
      const skills = Array.isArray(data.skills) ? data.skills.join("、") : data.skills;

      customBackgroundEditor.hidden = true;
      backgroundTraitsBox.hidden = false;
      backgroundTraitsBox.innerHTML = `<b class="maroon">${value} ${data.english}</b><br>
<b>属性值：</b>${abilities}<br>
<b>起源专长：</b>${data.feat}<br>
<b>技能熟练：</b>${skills}<br>
<b>工具熟练：</b>${data.tool}<br>
<b>装备：</b>${data.equipment}<br><br>
${data.description}`;
      highlightTerms(backgroundTraitsBox);
    }

    function getAlignmentAxes(alignment) {
      if (!alignment) return [];
      const axes = [];
      if (alignment.includes("守序")) axes.push("守序");
      else if (alignment.includes("混乱")) axes.push("混乱");
      else axes.push("中立");

      if (alignment.includes("善良")) axes.push("善良");
      else if (alignment.includes("邪恶")) axes.push("邪恶");
      else axes.push("中立");

      return [...new Set(axes)];
    }

    function getStandardTraitTables(background, trait) {
      const candidates = trait === "personality"
        ? [`个性_${background}`, `特点_${background}`]
        : trait === "ideal"
          ? [`理念_${background}`]
          : trait === "bond"
            ? [`牵绊_${background}`]
            : [`缺点_${background}`, `缺陷_${background}`];
      return candidates.filter((key) => Array.isArray(adventureTraits[key]));
    }

    function getAllTraitTables(trait) {
      return Object.keys(adventureTraits)
        .filter((key) => {
          if (trait === "personality") {
            return key.startsWith("自定义背景_个性特点_") ||
              key.startsWith("个性_") || key.startsWith("特点_");
          }
          if (trait === "ideal") {
            return key.startsWith("自定义背景_理念_") || key.startsWith("理念_");
          }
          if (trait === "bond") {
            return key === "自定义背景_牵绊" || key.startsWith("牵绊_");
          }
          return key === "自定义背景_缺陷" ||
            key.startsWith("缺点_") || key.startsWith("缺陷_");
        })
        .flatMap((key) => adventureTraits[key]);
    }

    function getCustomTraitTables(trait, alignment) {
      const axes = alignment ? getAlignmentAxes(alignment) : [];
      const customKeys = [];
      if (trait === "personality") {
        customKeys.push("自定义背景_个性特点_任意阵营");
        for (const axis of axes) customKeys.push(`自定义背景_个性特点_仅${axis}阵营`);
      } else if (trait === "ideal") {
        customKeys.push("自定义背景_理念_任意阵营");
        for (const axis of axes) customKeys.push(`自定义背景_理念_仅${axis}阵营`);
      } else if (trait === "bond") {
        customKeys.push("自定义背景_牵绊");
      } else {
        customKeys.push("自定义背景_缺陷");
      }

      return [...new Set(
        customKeys
          .filter((key) => Array.isArray(adventureTraits[key]))
          .flatMap((key) => adventureTraits[key])
      )];
    }

    function getTraitTables(trait) {
      const background = backgroundSelect.value;
      const alignment = alignmentSelect.value;
      if (!background) {
        return [...new Set(getAllTraitTables(trait))];
      }

      if (background !== "自定义背景") {
        const standardTables = getStandardTraitTables(background, trait);
        if (standardTables.length) {
          return [...new Set(standardTables.flatMap((key) => adventureTraits[key]))];
        }
      }

      return getCustomTraitTables(trait, alignment);
    }

    function updateTraitRandomState() {
      for (const button of document.querySelectorAll(".trait-random")) {
        button.disabled = false;
        button.title = button.dataset.trait === "personality" ? "随机个性"
          : button.dataset.trait === "ideal" ? "随机理念"
            : button.dataset.trait === "bond" ? "随机牵绊" : "随机缺陷";
      }
    }

    function randomTraitForButton(button) {
      const trait = button.dataset.trait;
      const target = document.getElementById(button.dataset.target);
      if (!trait || !target) return;

      const pool = getTraitTables(trait).map((text) =>
        String(text).replace(/^\s*\d+\.\s*/, "").trim()
      ).filter(Boolean);
      if (!pool.length) return;

      let candidates = pool;
      if (trait === "personality") {
        const otherId = target.id === "builder-personality-1"
          ? "builder-personality-2"
          : "builder-personality-1";
        const otherValue = document.getElementById(otherId)?.value.trim();
        if (otherValue) {
          const filtered = candidates.filter((text) => text !== otherValue);
          if (filtered.length) candidates = filtered;
        }
      }

      target.value = candidates[Math.floor(Math.random() * candidates.length)];
      target.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function updateRaceCombatDefaults() {
      const inputs = [
        combatResistance,
        combatImmunity,
        combatAdvantage,
        combatDarkvision,
        combatSize,
        combatSpeed
      ];

      if (isCustomRace()) {
        for (const input of inputs) {
          input.value = "";
          input.classList.remove("is-default");
        }
        return;
      }

      const defaults = raceCombatDefaults[raceSelect.value] || {
        darkvision: "",
        size: "",
        speed: "",
        resistance: "",
        immunity: "",
        advantage: ""
      };
      let { darkvision, size, speed, resistance, immunity, advantage } = defaults;
      const subrace = subraceSelect.value;

      if (raceSelect.value === "龙裔" && subrace) {
        const match = subrace.match(/（(.+)）$/);
        if (match) resistance = match[1];
      }

      if (raceSelect.value === "提夫林" && subrace && tieflingResistance[subrace]) {
        resistance = tieflingResistance[subrace];
      }

      if (raceSelect.value === "精灵") {
        if (subrace === "卓尔") darkvision = "120尺";
        if (subrace === "木精灵") speed = "35尺";
      }

      const subraceDefaults = raceCombatSubraceDefaults[raceSelect.value]?.[subrace];
      if (subraceDefaults) {
        if (subraceDefaults.darkvision !== undefined) darkvision = subraceDefaults.darkvision;
        if (subraceDefaults.size !== undefined) size = subraceDefaults.size;
        if (subraceDefaults.speed !== undefined) speed = subraceDefaults.speed;
        if (subraceDefaults.resistance !== undefined) resistance = subraceDefaults.resistance;
        if (subraceDefaults.immunity !== undefined) immunity = subraceDefaults.immunity;
        if (subraceDefaults.advantage !== undefined) advantage = subraceDefaults.advantage;
      }

      const values = {
        resistance,
        immunity,
        advantage,
        darkvision,
        size,
        speed
      };

      for (const input of inputs) {
        input.value = values[input.id.replace("combat-", "")] || "";
        input.classList.add("is-default");
      }
    }

    const featCatalog = [
      {
        label: "——起源专长——",
        items: [
          "警戒", "巧匠", "医疗师", "幸运", "魔法学徒", "音乐家",
          "凶蛮打手", "熟习", "酒馆斗殴者", "健壮", 
          "新晋龙巫教徒(FR)", "翠绿闲庭新羽(FR)", "竖琴手特工(FR)", "领主联盟特工(FR)", "紫龙新兵(FR)", "咒火火花(FR)", "新锻臂铠(FR)", "散塔林会暴徒(FR)", 
          "骄阳之子(LFL)", "影原咒者(LFL)", 
          "无休狂宴(ABH)", "吸血鬼猎人(ABH)", "吸血鬼玩物(ABH)", 
          "锐眼(RHW)", "幸存者(RHW)", 
          "奥法艺术家(AU)", "奥法雄辩家(AU)", "奥法渗透者(AU)", "奥法预言家(AU)", "奥法超负荷(AU)", "奥法护佑者(AU)", "奥法殡葬师(AU)", "魔宠密友(AU)", "穿界者(AU)", "万化本质(AU)"
        ]
      },
      {
        label: "——通用专长——",
        items: [
          "属性值提升", "演员", "运动精英", "冲锋手", "大厨", "强弩专家",
          "粉碎者", "防御式决斗", "双持客", "耐性", "元素掌控", "妖精触碰",
          "擒抱者", "巨武器大师", "重甲运用", "重甲大师", "领袖之证",
          "敏锐心灵", "轻甲运用", "巫师杀手", "军用武器训练", "中甲大师",
          "中甲运用", "骑乘战斗", "观察力", "穿刺者", "毒师", "长柄武器大师",
          "强健身心", "仪式施法者", "哨兵", "影界触碰", "神射手", "盾牌大师",
          "技艺专家", "隐伏者", "劈砍者", "飙速跑者", "法术射手", "念动力",
          "心灵感应", "战地施法者", "武器大师", 
          "龙之瘢(FR)", "翠色魔法(FR)", "竖琴手协同(FR)", "教团韧性(FR)", "贵族信念(FR)", "紫龙指挥官(FR)", "咒火专家(FR)", "散塔林会战术(FR)", "寒地施法者(FR)", "妖精诡术(FR)", "迷锁触碰(FR)", "街头正义(FR)", 
          "防护专家(AU)", "咒法专家(AU)", "预言专家(AU)", "惑控专家(AU)", "塑能专家(AU)", "幻术专家(AU)", "死灵专家(AU)", "变化专家(AU)", "元素魔宠(AU)", "异界魔宠(AU)", "慰疗魔宠(AU)", "尚武魔宠(AU)", "魔法行家(AU)", "法术抗性(AU)", "法术诡计(AU)",
          "嗜血(ABH)", "爆破手(ABH)", "沉溺痛苦(ABH)", "光明使者(ABH)", "吻痕(ABH)", "残尸败蜕(ABH)", "咎罪责难(ABH)", "祸国叛心(ABH)", "吸血鬼触碰(ABH)", "残尸败蜕(ABH)", "咎罪责难(ABH)", "祸国叛心(ABH)"
        ]
      },
      {
        label: "——传奇恩惠专长——",
        items: [
          "英勇战斗之恩惠", "次元旅行之恩惠", "能量抗性之恩惠",
          "扭曲命运之恩惠", "超凡强韧之恩惠", "无敌攻势之恩惠",
          "强力恢复之恩惠", "博学多才之恩惠", "神行无拘之恩惠",
          "法术溯回之恩惠", "暗夜精魂之恩惠", "真实视觉之恩惠", 
          "血海漂橹之恩惠(FR)", "生机勃发之恩惠(FR)", "八面玲珑之恩惠(FR)", 
          "绝境逢生之恩惠(FR)", "熠熠生辉之恩惠(FR)", "变幻无常之恩惠(FR)", 
          "命运眷顾之恩惠(FR)", "毒手殁心之恩惠(FR)", "夜宴狂欢之恩惠(FR)", 
          "惊魂落魄之恩惠(FR)", "旭日骄阳之恩惠(FR)", "暴风骤岚之恩惠(FR)", "汲魂饮魄之恩惠(FR)",
          "咒能爆发之恩惠(AU)", "学派宗师之恩惠(AU)", "钢铁意志之恩惠(AU)", 
          "炽耀黎明之恩惠(ABH)", "厄影迫现之恩惠(ABH)", 
          "雾影遁形之恩惠(ABH)"
        ]
      }
    ];

    const featDescriptionData = {
      "警戒": `警戒 Alert
起源专长
你获得以下增益。
先攻熟练 Initiative Proficiency。当你投掷先攻时，你可以将你的熟练加值加入结果。
先攻互换 Initiative Swap。当你掷完先攻，你可以立即与处于同一场战斗中的一名自愿的盟友交换先攻。如果你或那个盟友正处于失能状态，则不能进行交换。`,
      "巧匠": `巧匠 Crafter
起源专长
你获得以下增益。
工具熟练 Tool Proficiency。你从快速制作表中自选三项不同的工匠工具并获得其熟练。
折扣 Discount。你在购买非魔法物品时具有20%的折扣。
快速制作 Fast Crafting。当你完成一次长休时，你可以制作一件快速制作栏中的装备。你必须拥有与该物品对应的工匠工具以及与这些工具对应的工具熟练才能尝试制作。造出的物品会持续存在到你下次完成长休，随后该物品解体坏损。
快速制作 Fast Crafting
工匠工具    可制造的装备
木匠工具 Carpenter's Tools    梯子、火把
皮匠工具 Leatherworker's Tools    小箱子、卷轴匣、小包
石匠工具 Mason's Tools    滑轮组
陶匠工具 Potter's Tools    壶、油灯
铁匠工具 Smith's Tools    滚珠、桶、铁蒺藜、爪钩、铁锅
修补工具 Tinker's Tools    铃铛、铲子、火绒盒
织布工具 Weaver's Tools    篮子、绳索、捕网、帐篷
木雕工具 Woodcarver's Tools    短棒、巨棒、长棍`,
      "医疗师": `医疗师 Healer
起源专长
你获得以下增益。
战地医师 Battle Medic。如果你有医疗包，以一个操作动作，你可以消耗医疗包的一次使用次数来救治一个位于你5尺内的生物。该生物可以消耗一枚生命骰，然后由你来投掷它，令该生物恢复等于所掷出的点数+你的熟练加值点生命值。
治疗重掷 Healing Rerolls。当你掷骰以决定用法术或此专长的战地医师增益所恢复的生命值时，你可以重掷其中掷出1的骰子，但你必须使用重掷的结果。`,
      "幸运": `幸运 Lucky
起源专长
你获得以下增益。
幸运点 Lucky Point。你拥有一些幸运点，其数量等同于你的熟练加值。你可以将点数花在下列的增益上。你在完成一次长休时重新获得所有已消耗的幸运点。
优势 Advantage。当你为了一次D20检定而投掷d20时，你可以花费一个幸运点来给予这次检定优势。
劣势 Disadvantage。当一个生物为了一次对你发动的攻击检定而投掷d20时，你可以花费一个幸运点来为这次检定施加劣势。`,
      "魔法学徒": `魔法学徒 Magic Initiate
起源专长
你获得以下增益。
两道戏法 Two Cantrips。从牧师法术列表、德鲁伊法术列表、法师法术列表中选择一个列表，你从该法术列表中选择两道戏法并习得之。再从智力、感知、魅力中选择一项属性，你从这个专长中习得的法术使用该属性作为施法属性。
一环法术 Level 1 Spell。你从前面所选的法术列表中再选择一道一环法术，并始终准备着这道法术。你可以无需法术位地施展该法术一次，并在完成长休时重获以此法施展该法术的能力。你也可以使用你拥有的任意法术位来施展该法术。
改变法术 Spell Change。每当你获得一级新等级，你都能将通过本专长习得的一道法术替换为同法术列表中同环阶的另一道法术。
复选 Repeatable。你可多次选择本专长，但是你每次都必须选择一个不同的法术列表。`,
      "音乐家": `音乐家 Musician
起源专长
你获得以下增益。
乐器训练 Instrument Training。你获得三种自选的乐器的熟练。
鼓舞之歌 Encouraging Song。作为你完成短休或长休的一部分，你可以用你熟练的乐器演奏一首歌曲，并令听到这首乐歌的盟友获得英雄激励。以这种方式所能影响的盟友数量最多等于你的熟练加值。`,
      "凶蛮打手": `凶蛮打手 Savage Attacker
起源专长
你专门训练过如何做出更具破坏性的进攻。每回合一次，当你使用武器命中目标时，你可以掷两次武器的伤害骰，并自选其中一次应用在目标上。`,
      "熟习": `熟习 Skilled
起源专长
你获得共计三项自选的技能和工具熟练。
复选 Repeatable。你可多次选择本专长。`,
      "酒馆斗殴者": `酒馆斗殴者 Tavern Brawler
起源专长
你获得以下增益。
强化徒手打击 Enhanced Unarmed Strike。当你使用徒手打击命中并造成伤害时，你可以造成1d4+你力量调整值的钝击伤害，而非徒手打击的原本伤害。
伤害重掷 Damage Rerolls。当你为徒手打击掷伤害骰时，你可以重掷其中掷出1的骰子，但你必须使用重掷的结果。
临时武器专家 Improvised Weaponry。你拥有临时武器的熟练。
推离 Push。在你的回合内，如果你用攻击动作中的一次徒手打击命中了一个生物，你可以在对目标造成伤害的同时将它推离5尺。你每回合只能使用这个增益一次。`,
      "健壮": `健壮 Tough
起源专长
获得该专长时，你的生命值上限提升你当前角色等级两倍的数值。并且在你随后每次升级时，你的生命值上限都会额外提升2。`,
      "属性值提升": `属性值提升 Ability Score Improvement
通用专长（先决：等级4+）
你选择的一项属性提升2，或者你选择的两项属性各提升1。你无法依靠本专长令某个属性值超出20。
复选 Repeatable。你可多次选择本专长。`,
      "新晋龙巫教徒(FR)": `新晋龙巫教徒 Cult of the Dragon Initiate
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。
龙之舌Dragon's Tongue。你懂得龙语。若你选取此专长时已懂得龙语，你自《玩家手册》或本书第二章的语言表中选择一门语言习得以替代龙语。 
龙之威Dragon's Terror。你能够以魔法动作将恐惧灌输给一名位于你30尺内的你可见的生物。目标必须成功通过一次感知豁免（DC等于8+你的感知调整值+你的熟练加值），否则陷入恐慌状态，持续至你的下个回合结束。若目标的此豁免成功或当其身上的此效应结束时，目标在24小时内免疫此效应。 
饮惧为励Inspire by Fear。当你令一名生物陷入恐慌状态且恐惧源为你时，若你没有英雄激励，你可以获得之。此增益一经使用，直至你完成短休或长休都无法再次使用。`,
      "翠绿闲庭新羽(FR)": `翠绿闲庭新羽 Emerald Enclave Fledgling 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。 
动物交谈Speak with Animals。你始终准备着法术动物交谈Speak with Animals，且能以你拥有的任意法术位施展该法术。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。当你将该法术作为仪式施展时，其持续时间为8小时。 
双人轮打Tag Team。当你执行协助动作时，作为此动作的一部分，你能够与一名位于你5尺内的自愿盟友交换位置。此次移动不会引发借机攻击。若该盟友陷入失能状态，你无法使用此增益。`, 
      "竖琴手特工(FR)": `竖琴手特工 Harper Agent 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。 
盗贼黑话Thieves' Cant。你懂得盗贼黑话。 
乐器训练Instrument Training。你获得一项你选择乐器的熟练。 
分神旋律Distracting Melody。当你执行协助动作辅助盟友的攻击检定时，你可以分散位于你30尺内而非5尺内敌人的注意力，只要该敌人能看见或听见你。`,
      "领主联盟特工(FR)": `领主联盟特工 Lords’ Alliance Agent 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。 
激励打击Inspiring Strike。每回合一次，当你对生物造成重击时，你能够选择一名盟友，其需位于你30尺内，能看见或听见你且不具有英雄激励。该盟友获得英雄激励。 
重获荣誉Reassert Honor。当一名你可见的敌人对你5尺内的盟友造成伤害时，你的下个回合结束前，你对该敌人的下次攻击检定具有优势。`,
      "紫龙新兵(FR)": `紫龙新兵 Purple Dragon Rook 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。 
待人接物Entreat。你获得以下技能之一的熟练：洞悉、表演或游说。 
振军战吼Rallying Cry。当你投掷先攻时，若你未陷入失能状态，你能够选择数量等于你的熟练加值的你可见且位于你30尺内的生物。这些生物获得英雄激励。 
此增益一经使用，直至完成长休你都无法再次使用。`,
      "咒火火花(FR)": `咒火火花 Spellfire Spark 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。 
魔法吸收Magic Absorption。每回合一次，当你受到来自法术或魔法效应的伤害时，你令你受到的总伤害减少1d4。你无法在陷入失能状态期间使用该增益。 
咒火之焰Spellfire Flame。你习得戏法圣火术Sacred Flame 。该法术的施法属性是智力、感知或魅力（当你选取此专长时选择）。你也能够以附赠动作施展该戏法，次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`,
      "新锻臂铠(FR)": `新锻臂铠 Tyro of the Gauntlet 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。 
比肩而立Stand as One。当一名位于你5尺内的盟友将受到推离或拉近其的效应时，你能够以反应防止该盟友被推离或拉近。若盟友陷入失能状态，其无法获得此增益。 
警惕Vigilant。当你执行预备动作时，在你的下个回合开始前对你进行的下次攻击检定具有劣势。`, 

      "散塔林会暴徒(FR)": `散塔林会暴徒 Zhentarim Ruffian 
出处：《被遗忘的国度：费伦英雄》
起源专长 
你获得以下增益。
见缝插针Exploit Opening。当你为借机攻击进行伤害掷骰时，你能够投掷两次伤害骰并对目标使用其中一个结果。
家人至上Family First。当你投掷先攻时，若你具有英雄激励，你能够消耗英雄激励令你和你的盟友的此次先攻掷骰具有优势。`,
      "骄阳之子(LFL)": `骄阳之子 Child of the Sun
出处：《洛温：初光》
起源专长
你获得以下增益。
艾尔杜之眼Eyes of Eirdu。 你和位于你10尺内的盟友为避免或结束目盲状态而进行豁免检定时具有优势。
妖火Faerie Fire。你习得法术妖火Faerie Fire 。你的该法术的施法属性是感知、智力或魅力（在你选取该专长时选择）。你可以无需法术位地施展该法术一次，当你完成长休时，你重获以此法施展该法术的能力。你也能够以你拥有的任意法术位施展该法术。
当你使用该增益不消耗法术位地施展妖火Faerie Fire 时，受到伤害不会打断你对该法术的专注。`,

      "影原咒者(LFL)": `影原咒者 Shadowmoor Hexer
出处：《洛温：初光》
起源专长
你获得以下增益。
脆弱诅咒Hex。你始终准备着法术脆弱诅咒Hex。你的该法术的施法属性是感知、智力或魅力（在你选取该专长时选择）。你可以无需法术位地施展该法术一次，当你完成长休时，你重获以此法施展该法术的能力。你也能够以你拥有的任意法术位施展该法术。
诅咒魔法Curse Magic。当一名被你以脆弱诅咒Hex 诅咒的生物以攻击检定命中你时，该生物受到等同于你熟练加值的心灵伤害。每名生物每个回合仅会受到一次该额外伤害。`,


      "无休狂宴(ABH)": `无休狂宴 Tireless Reveler 
出处：《阿斯代伦的饥渴之书》
起源专长
当一名位于你60尺内可见的盟友消耗英雄激励时，若你没有英雄激励，则你获得英雄激励。你可使用此增益的次数等同于等于你的熟练加值，在完成短休或长休后你重获所有已消耗的使用次数。`,

      "吸血鬼猎人(ABH)": `吸血鬼猎人 Vampire Hunter 
出处：《阿斯代伦的饥渴之书》
起源专长
你获得以下增益。
灵巧脱身Adroit Escape。 你为逃脱受擒状态或非魔法约束所进行的属性检定具有优势。
活力守御Vitality Ward。 当你受到暗蚀伤害时，你能以反应减少伤害。投掷数量等于你熟练加值的d6，并将结果相加。以此总和减少你受到的暗蚀伤害。此增益一经使用，直至完成短休或长休你都无法再次使用。`,

      "吸血鬼玩物(ABH)": `吸血鬼玩物 Vampire's Plaything 
出处：《阿斯代伦的饥渴之书》
起源专长
你获得以下增益。
倾注Decanting。当你完成长休时，只要你有空的小瓶或扁瓶，你就可以制造一瓶治疗药水Potion of Healing 或一瓶抗毒剂。这些液体会在你完成长休后蒸发。
及时撤退Timely Retreat。 你能够以附赠动作执行疾走或撤离动作。你能够使用此增益的次数等于你的熟练加值次，当你完成长休时，你重获所有已消耗的使用次数。
血族链接Vampiric Connection。 由DM决定你曾经的吸血鬼主人的命运。若你与你曾经的吸血鬼主人身处同一存在位面，该吸血鬼可以与你进行心灵感应沟通，并且你可以选择允许该吸血鬼通过你的感官进行感知。`,

      "锐眼(RHW)": `锐眼 Sharp Eye
出处：《鸦阁魔域：魔障深藏》
起源专长
当你执行搜索或研究动作时，你能令你作为该动作一部分的任意属性检定具有优势。你能使用此特性的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。若该次属性检定失败，你不会消耗本特性的使用次数。`,

      "幸存者(RHW)": `幸存者 Survivor
出处：《鸦阁魔域：魔障深藏》
起源专长
你获得以下增益。
杯弓蛇影Hypervigilance。每当你进行先攻掷骰时，若D20骰值不超过9，你能够重新投掷D20。你必须使用新的结果。
我心如铁Steel Yourself。 当你为避免或结束魅惑或恐慌状态进行的豁免失败时，你能够以反应在结果中加入加值，这可能令检定改为成功。加值等于你的熟练加值。该反应一经使用，直至完成长休你都无法再如此做。`,
      "属性值提升": `属性值提升 Ability Score Improvement
通用专长（先决：等级4+）
你选择的一项属性提升2，或者你选择的两项属性各提升1。你无法依靠本专长令某个属性值超出20。
复选 Repeatable。你可多次选择本专长。`,
      "演员": `演员 Actor
通用专长（先决：等级4+，魅力13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的魅力提升1，至多提升至20。
伪装 Impersonation。伪装成某个虚构或真实的个体的情况下，你为使别人相信你就是那个个体所做的魅力（欺瞒或表演）检定具有优势。
拟声 Mimicry。你可以模仿出另一个生物的语音，甚至包括它的说话方式。听见你的拟声的生物必须通过一次感知（洞悉）检定才能发觉这种拟声是由他人伪造的（DC等于8+你的魅力调整值+你的熟练加值）。`,
      "运动精英": `运动精英 Athlete
通用专长（先决：等级4+，力量或敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
攀爬速度 Climb Speed。你获得等同于你速度的攀爬速度。
鲤鱼打挺 Hop Up。处于倒地状态的情况下，你可以仅消耗5尺移动力来站起来。
跳跃 Jumping。你只需移动5尺距离便能进行一次助跑跳远或一次助跑跳高。`,
      "冲锋手": `冲锋手 Charger
通用专长（先决：等级4+，力量或敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
进阶疾走 Improved Dash。当你执行疾走动作时，对该动作而言，你的速度提升了10尺。
冲锋攻击 Charge Attack。使用攻击动作中的近战攻击检定命中目标时，若你在此次攻击前立即向着目标直线移动了10+尺，你可以为这次攻击增添以下其中一个效应：此次攻击的伤害掷骰获得1d8的加值；将目标推离10尺，前提是目标体型不比你大超过一级。你只能在每个你自己的回合使用一次此增益。`,
      "大厨": `大厨 Chef
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的体质或感知提升1，至多提升至20。
厨师工具 Cook's Utensils。如果你没有厨师工具的熟练，你获得之。
大补食膳 Replenishing Meal。作为短休的一部分，只要你手上有食材和厨师工具，你就可以烹饪一顿特别的美食。你可以为数个生物准备足够的此类食物，其数量等于4+你的熟练加值。在这一次短休结束时，任何吃了这些食物且花费了生命骰来恢复生命值的生物都能额外恢复1d8的生命值。
应急零嘴 Bolstering Treats。如果你手上有食材和厨师工具，你可以花费一小时的时间，或在完成一次长休时，烹饪出一定份数的零嘴，其数量等于你熟练加值。这些特别的小零嘴在做好后能保存八小时。一个生物可以使用一个附赠动作来吃掉其中一份零嘴，并获得等同于你熟练加值的临时生命值。`,
      "强弩专家": `强弩专家 Crossbow Expert
通用专长（先决：等级4+，敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷提升1，至多提升至20。
无视装填 Ignore Loading。你无视手弩、重弩和轻弩的装填词条（在这个专长里统称弩）。如果你正手持着一把弩，你即使没有空手也能够为它装填一发弹药。
抵近射击 Firing in Melee。你用弩进行的攻击检定不会因你在敌人的5尺内而具有劣势。
双持射击 Dual Wielding。当你发动由轻型词条所提供的额外的攻击时，如果这次追加攻击是由一把具有轻型词条的弩所发动的，且你原本无法在伤害中加入属性调整值，你就可以改为可以将你的属性调整值加入本次伤害中。`,
      "粉碎者": `粉碎者 Crusher
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或体质提升1，至多提升至20。
推动 Push。每回合一次，当你以造成钝击伤害的一次攻击命中了一个生物时，只要这个生物的体型不比你大超过一级，你就能将它移动5尺至一处未占据空间中。
强化重击 Enhanced Critical。当你掷出一次重击命中一名生物并对其造成钝击伤害后，直到你的下个回合开始前，任何以该生物为目标的攻击检定都会具有优势。`,
      "防御式决斗": `防御式决斗 Defensive Duelist
通用专长（先决：等级4+，敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷提升1，至多提升至20。
招架 Parry。如果其他生物的近战攻击命中你时你正握着一把灵巧武器，则你可以执行反应来将你的熟练加值加入到你的护甲等级中，此举可能导致本次攻击变为未命中。那之后，直到你的下一回合开始前，你的AC在面对近战攻击时都将具有相同的加值。`,
      "双持客": `双持客 Dual Wielder
通用专长（先决：等级4+，力量或敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
强化双持 Enhanced Dual Wielding。当你在自己的回合中执行了攻击动作，并使用具有轻型词条的武器发动了一次攻击后，你可以在同一回合中以附赠动作发动一次额外的攻击。这次额外的攻击必须由另一把不具有双手词条的近战武器发动。额外的攻击的伤害无法加入你的属性调整值（除非该调整值为负数）。
快速拔刀 Quick Draw。拔出或入鞘武器时，你可以同时拔出或入鞘两把不具有双手词条的武器，而非通常情况下的一把。`,
      "耐性": `耐性 Durable
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的体质提升1，至多提升至20。
悍不畏死 Defy Death。你进行的死亡豁免具有优势。
高速恢复 Speedy Recovery。以一个附赠动作，你可以消耗并投掷一枚生命骰，来恢复与投掷结果相等的生命值。`,
      "元素掌控": `元素掌控 Elemental Adept
通用专长（先决：等级4+，施法或契约魔法特性）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1点，至多提升至20。
能量掌控 Energy Mastery。选择以下伤害类型之一：强酸、寒冷、火焰、闪电、雷鸣。你施展的法术无视所选伤害类型的抗性。此外，当你为你施展的造成该类型伤害的法术投掷伤害时，你可以将伤害骰中骰出的1都视为2。
复选 Repeatable。你可多次选取本专长，但每次选取时都必须为能量掌控增益选择一个不同的伤害类型。`,
      "妖精触碰": `妖精触碰 Fey-Touched
通用专长（先决：等级4+）
暴露在妖精荒野 Feywild 的魔法之下给予你以下增益：
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
妖精魔法 Fey Magic。选择一道预言或惑控学派的一环法术。你始终准备着你选择的这道法术与迷踪步 Misty Step。你可以无需法术位地施展每道法术各一次，当你完成长休时，你重获以此法施展这些法术的能力。你也能够以你拥有的任意合适环阶的法术位施展这些法术。
这些法术的施法属性是你以此专长提升的属性。`,
      "擒抱者": `擒抱者 Grappler
通用专长（先决：等级4+，力量或敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
连擒带打 Punch and Grab。你的回合中，当你用攻击动作中的一次徒手打击命中了一个生物，你可以同时使用擒抱和造成伤害两个选项。你每回合只能使用这个增益一次。
优势攻击 Attack Advantage。你攻击受擒于你的生物时进行的攻击检定具有优势。
高速拖行 Fast Wrestler。你无需为移动受擒于你的生物而花费额外的移动力，前提是这名生物的体型与你相同或更小。`,
      "巨武器大师": `巨武器大师 Great Weapon Master
通用专长（先决：等级4+，力量13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量提升1，至多提升至20。
重武器掌握 Heavy Weapon Master。在你的回合内，你的攻击动作中，当你用具有重型词条的武器命中了一名生物时，你可以让这把武器对目标额外造成一定的伤害，额外伤害等同于你的熟练加值。
顺势斩 Hew。当你使用近战武器掷出一次重击时，或当你用其将一个生物的生命值降低至0时，你可以立即使用你的附赠动作用同一把武器发动一次攻击。`,
      "重甲运用": `重甲运用 Heavily Armored
通用专长（先决：等级4+，中甲受训）
你获得以下增益。
属性值提升 Ability Score Increase。你的体质或力量提升1，至多提升至20。
护甲受训 Armor Training。你获得重甲受训。`,
      "重甲大师": `重甲大师 Heavy Armor Master
通用专长（先决：等级4+，重甲受训）
你获得以下增益。
属性值提升 Ability Score Increase。你的体质或力量提升1，至多提升至20。
伤害减免 Damage Reduction。穿着重甲期间，当你被一次攻击命中时，该次攻击对你造成的任何钝击伤害、穿刺伤害与挥砍伤害均减去你的熟练加值。`,
      "领袖之证": `领袖之证 Inspiring Leader
通用专长（先决：等级4+，感知或魅力13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的感知或魅力提升1，至多提升至20。
激励演出 Bolstering Performance。每当你的短休/长休结束时，你可以做一场激励人心的表演：一次演讲、一首歌曲或一支舞蹈。当你这么做时，选择至多6名在周围30尺内观看你表演的盟友（亦可包括你自己）。每个被选中的生物都可以获得一定临时生命值，其数值等于你的角色等级+你用本专长提升的属性的调整值。`,
      "敏锐心灵": `敏锐心灵 Keen Mind
通用专长（先决：等级4+，智力13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力提升1，至多提升至20。
轶闻知识 Lore Knowledge。选择下列技能之一：奥秘、历史、调查、自然、宗教。如果你不具有所选技能的熟练，则你获得其熟练；如果你已有熟练，则你获得其专精。
快速研究 Quick Study。你可以用附赠动作执行研究动作。`,
      "轻甲运用": `轻甲运用 Lightly Armored
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1点，至多提升至20。
护甲受训 Armor Training。你获得轻甲和盾牌受训。`,
      "巫师杀手": `巫师杀手 Mage Slayer
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
专注中断手 Concentration Breaker。当你对一名正处于专注的生物造成伤害时，该生物本次为维持专注所进行的豁免检定具有劣势。
审慎护心 Guarded Mind。当你的智力、感知或魅力豁免失败时，你可以将其改为成功。此增益一经使用，直到完成短休或长休前你都无法再次使用。`,
      "军用武器训练": `军用武器训练 Martial Weapon Training
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
武器熟练 Weapon Proficiency。你获得军用武器熟练。`,
      "中甲大师": `中甲大师 Medium Armor Master
通用专长（先决：等级4+，中甲受训）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
灵敏着装 Dexterous Wearer。穿着中甲期间，若你的敏捷在16或更高，你可以在AC中加入3点敏捷调整值，而非原本的2点。`,
      "中甲运用": `中甲运用 Moderately Armored
通用专长（先决：等级4+，轻甲受训）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
护甲受训 Armor Training。你获得中甲受训。`,
      "骑乘战斗": `骑乘战斗 Mounted Combatant
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量、敏捷或感知提升1，至多提升至20。
骑乘突击 Mounted Strike。骑乘期间，你对位于你坐骑5尺内的、体型比你坐骑至少小一级的、且未被骑乘的生物所进行的攻击检定具有优势。
侧跃躲闪 Leap Aside。当你的坐骑受某效应影响而需要进行敏捷豁免时，如果此次豁免成功只受到一半伤害，那么它豁免成功时不受伤害，豁免失败只承受一半伤害。为享受此增益，你必须骑乘着你的坐骑，且你与坐骑均不能处于失能状态。
我身作盾 Veer。当你骑乘时，只要你不处于失能状态，你就可以强制让命中了你的坐骑的攻击改为命中你自己。`,
      "观察力": `观察力 Observant
通用专长（先决：等级4+，智力或感知13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力或感知提升1，至多提升至20。
敏锐观察 Keen Observer。选择以下技能之一：洞悉、调查或察觉。如果你不具有所选技能的熟练，则你获得其熟练；如果你已有熟练，则你获得其专精。
快速搜索 Quick Search。你可以用附赠动作进行搜索动作。`,
      "穿刺者": `穿刺者 Piercer
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
穿透伤 Puncture。每回合一次，当你用造成穿刺伤害的攻击命中一个生物时，你可以重骰这次攻击伤害的其中一枚伤害骰。但你必须采用新的掷骰结果。
强化重击 Enhanced Critical。当你用造成穿刺伤害的攻击命中一个生物并且掷出重击时，你可以在计算额外的穿刺伤害时多投一个伤害骰。`,
      "毒师": `毒师 Poisoner
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷或智力提升1，至多提升至20。
强效毒素 Potent Poison。你造成毒素伤害的伤害掷骰无视对方的毒素伤害抗性。
酿毒 Brew Poison。你获得毒药工具的熟练。你可以花费一小时的时间与价值50GP的材料，来使用毒药工具制造一定数量的毒药，其剂数等同于你的熟练加值。你能够以一个附赠动作为一把武器或一枚弹药涂上一剂毒药。涂用后，此种毒药的毒性能维持一分钟，毒性也会在你用此涂毒物品造成伤害后会被消耗。当一名生物受到来自此种涂毒物品的伤害时，该生物必须成功通过一次体质豁免（DC等于8+你以本专长提升的属性的调整值+你的熟练加值），否则将受到2d8毒素伤害并陷入中毒状态，持续至你的下回合结束。`,
      "长柄武器大师": `长柄武器大师 Polearm Master
通用专长（先决：等级4+，力量或敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷或力量提升1，至多提升至20。
长柄打击 Pole Strike。在你执行攻击动作并使用长棍、矛或同时具有重型词条与触及词条的武器攻击后，你可以立刻用附赠动作，使用该武器的另一端发动一次近战攻击。在这次攻击中，该武器的伤害骰改为d4，其伤害类型改为钝击伤害。
反应打击 Reactive Strike。在你持握长棍、矛或同时具有重型词条与触及词条的武器期间，生物进入你触及范围时，你能够以反应，使用该武器对该生物发动一次近战攻击。`,
      "强健身心": `强健身心 Resilient
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。选择你不具有其豁免熟练的一项属性，该属性提升1，至多提升至20。
豁免熟练 Saving Throw Proficiency。你获得所选属性的豁免熟练。`,
      "仪式施法者": `仪式施法者 Ritual Caster
通用专长（先决：等级4+，智力、感知或魅力13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
仪式魔法 Ritual Spells。你选择数道具有仪式标签的一环法术，其具体数量等于你的熟练加值。你始终准备着这几道法术，并可以用你拥有的任何法术位去施展它们。施展它们的施法属性为你用此专长提升的属性。此后，每当你的熟练加值提升时，你可以通过这个特性多获得一道始终准备的、带有仪式标签的一环法术。
快速仪式 Quick Ritual。你可以用通常的施法时间来施展一道仪式法术，而不需要仪式的延长施法时间。这么做不会花费你的法术位。一旦你通过这种方式施展了一道法术，直到完成一次长休前你都不能再使用这个增益。`,
      "哨兵": `哨兵 Sentinel
通用专长（先决：等级4+，力量或敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
守护者 Guardian。当位于你5尺范围内的生物执行撤离动作后，或当它的攻击命中了除你以外的目标后，你可以立刻对该生物进行一次借机攻击。
阻拦 Halt。你的借机攻击命中一名生物时，该生物的速度在当前回合剩余时间内变为0。`,
      "影界触碰": `影界触碰 Shadow Touched
通用专长（先决：等级4+）
暴露在堕影冥界 Shadowfell 的魔法之下给予你以下增益：
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
暗影魔法 Shadow Magic。选择一道幻术或死灵学派的一环法术。你始终准备着你选择的这道法术与隐形术 Invisibility。你可以无需法术位地施展每道法术各一次，当你完成长休时，你重获以此法施展这些法术的能力。你也能够以你拥有的任意合适环阶的法术位施展这些法术。
这些法术的施法属性是你以此专长提升的属性。`,
      "神射手": `神射手 Sharpshooter
通用专长（先决：等级4+，敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷提升1，至多提升至20。
绕过掩体 Bypass Cover。你使用武器发动的远程攻击无视半身掩护和四分之三掩护。
抵近射击 Firing in Melee。位于一个敌人5尺范围内的情况下，你使用远程武器发动的攻击检定不会因此具有劣势。
百步穿杨 Long Shots。使用远程武器攻击超出常规射程的目标时，你的攻击检定不会因此具有劣势。`,
      "盾牌大师": `盾牌大师 Shield Master
通用专长（先决：等级4+，盾牌受训）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量提升1，至多提升至20。
盾击 Shield Bash。当你通过攻击动作中的，由近战武器发动的一次攻击命中了位于你5尺内的生物时，如果你装备着盾牌，你就可以立即使用它来击打目标，迫使目标进行一次力量豁免检定（DC等于8+你的力量调整值+你的熟练加值）。如果豁免失败，目标将被你推离5尺远或因此陷入倒地状态（由你选择）。在每个你的回合中，此增益只能被使用一次。
介入盾牌 Interpose Shield。当你受某效应影响而需要进行敏捷豁免来“只受一半伤害”时，若你豁免检定成功并正持握着一面盾牌，你就可以用反应来使你自己免受此次伤害。`,
      "技艺专家": `技艺专家 Skill Expert
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至20。
技能熟练 Skill Proficiency。你自选一个技能并获得其熟练。
专精 Expertise。你选择一个拥有其熟练但不具备相应专精的技能，并获得其专精。`,
      "隐伏者": `隐伏者 Skulker
通用专长（先决：等级4+，敏捷13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷提升1，至多提升至20。
盲视 Blindsight。你获得10尺距离的盲视。
战争迷雾 Fog of War。你善于利用战斗中的混乱。你在战斗中通过执行躲藏动作时所做的任何敏捷（隐匿）检定都具有优势。
狙击手 Sniper。如果你在躲藏中进行了攻击检定，但该次攻击未命中时，这次攻击将不会暴露你的位置。`,
      "劈砍者": `劈砍者 Slasher
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
伤筋 Hamstring。每回合一次，当你用造成挥砍伤害的攻击命中一个生物时，你可以使其速度降低10尺，持续至你的下回合开始。
强化重击 Enhanced Critical。当你掷出重击并对一个生物造成挥砍伤害时，该生物进行的所有攻击检定都将具有劣势，持续至你的下回合开始为止。`,
      "飙速跑者": `飙速跑者 Speedy
通用专长（先决：等级4+，敏捷或体质13+）
你获得以下增益。
属性值提升 Ability Score Increase。你的敏捷或体质提升1，至多提升至20。
速度提升 Speed Increase。你的速度提升10尺。
险地疾行 Dash Over Difficult Terrain。当你在自己的回合执行疾走动作时，在这个回合余下的时间里，困难地形不再会额外消耗你的移动力。
灵活移动 Agile Movement。对你发动的借机攻击都具有劣势。`,
      "法术射手": `法术射手 Spell Sniper
通用专长（先决：等级4+，施法或契约魔法特性）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
绕过掩体 Bypass Cover。你为法术进行的攻击检定无视半身掩护和四分之三掩护。
抵近施法 Casting in Melee。位于一个敌人5尺范围内的情况下，你用法术进行的攻击检定不会因此具有劣势。
法术增距 Increased Range。当你施展一道具有至少10尺施法距离，且需要你进行一次攻击检定的法术时，这道法术的施法距离增加60尺。`,
      "念动力": `念动力 Telekinetic
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
次级心灵遥控 Minor Telekinesis。你习得戏法法师之手 Mage Hand。你施展这道戏法时，你无需言语成分与姿势成分，且可以让这只灵体手隐形，还可以令它的施法距离以及其可远离你的最大距离均提升30尺。该法术的施法属性是你以此专长提升的属性。
念力推撞 Telekinetic Shove。以一个附赠动作，你可以尝试以念动力推撞一个位于你30尺内的你可见的生物。当你这样做时，目标必须通过一次力量豁免（DC等于8+你用此专长提升的属性的调整值+你的熟练加值）否则将被你拉近或推离5尺。`,
      "心灵感应": `心灵感应 Telepathic
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
传心呢喃 Telepathic Utterance。你可以和位于你60尺内任何你可见的生物用心灵感应进行交流。你的传心呢喃以一种你已知的语言进行，且该生物必须懂得这门语言才能理解你。你的主动沟通并不会给予该生物以心灵感应的形式回复你的能力。
侦测思想 Detect Thoughts。你始终准备着法术侦测思想 Detect Thoughts。你可以无需法术位且无需法术成分地施展该法术，你必须完成长休后才能再次以此法施展该法术。你也能够以你拥有的任意合适环阶的法术位施展该法术。该法术的施法属性是你以此专长提升的属性。`,
      "战地施法者": `战地施法者 War Caster
通用专长（先决：等级4+，施法或契约魔法特性）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
专注 Concentration。你为维持专注的所做的体质豁免具有优势。
响应法术 Reactive Spell。当一个生物因离开你的触及范围而引发你的借机攻击时，你能使用你的反应来对这个生物施展一道法术，而非发动一次借机攻击。这道法术的施法时间必须为动作，且必须将该生物选为法术的唯一目标。
姿势成分 Somatic Components。即使你的一只手或双手上都有武器/盾牌，你也能满足法术的姿势成分要求。`,
      "武器大师": `武器大师 Weapon Master
通用专长（先决：等级4+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
精通词条 Mastery Property。你对武器的训练让你能够使用你自选的一种简单或军用武器的精通词条，前提是你熟练于该种武器。每当你完成一次长休，你能将所选的武器种类替换为你熟练的另一种武器。`,

      "龙之瘢(FR)": `龙之瘢 Dragonscarred
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，新晋龙巫教徒专长） 
你获得以下增益。 
属性值提升Ability Score Increase。你的体质或魅力提升1，至多提升至20。 
伤害抗性Damage Resistance。当你获得此专长时，你自强酸、寒冷、火焰、闪电或毒素中选择一种。你获得你选择的伤害类型的抗性。 
可怖伟力Fearsome Power。当你在你的回合中以攻击动作或魔法动作对一名生物造成伤害时，你能够在本回合以附赠动作使用新晋龙巫教徒专长的龙之威增益。`, 


      "奥法艺术家(AU)": `奥法艺术家 Arcane Artist
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得戏法次级幻象Minor Illusion。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
激励魔法Inspiring Magic。当你施展一道幻术学派的法术时，你能选择一名位于你30尺内能看见你的盟友。那名盟友获得英雄激励。此增益一经使用，直至完成长休你都无法再次使用。`, 

      "奥法雄辩家(AU)": `奥法雄辩家 Arcane Eloquence
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得戏法恶言相加Vicious Mockery。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
巧舌如簧Smooth Talker。当你进行魅力（欺瞒、恐吓或游说）检定时，你可以投掷1d4并将骰值加入该属性检定。`, 

      "奥法渗透者(AU)": `奥法渗透者 Arcane Infiltrator
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得戏法交友术Friends。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
诡影迷踪Cunning Diversion。你能以附赠动作执行回避动作。你能使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`, 

      "奥法预言家(AU)": `奥法预言家 Arcane Omens
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得戏法神导术Guidance。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
助人预兆Helpful Premontion。当你或一名位于你30尺内你可见的生物豁免失败时，你能以反应投掷1d4并将骰值加入该豁免总值，这可能使失败改为成功。你能使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`, 

      "奥法超负荷(AU)": `奥法超负荷 Arcane Overload
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得戏法火焰箭Fire Bolt。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
能量如潮Power Surge。当你施展塑能法术并以之造成伤害时，你能将你的熟练加值加入该法术的其中一枚伤害骰。此增益一经使用，直至完成长休你都无法再次使用。`, 

      "奥法护佑者(AU)": `奥法护佑者 Arcane Safeguard
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得戏法抵抗术Resistance。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
你能以附赠动作施展抵抗术Resistance。你可以如此做的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。
庇护之援Sheltering Aid。当你执行协助动作辅助一次盟友的属性检定时，那名盟友获得等于你熟练加值的临时生命值。`, 

      "奥法殡葬师(AU)": `奥法殡葬师 Arcane Undertaker
出处：《启封奥秘》
起源专长
你获得以下增益。
戏法Cantrip。你习得一道你选择的牧师或法师戏法。这道戏法必须来自死灵学派。你施展该法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
源死之识Knowledge from the Dead。当你进行智力（历史）或感知（医药）检定时，你可以投掷1d4并将骰值加入该属性检定。
晓亡之理Understanding of Death。当你执行协助动作稳定一名0生命值生物的伤势时，你获得英雄激励。此增益一经使用，直至完成长休你都无法再次使用。`, 

      "魔宠密友(AU)": `魔宠密友 Familiar Friend 
出处：《启封奥秘》
起源专长
你获得以下增益。
忠实伙伴Faithful Companion。你始终准备着法术寻获魔宠Find Familiar 。你施展该法术的施法属性是感知、智力或魅力（在你选取此专长时选择）。你可以无需法术位且无需材料成分地施展该法术一次，当你完成长休时，你重获以此法施展该法术的能力。你也能够以你拥有的任意法术位施展该法术。
强韧魔宠Fortified Familiar。当你施展法术寻获魔宠Find Familiar 时，你魔宠的生命值上限和当前生命值提升等于你角色等级两倍的数值。
得力助手Helpful Friend。 当你使用你具有熟练的技能进行属性检定时，若你的魔宠位于你5尺内，你的该检定获得优势。你能使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`, 

      "穿界者(AU)": `穿界者 Portal Jumper
出处：《启封奥秘》
起源专长
你获得以下增益。
异界抗性Otherworldly Resilience。你具有以下一种伤害类型的抗性：暗蚀、心灵或光耀（在你选取此专长时选择）。
穿界步Portal Step。 你能消耗15尺移动力传送至一处位于你15尺内你可见的未占据空间。你能使用此增益的次数等于你的熟练加值，但每回合限一次，当你完成长休时重获所有已消耗的使用次数。`, 

      "万化本质(AU)": `万化本质 Transmuted Anatomy
出处：《启封奥秘》
起源专长
你获得以下增益。
大步流星Lengthened Stride。你的速度提升5尺。
强韧内构Resilient Anatomy。你对抗将迫使你违背意愿变形的效应时进行的豁免具有优势。
此外，当你的体质豁免失败时，你能以反应投掷1d4并将骰值加入该豁免总值，这可能使失败改为成功。你能使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`, 

      "翠色魔法(FR)": `翠色魔法 Enclave Magic 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，翠绿闲庭新羽专长） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。 
动物伙伴Friend to Animals。当你对野兽执行影响动作时，你的属性检定具有优势。 
二体一心Two Hearts, One Mind。你始终准备着法术野兽感官Beasts Sense 。你可以无需法术位地施展该法术一次，当你完成长休时，你重获以此法施展该法术的能力。当你以此特性施展该法术时，该法术无需专注。你也能够以你拥有的任意合适环阶的法术位施展该法术。该法术的施法属性是你以此专长提升的属性。`, 

      "竖琴手协同(FR)": `竖琴手协同 Harper Teamwork 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，竖琴手特工专长） 
你获得以下增益。 
属性值提升Ability Score Increase。你的敏捷或魅力提升1，至多提升至20。 
妙语连珠Withering Wordplay。当你执行协助动作辅助盟友对敌人的攻击检定时，你的下个回合开始前该敌人进行的下次豁免检定也具有劣势。 
意志激励Inspiring Willpower。若你成功通过结束你身上的恐慌或麻痹状态的豁免检定，你能够选择一名30尺内你可见的具有相同状态的盟友。该盟友身上的此状态立即结束。`, 
      "教团韧性(FR)": `教团韧性 Order's Resilience 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，新锻臂铠专长） 
你获得以下增益。 
属性值提升Ability Score Increase。你的力量、感知或魅力提升1，至多提升至20。 
再起Resurge。当你陷入倒地状态时，你能够消耗仅5尺移动力起立。 
团结就是力量Stronger Together。若你位于未陷入失能状态的盟友的5尺内，你和该盟友的力量豁免检定具有优势。你陷入失能状态期间无法使用此增益。 `,
      "贵族信念(FR)": `贵族信念 Lordly Resolve 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，领主联盟特工专长） 
你获得以下增益。 
属性值提升Ability Score Increase。你的力量或魅力提升1，至多提升至20。 
执旗者Standard Bearer。以一个附赠动作，选择至多三名位于你60尺内能看见你的生物。每名速度不为0的目标均能够立即以反应起立并结束倒地状态。
此外，你增强目标的信念，持续1分钟或在你陷入失能状态时提前结束。信念增强期间，目标无法被附身或是获得魅惑或恐慌状态；若目标已被附身、魅惑或恐慌，则目标对抗相关效应的任意新豁免检定具有优势。 
此增益一经使用，直至完成长休你都无法再次使用。 `,
      "紫龙指挥官(FR)": `紫龙指挥官 Purple Dragon Commandant 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，紫龙新兵专长或军用武器熟练） 
你获得以下增益。 
属性值提升Ability Score Increase。你的力量或敏捷提升1，至多提升至20。 
鼓励盟友Encourage Ally。以一个附赠动作，你增强一名位于你30尺内你可见的盟友。该盟友获得等于2d6加你以此专长提升的属性的调整值的临时生命值。你能够使用此附赠动作的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。 
背水一战Last Stand。浴血期间你的攻击检定具有优势。 `,
      "咒火专家(FR)": `咒火专家 Spellfire Adept 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，咒火火花专长或施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。 
咒火燎原Fueled Spellfire。每回合一次，当一道你施展的法术造成光耀伤害时，你能够消耗并投掷至多两枚生命骰，将骰值总和加入该法术的其中一次伤害掷骰中。 
焦灼咒火Searing Spellfire。当你进行一次造成光耀伤害的伤害掷骰时，该伤害无视光耀伤害抗性。 `,
      "散塔林会战术(FR)": `散塔林会战术 Zhentarim Tactics 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+，散塔林会暴徒专长） 
你获得以下增益。 
属性值提升Ability Score Increase。你的敏捷或魅力提升1，至多提升至20。 
以血还血Retaliate。位于你5尺内生物以近战攻击命中你后，你可以立即对该生物发动一次借机攻击。 
万能佣兵Versatile Merc。当你完成长休时，选择一项你具有熟练的技能。你具有该技能的专精，持续至你下次完成长休。 `,
      "寒地施法者(FR)": `寒地施法者 Cold Caster 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。 
戏法Cantrip。你习得戏法冷冻射线Ray of Frost。若你已习得该戏法，你习得另一道你选择的法师戏法。该法术的施法属性是你以此专长提升的属性。 
霜噬Frostbite。每回合一次，当你以攻击检定命中一名生物并造成寒冷伤害时，你能够暂时削弱该生物的防御。在你的下个回合结束前，该生物进行的下次豁免检定减少1d4。 `,
      "妖精诡术(FR)": `妖精诡术 Fairy Trickster 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的敏捷或魅力提升1，至多提升至20。 
妖精轻步Faerie Trod Trotter。当你在你的回合内执行撤离动作时，本回合剩余的时间中，困难地形不会令你消耗额外的移动力。 
惊惶打击Flustering Strike。当你以攻击检定命中一名生物时，你能够尝试令目标惊惶失措。目标必须成功通过一次感知豁免（DC为8加你以此专长提升的属性的调整值加你的熟练加值），否则其进行的豁免检定具有劣势，持续至你的下个回合结束。 
你能够使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`, 
      "巨灵魔法(FR)": `巨灵魔法 Genie Magic 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。 
祈愿魔法Wish Magic。你能够以魔法动作施展一道你从术士法术列表中选择的一环法术，该法术的施法时间需为动作。此增益一经使用，直至完成长休你都无法再次使用。该法术的施法属性是你以此专长提升的属性。 
当你到达11级时，你以此专长施展的法术如同使用二环法术位施展。当你到达17级时，你以此专长施展的法术如同使用三环法术位施展。 `,
      "迷锁触碰(FR)": `迷锁触碰 Mythal Touched 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。 
迷锁守护Mythal Ward。若法术攻击命中你或你对抗法术的豁免检定失败，你能够以反应投掷迷锁触碰魔法表来创造一个魔法效应。若效应需求豁免，其DC为8加你以此专长提升的属性的调整值加你的熟练加值。你能够使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。 
迷锁触碰魔法Mythal Touched Magic 1d20 效应 
1-2 你和每名位于你15尺内的生物进行一次敏捷豁免，豁免失败则受到触发法术环阶1d8倍的力场伤害，豁免成功则受半伤。 
3-7  你和触发法术的施法者建立心灵链接，持续1小时。 
8-10 以你为中心半径15尺，高60尺柱状区域内的重力反转，持续1分钟，如同法术反转重力Reverse Gravity 。 
11-13 你和触发法术的施法者均进行一次体质豁免。豁免失败的生物陷入震慑状态直至其下个回合结束。 
14-17 你的AC获得+2加值，持续1分钟，若触发法术为法术攻击，则可能使该法术改为失手。 
18-19 触发法术的施法者10尺内的任意非魔法易燃物品，只要其未被其他生物着装或携带，均被火焰点燃，受到1d4火焰伤害并开始燃烧。 
20 触发法术消散且不产生效应，且用于施展该法术的动作、附赠动作或反应被浪费。若该法术为使用法术位施展的，则该法术位不会被消耗。 `,
      "街头正义(FR)": `街头正义 Street Justice 
出处：《被遗忘国度：费伦英雄》
通用专长（先决：等级4+） 
你获得以下增益。
属性值提升Ability Score Increase。你的力量或敏捷提升1，至多提升至20。
锁头Headlock。你的盟友对因你陷入受擒的生物进行的攻击检定具有优势。
坚固锁结Sturdy Knot。当你使用链条、镣铐或绳索捆缚生物时，将你的熟练加值加入挣脱或破坏该链条、镣铐或绳索的DC中。
强硬言辞Tough Talk。你影响生物时，其敌对态度不会令你的魅力（威吓）检定具有劣势。`,
      "防护专家(AU)": `防护专家 Abjuration Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有防护专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
守护结界Protective Ward。当你使用法术位施展来自防护学派的法术时，你或一名位于你30尺内你可见的生物获得等于法术环阶两倍的临时生命值。
防护专家法术Abjuration Adept Spells 法术位
环阶 法术 
一 护盾术Shield 
二 次等复原术Lesser Restoration  
三 防护能量Protection from Energy  
四 放逐术Banishment 
五 群体疗伤术Mass Cure Wounds  `,
      "咒法专家(AU)": `咒法专家 Conjuration Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有咒法专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
恒久咒法Presistent Conjuration。为一道来自咒法学派的法术维持专注期间，你为维持专注进行的体质豁免具有加值。加值等于你以此专长增加属性的调整值。
咒法专家法术Conjuration Adept Spells 法术位
环阶 法术 
一 纠缠术Entangle 
二 迷踪步Misty Step 
三 咒唤兽群Conjure Animals 
四 任意门Dimension Door 
五 咒唤元素Conjure Elemental `,
      "预言专家(AU)": `预言专家 Divination Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有预言专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
先见干预Prescient Intervention。当一名位于你60尺内你可见的生物进行D20检定时，你能以反应令那名生物的那次掷骰获得优势或劣势（由你选择）。
此增益一经使用，直至完成长休你都无法再次使用。当你使用法术位施展一道预言学派的法术时，重置该特性*的使用权。（译注：原文如此）
预言专家法术Divination Adept Spells 法术位
环阶 法术 
一 侦测善恶Detect Evil and Good 
二 心灵尖刺Mind Spike 
三 鹰眼术Clairvoyance 
四 预言术Divination 
五 探知术Scrying `,
      "惑控专家(AU)": `惑控专家 Enchantment Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有惑控专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
精妙惑控Subtle Enchantments。当你使用法术位施展一道来自惑控学派的法术时，你施展该法术时可以无需任意言语、姿势或材料成分，除非该材料成分会被那道法术消耗或在法术中具有指定的价值。  
惑控专家法术Enchantment Adept Spells 法术位
环阶 法术 
一 不谐低语Dissonant Whispers 
二 注目术Enthrall 
三 定身类人Hold Person 
四 支配野兽Dominate Beast 
五 篡改记忆Modify Memory `,
      "塑能专家(AU)": `塑能专家 Evocation Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有塑能专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
塑能助燃Fueled Evocation。每回合一次，当你施展一道造成伤害的塑能法术时，你可以投掷至多两枚你未消耗的生命骰并将骰值总值加入该法术的其中一枚伤害骰。那些生命骰其后被消耗。
塑能专家法术Evocation Adept Spells 法术位
环阶 法术 
一 繁彩球Chromatic Orb 
二 粉碎音波Shatter 
三 火球术Fireball 
四 浓酸球Vitriolic Sphere 
五 力场墙Wall of Force `,
      "幻术专家(AU)": `幻术专家 Illusion Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有幻术专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
幻象宗师Masterful Illusions。当你使用法术位施展一道来自幻术学派的法术时，你施展该法术时可以无需任意言语、姿势或材料成分，除非该材料成分会被那道法术消耗或在法术中具有指定的价值。 
此外，生物为识破你的法术所创造幻象真实本质进行的智力（调查）检定具有优势。 
幻术专家法术Illusion Adept Spells 法术位
环阶 法术 
一 无声幻影Silent Image 
二 魅影之力Phantasmal Force 
三 高级幻影Major Image 
四 幻景Mirage Arcane 
五 伪装术Seeming `,
      "死灵专家(AU)": `死灵专家 Necromancy Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有死灵专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
操纵生命Life Manipulation。当你使用法术位施展一道来自死灵学派的法术时，你可以立即投掷至多两枚你未消耗的生命骰。你恢复等于骰值总值加所消耗法术位环阶的生命值。那些生命骰其后被消耗。 
死灵专家法术Necromancy Adept Spells 法术位
环阶 法术 
一 致伤术Inflict Wounds 
二 衰弱射线Ray of Enfeeblement 
三 汲血之触Vampiric Touch 
四 枯萎术Blight 
五 死者复活Raise Dead `,
      "变化专家(AU)": `变化专家 Transmutation Adept 
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你的造诣令你始终将特定法术准备就绪。当你具有变化专家法术表指定环阶的法术位时，你此后始终准备着该环阶及更低环阶对应的法术。
魔法增幅Magical Augmentation。当你在你的回合内使用法术位施展一道来自变化学派的法术时，你的速度增加等于所消耗法术位环阶五倍的尺数。该增幅持续至该回合结束。
变化专家法术Transmutation Adept Spells 法术位
环阶 法术 
一 跳跃术Jump 
二 蛛行术Spider Climb 
三 缓慢术Slow 
四 变形术Polymorph 
五 活化物件Animate Objects `,
      "元素魔宠(AU)": `元素魔宠 Elemental Familiar
出处：《启封奥秘》
通用专长（先决：等级4+，魔宠密友专长）
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至20。
元素赋能Elemental Energy。你学会了如何赋予你魔宠元素之力。当你施展法术寻获魔宠Find Familiar时，选择强酸、寒冷、火焰、闪电或雷鸣。你的魔宠被赋予这种能量，令其获得以下增益，持续至你再次施展寻获魔宠Find Familiar：
元素抗性Elemental Resistance。你的魔宠具有对所选类型伤害的抗性。 
能量脉冲Energy Pulse。你以附赠动作命令魔宠释放元素能量爆发。你的魔宠必须位于你120尺内并以反应释放此爆发。位于源自你魔宠的5尺光环区域内的每名生物必须进行一次敏捷豁免（DC为8加你寻获魔宠Find Familiar的施法属性调整值加你的熟练加值）。豁免失败则生物受到2d4所选类型的伤害，且若生物体型不超过中型，其陷入倒地。`,
      "异界魔宠(AU)": `异界魔宠 Otherworldly Familiar
出处：《启封奥秘》
通用专长（先决：等级4+，魔宠密友专长）
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至20。
异界赋能Otherworldly Energy。当你施展法术寻获魔宠Find Familiar时，你可以赋予你的魔宠异界威能，持续至你再次施展寻获魔宠Find Familiar。赋能期间，你的魔宠获得以下增益。
能量抗性Energy Resistance。选择暗蚀、毒素、心灵、光耀或雷鸣伤害。你的魔宠具有对所选类型伤害的抗性。 
相位行走Phase Walk。你的魔宠可以移动穿过其他生物和物件，如同穿过困难地形一般。若你的魔宠在其回合结束时还处于物件内，其被转移至其最后身处的未占据空间。`,
      "慰疗魔宠(AU)": `慰疗魔宠 Soothing Familiar
出处：《启封奥秘》
通用专长（先决：等级4+，魔宠密友专长）
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至20。
治愈信标Healing Beacon。 只要你的魔宠位于你120尺内，正能量充斥源自你魔宠的5尺光环区域。每当一名盟友在此光环掷骰以决定生物恢复的生命值数值时，那名盟友可以将投出的1和2都视为3。`,
      "尚武魔宠(AU)": `尚武魔宠 Warlike Familiar
出处：《启封奥秘》
通用专长（先决：等级4+，魔宠密友专长）
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至20。
战斗魔宠Battle Familiar。 你始终准备着法术战斗魔宠Battle Familiar（见第二章）。你可以无需法术位地施展该法术一次，当你完成长休时，重获以此法施展该法术的能力。你也能够以你拥有的任意合适环阶的法术位施展该法术。该法术的施法属性与你为魔宠密友专长的忠实伙伴增益所选的属性。
拦截攻击Intercept Attack。当一名位于你魔宠5尺内的生物被一次攻击检定命中时，你的魔宠能执行反应，令该生物对抗那次攻击的护甲等级获得加值，可能使那次攻击改为失手。加值等于你的熟练加值。 `,
      "魔法行家(AU)": `魔法行家 Magic Connoisseur 
出处：《启封奥秘》
通用专长（先决：等级4+，魔法学徒专长）
你获得以下增益。
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
额外法术Additional Spells。你从魔法学徒的戏法所选的法术列表中选择一道一环法术和一道二环法术。你始终准备着那些法术。你可以无需法术位地施展每道法术各一次，当你完成长休时，重获以此法施展该法术的能力。你也能够以你拥有的任意合适环阶的法术位施展这些法术。这些法术的施法属性与你为魔法学徒专长的法术所选的施法属性相同。
法术切换Spell Change。每当你获得新的等级时，你可以将你在此专长选择的其中一道法术替换为另一道来自所选法术列表的环阶相同的法术。 `,
      "法术抗性(AU)": `法术抗性 Spell Resistant
出处：《启封奥秘》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。你的敏捷或体质属性提升1，至多提升至20。
魔法抗性Magical Resilience。你具有以下一种伤害类型的抗性（在获得此专长时选择）：暗蚀、心灵、光耀或雷鸣。
魔法抵抗Magic Resistant。当你对抗法术或魔法效应的豁免将要失败时，你能投掷1d6并将结果加入豁免总值，这可能使失败改为成功。你能使用此增益的次数等于你的熟练加值，当你完成长休时重获所有已消耗的使用次数。`,
      "法术诡计(AU)": `法术诡计 Spell Subterfuge
出处：《启封奥秘》
通用专长（先决：等级4+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至20。
覆身法术Shrouding Spells。在你使用法术位施展一道施法时间为动作的法术后，你能以附赠动作同时执行疾走和躲藏动作。你能使用此增益的次数等于你以此专长提升的属性调整值，当你完成长休时重获所有已消耗的使用次数。
隐秘施法Sneaky Casting。若你具有躲藏动作的隐形状态，只要你在四分之三掩护或全身掩护后结束该回合，施展带有言语成分的法术或发动法术攻击就不会终止你身上的该隐形状态。`,


"嗜血(ABH)": `嗜血 Bloodlust
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你的力量、敏捷或体质提升1，至多提升至20。
强效恢复Powerful Recovery。 当你掷一枚生命骰以恢复生命值时，你可以将掷出的1和2都视为3。
血腥饕宴Sanguine Feast。 每回合一次，当你以攻击检定命中一名处于浴血的非构装非亡灵生物时，你可以消耗并投掷一枚生命骰，恢复等于骰值+你体质调整值的生命值。
你可以使用此增益的次数等同于等于你的熟练加值，完成长休后，你重获所有已消耗的使用次数。`,

"爆破手(ABH)": `爆破手 Bomber
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你的敏捷提升1，至多提升至20。
远距投手Far Lobber。 当你使用攻击动作投掷一个扁瓶或小瓶时，能够以一个在你40尺范围内你可见的物件或生物作为目标。
百步穿杨Long Shots。 使用投掷武器攻击超出常规射程的目标时，你的攻击检定不会因此具有劣势。`,

"黏滞迷雾(ABH)": `黏滞迷雾Cloying Mists 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你的智力、感知或魅力提升1，至多提升至20。
雾，起Arise, Fog。你始终准备着法术云雾术Fog Cloud 。你可以无需法术位地施展该法术一次，你必须完成长休后才能再次以此法施展该法术。你也能够以你拥有的任意合适环阶的法术位施展该法术。该法术的施法属性是你以此专长提升的属性。
缠云缚雾Grasping Mist。每当你施展云雾术Fog Cloud 时，法术球状区域内的非魔法火焰会被熄灭，并且除你与你盟友以外的生物在法术球状区域中的速度减少5尺。`,

"沉溺痛苦(ABH)": `沉溺痛苦 Delicious Pain 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你选择的一项属性提升1，至多提升至20。
坚韧身躯Toughened Flesh。 在受到钝击、穿刺或挥砍伤害后，你能立即以反应来获得对钝击、穿刺与挥砍伤害的抗性，持续至你的下个回合开始。此增益一经使用，直至完成短休或长休你都无法再次使用。`,

"光明使者(ABH)": `光明使者 Light Bringer 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你的智力、感知或魅力提升1，至多提升至20。
神圣魔法Sacred Magic。你习得戏法光亮术Light ，且可以无需材料成分施展该戏法。若你已习得该戏法，你可以选择习得另一道牧师戏法。该法术的施法属性是你以此专长提升的属性。
日耀之辉Solar Luminance。 当你施展光亮术时，你可以使该法术的光芒成为日光。此增益一经使用，直至完成短休或长休你都无法再次使用。
日之疗愈Sun's Healing。 若你身处日光下，你能以附赠动作消耗一枚生命骰，掷骰并恢复等于掷骰结果的生命值。此增益一经使用，直至完成短休或长休你都无法再次使用。`,


"吻痕(ABH)": `吻痕 Love Bites 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你选择的一项属性提升1，至多提升至20。
甘之如饴Endearing Pain。 在你以近战武器或徒手打击对一名生物造成伤害后，你能立即以附赠动作令目标陷入魅惑状态，持续至你的下个回合开始，或在你或你的盟友对其造成伤害时提前结束。此增益一经使用，直至完成短休或长休你都无法再次使用。`,

"残尸败蜕(ABH)": `残尸败蜕 Putrefy 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你选择的一项属性提升1，至多提升至20。
疽腐蚀骨Necrosis。当你进行暗蚀伤害的伤害掷骰时，你能令受到此伤害的一名生物陷入中毒状态，直至你的下个回合开始。此增益一经使用，直至完成短休或长休你都无法再次使用。`,

"咎罪责难(ABH)": `咎罪责难 Rebuke 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你选择的一项属性提升1，至多提升至20。
至耀光击Radiant Strike。 当你进行光耀伤害的伤害掷骰时，你能令受到此伤害的一名不超过巨型的生物陷入倒地状态。此增益一经使用，直至完成短休或长休你都无法再次使用。`,

"祸国叛心(ABH)": `祸国叛心 Treacherous Allure 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你的智力、感知或魅力提升1，至多提升至20。
摄心魅影Enchanting Presence。你始终准备着魅惑类人Charm Person 。你也能够以你拥有的任意合适环阶的法术位施展该法术。你可以无需法术位地施展该法术一次，你必须完成长休后才能再次以此法施展该法术。该法术的施法属性是你以此专长提升的属性。
命定之逆Inevitable Betrayal。 你对陷入魅惑状态的生物进行的攻击检定具有优势。`,

"吸血鬼触碰(ABH)": `吸血鬼触碰 Vampire Touched 
出处：《阿斯代伦的饥渴之书》
通用专长（先决：等级4+）
你获得以下增益。
属性值提升Ability Score Increase。 你的智力、感知或魅力提升1，至多提升至20。
吸血鬼魔法Vampire Magic。选择一道惑控或幻术学派的一环法术，你始终准备着你选择的这道法术与蛛行术Spider Climb。你可以无需法术位地施展每道法术各一次，但当你以此法施展蛛行术Spider Climb 时，必须以你自身为目标。你必须完成长休后才能再次以此法施展这些法术。你也能够以你拥有的任意合适环阶的法术位施展这些法术。这些法术的施法属性是你以此专长提升的属性。`,
      "次元旅行之恩惠": `次元旅行之恩惠 Boon of Dimensional Travel
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
闪烁步 Blink Steps。当你执行攻击动作或魔法动作后，你可以立即传送至多30尺的距离到一处你可见的未占据空间内。`,
      "能量抗性之恩惠": `能量抗性之恩惠 Boon of Energy Resistance
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
能量抗性 Energy Resistances。从下列伤害类型中选择两种：强酸、寒冷、火焰、闪电、暗蚀、毒素、心灵、光耀或雷鸣。你获得所选伤害类型的抗性。每当你完成长休时，你都可以改变此处选择的伤害类型。
能量重导 Energy Redirection。当你受到伤害时，若该伤害的伤害类型是你能量抗性增益中所选类型之一，你能够以反应来将一次相同类型的伤害传导给你60尺内的、可见的另一名生物（不能是对你而言处于全身掩护下的生物）。若你如此做，该生物必须通过一次敏捷豁免（DC等于8+你的体质调整值+你的熟练加值），否则其受到2d12+你的体质调整值伤害。`,
      "扭曲命运之恩惠": `扭曲命运之恩惠 Boon of Fate
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
时来运转 Improve Fate。当你或位于你60尺内的另一名生物的D20检定中成功时或失败时，你可以投掷2d4，并将掷骰结果作为加值或减值附加到d20掷骰中。该增益一经使用，直至你投掷先攻、完成短休或完成长休你都无法再次使用。`,
      "超凡强韧之恩惠": `超凡强韧之恩惠 Boon of Fortitude
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
身强体壮 Fortified Health。你的生命值上限增加40。此外，每当你恢复生命值时，你可以恢复等于你体质调整值的额外生命值。以此恢复了额外生命值后，直至下个你的回合开始后你才能再次受益于此效果。`,
      "无敌攻势之恩惠": `无敌攻势之恩惠 Boon of Irresistible Offense
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你的力量或敏捷提升1，至多提升至30。
摧坚破甲 Overcome Defenses。你造成的钝击、挥砍与穿刺伤害始终无视抗性。
无阻打击 Overwhelming Strike。当你为一次攻击检定投掷的d20骰出了20时，你可以对目标造成额外伤害，你造成的额外伤害等于你以此专长提升的属性的属性值，伤害类型与这次攻击的伤害类型相同。`,
      "强力恢复之恩惠": `强力恢复之恩惠 Boon of Recovery
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
背水一战 Last Stand。当你的生命值将要降至0时，你可以改为降至1并恢复等于你生命值上限一半的生命值。该增益一经使用，直到完成长休你都无法再次被使用。
重获生机 Recover Vitality。你获得一个有着十枚d10的治疗池。以一个附赠动作，你可以消耗治疗池中任意枚骰子来恢复你的生命值。投掷全部你消耗的骰子，将掷骰结果相加，即是你以此恢复的生命值。当你完成长休时，你的治疗池重获所有被消耗的骰子。`,
      "博学多才之恩惠": `博学多才之恩惠 Boon of Skill
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
全能专家 All-Around Adept。你获得所有技能的熟练。
专精 Expertise。选择一项你不具有专精的技能，你获得该技能的专精。`,
      "神行无拘之恩惠": `神行无拘之恩惠 Boon of Speed
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
逃脱大师 Escape Artist。你能够以一个附赠动作执行撤离动作，并结束你陷入的受擒状态。
风驰电掣 Quickness。你的速度提升30尺。`,
      "法术溯回之恩惠": `法术溯回之恩惠 Boon of Spell Recall
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。
免费施法 Free Casting。每当你使用一环到四环的法术位施展法术时，投掷1d4。若掷骰结果与你消耗的法术位环阶一致，则该法术位不会被消耗。`,
      "暗夜精魂之恩惠": `暗夜精魂之恩惠 Boon of the Night Spirit
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
融身入影 Merge with Shadows。身处微光光照或黑暗期间，你可以用附赠动作令你获得隐形状态。隐形状态将在你执行动作/附赠动作/反应后立即结束。
幽影化身 Shadowy Form。身处微光光照或黑暗期间，你具有除心灵和光耀伤害外所有伤害的抗性。`,
      "真实视觉之恩惠": `真实视觉之恩惠 Boon of Truesight
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升 Ability Score Increase。你选择的一项属性提升1，至多提升至30。
真实视觉 Truesight。你获得60尺真实视觉。`,

"血海漂橹之恩惠(FR)": `血海漂橹之恩惠 Boon of Bloodshed 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。 
杀手机运Killer's Fortune。当一名你可见的敌人生命值降至0时，你的下次攻击检定获得优势，持续至你的下个回合结束。 
痛心切骨Power from Pain。每回合一次，当你在浴血期间进行攻击检定时，你可以额外对目标造成等于熟练加值的伤害。额外伤害的伤害类型与该攻击的伤害类型一致。`,
      "生机勃发之恩惠(FR)": `生机勃发之恩惠 Boon of Bountiful Health 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。 
超健康Augmented Health。当你获得临时生命值时，该临时生命值数值提升5。 
超恢复Superior Recuperation。当你消耗一枚或更多生命骰恢复生命值时，你能够以每枚骰子可能掷出的最高值替代其骰值。 `,
      "八面玲珑之恩惠(FR)": `八面玲珑之恩惠 Boon of Communication 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。 
巧妙讲演Cunning Speaker。你影响敌对生物时进行的属性检定不具有劣势。 
天赐译员Gifted Interpreter。你理解你看见或听见的任意语言手势的字面意思。你理解你看见的任意语言文字的字面意思。 
心灵沟通Mental Communication。你获得120尺心灵感应。`, 
      "绝境逢生之恩惠(FR)": `绝境逢生之恩惠 Boon of Desperate Resilience 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的力量或体质提升1，至多提升至30。 
心体防护Defense of Body and Mind。浴血期间，你对除力场伤害外的所有类型伤害具有抗性。 `,
      "熠熠生辉之恩惠(FR)": `熠熠生辉之恩惠 Boon of Exquisite Radiance 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。 
永恒安眠Eternal Rest。被你降至0生命值的生物无法变为亡灵。 
磊落光明Powerful Radiance。当你进行一次造成光耀伤害的伤害掷骰时，你能够以每枚骰子可能掷出的最高值替代其骰值。此增益一经使用，直至完成长休你都无法再次使用。`, 
      "变幻无常之恩惠(FR)": `变幻无常之恩惠 Boon of Fluid Forms 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。 
变形生物Shapechanger。你能够以魔法动作变形为挑战等级不高于10的野兽、类人或怪兽。当你变形时，你获得等于新形态生命值的临时生命值。变形效应持续1小时，并在你不具有剩余的临时生命值时或在你执行魔法动作变回真实形态时提前结束。 
你的游戏数据被你选择形态的数据卡所替换，但你保留你的生物类型；阵营；个性；智力、感知和魅力属性值；生命值；生命骰；熟练项；交流能力。若你具有施法或契约魔法特性，你同样保留之。变形时，由你决定着装或携带的每件装备是掉落在地上或是适应你的新形态调整大小与形状（仅当你置身其中期间）。 
此增益一经使用，直至完成长休你都无法再次使用。 
变化适性Hardy Transformation。当你在变形时获得临时生命值时，该临时生命值数值提升20。 `,
      "命运眷顾之恩惠(FR)": `命运眷顾之恩惠 Boon of Fortune's Favor 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。 
豁免重骰Saving Throw Reroll。当你的豁免检定失败时，你能够重新掷骰但必须使用新的结果。此增益一经使用，直至你的下个回合开始你都无法再次使用。 `,
      "毒手殁心之恩惠(FR)": `毒手殁心之恩惠 Boon of Poison Mastery 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。 
百毒不侵Antitoxic。你具有对毒素伤害和中毒状态的免疫。 
完美毒师Perfect Poisoner。每回合一次，当你掷骰以决定生物因你的攻击、法术或特性受到的毒素伤害时，你能够以每枚骰子可能掷出的最高值替代其骰值。 `,
      "夜宴狂欢之恩惠(FR)": `夜宴狂欢之恩惠 Boon of Revelry 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。 
舞动灵感Inspire Dance。你始终准备着法术奥图迷舞Otto's Irresistible Dance。你可以无需法术位地施展该法术一次，当你完成长休时，你重获以此法施展该法术的能力。你也能够以你拥有的任意合适环阶的法术位施展该法术。 
当你施展该法术时无需法术成分，且受到伤害不会打断你该法术的专注。 
（译注：本专长未写明法术的施法属性，原文如此） 
放声歌唱Sing Out。若一名生物因对抗你的奥图迷舞Otto's Irresistible Dance豁免失败而陷入该法术造成的魅惑状态，其无法施展需要言语成分的法术，且若其能够唱歌，其将哼唱无意义的悦耳小调。 `,
      "惊魂落魄之恩惠(FR)": `惊魂落魄之恩惠 Boon of Terror 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的魅力提升1，至多提升至30。 
无所畏惧Fearless。你具有对恐慌状态的免疫。 
逃吧，蠢货Flee, Fools！当一名陷入恐慌状态的生物在你60尺内开始其回合时，只要你可以看见该生物且其未身处全身掩护之后，你就能够以反应加剧其恐惧。若你如此做，该生物必须成功通过一次感知豁免（DC为8加你的魅力调整值加你的熟练加值），否则需要消耗其回合以可用的最快方式移动远离你。此增益一经使用，直至完成短休或长休你都无法再次使用。 
令人生畏Intimidating。若你不具有威吓技能的熟练，你获得之。你还会获得威吓专精。 `,
      "旭日骄阳之恩惠(FR)": `旭日骄阳之恩惠 Boon of the Bright Sun 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。 
属性值提升Ability Score Increase。你的体质、感知或魅力提升1，至多提升至30。 
如日当空Daylight Presence。以一个附赠动作，你在30尺光环区域内散发如同阳光的明亮光照。若任意光环区域与法术创造的黑暗区域重叠，该法术被解除。光环持续至你解除之（无需动作）、你死亡或你陷入失能状态。 
守御之光Fortifying Light。当你的如日当空激活时（译注：原文如此，按后文看应是激活期间），每个你的回合开始时，你和如日当空区域内你可见的盟友获得10临时生命值。 `,
      "暴风骤岚之恩惠(FR)": `暴风骤岚之恩惠 Boon of the Furious Storm 
传奇恩惠专长（先决：等级19+，施法或契约魔法特性） 
你获得以下增益。 
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。 
暴风之眼Eye of the Storm。你对闪电和雷鸣伤害具有抗性。浴血期间，你对闪电和雷鸣伤害具有免疫。 
风暴之力Storm's Strength。生物在对抗你造成闪电或雷鸣伤害的法术时进行的豁免检定具有劣势。 `,
      "汲魂饮魄之恩惠(FR)": `汲魂饮魄之恩惠 Boon of the Soul Drinker 
传奇恩惠专长（先决：等级19+） 
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。
墓亡抗性Grave Resistance。你对寒冷和暗蚀伤害具有抗性。
生命虹吸Siphon Life。当一名位于你120尺内的敌人生命值降至0时，你能够以反应恢复50生命值。此增益一经使用，直至完成短休或长休你都无法再次使用。`,
      "咒能爆发之恩惠(AU)": `咒能爆发之恩惠 Boon of Erupting Spellpower 
传奇恩惠专长（先决：等级19+，施法或契约魔法特性）
你获得以下增益。
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。
法术过载Spell Overload。 当你使用法术位施展一道造成伤害的法术时，你可以令其爆发魔法能量浪涌。你能将该法术伤害骰投出的1和2都视为3，且受到该法术伤害的生物陷入倒地状态。
此增益一经使用，直至投掷先攻、完成短休或完成长休你都无法再次使用。 `,
      "学派宗师之恩惠(AU)": `学派宗师之恩惠 Boon of Magic School Mastery 
传奇恩惠专长（先决：等级19+，施法或契约魔法特性）
你获得以下增益。
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。
学派精通Mastered Scool。 从八大魔法学派中选择一个：防护、咒法、预言、惑控、塑能、幻术、死灵、变化。你的选择赋予你以下特性：
强记施法Rote Casting。选择一道来自你选择学派且记录在你职业法术列表的一环法术。你始终准备着那道法术，且可以无需法术位且无需法术成分地施展该法术。 
招牌奥术Signature Arcanmum。 选择一道来自你选择学派的不高于七环的法术。你始终准备着那道法术。你可以无需法术位地施展该法术一次，当你完成长休时，重获以此法施展该法术的能力。
你也能够以你拥有的任意合适环阶的法术位施展这些准备法术。
复选Repeatable。你可多次选取本专长，但每次选取时都必须选择不同的魔法学派。`,
      "钢铁意志之恩惠(AU)": `钢铁意志之恩惠 Boon of the Iron Mind 
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升Ability Score Increase。 你选择的一项属性提升1，至多提升至30。
矢志不移Unshakeable Focus。 当你正为某效应维持专注时*，你仅会因以下情况失去专注：你施展一道需要专注的法术，你激活另一个需要专注的效应，你陷入石化或昏迷状态或你死亡。`,

      "炽耀黎明之恩惠(ABH)": `炽耀黎明之恩惠 Boon of Blazing Dawn
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。
蒙受日宠Beloved of the Sun。你具有对光耀伤害的免疫。
炽曜打击Blazing Strike。当你以武器攻击命中一名生物时，你可以选择将其伤害改为光耀伤害，或是维持武器原本的伤害类型。
东曦既驾Burst of Sunlight。每回合一次，当你以造成光耀伤害的攻击检定命中一名生物时，你自身散发出半径30尺的明亮光照以及额外30尺的微光光照，持续至你的下个回合开始。这些光照是阳光。`,

      "厄影迫现之恩惠(ABH)": `厄影迫现之恩惠 Boon of Looming Shadows
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升Ability Score Increase。你选择的一项属性提升1，至多提升至30。
舒阴展影Shadowy Stretch。当你执行攻击动作时，你近战武器攻击的触及范围提升10尺，持续至你的回合结束。
舞动侧影Dacing Silhouette。你能以附赠动作执行回避动作。`,

      "雾影遁形之恩惠(ABH)": `雾影遁形之恩惠 Boon of Misty Escape
传奇恩惠专长（先决：等级19+）
你获得以下增益。
属性值提升Ability Score Increase。你的智力、感知或魅力提升1，至多提升至30。
气化形体Gaseous Form。若你的生命值降至0但未立即死亡，你能改为将生命值降至1并无需法术位地施展法术气化形体Gaseous Form（无需动作）。以此法施展该法术时，你只能以你自身为目标，你的飞行速度为20尺，法术持续期间，你的每个回合开始时，你恢复10生命值。该法术的施法属性是你以此专长提升的属性。
此增益一经使用，直至完成长休你都无法再次使用。`,

    };

    function getFeatLevelDefaults() {
      const levels = [1, 4, 8, 12, 16, 19];
      const mainClass = classSelect.value;
      const multiClass = multiClassSelect.value;

      if (mainClass === "战士" || multiClass === "战士") levels.push(6, 14);
      if (mainClass === "游荡者" || multiClass === "游荡者") levels.push(10);
      if (raceSelect.value === "人类") levels.push(1);

      return levels.sort((a, b) => a - b);
    }

    function decorateFeatDescription(description) {
      description.addEventListener("dblclick", (event) => {
        event.preventDefault();
        const expanded = description.classList.toggle("expanded");
        if (expanded) description.focus();
      });
    }

    function populateFeatSelect(select) {
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "—";
      select.appendChild(placeholder);

      const custom = document.createElement("option");
      custom.value = CUSTOM_VALUE;
      custom.textContent = "自定义";
      select.appendChild(custom);

      for (const group of featCatalog) {
        const separator = document.createElement("option");
        separator.value = `__feat_group__${group.label}`;
        separator.textContent = group.label;
        separator.disabled = true;
        select.appendChild(separator);

        for (const name of group.items) {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          select.appendChild(option);
        }
      }
    }

    function syncFeatCustomUI(row) {
      const select = row.querySelector(".feat-name-select");
      const customInput = row.querySelector(".feat-custom-name-input");
      const reset = row.querySelector(".feat-custom-reset");
      if (!select || !customInput || !reset) return;

      const custom = select.value === CUSTOM_VALUE;
      select.hidden = custom;
      customInput.hidden = !custom;
      reset.hidden = !custom;
    }

    function setFeatDescription(row, name) {
      const description = row.querySelector(".feat-description");
      if (!description) return;
      const raw = name ? (featDescriptionData[name] || "") : "";
      const breakIndex = raw.indexOf("\n");
      const text = breakIndex >= 0 ? raw.slice(breakIndex + 1) : raw;
      description.value = text;
      description.classList.toggle("is-default", Boolean(text));
      description.classList.remove("expanded");
      description.scrollTop = 0;
      applyHpGrowthDefault();
      updateCombatStats();
    }

    const combatStyleCatalog = [
      "箭术", "盲斗", "防御", "对决", "巨武器战斗", "拦截", "守护",
      "投掷武器战斗", "双武器战斗", "徒手战斗", "集群战斗(Drop)", "俯卧战斗(Drop)",
      "奥法武斗家(AU)"
    ];

    const combatStyleDescriptionData = {
      "箭术": `战斗风格专长（先决：战斗风格特性）
你使用远程武器进行的攻击检定获得+2加值。`,
      "盲斗": `战斗风格专长（先决：战斗风格特性）
你具有10尺<span class="term-green">盲视</span>。`,
      "防御": `战斗风格专长（先决：战斗风格特性）
着装轻甲、中甲或重甲期间，你的护甲等级获得+1加值。`,
      "对决": `战斗风格专长（先决：战斗风格特性）
当你单手持用一把近战武器且没有持用其他武器时，你使用那把武器进行的伤害掷骰获得+2加值。`,
      "巨武器战斗": `战斗风格专长（先决：战斗风格特性）
当你用双手持握的一把近战武器发动了一次攻击并为其进行伤害掷骰时，若该武器具有双手或多用词条，那么你便可以将伤害骰投出的1和2都视为3。`,
      "拦截": `战斗风格专长（先决：战斗风格特性）
当一名你可见的生物以攻击检定命中你5尺内的另一名生物*，你能够以反应减少对目标造成的伤害，使该伤害降低1d10+你的熟练加值。你必须持握着一面盾牌或者一把简易/军用武器才能使用这个反应。
*译注：此处原文为 a creature you can see hits another creature within 5 feet of you，another 具体指的是对攻击生物而言还是对你而言在外网亦有所争论，请自行决断。`,
      "守护": `战斗风格专长（先决：战斗风格特性）
当一名你可见的生物对一个你5尺内的除你以外的目标发动攻击时，若你正持握着一面盾牌，你能够以反应将盾牌挡在中间。你对触发攻击检定施加<span class="term-green">劣势</span>，并且只要你还位于目标5尺内，其他所有对该目标进行的攻击检定也具有<span class="term-green">劣势</span>，持续至你的下回合开始。`,
      "投掷武器战斗": `战斗风格专长（先决：战斗风格特性）
当你使用具有投掷词条的武器进行远程攻击检定并命中时，你在该次伤害掷骰中获得+2加值。`,
      "双武器战斗": `战斗风格专长（先决：战斗风格特性）
当你因使用具有<span class="term-green">轻型</span>词条的武器而得以发动额外的攻击时，若此次额外的攻击的伤害本来无法加入你的属性调整值，你可以加入你的属性调整值。`,
      "徒手战斗": `战斗风格专长（先决：战斗风格特性）
当你使用<span class="term-green">徒手打击</span>命中并造成了伤害时，你可以改为造成1d6+你的力量调整值点钝击伤害，而非原本的<span class="term-green">徒手打击</span>伤害。如果你进行攻击检定时并没有持握任何武器与盾牌，则上述伤害中的d6将变为d8。
每当你的回合开始时，你还可以对一个因你受擒的生物造成1d4点钝击伤害。`,
      "集群战斗": `战斗风格专长（先决：战斗风格特性）
当你以武器或徒手打击对生物发动近战攻击时，若该生物5尺内存在有至少一名你的盟友，且该盟友未陷入失能状态，你的伤害掷骰获得+1加值。若该生物5尺内存在有至少一名也具有此专长且未陷入失能状态的你的盟友，此加值提升至+2。`,
      "俯卧战斗": `战斗风格专长（先决：战斗风格特性）
在你陷入<span class="term-green">倒地</span>状态期间，你不会由于<span class="term-green">倒地</span>状态而在攻击检定上具有<span class="term-green">劣势</span>，且<span class="term-green">倒地</span>状态不会为对你发动的攻击提供<span class="term-green">优势</span>。`,
      "奥法武斗家": `战斗风格专长（先决：战斗风格特性）
你获得以下增益。
你习得两道你选择的法师戏法。推荐选择<span class="custom-spell">法师之手 Mage Hand</span>和<span class="custom-spell">冷冻射线 Ray of Frost</span>。你施展这些法术的施法属性是智力、感知或魅力（在你选取此专长时选择）。
每当你获得等级时，你可以将其中一道戏法替换为另一道法师戏法。`
    };

    function populateCombatStyleSelect(select) {
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "—";
      select.appendChild(placeholder);

      const custom = document.createElement("option");
      custom.value = CUSTOM_VALUE;
      custom.textContent = "自定义";
      select.appendChild(custom);

      for (const name of combatStyleCatalog) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      }
    }

    function syncCombatStyleCustomUI(row) {
      const select = row.querySelector(".combat-style-select");
      const input = row.querySelector(".combat-style-custom-input");
      const reset = row.querySelector(".combat-style-custom-reset");
      if (!select || !input || !reset) return;

      const custom = select.value === CUSTOM_VALUE;
      select.hidden = custom;
      input.hidden = !custom;
      reset.hidden = !custom;
    }

    function setCombatStyleDescription(row, name) {
      const description = row.querySelector(".feat-description-rich");
      if (!description) return;

      if (!name) {
        description.innerHTML = "";
        description.classList.remove("is-default");
      } else {
        description.innerHTML = combatStyleDescriptionData[name] || "";
        description.classList.add("is-default");
      }
      description.classList.remove("expanded");
      description.scrollTop = 0;
    }

    function createCombatStyleRow(body, block) {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const nameControl = document.createElement("div");
      nameControl.className = "feat-name-control";
      const select = document.createElement("select");
      select.className = "feat-name-select combat-style-select";
      select.setAttribute("aria-label", "战斗风格");
      populateCombatStyleSelect(select);

      const customName = document.createElement("input");
      customName.type = "text";
      customName.className = "feat-custom-name-input combat-style-custom-input";
      customName.placeholder = "自定义战斗风格";
      customName.autocomplete = "off";
      customName.setAttribute("aria-label", "自定义战斗风格名称");
      customName.hidden = true;

      const customReset = document.createElement("button");
      customReset.type = "button";
      customReset.className = "custom-reset combat-style-custom-reset";
      customReset.textContent = "×";
      customReset.title = "返回战斗风格选择";
      customReset.setAttribute("aria-label", "返回战斗风格选择");
      customReset.hidden = true;

      nameControl.append(select, customName, customReset);
      nameCell.append(nameControl);

      const descriptionCell = document.createElement("td");
      const description = document.createElement("div");
      description.className = "feat-description feat-description-rich";
      description.contentEditable = "true";
      description.setAttribute("role", "textbox");
      description.setAttribute("aria-multiline", "true");
      description.setAttribute("aria-label", "战斗风格描述");
      description.title = "双击展开或收起";
      decorateFeatDescription(description);
      description.addEventListener("input", () => {
        description.classList.remove("is-default");
      });

      select.addEventListener("change", () => {
        if (select.value === CUSTOM_VALUE) {
          customName.value = "";
          syncCombatStyleCustomUI(row);
          setCombatStyleDescription(row, "");
          customName.focus();
          return;
        }

        customName.value = "";
        syncCombatStyleCustomUI(row);
        setCombatStyleDescription(row, select.value);
      });

      customReset.addEventListener("click", () => {
        select.value = "";
        customName.value = "";
        syncCombatStyleCustomUI(row);
        setCombatStyleDescription(row, "");
        select.focus();
      });

      syncCombatStyleCustomUI(row);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "feat-delete";
      deleteButton.textContent = "×";
      deleteButton.title = "删除此行";
      deleteButton.setAttribute("aria-label", "删除此行");
      deleteButton.addEventListener("click", () => {
        row.remove();
        if (body.children.length === 0) block.hidden = true;
      });

      descriptionCell.append(description, deleteButton);
      row.append(nameCell, descriptionCell);
      body.append(row);
      return select;
    }

    function createFeatRow(level = "") {
      const row = document.createElement("tr");

      const levelCell = document.createElement("td");
      const levelInput = document.createElement("input");
      levelInput.type = "number";
      levelInput.min = "1";
      levelInput.max = "20";
      levelInput.step = "1";
      levelInput.className = "feat-level-input";
      levelInput.value = level === null || level === undefined ? "" : String(level);
      levelInput.classList.toggle("is-default", levelInput.value !== "");
      levelInput.setAttribute("aria-label", "专长等级");
      levelInput.addEventListener("input", () => {
        levelInput.classList.remove("is-default");
      });
      levelInput.addEventListener("change", () => {
        if (levelInput.value === "") return;
        const value = Math.trunc(Number(levelInput.value));
        if (!Number.isFinite(value)) {
          levelInput.value = "";
          return;
        }
        levelInput.value = String(Math.min(20, Math.max(1, value)));
      });
      levelCell.append(levelInput);

      const nameCell = document.createElement("td");
      const nameControl = document.createElement("div");
      nameControl.className = "feat-name-control";
      const nameSelect = document.createElement("select");
      nameSelect.className = "feat-name-select";
      nameSelect.setAttribute("aria-label", "专长名称");
      populateFeatSelect(nameSelect);

      const customNameInput = document.createElement("input");
      customNameInput.type = "text";
      customNameInput.className = "feat-custom-name-input";
      customNameInput.placeholder = "自定义专长";
      customNameInput.autocomplete = "off";
      customNameInput.setAttribute("aria-label", "自定义专长名称");
      customNameInput.hidden = true;
      customNameInput.addEventListener("input", () => {
        applyHpGrowthDefault();
        updateCombatStats();
      });

      const customReset = document.createElement("button");
      customReset.type = "button";
      customReset.className = "custom-reset feat-custom-reset";
      customReset.textContent = "×";
      customReset.title = "返回专长选择";
      customReset.setAttribute("aria-label", "返回专长选择");
      customReset.hidden = true;

      nameControl.append(nameSelect, customNameInput, customReset);
      nameCell.append(nameControl);

      const descriptionCell = document.createElement("td");
      const description = document.createElement("textarea");
      description.className = "feat-description";
      description.rows = 1;
      description.autocomplete = "off";
      description.title = "双击展开或收起";
      description.setAttribute("aria-label", "专长描述");
      decorateFeatDescription(description);
      description.addEventListener("input", () => {
        description.classList.remove("is-default");
      });

      nameSelect.addEventListener("change", () => {
        if (nameSelect.value === CUSTOM_VALUE) {
          customNameInput.value = "";
          syncFeatCustomUI(row);
          setFeatDescription(row, "");
          customNameInput.focus();
          return;
        }

        customNameInput.value = "";
        syncFeatCustomUI(row);
        setFeatDescription(row, nameSelect.value);
      });

      customReset.addEventListener("click", () => {
        nameSelect.value = "";
        customNameInput.value = "";
        syncFeatCustomUI(row);
        setFeatDescription(row, "");
        nameSelect.focus();
      });

      syncFeatCustomUI(row);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "feat-delete";
      deleteButton.textContent = "×";
      deleteButton.title = "删除此行";
      deleteButton.setAttribute("aria-label", "删除此行");
      deleteButton.addEventListener("click", () => {
        row.remove();
        updateFeatAddState();
      });

      descriptionCell.append(description, deleteButton);
      row.append(levelCell, nameCell, descriptionCell);
      featTableBody.append(row);
    }

    function createExtendedFeatRow(kind, body, block) {
      if (kind === "combat") return createCombatStyleRow(body, block);

      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.className = "feat-name-input";
      nameInput.autocomplete = "off";
      nameInput.setAttribute("aria-label", kind === "special" ? "特殊能力名称" : "战斗风格名称");

      if (kind === "special") {
        nameInput.classList.add("special-ability-name-input");
        nameInput.placeholder = "填入战技或魔能祈唤...";
      }

      nameCell.append(nameInput);

      const descriptionCell = document.createElement("td");
      const description = document.createElement("textarea");
      description.className = "feat-description";
      description.rows = 1;
      description.autocomplete = "off";
      description.setAttribute("aria-label", kind === "special" ? "特殊能力描述" : "战斗风格描述");
      decorateFeatDescription(description);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "feat-delete";
      deleteButton.textContent = "×";
      deleteButton.title = "删除此行";
      deleteButton.setAttribute("aria-label", "删除此行");
      deleteButton.addEventListener("click", () => {
        row.remove();
        if (body.children.length === 0) block.hidden = true;
      });

      descriptionCell.append(description, deleteButton);
      row.append(nameCell, descriptionCell);
      body.append(row);
      return nameInput;
    }

    function addCombatFeat() {
      if (combatFeatBlock.hidden) {
        combatFeatBody.replaceChildren();
        combatFeatBlock.hidden = false;
      }

      const nameInput = createExtendedFeatRow("combat", combatFeatBody, combatFeatBlock);
      nameInput.focus();
    }

    function addSpecialAbility() {
      if (specialAbilityBlock.hidden) {
        specialAbilityBody.replaceChildren();
        specialAbilityBlock.hidden = false;
      }

      const nameInput = createExtendedFeatRow("special", specialAbilityBody, specialAbilityBlock);
      nameInput.focus();
    }

    function updateFeatAddState() {
      const count = featTableBody.children.length;
      featAdd.disabled = count >= 10;
      featAdd.title = count >= 10 ? "最多10行" : "添加一行（最多10行）";
      applyHpGrowthDefault();
      updateCombatStats();
    }

    function addFeatRow() {
      const count = featTableBody.children.length;
      if (count >= 10) return;

      const defaults = getFeatLevelDefaults();
      const level = count < defaults.length ? defaults[count] : "";
      createFeatRow(level);
      updateFeatAddState();

      const lastRow = featTableBody.lastElementChild;
      const nameSelect = lastRow ? lastRow.querySelector(".feat-name-select") : null;
      if (nameSelect) nameSelect.focus();
    }

    const skillGroups = [
      { name: "力量系", ability: "str", skills: ["运动"] },
      { name: "敏捷系", ability: "dex", skills: ["特技", "巧手", "隐匿"] },
      { name: "智力系", ability: "int", skills: ["调查", "奥秘", "历史", "自然", "宗教"] },
      { name: "感知系", ability: "wis", skills: ["察觉", "洞悉", "驯兽", "医药", "求生"] },
      { name: "魅力系", ability: "cha", skills: ["游说", "欺瞒", "威吓", "表演"] }
    ];

    function updateSkillNameColor(cell, state) {
      cell.classList.toggle("is-proficient", state >= 1);
      cell.classList.toggle("is-expertise", state === 2);
    }

    function renderSkillTables() {
      const previousStates = captureSkillStates();
      skillTables.replaceChildren();

      for (const group of skillGroups) {
        const table = document.createElement("table");
        table.className = "skill-table";
        table.dataset.ability = group.ability;

        const colgroup = document.createElement("colgroup");
        for (const className of [
          "skill-prof-col",
          "skill-name-col",
          "skill-correction-col",
          "skill-gap-col",
          "skill-total-col"
        ]) {
          const col = document.createElement("col");
          col.className = className;
          colgroup.append(col);
        }

        const thead = document.createElement("thead");
        const groupRow = document.createElement("tr");
        const groupHead = document.createElement("th");
        groupHead.colSpan = 5;
        groupHead.className = "skill-group-head";
        groupHead.textContent = group.name;
        groupRow.append(groupHead);

        const columnRow = document.createElement("tr");
        columnRow.className = "skill-column-head";
        for (const text of ["熟练", "技能", "修正", "", "总值"]) {
          const th = document.createElement("th");
          if (text === "技能" && group.name === "力量系") {
            const label = document.createElement("span");
            label.className = "skill-head-label";
            label.textContent = "技能";
            const help = document.createElement("button");
            help.type = "button";
            help.className = "faith-help skill-head-help reference-tooltip-trigger reference-click-help";
            help.dataset.referenceTooltip = "skill-proficiency";
            help.textContent = "?";
            help.title = "查看技能熟练说明";
            help.setAttribute("aria-label", "查看技能熟练说明");
            label.append(help);
            th.append(label);
            bindReferenceTooltipTrigger(help);
          } else {
            th.textContent = text;
          }
          if (text === "") th.className = "skill-gap";
          columnRow.append(th);
        }

        thead.append(groupRow, columnRow);
        const tbody = document.createElement("tbody");

        for (const skill of group.skills) {
          const row = document.createElement("tr");

          const proficiencyCell = document.createElement("td");
          proficiencyCell.className = "skill-prof-cell";
          const proficiencySelect = document.createElement("select");
          proficiencySelect.className = "skill-prof-select";
          proficiencySelect.setAttribute("aria-label", `${skill}熟练状态`);
          for (const [value, label] of [["0", "X"], ["1", "O"], ["2", "🅞"]]) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            proficiencySelect.append(option);
          }
          proficiencyCell.append(proficiencySelect);

          const nameCell = document.createElement("th");
          nameCell.scope = "row";
          nameCell.className = "skill-name-cell";
          nameCell.dataset.skill = skill;
          nameCell.textContent = skill;
          nameCell.dataset.tooltipKey = `skill-${skill}`;
          nameCell.tabIndex = 0;
          nameCell.setAttribute("aria-describedby", "ability-tooltip");

          const applySkillProficiency = () => {
            updateSkillNameColor(nameCell, Number(proficiencySelect.value));
            updateSkillTotals();
          };
          proficiencySelect.addEventListener("change", applySkillProficiency);
          proficiencySelect.addEventListener("input", applySkillProficiency);

          const correctionCell = document.createElement("td");
          correctionCell.className = "skill-correction-cell";
          const correctionPlus = document.createElement("span");
          correctionPlus.className = "skill-correction-plus";
          correctionPlus.textContent = "+";
          correctionPlus.setAttribute("aria-hidden", "true");
          const correctionInput = document.createElement("input");
          correctionInput.type = "text";
          correctionInput.inputMode = "numeric";
          correctionInput.className = "skill-correction-input";
          correctionInput.autocomplete = "off";
          correctionInput.setAttribute("aria-label", `${skill}修正`);
          correctionInput.addEventListener("input", updateSkillTotals);
          correctionCell.append(correctionPlus, correctionInput);

          const gapCell = document.createElement("td");
          gapCell.className = "skill-gap";
          gapCell.setAttribute("aria-hidden", "true");

          const totalCell = document.createElement("td");
          totalCell.className = "skill-total-cell";
          const totalOutput = document.createElement("output");
          totalOutput.className = "skill-total";
          totalOutput.textContent = "—";
          totalCell.append(totalOutput);

          row.append(proficiencyCell, nameCell, correctionCell, gapCell, totalCell);
          tbody.append(row);
        }

        table.append(colgroup, thead, tbody);
        skillTables.append(table);
      }

      if (Object.keys(previousStates).length) {
        for (const row of skillTables.querySelectorAll(".skill-table tbody tr")) {
          const name = row.querySelector(".skill-name-cell")?.dataset.skill;
          const state = previousStates[name];
          if (!state) continue;
          const select = row.querySelector(".skill-prof-select");
          const correction = row.querySelector(".skill-correction-input");
          if (select) select.value = state.proficiency ?? "0";
          if (correction) correction.value = state.correction ?? "";
          updateSkillNameColor(row.querySelector(".skill-name-cell"), Number(select?.value || 0));
        }
        updateSkillTotals();
      }
    }

    function getBardLevel() {
      let level = 0;
      if (classSelect.value === "吟游诗人") level += getLevel(levelInput) ?? 0;
      if (multiClassSelect.value === "吟游诗人") level += getLevel(multiLevelInput) ?? 0;
      return level;
    }

    const preparedSpellCounts = {
      wizard: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 18, 19, 21, 22, 23, 24, 25],
      cleric: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
      full: [2, 4, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
      half: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15]
    };

    const cantripSpellCounts = {
      wizardCleric: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      sorcerer: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      druidBard: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      artificer: [2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4]
    };

    const warlockPactData = {
      cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      prepared: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
      slots: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
      slotLevel: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    };

    const adventuringGearData = {
      "强酸": { weight: "1磅", price: "25GP" },
      "炽火胶": { weight: "1磅", price: "50GP" },
      "弹药（箭矢20枚）": { weight: "1磅", price: "1GP" },
      "弹药（弩矢20枚）": { weight: "1.5磅", price: "1GP" },
      "弹药（枪械子弹10枚）": { weight: "2磅", price: "3GP" },
      "弹药（石弹20枚）": { weight: "1.5磅", price: "4CP" },
      "弹药（吹矢50枚）": { weight: "1磅", price: "1GP" },
      "抗毒剂": { weight: "—", price: "50GP" },
      "奥术法器（水晶）": { weight: "1磅", price: "10GP" },
      "奥术法器（法球）": { weight: "3磅", price: "20GP" },
      "奥术法器（权杖）": { weight: "2磅", price: "10GP" },
      "奥术法器（法杖）": { weight: "4磅", price: "5GP" },
      "奥术法器（魔杖）": { weight: "1磅", price: "10GP" },
      "背包": { weight: "5磅", price: "2GP" },
      "滚珠": { weight: "2磅", price: "1GP" },
      "木桶": { weight: "70磅", price: "2GP" },
      "篮子": { weight: "2磅", price: "4SP" },
      "铺盖": { weight: "7磅", price: "1GP" },
      "铃铛": { weight: "—", price: "1GP" },
      "毯子": { weight: "3磅", price: "5SP" },
      "滑轮组": { weight: "5磅", price: "1GP" },
      "书籍": { weight: "5磅", price: "25GP" },
      "玻璃瓶": { weight: "2磅", price: "2GP" },
      "吊桶": { weight: "2磅", price: "5CP" },
      "窃贼套组": { weight: "42磅", price: "16GP" },
      "铁蒺藜": { weight: "2磅", price: "1GP" },
      "蜡烛": { weight: "—", price: "1CP" },
      "弩矢匣": { weight: "1磅", price: "1GP" },
      "地图或卷轴匣": { weight: "1磅", price: "1GP" },
      "链条": { weight: "10磅", price: "5GP" },
      "箱子": { weight: "25磅", price: "5GP" },
      "攀爬工具": { weight: "12磅", price: "25GP" },
      "高档服装": { weight: "6磅", price: "15GP" },
      "旅行服装": { weight: "4磅", price: "2GP" },
      "材料包": { weight: "2磅", price: "25GP" },
      "戏服": { weight: "4磅", price: "5GP" },
      "撬棍": { weight: "5磅", price: "2GP" },
      "外交套组": { weight: "39磅", price: "39GP" },
      "德鲁伊法器（槲寄生枝条）": { weight: "—", price: "1GP" },
      "德鲁伊法器（木质法杖）": { weight: "4磅", price: "5GP" },
      "德鲁伊法器（紫杉魔杖）": { weight: "1磅", price: "10GP" },
      "地城套组": { weight: "55磅", price: "12GP" },
      "艺人套组": { weight: "58.5磅", price: "40GP" },
      "探索套组": { weight: "55磅", price: "10GP" },
      "扁瓶": { weight: "1磅", price: "2CP" },
      "爪钩": { weight: "4磅", price: "2GP" },
      "医疗包": { weight: "3磅", price: "5GP" },
      "圣徽（护符）": { weight: "1磅", price: "5GP" },
      "圣徽（纹章）": { weight: "—", price: "5GP" },
      "圣徽（圣物匣）": { weight: "2磅", price: "5GP" },
      "圣水": { weight: "1磅", price: "25GP" },
      "捕猎陷阱": { weight: "25磅", price: "5GP" },
      "墨水": { weight: "—", price: "10GP" },
      "墨水笔": { weight: "—", price: "2CP" },
      "壶": { weight: "4磅", price: "2GP" },
      "梯子": { weight: "25磅", price: "1SP" },
      "油灯": { weight: "1磅", price: "5SP" },
      "牛眼提灯": { weight: "2磅", price: "10GP" },
      "附盖提灯": { weight: "2磅", price: "5GP" },
      "锁": { weight: "1磅", price: "10GP" },
      "放大镜": { weight: "—", price: "100GP" },
      "镣铐": { weight: "6磅", price: "2GP" },
      "地图": { weight: "—", price: "1GP" },
      "镜子": { weight: "0.5磅", price: "5GP" },
      "捕网": { weight: "3磅", price: "1GP" },
      "燃油": { weight: "1磅", price: "1SP" },
      "纸张": { weight: "—", price: "2SP" },
      "羊皮纸": { weight: "—", price: "1SP" },
      "香水": { weight: "—", price: "5GP" },
      "基础毒药": { weight: "—", price: "100GP" },
      "长杆": { weight: "7磅", price: "5CP" },
      "铁锅": { weight: "10磅", price: "2GP" },
      "治疗药水": { weight: "半磅", price: "50GP" },
      "小包": { weight: "1磅", price: "5SP" },
      "祭司套组": { weight: "29磅", price: "33GP" },
      "箭袋": { weight: "1磅", price: "1GP" },
      "便携式攻城锤": { weight: "35磅", price: "4GP" },
      "口粮": { weight: "2磅", price: "5SP" },
      "长袍": { weight: "4磅", price: "1GP" },
      "绳索": { weight: "5磅", price: "1GP" },
      "麻袋": { weight: "半磅", price: "1CP" },
      "学者套组": { weight: "22磅", price: "40GP" },
      "铲子": { weight: "5磅", price: "2GP" },
      "信号笛": { weight: "—", price: "5CP" },
      "戏法卷轴": { weight: "—", price: "30GP" },
      "一环卷轴": { weight: "—", price: "50GP" },
      "铁钉": { weight: "5磅", price: "1GP" },
      "望远镜": { weight: "1磅", price: "1000GP" },
      "细线": { weight: "—", price: "1SP" },
      "帐篷": { weight: "20磅", price: "2GP" },
      "火绒盒": { weight: "1磅", price: "5SP" },
      "火把": { weight: "1磅", price: "1CP" },
      "小瓶": { weight: "—", price: "1GP" },
      "水袋": { weight: "5磅（满）", price: "2SP" }
    };

    const backpackWeaponData = {
      "短棒": { weight: "2磅", price: "1SP" },
      "匕首": { weight: "1磅", price: "2GP" },
      "巨棒": { weight: "10磅", price: "2SP" },
      "手斧": { weight: "2磅", price: "5GP" },
      "标枪": { weight: "2磅", price: "5SP" },
      "轻锤": { weight: "2磅", price: "2GP" },
      "硬头锤": { weight: "4磅", price: "5GP" },
      "长棍": { weight: "4磅", price: "2SP" },
      "镰刀": { weight: "2磅", price: "1GP" },
      "矛": { weight: "3磅", price: "1GP" },
      "飞镖": { weight: "0.25磅", price: "5CP" },
      "轻弩": { weight: "5磅", price: "25GP" },
      "短弓": { weight: "2磅", price: "25GP" },
      "投石索": { weight: "—", price: "1SP" },
      "战斧": { weight: "4磅", price: "10GP" },
      "链枷": { weight: "2磅", price: "10GP" },
      "长柄刀": { weight: "6磅", price: "20GP" },
      "巨斧": { weight: "7磅", price: "30GP" },
      "巨剑": { weight: "6磅", price: "50GP" },
      "戟": { weight: "6磅", price: "20GP" },
      "骑枪": { weight: "6磅", price: "10GP" },
      "长剑": { weight: "3磅", price: "15GP" },
      "巨锤": { weight: "10磅", price: "10GP" },
      "钉头锤": { weight: "4磅", price: "15GP" },
      "长矛": { weight: "18磅", price: "5GP" },
      "刺剑": { weight: "2磅", price: "25GP" },
      "弯刀": { weight: "3磅", price: "25GP" },
      "短剑": { weight: "2磅", price: "10GP" },
      "三叉戟": { weight: "4磅", price: "5GP" },
      "战镐": { weight: "2磅", price: "5GP" },
      "战锤": { weight: "5磅", price: "15GP" },
      "鞭": { weight: "2磅", price: "2GP" },
      "吹箭筒": { weight: "1磅", price: "10GP" },
      "手弩": { weight: "3磅", price: "75GP" },
      "重弩": { weight: "18磅", price: "50GP" },
      "长弓": { weight: "2磅", price: "50GP" },
      "火铳": { weight: "10磅", price: "500GP" },
      "手铳": { weight: "3磅", price: "250GP" }
    };

    const backpackArmorData = {
      "布甲": { weight: "8磅", price: "5GP" },
      "皮甲": { weight: "10磅", price: "10GP" },
      "镶钉皮甲": { weight: "13磅", price: "45GP" },
      "兽皮甲": { weight: "12磅", price: "10GP" },
      "链甲衫": { weight: "20磅", price: "50GP" },
      "鳞甲": { weight: "45磅", price: "50GP" },
      "胸甲": { weight: "20磅", price: "400GP" },
      "半身板甲": { weight: "40磅", price: "750GP" },
      "环甲": { weight: "40磅", price: "30GP" },
      "链甲": { weight: "55磅", price: "75GP" },
      "板条甲": { weight: "60磅", price: "200GP" },
      "板甲": { weight: "65磅", price: "1500GP" },
      "盾牌": { weight: "6磅", price: "10GP" }
    };

    const adventuringGearDescriptions = {
      "弹药（箭矢20枚）": "箭矢20枚，重1磅，价格1GP。需放入箭袋（容器另购：1磅，1GP）使用。",
      "弹药（弩矢20枚）": "弩矢20枚，重1.5磅，价格1GP。需放入弩矢匣（容器另购：1磅，1GP）使用。",
      "弹药（枪械子弹10枚）": "枪械子弹10枚，重2磅，价格3GP。需放入小包（容器另购）使用。",
      "弹药（石弹20枚）": "投石索用石弹20枚，重1.5磅，价格4CP。需放入小包（容器另购）使用。",
      "弹药（吹矢50枚）": "吹箭筒用吹矢50枚，重1磅，价格1GP。需放入小包（容器另购）使用。",
      "奥术法器（水晶）": "水晶形态的奥术法器，重1磅，价格10GP。术士、魔契师和法师可将其作为法器。",
      "奥术法器（法球）": "法球形态的奥术法器，重3磅，价格20GP。术士、魔契师和法师可将其作为法器。",
      "奥术法器（权杖）": "权杖形态的奥术法器，重2磅，价格10GP。术士、魔契师和法师可将其作为法器。",
      "奥术法器（法杖）": "法杖形态的奥术法器，重4磅，价格5GP，也可以作为长棍使用。术士、魔契师和法师可将其作为法器。",
      "奥术法器（魔杖）": "魔杖形态的奥术法器，重1磅，价格10GP。术士、魔契师和法师可将其作为法器。",
      "德鲁伊法器（槲寄生枝条）": "槲寄生枝条形态的德鲁伊法器，重—，价格1GP。德鲁伊和游侠可将其作为法器。",
      "德鲁伊法器（木质法杖）": "木质法杖形态的德鲁伊法器，重4磅，价格5GP，也可以作为长棍使用。德鲁伊和游侠可将其作为法器。",
      "德鲁伊法器（紫杉魔杖）": "紫杉魔杖形态的德鲁伊法器，重1磅，价格10GP。德鲁伊和游侠可将其作为法器。",
      "圣徽（护符）": "护符形态的圣徽，重1磅，价格5GP，需佩戴或手持。牧师和圣武士可将其作为法器。",
      "圣徽（纹章）": "纹章形态的圣徽，重—，价格5GP，需挂载到织物或盾牌上。牧师和圣武士可将其作为法器。",
      "圣徽（圣物匣）": "圣物匣形态的圣徽，重2磅，价格5GP，需手持。牧师和圣武士可将其作为法器。",
      "强酸": "当你执行攻击动作时，你可以将你的一次攻击替换为丢出一小瓶强酸。你可以选择位于你20尺内可见的一个生物或物件作为目标。该目标必须通过一次敏捷豁免（DC等于8+你的敏捷调整值+你的熟练加值），否则承受2d6点强酸伤害。",
      "炽火胶": "当你执行攻击动作时，你可以将你的一次攻击替换为丢出一扁瓶炽火胶。你可以选择位于你20尺内可见的一个生物或物件作为目标。该目标必须通过一次敏捷豁免（DC等于8+你的敏捷调整值+你的熟练加值），否则承受1d4点火焰伤害并开始燃烧（见术语汇编）。",
      "弹药": "具有弹药词条的武器需要弹药才能发射，武器的描述部分会指定这把武器需要哪种弹药。弹药按份量出售，容器需要单独购买：箭矢20枚（容器箭袋，1磅，1GP）；弩矢20枚（容器弩矢匣，1.5磅，1GP）；枪械子弹10枚（容器小包，2磅，3GP）；投石索子弹20枚（容器小包，1.5磅，4CP）；吹矢50枚（容器小包，1磅，1GP）。",
      "抗毒剂": "以一个附赠动作，你可以喝下一小瓶抗毒剂来使你在避免或结束中毒状态的豁免中具有优势，持续一小时。",
      "奥术法器": "奥术法器是一种利用宝石或是雕刻来引导奥术魔法的物品，它会以下列奥术法器列表中的一种形式存在。术士、魔契师和法师可以使用这种物品作为法器。具体形式：水晶（1磅，10GP）、法球（3磅，20GP）、权杖（2磅，10GP）、法杖（也视作长棍，4磅，5GP）、魔杖（1磅，10GP）。",
      "背包": "一个背包最多能装入30磅重1立方尺大的东西。背包也能当作鞍囊使用。",
      "滚珠": "以一个操作动作，你能把一小包滚珠撒至地面，并覆盖你周围10尺内的一处10尺方形区域。任何生物每回合首次进入这片区域时都必须通过一次DC10的敏捷豁免，否则陷入倒地状态。重新收集这些滚珠需要花费10分钟时间。",
      "木桶": "一个木桶能够至多装入40加仑的液体或4立方尺的干燥货物。",
      "篮子": "一个篮子能够至多装入40磅重2立方尺大的东西。",
      "铺盖": "一卷铺盖能睡下一个小型或中型生物。躺在铺盖中时，你自动通过抵抗极寒的豁免检定（详见地下城主指南）。",
      "铃铛": "以一个操作动作，你可以摇响一个铃铛，铃铛会发出60尺内都能够听到的声音。",
      "毯子": "包裹在毯子中期间，你在抵抗极寒的豁免检定上具有优势（详见地下城主指南）。",
      "滑轮组": "滑轮组允许你提起你正常能提动的四倍重量的物品。",
      "书籍": "一本书会记载虚构或非虚构的内容。如果你在某些事物上参考了一本内容准确而非虚构的书，你在相关事物上的智力（奥秘、历史、自然或宗教）检定则获得+5的加值。",
      "玻璃瓶": "一个玻璃瓶至多能装入1.5品脱的东西。",
      "吊桶": "一个吊桶能装入至多半立方尺的东西。",
      "窃贼套组": "窃贼套组包含以下物品：背包、滚珠、铃铛、10根蜡烛、撬棍、附盖提灯、7扁瓶燃油、五天份的口粮、绳索、火绒盒和水袋。",
      "铁蒺藜": "以一个操作动作，你能把一包铁蒺撒至地面并覆盖你周围5尺内的一处5尺方形区域。任何生物每回合首次进入这片区域时都必须通过一次DC15的敏捷豁免，否则受到1点穿刺伤害，并且移速降至0，直到其下一回合开始为止。重新收集这些铁蒺藜需要花费10分钟时间。",
      "蜡烛": "一根蜡烛可以燃烧1小时，并发出5尺范围的明亮光照，以及额外5尺的微光光照。",
      "弩矢匣": "一个弩矢匣至多能存放20根弩矢。",
      "地图或卷轴匣": "一个地图或卷轴匣至多能存放10张纸张或5张羊皮纸。",
      "链条": "以一个操作动作，你可以进行一次DC13的力量（运动）检定。如果该检定成功，你能利用链条捆住一个位于你5尺内的非自愿生物，但该生物必须处于受擒、失能或束缚状态。如果你绑住了该生物的腿，该生物陷入束缚状态，直至挣脱。挣脱链条需要该生物使用动作来通过一次DC18的敏捷（特技）检定。扯坏链条需要该生物使用动作来通过一次DC20的力量（运动）检定。",
      "箱子": "一个箱子至多能装入12立方尺的东西。",
      "攀爬工具": "一套攀爬工具包含鞋子包头、手套、岩钉和系带。以一个操作动作，你可以使用攀爬工具锚定自己，此时你不会从锚定处摔落超过25尺，且在使用附赠动作解除锚定前无法从锚定处向外移动超过25尺。",
      "高档服装": "高档服装使用昂贵的材料和装饰物制成，并缝制着极其精密的细节。有些活动和场合仅允许穿着高档服装的人参与。",
      "旅行服装": "旅行服装是为应对在多种环境中的旅途而设计的结实服装。",
      "材料包": "材料包是一种装有你法术所需的一切免费材料的防水小包。",
      "戏服": "若你穿着对应的戏服，你为模仿他人或模仿某一类人所作的任何属性检定都具有优势。",
      "撬棍": "在能够撬动的地方使用撬棍可以给予你在这方面的力量检定优势。",
      "外交套组": "外交套组包含以下物品：箱子、高档服装、墨水、5支墨水笔、油灯、2个地图或卷轴匣、4扁瓶燃油、5张纸张、5张羊皮纸、香水和火绒盒。",
      "德鲁伊法器": "德鲁伊法器是一种利用刻纹、绑带或图画来引导原初魔法的物品，它会以下列德鲁伊法器列表中的一种形式存在。德鲁伊和游侠可以使用这种物品作为法器。具体形式：槲寄生枝条（―，1GP）、木质法杖（也视作长棍，4磅，5GP）、紫衫魔杖（1磅，10GP）。",
      "地城套组": "地城套组包含以下物品：背包、铁蒺藜、撬棍、2扁瓶燃油、10天份的口粮、绳索、火绒盒、10根火把和水袋。",
      "艺人套组": "艺人套组包含以下物品：背包、铺盖、铃铛、牛眼提灯、3套戏服、镜子、8扁瓶燃油、9天份的口粮、火绒盒和水袋。",
      "探索套组": "探索套组包含以下物品：背包、铺盖、2扁瓶燃油、10天份的口粮、绳索、火绒盒、10根火把和水袋。",
      "扁瓶": "一个扁瓶具有1品脱容量。",
      "爪钩": "以一个操作动作，你能将爪钩朝着位于自身50尺内的一处栏杆、突起的边缘或是一处能够挂住的位置扔出，并进行一次DC13的敏捷（特技）检定。如果检定成功，爪钩则成功钩在上面。如果爪钩上还连了绳子，你则可以爬上去。",
      "医疗包": "一个医疗包有十次使用次数。以一个操作动作，你可以花费一次使用次数用来稳定一名生命值为0的陷入昏迷的生物的伤势。你这么做时无需进行感知（医疗）检定。",
      "圣徽": "圣徽是一种利用宝石或图画来引导神圣魔法的物品，它会以下列圣徽列表中的一种形式存在。牧师和圣武士可以用圣徽作为法器。不同圣徽的携带方式不同，例如手持、佩戴或挂载到织物上（例如披挂或横幅）或盾牌上。具体形式：护符（佩戴或手持，1磅，5GP）、纹章（挂载到织物或盾牌上，―，5GP）、圣物匣（手持，2磅，5GP）。",
      "圣水": "当你执行攻击动作时，你可以将你的一次攻击替换为丢出一扁瓶圣水。你可以选择位于你20尺内可见的一个生物作为目标。该目标必须通过一次敏捷豁免（DC等于8+你的敏捷调整值+你的熟练加值），并且如果这个目标是邪魔或亡灵生物，失败时承受2d8点光耀伤害。",
      "捕猎陷阱": "以一个操作动作，你可以在某处设下捕猎陷阱。捕猎陷阱是一组带有锯齿的铁环，当一个生物踩到中心的压力板时，两边的锯齿会迅速合上。这组陷阱需要用沉重的链条固定至某个无法移动的物件上――例如大树或刺入地面的固定钉。踩到压力板的生物必须通过一次DC13的敏捷豁免，否则受到1d4点穿刺伤害，并且速度降至0，直至他的下一回合开始。直到该生物挣脱陷阱前，它的移动范围会被链条的长度限制（通常为3尺）。一个生物可以使用它的动作来进行一次DC13的力量（运动）检定，检定成功时能够让自己或自己触及范围内的一个其他生物脱困。每次检定失败都会导致被困生物受到1点穿刺伤害。",
      "墨水": "墨水一般装在1盎司的瓶子里，足够撰写500页的内容。",
      "墨水笔": "墨水笔可以使用墨水来写字或绘画。",
      "壶": "壶具有一加仑的容量。",
      "梯子": "一把梯子有10尺高。你只能在梯子上爬上或是爬下。",
      "油灯": "一盏油灯使用燃油作为燃料，点着时能够发出15尺半径的明亮光照和额外30尺的微光光照。",
      "牛眼提灯": "一盏牛眼提灯使用燃油作为燃料，点着时能够发出60尺远锥形的明亮光照和额外60尺远的微光光照。",
      "附盖提灯": "一盏附盖提灯使用燃油作为燃料，点着时能够发出30尺半径的明亮光照和额外30尺的微光光照。以一个附赠动作，你可以盖上或掀开提灯的盖子。盖上盖子时，提灯的光亮降至半径5尺的微光光照。",
      "锁": "每套锁都有对应的钥匙。如果没有对应的钥匙，一个生物还可以使用盗贼工具来通过一次DC15的敏捷（巧手）检定开锁。",
      "放大镜": "使用放大镜时，你为鉴定或检查精密物品所作的任何属性检定都会具有优势。想要使用放大镜点火，需要一束如同阳光般明亮的强光用于聚焦，还需要用于点燃的火绒，随后需要大约5分钟的时间来生火。",
      "镣铐": "以一个操作动作，你可以进行一次DC13的敏捷（巧手）检定。如果该检定成功，你能利用镣铐捆住一个位于你5尺内的非自愿的小型或中型生物，但该生物必须处于受擒、失能或束缚状态。如果你铐住了该生物，该生物进行的攻击检定会具有劣势。如果镣铐还被锁链或钩子固定在了某处，该生物还会陷入束缚状态。挣脱镣铐需要该生物使用动作来通过一次DC20的敏捷（巧手）检定。扯坏镣铐需要该生物使用动作来通过一次DC25的力量（运动）检定。每套镣铐都有对应的钥匙。如果没有对应的钥匙，一个生物还可以使用盗贼工具来通过一次DC15的敏捷（巧手）检定解开镣铐的锁。",
      "地图": "如果你在地图所绘制的地点参考了一张准确的地图，你为辨认位置所进行的感知（求生）检定获得+5的加值。",
      "镜子": "一面手持的钢镜不光可以用来化妆打扮，也可以用来窥视拐角或利用反光打信号。",
      "捕网": "当你执行攻击动作，你可以将你的一次攻击替换为丢出一张捕网。你可以选择位于你15尺内可见的一个生物作为目标。该目标必须通过一次敏捷豁免（DC等于8+你的敏捷调整值+你的熟练加值），否则陷入束缚状态，直至挣脱。体型是巨型及以上的目标将自动通过豁免。被束缚的目标或者位于目标5尺内的生物，可以通过一个动作来进行一次DC10的力量（运动）检定来挣脱捕网。若检定成功，被束缚的生物将被解放。摧毁捕网（AC 10；5 HP；免疫钝击、毒素和心灵伤害）也能解放被困目标并结束捕网的效果。",
      "燃油": "你能将燃油泼在一个生物、物件或一处空间上，你也可以将燃油作为燃料使用。具体使用方法如下。泼洒一个生物或一个物件：当你执行攻击动作时，你可以将你的一次攻击替换为丢出一扁瓶燃油。你可以选择位于你20尺内可见的一个生物或物件作为目标。该目标必须通过一次敏捷豁免（DC等于8+你的敏捷调整值+你的熟练加值），否则被燃油覆盖。如果目标在燃油挥发前（1分钟后）受到火焰伤害，则目标因燃烧的燃油受到额外5点火焰伤害。泼洒一处空间：以一个操作动作，你可以将一扁瓶燃油泼在地面上，以覆盖一块边长5尺且保持水平的方形区域。点燃后，从点燃时算起，燃油会持续燃烧两轮并在回合结束时熄灭（或12秒）。点燃时，任何进入该区域或在该区域结束其回合的生物都会受到5点火焰伤害。同一生物每回合只受该伤害作用一次。燃料：燃油能作为油灯和提灯的燃料使用。一旦点着，一扁瓶的燃油可以在油灯和提灯中持续燃烧6小时。持续时长并不需要是连续的，你可以熄灭点着的燃油（以一个操作动作），并在之后再点燃，直到总共燃烧了6小时。",
      "纸张": "一页纸张能够写满250个手写单词。",
      "羊皮纸": "一页羊皮纸能够写满250个手写单词。",
      "香水": "香水通常装在4盎司的小瓶里。为自己拍上香水后的一小时里，你为影响对你态度冷漠的类人生物所作的魅力（游说）检定都具有优势，但这个生物必须位于你的5尺内。",
      "基础毒药": "以一个附赠动作，你可以将一小瓶基础毒药涂抹在一把武器或至多三枚弹药上。当一个生物受到由涂过毒的武器或弹药所造成的穿刺或劈砍伤害时，该生物将受到额外1d4点毒素伤害。毒药一旦被涂抹，毒效只会持续1分钟或直至造成了额外伤害。",
      "长杆": "一柄长杆有10尺长。你可以用它去触碰10尺外的东西。如果你必须为一次跳高或跳远进行力量（运动）检定的话，你可以使用长杆进行撑杆跳，来使这次检定具有优势。",
      "铁壶": "铁壶具有一加仑的容量。",
      "铁锅": "铁锅具有一加仑的容量。",
      "治疗药水": "这瓶药水是一种魔法物品。以一个附赠动作，你可以喝掉它或将它喂给位于你5尺内的其他生物。喝掉这小瓶魔法红色液体的生物能够恢复2d4+2点生命值。",
      "小包": "一个小包能够至多装入6磅重、五分之一立方尺大的东西。",
      "祭司套组": "祭司套组包含以下物品：背包、毯子、圣水、油灯、7天份的口粮、长袍和火绒盒。",
      "箭袋": "箭袋至多能装入20根箭矢。",
      "便携式攻城锤": "你可以使用便携式攻城锤撞破一扇门。当你这么做时，你在力量检定上获得+4加值。其他一名角色可以协助你使用攻城锤，并使你这次检定具有优势。",
      "口粮": "口粮由适合长途旅行携带的食物组成，包含肉干、风干水果、饼干和坚果等。不进食的危害详见术语汇编中的“饥饿”部分。",
      "长袍": "长袍通常具有特别的的职业或仪式意义。有些活动和场合仅允许穿着带有特定颜色或符号的长袍的人参与。",
      "绳索": "以一个操作动作，你可以进行一次DC10的敏捷（巧手）检定。如果该检定成功，你能用绳索打一个结。扯坏绳索需要成功通过一次DC20的力量（运动）检定。你可以利用绳索捆住一个非自愿生物，但该生物必须处于受擒、失能或束缚状态。如果你绑住了该生物的腿，该生物陷入束缚状态，直至挣脱。挣脱绳索需要该生物使用动作来通过一次DC15的敏捷（特技）检定。",
      "麻袋": "麻袋至多能够装入30磅1立方尺的东西。",
      "学者套组": "学者套组包含以下物品：背包、书、墨水、墨水笔、油灯、10扁瓶燃油、10张羊皮纸和火绒盒。",
      "铲子": "你可以使用铲子来花费一小时时间在土壤或类似材质的地方挖出一个5尺边长的洞。",
      "信号笛": "以一个操作动作，你可以吹响一支信号笛，并使信号笛发出600尺外都可以听见的响声。",
      "戏法卷轴": "一个戏法法术卷轴或一环法术卷轴是一种记载了戏法或一环法术的魔法物品。具体是哪一种由卷轴的创造者决定。如果卷轴的法术处在你的职业法术列表中，你就可以阅读这卷卷轴并在无需材料成分的情况下，使用法术的正常施法时间来施展这道法术。如果法术要求豁免检定或攻击检定，法术的豁免DC则为13，而攻击加值为5。当法术施展完毕，卷轴会立刻烟消云散。",
      "一环卷轴": "一个戏法法术卷轴或一环法术卷轴是一种记载了戏法或一环法术的魔法物品。具体是哪一种由卷轴的创造者决定。如果卷轴的法术处在你的职业法术列表中，你就可以阅读这卷卷轴并在无需材料成分的情况下，使用法术的正常施法时间来施展这道法术。如果法术要求豁免检定或攻击检定，法术的豁免DC则为13，而攻击加值为5。当法术施展完毕，卷轴会立刻烟消云散。",
      "铁钉": "一组铁钉具有十支。以一个操作动作，你可以使用一把钝器，例如轻锤，来将铁钉锤入木头、土地或类似的材质。你能通过这种方式堵死一扇门，或将绳索或链条固定在铁钉上。",
      "望远镜": "通过望远镜看到的物件要比原先的尺寸大上两倍。",
      "细线": "细绳有10尺长。你能够以一个操作动作为它打一个结。",
      "帐篷": "帐篷可以睡下两个小型或中型的生物。",
      "火绒盒": "火绒盒是一种装有打火石、火镰和火绒（通常是浸泡在燃油里的干布料）的小型容器，其中的物品可以用来点火。你可以使用附赠动作来用它点燃任何具有燃料的东西――例如蜡烛、油灯、提灯或火把。在没有燃料的情况下生火需要1分钟时间。",
      "火把": "火把点燃后能够燃烧1小时，燃烧期间发出20尺半径的明亮光照和额外20尺的微光光照。当你执行攻击动作时，你可以将火把当作简易近战武器，并使用火把发动攻击。命中时，目标受到1点火焰伤害。",
      "小瓶": "小瓶具有4盎司容量。",
      "水袋": "水袋具有4品脱容量。如果你喝水不足，你会遭受脱水的危害（见规则详述）。"
    };

    const toolData = {
      "炼金工具": { ability: "智力", weight: "8磅", price: "50GP", operation: "辨析一种物质（DC15），或生起一场火（DC15）", craft: "强酸、炽火胶、材料包、燃油、纸张、香水" },
      "酿酒工具": { ability: "智力", weight: "9磅", price: "20GP", operation: "检测饮品是否下毒（DC15），或辨识酒精（DC10）", craft: "抗毒剂" },
      "书法工具": { ability: "敏捷", weight: "5磅", price: "10GP", operation: "以华丽的字迹撰写文字防止造假（DC15）", craft: "墨水、法术卷轴" },
      "木匠工具": { ability: "力量", weight: "6磅", price: "8GP", operation: "封死或撬开一扇门或一个容器（DC20）", craft: "短棒、巨棒、长棍、木桶、箱子、梯子、长杆、便携式攻城锤、火把" },
      "制图工具": { ability: "感知", weight: "6磅", price: "15GP", operation: "为一小片区域绘制地图（DC15）", craft: "地图" },
      "鞋匠工具": { ability: "敏捷", weight: "5磅", price: "5GP", operation: "改造足具来为穿戴者的下一次敏捷（特技）检定提供优势（DC10）", craft: "攀爬工具" },
      "厨师工具": { ability: "感知", weight: "8磅", price: "1GP", operation: "改善食物风味（DC10），检查食物是否腐坏或有毒（DC15）", craft: "口粮" },
      "玻璃匠工具": { ability: "智力", weight: "5磅", price: "30GP", operation: "判断一个玻璃物件在过去24小时内盛过什么内容物（DC15）", craft: "玻璃瓶、放大镜、望远镜、小瓶" },
      "珠宝匠工具": { ability: "智力", weight: "2磅", price: "25GP", operation: "判断珠宝价值（DC15）", craft: "奥术法器、圣徽" },
      "皮匠工具": { ability: "敏捷", weight: "5磅", price: "5GP", operation: "对一个皮制品进行图案设计（DC10）", craft: "投石索、鞭子、兽皮甲、皮甲、镶钉皮甲、背包、弩矢匣、地图或卷轴匣、羊皮纸、小包、箭袋、水袋" },
      "石匠工具": { ability: "力量", weight: "8磅", price: "10GP", operation: "在石头上凿出一个符号标志或一个洞（DC10）", craft: "滑轮组" },
      "画家工具": { ability: "感知", weight: "5磅", price: "10GP", operation: "画出你所见过的某个事物的可辨图像（DC10）", craft: "德鲁伊法器、圣徽" },
      "陶匠工具": { ability: "智力", weight: "3磅", price: "10GP", operation: "判断一个陶瓷物件在过去24小时内盛过什么内容物（DC15）", craft: "壶、灯" },
      "铁匠工具": { ability: "力量", weight: "8磅", price: "20GP", operation: "撬开一扇门或容器（DC20）", craft: "任意近战武器（除了短棒，巨棒，长棍和鞭子）、中甲（除了兽皮甲）、重甲、滚珠、吊桶、铁蒺藜、链条、撬棍、枪械子弹、爪钩、铁锅、铁钉、投石索子弹" },
      "修补工具": { ability: "敏捷", weight: "10磅", price: "50GP", operation: "用废料组装出一个微型物品，这个物品会在一分钟后散架。（DC20）", craft: "火铳、手铳、铃铛、牛眼提灯、扁瓶、附盖提灯、捕猎陷阱、锁、镣铐、镜子、铲子、信号笛、火绒盒" },
      "织布工具": { ability: "敏捷", weight: "5磅", price: "1GP", operation: "修补衣服上的破口（DC10），或是缝制一个微型图案（DC10）", craft: "布甲、篮子、铺盖、毯子、高档服装、捕网、长袍、绳索、麻袋、细绳、帐篷、旅行服装" },
      "木雕工具": { ability: "敏捷", weight: "5磅", price: "1GP", operation: "在木头上雕刻图案（DC10）", craft: "短棒、巨棒、长棍、远程武器（除了手铳、火铳和投石索）、奥术法器、箭矢、弩矢、德鲁伊法器、墨水笔、吹矢" },
      "易容工具": { ability: "魅力", weight: "3磅", price: "25GP", operation: "化妆（DC10）", craft: "戏服" },
      "文书伪造工具": { ability: "敏捷", weight: "5磅", price: "15GP", operation: "模仿其他人的笔迹，至多10个单词（DC15），或伪造一份火漆（DC20）", craft: "" },
      "赌具（多种）": { ability: "感知", weight: "—", price: "多种", operation: "判断某人是否作弊（DC10），或赢取游戏（DC20）", craft: "变体：骰子（1SP）、龙棋（1GP）、纸牌（5SP）、三龙牌（1GP）" },
      "草药工具": { ability: "智力", weight: "3磅", price: "5GP", operation: "辨认植物（DC10）", craft: "抗毒剂、蜡烛、医疗包、治疗药水" },
      "乐器（多类）": { ability: "魅力", weight: "多类", price: "多类", operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: "变体：风笛（30GP，6磅）、鼓（6GP，3磅）、扬琴（25GP，10磅）、长笛（2GP，1磅）、号角（3GP，2磅）、鲁特琴（35GP，2磅）、里拉琴（30GP，2磅）、排箫（12GP，2磅）、芦笛（2GP，1磅）、提琴（30GP，1磅）" },
      "领航工具": { ability: "感知", weight: "2磅", price: "25GP", operation: "计划路线（DC10），或通过观星判断位置（DC15）", craft: "" },
      "毒药工具": { ability: "智力", weight: "2磅", price: "50GP", operation: "侦测有毒物件（DC10）", craft: "基础毒药" },
      "盗贼工具": { ability: "敏捷", weight: "1磅", price: "25GP", operation: "撬锁（DC15），或解除陷阱（DC15）", craft: "" }
    };

    Object.assign(toolData, {
      "赌具（骰子）": {
        ability: "感知", weight: "—", price: "1SP",
        operation: "判断某人是否作弊（DC10），或赢取游戏（DC20）", craft: ""
      },
      "赌具（龙棋）": {
        ability: "感知", weight: "—", price: "1GP",
        operation: "判断某人是否作弊（DC10），或赢取游戏（DC20）", craft: ""
      },
      "赌具（纸牌）": {
        ability: "感知", weight: "—", price: "5SP",
        operation: "判断某人是否作弊（DC10），或赢取游戏（DC20）", craft: ""
      },
      "赌具（龙牌）": {
        ability: "感知", weight: "—", price: "1GP",
        operation: "判断某人是否作弊（DC10），或赢取游戏（DC20）", craft: ""
      },
      "乐器（风笛）": {
        ability: "魅力", weight: "6磅", price: "30GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（鼓）": {
        ability: "魅力", weight: "3磅", price: "6GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（扬琴）": {
        ability: "魅力", weight: "10磅", price: "25GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（长笛）": {
        ability: "魅力", weight: "1磅", price: "2GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（号角）": {
        ability: "魅力", weight: "2磅", price: "3GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（鲁特琴）": {
        ability: "魅力", weight: "2磅", price: "35GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（里拉琴）": {
        ability: "魅力", weight: "2磅", price: "30GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（排箫）": {
        ability: "魅力", weight: "2磅", price: "12GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（芦笛）": {
        ability: "魅力", weight: "1磅", price: "2GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      },
      "乐器（提琴）": {
        ability: "魅力", weight: "1磅", price: "30GP",
        operation: "演奏一个熟知的曲调（DC10），或是演奏一首即兴的乐曲（DC15）", craft: ""
      }
    });

    const artisanToolNames = [
      "炼金工具", "酿酒工具", "书法工具", "木匠工具", "制图工具",
      "鞋匠工具", "厨师工具", "玻璃匠工具", "珠宝匠工具", "石匠工具",
      "画家工具", "陶匠工具", "铁匠工具", "修补工具", "织布工具", "木雕工具"
    ];
    const otherToolNames = [
      "易容工具", "文书伪造工具", "赌具（骰子）", "赌具（龙棋）",
      "赌具（纸牌）", "赌具（龙牌）", "草药工具",
      "乐器（风笛）", "乐器（鼓）", "乐器（扬琴）", "乐器（长笛）",
      "乐器（号角）", "乐器（鲁特琴）", "乐器（里拉琴）", "乐器（排箫）",
      "乐器（芦笛）", "乐器（提琴）", "领航工具", "毒药工具", "盗贼工具"
    ];

    const standardLanguages = [
      "通用语", "通用手语", "龙语", "矮人语", "精灵语", "巨人语",
      "侏儒语", "地精语", "半身人语", "兽人语"
    ];
    const rareLanguages = [
      "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语",
      "原初语", "木族语", "盗贼黑话", "地底通用语"
    ];

    const spellSlotsByCasterLevel = {
      0: [],
      1: [2],
      2: [3],
      3: [4, 2],
      4: [4, 3],
      5: [4, 3, 2],
      6: [4, 3, 3],
      7: [4, 3, 3, 1],
      8: [4, 3, 3, 2],
      9: [4, 3, 3, 3, 1],
      10: [4, 3, 3, 3, 2],
      11: [4, 3, 3, 3, 2, 1],
      12: [4, 3, 3, 3, 2, 1],
      13: [4, 3, 3, 3, 2, 1, 1],
      14: [4, 3, 3, 3, 2, 1, 1],
      15: [4, 3, 3, 3, 2, 1, 1, 1],
      16: [4, 3, 3, 3, 2, 1, 1, 1],
      17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
      18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
      19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
      20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
    };

    function getCasterLevel() {
      const fullCasters = new Set(["吟游诗人", "牧师", "德鲁伊", "术士", "法师"]);
      const halfCasters = new Set(["圣武士", "游侠", "奇械师"]);
      const thirdCasterSubclasses = {
        "战士": "奥法骑士",
        "游荡者": "诡术师",
        "武僧": "秘术武者"
      };
      const classes = [
        { name: classSelect.value, level: getLevel(levelInput), subclass: currentMainSubclass() },
        ...getExtraMultiEntries().map((entry) => ({
          name: entry.classSelect.value,
          level: getLevel(entry.levelInput),
          subclass: entry.subclassSelect.value
        }))
      ];
      let total = 0;

      for (const entry of classes) {
        if (!entry.name || !entry.level) continue;

        if (fullCasters.has(entry.name)) {
          total += entry.level;
        } else if (halfCasters.has(entry.name)) {
          total += Math.ceil(entry.level / 2);
        } else if (thirdCasterSubclasses[entry.name] === entry.subclass) {
          total += Math.ceil(entry.level / 3);
        }
      }

      return Math.min(20, total);
    }

    function extraMulticlassHasSpellcasting() {
      const spellcastingClasses = new Set([
        "吟游诗人", "牧师", "德鲁伊", "术士", "法师",
        "圣武士", "游侠", "奇械师", "魔契师"
      ]);
      const thirdCasterSubclasses = {
        "战士": "奥法骑士",
        "游荡者": "诡术师",
        "武僧": "秘术武者"
      };

      return getExtraMultiEntries().some((entry) => {
        const name = entry.classSelect.value;
        if (!name) return false;
        if (spellcastingClasses.has(name)) return true;
        return thirdCasterSubclasses[name] === entry.subclassSelect.value;
      });
    }

    function getPreparedSpellCount() {
      const className = classSelect.value;
      const level = getLevel(levelInput);
      if (!className || level === null || level < 1) return null;

      const index = Math.min(20, level) - 1;
      if (className === "法师") return preparedSpellCounts.wizard[index];
      if (className === "牧师") return preparedSpellCounts.cleric[index];
      if (["术士", "德鲁伊", "吟游诗人"].includes(className)) return preparedSpellCounts.full[index];
      if (["游侠", "圣武士", "奇械师"].includes(className)) return preparedSpellCounts.half[index];

      const thirdCasterSubclass = {
        "战士": "奥法骑士",
        "游荡者": "诡术师",
        "武僧": "秘术武者"
      };
      if (thirdCasterSubclass[className] === currentMainSubclass()) {
        const casterLevel = Math.floor(level / 3);
        if (casterLevel < 1) return null;
        return preparedSpellCounts.wizard[Math.min(20, casterLevel) - 1];
      }

      return null;
    }

    function getCantripSpellCount() {
      const className = classSelect.value;
      const level = getLevel(levelInput);
      if (!className || level === null || level < 1) return null;

      const index = Math.min(20, level) - 1;

      if (className === "法师" || className === "牧师") {
        return cantripSpellCounts.wizardCleric[index];
      }
      if (className === "术士") return cantripSpellCounts.sorcerer[index];
      if (className === "奇械师") return cantripSpellCounts.artificer[index];
      if (className === "德鲁伊" || className === "吟游诗人") {
        return cantripSpellCounts.druidBard[index];
      }

      const thirdCasterSubclass = {
        "战士": "奥法骑士",
        "游荡者": "诡术师",
        "武僧": "秘术武者"
      };

      if (thirdCasterSubclass[className] === currentMainSubclass()) {
        return level >= 11 ? 3 : 2;
      }

      return null;
    }

    function readSpellModifier(input) {
      const raw = input.value.trim();
      if (raw === "") return 0;
      const value = Number(raw);
      return Number.isFinite(value) ? Math.trunc(value) : 0;
    }

    function getWarlockPactData() {
      if (classSelect.value !== "魔契师") return null;

      const level = getLevel(levelInput);
      if (level === null || level < 1) {
        return { level: null, cantrips: null, prepared: null, slots: 0, slotLevel: null };
      }

      const index = Math.min(20, level) - 1;
      return {
        level: Math.min(20, level),
        cantrips: warlockPactData.cantrips[index],
        prepared: warlockPactData.prepared[index],
        slots: warlockPactData.slots[index],
        slotLevel: warlockPactData.slotLevel[index]
      };
    }

    const SPELL_LOOKUP_BASE = "https://5echm.kagangtuya.top/topics/速查/法术速查/";
    const SPELL_LOOKUP_PAGES = {
      "吟游诗人": "吟游诗人法术速查.html",
      "法师": "法师法术速查.html",
      "魔契师": "魔契师法术速查.html",
      "奇械师": "奇械师法术速查.html",
      "德鲁伊": "德鲁伊法术速查.html",
      "牧师": "牧师法术速查.html",
      "圣武士": "圣武士法术速查.html",
      "游侠": "游侠法术速查.html",
      "术士": "术士法术速查.html"
    };
    const SPELL_LOOKUP_ALL_PAGE = "5E万法大全.html";

    function isSpellcastingClassEntry(name, subclass) {
      const spellcastingClasses = new Set([
        "吟游诗人", "牧师", "德鲁伊", "术士", "法师",
        "圣武士", "游侠", "奇械师", "魔契师"
      ]);
      const thirdCasterSubclasses = {
        "战士": "奥法骑士",
        "游荡者": "诡术师",
        "武僧": "秘术武者"
      };
      return spellcastingClasses.has(name) ||
        thirdCasterSubclasses[name] === subclass;
    }

    function getSpellMainClassChoices() {
      const choices = [];
      if (!classSelect.value) return choices;

      const mainValue = classSelect.value;
      choices.push({
        value: mainValue,
        name: currentMainClassName(),
        level: getLevel(levelInput),
        subclass: currentMainSubclass()
      });

      for (const entry of getExtraMultiEntries()) {
        const name = entry.classSelect.value;
        if (!name || name === mainValue) continue;
        if (!isSpellcastingClassEntry(name, entry.subclassSelect.value)) continue;
        choices.push({
          value: name,
          name,
          level: getLevel(entry.levelInput),
          subclass: entry.subclassSelect.value
        });
      }
      return choices;
    }

    function syncSpellMainClassSelect() {
      const previous = spellMainClass.value;
      const choices = getSpellMainClassChoices();
      spellMainClass.replaceChildren();

      if (!choices.length) {
        const blank = document.createElement("option");
        blank.value = "";
        blank.textContent = "—";
        spellMainClass.appendChild(blank);
        spellMainClass.disabled = true;
        updateSpellLookupButtonLabel();
        return;
      }

      for (const choice of choices) {
        const option = document.createElement("option");
        option.value = choice.value;
        option.textContent = `${choice.name} ${choice.level === null ? "?" : choice.level}级`;
        option.dataset.subclass = choice.subclass || "";
        spellMainClass.appendChild(option);
      }
      spellMainClass.disabled = false;
      const preferred = choices.some((choice) => choice.value === previous)
        ? previous
        : choices[0].value;
      spellMainClass.value = preferred;
      updateSpellLookupButtonLabel();
    }

    function getSpellLookupSelection() {
      const option = spellMainClass.selectedOptions[0];
      const className = spellMainClass.value;
      const subclass = option?.dataset.subclass || "";
      const thirdCasterLookup = {
        "战士": "奥法骑士",
        "游荡者": "诡术师",
        "武僧": "秘术武者"
      };
      return {
        option,
        className,
        label: option ? option.textContent : "—",
        lookupClass: thirdCasterLookup[className] === subclass ? "法师" : className
      };
    }

    function updateSpellLookupButtonLabel() {
      const { lookupClass } = getSpellLookupSelection();
      const label = SPELL_LOOKUP_PAGES[lookupClass]
        ? `${lookupClass}法术速查`
        : "法术速查";
      for (const button of document.querySelectorAll(
        ".spell-lookup-help, .spellbook-lookup-button[data-reference-tooltip='spell-lookup']"
      )) {
        if (button.dataset.referenceTooltip === "spell-lookup-all") continue;
        button.textContent = label;
        button.title = label;
        button.setAttribute("aria-label", `查看${label}`);
      }
    }

    function buildIframeZoomActions() {
      return `<button class="spell-lookup-zoom" type="button" data-iframe-zoom="-1" title="缩小内容" aria-label="缩小内容">−</button>
<button class="spell-lookup-zoom" type="button" data-iframe-zoom="1" title="放大内容" aria-label="放大内容">+</button>`;
    }

    const FEAT_LOOKUP_DATA = {
      "起源专长": {
        official: [
          { label: "核心书", source: "玩家手册", url: "https://5echm.kagangtuya.top/topics/玩家手册2024/专长/起源专长.htm" },
          { label: "费伦英雄", source: "被遗忘的国度：费伦英雄", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/费伦英雄/第一章/专长/起源专长.htm" },
          { label: "启封奥秘", source: "启封奥秘", url: "https://5echm.kagangtuya.top/topics/启封奥秘/第一章/专长/起源专长.htm" },
          { label: "阿斯代伦", source: "阿斯代伦的饥渴之书", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/阿斯代伦/起源专长.htm" },
          { label: "鸦阁书", source: "鸦阁魔域：魔障深藏", url: "https://5echm.kagangtuya.top/topics/鸦阁魔域：魔障深藏/第一章/起源专长.htm" },
          { label: "鸦阁黑暗赠礼", source: "鸦阁魔域：魔障深藏", url: "https://5echm.kagangtuya.top/topics/鸦阁魔域：魔障深藏/第一章/黑暗赠礼.htm" },
          { label: "洛温初光", source: "洛温：初光", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/洛温初光/专长.htm" },
          { label: "艾伯伦龙纹", source: "艾伯伦：奇械锻炉", url: "https://5echm.kagangtuya.top/topics/艾伯伦：奇械锻炉/第二章/龙纹专长.htm" },
          { label: "反派UA", source: "反派UA", url: "https://5echm.kagangtuya.top/topics/其他/新UA/反派三期/起源专长.htm" },
          { label: "外域专长(旧)", source: "印记城与外域", url: "https://5echm.kagangtuya.top/topics/印记城与外域/第一章/专长.htm" }
        ],
        third: [
          { label: "歪曲之月", source: "歪曲之月", url: "https://5echm.kagangtuya.top/topics/第三方/歪曲之月/第五章/起源专长.htm" },
          { label: "鬼魅幽谷", source: "鬼魅幽谷", url: "https://5echm.kagangtuya.top/topics/第三方/鬼魅幽谷/玩家指南/第四章/起源专长.htm" },
          { label: "斯坦哈德", source: "斯坦哈德的诡怖猎杀指南", url: "https://5echm.kagangtuya.top/topics/第三方/斯坦哈德的诡怖猎杀指南/专长与背景/起源专长.htm" },
          { label: "克苏鲁", source: "火炬光下的克苏鲁", url: "https://5echm.kagangtuya.top/topics/第三方/火炬光下的克苏鲁/第二章/起源专长.htm" },
          { label: "血族专长", source: "吸血鬼：避世潜藏", url: "https://5echm.kagangtuya.top/topics/第三方/吸血鬼：避世潜藏/专长/起源专长.htm" },
          { label: "探秘艾伯伦：种族", source: "探秘艾伯伦", url: "https://5echm.kagangtuya.top/topics/第三方/探秘艾伯伦/第六章/起源专长.htm" }
        ]
      },
      "通用专长": {
        official: [
          { label: "核心书", source: "玩家手册", url: "https://5echm.kagangtuya.top/topics/玩家手册2024/专长/通用专长.htm" },
          { label: "费伦英雄", source: "费伦英雄", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/费伦英雄/第一章/专长/通用专长.htm" },
          { label: "启封奥秘", source: "启封奥秘", url: "https://5echm.kagangtuya.top/topics/启封奥秘/第一章/专长/通用专长.htm" },
          { label: "阿斯代伦", source: "阿斯代伦", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/阿斯代伦/通用专长.htm" },
          { label: "洛温初光", source: "洛温初光", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/洛温初光/专长.htm" },
          { label: "艾伯伦龙纹", source: "艾伯伦：奇械锻炉", url: "https://5echm.kagangtuya.top/topics/艾伯伦：奇械锻炉/第二章/通用专长.htm" },
          { label: "种族专长(旧)", source: "珊娜萨的万事指南", url: "https://5echm.kagangtuya.top/topics/珊娜萨的万事指南/角色选项/种族专长.html" },
          { label: "塔莎专长(旧)", source: "塔莎的万事坩埚", url: "https://5echm.kagangtuya.top/topics/塔莎的万事坩埚/玩家选项/专长.html" },
          { label: "龙类赋礼(旧)", source: "费资本的巨龙宝库", url: "https://5echm.kagangtuya.top/topics/费资本的巨龙宝库/玩家选项/龙类专长.html" },
          { label: "巨人专长(旧)", source: "毕格比巨献：巨人之荣耀", url: "https://5echm.kagangtuya.top/topics/巨人之荣耀/角色选项/专长.htm" },
          { label: "卡牌占卜师(旧)", source: "万象无常书", url: "https://5echm.kagangtuya.top/topics/万象无常书/贤者/专长：卡牌占卜师.htm" }
        ],
        third: [
          { label: "歪曲之月", source: "歪曲之月", url: "https://5echm.kagangtuya.top/topics/第三方/歪曲之月/第五章/通用专长.htm" },
          { label: "鬼魅幽谷", source: "鬼魅幽谷", url: "https://5echm.kagangtuya.top/topics/第三方/鬼魅幽谷/玩家指南/第四章/通用专长.htm" },
          { label: "斯坦哈德", source: "斯坦哈德的诡怖猎杀指南", url: "https://5echm.kagangtuya.top/topics/第三方/斯坦哈德的诡怖猎杀指南/专长与背景/通用专长.htm" },
          { label: "血族专长", source: "吸血鬼：避世潜藏", url: "https://5echm.kagangtuya.top/topics/第三方/吸血鬼：避世潜藏/专长/血族专长.htm" },
          { label: "探秘艾伯伦：种族", source: "探秘艾伯伦", url: "https://5echm.kagangtuya.top/topics/第三方/探秘艾伯伦/第六章/通用专长.htm" },
          { label: "秘密尖塔1", source: "瓦尔达的秘密尖塔1", url: "https://5echm.kagangtuya.top/topics/第三方/瓦尔达的秘密尖塔/玩家包1/专长.htm" },
          { label: "秘密尖塔2", source: "瓦尔达的秘密尖塔2", url: "https://5echm.kagangtuya.top/topics/第三方/瓦尔达的秘密尖塔/玩家包2/专长.htm" },
          { label: "空际远坠：战术", source: "空际远坠（Beyond Drops）", url: "https://5echm.kagangtuya.top/topics/其他/beyond%20drops/26.7/通用专长.htm" },
          { label: "空际远坠：异域", source: "空际远坠（Beyond Drops）", url: "https://5echm.kagangtuya.top/topics/其他/beyond%20drops/26.5/专长.htm" },
          { label: "空际远坠：黑暗", source: "空际远坠（Beyond Drops）", url: "https://5echm.kagangtuya.top/topics/其他/beyond%20drops/26.10/专长.htm" },
          { label: "空际远坠：妖精", source: "空际远坠（Beyond Drops）", url: "https://5echm.kagangtuya.top/topics/其他/beyond%20drops/26.8/专长.htm" }
        ]
      },
      "传奇恩惠专长": {
        official: [
          { label: "核心书", source: "玩家手册", url: "https://5echm.kagangtuya.top/topics/玩家手册2024/专长/传奇恩惠专长.htm" },
          { label: "费伦英雄", source: "费伦英雄", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/费伦英雄/第一章/专长/传奇恩惠.htm" },
          { label: "启封奥秘", source: "启封奥秘", url: "https://5echm.kagangtuya.top/topics/启封奥秘/第一章/专长/传奇恩惠专长.htm" },
          { label: "阿斯代伦", source: "阿斯代伦", url: "https://5echm.kagangtuya.top/topics/被遗忘的国度/阿斯代伦/传奇恩惠专长.htm" },
          { label: "艾伯伦龙纹", source: "艾伯伦：奇械锻炉", url: "https://5echm.kagangtuya.top/topics/艾伯伦：奇械锻炉/第二章/传奇恩惠.htm" },
          { label: "反派UA", source: "反派UA", url: "https://5echm.kagangtuya.top/topics/其他/新UA/反派三期/传奇恩惠.htm" }
        ],
        third: [
          { label: "血族专长", source: "吸血鬼：避世潜藏", url: "https://5echm.kagangtuya.top/topics/第三方/吸血鬼：避世潜藏/专长/传奇恩惠专长.htm" }
        ]
      },
      "战斗风格专长": {
        official: [
          { label: "核心书", source: "玩家手册", url: "https://5echm.kagangtuya.top/topics/玩家手册2024/专长/战斗风格专长.htm" },
          { label: "启封奥秘", source: "启封奥秘", url: "https://5echm.kagangtuya.top/topics/启封奥秘/第一章/专长/战斗风格专长.htm" },
          { label: "空际远坠：战术", source: "空际远坠（Beyond Drops）", url: "https://5echm.kagangtuya.top/topics/其他/beyond%20drops/26.7/战斗风格专长.htm" }
        ],
        third: [
          { label: "鬼魅幽谷", source: "鬼魅幽谷", url: "https://5echm.kagangtuya.top/topics/第三方/鬼魅幽谷/玩家指南/第四章/战斗风格专长.htm" }
        ]
      }
    };

    function featLookupPageButtons(category, pages, markFirst = false) {
      return pages.map((page, index) => (
        `<button class="feat-lookup-tab${markFirst && index === 0 ? " is-active" : ""}" type="button" data-feat-page data-feat-category="${escapePlainText(category)}" data-feat-source="${escapePlainText(page.source)}" data-feat-url="${page.url}">${escapePlainText(page.label)}</button>`
      )).join("");
    }

    function featLookupTabRows(category) {
      const data = FEAT_LOOKUP_DATA[category];
      const categories = Object.keys(FEAT_LOOKUP_DATA).map((name) => (
        `<button class="feat-lookup-tab${name === category ? " is-active" : ""}" type="button" data-feat-category-tab="${escapePlainText(name)}">${escapePlainText(name)}</button>`
      )).join("");
      return `<div class="feat-lookup-row">${categories}</div>
<div class="feat-lookup-row"><b class="feat-lookup-label">官方扩展：</b><span data-feat-official>${featLookupPageButtons(category, data.official, true)}</span></div>
<div class="feat-lookup-row"><b class="feat-lookup-label">第三方扩展：</b><span data-feat-third>${featLookupPageButtons(category, data.third)}</span></div>`;
    }

    function buildFeatLookupTooltip() {
      const category = "起源专长";
      const first = FEAT_LOOKUP_DATA[category].official[0];
      const title = `${first.source} - ${category}`;
      return `<div class="spell-lookup-head">
<span class="class-lookup-heading">
<span class="lookup-source">来源：5e不全书</span>
<span class="reference-title" data-feat-title>${escapePlainText(title)}</span>
</span>
<span class="spell-lookup-actions">
${buildIframeZoomActions()}
<button class="spell-lookup-back" type="button" title="回退" aria-label="回退">←</button>
<button class="spell-lookup-close" type="button" title="关闭" aria-label="关闭">×</button>
</span>
</div>
<div class="feat-lookup-tabs" data-feat-tabs>${featLookupTabRows(category)}</div>
<div class="spell-lookup-frame-wrap"><iframe class="spell-lookup-frame" src="${first.url}" title="${escapePlainText(title)}" loading="eager" referrerpolicy="no-referrer"></iframe></div>
<div class="spell-lookup-note">此速查来自 5e不全书，需要联网加载。若内容未显示，请点击此处——><a href="${first.url}" target="_blank" rel="noopener noreferrer">“在新窗口打开”</a>。</div>
<span class="spell-lookup-resize" title="调整大小" aria-hidden="true"></span>`;
    }

    function setFeatLookupPage(button) {
      const frame = referenceTooltip.querySelector(".spell-lookup-frame");
      if (!frame || !button) return;
      frame.src = button.dataset.featUrl;
      const title = `${button.dataset.featSource} - ${button.dataset.featCategory}`;
      frame.title = title;
      const titleNode = referenceTooltip.querySelector("[data-feat-title]");
      if (titleNode) titleNode.textContent = title;
      const link = referenceTooltip.querySelector(".spell-lookup-note a");
      if (link) link.href = button.dataset.featUrl;
      for (const page of referenceTooltip.querySelectorAll("[data-feat-page]")) {
        page.classList.toggle("is-active", page === button);
      }
    }

    function setFeatLookupCategory(category) {
      const data = FEAT_LOOKUP_DATA[category];
      if (!data) return;
      for (const tab of referenceTooltip.querySelectorAll("[data-feat-category-tab]")) {
        tab.classList.toggle("is-active", tab.dataset.featCategoryTab === category);
      }
      referenceTooltip.querySelector("[data-feat-official]").innerHTML =
        featLookupPageButtons(category, data.official, true);
      referenceTooltip.querySelector("[data-feat-third]").innerHTML =
        featLookupPageButtons(category, data.third);
      const first = referenceTooltip.querySelector("[data-feat-official] [data-feat-page]");
      if (first) setFeatLookupPage(first);
    }

    function buildClassFeatureLookupTooltip(target) {
      const title = target.dataset.lookupTitle || "职业特性速查";
      const source = target.dataset.lookupSource || CLASS_FEATURE_LOOKUP_SOURCE;
      const url = target.dataset.lookupUrl || "";
      const note = target.dataset.lookupNote || "";
      const noteHtml = note
        ? `<div class="class-lookup-tip">${escapePlainText(note)}</div>`
        : "";
      const alternateUrl = target.dataset.lookupAltUrl || "";
      const alternateTitle = target.dataset.lookupAltTitle || "其他页面";
      const tabLabel = target.dataset.lookupTabLabel || title;
      const alternateTabLabel = target.dataset.lookupAltTabLabel || alternateTitle;
      const pageTabs = alternateUrl
        ? `<div class="lookup-page-tabs">
<button class="lookup-page-tab is-active" type="button" data-lookup-page-url="${url}" data-lookup-page-title="${escapePlainText(title)}">${escapePlainText(tabLabel)}</button>
<button class="lookup-page-tab" type="button" data-lookup-page-url="${alternateUrl}" data-lookup-page-title="${escapePlainText(alternateTitle)}">${escapePlainText(alternateTabLabel)}</button>
</div>`
        : "";
      const actions = `<span class="spell-lookup-actions">
${url ? buildIframeZoomActions() : ""}
<button class="spell-lookup-back" type="button" title="回退" aria-label="回退">←</button>
<button class="spell-lookup-close" type="button" title="关闭" aria-label="关闭">×</button>
</span>`;
      const header = `<div class="spell-lookup-head">
<span class="class-lookup-heading">
<span class="lookup-source">来源：${escapePlainText(source)}</span>
<span class="reference-title">${escapePlainText(title)}</span>
</span>
${actions}
</div>`;

      if (!url) {
        return `${header}
${noteHtml}
<p>该职业特性速查页面暂未配置链接。</p>
<span class="spell-lookup-resize" title="调整大小" aria-hidden="true"></span>`;
      }

      return `${header}
${pageTabs}
${noteHtml}
<div class="spell-lookup-frame-wrap"><iframe class="spell-lookup-frame" src="${url}" title="${escapePlainText(title)}" loading="eager" referrerpolicy="no-referrer"></iframe></div>
<div class="spell-lookup-note">此速查来自 5e不全书，需要联网加载。若内容未显示，请点击此处——><a href="${url}" target="_blank" rel="noopener noreferrer">“在新窗口打开”</a>。</div>
<span class="spell-lookup-resize" title="调整大小" aria-hidden="true"></span>`;
    }

    function buildSpellLookupTooltip(mode) {
      const allSpells = mode === "all";
      const selection = getSpellLookupSelection();
      const label = allSpells ? "5E 万法大全" : selection.label;
      const lookupClass = selection.lookupClass;
      const page = allSpells ? SPELL_LOOKUP_ALL_PAGE : SPELL_LOOKUP_PAGES[lookupClass];

      if (!allSpells && (!selection.className || !page)) {
        return `<div class="spell-lookup-head">
<span class="reference-title">法术速查 Spell Lookup</span>
<span class="spell-lookup-actions">
<button class="spell-lookup-back" type="button" title="回退" aria-label="回退">←</button>
<button class="spell-lookup-close" type="button" title="关闭" aria-label="关闭">×</button>
</span>
</div>
<p>${escapePlainText(label)} 暂无对应的法术速查页面。请先选择包含速查数据的职业。</p>
<span class="spell-lookup-resize" title="调整大小" aria-hidden="true"></span>`;
      }

      const url = encodeURI(`${SPELL_LOOKUP_BASE}${page}`);
      return `<div class="spell-lookup-head">
<span class="reference-title">${escapePlainText(label)} · 法术速查 Spell Lookup</span>
<span class="spell-lookup-actions">
${buildIframeZoomActions()}
<button class="spell-lookup-back" type="button" title="回退" aria-label="回退">←</button>
<button class="spell-lookup-close" type="button" title="关闭" aria-label="关闭">×</button>
</span>
</div>
<div class="spell-lookup-frame-wrap"><iframe class="spell-lookup-frame" src="${url}" title="${escapePlainText(label)}法术速查" loading="eager" referrerpolicy="no-referrer"></iframe></div>
<div class="spell-lookup-note">此速查来自 5e不全书，需要联网加载。若内容未显示，请点击此处——><a href="${url}" target="_blank" rel="noopener noreferrer">“在新窗口打开”</a>。</div>
<span class="spell-lookup-resize" title="调整大小" aria-hidden="true"></span>`;
    }

    function updateSpellcasting() {
      const warlock = getWarlockPactData();
      const casterLevel = warlock
        ? warlock.level
        : getCasterLevel();
      const cantripBase = warlock
        ? warlock.cantrips
        : getCantripSpellCount();
      const cantripGift = readSpellModifier(spellCantripGift);
      const cantripTotal = cantripBase === null
        ? (cantripGift !== 0 ? cantripGift : null)
        : cantripBase + cantripGift;

      const preparedBase = warlock
        ? warlock.prepared
        : getPreparedSpellCount();
      const preparedGift = readSpellModifier(spellAlwaysPrepared) +
        readSpellModifier(spellGiftSpells);
      const preparedTotal = preparedBase === null
        ? (preparedGift !== 0 ? preparedGift : null)
        : preparedBase + preparedGift;

      syncSpellMainClassSelect();

      spellCasterLabel.textContent = classSelect.value === "魔契师"
        ? "契约魔法等级"
        : "施法者等级";
      spellCasterLevel.textContent = casterLevel === null ? "—" : String(casterLevel);
      spellCantripCount.textContent = cantripTotal === null ? "—" : String(cantripTotal);
      spellPreparedCount.textContent = preparedTotal === null ? "—" : String(preparedTotal);
      spellMulticlassNote.hidden = !extraMulticlassHasSpellcasting();

      const slots = warlock ? [] : (spellSlotsByCasterLevel[casterLevel] || []);

      for (let index = 1; index <= 9; index += 1) {
        const count = warlock
          ? (index === warlock.slotLevel ? warlock.slots : 0)
          : (slots[index - 1] || 0);
        const output = spellSlotOutputs[index - 1];
        output.textContent = count > 0 ? String(count) : "—";
        output.classList.toggle("is-empty", count === 0);
      }
    }

    function updateSkillTotals() {
      const { total } = getCombatTotalLevel();
      const pb = Math.max(2, Math.floor((total - 1) / 4) + 2);
      const bardLevel = getBardLevel();
      let proficientCount = 0;
      let expertiseCount = 0;

      for (const table of skillTables.querySelectorAll(".skill-table")) {
        const abilityModifier = getModifierValue(table.dataset.ability) ?? 0;

        for (const row of table.querySelectorAll("tbody tr")) {
          const select = row.querySelector(".skill-prof-select");
          const state = Number(select.value) || 0;
          let proficiency = 0;

          if (state >= 1) proficientCount += 1;
          if (state === 2) expertiseCount += 1;

          if (state === 1) proficiency = pb;
          else if (state === 2) proficiency = pb * 2;
          else if (bardLevel >= 2) proficiency = Math.floor(pb / 2);

          const correctionInput = row.querySelector(".skill-correction-input");
          const raw = correctionInput.value.trim();
          const validCorrection = raw !== "" && Number.isFinite(Number(raw));
          const correction = validCorrection ? Math.trunc(Number(raw)) : 0;
          correctionInput.closest(".skill-correction-cell").classList.toggle("has-value", validCorrection);
          const totalValue = abilityModifier + proficiency + correction;
          row.querySelector(".skill-total").textContent = formatModifier(totalValue);
        }
      }

      skillSummary.textContent = `已选择 ${proficientCount} 项技能熟练，其中 ${expertiseCount} 项专精。`;
      alignPlusIndicators();
    }

    function renderCustomCoreTraits() {
      const className = customClassInput.value.trim() || "自定义职业";
      const hitDie = professionCustomHitDie.value || "8";
      const abilityLabels = {
        str: "力量", dex: "敏捷", con: "体质",
        int: "智力", wis: "感知", cha: "魅力"
      };
      const saves = [...document.querySelectorAll(".custom-save-check:checked")]
        .map((input) => abilityLabels[input.dataset.ability])
        .filter(Boolean)
        .join("、") || "—";
      const fields = [
        ["主要属性", "ability", "例如：力量或敏捷"],
        ["生命值骰", null, `每${className}等级D${hitDie}`],
        ["豁免熟练", null, saves],
        ["技能熟练", "skills", "例如：选择2项：运动、察觉"],
        ["武器熟练", "weapons", "例如：简易武器和军用武器"],
        ["护甲受训", "armor", "例如：轻甲、中甲和盾牌"],
        ["起始装备", "equipment", "例如：选择A或B：……"]
      ];

      for (const [label, field, value] of fields) {
        const row = document.createElement("tr");
        const labelCell = document.createElement("th");
        labelCell.scope = "row";
        labelCell.textContent = label;
        const valueCell = document.createElement("td");
        if (field) {
          const input = document.createElement("input");
          input.type = "text";
          input.className = "custom-core-trait-input";
          input.dataset.customCoreField = field;
          input.value = customCoreTraits[field] || "";
          input.placeholder = value;
          input.autocomplete = "off";
          input.addEventListener("input", () => {
            customCoreTraits[field] = input.value;
          });
          valueCell.append(input);
        } else {
          valueCell.textContent = value;
        }
        row.append(labelCell, valueCell);
        coreTraitBody.append(row);
      }
    }

    function renderCoreTraits() {
      coreTraitBody.replaceChildren();

      const className = classSelect.value;
      coreTraitTitle.textContent = className
        ? `${currentMainClassName()}核心特质`
        : "核心特质";
      if (!className) return;

      if (className === CUSTOM_VALUE) {
        renderCustomCoreTraits();
        return;
      }

      const traits = classCoreTraits[className];
      if (!traits) {
        const row = document.createElement("tr");
        const cell = document.createElement("th");
        cell.colSpan = 2;
        cell.className = "core-trait-empty";
        cell.textContent = `${className}核心特质数据待补充`;
        row.append(cell);
        coreTraitBody.append(row);
        return;
      }

      const fields = [
        ["主要属性", traits.ability, false],
        ["生命值骰", traits.hitDie, false],
        ["豁免熟练", traits.saves, false],
        ["技能熟练", traits.skillsHtml, true],
        ["武器熟练", traits.weapons, false]
      ];

      if (traits.tools) fields.push(["工具熟练", traits.tools, false]);
      fields.push(["护甲受训", traits.armor, false]);
      fields.push(["起始装备", traits.equipment, false]);

      for (const [label, value, isHtml] of fields) {
        const row = document.createElement("tr");
        const labelCell = document.createElement("th");
        labelCell.scope = "row";
        labelCell.textContent = label;
        const valueCell = document.createElement("td");
        if (isHtml) valueCell.innerHTML = value;
        else valueCell.textContent = value;
        row.append(labelCell, valueCell);
        coreTraitBody.append(row);
      }
    }

    function buildClassFeatureTitle(className, customName) {
      if (className === CUSTOM_VALUE) {
        const displayName = customName.trim();
        return displayName ? `${displayName}职业特性 Custom Class Features` : "职业特性 Custom Class Features";
      }

      const english = classEnglishNames[className] || "Class";
      return `${className}职业特性 ${english} Class Features`;
    }

    function buildClassSubclassFeatureTitle(className, customName, subclassName) {
      const baseName = className === CUSTOM_VALUE
        ? (customName.trim() || "职业")
        : className;
      const english = classEnglishNames[className] || "Class";
      const subclass = subclassName ? `（${subclassName}）` : "";
      return `${baseName}${subclass}子职特性 ${english} Subclass Features`;
    }

    function getPrimaryMultiFeatureInfo() {
      const extra = getExtraMultiEntries()[0];
      if (extra) {
        return {
          className: extra.classSelect.value,
          level: getLevel(extra.levelInput),
          subclass: extra.subclassSelect.value,
          customName: ""
        };
      }
      return {
        className: multiClassSelect.value,
        level: getLevel(multiLevelInput),
        subclass: multiSubclassSelect.value,
        customName: customMultiClassInput.value
      };
    }

    const CLASS_FEATURE_LOOKUP_BASE = "https://5echm.kagangtuya.top/topics/";
    const CLASS_FEATURE_LOOKUP_SOURCE = "玩家手册2024";
    const SUBCLASS_SOURCE_BOOKS = {
      PHB14: "玩家手册（2014）",
      XGE: "珊娜萨的万事指南",
      TCE: "塔莎的万事坩埚",
      SCAG: "剑湾冒险者指南",
      EGW: "荒洲探险家指南",
      FTD: "费资本的巨龙宝库",
      BPGG: "巨人之荣耀",
      DSDQ: "龙枪：龙后之影",
      FR: "被遗忘的国度：费伦英雄",
      RHW: "鸦阁魔域：魔障深藏",
      AU: "启封奥秘",
      DMG14: "城主指南"
    };

    const THIRD_PARTY_LOOKUP = {
      "铳士": {
        classPath: "第三方/瓦尔达的秘密尖塔/铳士/铳士职业.htm",
        source: "瓦尔达的秘密尖塔",
        subclasses: {
          "死眼客": "第三方/瓦尔达的秘密尖塔/铳士/死眼客.htm",
          "豪赌客": "第三方/瓦尔达的秘密尖塔/铳士/豪赌客.htm",
          "密间客": "第三方/瓦尔达的秘密尖塔/铳士/密间客.htm",
          "魔弹客": "第三方/瓦尔达的秘密尖塔/铳士/魔弹客.htm",
          "花枪客": "第三方/瓦尔达的秘密尖塔/铳士/技枪客.htm",
          "白帽客": "第三方/瓦尔达的秘密尖塔/铳士/白帽客.htm",
          "快枪客": "第三方/瓦尔达的秘密尖塔/玩家包2/子职/铳士-快枪客.htm"
        }
      },
      "怪物猎人": {
        classPath: "第三方/鬼魅幽谷/玩家指南/第二章/怪物猎人.htm",
        source: "鬼魅幽谷",
        subclasses: {
          "刻肉会": "第三方/鬼魅幽谷/玩家指南/第二章/刻肉会.htm",
          "吞噬会": "第三方/鬼魅幽谷/玩家指南/第二章/吞噬会.htm",
          "秘学会": "第三方/鬼魅幽谷/玩家指南/第二章/秘学会.htm",
          "捕猎会": "第三方/鬼魅幽谷/玩家指南/第二章/捕猎会.htm"
        }
      },
      "拳斗士": {
        classPath: "第三方/拳斗士/拳斗士.htm",
        source: "拳斗士",
        subclasses: {
          "犬师拳狩": "第三方/拳斗士/犬师拳狩.htm",
          "惧恶之手": "第三方/拳斗士/惧恶之手.htm",
          "怒雷恶氓": "第三方/拳斗士/怒雷恶氓.htm",
          "街角圣徒": "第三方/拳斗士/街角圣徒.htm",
          "方圆擂尊": "第三方/拳斗士/方圆擂尊.htm",
          "甜蜜科学": "第三方/拳斗士/甜蜜科学.htm"
        }
      },
      "血族": {
        classPath: "第三方/吸血鬼：避世潜藏/血族职业/血族.htm",
        source: "吸血鬼：避世潜藏",
        subclasses: {
          "布鲁赫": "第三方/吸血鬼：避世潜藏/血族职业/布鲁赫.htm",
          "冈格罗": "第三方/吸血鬼：避世潜藏/血族职业/冈格罗.htm",
          "勒森魃": "第三方/吸血鬼：避世潜藏/血族职业/勒森魃.htm",
          "诺斯费拉图": "第三方/吸血鬼：避世潜藏/血族职业/诺斯费拉图.htm",
          "妥芮朵": "第三方/吸血鬼：避世潜藏/血族职业/妥芮朵.htm",
          "梵卓": "第三方/吸血鬼：避世潜藏/血族职业/梵卓.htm"
        }
      }
    };

    function getThirdPartyLookup(className, subclassName = "") {
      const entry = THIRD_PARTY_LOOKUP[className];
      if (!entry) return null;
      if (subclassName && entry.subclasses[subclassName]) {
        return entry.subclasses[subclassName];
      }
      return entry.classPath;
    }

    function getSubclassSourceCode(className, subclassName) {
      const entry = (subclassCatalog[className] || []).find(([name]) => name === subclassName);
      return entry?.[1] || "";
    }

    function buildSubclassLookupUrl(className, subclassName) {
      const thirdPartyPath = getThirdPartyLookup(className, subclassName);
      if (thirdPartyPath) {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}${thirdPartyPath}`);
      }

      const source = getSubclassSourceCode(className, subclassName);
      const legacyWarlockNames = new Set(["XGE", "TCE", "SCAG"]);
      const lookupClassName = className === "魔契师" && legacyWarlockNames.has(source)
        ? "邪术师"
        : className;
      const lookupSubclassName = className === "魔契师" &&
        source === "TCE" &&
        subclassName === "巨灵"
        ? "巨灵宗主"
        : subclassName;
      const name = `${lookupClassName}-${lookupSubclassName}`;
      if (source === "PHB14") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}玩家手册/职业/${className}/${subclassName}.html`);
      }
      if (source === "XGE") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}珊娜萨的万事指南/角色选项/${lookupClassName}/${lookupSubclassName}.html`);
      }
      if (source === "TCE") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}塔莎的万事坩埚/玩家选项/职业/${lookupClassName}（TCE）/${lookupSubclassName}.html`);
      }
      if (source === "SCAG") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}剑湾冒险者指南/职业/${lookupClassName}-${lookupSubclassName}.html`);
      }
      if (source === "EGW") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}荒洲探险家指南/角色选项/子职/${className}/${name}.htm`);
      }
      if (source === "FTD") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}费资本的巨龙宝库/玩家选项/${name}.html`);
      }
      if (source === "BPGG") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}巨人之荣耀/角色选项/子职业选项_${className}_${subclassName}.htm`);
      }
      if (source === "DSDQ") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}龙枪：龙后之影/创立角色/${name}.htm`);
      }
      if (source === "FR") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}被遗忘的国度/费伦英雄/第一章/子职/${name}.htm`);
      }
      if (source === "RHW") {
        const file = className === "游侠" && subclassName === "幽邃戌卫"
          ? "游侠-幽邃戍卫"
          : name;
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}鸦阁魔域：魔障深藏/第一章/子职/${file}.htm`);
      }
      if (source === "AU") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}启封奥秘/第一章/子职/${name}.htm`);
      }
      if (source === "DMG14") {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}城主指南/冒险之主/${name}.htm`);
      }
      return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}玩家手册2024/角色职业/${className}/${subclassName}.htm`);
    }

    function getClassFeatureLookupSource(className, subclassName, needsSubclass) {
      const thirdParty = THIRD_PARTY_LOOKUP[className];
      if (thirdParty) return thirdParty.source;
      if (!needsSubclass) return CLASS_FEATURE_LOOKUP_SOURCE;
      const source = getSubclassSourceCode(className, subclassName);
      return SUBCLASS_SOURCE_BOOKS[source] || CLASS_FEATURE_LOOKUP_SOURCE;
    }

    function buildClassFeatureLookupUrl(className, subclassName = "") {
      if (!className || className === CUSTOM_VALUE) return "";
      const thirdPartyPath = getThirdPartyLookup(className, subclassName);
      if (thirdPartyPath) {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}${thirdPartyPath}`);
      }
      if (!subclassName) {
        return encodeURI(`${CLASS_FEATURE_LOOKUP_BASE}玩家手册2024/角色职业/${className}/${className}.htm`);
      }
      return buildSubclassLookupUrl(className, subclassName);
    }

    function ensureClassFeatureLookupButton(block, kind) {
      if (!block) return null;
      block.querySelector(".custom-editor-toolbar")?.remove();
      let button = block.querySelector(".class-feature-lookup");
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "class-feature-lookup reference-tooltip-trigger reference-click-help";
        button.dataset.referenceTooltip = "class-lookup";
      }
      const actions = block.querySelector(".class-feature-block-actions");
      if (actions) actions.append(button);
      else block.append(button);
      button.dataset.lookupKind = kind;
      bindReferenceTooltipTrigger(button);
      return button;
    }

    function getStaticClassFeatureBlock(kind) {
      return {
        "main-class": mainClassFeatureBlock,
        "main-subclass": mainSubclassFeatureBlock,
        "multi-class": multiClassFeatureBlock,
        "multi-subclass": multiSubclassFeatureBlock
      }[kind];
    }

    function updateClassFeatureLookupButton(
      kind,
      title,
      className,
      subclassName = "",
      targetBlock = null
    ) {
      const block = targetBlock || getStaticClassFeatureBlock(kind);
      const button = block?.querySelector(".class-feature-lookup");
      if (!button) return;
      button.textContent = title;
      button.title = title;
      button.hidden = !className;
      button.dataset.lookupTitle = title;
      const needsSubclass = kind.endsWith("subclass");
      button.dataset.lookupSource = getClassFeatureLookupSource(
        className,
        subclassName,
        needsSubclass
      );
      button.dataset.lookupUrl = className && (!needsSubclass || subclassName)
        ? buildClassFeatureLookupUrl(className, subclassName)
        : "";
    }

    function setupClassFeatureLookupButtons() {
      const blocks = [
        [mainClassFeatureBlock, "main-class"],
        [mainSubclassFeatureBlock, "main-subclass"],
        [multiClassFeatureBlock, "multi-class"],
        [multiSubclassFeatureBlock, "multi-subclass"]
      ];

      for (const [block, kind] of blocks) {
        ensureClassFeatureLookupButton(block, kind);
      }
      syncClassFeatureEditors();
    }

    function getExtraClassFeatureContainer() {
      let container = document.getElementById("extra-class-feature-blocks");
      if (container) return container;
      container = document.createElement("div");
      container.id = "extra-class-feature-blocks";
      container.className = "extra-class-feature-blocks";
      if (multiSubclassFeatureBlock?.parentNode) {
        multiSubclassFeatureBlock.after(container);
      } else {
        document.querySelector(".class-trait-section")?.append(container);
      }
      return container;
    }

    function getExtraClassFeatureBlockId(index, kind) {
      return `extra-class-feature-${index}-${kind}`;
    }

    function createExtraClassFeatureBlock(index, kind) {
      const block = document.createElement("div");
      block.className = "class-feature-block";
      block.dataset.extraClassFeature = "";
      block.dataset.extraIndex = String(index);
      block.dataset.extraKind = kind;
      block.hidden = true;

      const editorId = getExtraClassFeatureBlockId(index, kind);
      const title = document.createElement("div");
      title.className = "class-feature-title";
      title.id = `${editorId}-title`;

      const editorWrapper = document.createElement("div");
      editorWrapper.className = "class-feature-editor";
      const editor = document.createElement("div");
      editor.id = editorId;
      editor.className = "class-feature-text custom-editor";
      editor.contentEditable = "true";
      editor.setAttribute("role", "textbox");
      editor.setAttribute("aria-multiline", "true");
      editor.setAttribute("aria-label", kind === "class" ? "兼职职业特性" : "兼职子职特性");
      editor.dataset.placeholder = kind === "class"
        ? "在此粘贴兼职的职业特性。如果为5R格式会自动在下方生成模块性可编辑表格。"
        : "在此粘贴兼职子职特性。如果为5R格式会自动在下方生成模块性可编辑表格。";
      editorWrapper.append(editor);
      block.append(title, editorWrapper);

      CLASS_FEATURE_EDITOR_IDS.add(editorId);
      setupClassFeatureEditorEvents(editor);
      ensureClassFeatureLookupButton(
        block,
        kind === "class" ? "extra-class" : "extra-subclass"
      );
      return block;
    }

    function syncExtraClassFeatureBlocks(entries) {
      const container = getExtraClassFeatureContainer();
      if (!container) return;

      for (let index = 1; index < entries.length; index += 1) {
        const entry = entries[index];
        const className = entry.classSelect.value;
        if (!className) continue;
        const level = getLevel(entry.levelInput);
        const subclassName = entry.subclassSelect.value;

        let classBlock = container.querySelector(
          `[data-extra-class-feature][data-extra-index="${index}"][data-extra-kind="class"]`
        );
        if (!classBlock) {
          classBlock = createExtraClassFeatureBlock(index, "class");
          container.append(classBlock);
        }
        classBlock.hidden = false;
        container.append(classBlock);
        classBlock.querySelector(".class-feature-title").textContent =
          buildClassFeatureTitle(className, "");
        updateClassFeatureLookupButton(
          "extra-class",
          `${className}特性速查`,
          className,
          "",
          classBlock
        );

        const showSubclass = level !== null && level >= 3;
        let subclassBlock = container.querySelector(
          `[data-extra-class-feature][data-extra-index="${index}"][data-extra-kind="subclass"]`
        );
        if (showSubclass && !subclassBlock) {
          subclassBlock = createExtraClassFeatureBlock(index, "subclass");
          container.append(subclassBlock);
        }
        if (subclassBlock) {
          subclassBlock.hidden = !showSubclass;
          container.append(subclassBlock);
          subclassBlock.querySelector(".class-feature-title").textContent = showSubclass
            ? buildClassSubclassFeatureTitle(className, "", subclassName)
            : "";
          updateClassFeatureLookupButton(
            "extra-subclass",
            subclassName ? `${subclassName}子职特性速查` : "子职特性速查",
            className,
            subclassName,
            subclassBlock
          );
        }
      }

      for (const block of [...container.querySelectorAll("[data-extra-class-feature]")]) {
        const index = Number(block.dataset.extraIndex);
        const entry = entries[index];
        if (!entry || !entry.classSelect.value) {
          const editorId = block.querySelector(".custom-editor")?.id;
          if (editorId) CLASS_FEATURE_EDITOR_IDS.delete(editorId);
          block.remove();
        }
      }
      setupPasteAddButtons();
    }

    function syncClassFeatureEditors() {
      const mainClass = classSelect.value;
      const mainLevel = getLevel(levelInput);
      if (mainClass) {
        mainClassFeatureBlock.hidden = false;
        mainClassFeatureTitle.textContent = buildClassFeatureTitle(mainClass, customClassInput.value);
        updateClassFeatureLookupButton(
          "main-class",
          `${currentMainClassName()}特性速查`,
          mainClass
        );

        const showMainSubclass = mainLevel !== null && mainLevel >= 3;
        mainSubclassFeatureBlock.hidden = !showMainSubclass;
        mainSubclassFeatureTitle.textContent = showMainSubclass
          ? buildClassSubclassFeatureTitle(mainClass, customClassInput.value, currentMainSubclass())
          : "";
        const mainSubclass = currentMainSubclass();
        updateClassFeatureLookupButton(
          "main-subclass",
          mainSubclass ? `${mainSubclass}子职特性速查` : "子职特性速查",
          mainClass,
          mainSubclass
        );
      } else {
        mainClassFeatureBlock.hidden = true;
        mainClassFeatureTitle.textContent = "";
        mainSubclassFeatureBlock.hidden = true;
        mainSubclassFeatureTitle.textContent = "";
        updateClassFeatureLookupButton("main-class", "职业特性速查", "");
        updateClassFeatureLookupButton("main-subclass", "子职特性速查", "");
      }

      const extraEntries = getExtraMultiEntries();
      const multiEntry = extraEntries[0];
      const multiClass = multiEntry?.classSelect.value || "";
      if (multiClass) {
        const multiLevel = getLevel(multiEntry.levelInput);
        const multiSubclass = multiEntry.subclassSelect.value;
        multiClassFeatureBlock.hidden = false;
        multiClassFeatureTitle.textContent = buildClassFeatureTitle(multiClass, "");
        updateClassFeatureLookupButton(
          "multi-class",
          `${multiClass}特性速查`,
          multiClass
        );

        const showMultiSubclass = multiLevel !== null && multiLevel >= 3;
        multiSubclassFeatureBlock.hidden = !showMultiSubclass;
        multiSubclassFeatureTitle.textContent = showMultiSubclass
          ? buildClassSubclassFeatureTitle(multiClass, "", multiSubclass)
          : "";
        updateClassFeatureLookupButton(
          "multi-subclass",
          multiSubclass ? `${multiSubclass}子职特性速查` : "子职特性速查",
          multiClass,
          multiSubclass
        );
      } else {
        multiClassFeatureBlock.hidden = true;
        multiClassFeatureTitle.textContent = "";
        multiSubclassFeatureBlock.hidden = true;
        multiSubclassFeatureTitle.textContent = "";
        updateClassFeatureLookupButton("multi-class", "兼职特性速查", "");
        updateClassFeatureLookupButton("multi-subclass", "兼职子职特性速查", "");
      }

      syncExtraClassFeatureBlocks(extraEntries);
    }

    const armorNames = {
      "无甲": ["法师护甲", "大法师法袍", "武僧", "野蛮人", "龙术", "舞蹈诗", "巨灵流光", "蛇鳞甲", "自定义"],
      "轻甲": ["布甲", "皮甲", "镶钉皮甲"],
      "中甲": ["兽皮甲", "链甲衫", "鳞甲", "胸甲", "半身板甲"],
      "重甲": ["环甲", "链甲", "板条甲", "板甲"]
    };

    const armorData = {
      "无甲": { ac: "10+敏捷调整值", stealth: "否" },
      "法师护甲": { ac: "13+敏捷调整值", stealth: "否" },
      "大法师法袍": { ac: "15+敏捷调整值", stealth: "否" },
      "武僧": { ac: "10+敏捷调整值+感知调整值", stealth: "否" },
      "野蛮人": { ac: "10+敏捷调整值+体质调整值", stealth: "否" },
      "龙术": { ac: "13+敏捷调整值", stealth: "否" },
      "舞蹈诗": { ac: "10+敏捷调整值+魅力调整值", stealth: "否" },
      "巨灵流光": { ac: "12+敏捷调整值", stealth: "否" },
      "蛇鳞甲": { ac: "14+敏捷调整值", stealth: "否" },
      "自定义": { ac: "", stealth: "否" },
      "布甲": { ac: "11+敏捷调整值", stealth: "是" },
      "皮甲": { ac: "11+敏捷调整值", stealth: "否" },
      "镶钉皮甲": { ac: "12+敏捷调整值", stealth: "否" },
      "兽皮甲": { ac: "12+敏捷调整值（最大2）", stealth: "否" },
      "链甲衫": { ac: "13+敏捷调整值（最大2）", stealth: "否" },
      "鳞甲": { ac: "14+敏捷调整值（最大2）", stealth: "是" },
      "胸甲": { ac: "14+敏捷调整值（最大2）", stealth: "否" },
      "半身板甲": { ac: "15+敏捷调整值（最大2）", stealth: "是" },
      "环甲": { ac: "14", stealth: "是" },
      "链甲": { ac: "16", stealth: "是" },
      "板条甲": { ac: "17", stealth: "是" },
      "板甲": { ac: "18", stealth: "是" }
    };

    function populateArmorNames() {
      const names = armorNames[equipmentArmorType.value] || [];
      equipmentArmorName.replaceChildren();

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "—";
      equipmentArmorName.append(placeholder);

      for (const name of names) {
        if (name === "自定义") continue;
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        equipmentArmorName.append(option);
      }

      const customOption = document.createElement("option");
      customOption.value = "自定义";
      customOption.textContent = "自定义";
      equipmentArmorName.append(customOption);
      syncArmorCustomUI();
    }

    function syncArmorCustomUI() {
      const custom = equipmentArmorName.value === "自定义";
      equipmentArmorName.hidden = custom;
      equipmentArmorCustomName.hidden = !custom;
      equipmentArmorReset.hidden = !custom;
    }

    const armorAcConfig = {
      "无甲": { base: 10, dex: true },
      "法师护甲": { base: 13, dex: true },
      "大法师法袍": { base: 15, dex: true },
      "武僧": { base: 10, dex: true, wis: true },
      "野蛮人": { base: 10, dex: true, con: true },
      "龙术": { base: 13, dex: true },
      "舞蹈诗": { base: 10, dex: true, cha: true },
      "巨灵流光": { base: 10, dex: true, cha: true },
      "蛇鳞甲": { base: 14, dex: true },
      "布甲": { base: 11, dex: true },
      "皮甲": { base: 11, dex: true },
      "镶钉皮甲": { base: 12, dex: true },
      "兽皮甲": { base: 12, dex: true, maxDex: 2 },
      "链甲衫": { base: 13, dex: true, maxDex: 2 },
      "鳞甲": { base: 14, dex: true, maxDex: 2 },
      "胸甲": { base: 14, dex: true, maxDex: 2 },
      "半身板甲": { base: 15, dex: true, maxDex: 2 },
      "环甲": { base: 14, dex: false },
      "链甲": { base: 16, dex: false },
      "板条甲": { base: 17, dex: false },
      "板甲": { base: 18, dex: false }
    };

    function updateArmorDefaults(force = false) {
      syncArmorCustomUI();
      const name = equipmentArmorName.value;
      const type = equipmentArmorType.value;
      const stealth = armorData[name] ? armorData[name].stealth : "否";
      const config = armorAcConfig[name] || (type === "无甲" ? armorAcConfig["无甲"] : null);
      const shouldUpdate = force || equipmentArmorAc.classList.contains("is-default") ||
        equipmentArmorAc.value.trim() === "";

      equipmentArmorStealth.value = stealth;

      if (!shouldUpdate) return;

      if (!config) {
        equipmentArmorAc.value = "";
        equipmentArmorAc.classList.remove("is-default");
        return;
      }

      let ac = config.base;
      if (config.dex) {
        let dex = getModifierValue("dex") ?? 0;
        if (config.maxDex !== undefined) dex = Math.min(dex, config.maxDex);
        ac += dex;
      }
      if (config.wis) ac += getModifierValue("wis") ?? 0;
      if (config.con) ac += getModifierValue("con") ?? 0;
      if (config.cha) ac += getModifierValue("cha") ?? 0;

      equipmentArmorAc.value = String(ac);
      equipmentArmorAc.classList.add("is-default");
    }

    const weaponData = {
      "短棒": { damage: "1d4", type: "钝击", properties: "轻型" },
      "匕首": { damage: "1d4", type: "穿刺", properties: "灵巧，轻型，投掷（射程 20/60）" },
      "巨棒": { damage: "1d8", type: "钝击", properties: "双手" },
      "手斧": { damage: "1d6", type: "挥砍", properties: "轻型，投掷（射程 20/60）" },
      "标枪": { damage: "1d6", type: "穿刺", properties: "投掷（射程 30/120）" },
      "轻锤": { damage: "1d4", type: "钝击", properties: "轻型，投掷（射程 20/60）" },
      "硬头锤": { damage: "1d6", type: "钝击", properties: "—" },
      "长棍": { damage: "1d6", type: "钝击", properties: "多用（1d8）" },
      "镰刀": { damage: "1d4", type: "挥砍", properties: "轻型" },
      "矛": { damage: "1d6", type: "穿刺", properties: "投掷（射程 20/60），多用（1d8）" },
      "轻弩": { damage: "1d8", type: "穿刺", properties: "弹药（射程 80/320；弩矢），装填，双手" },
      "飞镖": { damage: "1d4", type: "穿刺", properties: "灵巧，投掷（射程 20/60）" },
      "短弓": { damage: "1d6", type: "穿刺", properties: "弹药（射程 80/320；箭矢），双手" },
      "投石索": { damage: "1d4", type: "钝击", properties: "弹药（射程 30/120；子弹）" },
      "战斧": { damage: "1d8", type: "挥砍", properties: "多用（1d10）" },
      "链枷": { damage: "1d8", type: "钝击", properties: "—" },
      "长柄刀": { damage: "1d10", type: "挥砍", properties: "重型，触及，双手" },
      "巨斧": { damage: "1d12", type: "挥砍", properties: "重型，双手" },
      "巨剑": { damage: "2d6", type: "挥砍", properties: "重型，双手" },
      "戟": { damage: "1d10", type: "挥砍", properties: "重型，触及，双手" },
      "骑枪": { damage: "1d10", type: "穿刺", properties: "重型，触及，双手（骑乘期间除外）" },
      "长剑": { damage: "1d8", type: "挥砍", properties: "多用（1d10）" },
      "巨锤": { damage: "2d6", type: "钝击", properties: "重型，双手" },
      "钉头锤": { damage: "1d8", type: "穿刺", properties: "—" },
      "长矛": { damage: "1d10", type: "穿刺", properties: "重型，触及，双手" },
      "刺剑": { damage: "1d8", type: "穿刺", properties: "灵巧" },
      "弯刀": { damage: "1d6", type: "挥砍", properties: "灵巧，轻型" },
      "短剑": { damage: "1d6", type: "穿刺", properties: "灵巧，轻型" },
      "三叉戟": { damage: "1d8", type: "穿刺", properties: "投掷（射程 20/60），多用（1d10）" },
      "战镐": { damage: "1d8", type: "穿刺", properties: "多用（1d10）" },
      "战锤": { damage: "1d8", type: "钝击", properties: "多用（1d10）" },
      "鞭": { damage: "1d4", type: "挥砍", properties: "灵巧，触及" },
      "吹箭筒": { damage: "1", type: "穿刺", properties: "弹药（射程 25/100；吹矢），装填" },
      "手弩": { damage: "1d6", type: "穿刺", properties: "弹药（射程 30/120；弩矢），轻型，装填" },
      "重弩": { damage: "1d10", type: "穿刺", properties: "弹药（射程 100/400；弩矢），重型，装填，双手" },
      "长弓": { damage: "1d8", type: "穿刺", properties: "弹药（射程 150/600；箭矢），重型，双手" },
      "手铳": { damage: "1d12", type: "穿刺", properties: "弹药（射程 40/120；子弹），装填，双手" },
      "鸟铳": { damage: "1d10", type: "穿刺", properties: "弹药（射程 30/90；子弹），装填" },
      "自定义": { damage: "", type: "", properties: "" }
    };

    const weaponMastery = {
      "短棒": "缓速",
      "匕首": "迅击",
      "巨棒": "推离",
      "手斧": "侵扰",
      "标枪": "缓速",
      "轻锤": "迅击",
      "硬头锤": "削弱",
      "长棍": "失衡",
      "镰刀": "迅击",
      "矛": "削弱",
      "轻弩": "缓速",
      "飞镖": "侵扰",
      "短弓": "侵扰",
      "投石索": "缓速",
      "战斧": "失衡",
      "链枷": "削弱",
      "长柄刀": "擦掠",
      "巨斧": "横扫",
      "巨剑": "擦掠",
      "戟": "横扫",
      "骑枪": "失衡",
      "长剑": "削弱",
      "巨锤": "失衡",
      "钉头锤": "削弱",
      "长矛": "推离",
      "刺剑": "侵扰",
      "弯刀": "迅击",
      "短剑": "侵扰",
      "三叉戟": "失衡",
      "战镐": "削弱",
      "战锤": "推离",
      "鞭": "缓速",
      "吹箭筒": "侵扰",
      "手弩": "侵扰",
      "重弩": "推离",
      "长弓": "缓速",
      "手铳": "缓速",
      "鸟铳": "侵扰"
    };

    const weaponAbility = {
      "匕首": "敏捷", "轻弩": "敏捷", "飞镖": "敏捷", "短弓": "敏捷",
      "投石索": "敏捷", "刺剑": "敏捷", "弯刀": "敏捷", "短剑": "敏捷",
      "鞭": "敏捷", "吹箭筒": "敏捷", "手弩": "敏捷", "重弩": "敏捷",
      "长弓": "敏捷", "手铳": "敏捷", "鸟铳": "敏捷"
    };

    const abilityKeyMap = {
      "力量": "str", "敏捷": "dex", "体质": "con",
      "智力": "int", "感知": "wis", "魅力": "cha"
    };

    function formatDamageExpression(dice, abilityModifier, bonus) {
      if (!dice) return "";
      let expression = dice;
      if (abilityModifier !== 0) {
        expression += abilityModifier > 0 ? `+${abilityModifier}` : String(abilityModifier);
      }
      if (bonus !== 0) {
        expression += bonus > 0 ? `+${bonus}` : String(bonus);
      }
      return expression;
    }

    function getCurrentPB() {
      const { total } = getCombatTotalLevel();
      return Math.max(2, Math.floor((total - 1) / 4) + 2);
    }

    function updateWeaponRowDefaults(row, force = false) {
      const nameSelect = row.querySelector(".equipment-weapon-name-select");
      const abilitySelect = row.querySelector(".equipment-ability-select");
      const attackInput = row.querySelector(".equipment-attack-input");
      const damageInput = row.querySelector(".equipment-damage-input");
      const bonusInput = row.querySelector(".equipment-bonus-input");
      const data = weaponData[nameSelect.value];

      if (!data) {
        if (force) {
          attackInput.value = "";
          damageInput.value = "";
          attackInput.classList.remove("is-default");
          damageInput.classList.remove("is-default");
        }
        return;
      }

      const abilityKey = abilityKeyMap[abilitySelect.value] || "str";
      const abilityModifier = getModifierValue(abilityKey) ?? 0;
      const bonusRaw = bonusInput.value.trim();
      const bonus = bonusRaw === "" || !Number.isFinite(Number(bonusRaw)) ? 0 : Math.trunc(Number(bonusRaw));
      const attack = abilityModifier + getCurrentPB() + bonus;
      const damage = formatDamageExpression(data.damage, abilityModifier, bonus);

      if (force || attackInput.classList.contains("is-default") || attackInput.value.trim() === "") {
        attackInput.value = String(attack);
        attackInput.classList.add("is-default");
      }

      if (force || damageInput.classList.contains("is-default") || damageInput.value.trim() === "") {
        damageInput.value = damage;
        damageInput.classList.add("is-default");
      }
    }

    function updateWeaponDefaults() {
      for (const row of document.querySelectorAll(".equipment-weapon-table tbody tr")) {
        updateWeaponRowDefaults(row, false);
      }
    }

    function updateWeaponBonusState(input) {
      const cell = input.closest(".equipment-bonus-cell");
      if (cell) cell.classList.toggle("has-value", input.value.trim() !== "");
      alignPlusIndicators();
    }

    function syncWeaponCustomUI(row) {
      const select = row.querySelector(".equipment-weapon-name-select");
      const input = row.querySelector(".weapon-custom-name");
      const reset = row.querySelector(".weapon-custom-reset");
      if (!select || !input || !reset) return;

      const custom = select.value === "自定义";
      select.hidden = custom;
      input.hidden = !custom;
      reset.hidden = !custom;
    }

    function decorateWeaponNameControl(row) {
      const select = row.querySelector(".equipment-weapon-name-select");
      if (!select || select.parentElement.classList.contains("weapon-name-control")) return;

      const control = document.createElement("div");
      control.className = "weapon-name-control";
      select.replaceWith(control);

      const customName = document.createElement("input");
      customName.type = "text";
      customName.className = "weapon-custom-name";
      customName.placeholder = "填入武器名称...";
      customName.autocomplete = "off";
      customName.setAttribute("aria-label", "自定义武器名称");
      customName.hidden = true;

      const reset = document.createElement("button");
      reset.type = "button";
      reset.className = "custom-reset weapon-custom-reset";
      reset.textContent = "×";
      reset.title = "返回武器选择";
      reset.setAttribute("aria-label", "返回武器选择");
      reset.hidden = true;

      control.append(select, customName, reset);
      reset.addEventListener("click", () => {
        select.value = "";
        customName.value = "";
        syncWeaponCustomUI(row);
        applyWeaponDefaults(select);
        select.focus();
      });
      syncWeaponCustomUI(row);
    }

    function bindWeaponRow(row) {
      if (!row || row.dataset.weaponBound === "true") return;
      row.dataset.weaponBound = "true";
      decorateWeaponNameControl(row);

      const select = row.querySelector(".equipment-weapon-name-select");
      const propertyInput = row.querySelector(".equipment-property-input");
      const abilitySelect = row.querySelector(".equipment-ability-select");
      const bonusInput = row.querySelector(".equipment-bonus-input");
      const attackInput = row.querySelector(".equipment-attack-input");
      const damageInput = row.querySelector(".equipment-damage-input");

      select.addEventListener("change", () => {
        applyWeaponDefaults(select);
        if (select.value === "自定义") {
          row.querySelector(".weapon-custom-name")?.focus();
        }
      });
      propertyInput.addEventListener("input", () => {
        propertyInput.classList.remove("is-default");
      });
      abilitySelect.addEventListener("change", () => {
        abilitySelect.classList.remove("is-default");
        updateWeaponRowDefaults(row, false);
      });
      bonusInput.addEventListener("input", () => {
        updateWeaponBonusState(bonusInput);
        updateWeaponRowDefaults(row, false);
      });
      attackInput.addEventListener("input", () => {
        if (attackInput.value.trim() === "") updateWeaponRowDefaults(row, false);
        else attackInput.classList.remove("is-default");
      });
      damageInput.addEventListener("input", () => {
        if (damageInput.value.trim() === "") updateWeaponRowDefaults(row, false);
        else damageInput.classList.remove("is-default");
      });
    }

    function applyWeaponDefaults(select) {
      const row = select.closest("tr");
      if (!row) return;

      syncWeaponCustomUI(row);
      const data = weaponData[select.value];
      const propertyInput = row.querySelector(".equipment-property-input");
      const damageInput = row.querySelector(".equipment-damage-input");
      const typeSelect = row.querySelector(".equipment-damage-type-select");
      const masterySelect = row.querySelector(".equipment-mastery-select");
      const abilitySelect = row.querySelector(".equipment-ability-select");
      const attackInput = row.querySelector(".equipment-attack-input");
      const bonusInput = row.querySelector(".equipment-bonus-input");

      if (select.value === "自定义") {
        propertyInput.value = "";
        typeSelect.value = "";
        masterySelect.value = "";
        abilitySelect.value = "";
        abilitySelect.classList.remove("is-default");
        propertyInput.classList.remove("is-default");
        attackInput.value = "";
        damageInput.value = "";
        attackInput.classList.remove("is-default");
        damageInput.classList.remove("is-default");
        updateWeaponBonusState(bonusInput);
        return;
      }

      if (data) {
        propertyInput.value = data.properties;
        typeSelect.value = data.type;
        masterySelect.value = weaponMastery[select.value] || "";
        abilitySelect.value = weaponAbility[select.value] || "力量";
        abilitySelect.classList.add("is-default");
        propertyInput.classList.toggle("is-default", data.properties !== "");
        attackInput.value = "";
        damageInput.value = "";
        attackInput.classList.add("is-default");
        damageInput.classList.add("is-default");
        updateWeaponRowDefaults(row, true);
      } else {
        propertyInput.value = "";
        typeSelect.value = "";
        masterySelect.value = "";
        abilitySelect.value = "";
        abilitySelect.classList.remove("is-default");
        propertyInput.classList.remove("is-default");
        attackInput.value = "";
        damageInput.value = "";
        attackInput.classList.remove("is-default");
        damageInput.classList.remove("is-default");
      }

      updateWeaponBonusState(bonusInput);
    }

    function ensureEquipmentActionCell(row, deletable = false) {
      let cell = row.querySelector(".equipment-action-cell");
      if (!cell) {
        cell = document.createElement("td");
        cell.className = "equipment-action-cell";
        row.append(cell);
      }
      if (!deletable) return cell;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "equipment-row-delete";
      deleteButton.textContent = "×";
      deleteButton.title = "删除此行";
      deleteButton.setAttribute("aria-label", "删除此行");
      deleteButton.addEventListener("click", () => row.remove());
      cell.replaceChildren(deleteButton);
      return cell;
    }

    function setupEquipmentActionColumn(table) {
      const colgroup = table.querySelector("colgroup");
      if (colgroup && !colgroup.querySelector(".equipment-action-col")) {
        const col = document.createElement("col");
        col.className = "equipment-action-col";
        colgroup.append(col);
      }

      const headerRow = table.querySelector("thead tr:last-child");
      if (headerRow && !headerRow.querySelector(".equipment-action-head")) {
        const th = document.createElement("th");
        th.className = "equipment-action-head";
        th.setAttribute("aria-hidden", "true");
        headerRow.append(th);
      }

      for (const row of table.querySelectorAll("tbody tr")) {
        ensureEquipmentActionCell(row);
      }
    }

    function addEquipmentPlusButton(table, label, handler) {
      const scroll = table.closest(".equipment-scroll");
      if (!scroll || scroll.querySelector(".equipment-table-actions")) return;

      const bar = document.createElement("div");
      bar.className = "equipment-table-actions";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "equipment-add";
      button.textContent = "＋";
      button.title = label;
      button.setAttribute("aria-label", label);
      button.addEventListener("click", handler);
      bar.append(button);
      scroll.insertBefore(bar, table);
    }

    function createAddedWeaponRow() {
      const template = equipmentWeaponBody.querySelector("tr");
      const row = template.cloneNode(true);
      row.removeAttribute("data-weapon-bound");
      row.dataset.addedWeaponRow = "";

      for (const input of row.querySelectorAll("input")) {
        input.value = "";
        input.classList.remove("is-default");
      }
      for (const select of row.querySelectorAll("select")) {
        select.selectedIndex = 0;
        select.classList.remove("is-default");
      }

      const customName = row.querySelector(".weapon-custom-name");
      if (customName) customName.value = "";
      ensureEquipmentActionCell(row, true);
      bindWeaponRow(row);
      applyWeaponDefaults(row.querySelector(".equipment-weapon-name-select"));
      return row;
    }

    function createAddedMagicEquipmentRow() {
      const template = magicEquipmentBody.querySelector("tr");
      const row = template.cloneNode(true);
      row.dataset.addedMagicRow = "";

      for (const input of row.querySelectorAll("input")) {
        input.value = "";
        input.classList.remove("is-default");
      }
      for (const select of row.querySelectorAll("select")) {
        select.selectedIndex = 0;
      }

      ensureEquipmentActionCell(row, true);
      return row;
    }

    let plusMeasureCanvas = null;

    function positionPlusIndicator(plus, input) {
      if (!plus || !input) return;
      if (getComputedStyle(plus).display === "none" || input.value.trim() === "") return;

      if (!plusMeasureCanvas) plusMeasureCanvas = document.createElement("canvas");
      const context = plusMeasureCanvas.getContext("2d");
      const style = getComputedStyle(input);
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

      const textWidth = context.measureText(input.value.trim()).width;
      const inputRect = input.getBoundingClientRect();
      const parentRect = plus.parentElement.getBoundingClientRect();
      const plusWidth = plus.getBoundingClientRect().width || 6;
      const textCenter = inputRect.left + inputRect.width / 2;
      const left = textCenter - textWidth / 2 - plusWidth - 3 - parentRect.left;
      plus.style.left = `${Math.max(1, left)}px`;
    }

    function alignPlusIndicators() {
      const groups = [
        [".ability-input-wrap", ".ability-plus", "input"],
        [".skill-correction-cell", ".skill-correction-plus", "input"],
        [".combat-correction-cell", ".correction-plus", "input"],
        [".equipment-bonus-cell", ".equipment-bonus-plus", "input"],
        [".equipment-shield-ac-cell", ".equipment-shield-plus", "input"]
      ];

      for (const [parentSelector, plusSelector, inputSelector] of groups) {
        for (const parent of document.querySelectorAll(parentSelector)) {
          positionPlusIndicator(parent.querySelector(plusSelector), parent.querySelector(inputSelector));
        }
      }
    }

    function formatModifier(value) {
      return value >= 0 ? `+${value}` : String(value);
    }

    function formatAbilityResult(value) {
      if (value === null) return "—";
      return Math.abs(value) >= 100 ? "##" : String(value);
    }

    function formatAbilityModifier(value) {
      if (value === null) return "—";
      return Math.abs(value) >= 100 ? "##" : formatModifier(value);
    }

    function readAbilityNumber(input) {
      const raw = input.value.trim();
      if (raw === "") return null;
      const value = Number(raw);
      return Number.isFinite(value) ? Math.trunc(value) : null;
    }

    function syncAbilityInputState(input) {
      const wrap = input.closest(".ability-input-wrap");
      const raw = input.value.trim();
      const isDefault = input.classList.contains("is-default");
      const isInitial = input.id.endsWith("-initial");
      if (wrap) {
        wrap.classList.toggle("has-value", raw !== "" && !raw.startsWith("-") && !isDefault && !isInitial);
      }
    }

    function decorateAbilityInput(input) {
      if (input.parentElement && input.parentElement.classList.contains("ability-input-wrap")) return;

      const wrap = document.createElement("span");
      wrap.className = "ability-input-wrap";
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);

      const plus = document.createElement("span");
      plus.className = "ability-plus";
      plus.textContent = "+";
      plus.setAttribute("aria-hidden", "true");
      wrap.insertBefore(plus, input);
      syncAbilityInputState(input);
    }

    function updateSaveToggleUI() {
      const hasClass = Boolean(classSelect.value);

      for (const input of document.querySelectorAll(".save-prof-toggle")) {
        const key = input.dataset.ability;
        const active = saveState.has(key);
        input.checked = active;
        input.disabled = !hasClass;

        const cell = input.closest("th");
        if (cell) cell.classList.toggle("is-save-proficient", active);
      }

      for (const input of document.querySelectorAll(".custom-save-check")) {
        input.checked = saveState.has(input.dataset.ability);
        input.disabled = !hasClass;
      }
    }

    function applyClassSaveDefaults() {
      saveState.clear();

      if (classSelect.value === CUSTOM_VALUE) {
        updateSaveToggleUI();
        return;
      }

      const classSaves = saveMap[classSelect.value] || [];

      for (const row of abilityRows) {
        if (classSaves.includes(row.name)) saveState.add(row.key);
      }

      updateSaveToggleUI();
    }

    function activeSaveNames() {
      return abilityRows
        .filter((row) => saveState.has(row.key))
        .map((row) => row.name);
    }

    function isCustomMainClass() {
      return classSelect.value === CUSTOM_VALUE;
    }

    function isCustomMultiClass() {
      return multiClassSelect.value === CUSTOM_VALUE;
    }

    function currentMainClassName() {
      return isCustomMainClass()
        ? (customClassInput.value.trim() || "自定义职业")
        : classSelect.value;
    }

    function currentMainSubclass() {
      if (isCustomMainClass() || subclassSelect.value === CUSTOM_VALUE) {
        return customSubclassInput.value.trim();
      }
      return subclassSelect.value;
    }

    function syncSubclassCustomUI() {
      if (isCustomMainClass()) {
        subclassSelect.hidden = true;
        customSubclassInput.hidden = false;
        subclassReset.hidden = true;
        customSubclassInput.placeholder = "自定义子职";
        return;
      }

      const custom = subclassSelect.value === CUSTOM_VALUE;
      subclassSelect.hidden = custom;
      customSubclassInput.hidden = !custom;
      subclassReset.hidden = !custom;
    }

    function currentMultiClassName() {
      return isCustomMultiClass()
        ? (customMultiClassInput.value.trim() || "自定义职业")
        : multiClassSelect.value;
    }

    function currentMultiSubclass() {
      return isCustomMultiClass()
        ? customMultiSubclassInput.value.trim()
        : multiSubclassSelect.value;
    }

    function getCustomFormatRange(editor) {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return null;

      let range = selection.getRangeAt(0);
      if (!editor.contains(range.commonAncestorContainer)) return null;
      if (range.collapsed) return null;

      const startNode = range.startContainer;
      const startElement = startNode.nodeType === 1 ? startNode : startNode.parentElement;
      const formatted = startElement && startElement.closest(
        ".custom-title, .custom-term, .custom-spell, .custom-bold"
      );

      if (formatted && editor.contains(formatted)) {
        range = document.createRange();
        range.selectNode(formatted);
      }

      return range;
    }

    function stripCustomFormatting(fragment) {
      const inline = [...fragment.querySelectorAll(
        "span, font, b, strong, i, em, u, s, strike, mark, small, big, sub, sup, code"
      )];
      for (const element of inline) {
        if (!element.parentNode) continue;
        while (element.firstChild) element.parentNode.insertBefore(element.firstChild, element);
        element.remove();
      }

      for (const element of fragment.querySelectorAll("*")) {
        element.removeAttribute("style");
        element.removeAttribute("class");
        element.removeAttribute("bgcolor");
        element.removeAttribute("color");
        element.removeAttribute("face");
        element.removeAttribute("size");
        element.removeAttribute("width");
        element.removeAttribute("height");
        element.removeAttribute("align");
      }
    }

    function resetPlainElement(element) {
      if (!element || element.nodeType !== 1) return;
      element.removeAttribute("class");
      element.removeAttribute("style");
      element.removeAttribute("bgcolor");
      element.removeAttribute("color");
      element.removeAttribute("face");
      element.removeAttribute("size");
      element.removeAttribute("width");
      element.removeAttribute("height");
      element.removeAttribute("align");
      element.style.lineHeight = "inherit";
      element.style.padding = "0";
      element.style.margin = "0";
      element.style.background = "transparent";
      element.style.backgroundColor = "transparent";
      element.style.backgroundImage = "none";
    }

    function resetPlainAncestors(node, editor) {
      let current = node && (node.nodeType === 1 ? node : node.parentElement);
      while (current && current !== editor) {
        resetPlainElement(current);
        current = current.parentElement;
      }
    }

    function applyCustomSelection(editor, className) {
      const range = getCustomFormatRange(editor);
      if (!range) return;

      const fragment = range.extractContents();
      stripCustomFormatting(fragment);

      if (className) {
        const wrapper = document.createElement("span");
        wrapper.className = className;
        wrapper.appendChild(fragment);
        range.insertNode(wrapper);

        const selection = window.getSelection();
        const newRange = document.createRange();
        newRange.selectNodeContents(wrapper);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        for (const element of fragment.querySelectorAll("*")) {
          resetPlainElement(element);
        }
        range.insertNode(fragment);
        resetPlainAncestors(range.startContainer, editor);
      }

      editor.focus();
    }

    function applyCustomFormat(editor, kind) {
      if (kind === "list") {
        editor.focus();
        document.execCommand("insertUnorderedList", false, null);
        return;
      }

      if (kind === "plain") {
        applyCustomSelection(editor, "");
      } else if (kind === "bold") {
        applyCustomSelection(editor, "custom-bold");
      } else if (kind === "title") {
        applyCustomSelection(editor, "custom-title");
      } else if (kind === "term") {
        applyCustomSelection(editor, "custom-term");
      } else if (kind === "spell") {
        applyCustomSelection(editor, "custom-spell");
      }
    }

    const RICH_TABLE_TAGS = new Set([
      "TABLE", "THEAD", "TBODY", "TFOOT", "TR", "TH", "TD",
      "CAPTION", "COLGROUP", "COL"
    ]);
    const RICH_TABLE_ATTRIBUTES = new Set([
      "colspan", "rowspan", "border", "cellpadding", "cellspacing",
      "width", "height", "align", "valign", "bgcolor", "scope"
    ]);
    const RICH_STYLE_TAGS = new Set([...RICH_TABLE_TAGS, "SPAN", "FONT"]);
    const RICH_STYLE_PROPERTIES = new Set([
      "color", "background", "background-color",
      "border", "border-top", "border-right", "border-bottom", "border-left",
      "border-color", "border-style", "border-width",
      "border-top-color", "border-right-color", "border-bottom-color", "border-left-color",
      "border-top-style", "border-right-style", "border-bottom-style", "border-left-style",
      "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
      "border-collapse", "border-spacing",
      "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
      "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
      "text-align", "vertical-align", "font", "font-family", "font-size",
      "font-style", "font-weight", "line-height", "width", "height",
      "white-space", "table-layout", "text-decoration", "letter-spacing",
      "word-break", "overflow-wrap", "caption-side", "empty-cells", "box-sizing"
    ]);

    function sanitizeRichStyle(styleText) {
      if (!styleText) return "";
      const probe = document.createElement("span");
      probe.style.cssText = styleText;
      const kept = [];

      for (const property of probe.style) {
        if (!RICH_STYLE_PROPERTIES.has(property)) continue;
        let value = probe.style.getPropertyValue(property).trim();
        if (!value) continue;
        if (/url\s*\(|expression\s*\(|javascript:|@import|behavior\s*:|binding/i.test(value)) {
          continue;
        }
        value = value.replace(/\s*!important\s*$/i, "");
        kept.push(`${property}: ${value}`);
      }

      return kept.join("; ");
    }

    function copyRichTableAttributes(source, target) {
      for (const attribute of source.attributes) {
        const name = attribute.name.toLowerCase();
        if (name === "style") {
          const style = sanitizeRichStyle(attribute.value);
          if (style) target.setAttribute("style", style);
        } else if (RICH_TABLE_ATTRIBUTES.has(name)) {
          target.setAttribute(name, attribute.value);
        }
      }
    }

    function convertPastedNode(node, unwrapCurrent = false) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue
          .replace(/\r?\n/g, " ")
          .replace(/\s+/g, " ");
        if (!text.trim()) return null;
        return document.createTextNode(text);
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return null;

      const tag = node.tagName.toUpperCase();
      const skipTags = new Set([
        "SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "IFRAME", "OBJECT",
        "EMBED", "IMG", "SVG", "MATH", "VIDEO", "AUDIO", "SOURCE",
        "TRACK", "CANVAS", "HEAD", "TITLE", "META", "LINK"
      ]);

      if (skipTags.has(tag)) return null;
      if (tag === "BR") return document.createElement("br");

      if (RICH_TABLE_TAGS.has(tag)) {
        const tableElement = document.createElement(tag.toLowerCase());
        copyRichTableAttributes(node, tableElement);
        appendConvertedChildren(tableElement, node);
        return tableElement;
      }

      if (tag === "FONT") {
        const span = document.createElement("span");
        const styles = [];
        const color = (node.getAttribute("color") || "").trim();
        const face = (node.getAttribute("face") || "").trim();
        if (color) styles.push(`color: ${color}`);
        if (face) styles.push(`font-family: ${face}`);
        const extraStyle = sanitizeRichStyle(node.getAttribute("style"));
        if (extraStyle) styles.push(extraStyle);
        if (styles.length) span.setAttribute("style", styles.join("; "));
        appendConvertedChildren(span, node);
        return span.childNodes.length ? span : null;
      }

      if (tag === "SPAN" && !unwrapCurrent) {
        const style = sanitizeRichStyle(node.getAttribute("style"));
        if (style) {
          const span = document.createElement("span");
          span.setAttribute("style", style);
          appendConvertedChildren(span, node);
          return span.childNodes.length ? span : null;
        }
      }

      if (/^H[1-6]$/.test(tag)) {
        const title = document.createElement("span");
        title.className = "custom-title";
        appendConvertedChildren(title, node);
        const heading = document.createDocumentFragment();
        if (title.childNodes.length) heading.append(title);
        heading.append(document.createElement("br"));
        return heading;
      }

      if (tag === "UL" || tag === "OL") {
        const list = document.createElement(tag.toLowerCase());
        appendConvertedChildren(list, node);
        return list;
      }

      if (["P", "DIV", "SECTION", "ARTICLE", "BLOCKQUOTE", "LI", "PRE"].includes(tag)) {
        const block = document.createDocumentFragment();
        if (tag === "LI") block.append(document.createTextNode("• "));
        appendConvertedChildren(block, node);
        while (block.lastChild && block.lastChild.nodeName === "BR") {
          block.removeChild(block.lastChild);
        }
        if (block.childNodes.length) block.append(document.createElement("br"));
        return block.childNodes.length ? block : null;
      }

      const classes = (node.getAttribute("class") || "")
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      if (!unwrapCurrent) {
        const isItalic = tag === "I" || tag === "EM";
        const comboInner = isItalic
          ? [...node.children].find((child) => child.tagName === "U")
          : tag === "U"
            ? [...node.children].find((child) =>
                child.tagName === "I" || child.tagName === "EM")
            : null;

        if (comboInner) {
          const spell = document.createElement("span");
          spell.className = "custom-spell";
          for (const child of node.childNodes) {
            appendConvertedNode(spell, child, child === comboInner);
          }
          return spell.childNodes.length ? spell : null;
        }

        if ((tag === "B" || tag === "STRONG") && classes.includes("green")) {
          const term = document.createElement("span");
          term.className = "custom-term";
          appendConvertedChildren(term, node);
          return term.childNodes.length ? term : null;
        }

        if ((tag === "B" || tag === "STRONG") && classes.includes("spell")) {
          const spell = document.createElement("span");
          spell.className = "custom-spell";
          appendConvertedChildren(spell, node);
          return spell.childNodes.length ? spell : null;
        }

        if (tag === "U") {
          const term = document.createElement("span");
          term.className = "custom-term";
          appendConvertedChildren(term, node);
          return term.childNodes.length ? term : null;
        }

        if (tag === "B" || tag === "STRONG") {
          const bold = document.createElement("span");
          bold.className = "custom-bold";
          appendConvertedChildren(bold, node);
          return bold.childNodes.length ? bold : null;
        }
      }

      const fragment = document.createDocumentFragment();
      appendConvertedChildren(fragment, node);
      return fragment.childNodes.length ? fragment : null;
    }

    function appendConvertedNode(parent, node, unwrapCurrent = false) {
      const converted = convertPastedNode(node, unwrapCurrent);
      if (!converted) return;
      if (converted.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        parent.append(converted);
      } else {
        parent.append(converted);
      }
    }

    function appendConvertedChildren(parent, node) {
      for (const child of node.childNodes) {
        appendConvertedNode(parent, child);
      }
    }

    function convertPastedHtml(html) {
      const template = document.createElement("template");
      template.innerHTML = html;
      const fragment = document.createDocumentFragment();
      appendConvertedChildren(fragment, template.content);
      return fragment;
    }

    function insertPastedFragment(editor, fragment) {
      if (!fragment || !fragment.firstChild) return;

      const selection = window.getSelection();
      let range;

      if (selection && selection.rangeCount &&
          editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
        range = selection.getRangeAt(0);
      } else {
        range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
      }

      range.deleteContents();
      const lastNode = fragment.lastChild;
      range.insertNode(fragment);

      if (lastNode && selection) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      editor.focus();
    }

    const CLASS_FEATURE_EDITOR_IDS = new Set([
      "main-class-feature-text",
      "main-subclass-feature-text",
      "multi-class-feature-text",
      "multi-subclass-feature-text"
    ]);

    function convertClassFeatureHtml(rawHtml) {
      const fragment = convertPastedHtml(rawHtml);
      const container = document.createElement("div");
      container.append(fragment);

      for (const bold of [...container.querySelectorAll(".custom-bold")]) {
        const replacement = document.createElement("b");
        while (bold.firstChild) replacement.append(bold.firstChild);
        bold.replaceWith(replacement);
      }
      return container.innerHTML;
    }

    function normalizeClassFeatureDescriptionHtml(rawHtml) {
      const container = document.createElement("div");
      container.innerHTML = rawHtml;

      const isBlank = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return !node.nodeValue.replace(/\u00a0/g, "").trim();
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return true;
        if (node.nodeName === "BR") return true;
        if (["P", "DIV", "SECTION"].includes(node.nodeName)) {
          return !node.textContent.replace(/\u00a0/g, "").trim() &&
            !node.querySelector("table, ul, ol, img");
        }
        return false;
      };

      while (container.firstChild && isBlank(container.firstChild)) {
        container.firstChild.remove();
      }
      while (container.lastChild && isBlank(container.lastChild)) {
        container.lastChild.remove();
      }

      for (const list of container.querySelectorAll("ul, ol")) {
        let previous = list.previousSibling;
        while (previous && previous.nodeType === Node.TEXT_NODE &&
          !previous.nodeValue.replace(/\u00a0/g, "").trim()) {
          previous = previous.previousSibling;
        }
        if (!previous) continue;
        if (previous.nodeName === "BR") previous.remove();
        list.before(document.createElement("br"));
      }

      for (const list of [...container.querySelectorAll("ul, ol")]) {
        const fragment = document.createDocumentFragment();
        while (list.firstChild) fragment.append(list.firstChild);
        list.replaceWith(fragment);
      }

      return container.innerHTML;
    }

    function fragmentHtml(fragment) {
      const container = document.createElement("div");
      container.append(fragment);
      return container.innerHTML;
    }

    function extractClassFeatureHeading(node) {
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return null;
      if (!/^(P|DIV|H[1-6])$/.test(node.tagName)) return null;
      const text = (node.textContent || "").replace(/\s+/g, " ").trim();
      if (!/^\d+\s*级\s*[:：]/.test(text)) return null;

      let nameHtml = "";
      let descHtml = "";
      let firstBreak = null;
      for (const candidate of node.querySelectorAll("br")) {
        const probe = document.createRange();
        probe.selectNodeContents(node);
        probe.setEndBefore(candidate);
        if (/\d+\s*级\s*[:：]/.test(probe.toString())) {
          firstBreak = candidate;
          break;
        }
      }
      if (firstBreak) {
        const range = document.createRange();
        range.selectNodeContents(node);
        range.setEndBefore(firstBreak);
        nameHtml = fragmentHtml(range.cloneContents());
        range.setStartAfter(firstBreak);
        range.setEnd(node, node.childNodes.length);
        descHtml = fragmentHtml(range.cloneContents());
      } else {
        nameHtml = node.innerHTML;
      }

      const nameContainer = document.createElement("div");
      nameContainer.innerHTML = nameHtml;
      while (nameContainer.firstChild &&
        (nameContainer.firstChild.nodeName === "BR" ||
          (nameContainer.firstChild.nodeType === Node.TEXT_NODE &&
            !nameContainer.firstChild.nodeValue.replace(/\u00a0/g, "").trim()))) {
        nameContainer.firstChild.remove();
      }
      while (nameContainer.lastChild &&
        (nameContainer.lastChild.nodeName === "BR" ||
          (nameContainer.lastChild.nodeType === Node.TEXT_NODE &&
            !nameContainer.lastChild.nodeValue.replace(/\u00a0/g, "").trim()))) {
        nameContainer.lastChild.remove();
      }
      nameHtml = nameContainer.innerHTML;
      return { nameHtml, descHtml };
    }

    function escapePlainText(text) {
      const span = document.createElement("span");
      span.textContent = text;
      return span.innerHTML;
    }

    function splitPlainTableLine(line) {
      const trimmed = line.trim();
      if (!trimmed) return [];
      if (trimmed.includes("\t")) {
        return trimmed.split(/\t+/).map((cell) => cell.trim()).filter(Boolean);
      }
      const wide = trimmed.split(/\s{2,}/).map((cell) => cell.trim()).filter(Boolean);
      if (wide.length >= 2) return wide;

      const spaced = trimmed.split(/\s+/).filter(Boolean);
      const numeric = spaced.filter((cell) => /^[—\-–0-9]+$/.test(cell));
      const looksLikeHeader = /(等级|法术|一环|二环|三环|四环|五环|六环|七环|八环|九环|法术位)/.test(trimmed);
      if (spaced.length >= 3 && (numeric.length >= 2 || looksLikeHeader)) return spaced;
      return [trimmed];
    }

    function isPlainTableDataLine(line) {
      const cells = splitPlainTableLine(line);
      if (!cells.length) return false;
      if (cells.length === 1) return /^\d+$/.test(cells[0]);
      return cells.filter((cell) => /^[—\-–0-9]+$/.test(cell)).length >= 2;
    }

    function isPlainTableStart(line) {
      if (/[。！？；]\s*$/.test(line)) return false;
      const keywordCount = (
        line.match(/等级|法术位|法术|一环|二环|三环|四环|五环|六环|七环|八环|九环/g) || []
      ).length;
      return /——/.test(line) ||
        keywordCount >= 2 ||
        /魔契师等级|战士等级/.test(line);
    }

    function plainTextTableBlock(lines, start) {
      let end = start;
      while (end < lines.length && lines[end].trim()) {
        if (end > start && /^\s*\d+\s*级\s*[:：]/.test(lines[end])) break;
        end += 1;
      }
      const segment = lines.slice(start, end);
      if (segment.filter(isPlainTableDataLine).length < 2) return null;

      const headerLine = segment[0].trim();
      const levelRows = segment.filter((line) => /^\d+$/.test(line.trim()));
      const levelHeader = headerLine.match(/^(.*?)(魔契师等级|战士等级|等级)(?:\s|$)/);
      if (levelHeader && levelRows.length >= 2) {
        const prefix = levelHeader[1].trim();
        const rows = [[levelHeader[2], "法术"]];
        let current = null;
        for (let index = 1; index < segment.length; index += 1) {
          const line = segment[index].trim();
          if (!line) continue;
          if (/^\d+$/.test(line)) {
            current = [line, ""];
            rows.push(current);
          } else if (line === "法术" && rows.length === 1) {
            continue;
          } else if (current) {
            current[1] = current[1] ? `${current[1]} ${line}` : line;
          }
        }
        if (rows.length >= 3) return { end, rows, preText: prefix };
      }

      const rows = [];
      for (let index = 0; index < segment.length; index += 1) {
        const line = segment[index].trim();
        if (!line) continue;
        let cells = splitPlainTableLine(line);
        if (cells.length === 1 && /^\d+$/.test(cells[0])) {
          const next = segment[index + 1]?.trim() || "";
          if (next && !isPlainTableDataLine(next) && !/^\s*\d+\s*级\s*[:：]/.test(next)) {
            cells = [cells[0], next];
            index += 1;
          }
        }
        rows.push(cells);
      }
      if (rows.length < 3) return null;
      const maxColumns = Math.max(...rows.map((row) => row.length));
      return { end, rows: rows.map((row) => [...row, ...Array(maxColumns - row.length).fill("")]) };
    }

    function plainTextToFeatureHtml(lines) {
      const chunks = [];
      let index = 0;
      let textLines = [];

      const flushText = () => {
        if (!textLines.length) return;
        const text = textLines.join("\n").replace(/^\n+|\n+$/g, "");
        if (text) chunks.push(escapePlainText(text).replace(/\n/g, "<br>"));
        textLines = [];
      };

      while (index < lines.length) {
        const line = lines[index];
        const table = isPlainTableStart(line) ? plainTextTableBlock(lines, index) : null;
        if (table) {
          if (table.preText) textLines.push(table.preText);
          flushText();
          const tableElement = document.createElement("table");
          const tbody = document.createElement("tbody");
          const maxColumns = Math.max(...table.rows.map((row) => row.length));
          if (maxColumns > 2) tableElement.className = "feature-auto-table-wide";
          table.rows.forEach((row, rowIndex) => {
            const tr = document.createElement("tr");
            row.forEach((cell) => {
              const cellElement = document.createElement(rowIndex === 0 ? "th" : "td");
              cellElement.textContent = cell;
              tr.append(cellElement);
            });
            tbody.append(tr);
          });
          tableElement.append(tbody);
          chunks.push(tableElement.outerHTML);
          index = table.end;
          continue;
        }
        textLines.push(line);
        index += 1;
      }
      flushText();
      return chunks.join("");
    }

    function parseClassFeaturePlainText(text) {
      const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
      const features = [];
      let current = null;

      for (const line of lines) {
        const trimmed = line.trim();
        if (/^\d+\s*级\s*[:：]/.test(trimmed)) {
          current = { name: trimmed, descLines: [] };
          features.push(current);
          continue;
        }
        if (!current) continue;
        current.descLines.push(line);
      }

      return features
        .map((feature) => {
          const descLines = feature.descLines.slice();
          while (descLines.length && !descLines[0].trim()) descLines.shift();
          while (descLines.length && !descLines[descLines.length - 1].trim()) descLines.pop();
          return {
            nameHtml: escapePlainText(feature.name),
            descHtml: plainTextToFeatureHtml(descLines),
            titleMaroon: true
          };
        })
        .filter((feature) => feature.nameHtml || feature.descHtml);
    }

    function classFeatureHeadingHasColor(heading) {
      const candidates = [heading, ...heading.querySelectorAll("[style]")];
      if (candidates.some((element) => (
        /(?:^|;)\s*color\s*:/i.test(element.getAttribute("style") || "")
      ))) {
        return true;
      }
      return Boolean(heading.querySelector("font[color]"));
    }

    function parseClassFeatureHeadingNodes(doc, headings) {
      return headings.map((heading, index) => {
        const headingData = extractClassFeatureHeading(heading);
        const content = document.createElement("div");
        if (headingData?.descHtml) content.innerHTML = headingData.descHtml;
        const range = doc.createRange();
        range.setStartAfter(heading);
        if (headings[index + 1]) {
          range.setEndBefore(headings[index + 1]);
        } else {
          range.setEnd(doc.body, doc.body.childNodes.length);
        }
        content.append(range.cloneContents());
        const headingLevel = Number(heading.tagName.replace(/\D/g, ""));
        return {
          nameHtml: sanitizeBuilderHtml(
            convertClassFeatureHtml(headingData?.nameHtml || heading.innerHTML)
          ),
          descHtml: sanitizeBuilderHtml(normalizeClassFeatureDescriptionHtml(
            convertClassFeatureHtml(content.innerHTML)
          )),
          titleMaroon: headingLevel >= 5 && !classFeatureHeadingHasColor(heading)
        };
      }).filter((feature) => feature.nameHtml || feature.descHtml);
    }

    function parseClassFeaturePaste(html) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const headingNodes = [...doc.body.querySelectorAll("h1, h2, h3, h4, h5, h6")]
        .filter((heading) => /^\d+\s*级\s*[:：]/.test(
          (heading.textContent || "").replace(/\s+/g, " ").trim()
        ));
      if (headingNodes.length) {
        return parseClassFeatureHeadingNodes(doc, headingNodes);
      }

      const features = [];
      let current = null;

      for (const node of doc.body.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && !node.nodeValue.trim()) continue;
        const heading = extractClassFeatureHeading(node);
        if (heading) {
          current = {
            nameHtml: convertClassFeatureHtml(heading.nameHtml),
            descParts: heading.descHtml ? [heading.descHtml] : []
          };
          features.push(current);
          continue;
        }
        if (!current) continue;
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (!node.textContent.trim() && !node.querySelector("table")) continue;
          current.descParts.push(node.outerHTML);
        }
      }

      return features
        .map((feature) => ({
          nameHtml: sanitizeBuilderHtml(feature.nameHtml),
          descHtml: sanitizeBuilderHtml(normalizeClassFeatureDescriptionHtml(
            convertClassFeatureHtml(feature.descParts.join(""))
          ))
        }))
        .filter((feature) => feature.nameHtml || feature.descHtml);
    }

    function htmlContentToPlainText(html) {
      const documentNode = new DOMParser().parseFromString(html || "", "text/html");
      const clone = documentNode.body.cloneNode(true);
      for (const br of clone.querySelectorAll("br")) br.replaceWith("\n");
      for (const block of clone.querySelectorAll(
        "div, p, li, tr, h1, h2, h3, h4, h5, h6, blockquote, section"
      )) {
        block.append(documentNode.createTextNode("\n"));
      }
      return normalizeSpellbookText(clone.textContent || "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    function normalizeSpellbookText(text) {
      return String(text || "")
        .replace(/\u00a0/g, " ")
        .replace(/\u200b/g, "")
        .replace(/\r\n?/g, "\n");
    }

    function isSpellbookTitleLine(line) {
      const text = normalizeSpellbookText(line).trim();
      if (!text || text.length > 120) return false;
      const parts = text.split(/[丨|｜]/);
      if (parts.length < 2) return false;
      const left = parts.shift().trim();
      const right = parts.join("丨").trim();
      return Boolean(left) && /[A-Za-z]/.test(right);
    }

    function splitCombinedSpellTitle(line) {
      const text = normalizeSpellbookText(line).trim();
      if (!/[丨|｜]/.test(text)) return null;
      const pipeIndex = text.search(/[丨|｜]/);
      for (let index = pipeIndex + 1; index < text.length; index += 1) {
        const levelLine = text.slice(index).trim();
        const levelData = parseSpellbookLevelLine(levelLine);
        if (!levelData || /[A-Za-z]/.test(levelData.school)) continue;
        const title = text.slice(0, index).trim();
        if (isSpellbookTitleLine(title)) return { title, levelLine };
      }
      return null;
    }

    function normalizeSpellLevelText(level) {
      const text = normalizeSpellbookText(level).replace(/\s+/g, "").trim();
      if (!text || text === "戏法") return text;
      const chinese = text.match(/^([一二三四五六七八九])环$/);
      if (chinese) {
        const values = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
        return `${values[chinese[1]]}环`;
      }
      const arabic = text.match(/^(\d+)环$/);
      if (arabic) return `${Number(arabic[1])}环`;
      return text;
    }

    function normalizeSpellbookPrepared(value) {
      const text = String(value || "").trim();
      if (text === "gift" || text === "赠礼") return "gift";
      if (text === "prepared" || text === "O" || text === "已准备") return "prepared";
      return "none";
    }

    function normalizeSpellCastingTime(value) {
      return String(value || "")
        .replace(/^\s*1\s*(?=(?:附赠动作|动作|反应))/, "")
        .trim();
    }

    function parseSpellbookLevelLine(line) {
      const text = normalizeSpellbookText(line).trim();
      const levelPattern = "戏法|[一二三四五六七八九]环|\\d+\\s*环";
      let match = text.match(
        new RegExp(`^(${levelPattern})\\s+([^（(]*?)(?:\\s*[（(](.*?)[）)])?$`)
      );
      if (match) {
        return {
          level: normalizeSpellLevelText(match[1]),
          school: (match[2] || "").trim(),
          classes: (match[3] || "").trim()
        };
      }
      match = text.match(
        new RegExp(`^([^\\s（(]+)\\s+(${levelPattern})(?:\\s*[（(](.*?)[）)])?$`)
      );
      if (match) {
        return {
          level: normalizeSpellLevelText(match[2]),
          school: (match[1] || "").trim(),
          classes: (match[3] || "").trim()
        };
      }
      return null;
    }

    function createSpellbookRecord(title) {
      return {
        level: "",
        name: normalizeSpellbookText(title).trim(),
        school: "",
        castingTime: "",
        range: "",
        components: "",
        duration: "",
        source: "",
        classes: "",
        description: ""
      };
    }

    function applySpellbookLines(record, lines) {
      const descriptionLines = [];
      for (const rawLine of lines) {
        const line = normalizeSpellbookText(rawLine).trim();
        if (!line) {
          if (descriptionLines.length) descriptionLines.push("");
          continue;
        }

        if (!record.level && !record.school) {
          const levelData = parseSpellbookLevelLine(line);
          if (levelData) {
            record.level = levelData.level;
            record.school = levelData.school;
            record.classes = levelData.classes || record.classes;
            continue;
          }
        }

        const meta = line.match(
          /^(施法时间|施法距离|射程|法术成分|成分|持续时间|出处|来源|环阶|学派|职业)\s*[:：]\s*(.*)$/
        );
        if (meta) {
          const value = meta[2].trim();
          switch (meta[1]) {
            case "施法时间": {
              const split = value.match(/^([^，,]+?)[，,]\s*(.+)$/);
              if (split && /(动作|反应|附赠|分钟|小时|轮)/.test(split[1])) {
                record.castingTime = normalizeSpellCastingTime(split[1]);
                descriptionLines.push(split[2].trim());
              } else {
                record.castingTime = normalizeSpellCastingTime(value);
              }
              break;
            }
            case "施法距离":
            case "射程":
              record.range = value;
              break;
            case "法术成分":
            case "成分":
              record.components = value;
              break;
            case "持续时间":
              record.duration = value;
              break;
            case "出处":
            case "来源":
              record.source = value;
              break;
            case "环阶":
              record.level = normalizeSpellLevelText(value);
              break;
            case "学派":
              record.school = value;
              break;
            case "职业":
              record.classes = value;
              break;
            default:
              break;
          }
          continue;
        }

        descriptionLines.push(line);
      }

      record.description = descriptionLines.join("\n").replace(/^\n+|\n+$/g, "");
      record.descriptionHtml = escapePlainText(record.description).replace(/\n/g, "<br>");
      return record;
    }

    function spellbookNodeLines(node) {
      if (!node) return [];
      if (node.nodeType === Node.TEXT_NODE) {
        return normalizeSpellbookText(node.nodeValue).split("\n");
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return [];
      const clone = node.cloneNode(true);
      const lineBreakMarker = "\u0001";
      for (const br of clone.querySelectorAll("br")) {
        br.replaceWith(document.createTextNode(lineBreakMarker));
      }
      const text = normalizeSpellbookText(clone.textContent || "")
        .replace(/\n/g, " ")
        .replace(/[ \t]+/g, " ")
        .trim();
      return text.split(lineBreakMarker).map((line) => line.trim());
    }

    function parseSpellbookPlainText(text) {
      const lines = normalizeSpellbookText(text).split("\n");
      const records = [];
      let current = null;
      for (const line of lines) {
        const combined = splitCombinedSpellTitle(line);
        if (combined) {
          current = createSpellbookRecord(combined.title);
          current._lines = [combined.levelLine];
          records.push(current);
          continue;
        }
        if (isSpellbookTitleLine(line)) {
          current = createSpellbookRecord(line);
          records.push(current);
          continue;
        }
        if (current) current._lines = (current._lines || []).concat(line);
      }
      return records.map((record) => {
        applySpellbookLines(record, record._lines || []);
        delete record._lines;
        return record;
      }).filter((record) => record.name || record.description);
    }

    function getSpellbookTitleNodes(documentNode) {
      const nodes = [];
      for (const node of documentNode.body.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, .quickref-preview-title, strong"
      )) {
        const text = normalizeSpellbookText(node.textContent).trim();
        if (!text) continue;
        const isHeading = /^H[1-6]$/.test(node.tagName);
        const isQuickrefTitle = node.classList.contains("quickref-preview-title");
        if (!isHeading && !isQuickrefTitle && !isSpellbookTitleLine(text)) continue;
        if (nodes.some((existing) => existing === node)) continue;
        nodes.push(node);
      }
      nodes.sort((a, b) => {
        const position = a.compareDocumentPosition(b);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });
      return nodes;
    }

    function parseSpellbookHtml(html) {
      const documentNode = new DOMParser().parseFromString(html, "text/html");
      const titles = getSpellbookTitleNodes(documentNode);
      const records = [];

      for (let index = 0; index < titles.length; index += 1) {
        const titleNode = titles[index];
        let title = normalizeSpellbookText(titleNode.textContent).trim();
        if (!title) continue;
        const combined = splitCombinedSpellTitle(title);
        const extraLines = [];
        if (combined) {
          title = combined.title;
          extraLines.push(combined.levelLine);
        }
        const record = createSpellbookRecord(title);
        const content = document.createElement("div");
        const range = documentNode.createRange();
        range.setStartAfter(titleNode);
        if (titles[index + 1]) {
          range.setEndBefore(titles[index + 1]);
        } else {
          range.setEnd(documentNode.body, documentNode.body.childNodes.length);
        }
        content.append(range.cloneContents());
        applySpellbookLines(record, extraLines.concat(spellbookNodeLines(content)));
        records.push(record);
      }

      if (records.length) return records;
      const fallback = spellbookNodeLines(documentNode.body).join("\n");
      return parseSpellbookPlainText(fallback);
    }

    function parseSpellbookPaste(html, text) {
      if (html && html.trim()) {
        const documentNode = new DOMParser().parseFromString(html, "text/html");
        if (getSpellbookTitleNodes(documentNode).length) {
          const parsed = parseSpellbookHtml(html);
          if (parsed.length) return parsed;
        }
      }
      const plain = parseSpellbookPlainText(text || "");
      if (plain.length) return plain;
      if (html && html.trim()) return parseSpellbookHtml(html);
      return [];
    }

    function getSpellbookTableStack() {
      return document.getElementById("spellbook-table-stack");
    }

    function makeSpellbookTable() {
      const table = document.createElement("table");
      table.className = "spellbook-table";
      table.innerHTML = `
        <colgroup>
          <col class="spellbook-col-handle">
          <col class="spellbook-col-prepared">
          <col class="spellbook-col-level">
          <col class="spellbook-col-name">
          <col class="spellbook-col-school">
          <col class="spellbook-col-time">
          <col class="spellbook-col-range">
          <col class="spellbook-col-components">
          <col class="spellbook-col-duration">
          <col class="spellbook-col-actions">
        </colgroup>
        <thead>
          <tr>
            <th></th><th>准备</th><th>环阶</th><th>法术</th><th>学派</th><th>施法时间</th>
            <th>施法距离</th><th>成分</th><th>持续时间</th><th></th>
          </tr>
        </thead>
        <tbody></tbody>`;
      return table;
    }

    function setSpellbookRowExpanded(nameRow, expanded) {
      const detailRow = nameRow.nextElementSibling || nameRow._spellbookDetail;
      if (!detailRow) return;
      nameRow.classList.toggle("is-expanded", expanded);
      detailRow.classList.toggle("is-expanded", expanded);
      const toggle = nameRow.querySelector(".spellbook-row-toggle");
      if (toggle) {
        toggle.textContent = expanded ? "▾" : "▸";
        toggle.title = expanded ? "收起法术详述" : "展开法术详述";
        toggle.setAttribute("aria-expanded", String(expanded));
      }
    }

    function updateSpellbookRowState(row) {
      if (!row) return;
      const level = row.querySelector('[data-field="level"]')?.textContent.trim() || "";
      const prepared = normalizeSpellbookPrepared(
        row.querySelector(".spellbook-prepared-select")?.value
      );
      row.classList.toggle("is-cantrip", level === "戏法");
      row.classList.toggle("is-leveled", level !== "戏法");
      row.classList.toggle("is-unprepared", prepared === "none");
    }

    function spellbookPreparedName(row) {
      let name = row.querySelector('[data-field="name"]')?.textContent.trim() || "";
      name = name.split(/[丨|｜]/)[0].trim();
      name = name.replace(/[（(][A-Za-z][^）)]*[）)]/g, " ").trim();
      name = name.replace(/[\s\-—–:：]+[A-Za-z][A-Za-z0-9'’.,!?()\- ]*$/, "").trim();
      if (!name || !/[\u3400-\u9fff]/.test(name)) return "";
      return name;
    }

    function updatePreparedSpellDefaults() {
      const stack = getSpellbookTableStack();
      if (!stack) return;
      const groups = Array.from({ length: 10 }, () => ({ prepared: [], gift: [] }));
      const seen = Array.from({ length: 10 }, () => new Set());
      for (const row of stack.querySelectorAll(".spellbook-row")) {
        const prepared = normalizeSpellbookPrepared(
          row.querySelector(".spellbook-prepared-select")?.value
        );
        if (prepared === "none") continue;
        const levelText = normalizeSpellLevelText(
          row.querySelector('[data-field="level"]')?.textContent.trim() || ""
        );
        const level = levelText === "戏法"
          ? 0
          : Number((levelText.match(/^(\d+)环$/) || [])[1]);
        if (!Number.isInteger(level) || level < 0 || level > 9) continue;
        const name = spellbookPreparedName(row);
        if (!name || seen[level].has(name)) continue;
        seen[level].add(name);
        groups[level][prepared === "gift" ? "gift" : "prepared"].push(name);
      }

      for (let level = 0; level <= 9; level += 1) {
        const input = document.getElementById(`spell-list-${level}`);
        if (!input) continue;
        const prepared = groups[level].prepared;
        const gift = groups[level].gift;
        const chunks = [];
        if (prepared.length) chunks.push(prepared.join("，"));
        if (gift.length) chunks.push(gift.join("，"));
        const autoValue = chunks.join("；");
        const previousAuto = input.dataset.autoPreparedValue || "";
        const canRefresh = !input.dataset.manualPrepared &&
          (input.classList.contains("is-default") ||
            !input.value.trim() ||
            input.value === previousAuto);
        if (!canRefresh) continue;
        input.value = autoValue;
        input.dataset.autoPreparedValue = autoValue;
        input.classList.toggle("is-default", Boolean(autoValue));
      }
    }

    function updateSpellbookEmptyState() {
      const stack = getSpellbookTableStack();
      const empty = document.getElementById("spellbook-empty");
      if (!stack || !empty) return;
      const rows = [...stack.querySelectorAll(".spellbook-row")];
      empty.hidden = rows.length > 0;
      rows.forEach(updateSpellbookRowState);
      const isCantrip = (row) =>
        row.querySelector('[data-field="level"]')?.textContent.trim() === "戏法";
      const preparedState = (row) => normalizeSpellbookPrepared(
        row.querySelector(".spellbook-prepared-select")?.value
      );
      const isPrepared = (row) => {
        const value = preparedState(row);
        return value === "prepared" || value === "gift";
      };
      const cantrips = rows.filter(isCantrip);
      const leveled = rows.filter((row) => !isCantrip(row));
      const preparedLeveled = leveled.filter(isPrepared).length;
      const giftLeveled = leveled.filter((row) => preparedState(row) === "gift").length;
      const preparedCantrips = cantrips.filter(isPrepared).length;
      const summary = document.getElementById("spellbook-summary");
      if (summary) {
        summary.textContent = `法术书内现有 ${leveled.length} 道环阶法术，已准备 ${preparedLeveled} 道环阶法术，其中 ${giftLeveled} 道来自赠礼。法术书中还有 ${cantrips.length} 道戏法，其中 ${preparedCantrips} 道已被习得。`;
      }
      updatePreparedSpellDefaults();
    }

    let spellbookDragState = null;

    function beginSpellbookDrag(event, handle) {
      if (event.button !== undefined && event.button !== 0) return;
      const row = handle.closest(".spellbook-row");
      const detailRow = row?._spellbookDetail || row?.nextElementSibling;
      if (!row || !detailRow) return;

      event.preventDefault();
      spellbookDragState = { row, detailRow, lastTarget: null };
      row.classList.add("is-dragging");
      try {
        handle.setPointerCapture(event.pointerId);
      } catch (error) {}

      const clearTarget = () => {
        spellbookDragState?.lastTarget?.classList.remove("is-drop-target");
        if (spellbookDragState) spellbookDragState.lastTarget = null;
      };

      const onMove = (moveEvent) => {
        const state = spellbookDragState;
        if (!state) return;
        const point = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
        const targetRow = point?.closest(".spellbook-row") ||
          point?.closest(".spellbook-details-row")?.previousElementSibling;
        if (!targetRow || targetRow === state.row) return;
        if (state.lastTarget && state.lastTarget !== targetRow) {
          state.lastTarget.classList.remove("is-drop-target");
        }
        state.lastTarget = targetRow;
        targetRow.classList.add("is-drop-target");

        const targetDetail = targetRow._spellbookDetail || targetRow.nextElementSibling;
        const rect = targetRow.getBoundingClientRect();
        if (moveEvent.clientY > rect.top + rect.height / 2) {
          targetDetail?.after(state.row);
          state.row.after(state.detailRow);
        } else {
          targetRow.before(state.row);
          state.row.after(state.detailRow);
        }
      };

      const finish = () => {
        clearTarget();
        row.classList.remove("is-dragging");
        try {
          handle.releasePointerCapture(event.pointerId);
        } catch (error) {}
        spellbookDragState = null;
        updateSpellbookEmptyState();
        scheduleBuilderSave();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", finish, { once: true });
      window.addEventListener("pointercancel", finish, { once: true });
    }

    function createSpellbookRow(spell) {
      const row = document.createElement("tr");
      row.className = "spellbook-row";
      const fields = [
        ["level", normalizeSpellLevelText(spell.level || "")],
        ["name", spell.name || ""],
        ["school", spell.school || ""],
        ["castingTime", normalizeSpellCastingTime(spell.castingTime || "")],
        ["range", spell.range || ""],
        ["components", spell.components || ""],
        ["duration", spell.duration || ""]
      ];

      const dragCell = document.createElement("td");
      dragCell.className = "spellbook-drag-cell";
      const dragHandle = document.createElement("span");
      dragHandle.className = "spellbook-drag-handle";
      dragHandle.textContent = "⠿";
      dragHandle.title = "拖拽调整法术顺序";
      dragHandle.setAttribute("aria-hidden", "true");
      dragHandle.addEventListener("pointerdown", (event) => beginSpellbookDrag(event, dragHandle));
      dragCell.append(dragHandle);
      row.append(dragCell);

      const preparedCell = document.createElement("td");
      preparedCell.className = "spellbook-prepared-cell";
      const preparedSelect = document.createElement("select");
      preparedSelect.className = "spellbook-prepared-select";
      preparedSelect.setAttribute("aria-label", "准备状态");
      for (const [value, label] of [
        ["none", "未准备"],
        ["prepared", "已准备"],
        ["gift", "赠礼"]
      ]) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        preparedSelect.append(option);
      }
      preparedSelect.value = normalizeSpellbookPrepared(spell.prepared);
      preparedSelect.addEventListener("change", () => {
        updateSpellbookEmptyState();
        scheduleBuilderSave();
      });
      preparedCell.append(preparedSelect);
      row.append(preparedCell);

      for (const [field, value] of fields) {
        const cell = document.createElement("td");
        const editor = document.createElement("div");
        editor.className = "spellbook-cell";
        editor.contentEditable = "true";
        editor.spellcheck = false;
        editor.dataset.field = field;
        editor.textContent = value;
        editor.title = value;
        editor.addEventListener("input", () => {
          editor.title = editor.textContent;
        });
        if (field === "castingTime") {
          editor.addEventListener("blur", () => {
            const normalized = normalizeSpellCastingTime(editor.textContent);
            if (normalized !== editor.textContent) {
              editor.textContent = normalized;
              scheduleBuilderSave();
            }
          });
        }
        cell.append(editor);
        row.append(cell);
      }

      const actionCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "spellbook-row-actions";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "spellbook-row-toggle";
      toggle.setAttribute("aria-label", "展开或收起法术详述");
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "spellbook-row-delete";
      remove.textContent = "×";
      remove.title = "删除此法术";
      remove.setAttribute("aria-label", "删除此法术");
      actions.append(toggle, remove);
      actionCell.append(actions);
      row.append(actionCell);

      const detailRow = document.createElement("tr");
      detailRow.className = "spellbook-details-row";
      const detailCell = document.createElement("td");
      detailCell.className = "spellbook-details-cell";
      detailCell.colSpan = 10;

      const description = document.createElement("div");
      description.className = "spellbook-description";
      description.contentEditable = "true";
      description.spellcheck = false;
      description.dataset.field = "description";
      description.innerHTML = sanitizeBuilderHtml(spell.descriptionHtml || "");

      detailCell.append(description);
      detailRow.append(detailCell);

      toggle.addEventListener("click", () => {
        setSpellbookRowExpanded(row, !detailRow.classList.contains("is-expanded"));
        scheduleBuilderSave();
      });
      remove.addEventListener("click", () => {
        const table = row.closest(".spellbook-table");
        detailRow.remove();
        row.remove();
        if (table && !table.querySelector(".spellbook-row")) table.remove();
        updateSpellbookEmptyState();
        scheduleBuilderSave();
      });

      row._spellbookDetail = detailRow;
      setSpellbookRowExpanded(row, Boolean(spell.expanded));
      const fragment = document.createDocumentFragment();
      fragment.append(row, detailRow);
      return fragment;
    }

    function appendSpellbookRows(records) {
      const stack = getSpellbookTableStack();
      if (!stack || !records.length) return;
      let table = stack.querySelector(".spellbook-table");
      if (!table) {
        table = makeSpellbookTable();
        stack.append(table);
      }
      const body = table.querySelector("tbody");
      for (const record of records) {
        const expanded = record.expanded !== undefined
          ? Boolean(record.expanded)
          : records.length === 1;
        body.append(createSpellbookRow({ ...record, expanded }));
      }
      updateSpellbookEmptyState();
    }

    const SPELL_SEARCH_API_BASE = "https://5echmsearch.kagangtuya.top";
    const SPELL_SEARCH_RESULT_LIMIT = 12;
    const SPELL_SEARCH_SOURCE_PRIORITY = [
      "PHB24", "PHB14", "XGE", "TCE", "FTD", "BMT", "GGR", "AI", "EGW",
      "SCC", "AAG", "SO", "FR", "EFA", "AU", "夸力许", "冰风谷"
    ];
    const spellSearchDetailCache = new Map();
    let spellSearchGroupsCache = null;
    let spellSearchRequestId = 0;

    function spellSearchSourceRank(source) {
      const index = SPELL_SEARCH_SOURCE_PRIORITY.indexOf(String(source || "").trim());
      return index < 0 ? SPELL_SEARCH_SOURCE_PRIORITY.length : index;
    }

    function buildSpellSearchGroups() {
      if (spellSearchGroupsCache) return spellSearchGroupsCache;
      const raw = Array.isArray(window.__DND_SPELL_INDEX__) ? window.__DND_SPELL_INDEX__ : [];
      const groups = new Map();
      for (const entry of raw) {
        if (!entry || !entry.n) continue;
        const key = `${entry.n}\u0000${entry.e || ""}`;
        let group = groups.get(key);
        if (!group) {
          group = {
            name: entry.n,
            english: entry.e || "",
            level: entry.l || "",
            school: entry.s || "",
            classes: entry.c || "",
            source: entry.src || "",
            versions: []
          };
          groups.set(key, group);
        }
        group.versions.push({
          level: entry.l || "",
          school: entry.s || "",
          classes: entry.c || "",
          source: entry.src || ""
        });
        if (spellSearchSourceRank(entry.src) < spellSearchSourceRank(group.source)) {
          group.level = entry.l || group.level;
          group.school = entry.s || group.school;
          group.classes = entry.c || group.classes;
          group.source = entry.src || group.source;
        }
      }
      spellSearchGroupsCache = [...groups.values()].map((group) => {
        group.versions.sort((a, b) => spellSearchSourceRank(a.source) - spellSearchSourceRank(b.source));
        group.searchText = `${group.name} ${group.english} ${group.source}`.toLowerCase();
        return group;
      });
      return spellSearchGroupsCache;
    }

    function searchSpellCatalog(query) {
      const normalized = String(query || "").trim().toLowerCase();
      if (!normalized) return [];
      const scored = [];
      for (const group of buildSpellSearchGroups()) {
        const name = group.name.toLowerCase();
        const english = group.english.toLowerCase();
        let rank = -1;
        if (name === normalized || english === normalized) rank = 0;
        else if (name.startsWith(normalized) || english.startsWith(normalized)) rank = 1;
        else if (name.includes(normalized) || english.includes(normalized)) rank = 2;
        else if (group.searchText.includes(normalized)) rank = 3;
        if (rank < 0) continue;
        scored.push({ group, rank, length: group.name.length + group.english.length });
      }
      scored.sort((a, b) =>
        a.rank - b.rank ||
        a.length - b.length ||
        a.group.name.localeCompare(b.group.name, "zh-Hans")
      );
      return scored.slice(0, SPELL_SEARCH_RESULT_LIMIT).map((item) => item.group);
    }

    function normalizeSpellLookupText(text) {
      return String(text || "")
        .replace(/\r\n?/g, "\n")
        .replace(/\u00a0/g, " ")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/([：:]\s*\d+)\s*\n\s*(?=(?:尺|分钟|小时|轮|天|磅|里))/g, "$1 ")
        .replace(/(至多)\s*\n\s*(?=\d)/g, "$1 ")
        .replace(/(施法时间[：:][^\n]*?\d)\s*\n\s*(?=(?:反应|动作|附赠|分钟|小时|轮))/g, "$1 ")
        .replace(/(持续时间[：:][^\n]*?\d)\s*\n\s*(?=(?:轮|分钟|小时|天))/g, "$1 ");
    }

    function extractSpellSection(content, group) {
      const lines = String(content || "").split(/\r?\n/);
      let start = -1;
      const english = group.english.toLowerCase();
      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index].trim();
        if (!line.includes(group.name) || !/[丨|｜]/.test(line)) continue;
        if (english && !line.toLowerCase().includes(english)) continue;
        start = index;
        break;
      }
      if (start < 0) return "";
      let end = lines.length;
      for (let index = start + 1; index < lines.length; index += 1) {
        const line = lines[index].trim();
        if (/^[^丨|｜]{1,80}[丨|｜][A-Za-z][^丨|｜]{0,80}$/.test(line)) {
          end = index;
          break;
        }
      }
      return normalizeSpellLookupText(lines.slice(start, end).join("\n").trim());
    }

    async function fetchSpellSearchJson(url) {
      let lastError = null;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 12000);
        try {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        } catch (error) {
          lastError = error;
          await new Promise((resolve) => setTimeout(resolve, 300));
        } finally {
          clearTimeout(timer);
        }
      }
      throw lastError || new Error("搜索请求失败");
    }

    async function fetchSpellSection(group) {
      const cacheKey = `${group.name}\u0000${group.english}`;
      if (spellSearchDetailCache.has(cacheKey)) return spellSearchDetailCache.get(cacheKey);
      const queryVariants = [];
      if (group.english) {
        queryVariants.push(`${group.name}｜${group.english}`);
        queryVariants.push(`${group.name}|${group.english}`);
      }
      queryVariants.push(group.name);
      for (const query of queryVariants) {
        try {
          const searchUrl = `${SPELL_SEARCH_API_BASE}/api/search?keyword=${encodeURIComponent(query)}&titleOnly=false&page=1&pageSize=50`;
          const data = await fetchSpellSearchJson(searchUrl);
          const results = Array.isArray(data?.results) ? data.results : [];
          const ordered = [
            ...results.filter((item) => String(item.path || "").includes("法术详述")),
            ...results.filter((item) => !String(item.path || "").includes("法术详述"))
          ];
          for (const item of ordered) {
            const section = extractSpellSection(item.content, group);
            if (section) {
              spellSearchDetailCache.set(cacheKey, section);
              return section;
            }
          }
        } catch (error) {
          // 当前关键词变体失败时继续尝试下一个变体。
        }
      }
      throw new Error("未找到法术详情");
    }

    function setupSpellbookSearch() {
      const input = document.getElementById("spellbook-search-input");
      const resultsBox = document.getElementById("spellbook-search-results");
      const status = document.getElementById("spellbook-search-status");
      if (!input || !resultsBox || !status) return;

      let currentResults = [];
      let activeIndex = -1;

      const setStatus = (message) => {
        status.textContent = message || "";
      };

      const hideResults = () => {
        resultsBox.hidden = true;
        resultsBox.replaceChildren();
        currentResults = [];
        activeIndex = -1;
      };

      const chooseResult = async (group) => {
        const requestId = ++spellSearchRequestId;
        hideResults();
        setStatus(`正在获取「${group.name}」…`);
        try {
          const section = await fetchSpellSection(group);
          if (requestId !== spellSearchRequestId) return;
          const records = parseSpellbookPlainText(section);
          const record = records[0];
          if (!record) throw new Error("法术解析失败");
          record.name = group.name || record.name;
          record.level = record.level || group.level;
          record.school = record.school || group.school;
          record.classes = record.classes || group.classes;
          record.source = record.source || group.source;
          appendSpellbookRows([record]);
          scheduleBuilderSave();
          input.value = "";
          setStatus(`已加入「${group.name}」`);
        } catch (error) {
          if (requestId !== spellSearchRequestId) return;
          const record = createSpellbookRecord(group.name);
          record.level = group.level;
          record.school = group.school;
          record.classes = group.classes;
          record.source = group.source;
          record.description = "";
          record.descriptionHtml = "";
          appendSpellbookRows([record]);
          scheduleBuilderSave();
          input.value = "";
          setStatus(`未能获取「${group.name}」详情，已加入基础信息。`);
        }
      };

      const renderResults = (query) => {
        const groups = searchSpellCatalog(query);
        currentResults = groups;
        activeIndex = -1;
        resultsBox.replaceChildren();
        if (!query.trim()) {
          hideResults();
          setStatus("");
          return;
        }
        if (!groups.length) {
          resultsBox.hidden = false;
          const empty = document.createElement("div");
          empty.className = "spellbook-search-empty";
          empty.textContent = "未找到匹配的法术";
          resultsBox.append(empty);
          setStatus("");
          return;
        }
        resultsBox.hidden = false;
        setStatus("");
        groups.forEach((group, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "spellbook-search-result";
          button.dataset.index = String(index);
          button.setAttribute("role", "option");
          button.setAttribute("aria-selected", "false");

          const title = document.createElement("span");
          title.className = "spellbook-search-result-title";
          const name = document.createElement("span");
          name.className = "spellbook-search-result-name";
          name.textContent = group.name;
          title.append(name);
          if (group.english) {
            const english = document.createElement("span");
            english.className = "spellbook-search-result-english";
            english.textContent = group.english;
            title.append(" ", english);
          }

          const meta = document.createElement("span");
          meta.className = "spellbook-search-result-meta";
          const source = group.versions.length > 1
            ? `${group.source} +${group.versions.length - 1}`
            : group.source;
          meta.textContent = [group.level, group.school, source].filter(Boolean).join(" · ");
          button.append(title, meta);
          button.addEventListener("click", () => chooseResult(group));
          resultsBox.append(button);
        });
      };

      const moveActive = (delta) => {
        if (!currentResults.length) return;
        activeIndex = (activeIndex + delta + currentResults.length) % currentResults.length;
        for (const button of resultsBox.querySelectorAll(".spellbook-search-result")) {
          const index = Number(button.dataset.index);
          const active = index === activeIndex;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", String(active));
          if (active) button.scrollIntoView({ block: "nearest" });
        }
      };

      input.addEventListener("input", () => renderResults(input.value));
      input.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveActive(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveActive(-1);
        } else if (event.key === "Enter" && currentResults.length) {
          event.preventDefault();
          chooseResult(currentResults[activeIndex >= 0 ? activeIndex : 0]);
        } else if (event.key === "Escape") {
          hideResults();
          setStatus("");
        }
      });
      input.addEventListener("focus", () => {
        if (input.value.trim()) renderResults(input.value);
      });
      document.addEventListener("click", (event) => {
        if (!resultsBox.contains(event.target) && event.target !== input) hideResults();
      });
    }

    function addBlankSpellbookRow() {
      appendSpellbookRows([{
        prepared: "none",
        level: "",
        name: "",
        school: "",
        castingTime: "",
        range: "",
        components: "",
        duration: "",
        source: "",
        classes: "",
        description: "",
        descriptionHtml: "",
        expanded: false
      }]);
      const rows = [...document.querySelectorAll(".spellbook-row")];
      const lastRow = rows[rows.length - 1];
      lastRow?.querySelector('[data-field="name"]')?.focus();
      scheduleBuilderSave();
    }

    function captureSpellbookRows() {
      const stack = getSpellbookTableStack();
      if (!stack) return [];
      return [...stack.querySelectorAll(".spellbook-row")].map((row) => {
        const detailRow = row.nextElementSibling;
        const read = (field, isHtml = false) => {
          const element = row.querySelector(`[data-field="${field}"]`) ||
            detailRow?.querySelector(`[data-field="${field}"]`);
          if (!element) return "";
          return isHtml ? element.innerHTML : element.textContent.trim();
        };
        return {
          prepared: normalizeSpellbookPrepared(
            row.querySelector(".spellbook-prepared-select")?.value
          ),
          level: read("level"),
          name: read("name"),
          school: read("school"),
          castingTime: read("castingTime"),
          range: read("range"),
          components: read("components"),
          duration: read("duration"),
          source: read("source"),
          classes: read("classes"),
          descriptionHtml: read("description", true),
          expanded: Boolean(detailRow?.classList.contains("is-expanded"))
        };
      });
    }

    function restoreSpellbookRows(rows) {
      const stack = getSpellbookTableStack();
      if (!stack) return;
      stack.replaceChildren();
      if (Array.isArray(rows) && rows.length) {
        appendSpellbookRows(rows.map((row) => ({
          ...row,
          descriptionHtml: row.descriptionHtml || row.description || ""
        })));
      }
      updateSpellbookEmptyState();
    }

    const spellbookPasteWatches = new WeakMap();

    function parseSpellbookEditorContent(editor) {
      if (!editor) return false;
      const records = parseSpellbookPaste(
        editor.innerHTML,
        htmlContentToPlainText(editor.innerHTML) ||
        editor.innerText ||
        editor.textContent ||
        ""
      );
      if (!records.length) return false;
      editor.__pastePending = false;
      editor.innerHTML = "";
      appendSpellbookRows(records);
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      saveBuilderData();
      window.clearTimeout(builderPersistence.timer);
      setBuilderSaveStatus(`已加入 ${records.length} 个法术到法术书。`);
      return true;
    }

    function scheduleSpellbookEditorParse(editor) {
      if (!editor || spellbookPasteWatches.has(editor)) return;
      editor.__pastePending = true;
      const state = { attempts: 0 };
      spellbookPasteWatches.set(editor, state);
      const tick = () => {
        if (parseSpellbookEditorContent(editor)) {
          spellbookPasteWatches.delete(editor);
          return;
        }
        state.attempts += 1;
        if (state.attempts < 20) {
          window.setTimeout(tick, 100);
        } else {
          editor.__pastePending = false;
          spellbookPasteWatches.delete(editor);
        }
      };
      window.setTimeout(tick, 0);
    }

    function handleSpellbookPaste(event) {
      const editor = event.currentTarget;
      const clipboard = event.clipboardData;
      if (!clipboard) {
        scheduleSpellbookEditorParse(editor);
        return;
      }
      const html = clipboard.getData("text/html");
      const text = clipboard.getData("text/plain");
      if (!html && !text) {
        scheduleSpellbookEditorParse(editor);
        return;
      }
      const records = parseSpellbookPaste(html, text);
      if (!records.length) {
        scheduleSpellbookEditorParse(editor);
        return;
      }

      event.preventDefault();
      appendSpellbookRows(records);
      editor.innerHTML = "";
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      saveBuilderData();
      window.clearTimeout(builderPersistence.timer);
      setBuilderSaveStatus(`已加入 ${records.length} 个法术到法术书。`);
    }

    function setFeatureRowExpanded(nameRow, expanded) {
      const detailRow = nameRow.nextElementSibling;
      if (!detailRow) return;
      nameRow.classList.toggle("is-expanded", expanded);
      detailRow.classList.toggle("is-expanded", expanded);
      const button = nameRow.querySelector(".feature-table-toggle");
      if (button) {
        button.textContent = expanded ? "▾" : "▸";
        button.title = expanded ? "收起特性详述" : "展开特性详述";
        button.setAttribute("aria-expanded", String(expanded));
      }
    }

    function toggleFeatureRow(nameRow) {
      const detailRow = nameRow.nextElementSibling;
      if (!detailRow) return;
      setFeatureRowExpanded(nameRow, !detailRow.classList.contains("is-expanded"));
      nameRow.closest(".class-feature-paste-table")?.dispatchEvent(
        new Event("input", { bubbles: true })
      );
    }

    function deleteFeatureRow(nameRow) {
      const detailRow = nameRow.nextElementSibling;
      const table = nameRow.closest(".class-feature-paste-table");
      nameRow.remove();
      detailRow?.remove();
      if (table && !table.querySelector(".feature-name-row")) table.remove();
      table?.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function addBlankClassFeatureRow(editor) {
      const stack = getClassFeatureTableStack(editor);
      const blankTable = buildClassFeatureTable(
        [{ nameHtml: "", descHtml: "", expanded: true }],
        true
      );
      let targetTable = stack.querySelector(".class-feature-paste-table:last-of-type");
      if (!targetTable) {
        stack.append(blankTable);
        targetTable = blankTable;
      } else {
        const targetBody = targetTable.querySelector("tbody");
        const sourceBody = blankTable.querySelector("tbody");
        while (sourceBody?.firstChild) targetBody.append(sourceBody.firstChild);
      }
      const names = targetTable.querySelectorAll(".feature-name-cell");
      const nameEditor = names[names.length - 1];
      stack.dispatchEvent(new Event("input", { bubbles: true }));
      nameEditor?.focus();
    }

    let featureDragState = null;

    function beginFeatureDrag(event, handle) {
      if (event.button !== undefined && event.button !== 0) return;
      const nameRow = handle.closest(".feature-name-row");
      if (!nameRow) return;

      event.preventDefault();
      const detailRow = nameRow.nextElementSibling;
      featureDragState = { nameRow, detailRow, handle, lastTarget: null };
      nameRow.classList.add("is-dragging");
      document.body.classList.add("feature-dragging");
      try {
        handle.setPointerCapture(event.pointerId);
      } catch (error) {}

      const clearTarget = () => {
        featureDragState?.lastTarget?.classList.remove("is-drop-target");
        if (featureDragState) featureDragState.lastTarget = null;
      };

      const onMove = (moveEvent) => {
        const state = featureDragState;
        if (!state) return;
        const targetNode = document.elementFromPoint(
          moveEvent.clientX,
          moveEvent.clientY
        )?.closest(".feature-name-row, .feature-details-row");
        const target = targetNode?.classList.contains("feature-details-row")
          ? targetNode.previousElementSibling
          : targetNode;
        if (!target || target === state.nameRow || target === state.detailRow) return;
        if (state.lastTarget && state.lastTarget !== target) {
          state.lastTarget.classList.remove("is-drop-target");
        }
        state.lastTarget = target;
        target.classList.add("is-drop-target");

        const targetDetail = target.nextElementSibling;
        const rect = target.getBoundingClientRect();
        if (moveEvent.clientY > rect.top + rect.height / 2) {
          targetDetail?.after(state.nameRow);
          state.nameRow.after(state.detailRow);
        } else {
          target.before(state.nameRow);
          state.nameRow.after(state.detailRow);
        }
      };

      const finish = () => {
        clearTarget();
        nameRow.classList.remove("is-dragging");
        document.body.classList.remove("feature-dragging");
        try {
          handle.releasePointerCapture(event.pointerId);
        } catch (error) {}
        featureDragState = null;
        nameRow.closest(".class-feature-paste-table")?.dispatchEvent(
          new Event("input", { bubbles: true })
        );
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", finish, { once: true });
      window.addEventListener("pointercancel", finish, { once: true });
    }

    function markWideFeatureTables(container) {
      for (const table of container.querySelectorAll("table")) {
        const rows = [...table.querySelectorAll("tr")];
        const columns = rows.reduce((maximum, row) => {
          const count = [...row.children].reduce(
            (sum, cell) => sum + (Number(cell.getAttribute("colspan")) || 1),
            0
          );
          return Math.max(maximum, count);
        }, 0);
        if (columns > 2) table.classList.add("feature-auto-table-wide");
      }
    }

    function buildClassFeatureTable(features, defaultExpanded = false) {
      const table = document.createElement("table");
      table.className = "class-feature-paste-table";
      const tbody = document.createElement("tbody");

      for (const feature of features) {
        const nameRow = document.createElement("tr");
        nameRow.className = "feature-name-row";
        const nameCell = document.createElement("td");
        const handle = document.createElement("span");
        handle.className = "feature-drag-handle";
        handle.textContent = "⠿";
        handle.title = "拖拽排序";
        handle.setAttribute("aria-hidden", "true");
        handle.addEventListener("pointerdown", (event) => beginFeatureDrag(event, handle));

        const nameEditor = document.createElement("div");
        nameEditor.className = "feature-name-cell";
        if (feature.titleMaroon) nameEditor.classList.add("feature-title-maroon");
        nameEditor.contentEditable = "true";
        nameEditor.spellcheck = false;
        nameEditor.innerHTML = sanitizeBuilderHtml(feature.nameHtml || "")
          .replace(/<br\s*\/?>/gi, " ");

        const actions = document.createElement("div");
        actions.className = "feature-row-actions";
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "feature-table-toggle";
        toggle.setAttribute("aria-label", "展开或收起特性详述");
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "feature-table-delete";
        remove.textContent = "×";
        remove.title = "删除此特性和描述";
        remove.setAttribute("aria-label", "删除此特性和描述");
        actions.append(toggle, remove);
        nameCell.append(handle, nameEditor, actions);

        const detailRow = document.createElement("tr");
        detailRow.className = "feature-details-row";
        const detailCell = document.createElement("td");
        const detailEditor = document.createElement("div");
        detailEditor.className = "feature-details-cell";
        detailEditor.contentEditable = "true";
        detailEditor.spellcheck = false;
        detailEditor.innerHTML = sanitizeBuilderHtml(feature.descHtml || "");
        markWideFeatureTables(detailEditor);
        detailCell.append(detailEditor);

        nameRow.append(nameCell);
        detailRow.append(detailCell);
        tbody.append(nameRow, detailRow);
        setFeatureRowExpanded(
          nameRow,
          feature.expanded !== undefined ? Boolean(feature.expanded) : defaultExpanded
        );
      }

      table.append(tbody);
      return table;
    }

    function getClassFeatureTableStack(editor) {
      const container = editor.closest(".class-feature-editor") || editor;
      let stack = container.nextElementSibling;
      if (stack &&
          stack.classList.contains("class-feature-table-stack") &&
          stack.dataset.classFeatureStack === editor.id) {
        return stack;
      }
      stack = document.createElement("div");
      stack.className = "class-feature-table-stack";
      stack.dataset.classFeatureStack = editor.id;
      container.after(stack);
      return stack;
    }

    const classFeaturePasteWatches = new WeakMap();

    function parseClassFeatureEditorContent(editor) {
      if (!editor || !CLASS_FEATURE_EDITOR_IDS.has(editor.id)) return false;
      const hasHeadingTags = Boolean(editor.querySelector("h1, h2, h3, h4, h5, h6"));
      let features = parseClassFeaturePaste(editor.innerHTML);
      if (!hasHeadingTags && features.length) {
        features = features.map((feature) => ({ ...feature, titleMaroon: true }));
      }
      if (!features.length) {
        features = parseClassFeaturePlainText(
          htmlContentToPlainText(editor.innerHTML) ||
          editor.innerText ||
          editor.textContent ||
          ""
        );
      }
      if (!features.length) return false;
      editor.__pastePending = false;
      editor.innerHTML = "";
      const stack = getClassFeatureTableStack(editor);
      stack.append(buildClassFeatureTable(features));
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    }

    function scheduleClassFeatureEditorParse(editor) {
      if (!editor || classFeaturePasteWatches.has(editor)) return;
      editor.__pastePending = true;
      const state = { attempts: 0 };
      classFeaturePasteWatches.set(editor, state);
      const tick = () => {
        if (parseClassFeatureEditorContent(editor)) {
          classFeaturePasteWatches.delete(editor);
          return;
        }
        state.attempts += 1;
        if (state.attempts < 20) {
          window.setTimeout(tick, 100);
        } else {
          editor.__pastePending = false;
          classFeaturePasteWatches.delete(editor);
        }
      };
      window.setTimeout(tick, 0);
    }

    function handleRichPaste(event) {
      const editor = event.currentTarget;
      const clipboard = event.clipboardData;
      if (!editor) return;
      if (!clipboard) {
        scheduleClassFeatureEditorParse(editor);
        return;
      }

      if (CLASS_FEATURE_EDITOR_IDS.has(editor.id)) {
        const html = clipboard.getData("text/html");
        const text = clipboard.getData("text/plain");
        if (!html && !text) {
          scheduleClassFeatureEditorParse(editor);
          return;
        }
        let features = html ? parseClassFeaturePaste(html) : [];
        if (!features.length) {
          features = parseClassFeaturePlainText(text || "");
        }
        if (features.length) {
          event.preventDefault();
          editor.innerHTML = "";
          const stack = getClassFeatureTableStack(editor);
          stack.append(buildClassFeatureTable(features));
          editor.dispatchEvent(new Event("input", { bubbles: true }));
          return;
        }
        scheduleClassFeatureEditorParse(editor);
      }

      event.preventDefault();
      const html = clipboard.getData("text/html");
      let fragment = html ? convertPastedHtml(html) : null;

      if (!fragment || !fragment.firstChild) {
        const text = (clipboard.getData("text/plain") || "")
          .replace(/\r?\n/g, " ")
          .replace(/\s+/g, " ");
        if (!text.trim()) return;
        fragment = document.createDocumentFragment();
        fragment.append(document.createTextNode(text));
      }

      insertPastedFragment(editor, fragment);
      scheduleUndoCapture(editor, true);
    }

    const undoManager = {
      undo: [],
      redo: [],
      lastState: null,
      lastActionKey: null,
      lastActionAt: 0,
      restoring: false
    };

    function getUndoControlKey(element) {
      if (element.id) return `#${element.id}`;

      const parts = [];
      let current = element;
      while (current && current !== builderPanel) {
        let index = 0;
        let sibling = current;
        while ((sibling = sibling.previousElementSibling)) index += 1;
        parts.unshift(`${current.tagName}:${index}`);
        current = current.parentElement;
      }
      return parts.join("/");
    }

    function getUndoControls() {
      return [...builderPanel.querySelectorAll(
        "input, select, textarea, [contenteditable='true']"
      )];
    }

    function captureUndoState() {
      return getUndoControls().map((element) => ({
        key: getUndoControlKey(element),
        value: element.isContentEditable ? element.innerHTML : element.value,
        checked: element.type === "checkbox" || element.type === "radio"
          ? element.checked
          : null,
        className: element.className
      }));
    }

    function buildUndoControlMap() {
      const map = new Map();
      for (const element of getUndoControls()) {
        map.set(getUndoControlKey(element), element);
      }
      return map;
    }

    function restoreUndoEntry(element, entry) {
      if (element.isContentEditable) {
        element.innerHTML = entry.value;
        element.className = entry.className;
        return;
      }

      if (entry.checked !== null) element.checked = entry.checked;
      element.value = entry.value;
      element.className = entry.className;
    }

    function applyUndoState(state) {
      const map = buildUndoControlMap();
      const beforeValues = new Map();
      const beforeChecked = new Map();

      for (const [key, element] of map) {
        beforeValues.set(key, element.isContentEditable ? element.innerHTML : element.value);
        if (element.type === "checkbox" || element.type === "radio") {
          beforeChecked.set(key, element.checked);
        }
      }

      undoManager.restoring = true;

      for (const entry of state) {
        const element = map.get(entry.key);
        if (element) restoreUndoEntry(element, entry);
      }

      const syncSelectIds = [
        "builder-class", "builder-multi-class", "builder-race", "builder-background",
        "equipment-armor-type", "equipment-armor-name", "combat-spell-ability"
      ];

      for (const id of syncSelectIds) {
        const key = `#${id}`;
        const element = map.get(key);
        if (element && beforeValues.get(key) !== element.value) {
          element.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }

      for (const element of builderPanel.querySelectorAll(".equipment-weapon-name-select")) {
        const key = getUndoControlKey(element);
        if (beforeValues.get(key) !== element.value) {
          element.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }

      for (const element of builderPanel.querySelectorAll("input[type='checkbox']")) {
        const key = getUndoControlKey(element);
        if (beforeChecked.get(key) !== element.checked) {
          element.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }

      for (const id of ["builder-level", "builder-multi-level"]) {
        const element = map.get(`#${id}`);
        if (element) element.dispatchEvent(new Event("input", { bubbles: true }));
      }

      for (const entry of state) {
        const element = map.get(entry.key);
        if (element) restoreUndoEntry(element, entry);
      }

      syncSubclassCustomUI();
      syncArmorCustomUI();
      for (const row of featTableBody.children) syncFeatCustomUI(row);
      for (const row of combatFeatBody.children) syncCombatStyleCustomUI(row);
      for (const row of backpackGearBody.children) syncGearCustomUI(row);
      for (const row of backpackToolBody.children) syncToolCustomUI(row);
      for (const row of equipmentWeaponBody.querySelectorAll("tr")) syncWeaponCustomUI(row);
      undoManager.restoring = false;
      undoManager.lastState = captureUndoState();
      undoManager.lastActionKey = null;
    }

    function scheduleUndoCapture(target, discrete = false) {
      if (undoManager.restoring) return;

      const key = getUndoControlKey(target);
      const now = Date.now();
      const shouldPush = discrete ||
        !undoManager.lastActionKey ||
        undoManager.lastActionKey !== key ||
        now - undoManager.lastActionAt > 800;

      if (shouldPush && undoManager.lastState) {
        undoManager.undo.push(undoManager.lastState);
        if (undoManager.undo.length > 60) undoManager.undo.shift();
        undoManager.redo.length = 0;
      }

      undoManager.lastState = captureUndoState();
      undoManager.lastActionKey = key;
      undoManager.lastActionAt = now;
    }

    function undoCard() {
      if (!undoManager.undo.length) return false;
      const current = captureUndoState();
      const previous = undoManager.undo.pop();
      undoManager.redo.push(current);
      if (undoManager.redo.length > 60) undoManager.redo.shift();
      applyUndoState(previous);
      return true;
    }

    function redoCard() {
      if (!undoManager.redo.length) return false;
      const current = captureUndoState();
      const next = undoManager.redo.pop();
      undoManager.undo.push(current);
      if (undoManager.undo.length > 60) undoManager.undo.shift();
      applyUndoState(next);
      return true;
    }

    function handleUndoActivity(event) {
      if (!event.isTrusted || undoManager.restoring) return;

      const target = event.target.closest?.(
        "input, select, textarea, [contenteditable='true']"
      );
      if (!target || !builderPanel.contains(target)) return;

      const discrete = target.matches(
        "select, input[type='checkbox'], input[type='radio']"
      );

      if (discrete && event.type !== "change") return;
      if (!discrete && event.type !== "input") return;

      scheduleUndoCapture(target, discrete);
    }

    function handleUndoShortcut(event) {
      if (!builderPanel || builderPanel.hidden) return;
      if (!(event.ctrlKey || event.metaKey) || event.altKey) return;

      const key = event.key.toLowerCase();

      if (key === "z") {
        event.preventDefault();
        if (event.shiftKey) redoCard();
        else undoCard();
      } else if (key === "y") {
        event.preventDefault();
        redoCard();
      }
    }

    const BUILDER_STORAGE_KEY = "dnd5e2024.builder.v1";
    const BUILDER_BACKUP_KEY = "dnd5e2024.builder.backup.v1";
    const EMBEDDED_SEEN_PREFIX = "dnd5e2024.embeddedSeen.";
    const builderPersistence = {
      restoring: false,
      timer: null,
      available: true
    };

    const dynamicBuilderSelectors = [
      "#feat-table-body",
      "#combat-feat-body",
      "#special-ability-body",
      "#backpack-gear-body",
      "#backpack-tool-body",
      "#backpack-magic-body",
      "#ledger-body",
      "[data-custom-language-row]",
      "[data-custom-tool-row]",
      "[data-added-weapon-row]",
      "[data-added-magic-row]",
      "[data-extra-multi-row]"
    ].join(", ");

    function isInDynamicBuilderRow(element) {
      return Boolean(element.closest(dynamicBuilderSelectors));
    }

    function sanitizeBuilderHtml(html) {
      const template = document.createElement("template");
      template.innerHTML = html || "";
      const allowedTags = new Set([
        "SPAN", "BR", "UL", "OL", "LI", "B", "STRONG", "I", "EM", "U",
        "S", "STRIKE", "DIV", "P", "BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6",
        "FONT", ...RICH_TABLE_TAGS
      ]);
      const allowedClasses = new Set([
        "custom-title", "custom-term", "custom-spell", "custom-bold", "term-green"
      ]);
      const blockedTags = new Set([
        "SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "IMG", "SVG", "MATH"
      ]);

      const walk = (parent) => {
        for (const node of [...parent.childNodes]) {
          if (node.nodeType === Node.COMMENT_NODE) {
            node.remove();
            continue;
          }
          if (node.nodeType !== Node.ELEMENT_NODE) continue;

          if (blockedTags.has(node.tagName)) {
            node.remove();
            continue;
          }

          if (!allowedTags.has(node.tagName)) {
            const fragment = document.createDocumentFragment();
            while (node.firstChild) fragment.append(node.firstChild);
            walk(fragment);
            node.replaceWith(fragment);
            continue;
          }

          for (const attribute of [...node.attributes]) {
            const name = attribute.name.toLowerCase();
            if (name === "class") continue;

            if (name === "style" && RICH_STYLE_TAGS.has(node.tagName)) {
              const style = sanitizeRichStyle(attribute.value);
              if (style) node.setAttribute("style", style);
              else node.removeAttribute("style");
              continue;
            }

            if (RICH_TABLE_TAGS.has(node.tagName) && RICH_TABLE_ATTRIBUTES.has(name)) {
              continue;
            }

            if (node.tagName === "FONT" && (name === "color" || name === "face" || name === "size")) {
              continue;
            }

            node.removeAttribute(attribute.name);
          }
          const classes = [...node.classList].filter((name) => allowedClasses.has(name));
          if (classes.length) node.className = classes.join(" ");
          else node.removeAttribute("class");

          walk(node);
        }
      };

      walk(template.content);
      return template.innerHTML;
    }

    function captureStaticBuilderControls() {
      return [...builderPanel.querySelectorAll(
        "input, select, textarea, [contenteditable='true']"
      )]
        .filter((element) => element.type !== "file" &&
          !isInDynamicBuilderRow(element) &&
          !element.closest("#spellbook-table-stack, #spellbook-paste") &&
          !element.closest(".class-feature-table-stack"))
        .map((element) => ({
          key: getUndoControlKey(element),
          value: element.isContentEditable ? "" : element.value,
          html: element.isContentEditable ? element.innerHTML : "",
          checked: element.type === "checkbox" || element.type === "radio"
            ? element.checked
            : null,
          className: element.className
        }));
    }

    function captureDynamicBuilderRows(body) {
      return [...body.children].map((row) => ({
        controls: [...row.querySelectorAll(
          "input, select, textarea, [contenteditable='true']"
        )].map((element) => ({
          value: element.isContentEditable ? "" : element.value,
          html: element.isContentEditable ? element.innerHTML : "",
          checked: element.type === "checkbox" || element.type === "radio"
            ? element.checked
            : null,
          className: element.className
        }))
      }));
    }

    function captureCustomLanguageToolRows(container, selector) {
      return [...container.querySelectorAll(selector)].map((row) => ({
        controls: [...row.querySelectorAll("input, select")].map((element) => ({
          value: element.value,
          checked: null,
          className: element.className
        }))
      }));
    }

    function captureAddedEquipmentRows(container, selector) {
      return [...container.querySelectorAll(selector)].map((row) => ({
        controls: [...row.querySelectorAll("input, select, textarea, [contenteditable='true']")]
          .map((element) => ({
            value: element.isContentEditable ? "" : element.value,
            html: element.isContentEditable ? element.innerHTML : "",
            checked: element.type === "checkbox" || element.type === "radio"
              ? element.checked
              : null,
            className: element.className
          }))
      }));
    }

    function captureClassFeatureTables() {
      const result = {};
      for (const id of CLASS_FEATURE_EDITOR_IDS) {
        const editor = document.getElementById(id);
        if (!editor) continue;
        const stack = getClassFeatureTableStack(editor);
        result[id] = [...stack.querySelectorAll(".class-feature-paste-table")].map((table) => ({
          features: [...table.querySelectorAll(".feature-name-row")].map((nameRow) => {
            const detailRow = nameRow.nextElementSibling;
            const nameCell = nameRow.querySelector(".feature-name-cell");
            return {
              nameHtml: nameCell?.innerHTML || "",
              descHtml: detailRow?.querySelector(".feature-details-cell")?.innerHTML || "",
              expanded: Boolean(detailRow?.classList.contains("is-expanded")),
              titleMaroon: Boolean(nameCell?.classList.contains("feature-title-maroon"))
            };
          })
        }));
      }
      return result;
    }

    function restoreClassFeatureTables(data = {}) {
      for (const id of CLASS_FEATURE_EDITOR_IDS) {
        const editor = document.getElementById(id);
        if (!editor) continue;
        const stack = getClassFeatureTableStack(editor);
        stack.replaceChildren();
        for (const tableData of data[id] || []) {
          const features = (tableData.features || [])
            .filter((feature) => feature && (feature.nameHtml || feature.descHtml))
            .map((feature) => ({
              ...feature,
              expanded: feature.expanded !== undefined
                ? Boolean(feature.expanded)
                : Boolean(tableData.expanded)
            }));
          if (!features.length) continue;
          stack.append(buildClassFeatureTable(features));
        }
      }
    }

    function captureSkillStates() {
      const states = {};
      for (const row of skillTables.querySelectorAll(".skill-table tbody tr")) {
        const name = row.querySelector(".skill-name-cell")?.dataset.skill;
        if (!name) continue;
        states[name] = {
          proficiency: row.querySelector(".skill-prof-select")?.value ?? "0",
          correction: row.querySelector(".skill-correction-input")?.value ?? ""
        };
      }
      return states;
    }

    function restoreSkillStates(states) {
      if (!states || !Object.keys(states).length) return;
      if (!skillTables.querySelector(".skill-table")) renderSkillTables();
      for (const row of skillTables.querySelectorAll(".skill-table tbody tr")) {
        const name = row.querySelector(".skill-name-cell")?.dataset.skill;
        const state = states[name];
        if (!state) continue;
        const select = row.querySelector(".skill-prof-select");
        const correction = row.querySelector(".skill-correction-input");
        if (select) {
          select.value = state.proficiency ?? "0";
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (correction) {
          correction.value = state.correction ?? "";
          correction.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
      updateSkillTotals();
    }

    function captureBuilderData() {
      return {
        schema: "dnd5e2024.character",
        version: 1,
        savedAt: new Date().toISOString(),
        staticControls: captureStaticBuilderControls(),
        featRows: captureDynamicBuilderRows(featTableBody),
        combatFeatRows: captureDynamicBuilderRows(combatFeatBody),
        specialAbilityRows: captureDynamicBuilderRows(specialAbilityBody),
        skillStates: captureSkillStates(),
        spellbookRows: captureSpellbookRows(),
        backpack: {
          gear: captureDynamicBuilderRows(backpackGearBody),
          tool: captureDynamicBuilderRows(backpackToolBody),
          magic: captureDynamicBuilderRows(backpackMagicBody)
        },
        ledgerRows: captureDynamicBuilderRows(ledgerBody),
        languageCustomRows: captureCustomLanguageToolRows(
          languageBody,
          "[data-custom-language-row]"
        ),
        toolCustomRows: captureCustomLanguageToolRows(
          toolBody,
          "[data-custom-tool-row]"
        ),
        weaponAddedRows: captureAddedEquipmentRows(
          equipmentWeaponBody,
          "[data-added-weapon-row]"
        ),
        magicEquipmentAddedRows: captureAddedEquipmentRows(
          magicEquipmentBody,
          "[data-added-magic-row]"
        ),
        extraMultiRows: captureAddedEquipmentRows(
          document.querySelector(".profession-table tbody"),
          "[data-extra-multi-row]"
        ),
        appearanceImage: {
          src: appearanceImageState.src,
          scale: appearanceImageState.scale,
          offsetX: appearanceImageState.offsetX,
          offsetY: appearanceImageState.offsetY
        },
        classFeatureTables: captureClassFeatureTables(),
        customCoreTraits: { ...customCoreTraits }
      };
    }

    function applyCapturedControl(element, entry) {
      if (!element) return;

      if (element.isContentEditable) {
        element.innerHTML = sanitizeBuilderHtml(entry.html || "");
        element.className = entry.className || "custom-editor";
        return;
      }

      if (entry.checked !== null && entry.checked !== undefined) {
        element.checked = Boolean(entry.checked);
      }
      element.value = entry.value ?? "";
      element.className = entry.className ?? "";
    }

    function applyCapturedRow(row, rowData) {
      if (!row) return;
      const controls = [...row.querySelectorAll(
        "input, select, textarea, [contenteditable='true']"
      )];
      let entries = rowData && Array.isArray(rowData.controls) ? rowData.controls : [];

      const blankEntry = { value: "", html: "", checked: null, className: "" };
      if (row.closest("#backpack-gear-body") && entries.length === 4) {
        entries = [entries[0], blankEntry, ...entries.slice(1)];
      } else if (row.closest("#backpack-tool-body") && entries.length === 6) {
        entries = [entries[0], blankEntry, ...entries.slice(1)];
      } else if (row.closest("#combat-feat-body") && entries.length === 2) {
        entries = [entries[0], blankEntry, ...entries.slice(1)];
      }

      entries.forEach((entry, index) => {
        applyCapturedControl(controls[index], entry);
      });
    }

    function appendToolGroups(select) {
      const appendGroup = (label, names) => {
        const separator = document.createElement("option");
        separator.value = "";
        separator.textContent = label;
        separator.disabled = true;
        select.appendChild(separator);
        for (const name of names) {
          if (!toolData[name]) continue;
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          select.appendChild(option);
        }
      };
      appendGroup("—工匠工具—", artisanToolNames);
      appendGroup("—其他工具—", otherToolNames);
    }

    function populateLanguageToolSelect(select) {
      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "—";
      select.appendChild(blank);

      const custom = document.createElement("option");
      custom.value = CUSTOM_VALUE;
      custom.textContent = "自定义";
      select.appendChild(custom);

      appendToolGroups(select);
    }

    function populateLanguageSelect(select) {
      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "—";
      select.appendChild(blank);

      const custom = document.createElement("option");
      custom.value = CUSTOM_VALUE;
      custom.textContent = "自定义";
      select.appendChild(custom);

      const appendLanguageGroup = (label, names) => {
        const separator = document.createElement("option");
        separator.value = "";
        separator.textContent = label;
        separator.disabled = true;
        select.appendChild(separator);
        for (const name of names) {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          select.appendChild(option);
        }
      };
      appendLanguageGroup("—标准语言—", standardLanguages);
      appendLanguageGroup("—稀有语言—", rareLanguages);
    }

    function createLanguageControl(initialValue = "") {
      const control = document.createElement("div");
      control.className = "language-tool-control";

      const select = document.createElement("select");
      select.className = "language-tool-select";
      select.setAttribute("aria-label", "语言");
      populateLanguageSelect(select);

      const customInput = document.createElement("input");
      customInput.type = "text";
      customInput.className = "language-tool-custom-input";
      customInput.placeholder = "自定义语言";
      customInput.autocomplete = "off";
      customInput.setAttribute("aria-label", "自定义语言名称");
      customInput.hidden = true;

      const reset = document.createElement("button");
      reset.type = "button";
      reset.className = "custom-reset language-tool-custom-reset";
      reset.textContent = "×";
      reset.title = "返回语言选择";
      reset.setAttribute("aria-label", "返回语言选择");
      reset.hidden = true;

      const knownLanguage = [...select.options].some(
        (option) => !option.disabled && option.value === initialValue
      );
      if (initialValue && knownLanguage) {
        select.value = initialValue;
      } else if (initialValue) {
        select.value = CUSTOM_VALUE;
        customInput.value = initialValue;
      }

      control.append(select, customInput, reset);
      select.addEventListener("change", () => {
        syncLanguageToolCustomUI(control);
        if (select.value === CUSTOM_VALUE) customInput.focus();
      });
      reset.addEventListener("click", () => {
        select.value = "";
        customInput.value = "";
        syncLanguageToolCustomUI(control);
        select.focus();
      });
      syncLanguageToolCustomUI(control);
      return control;
    }

    function syncLanguageToolCustomUI(control) {
      const select = control.querySelector(".language-tool-select");
      const input = control.querySelector(".language-tool-custom-input");
      const reset = control.querySelector(".language-tool-custom-reset");
      if (!select || !input || !reset) return;

      const custom = select.value === CUSTOM_VALUE;
      select.hidden = custom;
      input.hidden = !custom;
      reset.hidden = !custom;
    }

    function createLanguageToolControl() {
      const control = document.createElement("div");
      control.className = "language-tool-control";

      const select = document.createElement("select");
      select.className = "language-tool-select";
      select.setAttribute("aria-label", "工具");
      populateLanguageToolSelect(select);

      const customInput = document.createElement("input");
      customInput.type = "text";
      customInput.className = "language-tool-custom-input";
      customInput.placeholder = "自定义工具";
      customInput.autocomplete = "off";
      customInput.setAttribute("aria-label", "自定义工具名称");
      customInput.hidden = true;

      const reset = document.createElement("button");
      reset.type = "button";
      reset.className = "custom-reset language-tool-custom-reset";
      reset.textContent = "×";
      reset.title = "返回工具选择";
      reset.setAttribute("aria-label", "返回工具选择");
      reset.hidden = true;

      control.append(select, customInput, reset);
      select.addEventListener("change", () => {
        syncLanguageToolCustomUI(control);
        if (select.value === CUSTOM_VALUE) customInput.focus();
      });
      reset.addEventListener("click", () => {
        select.value = "";
        customInput.value = "";
        syncLanguageToolCustomUI(control);
        select.focus();
      });
      syncLanguageToolCustomUI(control);
      return control;
    }

    function createLanguageToolRow(kind, deletable = false) {
      const row = document.createElement("tr");
      if (deletable) {
        row.dataset[kind === "language" ? "customLanguageRow" : "customToolRow"] = "";
      }

      for (let index = 0; index < 2; index += 1) {
        const cell = document.createElement("td");
        if (kind === "tool") {
          cell.append(createLanguageToolControl());
        } else {
          cell.append(createLanguageControl());
        }
        row.append(cell);
      }

      const actionCell = document.createElement("td");
      actionCell.className = "language-action-cell";
      if (deletable) {
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "language-row-delete";
        deleteButton.textContent = "×";
        deleteButton.title = "删除此行";
        deleteButton.setAttribute("aria-label", "删除此行");
        deleteButton.addEventListener("click", () => row.remove());
        actionCell.append(deleteButton);
      }
      row.append(actionCell);
      return row;
    }

    function restoreCustomLanguageToolRows(container, selector, rows) {
      for (const row of container.querySelectorAll(selector)) row.remove();
      for (const rowData of rows || []) {
        const row = createLanguageToolRow(
          selector.includes("language") ? "language" : "tool",
          true
        );
        container.append(row);
        applyCapturedRow(row, rowData);
        for (const control of row.querySelectorAll(".language-tool-control")) {
          syncLanguageToolCustomUI(control);
        }
      }
    }

    function restoreDynamicBuilderRows(data) {
      featTableBody.replaceChildren();
      for (const row of data.featRows || []) {
        createFeatRow("");
        const featRow = featTableBody.lastElementChild;
        applyCapturedRow(featRow, row);
        syncFeatCustomUI(featRow);
      }
      updateFeatAddState();

      combatFeatBody.replaceChildren();
      for (const row of data.combatFeatRows || []) {
        createExtendedFeatRow("combat", combatFeatBody, combatFeatBlock);
        const combatRow = combatFeatBody.lastElementChild;
        applyCapturedRow(combatRow, row);
        syncCombatStyleCustomUI(combatRow);
      }
      combatFeatBlock.hidden = combatFeatBody.children.length === 0;

      specialAbilityBody.replaceChildren();
      for (const row of data.specialAbilityRows || []) {
        createExtendedFeatRow("special", specialAbilityBody, specialAbilityBlock);
        applyCapturedRow(specialAbilityBody.lastElementChild, row);
      }
      specialAbilityBlock.hidden = specialAbilityBody.children.length === 0;

      const backpack = data.backpack || {};
      backpackGearBody.replaceChildren();
      for (const row of backpack.gear || []) {
        const element = createBackpackGearRow();
        backpackGearBody.append(element);
        applyCapturedRow(element, row);
        syncGearCustomUI(element);
      }
      updateBackpackSection("gear");
      updateBackpackGearTotals();

      backpackToolBody.replaceChildren();
      for (const row of backpack.tool || []) {
        const element = createBackpackToolRow();
        backpackToolBody.append(element);
        applyCapturedRow(element, row);
        syncToolCustomUI(element);
      }
      updateBackpackSection("tool");

      backpackMagicBody.replaceChildren();
      for (const row of backpack.magic || []) {
        const element = createBackpackMagicRow();
        backpackMagicBody.append(element);
        applyCapturedRow(element, row);
      }
      updateBackpackSection("magic");

      ledgerBody.replaceChildren();
      const ledgerRows = Array.isArray(data.ledgerRows)
        ? data.ledgerRows
        : [{}, {}, {}];
      ledgerRows.forEach((row, index) => {
        const element = createLedgerRow(index === 0);
        ledgerBody.append(element);
        applyCapturedRow(element, row);
      });
      updateLedgerTotals();

      restoreCustomLanguageToolRows(
        languageBody,
        "[data-custom-language-row]",
        data.languageCustomRows
      );
      restoreCustomLanguageToolRows(
        toolBody,
        "[data-custom-tool-row]",
        data.toolCustomRows
      );

      for (const row of equipmentWeaponBody.querySelectorAll("[data-added-weapon-row]")) {
        row.remove();
      }
      for (const rowData of data.weaponAddedRows || []) {
        const row = createAddedWeaponRow();
        equipmentWeaponBody.append(row);
        applyCapturedRow(row, rowData);
        syncWeaponCustomUI(row);
      }

      for (const row of magicEquipmentBody.querySelectorAll("[data-added-magic-row]")) {
        row.remove();
      }
      for (const rowData of data.magicEquipmentAddedRows || []) {
        const row = createAddedMagicEquipmentRow();
        magicEquipmentBody.append(row);
        applyCapturedRow(row, rowData);
      }

      const professionBody = document.querySelector(".profession-table tbody");
      if (professionBody) {
        for (const row of professionBody.querySelectorAll("[data-extra-multi-row]")) {
          row.remove();
        }
        for (const rowData of data.extraMultiRows || []) {
          const row = createExtraMultiRow();
          professionBody.append(row);
          applyCapturedRow(row, rowData);
          const classField = row.querySelector(".profession-row-class");
          const subclassField = row.querySelector(".profession-row-subclass");
          const levelField = row.querySelector(".profession-row-level");
          levelField.disabled = !classField.value;
          subclassField.disabled = !classField.value;
          if (classField.value) {
            updateSubclassFor(classField, levelField, subclassField, true);
          }
        }
        updateExtraMultiAddState();
      }
    }

    function restoreBuilderData(data) {
      if (!data || !Array.isArray(data.staticControls)) {
        throw new Error("JSON 数据格式不正确。");
      }

      builderPersistence.restoring = true;
      if (data.customCoreTraits && typeof data.customCoreTraits === "object") {
        customCoreTraits = {
          ...customCoreTraits,
          ...data.customCoreTraits
        };
      }
      restoreAppearanceImage(data.appearanceImage);

      const staticControls = new Map(
        captureStaticBuilderControls().map((entry) => [entry.key, entry])
      );
      const staticElements = new Map();
      for (const element of builderPanel.querySelectorAll(
        "input, select, textarea, [contenteditable='true']"
      )) {
        if (element.type === "file" ||
            isInDynamicBuilderRow(element) ||
            element.closest(".class-feature-table-stack")) continue;
        staticElements.set(getUndoControlKey(element), element);
      }

      const applyStatic = () => {
        for (const entry of data.staticControls) {
          applyCapturedControl(staticElements.get(entry.key), entry);
        }
      };

      applyStatic();
      try {
        restoreDynamicBuilderRows(data);
      } catch (error) {
        console.error("恢复动态构筑内容失败", error);
      }
      syncClassFeatureEditors();
      try {
        restoreClassFeatureTables(data.classFeatureTables || {});
      } catch (error) {
        console.error("恢复职业特性表格失败", error);
      }
      try {
        restoreSpellbookRows(data.spellbookRows || []);
      } catch (error) {
        console.error("恢复法术书表格失败", error);
      }

      const syncIds = [
        "builder-class", "builder-multi-class", "builder-race", "builder-background",
        "equipment-armor-type", "equipment-armor-name", "combat-spell-ability"
      ];

      for (const id of syncIds) {
        const element = document.getElementById(id);
        if (element) element.dispatchEvent(new Event("change", { bubbles: true }));
      }

      for (const element of builderPanel.querySelectorAll(".equipment-weapon-name-select")) {
        element.dispatchEvent(new Event("change", { bubbles: true }));
      }

      for (const element of builderPanel.querySelectorAll("input[type='checkbox']")) {
        if (!isInDynamicBuilderRow(element)) {
          element.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }

      applyStatic();

      for (const id of ["builder-level", "builder-multi-level"]) {
        const element = document.getElementById(id);
        if (element) element.dispatchEvent(new Event("input", { bubbles: true }));
      }

      applyStatic();
      updateSpellbookEmptyState();
      updateUnitConversions();
      applyStoredAttributeInitialScores();
      syncSubclassCustomUI();
      syncArmorCustomUI();
      for (const control of toolBody.querySelectorAll(".language-tool-control")) {
        syncLanguageToolCustomUI(control);
      }
      for (const row of equipmentWeaponBody.querySelectorAll("tr")) {
        syncWeaponCustomUI(row);
      }
      updateBackpackSection("gear");
      updateBackpackSection("tool");
      updateBackpackSection("magic");
      updateBackpackGearTotals();
      syncAllSubclassOptionLabels();
      restoreSkillStates(data.skillStates || {});
      renderCoreTraits();

      undoManager.undo.length = 0;
      undoManager.redo.length = 0;
      undoManager.lastState = captureUndoState();
      undoManager.lastActionKey = null;
      builderPersistence.restoring = false;
    }

    function setBuilderSaveStatus(text, isError = false) {
      builderSaveStatus.textContent = text;
      builderSaveStatus.classList.toggle("is-error", isError);
    }

    function saveBuilderData() {
      if (!builderPersistence.available || builderPersistence.restoring) return;

      try {
        localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(captureBuilderData()));
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });
        setBuilderSaveStatus(`已自动保存 ${time}`);
      } catch (error) {
        builderPersistence.available = false;
        setBuilderSaveStatus("自动保存不可用，请导出 JSON。", true);
      }
    }

    function scheduleBuilderSave() {
      if (!builderPersistence.available || builderPersistence.restoring) return;
      setBuilderSaveStatus("正在保存…");
      window.clearTimeout(builderPersistence.timer);
      builderPersistence.timer = window.setTimeout(saveBuilderData, 500);
    }

    function loadBuilderData() {
      const embedded = document.getElementById("dnd-embedded-data");
      if (embedded) {
        const embeddedId = embedded.dataset.embeddedId || "default";
        let seen = false;
        try {
          seen = localStorage.getItem(`${EMBEDDED_SEEN_PREFIX}${embeddedId}`) === "1";
        } catch (error) {
          seen = false;
        }

        if (!seen) {
          try {
            const embeddedData = JSON.parse(embedded.textContent);
            if (!embeddedData ||
                embeddedData.schema !== "dnd5e2024.character" ||
                embeddedData.version !== 1) {
              throw new Error("离线角色卡数据格式不正确。");
            }
            restoreBuilderData(embeddedData);
            try {
              localStorage.setItem(`${EMBEDDED_SEEN_PREFIX}${embeddedId}`, "1");
            } catch (error) {
              // 存储不可用时不阻断首次载入。
            }
            saveBuilderData();
            setBuilderSaveStatus("已载入离线角色卡。");
            return true;
          } catch (error) {
            console.error("离线角色卡恢复失败", error);
            setBuilderSaveStatus("离线角色卡数据损坏，已忽略。", true);
          }
        }
      }

      try {
        const testKey = `${BUILDER_STORAGE_KEY}.test`;
        localStorage.setItem(testKey, "1");
        localStorage.removeItem(testKey);
      } catch (error) {
        builderPersistence.available = false;
        setBuilderSaveStatus("自动保存不可用，请导出 JSON。", true);
        return false;
      }

      try {
        const raw = localStorage.getItem(BUILDER_STORAGE_KEY);
        if (!raw) {
          setBuilderSaveStatus("自动保存已启用");
          return false;
        }

        const data = JSON.parse(raw);
        if (!data || data.schema !== "dnd5e2024.character" || data.version !== 1) {
          setBuilderSaveStatus("自动保存数据版本不兼容。", true);
          return false;
        }

        restoreBuilderData(data);
        setBuilderSaveStatus("已恢复上次自动保存。");
        return true;
      } catch (error) {
        setBuilderSaveStatus("自动保存数据损坏，已忽略。", true);
        return false;
      }
    }

    function clearBuilderData() {
      if (!window.confirm("确定要清空当前角色卡的所有数据吗？")) return;
      if (!window.confirm("再次确认：清空后自动保存也会被删除，此操作无法撤销。")) return;

      builderPersistence.restoring = true;
      const embedded = document.getElementById("dnd-embedded-data");
      if (embedded) {
        try {
          const embeddedId = embedded.dataset.embeddedId || "default";
          localStorage.setItem(`${EMBEDDED_SEEN_PREFIX}${embeddedId}`, "1");
        } catch (error) {
          // 存储不可用时仍继续刷新。
        }
      }
      try {
        localStorage.removeItem(BUILDER_STORAGE_KEY);
        localStorage.removeItem(BUILDER_BACKUP_KEY);
      } catch (error) {
        // 存储不可用时仍刷新页面以清空当前界面。
      }
      window.location.reload();
    }

    function sanitizeExportName(name) {
      return (name || "角色卡").replace(/[\\/:*?"<>|]/g, "_").trim() || "角色卡";
    }

    function materializeClonedFormValues(clone) {
      const originals = [...document.querySelectorAll("input, select, textarea")];
      const targets = [...clone.querySelectorAll("input, select, textarea")];
      originals.forEach((original, index) => {
        const target = targets[index];
        if (!target) return;
        if (original instanceof HTMLInputElement) {
          if (original.type === "file") return;
          if (original.type === "checkbox" || original.type === "radio") {
            if (original.checked) target.setAttribute("checked", "checked");
            else target.removeAttribute("checked");
          } else {
            target.setAttribute("value", original.value);
          }
        } else if (original instanceof HTMLTextAreaElement) {
          target.textContent = original.value;
        } else if (original instanceof HTMLSelectElement) {
          [...target.options].forEach((option, optionIndex) => {
            if (optionIndex === original.selectedIndex) {
              option.setAttribute("selected", "selected");
            } else {
              option.removeAttribute("selected");
            }
          });
        }
      });
    }

    function prepareOfflineExportClone() {
      const clone = document.documentElement.cloneNode(true);
      materializeClonedFormValues(clone);
      clone.querySelectorAll("#dnd-embedded-data").forEach((node) => node.remove());
      clone.querySelectorAll("#builder-import-offline-html, #builder-import-offline-file")
        .forEach((node) => node.remove());
      clone.querySelectorAll(".paste-add-row-button").forEach((node) => node.remove());

      const clonedBody = clone.querySelector("body");
      const clonedTooltip = clone.querySelector("#reference-tooltip");
      const firstScript = clonedBody?.querySelector("script");
      if (clonedBody && clonedTooltip && firstScript) {
        clonedBody.insertBefore(clonedTooltip, firstScript);
      }

      clone.querySelectorAll(
        ".equipment-table-actions, .equipment-action-col, .equipment-action-head, .equipment-action-cell"
      ).forEach((node) => node.remove());

      for (const control of clone.querySelectorAll(".weapon-name-control")) {
        const select = control.querySelector(".equipment-weapon-name-select");
        if (select) control.replaceWith(select);
      }

      const saveStatus = clone.querySelector("#builder-save-status");
      if (saveStatus) saveStatus.textContent = "自动保存已启用";
      clone.querySelector("body")?.setAttribute("data-initial-tab", "builder");
      return clone;
    }

    async function fetchResourceText(url) {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`无法读取资源：${url}`);
      return response.text();
    }

    async function inlineOfflineExportResources(clone) {
      for (const link of [...clone.querySelectorAll('link[rel="stylesheet"]')]) {
        const href = link.getAttribute("href");
        if (!href) continue;
        const css = await fetchResourceText(new URL(href, window.location.href).href);
        const style = document.createElement("style");
        style.textContent = css;
        link.replaceWith(style);
      }

      for (const script of [...clone.querySelectorAll("script[src]")]) {
        const src = script.getAttribute("src");
        if (!src) continue;
        const content = await fetchResourceText(new URL(src, window.location.href).href);
        const inlineScript = document.createElement("script");
        inlineScript.textContent = content;
        script.replaceWith(inlineScript);
      }
    }

    function getOfflineExportClone() {
      const currentClone = prepareOfflineExportClone();
      const template = window.__DND_OFFLINE_TEMPLATE__;
      if (typeof template !== "string" || !template.trim()) {
        return currentClone;
      }

      const documentNode = new DOMParser().parseFromString(template, "text/html");
      const clone = documentNode.documentElement.cloneNode(true);
      clone.querySelectorAll("#dnd-embedded-data").forEach((node) => node.remove());

      const liveMain = currentClone.querySelector("main");
      const templateMain = clone.querySelector("main");
      if (liveMain && templateMain) templateMain.replaceWith(liveMain);

      const liveTooltip = currentClone.querySelector("#reference-tooltip");
      if (liveTooltip && !clone.querySelector("#reference-tooltip")) {
        const body = clone.querySelector("body");
        const firstScript = body?.querySelector("script");
        if (firstScript) body.insertBefore(liveTooltip, firstScript);
        else body?.append(liveTooltip);
      }

      clone.querySelector("body")?.setAttribute("data-initial-tab", "builder");
      return clone;
    }

    async function exportOfflineHtml() {
      try {
        const clone = getOfflineExportClone();
        await inlineOfflineExportResources(clone);

        const embeddedId = typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `card-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const dataScript = document.createElement("script");
        dataScript.id = "dnd-embedded-data";
        dataScript.type = "application/json";
        dataScript.dataset.embeddedId = embeddedId;
        dataScript.textContent = JSON.stringify(captureBuilderData())
          .replace(/<\/script/gi, "<\\/script");
        clone.querySelector("head")?.append(dataScript);

        const source = `<!DOCTYPE html>\n${clone.outerHTML}`;
        const blob = new Blob([source], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${sanitizeExportName(characterName.value.trim())}_离线角色卡.html`;
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        setBuilderSaveStatus("已导出离线 HTML。");
      } catch (error) {
        window.alert(
          "离线 HTML 导出失败。\n\n" +
          "如果当前打开的是拆分资源版 index.html，浏览器可能禁止读取本地 CSS/JS；" +
          "请使用 DND数据计算器.html 便携版导出。"
        );
        setBuilderSaveStatus("离线 HTML 导出失败。", true);
      }
    }

    function collectExportCss() {
      const chunks = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) chunks.push(rule.cssText);
        } catch (error) {
          // 外部样式表不可读取时使用离线模板中的内联样式。
        }
      }
      if (!chunks.length && window.__DND_OFFLINE_TEMPLATE__) {
        const match = window.__DND_OFFLINE_TEMPLATE__.match(/<style>([\s\S]*?)<\/style>/);
        if (match) chunks.push(match[1]);
      }
      return chunks.join("\n");
    }

    function preparePanelForPng(panel) {
      const clone = panel.cloneNode(true);
      const originalControls = [...panel.querySelectorAll("input, select, textarea")];
      const cloneControls = [...clone.querySelectorAll("input, select, textarea")];

      const panelTitle = clone.querySelector(":scope > .panel-title");
      if (panelTitle && panelTitle.textContent.trim() === "角色卡构筑") panelTitle.remove();

      const appearanceImage = clone.querySelector("#appearance-image");
      const appearanceTextValue = panel.querySelector("#builder-appearance")?.value.trim() || "";
      if (!appearanceTextValue && !appearanceImage?.getAttribute("src")) {
        clone.querySelector(".appearance-block")?.remove();
      } else if (appearanceImage && !appearanceImage.getAttribute("src")) {
        appearanceImage.closest(".appearance-image-frame")?.remove();
      }

      const backgroundStoryValue = panel.querySelector("#builder-background-story")?.value.trim() || "";
      if (!backgroundStoryValue) {
        clone.querySelector(".background-story-table")?.remove();
      }

      const characterNotes = clone.querySelector("#character-notes");
      const characterNotesText = panel.querySelector("#character-notes")?.textContent.trim() || "";
      if (characterNotes && !characterNotesText) {
        characterNotes.closest(".character-notes-editor")?.remove();
      }

      originalControls.forEach((original, index) => {
        const target = cloneControls[index];
        if (!target) return;

        if (original instanceof HTMLInputElement) {
          if (original.type === "checkbox" || original.type === "radio") {
            if (original.checked) target.setAttribute("checked", "checked");
            else target.removeAttribute("checked");
          } else if (original.type !== "file") {
            target.setAttribute("value", original.value);
          }
        } else if (original instanceof HTMLTextAreaElement) {
          target.textContent = original.value;
          if (!original.value.trim()) target.classList.add("png-export-empty");
        } else if (original instanceof HTMLSelectElement) {
          [...target.options].forEach((option, optionIndex) => {
            if (optionIndex === original.selectedIndex) option.setAttribute("selected", "selected");
            else option.removeAttribute("selected");
          });
        }
      });

      for (const modifier of clone.querySelectorAll(".spell-modifier")) {
        if (!modifier.querySelector("input")?.value) modifier.classList.add("png-export-empty");
      }

      return clone;
    }

    function createPngExportWrapper(panels) {
      const wrapper = document.createElement("div");
      wrapper.className = "png-export-mode png-export-stack";
      wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      wrapper.style.cssText = 'color:#111;background:#f8f8f6;font-family:"Microsoft YaHei",Arial,sans-serif;font-size:16px;';
      const width = Math.ceil(Math.max(
        722,
        ...panels.map((panel) => panel.getBoundingClientRect().width)
      ));
      wrapper.style.width = `${width}px`;
      for (const panel of panels) wrapper.append(preparePanelForPng(panel));
      return wrapper;
    }

    function loadBlobImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("PNG 渲染失败。"));
        image.src = url;
      });
    }

    function canvasToBlob(canvas) {
      return new Promise((resolve, reject) => {
        if (canvas.toBlob) {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("PNG 生成失败。"));
          }, "image/png");
          return;
        }
        try {
          const data = atob(canvas.toDataURL("image/png").split(", ")[1]);
          const bytes = new Uint8Array(data.length);
          for (let index = 0; index < data.length; index += 1) {
            bytes[index] = data.charCodeAt(index);
          }
          resolve(new Blob([bytes], { type: "image/png" }));
        } catch (error) {
          reject(error);
        }
      });
    }

    async function rasterizePngPanels(panels, filename) {
      if (!panels.length) throw new Error("没有可导出的卡片。");

      const previousTheme = document.documentElement.dataset.theme;
      const previousRootFontSize = document.documentElement.style.fontSize;
      const mainPage = document.querySelector("main.page-width");
      const previousMainZoom = mainPage?.style.zoom || "";
      // 导出图片使用独立的统一缩放：文字和框体一起缩放到 62.5%。
      if (mainPage) mainPage.style.zoom = "1";
      document.documentElement.style.fontSize = "16px";
      const holder = document.createElement("div");
      holder.style.cssText = "position:fixed;left:-100000px;top:0;visibility:hidden;pointer-events:none;z-index:-1;";
      document.body.append(holder);

      try {
        document.documentElement.dataset.theme = "light";
        setBuilderSaveStatus("正在准备 PNG…");
        const wrapper = createPngExportWrapper(panels);
        holder.append(wrapper);
        setBuilderSaveStatus("正在排版 PNG…");

        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        await Promise.all([...wrapper.querySelectorAll("img")].map((image) => {
          const source = image.currentSrc || image.getAttribute("src");
          if (!source) return Promise.resolve();
          return image.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              });
        }));

        for (const textarea of wrapper.querySelectorAll("textarea")) {
          textarea.style.setProperty("height", "auto", "important");
          textarea.style.setProperty("height", `${Math.max(textarea.scrollHeight, 28)}px`, "important");
        }

        const exportScale = 0.625;
        const layoutWidth = wrapper.offsetWidth;
        const layoutHeight = Math.max(wrapper.scrollHeight, wrapper.offsetHeight) + 4;
        const visualWidth = Math.ceil(layoutWidth * exportScale);
        const visualHeight = Math.ceil((layoutHeight + 32) * exportScale);
        if (!layoutWidth || !layoutHeight || !visualWidth || !visualHeight) {
          throw new Error("卡片尺寸读取失败。");
        }

        setBuilderSaveStatus("正在生成 PNG…");
        const styleElement = document.createElement("style");
        styleElement.textContent = collectExportCss();
        const styleMarkup = new XMLSerializer().serializeToString(styleElement);
        const wrapperMarkup = new XMLSerializer().serializeToString(wrapper);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${layoutWidth}" height="${layoutHeight + 32}" style="font-size:16px"><foreignObject x="0" y="0" width="${layoutWidth}" height="${layoutHeight + 32}"><div xmlns="http://www.w3.org/1999/xhtml">${wrapperMarkup}${styleMarkup}</div></foreignObject></svg>`;
        // file:// 页面中 Blob URL 的 SVG 会被 Chrome 视为跨源并污染 Canvas；
        // data URL 可以避免该问题，同时不引入外部图片依赖。
        setBuilderSaveStatus("正在渲染 PNG…");
        const image = await loadBlobImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
        setBuilderSaveStatus("正在写入 PNG…");
        const maxDimension = 8192;
        const maxArea = 16000000;
        const scale = Math.min(
          2,
          maxDimension / visualWidth,
          maxDimension / visualHeight,
          Math.sqrt(maxArea / Math.max(1, visualWidth * visualHeight))
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(visualWidth * scale));
        canvas.height = Math.max(1, Math.round(visualHeight * scale));
        const context = canvas.getContext("2d");
        context.fillStyle = "#f8f8f6";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const blob = await canvasToBlob(canvas);
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        setBuilderSaveStatus("已导出 PNG。");
      } finally {
        holder.remove();
        if (previousTheme) document.documentElement.dataset.theme = previousTheme;
        else delete document.documentElement.dataset.theme;
        if (previousRootFontSize) document.documentElement.style.fontSize = previousRootFontSize;
        else document.documentElement.style.removeProperty("font-size");
        if (previousMainZoom) mainPage.style.zoom = previousMainZoom;
        else mainPage?.style.removeProperty("zoom");
      }
    }

    async function exportBuilderPng(cardKey) {
      const panels = [...builderPanel.children].filter((node) => node.classList.contains("panel"));
      let selected = [];
      let label = "";

      if (cardKey === "info") {
        selected = panels.slice(0, 1);
        label = "角色信息";
      } else if (cardKey === "class") {
        selected = panels.slice(1, 2);
        label = "职业信息";
      } else {
        selected = panels.slice(2);
        label = "法术背包";
      }

      if (!selected.length) {
        window.alert("没有可导出的卡片。");
        return;
      }

      try {
        const name = sanitizeExportName(characterName.value.trim());
        await rasterizePngPanels(selected, `${name}_${label}.png`);
      } catch (error) {
        window.alert(error.message || "PNG 导出失败。");
        setBuilderSaveStatus("PNG 导出失败。", true);
      }
    }

    function setPngMenuOpen(open) {
      builderPngMenu.hidden = !open;
      builderExportPng.setAttribute("aria-expanded", String(open));
    }

    function downloadBuilderJson() {
      saveBuilderData();
      const data = captureBuilderData();
      const name = (characterName.value.trim() || "角色卡")
        .replace(/[\\/:*?"<>|]/g, "_");
      const date = new Date().toISOString().slice(0, 10);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json;charset=utf-8"
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${name}_${date}.json`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setBuilderSaveStatus("已导出 JSON。");
    }

    function canImportOfflineHtml() {
      return window.location.hostname === "astratide.github.io";
    }

    async function importOfflineHtml(file) {
      if (!file) return;
      if (file.size > 50 * 1024 * 1024) {
        setBuilderSaveStatus("离线 HTML 文件过大。", true);
        return;
      }

      try {
        const documentNode = new DOMParser().parseFromString(await file.text(), "text/html");
        const embedded = documentNode.getElementById("dnd-embedded-data");
        if (!embedded) {
          throw new Error("未找到离线角色卡数据，请确认文件由本工具导出。");
        }

        const data = JSON.parse(embedded.textContent);
        if (!data || data.schema !== "dnd5e2024.character" || data.version !== 1) {
          throw new Error("离线角色卡数据格式不正确。");
        }

        if (!window.confirm("导入会覆盖当前角色卡内容，是否继续？")) return;

        try {
          const current = localStorage.getItem(BUILDER_STORAGE_KEY);
          if (current) localStorage.setItem(BUILDER_BACKUP_KEY, current);
        } catch (error) {
          // 本地存储不可用时仍然允许导入。
        }

        restoreBuilderData(data);
        saveBuilderData();
        setBuilderSaveStatus("已导入离线 HTML 角色卡。");
      } catch (error) {
        setBuilderSaveStatus(`导入失败：${error.message}`, true);
      }
    }

    function setupOfflineHtmlImport() {
      if (!canImportOfflineHtml()) return;
      if (document.getElementById("builder-import-offline-html")) return;

      const button = document.createElement("button");
      button.id = "builder-import-offline-html";
      button.className = "builder-toolbar-button";
      button.type = "button";
      button.textContent = "导入离线 HTML";
      button.title = "读取导出的离线 HTML 角色卡";

      const input = document.createElement("input");
      input.id = "builder-import-offline-file";
      input.type = "file";
      input.accept = ".html,text/html";
      input.hidden = true;

      builderExportHtml.insertAdjacentElement("afterend", button);
      button.insertAdjacentElement("afterend", input);

      button.addEventListener("click", () => input.click());
      input.addEventListener("change", async (event) => {
        event.stopPropagation();
        const file = input.files && input.files[0];
        input.value = "";
        await importOfflineHtml(file);
        window.clearTimeout(builderPersistence.timer);
      });
    }

    async function importBuilderJson(file) {
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        setBuilderSaveStatus("JSON 文件过大。", true);
        return;
      }

      try {
        const data = JSON.parse(await file.text());
        if (!data || data.schema !== "dnd5e2024.character" || data.version !== 1) {
          throw new Error("不是有效的角色卡 JSON。");
        }

        if (!window.confirm("导入会覆盖当前角色卡内容，是否继续？")) return;

        try {
          const current = localStorage.getItem(BUILDER_STORAGE_KEY);
          if (current) localStorage.setItem(BUILDER_BACKUP_KEY, current);
        } catch (error) {
          // 本地存储不可用时仍然允许导入。
        }

        restoreBuilderData(data);
        saveBuilderData();
        setBuilderSaveStatus("已导入 JSON。");
      } catch (error) {
        setBuilderSaveStatus(`导入失败：${error.message}`, true);
      }
    }

    function initializeBuilderPersistence() {
      builderClearData.addEventListener("click", clearBuilderData);
      builderExportJson.addEventListener("click", downloadBuilderJson);
      builderExportHtml.addEventListener("click", exportOfflineHtml);
      setupOfflineHtmlImport();
      builderExportPng.addEventListener("click", (event) => {
        event.stopPropagation();
        setPngMenuOpen(builderPngMenu.hidden);
      });
      builderPngMenu.addEventListener("click", (event) => {
        const button = event.target.closest("[data-png-card]");
        if (!button) return;
        setPngMenuOpen(false);
        exportBuilderPng(button.dataset.pngCard);
      });
      document.addEventListener("pointerdown", (event) => {
        if (builderPngMenu.hidden) return;
        if (builderPngMenu.contains(event.target) || builderExportPng.contains(event.target)) return;
        setPngMenuOpen(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !builderPngMenu.hidden) {
          setPngMenuOpen(false);
          builderExportPng.focus();
        }
      });
      builderImportJson.addEventListener("click", () => builderImportFile.click());

      let printTitleBefore = null;
      const preparePrintTitle = () => {
        if (printTitleBefore !== null) return;
        const title = summary.textContent.trim()
          .replace(/[\\/:*?"<>|]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (!title) return;
        printTitleBefore = document.title;
        document.title = title;
      };
      const restorePrintTitle = () => {
        if (printTitleBefore === null) return;
        document.title = printTitleBefore;
        printTitleBefore = null;
      };
      window.addEventListener("beforeprint", preparePrintTitle);
      window.addEventListener("afterprint", restorePrintTitle);
      builderExportPdf.addEventListener("click", () => {
        preparePrintTitle();
        window.print();
      });

      builderImportFile.addEventListener("change", async () => {
        const file = builderImportFile.files && builderImportFile.files[0];
        builderImportFile.value = "";
        await importBuilderJson(file);
      });

      const restored = loadBuilderData();
      applyStoredAttributeInitialScores();
      watchAttributeInitialEdits();
      if (!restored && builderPersistence.available) {
        setBuilderSaveStatus("自动保存已启用");
      }

      document.addEventListener("dnd:attribute-initials-changed", (event) => {
        applyAttributeInitialScores(event.detail?.scores);
      });

      builderPanel.addEventListener("input", scheduleBuilderSave, true);
      builderPanel.addEventListener("change", scheduleBuilderSave, true);
      builderPanel.addEventListener("click", scheduleBuilderSave, true);

      window.addEventListener("pagehide", saveBuilderData);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") saveBuilderData();
      });
    }

    function syncClassCustomUI() {
      const mainCustom = isCustomMainClass();
      classSelect.hidden = mainCustom;
      customClassInput.hidden = !mainCustom;
      classReset.hidden = !mainCustom;
      syncSubclassCustomUI();

      const multiCustom = isCustomMultiClass();
      multiClassSelect.hidden = multiCustom;
      customMultiClassInput.hidden = !multiCustom;
      multiClassReset.hidden = !multiCustom;
      multiSubclassSelect.hidden = multiCustom;
      customMultiSubclassInput.hidden = !multiCustom;

      customSavePanel.hidden = !(mainCustom || multiCustom);
      customSaveBlock.hidden = !mainCustom;

      renderCoreTraits();
      syncClassFeatureEditors();
    }

    function getExtraMultiRows() {
      return [...document.querySelectorAll("[data-extra-multi-row]")];
    }

    function getExtraMultiEntries() {
      return getExtraMultiRows().map((row) => ({
        row,
        classSelect: row.querySelector(".profession-row-class"),
        subclassSelect: row.querySelector(".profession-row-subclass"),
        levelInput: row.querySelector(".profession-row-level")
      })).filter((entry) => entry.classSelect && entry.subclassSelect && entry.levelInput);
    }

    function getExtraMultiLevelSum() {
      return getExtraMultiEntries().reduce((sum, entry) => {
        if (!entry.classSelect.value) return sum;
        return sum + (getLevel(entry.levelInput) ?? 0);
      }, 0);
    }

    function updateExtraMultiAddState() {
      const count = getExtraMultiRows().length;
      multiClassAdd.disabled = count >= 5;
      multiClassAdd.title = count >= 5 ? "最多5个兼职" : "添加兼职职业";
    }

    function createExtraMultiRow() {
      const row = document.createElement("tr");
      row.dataset.extraMultiRow = "";

      const typeCell = document.createElement("th");
      typeCell.scope = "row";
      typeCell.textContent = "兼职";

      const classCell = document.createElement("td");
      const classField = document.createElement("select");
      classField.className = "profession-row-select profession-row-class";
      classField.setAttribute("aria-label", "兼职职业");
      populateClassSelect(classField, "—");
      classField.querySelector(`option[value="${CUSTOM_VALUE}"]`)?.remove();
      classCell.append(classField);

      const subclassCell = document.createElement("td");
      const subclassField = document.createElement("select");
      subclassField.className = "profession-row-select profession-row-subclass";
      subclassField.setAttribute("aria-label", "兼职子职");
      subclassField.disabled = true;
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = "—";
      subclassField.append(empty);
      subclassCell.append(subclassField);

      const levelCell = document.createElement("td");
      levelCell.className = "profession-level-cell";
      const levelField = document.createElement("input");
      levelField.type = "text";
      levelField.inputMode = "numeric";
      levelField.maxLength = 2;
      levelField.value = "1";
      levelField.disabled = true;
      levelField.autocomplete = "off";
      levelField.className = "profession-row-level";
      levelField.setAttribute("aria-label", "兼职等级");
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "multi-row-delete";
      deleteButton.textContent = "×";
      deleteButton.title = "删除此兼职";
      deleteButton.setAttribute("aria-label", "删除此兼职");
      deleteButton.addEventListener("click", () => {
        row.remove();
        updateExtraMultiAddState();
        updateSummary();
      });
      levelCell.append(levelField, deleteButton);

      classField.addEventListener("change", () => {
        levelField.disabled = !classField.value;
        if (!classField.value) {
          levelField.value = "1";
          emptySubclass(subclassField, "—", true);
        } else {
          if (!getLevel(levelField)) levelField.value = "1";
          updateSubclassFor(classField, levelField, subclassField, false);
        }
        updateSummary();
      });
      levelField.addEventListener("input", () => {
        clampLevelInput(levelField);
        if (classField.value) updateSubclassFor(classField, levelField, subclassField, true);
        updateSummary();
      });
      levelField.addEventListener("change", () => {
        normalizeLevel(levelField);
        if (classField.value) updateSubclassFor(classField, levelField, subclassField, true);
        updateSummary();
      });
      subclassField.addEventListener("change", updateSummary);

      row.append(typeCell, classCell, subclassCell, levelCell);
      return row;
    }

    function addExtraMultiRow() {
      if (getExtraMultiRows().length >= 5) return;
      const row = createExtraMultiRow();
      const tableBody = document.querySelector(".profession-table tbody");
      if (!tableBody) return;
      tableBody.append(row);
      updateExtraMultiAddState();
      row.querySelector(".profession-row-class")?.focus();
    }

    function getModifierValue(key) {
      const output = document.getElementById(`mod-${key}`);
      if (!output) return null;
      const text = output.textContent.trim();
      if (text === "—") return null;
      const value = Number(text);
      return Number.isFinite(value) ? value : null;
    }

    function getCombatTotalLevel() {
      const mainLevel = classSelect.value ? (getLevel(levelInput) ?? 0) : 0;
      const multiLevel = getExtraMultiLevelSum();
      return { total: mainLevel + multiLevel, mainLevel, multiLevel };
    }

    function syncSpellcastingDefault() {
      const ability = spellAbilityMap[classSelect.value] ||
        spellAbilityMap[multiClassSelect.value] || "";
      combatSpellAbility.value = ability;
      combatSpellAbility.classList.toggle("is-empty", !ability);
    }

    function getClassHitDie(select) {
      if (!select.value) return 0;
      if (select.value === CUSTOM_VALUE) return Number(professionCustomHitDie.value) || 8;
      return hitDieMap[select.value] || 8;
    }

    function getCombatCorrection(key) {
      const inputs = {
        initiative: combatInitiativeCorrection,
        ac: combatAcCorrection,
        passive: combatPassiveCorrection,
        dc: combatSpellDcCorrection,
        attack: combatSpellAttackCorrection
      };
      const raw = inputs[key] ? inputs[key].value.trim() : "";
      if (raw === "") return 0;
      const value = Number(raw);
      return Number.isFinite(value) ? Math.trunc(value) : 0;
    }

    function syncCombatCorrectionPlus(input) {
      const cell = input.closest(".combat-correction-cell");
      if (cell) cell.classList.toggle("has-value", input.value.trim() !== "");
    }

    function setCombatTotal(input, key, autoBase) {
      const correction = getCombatCorrection(key);
      const auto = key === "ac" ? true : !combatBaseManual[key];
      const base = auto ? autoBase : combatBase[key];
      const total = base === null || base === undefined ? null : base + correction;

      if (total === null) {
        input.value = "—";
        input.classList.add("is-default");
        return;
      }

      input.value = String(total);
      input.classList.toggle("is-default", auto && correction === 0);
    }

    function hasFeat(name) {
      for (const row of featTableBody.children) {
        const select = row.querySelector(".feat-name-select");
        const customInput = row.querySelector(".feat-custom-name-input");
        const value = select?.value === CUSTOM_VALUE
          ? customInput?.value.trim()
          : select?.value.trim();
        if (value === name) return true;
      }
      return false;
    }

    function hasToughFeat() {
      return hasFeat("健壮");
    }

    function getHpGrowthDefault() {
      const isDwarf = raceSelect.value === "矮人" || currentRaceName() === "矮人";
      return (isDwarf ? 1 : 0) + (hasToughFeat() ? 2 : 0);
    }

    function updateHpGrowthPlus() {
      combatHpGrowthPlus.hidden = combatHpGrowth.value.trim() === "";
    }

    function applyHpGrowthDefault() {
      const defaultValue = getHpGrowthDefault();
      const current = combatHpGrowth.value.trim();
      if (current === "" || current === hpGrowthAutoValue) {
        const next = defaultValue ? String(defaultValue) : "";
        combatHpGrowth.value = next;
        hpGrowthAutoValue = next;
      }
      updateHpGrowthPlus();
    }

    combatHpGrowth.addEventListener("input", () => {
      hpGrowthAutoValue = null;
      updateHpGrowthPlus();
      updateCombatStats();
    });

    function updateCombatStats() {
      for (const input of [
        combatInitiativeCorrection,
        combatAcCorrection,
        combatPassiveCorrection,
        combatSpellDcCorrection,
        combatSpellAttackCorrection
      ]) {
        syncCombatCorrectionPlus(input);
      }

      const { total, mainLevel } = getCombatTotalLevel();
      const pb = Math.max(2, Math.floor((total - 1) / 4) + 2);
      const conMod = getModifierValue("con") ?? 0;
      const dexMod = getModifierValue("dex") ?? 0;
      const wisMod = getModifierValue("wis") ?? 0;
      const mainDie = getClassHitDie(classSelect);
      const extraEntries = getExtraMultiEntries();

      const diceParts = [];
      let hp = 0;
      let firstLevel = true;

      if (mainLevel > 0 && mainDie > 0) {
        diceParts.push(`${mainLevel}d${mainDie}`);
        for (let i = 0; i < mainLevel; i += 1) {
          hp += firstLevel ? mainDie : Math.floor(mainDie / 2) + 1;
          hp += conMod;
          firstLevel = false;
        }
      }

      for (const entry of extraEntries) {
        const multiLevel = entry.classSelect.value ? (getLevel(entry.levelInput) ?? 0) : 0;
        const multiDie = getClassHitDie(entry.classSelect);
        if (multiLevel <= 0 || multiDie <= 0) continue;
        diceParts.push(`${multiLevel}d${multiDie}`);
        for (let i = 0; i < multiLevel; i += 1) {
          hp += firstLevel ? multiDie : Math.floor(multiDie / 2) + 1;
          hp += conMod;
          firstLevel = false;
        }
      }

      const hpGrowth = parseFloat(combatHpGrowth.value.trim());
      if (Number.isFinite(hpGrowth)) hp += hpGrowth * total;

      const hasLevels = mainLevel + getExtraMultiLevelSum() > 0;
      combatHitDice.textContent = diceParts.length ? diceParts.join(" + ") : "—";

      if (combatManual.hp) {
        combatHp.classList.remove("is-default");
      } else {
        combatHp.value = hasLevels ? String(hp) : "—";
        combatHp.classList.add("is-default");
      }

      setCombatTotal(
        combatInitiative,
        "initiative",
        dexMod + (hasFeat("警戒") && pb !== null ? pb : 0)
      );
      const armorAcRaw = equipmentArmorAc.value.trim();
      const armorAc = armorAcRaw === "" ? null : Number(armorAcRaw);
      const shieldAc = equipmentShieldEquipped.value === "是"
        ? Number(equipmentShieldAc.value.trim())
        : 0;
      const hasShieldAc = Number.isFinite(shieldAc);
      setCombatTotal(
        combatAc,
        "ac",
        Number.isFinite(armorAc) ? armorAc + (hasShieldAc ? shieldAc : 0) : null
      );
      setCombatTotal(combatPassive, "passive", 10 + wisMod);

      const spellKey = combatSpellAbility.value;
      const spellMod = spellKey ? getModifierValue(spellKey) : null;
      const hasSpell = Boolean(spellKey) && spellMod !== null && pb !== null;
      const autoDc = hasSpell ? 8 + pb + spellMod : null;
      const autoAttack = hasSpell ? pb + spellMod : null;

      setCombatTotal(combatSpellDc, "dc", autoDc);
      setCombatTotal(combatSpellAttack, "attack", autoAttack);
      alignPlusIndicators();
    }

    function updateDerivedStats() {
      syncClassFeatureEditors();
      renderCoreTraits();
      const mainLevel = classSelect.value ? (getLevel(levelInput) ?? 0) : 0;
      const multiLevel = getExtraMultiLevelSum();
      const totalLevel = mainLevel + multiLevel;
      const pb = Math.max(2, Math.floor((totalLevel - 1) / 4) + 2);

      totalLevelOutput.textContent = totalLevel >= 1 ? String(totalLevel) : "—";
      pbOutput.textContent = `+${pb}`;

      const saveNames = activeSaveNames();
      saveProfOutput.textContent = saveNames.length ? saveNames.join("、") : "—";

      for (const row of abilityRows) {
        const initialInput = document.getElementById(`ability-${row.key}-initial`);
        const backgroundInput = document.getElementById(`ability-${row.key}-background`);
        const growthInput = document.getElementById(`ability-${row.key}-growth`);
        const correctionInput = document.getElementById(`ability-${row.key}-correction`);
        const valueOutput = document.getElementById(`ability-${row.key}-value`);
        const modifierOutput = document.getElementById(`mod-${row.key}`);
        const saveOutput = document.getElementById(`save-${row.key}`);
        const saveCorrectionInput = document.getElementById(`save-${row.key}-correction`);

        if (!initialInput || !backgroundInput || !growthInput || !correctionInput ||
            !valueOutput || !modifierOutput || !saveOutput || !saveCorrectionInput) {
          continue;
        }

        const components = [
          readAbilityNumber(initialInput),
          readAbilityNumber(backgroundInput),
          readAbilityNumber(growthInput)
        ];
        const replacement = readAbilityNumber(correctionInput);
        const hasBaseValue = components.some((value) => value !== null);
        const value = replacement !== null
          ? replacement
          : (hasBaseValue
            ? components.reduce((sum, component) => sum + (component ?? 0), 0)
            : null);
        const modifier = value === null ? null : Math.floor((value - 10) / 2);
        const proficient = saveState.has(row.key);
        const saveCorrection = readAbilityNumber(saveCorrectionInput);
        const save = modifier === null
          ? null
          : modifier + (proficient && pb !== null ? pb : 0) + (saveCorrection ?? 0);

        initialInput.classList.toggle("is-default", components[0] === 10);
        valueOutput.textContent = formatAbilityResult(value);
        modifierOutput.textContent = formatAbilityModifier(modifier);
        saveOutput.textContent = formatAbilityModifier(save);
        saveOutput.classList.toggle("is-proficient", proficient && pb !== null);
        saveOutput.title = proficient && pb !== null ? "已计入职业豁免熟练的 PB 与豁免修正" : "";

        for (const input of [initialInput, backgroundInput, growthInput, correctionInput, saveCorrectionInput]) {
          syncAbilityInputState(input);
        }
      }

      updateArmorDefaults();
      updateWeaponDefaults();
      updateCombatStats();
      updateSkillTotals();
      updateSpellcasting();
      alignPlusIndicators();
    }

    const ATTRIBUTE_INITIALS_KEY = "dnd5e2024.attributeInitialScores";
    const ATTRIBUTE_INITIALS_APPLIED_KEY = "dnd5e2024.attributeInitialsApplied";
    const ATTRIBUTE_INITIAL_KEYS = ["str", "dex", "con", "int", "wis", "cha"];
    let applyingAttributeInitialScores = false;

    function readAttributeScores(source) {
      if (!source || typeof source !== "object") return null;
      const scores = {};
      for (const key of ATTRIBUTE_INITIAL_KEYS) {
        const value = Number(source[key]);
        if (!Number.isFinite(value)) return null;
        scores[key] = value;
      }
      return scores;
    }

    function readAttributeInitialInputScores() {
      const scores = {};
      for (const key of ATTRIBUTE_INITIAL_KEYS) {
        const input = document.getElementById(`ability-${key}-initial`);
        if (!input || input.value.trim() === "") return null;
        const value = Number(input.value);
        if (!Number.isFinite(value)) return null;
        scores[key] = value;
      }
      return scores;
    }

    function sameAttributeScores(left, right) {
      return Boolean(left && right) &&
        ATTRIBUTE_INITIAL_KEYS.every((key) => left[key] === right[key]);
    }

    function readAppliedAttributeScores() {
      try {
        return readAttributeScores(
          JSON.parse(localStorage.getItem(ATTRIBUTE_INITIALS_APPLIED_KEY) || "null")
        );
      } catch (error) {
        return null;
      }
    }

    function readStoredAttributeScores() {
      try {
        return readAttributeScores(
          JSON.parse(localStorage.getItem(ATTRIBUTE_INITIALS_KEY) || "null")
        );
      } catch (error) {
        return null;
      }
    }

    function canApplyAttributeInitialScores() {
      const current = readAttributeInitialInputScores();
      if (!current) return false;
      if (ATTRIBUTE_INITIAL_KEYS.every((key) => current[key] === 10)) return true;
      if (sameAttributeScores(current, readAppliedAttributeScores())) return true;
      return sameAttributeScores(current, readStoredAttributeScores());
    }

    function writeAppliedAttributeScores(scores) {
      try {
        localStorage.setItem(ATTRIBUTE_INITIALS_APPLIED_KEY, JSON.stringify(scores));
      } catch (error) {
        // 存储不可用时不阻断本次同步。
      }
    }

    function applyAttributeInitialScores(scores, options = {}) {
      const normalized = readAttributeScores(scores);
      if (!normalized) return false;
      if (!options.force && !canApplyAttributeInitialScores()) return false;
      applyingAttributeInitialScores = true;
      try {
        for (const key of ATTRIBUTE_INITIAL_KEYS) {
          const input = document.getElementById(`ability-${key}-initial`);
          if (!input) continue;
          input.value = String(normalized[key]);
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
        writeAppliedAttributeScores(normalized);
        return true;
      } finally {
        applyingAttributeInitialScores = false;
      }
    }

    function applyStoredAttributeInitialScores() {
      const stored = readStoredAttributeScores();
      if (stored) applyAttributeInitialScores(stored);
    }

    function watchAttributeInitialEdits() {
      for (const key of ATTRIBUTE_INITIAL_KEYS) {
        const input = document.getElementById(`ability-${key}-initial`);
        if (!input) continue;
        input.addEventListener("change", () => {
          if (applyingAttributeInitialScores || builderPersistence.restoring) return;
          applyStoredAttributeInitialScores();
        });
      }
    }

    window.__DND_APPLY_ATTRIBUTE_INITIALS__ = applyAttributeInitialScores;

    function updateUnitConversion(input, output, type) {
      if (!input || !output) return;
      const raw = input.value.trim().replace(/,/g, ".");
      let converted = null;
      if (type === "height") {
        const match = raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(cm|厘米|公分|米|m)$/i);
        if (match) {
          const value = Number(match[1]) * (/^(米|m)$/i.test(match[2]) ? 100 : 1);
          if (Number.isFinite(value) && value > 0) {
            converted = `${(Math.floor((value / 30.48) * 100) / 100).toFixed(2)} ft.`;
          }
        }
      } else {
        const match = raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(kg|千克|公斤)$/i);
        if (match) {
          const value = Number(match[1]);
          if (Number.isFinite(value) && value > 0) {
            converted = `${(Math.floor(value * 2.2046226218 * 100) / 100).toFixed(2)} lbs.`;
          }
        }
      }
      output.textContent = converted || "";
      output.hidden = !converted;
    }

    function updateUnitConversions() {
      updateUnitConversion(
        document.getElementById("builder-height"),
        document.getElementById("builder-height-imperial"),
        "height"
      );
      updateUnitConversion(
        document.getElementById("builder-weight"),
        document.getElementById("builder-weight-imperial"),
        "weight"
      );
    }

    function updateSummary() {
      updateSubclassLevelColor();
      applyHpGrowthDefault();
      const parts = [];
      const name = characterName.value.trim();
      if (name) parts.push(name);
      parts.push(currentRaceName());
      if (!isCustomRace() && subraceSelect.value) parts.push(subraceSelect.value);

      const mainName = currentMainClassName();
      if (mainName) {
        const level = getLevel(levelInput);
        const mainSubclass = currentMainSubclass();
        const subclassText = mainSubclass ? `（${mainSubclass}）` : "";
        parts.push(`${mainName}${subclassText}${level === null ? "?" : level}级`);
      }

      for (const entry of getExtraMultiEntries()) {
        const multiName = entry.classSelect.value;
        if (!multiName) continue;
        const multiLevel = getLevel(entry.levelInput);
        const subclassText = entry.subclassSelect.value
          ? `（${entry.subclassSelect.value}）`
          : "";
        parts.push(`兼职 ${multiName}${subclassText}${multiLevel === null ? "?" : multiLevel}级`);
      }

      summary.textContent = parts.join(" ");
      updateDerivedStats();
      updateDstCommand();
      syncClassFeatureEditors();
    }

    function dstText(value, fallback = "0") {
      const text = String(value ?? "").trim();
      return text && text !== "—" ? text.replace(/^\+/, "") : fallback;
    }

    function getDstWeapons() {
      const weapons = [];
      for (const row of equipmentWeaponBody.querySelectorAll("tr")) {
        const select = row.querySelector(".equipment-weapon-name-select");
        const custom = row.querySelector(".weapon-custom-name");
        const name = select?.value === CUSTOM_VALUE
          ? custom?.value.trim()
          : select?.value.trim();
        if (!name) continue;
        const attack = row.querySelector(".equipment-attack-input")?.value.trim() || "0";
        weapons.push({ name, attack: dstText(attack, "0") });
      }
      return weapons;
    }

    function updateDstCommand() {
      if (!dstCommand) return;
      const attributes = ["str", "dex", "con", "int", "wis", "cha"];
      const attributeLabels = {
        str: "力量", dex: "敏捷", con: "体质", int: "智力", wis: "感知", cha: "魅力"
      };
      const parts = [".dst"];

      for (const key of attributes) {
        const saveProficient = document.querySelector(`.save-prof-toggle[data-ability="${key}"]`)?.checked;
        const marker = saveProficient ? "*" : "";
        parts.push(`${attributeLabels[key]}${marker}:${dstText(document.getElementById(`ability-${key}-value`)?.textContent, "10")}`);
      }

      const hp = dstText(combatHp.value, "0");
      parts.push(`hp:${hp}`, `hpmax:${hp}`);
      parts.push(`先攻:${dstText(combatInitiative.value, "0")}`);
      parts.push(`ac:${dstText(combatAc.value, "10")}`);
      parts.push(`dc:${dstText(combatSpellDc.value, "0")}`);
      parts.push(`pp:${dstText(combatPassive.value, "10")}`);
      parts.push(`熟练:${dstText(pbOutput.textContent, "0")}`);

      for (const row of document.querySelectorAll(".skill-table tbody tr")) {
        const nameCell = row.querySelector(".skill-name-cell");
        if (!nameCell) continue;
        const proficiency = row.querySelector(".skill-prof-select")?.value;
        const marker = proficiency === "2" ? "*2" : proficiency === "1" ? "*" : "";
        const correction = dstText(row.querySelector(".skill-correction-input")?.value, "0");
        parts.push(`${nameCell.textContent.trim()}${marker}:${correction}`);
      }

      const weapons = getDstWeapons();
      for (const weapon of weapons) parts.push(`${weapon.name}:${weapon.attack}`);

      if (combatSpellAbility.value) {
        parts.push(`法术攻击:${dstText(combatSpellAttack.value, "0")}`);
      }

      dstCommand.textContent = parts.join(" ");

      const character = characterName.value.trim() || "角色名";
      const helpLines = [
        "使用例子：",
        "【.setdnd】确保骰子为dnd模式",
        `【.nn ${character}】设置角色卡名字`,
        "【.dst ...】设置技能加值",
        "【.sndnd】自动设置群名片（需要骰子有管理员权限）",
        "【.rc 运动】进行检定",
        "【.rc 优势 特技】进行优势检定"
      ];
      for (const weapon of weapons) {
        helpLines.push(`【.rc${weapon.name}】进行武器攻击`);
      }
      if (combatSpellAbility.value) {
        helpLines.push("【.rc法术攻击】进行法术攻击");
      }
      helpLines.push(
        "【.show 运动】检查加值",
        "【.hp-10】减少血量",
        "【.buff hp+10】添加临时生命值"
      );
      dstHelp.textContent = helpLines.join("\n");
    }

    function copyDstCommand() {
      updateDstCommand();
      const text = dstCommand.textContent;
      const fallbackCopy = () => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.cssText = "position:fixed;left:-100000px;top:0;";
        document.body.append(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
        } catch (error) {
          // 复制失败时保留文本供手动选择。
        }
        textarea.remove();
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          dstCopy.textContent = "已复制";
          window.setTimeout(() => { dstCopy.textContent = "复制"; }, 1500);
        }).catch(() => {
          fallbackCopy();
          dstCopy.textContent = "已复制";
          window.setTimeout(() => { dstCopy.textContent = "复制"; }, 1500);
        });
      } else {
        fallbackCopy();
        dstCopy.textContent = "已复制";
        window.setTimeout(() => { dstCopy.textContent = "复制"; }, 1500);
      }
    }

    dstToggle.addEventListener("click", () => {
      const willOpen = dstBox.hidden;
      dstBox.hidden = !willOpen;
      dstToggle.setAttribute("aria-expanded", String(willOpen));
      dstToggle.textContent = willOpen ? "隐藏豹骰导入指令" : "显示豹骰导入指令";
      if (willOpen) updateDstCommand();
    });
    dstCopy.addEventListener("click", copyDstCommand);

    const abilityTooltipTexts = {
      attr: "六项属性：力量、敏捷、体质、智力、感知、魅力。点击属性格可切换该属性的豁免熟练。",
      "ability-str": "衡量力气和抵抗冲击的能力。",
      "ability-dex": "衡量灵活性、反应能力和平衡感。",
      "ability-con": "衡量健康程度和耐力。",
      "ability-int": "衡量洞察力和精神坚韧程度。",
      "ability-wis": "衡量感知、直觉和洞察力。",
      "ability-cha": "衡量自信、仪态以及吸引力。",
      value: "数值 = 初始 + 背景 + 成长 + 修正。",
      initial: "用于填写开卡基础属性值，通常使用标准数列或 dnd5 等类似随机取值方式来获得数组。",
      background: "你的背景会给你提供三种不同的属性值，你可以选择将其中一项提升 2，另一项提升 1。或者你也可以让三项属性值都获得+1。",
      growth: "你的职业等级达到获得属性值提升的等级时，你可以选择使得你的一项属性获得 +2，又或者是习得一项符合条件的专长。选取通用专长还会给你特定属性的提升。",
      correction: "部分魔法物品，例如食人魔护手、智力头带、巨人腰带等允许你使用特定的数值来替换你原有的属性数值，在此输入要替换的值，会覆盖你原来的属性值。",
      adjustment: "调整 = 向下取整((数值 - 10) / 2)。",
      save: "豁免 = 调整 + 职业豁免熟练的 PB + 豁免修正。",
      saveCorrection: `部分魔法物品、超自然赠礼等效果会让你的豁免获得加值，在此列填入那些加值。通常而言会来自<b class="item">防御护腕</b>或者<b class="item">幸运石</b>。`,
      "mod-str": "当你要举起、推动、拉拽或破坏某样东西，使用力量属性进行检定。",
      "mod-dex": "当你要灵巧、迅捷或安静地移动，使用敏捷属性进行检定。",
      "mod-con": "当你要努力超越身体的极限，使用体质属性进行检定。",
      "mod-int": "当你要推理或回忆，使用智力属性进行检定。",
      "mod-wis": "当你要从环境或生物的行为表现中感知事物，使用感知属性进行检定。",
      "mod-cha": "当你要影响、取悦或误导，使用魅力属性进行检定。",
      "save-str": "力量：当你要承担对身体的直观冲击，使用力量属性进行豁免。",
      "save-dex": "敏捷：当你要躲开有害效应，使用敏捷属性进行豁免。",
      "save-con": "体质：当你要承受毒性的危害，使用体质属性进行豁免。",
      "save-int": "智力：当你要识别虚假的幻象，使用智力属性进行豁免。",
      "save-wis": "感知：当你要抵抗精神攻击，使用感知属性进行豁免。",
      "save-cha": "魅力：当你要维持你的存在，使用魅力属性进行豁免。",
      "skill-特技": "<b>特技 Acrobatics（敏捷）</b><br>在复杂的环境里屹立不倒或是表演杂技特技。",
      "skill-驯兽": "<b>驯兽 Animal Handling（感知）</b><br>让动物平静下来、训练它们，又或者让它们做某种特定的事。",
      "skill-奥秘": "<b>奥秘 Arcana（智力）</b><br>回忆有关于法术、魔法物品和存在位面的知识。",
      "skill-运动": "<b>运动 Athletics（力量）</b><br>比平时跳的更远，在汹涌的水面上漂浮或是打碎什么东西。",
      "skill-欺瞒": "<b>欺瞒 Deception（魅力）</b><br>撒一个让人信服的谎话或者做出让人深信不疑的伪装。",
      "skill-历史": "<b>历史 History（智力）</b><br>回忆有关历史事件、人民、国家和文化传统的知识。",
      "skill-洞悉": "<b>洞悉 Insight（感知）</b><br>辨别某人的情绪或意图。",
      "skill-威吓": "<b>威吓 Intimidation（魅力）</b><br>恫吓他人或胁迫某人去做你想要他做的事。",
      "skill-调查": "<b>调查 Investigation（智力）</b><br>在书本中寻辨晦涩难懂的信息或推断某些事物是如何运作的。",
      "skill-医药": "<b>医药 Medicine（感知）</b><br>诊断某种疾病或是确定近期死亡的死者的死因。",
      "skill-自然": "<b>自然 Nature（智力）</b><br>回忆有关地形、植物、动物和天气的知识。",
      "skill-察觉": "<b>察觉 Perception（感知）</b><br>结合各种感官，注意一些容易忽略的细节。",
      "skill-表演": "<b>表演 Performance（魅力）</b><br>演戏、讲述故事、演奏乐曲或翩翩起舞。",
      "skill-游说": "<b>游说 Persuasion（魅力）</b><br>真诚且优雅地在某件事上说服他人。",
      "skill-宗教": "<b>宗教 Religion（智力）</b><br>回忆有关神的传说、宗教仪式的学问以及圣徽的知识。",
      "skill-巧手": "<b>巧手 Sleight of Hand（敏捷）</b><br>扒窃口袋，藏起只手可握的小物件或是耍一些手上把戏。",
      "skill-隐匿": "<b>隐匿 Stealth（敏捷）</b><br>通过悄悄地移动和藏在事物后面来躲避别人的注意。",
      "skill-求生": "<b>求生 Survival（感知）</b><br>跟踪追查、寻找食物、寻觅踪迹或是避免遭遇自然灾害。"
    };

    const ABILITY_TOOLTIP_DELAY = 500;
    let tooltipTarget = null;
    let tooltipTimer = null;

    function scheduleAbilityTooltip(target) {
      if (tooltipTimer !== null) window.clearTimeout(tooltipTimer);
      tooltipTimer = window.setTimeout(() => {
        tooltipTimer = null;
        showAbilityTooltip(target);
      }, ABILITY_TOOLTIP_DELAY);
    }

    function cancelAbilityTooltip() {
      if (tooltipTimer !== null) {
        window.clearTimeout(tooltipTimer);
        tooltipTimer = null;
      }
      hideAbilityTooltip();
    }

    function positionAbilityTooltip(target) {
      const rect = target.getBoundingClientRect();
      const tip = abilityTooltip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - tip.width / 2;
      let top = rect.bottom + 8;

      left = Math.max(8, Math.min(left, window.innerWidth - tip.width - 8));
      if (top + tip.height > window.innerHeight - 8) {
        top = rect.top - tip.height - 8;
      }
      top = Math.max(8, top);

      abilityTooltip.style.left = `${left}px`;
      abilityTooltip.style.top = `${top}px`;
    }

    function showAbilityTooltip(target) {
      const text = abilityTooltipTexts[target.dataset.tooltipKey];
      if (!text) return;

      abilityTooltip.innerHTML = text;
      abilityTooltip.hidden = false;
      tooltipTarget = target;
      positionAbilityTooltip(target);
    }

    function hideAbilityTooltip() {
      abilityTooltip.hidden = true;
      tooltipTarget = null;
    }

    const referenceTooltipContents = {
      hometown: `<span class="reference-title">费伦故乡信息 Homelands of Faerûn</span>${window.__DND_HOMETOWN_LORE__ || "<p>故乡资料未加载。</p>"}`,
      "skill-proficiency": `<span class="reference-title">技能熟练 Skill Proficiency</span>
<p><b>X：</b>无熟练<br><b>O：</b>有熟练<br><b>🅞：</b>专精</p>
<p>当你使用你熟练的技能进行检定的时候，可以加入熟练加值。如果你专精该技能，则可以加入双倍熟练加值。</p>
<p>注意：技能熟练并不叠加，即便你获得了多次相同技能的熟练，也不会变成专精。只有特定职业，例如游荡者、游侠或法师的职业特性会让你可以专精一个技能。</p>`,
      "feat-overview": `<span class="reference-title">专长 Feat</span>
<p>你的背景会给予你一个起源专长。</p>
<p>达到一定等级时，通常是4级后，你的职业也会为你提供属性值提升专长，或者也允许你选择另一项你符合条件的专长。</p>
<p>起源专长并非只有1级的时候可以从背景获得，即便你已经抵达4级或更高等级，你也依然可以选取起源专长。如果你的职业有战斗风格特性，你也可以选取更多其他的战斗风格专长。但是要注意你是否满足选取这些专长的条件，例如有些专长可能对你的种族或者属性值有要求。</p>
<p><b>专长的组成部分 Parts of a Feat</b></p>
<p>专长由以下几种部分组成，这些部分列于专长名称之后：</p>
<p><b>分类Category。</b>每个专长都有自己的分类，并会在专长描述中标明它属于哪一种。当你被要求从某个特定分类中选择专长，例如从起源分类中进行选择时，你所选的专长分类必须有写在专长的名字正下方。如果你被要求选择专长而不限定分类时，你可以从任何分类中选择专长。</p>
<p><b>先决Prerequisite。</b>为了选择*某个专长，你必须满足其描述部分的先决条件，除非某个特性允许你无视先决选择该专长。如果一个专长的先决包括职业，那你必须至少有一级对应的职业等级才能选择这个专长。</p>
<p>*译注：此处的选择原文为take a feat，外网玩家表示这个句子包含了维持专长的引申义，仅供参考</p>
<p><b>增益Benefit。</b>专长的具体效益会在先决描述下详细列出。如果你获得了一个专长，你就会获得其增益。</p>
<p><b>复选Repeatable。</b>每个专长都只能选择一次，除非在描述部分的“复选”部分明确允许。</p>`,
      language: `<span class="reference-title">选择语言 Choose Languages</span>
<p>你的角色至少懂得三门语言：通用语，加上两种你从标准语言表直接或掷骰选取的语言。懂得一门语言意味着你的角色能以之交流、阅读文字以及用其书写。你的职业和其他特性也可能让你懂得一门语言。</p>
<p>标准语言表列出了遍布于DND诸世界的语言。每一个玩家角色都懂得通用语这门源自位面大都会、多元宇宙之焦点——印记城——的语言。其他标准语言源自DND诸世界中最突出的那些种族的初代成员，并已经被广泛传播。</p>
<p><b>标准语言 Standard Language</b></p>
<table class="tooltip-language-table">
  <thead><tr><th>1d12</th><th>语言</th><th>起源</th></tr></thead>
  <tbody>
    <tr><td>—</td><td>通用语 Common</td><td>印记城</td></tr>
    <tr><td>1</td><td>通用手语 Common Sign Language</td><td>印记城</td></tr>
    <tr><td>2</td><td>龙语 Draconic</td><td>龙类</td></tr>
    <tr><td>3-4</td><td>矮人语 Dwarvish</td><td>矮人</td></tr>
    <tr><td>5-6</td><td>精灵语 Elvish</td><td>精灵</td></tr>
    <tr><td>7</td><td>巨人语 Giant</td><td>巨人</td></tr>
    <tr><td>8</td><td>侏儒语 Gnomish</td><td>侏儒</td></tr>
    <tr><td>9</td><td>地精语 Goblin</td><td>类地精 Goblinoids</td></tr>
    <tr><td>10-11</td><td>半身人语 Halfling</td><td>半身人</td></tr>
    <tr><td>12</td><td>兽人语 Orc</td><td>兽人</td></tr>
  </tbody>
</table>`,
      tool: `<span class="reference-title">工具熟练 Tool Proficiency</span>
<p>如果你具有某个工具的熟练，则你可以在使用这个工具进行任意属性检定时加入你的熟练加值。如果你同时拥有该次属性检定中所使用到的技能的熟练，你在这次检定中还会具有<b class="term-green">优势</b>。</p>
<p>你的特性或许会给予你某个工具的熟练。</p>`,
      "hp-growth": `<span class="reference-title">额外生命值成长</span>
<p>额外生命值成长，例如专长、种族、职业特性带来的每级生命值。</p>`,
      faith: `<span class="reference-title">费伦神系</span>
<table class="tooltip-deity-table">
  <thead><tr><th>神祇</th><th>典型崇拜者</th></tr></thead>
  <tbody>
    <tr><td>阿曼纳塔，太阳之神</td><td>农民、立法者、旅行者</td></tr>
    <tr><td>阿斯蒙蒂斯，放纵之神</td><td>腐败的政客、绝望的平民</td></tr>
    <tr><td>欧吕尔，寒冬之神</td><td>德鲁伊、寒冷地区的居民</td></tr>
    <tr><td>阿祖斯，法师之神</td><td>奥术施法者</td></tr>
    <tr><td>班恩，暴政之神</td><td>征服者、战士、武僧、暴君</td></tr>
    <tr><td>本莎芭，厄运之神</td><td>赌徒、红袍巫师、游荡者</td></tr>
    <tr><td>巴尔，谋杀之神</td><td>刺客、杀人犯</td></tr>
    <tr><td>裳缇亚，农业之神</td><td>农民、园丁、自耕农</td></tr>
    <tr><td>希瑞克，谎言之神</td><td>骗子、操纵者、渴求权力之人</td></tr>
    <tr><td>迪尼尔，写作之神</td><td>贤者、抄写员、学生、教师</td></tr>
    <tr><td>伊莉丝翠，歌谣与月光之神</td><td>剑舞者、精灵、表演艺术家</td></tr>
    <tr><td>埃达丝，和平之神</td><td>德鲁伊、和平主义者、垂死之人</td></tr>
    <tr><td>贡德，工艺之神</td><td>工匠、手工艺人、工程师、发明家</td></tr>
    <tr><td>海姆，守望之神</td><td>探险家、战士、警卫、圣武士</td></tr>
    <tr><td>伊尔马特，忍耐之神</td><td>武僧、受压迫者、穷人</td></tr>
    <tr><td>凯兰沃，死者之神</td><td>丧葬工作者、垂死之人</td></tr>
    <tr><td>洛山达，黎明与新生之神</td><td>贵族、运动员、商人、年轻人</td></tr>
    <tr><td>蕾拉，幻象之神</td><td>演员、骗子、幻术师、游荡者</td></tr>
    <tr><td>黎尔拉，欢乐之神</td><td>吟游诗人、舞者、诗人、狂欢者、歌手</td></tr>
    <tr><td>罗丝，蜘蛛之神</td><td>邪恶卓尔、幽暗地域旅行者</td></tr>
    <tr><td>劳薇塔，痛苦之神</td><td>遭受痛苦或背叛之人</td></tr>
    <tr><td>犸拉，猎杀之神</td><td>野蛮人、猎人、兽化人</td></tr>
    <tr><td>马斯克，盗贼之神</td><td>刺客、游荡者、盗贼、骗子</td></tr>
    <tr><td>梅丽凯，森林之神</td><td>妖精、林务员、游侠</td></tr>
    <tr><td>密里耳，诗歌之神</td><td>吟游诗人、演说家、诗人、歌手</td></tr>
    <tr><td>米尔寇，死亡之神</td><td>死灵法师、不死生物</td></tr>
    <tr><td>密斯特拉，魔法之神</td><td>任何使用魔法之人</td></tr>
    <tr><td>欧格玛，知识之神</td><td>档案管理员、制图师、贤者</td></tr>
    <tr><td>红骑士，策略之神</td><td>战士、游戏玩家、战略家</td></tr>
    <tr><td>塞伦涅，月亮之神</td><td>兽化人、水手、施法者</td></tr>
    <tr><td>莎尔，黑暗与失落之神</td><td>任何遭受痛苦或失落之人</td></tr>
    <tr><td>山达柯尔，旅行之神</td><td>向导、探险家、游侠、旅行者</td></tr>
    <tr><td>西凡纳斯，荒野自然之神</td><td>野蛮人、德鲁伊、游侠、木精灵</td></tr>
    <tr><td>淑妮，爱与美之神</td><td>艺术家、享乐主义者、恋人</td></tr>
    <tr><td>塔洛娜，毒药与疾病之神</td><td>遭受瘟疫之人</td></tr>
    <tr><td>塔洛斯，风暴之神</td><td>野蛮人、德鲁伊、掠夺者</td></tr>
    <tr><td>坦帕斯，战争之神</td><td>战士、雇佣兵、武者</td></tr>
    <tr><td>托姆，勇气与牺牲之神</td><td>守护者、骑士、圣武士</td></tr>
    <tr><td>泰摩拉，幸运之神</td><td>赌徒、竖琴手、商人、游荡者</td></tr>
    <tr><td>提尔，正义之神</td><td>法官、执法者、律师、圣武士</td></tr>
    <tr><td>安博里，海洋之神</td><td>沿海居民、水手</td></tr>
    <tr><td>渥金，贸易之神</td><td>商人、富人、交易者</td></tr>
  </tbody>
</table>`
    };

    const REFERENCE_TOOLTIP_DELAY = 500;
    let referenceTooltipTarget = null;
    let referenceTooltipTimer = null;
    let referenceTooltipHideTimer = null;
    let referenceTooltipSticky = false;
    let referenceTooltipPointerInside = false;
    let referenceTooltipDragState = null;
    const REFERENCE_TOOLTIP_MARGIN = 8;

    function scheduleReferenceTooltip(target) {
      if (referenceTooltipTimer !== null) window.clearTimeout(referenceTooltipTimer);
      referenceTooltipTimer = window.setTimeout(() => {
        referenceTooltipTimer = null;
        showReferenceTooltip(target);
      }, REFERENCE_TOOLTIP_DELAY);
    }

    function cancelReferenceTooltip() {
      if (referenceTooltipSticky) return;
      if (referenceTooltipTimer !== null) {
        window.clearTimeout(referenceTooltipTimer);
        referenceTooltipTimer = null;
      }
      if (referenceTooltipHideTimer !== null) {
        window.clearTimeout(referenceTooltipHideTimer);
        referenceTooltipHideTimer = null;
      }
      hideReferenceTooltip();
    }

    function scheduleReferenceTooltipHide() {
      if (referenceTooltipSticky) return;
      if (referenceTooltipHideTimer !== null) {
        window.clearTimeout(referenceTooltipHideTimer);
      }
      referenceTooltipHideTimer = window.setTimeout(() => {
        referenceTooltipHideTimer = null;
        hideReferenceTooltip();
      }, 160);
    }

    function getReferenceTooltipViewport() {
      const viewport = window.visualViewport;
      const left = viewport?.offsetLeft || 0;
      const top = viewport?.offsetTop || 0;
      const width = viewport?.width || window.innerWidth;
      const height = viewport?.height || window.innerHeight;
      return {
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height
      };
    }

    function isReferenceTooltipTouchLayout() {
      return window.matchMedia("(max-width: 620px)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0;
    }

    function getReferenceTooltipRightMargin() {
      if (isReferenceTooltipTouchLayout()) {
        return REFERENCE_TOOLTIP_MARGIN;
      }
      const scrollbarWidth = Math.max(
        0,
        window.innerWidth - document.documentElement.clientWidth
      );
      return REFERENCE_TOOLTIP_MARGIN + Math.max(12, scrollbarWidth);
    }

    function constrainReferenceTooltipToViewport() {
      if (referenceTooltip.hidden) return;

      const viewport = getReferenceTooltipViewport();
      const rightMargin = getReferenceTooltipRightMargin();
      const minimumLeft = viewport.left + REFERENCE_TOOLTIP_MARGIN;
      const maximumWidth = Math.max(
        160,
        viewport.width - REFERENCE_TOOLTIP_MARGIN - rightMargin
      );
      if (referenceTooltip.offsetWidth > maximumWidth) {
        referenceTooltip.style.width = `${maximumWidth}px`;
      }
      const maximumHeight = Math.max(
        160,
        viewport.height - REFERENCE_TOOLTIP_MARGIN * 2
      );
      if (referenceTooltip.offsetHeight > maximumHeight) {
        referenceTooltip.style.height = `${maximumHeight}px`;
      }

      const rect = referenceTooltip.getBoundingClientRect();
      const currentLeft = Number.parseFloat(referenceTooltip.style.left) || rect.left;
      const currentTop = Number.parseFloat(referenceTooltip.style.top) || rect.top;
      const maximumLeft = Math.max(
        minimumLeft,
        viewport.right - rect.width - rightMargin
      );
      const maximumTop = Math.max(
        viewport.top + REFERENCE_TOOLTIP_MARGIN,
        viewport.bottom - rect.height - REFERENCE_TOOLTIP_MARGIN
      );

      referenceTooltip.style.left = `${Math.min(
        Math.max(minimumLeft, currentLeft),
        maximumLeft
      )}px`;
      referenceTooltip.style.top = `${Math.min(
        Math.max(viewport.top + REFERENCE_TOOLTIP_MARGIN, currentTop),
        maximumTop
      )}px`;
    }

    function positionReferenceTooltip(target) {
      const rect = target.getBoundingClientRect();
      const tip = referenceTooltip.getBoundingClientRect();
      const viewport = getReferenceTooltipViewport();
      const rightMargin = getReferenceTooltipRightMargin();
      const minimumLeft = viewport.left + REFERENCE_TOOLTIP_MARGIN;
      let left = rect.left + rect.width / 2 - tip.width / 2;
      let top = rect.bottom + 8;

      left = Math.max(
        minimumLeft,
        Math.min(left, viewport.right - tip.width - rightMargin)
      );
      if (isReferenceTooltipTouchLayout()) {
        left = minimumLeft;
      }
      if (top + tip.height > viewport.bottom - REFERENCE_TOOLTIP_MARGIN) {
        top = rect.top - tip.height - 8;
      }
      top = Math.max(
        viewport.top + REFERENCE_TOOLTIP_MARGIN,
        Math.min(top, viewport.bottom - tip.height - REFERENCE_TOOLTIP_MARGIN)
      );

      referenceTooltip.style.left = `${left}px`;
      referenceTooltip.style.top = `${top}px`;
      constrainReferenceTooltipToViewport();
    }

    function beginReferenceTooltipDrag(event) {
      if (!referenceTooltipSticky || event.button !== 0) return;
      const target = event.target;
      if (target.closest(".spell-lookup-actions, .spell-lookup-note")) return;
      if (target !== referenceTooltip && !target.closest(".spell-lookup-head")) return;

      event.preventDefault();
      const rect = referenceTooltip.getBoundingClientRect();
      const pointerId = event.pointerId;
      referenceTooltipDragState = {
        pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        width: rect.width,
        height: rect.height
      };

      try {
        referenceTooltip.setPointerCapture(pointerId);
      } catch (error) {}

      const onMove = (moveEvent) => {
        const state = referenceTooltipDragState;
        if (!state || moveEvent.pointerId !== state.pointerId) return;
        const viewport = getReferenceTooltipViewport();
        const minimumLeft = viewport.left + REFERENCE_TOOLTIP_MARGIN;
        const maximumLeft = Math.max(
          minimumLeft,
          viewport.right - state.width - getReferenceTooltipRightMargin()
        );
        const maximumTop = Math.max(
          viewport.top + REFERENCE_TOOLTIP_MARGIN,
          viewport.bottom - state.height - REFERENCE_TOOLTIP_MARGIN
        );
        const left = Math.min(
          Math.max(minimumLeft, moveEvent.clientX - state.offsetX),
          maximumLeft
        );
        const top = Math.min(
          Math.max(viewport.top + REFERENCE_TOOLTIP_MARGIN, moveEvent.clientY - state.offsetY),
          maximumTop
        );
        referenceTooltip.style.left = `${left}px`;
        referenceTooltip.style.top = `${top}px`;
      };

      const finish = () => {
        referenceTooltipDragState = null;
        try {
          referenceTooltip.releasePointerCapture(pointerId);
        } catch (error) {}
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", finish, { once: true });
      window.addEventListener("pointercancel", finish, { once: true });
    }

    function beginTouchReferenceTooltipDrag(event) {
      if (!referenceTooltipSticky) return;
      const touch = event.touches[0];
      if (!touch) return;

      event.preventDefault();
      const rect = referenceTooltip.getBoundingClientRect();
      const state = {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
        width: rect.width,
        height: rect.height
      };

      const onMove = (moveEvent) => {
        const currentTouch = moveEvent.touches[0];
        if (!currentTouch) return;
        moveEvent.preventDefault();
        const viewport = getReferenceTooltipViewport();
        const minimumLeft = viewport.left + REFERENCE_TOOLTIP_MARGIN;
        const maximumLeft = Math.max(
          minimumLeft,
          viewport.right - state.width - getReferenceTooltipRightMargin()
        );
        const maximumTop = Math.max(
          viewport.top + REFERENCE_TOOLTIP_MARGIN,
          viewport.bottom - state.height - REFERENCE_TOOLTIP_MARGIN
        );
        referenceTooltip.style.left = `${Math.min(
          Math.max(minimumLeft, currentTouch.clientX - state.offsetX),
          maximumLeft
        )}px`;
        referenceTooltip.style.top = `${Math.min(
          Math.max(viewport.top + REFERENCE_TOOLTIP_MARGIN, currentTouch.clientY - state.offsetY),
          maximumTop
        )}px`;
      };

      const finish = () => {
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", finish);
        window.removeEventListener("touchcancel", finish);
      };

      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", finish, { once: true });
      window.addEventListener("touchcancel", finish, { once: true });
    }

    function beginTouchReferenceTooltipResize(event) {
      if (!referenceTooltipSticky) return;
      const touch = event.touches[0];
      if (!touch) return;

      event.preventDefault();
      const rect = referenceTooltip.getBoundingClientRect();
      const startX = touch.clientX;
      const startY = touch.clientY;
      const startWidth = rect.width;
      const startHeight = rect.height;
      const viewport = getReferenceTooltipViewport();
      const left = Number.parseFloat(referenceTooltip.style.left) || rect.left;
      const top = Number.parseFloat(referenceTooltip.style.top) || rect.top;
      const minimumLeft = viewport.left + REFERENCE_TOOLTIP_MARGIN;
      const rightLimit = viewport.right - getReferenceTooltipRightMargin();
      const maximumWidth = Math.max(240, rightLimit - minimumLeft);
      const maximumHeight = Math.max(
        220,
        viewport.bottom - REFERENCE_TOOLTIP_MARGIN - top
      );
      const minimumWidth = Math.min(240, startWidth);
      const minimumHeight = Math.min(220, startHeight);

      const onMove = (moveEvent) => {
        const currentTouch = moveEvent.touches[0];
        if (!currentTouch) return;
        moveEvent.preventDefault();
        const width = Math.min(
          Math.max(minimumWidth, startWidth + currentTouch.clientX - startX),
          maximumWidth
        );
        const height = Math.min(
          Math.max(minimumHeight, startHeight + currentTouch.clientY - startY),
          maximumHeight
        );
        const nextLeft = Math.max(
          minimumLeft,
          Math.min(left, rightLimit - width)
        );
        referenceTooltip.style.left = `${nextLeft}px`;
        referenceTooltip.style.width = `${width}px`;
        referenceTooltip.style.height = `${height}px`;
      };

      const finish = () => {
        constrainReferenceTooltipToViewport();
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", finish);
        window.removeEventListener("touchcancel", finish);
      };

      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", finish, { once: true });
      window.addEventListener("touchcancel", finish, { once: true });
    }

    function beginReferenceTooltipResize(event) {
      if (!referenceTooltipSticky || event.button !== 0) return;

      event.preventDefault();
      event.stopPropagation();
      const rect = referenceTooltip.getBoundingClientRect();
      const pointerId = event.pointerId;
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = rect.width;
      const startHeight = rect.height;
      const viewport = getReferenceTooltipViewport();
      const left = Number.parseFloat(referenceTooltip.style.left) || rect.left;
      const top = Number.parseFloat(referenceTooltip.style.top) || rect.top;
      const minimumLeft = viewport.left + REFERENCE_TOOLTIP_MARGIN;
      const rightLimit = viewport.right - getReferenceTooltipRightMargin();
      const maximumWidth = Math.max(
        240,
        rightLimit - minimumLeft
      );
      const maximumHeight = Math.max(
        220,
        viewport.bottom - REFERENCE_TOOLTIP_MARGIN - top
      );
      const minimumWidth = Math.min(240, startWidth);
      const minimumHeight = Math.min(220, startHeight);

      try {
        referenceTooltip.setPointerCapture(pointerId);
      } catch (error) {}

      const onMove = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        const width = Math.min(
          Math.max(minimumWidth, startWidth + moveEvent.clientX - startX),
          maximumWidth
        );
        const height = Math.min(
          Math.max(minimumHeight, startHeight + moveEvent.clientY - startY),
          maximumHeight
        );
        const nextLeft = Math.max(
          minimumLeft,
          Math.min(left, rightLimit - width)
        );
        referenceTooltip.style.left = `${nextLeft}px`;
        referenceTooltip.style.width = `${width}px`;
        referenceTooltip.style.height = `${height}px`;
      };

      const finish = () => {
        try {
          referenceTooltip.releasePointerCapture(pointerId);
        } catch (error) {}
        constrainReferenceTooltipToViewport();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", finish, { once: true });
      window.addEventListener("pointercancel", finish, { once: true });
    }

    function setReferenceFrameScale(frame, scale) {
      if (!frame) return;
      const value = Math.min(1, Math.max(0.5, Math.round(scale * 100) / 100));
      frame.dataset.iframeScale = String(value);
      frame.style.width = `${100 / value}%`;
      frame.style.height = `${100 / value}%`;
      frame.style.transform = `scale(${value})`;
    }

    function applyReferenceFrameScales() {
      for (const frame of referenceTooltip.querySelectorAll(".spell-lookup-frame")) {
        setReferenceFrameScale(frame, Number(frame.dataset.iframeScale) || 0.72);
      }
    }

    function showReferenceTooltip(target) {
      const key = target.dataset.referenceTooltip;
      const content = key === "spell-lookup"
        ? buildSpellLookupTooltip("main")
        : key === "spell-lookup-all"
          ? buildSpellLookupTooltip("all")
          : key === "class-lookup"
            ? buildClassFeatureLookupTooltip(target)
            : key === "feat-lookup"
              ? buildFeatLookupTooltip()
              : referenceTooltipContents[key];
      if (!content) return;

      if (referenceTooltipHideTimer !== null) {
        window.clearTimeout(referenceTooltipHideTimer);
        referenceTooltipHideTimer = null;
      }
      referenceTooltipSticky = key.startsWith("spell-lookup") ||
        key === "class-lookup" || key === "feat-lookup";
      referenceTooltip.classList.toggle("is-local-tooltip", !referenceTooltipSticky);
      referenceTooltip.classList.toggle("spell-lookup-tooltip", referenceTooltipSticky);
      referenceTooltip.classList.toggle(
        "spell-lookup-has-frame",
        referenceTooltipSticky && content.includes("spell-lookup-frame")
      );
      referenceTooltip.style.width = "";
      referenceTooltip.style.height = "";
      referenceTooltip.innerHTML = content;
      applyReferenceFrameScales();
      referenceTooltip.hidden = false;
      referenceTooltipTarget = target;
      positionReferenceTooltip(target);
      window.requestAnimationFrame(constrainReferenceTooltipToViewport);
    }

    function hideReferenceTooltip() {
      referenceTooltip.hidden = true;
      referenceTooltipTarget = null;
      referenceTooltipSticky = false;
      referenceTooltipPointerInside = false;
    }

    function handleMainClassChange() {
      syncSelectEmpty(classSelect);
      applyClassSaveDefaults();
      syncClassCustomUI();
      syncSpellcastingDefault();
      const hasClass = Boolean(classSelect.value);

      if (isCustomMainClass()) {
        if (!getLevel(levelInput)) levelInput.value = "1";
        updateSummary();
        customClassInput.focus();
        return;
      }

      if (!hasClass) {
        levelInput.value = "1";
        subclassSelect.dataset.lastValue = "";
        emptySubclass(subclassSelect, "—", true);
        updateSummary();
        return;
      }

      if (!getLevel(levelInput)) levelInput.value = "1";
      updateSubclassFor(classSelect, levelInput, subclassSelect, false);
    }

    function handleMultiClassChange() {
      syncSelectEmpty(multiClassSelect);
      syncClassCustomUI();
      syncSpellcastingDefault();
      const hasClass = Boolean(multiClassSelect.value);
      multiLevelInput.disabled = !hasClass;

      if (isCustomMultiClass()) {
        multiLevelInput.disabled = false;
        if (!getLevel(multiLevelInput)) multiLevelInput.value = "1";
        updateSummary();
        customMultiClassInput.focus();
        return;
      }

      if (!hasClass) {
        multiLevelInput.value = "1";
        multiSubclassSelect.dataset.lastValue = "";
        emptySubclass(multiSubclassSelect, "—", true);
        updateSummary();
        return;
      }

      if (!getLevel(multiLevelInput)) multiLevelInput.value = "1";
      updateSubclassFor(multiClassSelect, multiLevelInput, multiSubclassSelect, false);
    }

    populateClassSelect(classSelect, "请选择");
    populateClassSelect(multiClassSelect, "—");
    classSelect.value = "";
    multiClassSelect.value = "";
    syncSelectEmpty(classSelect);
    syncSelectEmpty(multiClassSelect);
    levelInput.value = "1";
    multiLevelInput.value = "1";
    multiLevelInput.disabled = true;
    emptySubclass(subclassSelect, "—", true);
    emptySubclass(multiSubclassSelect, "—", true);
    applyClassSaveDefaults();
    syncClassCustomUI();
    syncRaceCustomUI();
    syncSpellcastingDefault();

    updateSubrace();
    renderRaceTraits();
    renderBackgroundTraits();
    updateRaceCombatDefaults();
    renderSkillTables();
    updateSummary();

    for (const [inputId, outputId, type] of [
      ["builder-height", "builder-height-imperial", "height"],
      ["builder-weight", "builder-weight-imperial", "weight"]
    ]) {
      const input = document.getElementById(inputId);
      const output = document.getElementById(outputId);
      input?.addEventListener("input", () => updateUnitConversion(input, output, type));
      input?.addEventListener("change", () => updateUnitConversion(input, output, type));
    }
    updateUnitConversions();

    for (const row of abilityRows) {
      for (const field of ["initial", "background", "growth"]) {
        const input = document.getElementById(`ability-${row.key}-${field}`);
        if (!input) continue;
        decorateAbilityInput(input);
        input.addEventListener("input", updateDerivedStats);
      }
      const replacementInput = document.getElementById(`ability-${row.key}-correction`);
      if (replacementInput) {
        replacementInput.addEventListener("input", updateDerivedStats);
      }

      const saveCorrectionInput = document.getElementById(`save-${row.key}-correction`);
      if (saveCorrectionInput) {
        decorateAbilityInput(saveCorrectionInput);
        saveCorrectionInput.addEventListener("input", updateDerivedStats);
      }
    }

    for (const input of document.querySelectorAll(".save-prof-toggle")) {
      input.addEventListener("change", () => {
        if (input.checked) saveState.add(input.dataset.ability);
        else saveState.delete(input.dataset.ability);
        updateSaveToggleUI();
        updateDerivedStats();
      });
    }

    for (const row of abilityRows) {
      for (const [prefix, key] of [["mod", "mod"], ["save", "save"]]) {
        const output = document.getElementById(`${prefix}-${row.key}`);
        if (!output) continue;
        output.dataset.tooltipKey = `${key}-${row.key}`;
        output.tabIndex = 0;
        output.setAttribute("aria-describedby", "ability-tooltip");
      }
    }

    for (const target of document.querySelectorAll(
      ".ability-table [data-tooltip-key], .skill-table [data-tooltip-key]"
    )) {
      target.addEventListener("mouseenter", () => scheduleAbilityTooltip(target));
      target.addEventListener("mouseleave", cancelAbilityTooltip);
      target.addEventListener("focusin", () => scheduleAbilityTooltip(target));
      target.addEventListener("focusout", cancelAbilityTooltip);
      target.addEventListener("click", () => showAbilityTooltip(target));
    }

    document.addEventListener("pointerdown", (event) => {
      if (abilityTooltip.hidden) return;
      if (abilityTooltip.contains(event.target) || event.target.closest("[data-tooltip-key]")) return;
      cancelAbilityTooltip();
    });

    window.addEventListener("scroll", cancelAbilityTooltip, true);
    window.addEventListener("resize", cancelAbilityTooltip);

    setupClassFeatureLookupButtons();

    function bindReferenceTooltipTrigger(target) {
      if (!target || target.dataset.referenceEventsBound) return;
      target.dataset.referenceEventsBound = "1";
      target.addEventListener("mouseenter", () => scheduleReferenceTooltip(target));
      target.addEventListener("mouseleave", scheduleReferenceTooltipHide);
      target.addEventListener("focusin", () => scheduleReferenceTooltip(target));
      target.addEventListener("focusout", (event) => {
        if (target.dataset.referenceTooltip.startsWith("spell-lookup") ||
            target.dataset.referenceTooltip === "class-lookup") {
          if (event.relatedTarget instanceof Node &&
              referenceTooltip.contains(event.relatedTarget)) {
            return;
          }
          return;
        }
        if (referenceTooltipPointerInside) return;
        cancelReferenceTooltip();
      });

      if (!target.classList.contains("reference-click-help")) return;
      target.addEventListener("pointerdown", (event) => event.stopPropagation());
      target.addEventListener("contextmenu", (event) => event.preventDefault());
      target.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showReferenceTooltip(target);
      });
    }

    for (const target of document.querySelectorAll("[data-reference-tooltip]")) {
      bindReferenceTooltipTrigger(target);
    }

    document.addEventListener("pointerdown", (event) => {
      if (referenceTooltip.hidden) return;
      if (referenceTooltip.contains(event.target) || event.target.closest("[data-reference-tooltip]")) return;
      cancelReferenceTooltip();
    });

    referenceTooltip.addEventListener("click", (event) => {
      const featCategoryTab = event.target.closest("[data-feat-category-tab]");
      if (featCategoryTab) {
        setFeatLookupCategory(featCategoryTab.dataset.featCategoryTab);
        return;
      }
      const featPage = event.target.closest("[data-feat-page]");
      if (featPage) {
        setFeatLookupPage(featPage);
        return;
      }
      const pageTab = event.target.closest("[data-lookup-page-url]");
      if (pageTab) {
        const frame = referenceTooltip.querySelector(".spell-lookup-frame");
        if (!frame) return;
        frame.src = pageTab.dataset.lookupPageUrl;
        frame.title = pageTab.dataset.lookupPageTitle || "";
        for (const tab of referenceTooltip.querySelectorAll("[data-lookup-page-url]")) {
          tab.classList.toggle("is-active", tab === pageTab);
        }
        const titleNode = referenceTooltip.querySelector(".reference-title");
        if (titleNode && pageTab.dataset.lookupPageTitle) {
          titleNode.textContent = pageTab.dataset.lookupPageTitle;
        }
        const externalLink = referenceTooltip.querySelector(".spell-lookup-note a");
        if (externalLink) externalLink.href = pageTab.dataset.lookupPageUrl;
        return;
      }

      const button = event.target.closest("[data-iframe-zoom]");
      if (!button) return;
      const frame = referenceTooltip.querySelector(".spell-lookup-frame");
      if (!frame) return;
      const current = Number(frame.dataset.iframeScale) || 0.72;
      setReferenceFrameScale(frame, current + Number(button.dataset.iframeZoom) * 0.1);
    });

    referenceTooltip.addEventListener("pointerenter", () => {
      referenceTooltipPointerInside = true;
    });
    referenceTooltip.addEventListener("pointerleave", () => {
      referenceTooltipPointerInside = false;
    });
    referenceTooltip.addEventListener("pointerdown", (event) => {
      referenceTooltipPointerInside = true;
      if (event.pointerType === "touch") return;
      if (event.target.closest(".spell-lookup-resize")) {
        beginReferenceTooltipResize(event);
        return;
      }
      beginReferenceTooltipDrag(event);
    });
    referenceTooltip.addEventListener("touchstart", (event) => {
      const target = event.target;
      if (target.closest(".spell-lookup-actions, .spell-lookup-note")) return;
      if (target.closest(".spell-lookup-resize")) {
        beginTouchReferenceTooltipResize(event);
        return;
      }
      if (target === referenceTooltip || target.closest(".spell-lookup-head")) {
        beginTouchReferenceTooltipDrag(event);
      }
    }, { passive: false });
    referenceTooltip.addEventListener("mouseenter", () => {
      if (referenceTooltipHideTimer !== null) {
        window.clearTimeout(referenceTooltipHideTimer);
        referenceTooltipHideTimer = null;
      }
    });
    referenceTooltip.addEventListener("mouseleave", scheduleReferenceTooltipHide);
    referenceTooltip.addEventListener("click", (event) => {
      if (event.target.closest(".spell-lookup-close")) {
        event.preventDefault();
        event.stopPropagation();
        hideReferenceTooltip();
        return;
      }
      if (event.target.closest(".spell-lookup-back")) {
        event.preventDefault();
        event.stopPropagation();
        const frame = referenceTooltip.querySelector(".spell-lookup-frame");
        if (!frame) return;
        const source = frame.getAttribute("src");
        if (source) frame.src = source;
      }
    });

    window.addEventListener("scroll", (event) => {
      if (event.target instanceof Node && referenceTooltip.contains(event.target)) return;
      cancelReferenceTooltip();
    }, true);
    window.addEventListener("resize", () => {
      if (!referenceTooltip.hidden) constrainReferenceTooltipToViewport();
      cancelReferenceTooltip();
    });

    updateDerivedStats();

    raceSelect.addEventListener("change", () => {
      syncRaceCustomUI();
      updateSubrace();
      renderRaceTraits();
      updateRaceCombatDefaults();
      updateSummary();
      if (isCustomRace()) customRaceInput.focus();
    });
    subraceSelect.addEventListener("change", () => {
      subraceSelect.classList.toggle("is-empty", !subraceSelect.value);
      updateRaceCombatDefaults();
      updateSummary();
    });
    backgroundSelect.addEventListener("change", () => {
      renderBackgroundTraits();
      updateTraitRandomState();
    });
    alignmentSelect.addEventListener("change", updateTraitRandomState);
    for (const button of document.querySelectorAll(".trait-random")) {
      button.addEventListener("click", () => randomTraitForButton(button));
    }
    updateTraitRandomState();
    customRaceInput.addEventListener("input", updateSummary);
    raceReset.addEventListener("click", () => {
      raceSelect.value = "人类";
      customRaceInput.value = "";
      syncRaceCustomUI();
      updateSubrace();
      renderRaceTraits();
      updateRaceCombatDefaults();
      updateSummary();
      raceSelect.focus();
    });
    characterName.addEventListener("input", updateSummary);
    alignmentSelect.addEventListener("change", () => {
      alignmentSelect.classList.toggle("is-empty", !alignmentSelect.value);
      updateTraitRandomState();
    });

    classSelect.addEventListener("change", handleMainClassChange);
    levelInput.addEventListener("input", () => {
      clampLevelInput(levelInput);
      if (isCustomMainClass()) updateSummary();
      else updateSubclassFor(classSelect, levelInput, subclassSelect, true);
    });
    levelInput.addEventListener("change", () => {
      normalizeLevel(levelInput);
      if (isCustomMainClass()) updateSummary();
      else updateSubclassFor(classSelect, levelInput, subclassSelect, true);
    });
    subclassSelect.addEventListener("change", () => {
      subclassSelect.dataset.lastValue = subclassSelect.value;
      syncSelectEmpty(subclassSelect);
      if (subclassSelect.value === CUSTOM_VALUE) {
        syncSubclassCustomUI();
        customSubclassInput.focus();
      } else {
        customSubclassInput.value = "";
        syncSubclassCustomUI();
      }
      updateSummary();
    });

    subclassReset.addEventListener("click", () => {
      subclassSelect.value = "";
      subclassSelect.dataset.lastValue = "";
      customSubclassInput.value = "";
      syncSelectEmpty(subclassSelect);
      syncSubclassCustomUI();
      updateSummary();
      subclassSelect.focus();
    });

    multiClassSelect.addEventListener("change", handleMultiClassChange);
    multiLevelInput.addEventListener("input", () => {
      clampLevelInput(multiLevelInput);
      if (isCustomMultiClass()) updateSummary();
      else updateSubclassFor(multiClassSelect, multiLevelInput, multiSubclassSelect, true);
    });
    multiLevelInput.addEventListener("change", () => {
      normalizeLevel(multiLevelInput);
      if (isCustomMultiClass()) updateSummary();
      else updateSubclassFor(multiClassSelect, multiLevelInput, multiSubclassSelect, true);
    });
    multiSubclassSelect.addEventListener("change", () => {
      multiSubclassSelect.dataset.lastValue = multiSubclassSelect.value;
      syncSelectEmpty(multiSubclassSelect);
      updateSummary();
    });

    customClassInput.addEventListener("input", () => {
      updateSummary();
      syncClassFeatureEditors();
    });
    customSubclassInput.addEventListener("input", updateSummary);
    customMultiClassInput.addEventListener("input", () => {
      updateSummary();
      syncClassFeatureEditors();
    });
    customMultiSubclassInput.addEventListener("input", updateSummary);

    classReset.addEventListener("click", () => {
      classSelect.value = "";
      customClassInput.value = "";
      customSubclassInput.value = "";
      handleMainClassChange();
      classSelect.focus();
    });

    multiClassReset.addEventListener("click", () => {
      multiClassSelect.value = "";
      customMultiClassInput.value = "";
      customMultiSubclassInput.value = "";
      handleMultiClassChange();
      multiClassSelect.focus();
    });

    for (const input of document.querySelectorAll(".custom-save-check")) {
      input.addEventListener("change", () => {
        if (input.checked) saveState.add(input.dataset.ability);
        else saveState.delete(input.dataset.ability);
        updateSaveToggleUI();
        updateDerivedStats();
      });
    }

    combatHp.addEventListener("focus", () => {
      if (combatHp.classList.contains("is-default")) combatHp.select();
    });
    combatHp.addEventListener("input", () => {
      if (combatHp.value.trim() === "") {
        combatManual.hp = false;
        updateCombatStats();
      } else {
        combatManual.hp = true;
        combatHp.classList.remove("is-default");
      }
    });

    for (const [input, key] of [
      [combatInitiative, "initiative"],
      [combatPassive, "passive"],
      [combatSpellDc, "dc"],
      [combatSpellAttack, "attack"]
    ]) {
      input.addEventListener("focus", () => {
        if (input.classList.contains("is-default")) input.select();
      });
      input.addEventListener("input", () => {
        const raw = input.value.trim();
        const correction = getCombatCorrection(key);

        if (raw === "" || raw === "—" || !Number.isFinite(Number(raw))) {
          combatBaseManual[key] = false;
          updateCombatStats();
        } else {
          combatBase[key] = Number(raw) - correction;
          combatBaseManual[key] = true;
          input.classList.remove("is-default");
          updateCombatStats();
        }
      });
    }

    for (const input of [
      combatInitiativeCorrection,
      combatAcCorrection,
      combatPassiveCorrection,
      combatSpellDcCorrection,
      combatSpellAttackCorrection
    ]) {
      input.addEventListener("input", updateCombatStats);
    }

    for (const input of [
      combatResistance,
      combatImmunity,
      combatAdvantage,
      combatDarkvision,
      combatSize,
      combatSpeed
    ]) {
      input.addEventListener("input", () => input.classList.remove("is-default"));
    }

    function handlePlainTextPaste(event) {
      const clipboard = event.clipboardData;
      if (!clipboard) return;

      let text = clipboard.getData("text/plain");
      if (!text) {
        const html = clipboard.getData("text/html");
        if (html) {
          const doc = new DOMParser().parseFromString(html, "text/html");
          text = doc.body.textContent || "";
        }
      }

      event.preventDefault();
      text = text.replace(/\r?\n/g, " ");

      const input = event.currentTarget;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? start;
      input.setRangeText(text, start, end, "end");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }

    for (const input of document.querySelectorAll('.builder-basic-grid input[type="text"], #builder-race-custom')) {
      input.addEventListener("paste", handlePlainTextPaste);
    }

    equipmentArmorType.addEventListener("change", () => {
      populateArmorNames();
      updateArmorDefaults(true);
      updateCombatStats();
    });
    equipmentArmorName.addEventListener("change", () => {
      syncArmorCustomUI();
      updateArmorDefaults(true);
      updateCombatStats();
      if (equipmentArmorName.value === "自定义") equipmentArmorCustomName.focus();
    });

    equipmentArmorReset.addEventListener("click", () => {
      equipmentArmorName.value = "";
      equipmentArmorCustomName.value = "";
      syncArmorCustomUI();
      updateArmorDefaults(true);
      updateCombatStats();
      equipmentArmorName.focus();
    });
    equipmentArmorAc.addEventListener("input", () => {
      if (equipmentArmorAc.value.trim() === "") updateArmorDefaults(true);
      else equipmentArmorAc.classList.remove("is-default");
      updateCombatStats();
    });
    equipmentShieldAc.addEventListener("input", () => {
      if (equipmentShieldAc.value.trim() === "") {
        equipmentShieldAc.value = "2";
        equipmentShieldAc.classList.add("is-default");
      } else {
        equipmentShieldAc.classList.remove("is-default");
      }
      updateCombatStats();
      alignPlusIndicators();
    });

    equipmentShieldEquipped.addEventListener("change", updateCombatStats);

    window.addEventListener("resize", alignPlusIndicators);

    setupEquipmentActionColumn(equipmentWeaponTable);
    setupEquipmentActionColumn(magicEquipmentTable);
    for (const row of equipmentWeaponBody.querySelectorAll("tr")) {
      bindWeaponRow(row);
    }

    addEquipmentPlusButton(equipmentWeaponTable, "添加武器", () => {
      const row = createAddedWeaponRow();
      equipmentWeaponBody.append(row);
      row.querySelector(".equipment-weapon-name-select")?.focus();
    });
    addEquipmentPlusButton(magicEquipmentTable, "添加装备", () => {
      const row = createAddedMagicEquipmentRow();
      magicEquipmentBody.append(row);
      row.querySelector(".magic-equipment-name")?.focus();
    });

    populateArmorNames();
    updateArmorDefaults();

    combatSpellAbility.addEventListener("change", () => {
      combatSpellAbility.classList.toggle("is-empty", !combatSpellAbility.value);
      updateCombatStats();
    });

    professionCustomHitDie.addEventListener("change", updateCombatStats);

    for (const button of document.querySelectorAll(".custom-format")) {
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => {
        const editor = button.closest(".custom-race-editor, .class-feature-editor")?.querySelector(".custom-editor");
        if (editor) {
          applyCustomFormat(editor, button.dataset.format);
          scheduleUndoCapture(editor, true);
        }
      });
    }

    function watchPasteEditorContent(editor, scheduleParse) {
      if (!editor) return;
      const observer = new MutationObserver(() => {
        if (editor.textContent.trim()) scheduleParse(editor);
      });
      observer.observe(editor, { childList: true, subtree: true, characterData: true });
    }

    function setupClassFeatureEditorEvents(editor) {
      if (!editor || editor.dataset.classFeatureEventsBound) return;
      editor.dataset.classFeatureEventsBound = "1";
      editor.addEventListener("paste", handleRichPaste);
      editor.addEventListener("beforeinput", (event) => {
        const type = String(event.inputType || "").toLowerCase();
        if (type.includes("paste") || type === "insertfromdrop") {
          scheduleClassFeatureEditorParse(editor);
        }
      });
      editor.addEventListener("input", () => {
        if (editor.textContent.trim()) scheduleClassFeatureEditorParse(editor);
      });
      watchPasteEditorContent(editor, scheduleClassFeatureEditorParse);
    }

    for (const editor of document.querySelectorAll(".custom-editor")) {
      if (CLASS_FEATURE_EDITOR_IDS.has(editor.id)) {
        setupClassFeatureEditorEvents(editor);
      } else {
        editor.addEventListener("paste", handleRichPaste);
      }
    }

    function createPasteAddButton(onClick) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "paste-add-row-button";
      button.textContent = "+";
      button.title = "添加一行空白内容";
      button.setAttribute("aria-label", "添加一行空白内容");
      button.addEventListener("click", () => onClick());
      return button;
    }

    function setupPasteAddButtons() {
      for (const block of document.querySelectorAll(".class-feature-block")) {
        const content = block.querySelector(".custom-editor");
        if (!content) continue;
        let actions = block.querySelector(".class-feature-block-actions");
        if (!actions) {
          actions = document.createElement("div");
          actions.className = "class-feature-block-actions";
          block.append(actions);
          const lookup = block.querySelector(".class-feature-lookup");
          if (lookup) actions.append(lookup);
        }
        const lookup = block.querySelector(".class-feature-lookup");
        if (lookup) actions.prepend(lookup);
        let plus = actions.querySelector(".paste-add-row-button");
        if (!plus) {
          plus = createPasteAddButton(() => addBlankClassFeatureRow(content));
          actions.append(plus);
        } else if (lookup && plus.previousElementSibling !== lookup) {
          lookup.after(plus);
        }
      }
      const spellbookToolbar = document.querySelector(".spellbook-toolbar");
      if (spellbookToolbar && !spellbookToolbar.querySelector(".paste-add-row-button")) {
        spellbookToolbar.append(createPasteAddButton(addBlankSpellbookRow));
      }
    }

    const spellbookPasteEditor = document.getElementById("spellbook-paste");
    if (spellbookPasteEditor) {
      spellbookPasteEditor.addEventListener("paste", handleSpellbookPaste);
      spellbookPasteEditor.addEventListener("beforeinput", (event) => {
        const type = String(event.inputType || "").toLowerCase();
        if (type.includes("paste") || type === "insertfromdrop") {
          scheduleSpellbookEditorParse(spellbookPasteEditor);
        }
      });
      spellbookPasteEditor.addEventListener("input", () => {
        if (spellbookPasteEditor.textContent.trim()) {
          scheduleSpellbookEditorParse(spellbookPasteEditor);
        }
      });
      watchPasteEditorContent(spellbookPasteEditor, scheduleSpellbookEditorParse);
    }
    setupSpellbookSearch();
    document.getElementById("spellbook-table-stack")?.addEventListener("input", () => {
      updateSpellbookEmptyState();
      scheduleBuilderSave();
    });
    setupPasteAddButtons();
    updateSpellbookEmptyState();

    for (const input of document.querySelectorAll(".spell-list-input")) {
      input.addEventListener("input", () => {
        input.classList.remove("is-default");
        input.dataset.manualPrepared = "1";
        delete input.dataset.autoPreparedValue;
      });
    }

    for (const input of document.querySelectorAll(".language-tool-input.is-default")) {
      input.addEventListener("focus", () => input.select());
      input.addEventListener("input", () => input.classList.remove("is-default"));
    }

    for (const input of [spellCantripGift, spellAlwaysPrepared, spellGiftSpells]) {
      input.addEventListener("input", updateSpellcasting);
    }

    spellMainClass.addEventListener("change", updateSpellLookupButtonLabel);

    featAdd.addEventListener("click", addFeatRow);
    featStyleAdd.addEventListener("click", addCombatFeat);
    specialAbilityAdd.addEventListener("click", addSpecialAbility);
    createFeatRow(getFeatLevelDefaults()[0] ?? "");
    updateFeatAddState();

    function createBackpackDeleteButton(row, kind) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "backpack-delete";
      button.textContent = "×";
      button.title = "删除此行";
      button.setAttribute("aria-label", "删除此行");
      button.addEventListener("click", () => {
        row.remove();
        updateBackpackSection(kind);
        if (kind === "gear") updateBackpackGearTotals();
      });
      return button;
    }

    function createBackpackInput(className, label) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = `backpack-input ${className}`;
      input.autocomplete = "off";
      input.setAttribute("aria-label", label);
      return input;
    }

    function createBackpackCell(child) {
      const cell = document.createElement("td");
      cell.append(child);
      return cell;
    }

    function createBackpackTextarea(className, label) {
      const textarea = document.createElement("textarea");
      textarea.className = `backpack-input ${className} backpack-description`;
      textarea.rows = 1;
      textarea.wrap = "soft";
      textarea.autocomplete = "off";
      textarea.title = "双击展开或收起";
      textarea.setAttribute("aria-label", label);

      textarea.addEventListener("dblclick", () => {
        const expanded = textarea.classList.toggle("is-expanded");
        if (expanded) {
          textarea.rows = 6;
          textarea.style.height = "auto";
          textarea.style.height = `${Math.min(220, Math.max(56, textarea.scrollHeight))}px`;
        } else {
          textarea.rows = 1;
          textarea.style.height = "26px";
        }
      });

      return textarea;
    }

    function parseBackpackWeight(value) {
      if (value === "半磅") return 0.5;
      if (!value || /^(—|多种|多类)$/.test(value.trim())) return 0;
      const match = String(value).match(/\d+(?:\.\d+)?/);
      return match ? Number(match[0]) : 0;
    }

    function parseBackpackPrice(value) {
      if (!value || /^(—|多种|多类)$/.test(value.trim())) return 0;
      const match = String(value).match(/(\d+(?:\.\d+)?)\s*(GP|SP|CP)/i);
      if (!match) return 0;
      const amount = Number(match[1]);
      if (!Number.isFinite(amount)) return 0;
      const unit = match[2].toUpperCase();
      return unit === "GP" ? amount * 100 : unit === "SP" ? amount * 10 : amount;
    }

    function formatBackpackWeight(value) {
      if (!Number.isFinite(value) || value <= 0) return "0磅";
      return `${Number.isInteger(value) ? value : Number(value.toFixed(1))}磅`;
    }

    function formatBackpackPrice(copper) {
      if (!Number.isFinite(copper) || copper <= 0) return "0GP";
      const gp = Math.floor(copper / 100);
      const sp = Math.floor((copper % 100) / 10);
      const cp = copper % 10;
      const parts = [];
      if (gp) parts.push(`${gp}GP`);
      if (sp) parts.push(`${sp}SP`);
      if (cp) parts.push(`${cp}CP`);
      return parts.join(" ");
    }

    function formatLedgerCurrency(copper) {
      return formatBackpackPrice(Math.abs(copper));
    }

    function parseLedgerAmount(value) {
      const raw = String(value ?? "").trim();
      if (/^-?\d+$/.test(raw)) return Number(raw) * 100;
      return parseBackpackPrice(raw);
    }

    function updateLedgerTotals() {
      let income = 0;
      let expense = 0;

      for (const row of ledgerBody.querySelectorAll("tr")) {
        income += parseLedgerAmount(row.querySelector(".ledger-income-amount")?.value);
        expense += parseLedgerAmount(row.querySelector(".ledger-expense-amount")?.value);
      }

      const balance = income - expense;
      ledgerBalance.textContent = balance < 0
        ? `-${formatLedgerCurrency(balance)}`
        : formatLedgerCurrency(balance);
    }

    function normalizeLedgerAmount(input) {
      const raw = input.value.trim();
      if (/^-?\d+$/.test(raw)) input.value = `${raw}GP`;
      updateLedgerTotals();
    }

    function createLedgerRow(isFirst = false) {
      const row = document.createElement("tr");
      const fields = [
        ["ledger-income-name", "收入项目"],
        ["ledger-income-amount", "收入明细"],
        ["ledger-expense-name", "支出项目"],
        ["ledger-expense-amount", "支出明细"]
      ];

      for (const [className, label] of fields) {
        const cell = document.createElement("td");
        cell.className = className.includes("income") ? "ledger-income-cell" : "ledger-expense-cell";
        const input = document.createElement("input");
        input.type = "text";
        input.className = `ledger-input ${className}`;
        input.autocomplete = "off";
        input.setAttribute("aria-label", label);
        if (isFirst && className === "ledger-income-name") {
          input.placeholder = "起始资金";
        } else if (isFirst && className === "ledger-expense-name") {
          input.placeholder = "起始装备";
        }
        input.addEventListener("input", () => {
          updateLedgerTotals();
        });
        if (className.endsWith("-amount")) {
          input.addEventListener("change", () => normalizeLedgerAmount(input));
          input.addEventListener("blur", () => normalizeLedgerAmount(input));
        }
        cell.append(input);
        row.append(cell);
      }

      return row;
    }

    function addLedgerRow(focus = true) {
      const row = createLedgerRow(ledgerBody.children.length === 0);
      ledgerBody.append(row);
      updateLedgerTotals();
      if (!focus) return;
      const firstInput = row.querySelector(".ledger-income-name");
      if (firstInput) firstInput.focus();
    }

    function updateBackpackGearTotals() {
      let weight = 0;
      let price = 0;

      for (const row of backpackGearBody.querySelectorAll("tr")) {
        weight += parseBackpackWeight(row.querySelector(".backpack-gear-weight")?.value);
        price += parseBackpackPrice(row.querySelector(".backpack-gear-price")?.value);
      }

      backpackGearTotalWeight.textContent = formatBackpackWeight(weight);
      backpackGearTotalPrice.textContent = formatBackpackPrice(price);
    }

    function syncGearCustomUI(row) {
      const select = row.querySelector(".backpack-gear-select");
      const input = row.querySelector(".backpack-gear-custom-name");
      const reset = row.querySelector(".backpack-gear-custom-reset");
      if (!select || !input || !reset) return;

      const custom = select.value === CUSTOM_VALUE;
      select.hidden = custom;
      input.hidden = !custom;
      reset.hidden = !custom;
    }

    function applyGearDefaults(row) {
      const select = row.querySelector(".backpack-gear-select");
      const description = row.querySelector(".backpack-gear-description");
      const weight = row.querySelector(".backpack-gear-weight");
      const price = row.querySelector(".backpack-gear-price");
      syncGearCustomUI(row);
      const data = adventuringGearData[select.value] ||
        backpackWeaponData[select.value] ||
        backpackArmorData[select.value];

      if (!data) {
        description.value = "";
        weight.value = "";
        price.value = "";
        description.classList.remove("is-default");
        weight.classList.remove("is-default");
        price.classList.remove("is-default");
        updateBackpackGearTotals();
        return;
      }

      const descriptionText = adventuringGearDescriptions[select.value] || "";
      description.value = descriptionText;
      weight.value = data.weight;
      price.value = data.price;
      description.classList.toggle("is-default", Boolean(descriptionText));
      weight.classList.add("is-default");
      price.classList.add("is-default");
      updateBackpackGearTotals();
    }

    function createBackpackGearRow() {
      const row = document.createElement("tr");
      const select = document.createElement("select");
      select.className = "backpack-gear-select";
      select.setAttribute("aria-label", "冒险装备");

      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "—";
      select.appendChild(blank);

      const customOption = document.createElement("option");
      customOption.value = CUSTOM_VALUE;
      customOption.textContent = "自定义";
      select.appendChild(customOption);

      const appendGearGroup = (label, data) => {
        const separator = document.createElement("option");
        separator.value = "";
        separator.textContent = label;
        separator.disabled = true;
        select.appendChild(separator);
        for (const name of Object.keys(data)) {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          select.appendChild(option);
        }
      };
      appendGearGroup("——冒险装备——", adventuringGearData);
      appendGearGroup("——武器——", backpackWeaponData);
      appendGearGroup("——护甲——", backpackArmorData);

      const nameControl = document.createElement("div");
      nameControl.className = "backpack-name-control";
      const customName = createBackpackInput(
        "backpack-gear-custom-name",
        "自定义冒险装备名称"
      );
      customName.placeholder = "自定义装备";
      customName.hidden = true;
      const customReset = document.createElement("button");
      customReset.type = "button";
      customReset.className = "custom-reset backpack-gear-custom-reset";
      customReset.textContent = "×";
      customReset.title = "返回冒险装备选择";
      customReset.setAttribute("aria-label", "返回冒险装备选择");
      customReset.hidden = true;
      nameControl.append(select, customName, customReset);

      const description = createBackpackTextarea("backpack-gear-description", "冒险装备描述");
      const weight = createBackpackInput("backpack-gear-weight", "冒险装备重量");
      const price = createBackpackInput("backpack-gear-price", "冒险装备价格");

      select.addEventListener("change", () => {
        if (select.value === CUSTOM_VALUE) {
          customName.value = "";
          applyGearDefaults(row);
          customName.focus();
        } else {
          customName.value = "";
          applyGearDefaults(row);
        }
      });
      customReset.addEventListener("click", () => {
        select.value = "";
        customName.value = "";
        applyGearDefaults(row);
        select.focus();
      });
      for (const input of [description, weight, price]) {
        input.addEventListener("input", () => {
          input.classList.remove("is-default");
          updateBackpackGearTotals();
        });
      }

      const deleteCell = document.createElement("td");
      deleteCell.append(createBackpackDeleteButton(row, "gear"));
      row.append(
        createBackpackCell(nameControl),
        createBackpackCell(description),
        createBackpackCell(weight),
        createBackpackCell(price),
        deleteCell
      );
      syncGearCustomUI(row);
      return row;
    }

    function syncToolCustomUI(row) {
      const select = row.querySelector(".backpack-tool-select");
      const input = row.querySelector(".backpack-tool-custom-name");
      const reset = row.querySelector(".backpack-tool-custom-reset");
      if (!select || !input || !reset) return;

      const custom = select.value === CUSTOM_VALUE;
      select.hidden = custom;
      input.hidden = !custom;
      reset.hidden = !custom;
    }

    function applyToolDefaults(row) {
      const select = row.querySelector(".backpack-tool-select");
      const ability = row.querySelector(".backpack-tool-ability");
      const operation = row.querySelector(".backpack-tool-operation");
      const craft = row.querySelector(".backpack-tool-craft");
      const weight = row.querySelector(".backpack-tool-weight");
      const price = row.querySelector(".backpack-tool-price");
      syncToolCustomUI(row);
      const data = toolData[select.value];

      if (!data) {
        ability.value = "";
        operation.value = "";
        craft.value = "";
        weight.value = "";
        price.value = "";
        for (const element of [ability, operation, craft, weight, price]) {
          element.classList.remove("is-default");
        }
        return;
      }

      ability.value = data.ability;
      operation.value = data.operation;
      craft.value = data.craft;
      weight.value = data.weight;
      price.value = data.price;
      for (const element of [ability, operation, craft, weight, price]) {
        element.classList.add("is-default");
      }
    }

    function createBackpackToolRow() {
      const row = document.createElement("tr");

      const select = document.createElement("select");
      select.className = "backpack-tool-select";
      select.setAttribute("aria-label", "工具");
      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "—";
      select.appendChild(blank);

      const customOption = document.createElement("option");
      customOption.value = CUSTOM_VALUE;
      customOption.textContent = "自定义";
      select.appendChild(customOption);

      appendToolGroups(select);

      const nameControl = document.createElement("div");
      nameControl.className = "backpack-name-control";
      const customName = createBackpackInput(
        "backpack-tool-custom-name",
        "自定义工具名称"
      );
      customName.placeholder = "自定义工具";
      customName.hidden = true;
      const customReset = document.createElement("button");
      customReset.type = "button";
      customReset.className = "custom-reset backpack-tool-custom-reset";
      customReset.textContent = "×";
      customReset.title = "返回工具选择";
      customReset.setAttribute("aria-label", "返回工具选择");
      customReset.hidden = true;
      nameControl.append(select, customName, customReset);

      const ability = document.createElement("select");
      ability.className = "backpack-tool-ability";
      ability.setAttribute("aria-label", "工具属性");
      for (const value of ["", "力量", "敏捷", "体质", "智力", "感知", "魅力"]) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value || "—";
        ability.appendChild(option);
      }

      const operation = createBackpackTextarea("backpack-tool-operation", "工具操作");
      const craft = createBackpackInput("backpack-tool-craft", "工具制造");
      const weight = createBackpackInput("backpack-tool-weight", "工具重量");
      const price = createBackpackInput("backpack-tool-price", "工具价格");

      select.addEventListener("change", () => {
        if (select.value === CUSTOM_VALUE) {
          customName.value = "";
          applyToolDefaults(row);
          customName.focus();
        } else {
          customName.value = "";
          applyToolDefaults(row);
        }
      });
      customReset.addEventListener("click", () => {
        select.value = "";
        customName.value = "";
        applyToolDefaults(row);
        select.focus();
      });
      ability.addEventListener("change", () => ability.classList.remove("is-default"));
      for (const input of [operation, craft, weight, price]) {
        input.addEventListener("input", () => input.classList.remove("is-default"));
      }

      const deleteCell = document.createElement("td");
      deleteCell.append(createBackpackDeleteButton(row, "tool"));
      row.append(
        createBackpackCell(nameControl),
        createBackpackCell(ability),
        createBackpackCell(operation),
        createBackpackCell(craft),
        createBackpackCell(weight),
        createBackpackCell(price),
        deleteCell
      );
      syncToolCustomUI(row);
      return row;
    }

    function createBackpackMagicRow() {
      const row = document.createElement("tr");
      const name = createBackpackInput("backpack-magic-name", "魔法物品名称");

      const rarity = document.createElement("select");
      rarity.className = "backpack-rarity-select";
      rarity.setAttribute("aria-label", "魔法物品稀有度");
      for (const value of ["", "普通", "非普通", "珍稀", "极珍稀", "传说", "神器"]) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value || "—";
        rarity.appendChild(option);
      }

      const description = createBackpackTextarea("backpack-magic-description", "魔法物品描述");
      const weight = createBackpackInput("backpack-magic-weight", "魔法物品重量");
      const quantity = createBackpackInput("backpack-magic-quantity", "魔法物品数量");
      quantity.setAttribute("inputmode", "numeric");

      const gapCell = document.createElement("td");
      gapCell.className = "backpack-gap-cell";
      gapCell.textContent = "×";
      gapCell.setAttribute("aria-hidden", "true");

      const deleteCell = document.createElement("td");
      deleteCell.append(createBackpackDeleteButton(row, "magic"));

      row.append(
        createBackpackCell(name),
        createBackpackCell(rarity),
        createBackpackCell(description),
        createBackpackCell(weight),
        gapCell,
        createBackpackCell(quantity),
        deleteCell
      );
      return row;
    }

    const backpackBodies = {
      gear: backpackGearBody,
      tool: backpackToolBody,
      magic: backpackMagicBody
    };

    const backpackSections = {
      gear: backpackGearSection,
      tool: backpackToolSection,
      magic: backpackMagicSection
    };

    function addBackpackRow(kind, focus = false) {
      const row = kind === "gear"
        ? createBackpackGearRow()
        : kind === "tool"
          ? createBackpackToolRow()
          : createBackpackMagicRow();

      backpackBodies[kind].append(row);
      updateBackpackSection(kind);
      if (kind === "gear") updateBackpackGearTotals();

      if (focus) {
        const first = row.querySelector("input, select");
        if (first) first.focus();
      }
    }

    function updateBackpackSection(kind) {
      backpackSections[kind].hidden = backpackBodies[kind].children.length === 0;
    }

    backpackAddGear.addEventListener("click", () => addBackpackRow("gear", true));
    backpackAddTool.addEventListener("click", () => addBackpackRow("tool", true));
    backpackAddMagic.addEventListener("click", () => addBackpackRow("magic", true));

    addBackpackRow("gear");
    addBackpackRow("tool");
    addBackpackRow("magic");
    multiClassAdd.addEventListener("click", addExtraMultiRow);
    updateExtraMultiAddState();

    languageAdd.addEventListener("click", () => {
      const row = createLanguageToolRow("language", true);
      languageBody.append(row);
      row.querySelector("input")?.focus();
    });
    toolAdd.addEventListener("click", () => {
      const row = createLanguageToolRow("tool", true);
      toolBody.append(row);
      row.querySelector("input")?.focus();
    });

    ledgerAdd.addEventListener("click", addLedgerRow);
    addLedgerRow(false);
    addLedgerRow(false);
    addLedgerRow(false);

    for (const cell of languageBody.querySelectorAll("td:not(.language-action-cell)")) {
      const input = cell.querySelector("input.language-tool-input");
      if (input) {
        cell.replaceChildren(createLanguageControl(input.value));
      }
    }

    for (const cell of toolBody.querySelectorAll("td:not(.language-action-cell)")) {
      if (cell.querySelector("input.language-tool-input")) {
        cell.replaceChildren(createLanguageToolControl());
      }
    }

    setupAppearanceImageInteraction();

    builderPanel.addEventListener("input", updateDstCommand);
    builderPanel.addEventListener("change", updateDstCommand);
    builderPanel.addEventListener("click", (event) => {
      const toggle = event.target.closest(".feature-table-toggle");
      if (toggle) {
        const nameRow = toggle.closest(".feature-name-row");
        if (nameRow) toggleFeatureRow(nameRow);
        return;
      }
      const remove = event.target.closest(".feature-table-delete");
      if (remove) {
        const nameRow = remove.closest(".feature-name-row");
        if (nameRow) deleteFeatureRow(nameRow);
      }
    });
    builderPanel.addEventListener("dblclick", (event) => {
      const cell = event.target.closest(".feature-name-cell, .feature-details-cell");
      if (!cell) return;
      const nameRow = cell.closest(".feature-name-row") ||
        cell.closest(".feature-details-row")?.previousElementSibling;
      if (nameRow) toggleFeatureRow(nameRow);
    });
    updateDstCommand();

    initializeBuilderPersistence();

    builderPanel.addEventListener("pointerdown", (event) => {
      const select = event.target.closest("#builder-subclass, .profession-row-subclass");
      if (select) restoreSubclassOptionLabels(select);
    }, true);
    builderPanel.addEventListener("keydown", (event) => {
      const select = event.target.closest("#builder-subclass, .profession-row-subclass");
      if (select && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        restoreSubclassOptionLabels(select);
      }
    }, true);
    builderPanel.addEventListener("change", (event) => {
      const select = event.target.closest("#builder-subclass, .profession-row-subclass");
      if (select) syncSubclassOptionLabels(select);
    }, true);
    builderPanel.addEventListener("focusout", (event) => {
      const select = event.target.closest("#builder-subclass, .profession-row-subclass");
      if (select) syncSubclassOptionLabels(select);
    }, true);

    builderPanel.addEventListener("input", handleUndoActivity, true);
    builderPanel.addEventListener("change", handleUndoActivity, true);
    document.addEventListener("keydown", handleUndoShortcut);
    undoManager.lastState = captureUndoState();
  })();


