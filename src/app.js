import {
  BASE_RATES,
  CHARACTERS,
  PITY,
  QUEST_TEMPLATES,
  RARITY_COLORS,
  SHARDS_FROM_DUP,
  STARTER,
  UPGRADES,
} from "./data.js";
import { clamp01, pickWeighted, randInt } from "./rng.js";
import { clearSave, loadSave, saveGame, todayKey } from "./storage.js";

const els = {
  currency: document.getElementById("currency"),
  luck: document.getElementById("luck"),
  shards: document.getElementById("shards"),
  uniqueCount: document.getElementById("uniqueCount"),

  statRolls: document.getElementById("statRolls"),
  statPityS: document.getElementById("statPityS"),
  statPityA: document.getElementById("statPityA"),

  pitySLabel: document.getElementById("pitySLabel"),
  pityALabel: document.getElementById("pityALabel"),
  pitySBar: document.getElementById("pitySBar"),
  pityABar: document.getElementById("pityABar"),

  resultCard: document.getElementById("resultCard"),
  resultLog: document.getElementById("resultLog"),

  rollCost1: document.getElementById("rollCost1"),
  btnRoll1: document.getElementById("btnRoll1"),
  btnRoll10: document.getElementById("btnRoll10"),
  btnSave: document.getElementById("btnSave"),
  btnReset: document.getElementById("btnReset"),

  navItems: Array.from(document.querySelectorAll(".nav__item")),
  panes: Array.from(document.querySelectorAll("[data-pane]")),

  collectionGrid: document.getElementById("collectionGrid"),
  collectionFilter: document.getElementById("collectionFilter"),
  btnSortCollection: document.getElementById("btnSortCollection"),

  upgradeList: document.getElementById("upgradeList"),

  questList: document.getElementById("questList"),
  btnRerollQuests: document.getElementById("btnRerollQuests"),
};

/** @typedef {{id:string,name:string,rarity:"S"|"A"|"B"|"C",blurb:string, passive?: any}} Character */

const DEFAULT_STATE = () => ({
  v: 1,
  cubes: STARTER.cubes,
  shards: STARTER.shards,
  rolls: 0,
  pityS: 0,
  pityA: 0,
  collection: /** @type {Record<string, {count:number, firstAt:number}>} */ ({}),
  upgrades: /** @type {Record<string, number>} */ ({
    luck: 0,
    income: 0,
    discount: 0,
    questing: 0,
  }),
  quests: /** @type {Array<{id:string,title:string,type:string,target:number,progress:number,reward:number,rarity?:string,claimed?:boolean}>} */ (
    []
  ),
  questDay: "",
  stats: {
    gotS: 0,
    gotA: 0,
    shardsEarned: 0,
  },
  flags: {
    sorted: true,
  },
});

/** @type {ReturnType<typeof DEFAULT_STATE>} */
let state = hydrate(loadSave());

function hydrate(save) {
  const base = DEFAULT_STATE();
  if (!save) return ensureQuests(base);

  const merged = {
    ...base,
    ...save,
    stats: { ...base.stats, ...(save.stats || {}) },
    upgrades: { ...base.upgrades, ...(save.upgrades || {}) },
    flags: { ...base.flags, ...(save.flags || {}) },
  };
  if (!merged.collection || typeof merged.collection !== "object") merged.collection = {};
  if (!Number.isFinite(merged.cubes)) merged.cubes = base.cubes;
  if (!Number.isFinite(merged.shards)) merged.shards = base.shards;
  if (!Number.isFinite(merged.rolls)) merged.rolls = base.rolls;
  if (!Number.isFinite(merged.pityS)) merged.pityS = base.pityS;
  if (!Number.isFinite(merged.pityA)) merged.pityA = base.pityA;
  return ensureQuests(merged);
}

function ensureQuests(s) {
  const t = todayKey();
  if (s.questDay !== t || !Array.isArray(s.quests) || s.quests.length === 0) {
    s.questDay = t;
    s.quests = rollDailyQuests();
  }
  return s;
}

function rollDailyQuests() {
  const pool = QUEST_TEMPLATES.slice();
  const picked = [];
  while (picked.length < 3 && pool.length) {
    const idx = randInt(0, pool.length - 1);
    const q = pool.splice(idx, 1)[0];
    picked.push({
      id: `${q.id}_${Date.now()}_${picked.length}`,
      title: q.title,
      type: q.type,
      target: q.target,
      progress: 0,
      reward: q.reward,
      rarity: q.rarity,
      claimed: false,
    });
  }
  return picked;
}

function effectiveLuckPercent() {
  const lvl = state.upgrades.luck || 0;
  const base = 0.0 + lvl * 0.35; // 0..7%

  let uniquePassives = 0;
  if (hasUnique("gojo_satoru")) uniquePassives += 0.6;

  return Math.min(14, base + uniquePassives);
}

function rollCost(mult) {
  const discLvl = state.upgrades.discount || 0;
  const discount = Math.min(0.30, discLvl * 0.02); // up to 30%
  const base = mult === 10 ? 95 : 10;

  let extraTenDiscount = 0;
  if (mult === 10 && hasUnique("kugisaki_nobara")) extraTenDiscount += 0.05;

  const finalDisc = clamp01(discount + extraTenDiscount);
  return Math.max(1, Math.round(base * (1 - finalDisc)));
}

function incomePerRoll() {
  const lvl = state.upgrades.income || 0;
  return lvl === 0 ? 0 : Math.round(0.8 + lvl * 1.15); // 2..30-ish
}

function questRewardMultiplier() {
  const lvl = state.upgrades.questing || 0;
  let mult = 1 + lvl * 0.05; // up to +75%
  if (hasUnique("fushiguro_megumi")) mult *= 1.12;
  return mult;
}

function pitySMax() {
  return PITY.S.cap;
}
function pityAMax() {
  return PITY.A.cap;
}

function hasUnique(id) {
  return Boolean(state.collection?.[id]?.count);
}

function addToCollection(char) {
  const entry = state.collection[char.id];
  if (!entry) {
    state.collection[char.id] = { count: 1, firstAt: Date.now() };
    return { isDup: false };
  }
  entry.count += 1;
  return { isDup: true, dupCount: entry.count - 1 };
}

function shardsFromDup(rarity) {
  const base = SHARDS_FROM_DUP[rarity] ?? 0;
  let mult = 1;
  if (hasUnique("sukuna_ryomen")) mult *= 1.25;
  return Math.round(base * mult);
}

function rollRarity() {
  // Hard pity first.
  if (state.pityS >= pitySMax() - 1) return "S";
  if (state.pityA >= pityAMax() - 1) return "A";

  const luck = effectiveLuckPercent() / 100;
  const s = clamp01(BASE_RATES.S + luck * 0.22);
  const a = clamp01(BASE_RATES.A + luck * 0.55);
  const b = BASE_RATES.B;
  const c = Math.max(0, 1 - (s + a + b));

  const r = Math.random();
  if (r < s) return "S";
  if (r < s + a) return "A";
  if (r < s + a + b) return "B";
  return "C";
}

/** @param {"S"|"A"|"B"|"C"} rarity */
function pickCharacterByRarity(rarity) {
  /** @type {Character[]} */
  const pool = CHARACTERS.filter((c) => c.rarity === rarity);
  if (pool.length === 0) return CHARACTERS[0];
  // Slightly favor not-yet-owned items to feel better without being a guarantee.
  const weighted = pool.map((c) => {
    const owned = state.collection[c.id]?.count || 0;
    const w = owned === 0 ? 1.35 : 1 / Math.min(3.5, owned);
    return { item: c, w };
  });
  return pickWeighted(weighted);
}

function applyMilestones() {
  if (!hasUnique("nanami_kento")) return;
  if (state.rolls > 0 && state.rolls % 10 === 0) {
    state.cubes += 6;
    pushLog({
      name: "Бонус Нанами",
      meta: "за 10 круток подряд",
      rarity: "B",
      extra: "+6 кубов",
    });
  }
}

function maybeRefund(cost) {
  if (!hasUnique("yuta_okkotsu")) return;
  if (Math.random() < 0.08) {
    const back = Math.max(1, Math.round(cost * 0.55));
    state.cubes += back;
    pushLog({
      name: "Рефанд Юты",
      meta: "иногда судьба возвращает часть цены",
      rarity: "A",
      extra: `+${back} кубов`,
    });
  }
}

function maybeJunkToShards() {
  if (!hasUnique("maki_zenin")) return 0;
  if (Math.random() < 0.18) return 3;
  return 0;
}

function updateQuests(event) {
  for (const q of state.quests) {
    if (q.claimed) continue;
    if (q.type === "rolls" && event.type === "roll") q.progress = Math.min(q.target, q.progress + 1);
    if (q.type === "roll10" && event.type === "roll10") q.progress = Math.min(q.target, q.progress + 1);
    if (q.type === "rarity" && event.type === "gotRarity" && q.rarity === event.rarity)
      q.progress = Math.min(q.target, q.progress + 1);
    if (q.type === "shardsEarn" && event.type === "shardsEarn") q.progress = Math.min(q.target, q.progress + event.amount);
    if (q.type === "unique" && event.type === "unique") q.progress = Math.min(q.target, q.progress + 1);
  }
}

function claimQuest(id) {
  const q = state.quests.find((x) => x.id === id);
  if (!q || q.claimed) return;
  if (q.progress < q.target) return;
  q.claimed = true;
  const reward = Math.round(q.reward * questRewardMultiplier());
  state.cubes += reward;
  pushLog({ name: "Награда за задание", meta: q.title, rarity: "B", extra: `+${reward} кубов` });
  renderAll();
  autosave();
}

function doRoll(mult) {
  state = ensureQuests(state);
  const cost = mult === 10 ? Math.round(rollCost(10) * 10) : rollCost(1);

  if (state.cubes < cost) {
    pushLog({ name: "Недостаточно кубов", meta: "сделай задания или улучшения", rarity: "C", extra: "" });
    renderAll();
    return;
  }

  state.cubes -= cost;
  let lastDrop = null;
  let gotAnyNew = 0;
  let shardsEarn = 0;

  for (let i = 0; i < mult; i++) {
    const rarity = rollRarity();
    const char = pickCharacterByRarity(rarity);
    const prevUnique = hasUnique(char.id);

    const addRes = addToCollection(char);
    const isDup = addRes.isDup;
    let extraText = "";

    if (!prevUnique) {
      gotAnyNew += 1;
      updateQuests({ type: "unique" });
    }

    // Pity update: only count when you didn't hit that tier.
    if (rarity === "S") state.pityS = 0;
    else state.pityS += 1;

    if (rarity === "A" || rarity === "S") state.pityA = 0;
    else state.pityA += 1;

    // Shards on duplicates.
    if (isDup) {
      const s = shardsFromDup(rarity) + maybeJunkToShards();
      if (s > 0) {
        state.shards += s;
        shardsEarn += s;
        state.stats.shardsEarned += s;
        extraText = `дубликат → +${s} осколков`;
        updateQuests({ type: "shardsEarn", amount: s });
      }
    }

    // Stats for quests.
    if (rarity === "S") {
      state.stats.gotS += 1;
      updateQuests({ type: "gotRarity", rarity: "S" });
    }
    if (rarity === "A") {
      state.stats.gotA += 1;
      updateQuests({ type: "gotRarity", rarity: "A" });
    }
    updateQuests({ type: "roll" });

    state.rolls += 1;
    applyMilestones();

    // Passive income per roll.
    const income = incomePerRoll();
    if (income > 0) state.cubes += income;

    lastDrop = { char, rarity, extraText };
    pushLog({
      name: char.name,
      meta: char.blurb,
      rarity,
      extra: extraText || (income > 0 ? `+${income} кубов (доход)` : ""),
    });
  }

  if (mult === 10) updateQuests({ type: "roll10" });
  maybeRefund(cost);

  // Tiny "pity boost" flavor for Yuji: 10% chance to reduce one pity step after a roll block.
  if (hasUnique("itadori_yuji") && Math.random() < 0.10) {
    state.pityA = Math.max(0, state.pityA - 1);
    state.pityS = Math.max(0, state.pityS - 1);
    pushLog({ name: "Настойчивость Юдзи", meta: "pity чуть ускорился", rarity: "C", extra: "-1 pity" });
  }

  if (lastDrop) {
    setResultCard(lastDrop.char, lastDrop.rarity, lastDrop.extraText);
  }

  renderAll();
  autosave();
}

function setResultCard(char, rarity, extraText) {
  const card = els.resultCard;
  card.classList.remove("rarity-S", "rarity-A", "rarity-B", "rarity-C");
  card.classList.add(`rarity-${rarity}`);

  card.querySelector(".resultcard__rarity").textContent = `Редкость ${rarity}`;
  card.querySelector(".resultcard__name").textContent = char.name;
  card.querySelector(".resultcard__desc").textContent = extraText ? `${char.blurb} (${extraText})` : char.blurb;
}

function pushLog({ name, meta, rarity, extra }) {
  const div = document.createElement("div");
  div.className = "logitem";
  const left = document.createElement("div");
  left.className = "logitem__left";
  const nm = document.createElement("div");
  nm.className = "logitem__name";
  nm.textContent = name;
  const m = document.createElement("div");
  m.className = "logitem__meta";
  m.textContent = meta;
  left.append(nm, m);

  const right = document.createElement("div");
  right.className = "logitem__right";
  right.style.color = RARITY_COLORS[rarity] || "var(--muted)";
  right.textContent = extra ? `${rarity} • ${extra}` : rarity;
  div.append(left, right);

  els.resultLog.prepend(div);
  while (els.resultLog.children.length > 30) els.resultLog.lastElementChild?.remove();
}

function renderTop() {
  els.currency.textContent = String(state.cubes);
  els.luck.textContent = `${effectiveLuckPercent().toFixed(1)}%`;
}

function renderStats() {
  els.statRolls.textContent = String(state.rolls);
  els.statPityS.textContent = String(Math.max(0, pitySMax() - state.pityS));
  els.statPityA.textContent = String(Math.max(0, pityAMax() - state.pityA));
}

function renderPity() {
  els.pitySLabel.textContent = `${state.pityS} / ${pitySMax()}`;
  els.pityALabel.textContent = `${state.pityA} / ${pityAMax()}`;
  els.pitySBar.style.width = `${Math.min(100, (state.pityS / pitySMax()) * 100)}%`;
  els.pityABar.style.width = `${Math.min(100, (state.pityA / pityAMax()) * 100)}%`;
}

function renderCosts() {
  els.rollCost1.textContent = String(rollCost(1));
  const cost10 = Math.round(rollCost(10) * 10);
  els.btnRoll10.querySelector(".btn__hint").textContent = `(стоимость: ${cost10})`;
}

function rarityRank(r) {
  return r === "S" ? 4 : r === "A" ? 3 : r === "B" ? 2 : 1;
}

function renderCollection() {
  if (!els.collectionGrid) return;
  els.shards.textContent = String(state.shards);

  const filter = els.collectionFilter?.value || "all";
  const items = CHARACTERS.slice().filter((c) => c.name && c.id);
  const shown = items.filter((c) => (filter === "all" ? true : c.rarity === filter));

  const unique = Object.keys(state.collection).length;
  els.uniqueCount.textContent = String(unique);

  const sorted = shown.sort((a, b) => {
    const ra = rarityRank(a.rarity);
    const rb = rarityRank(b.rarity);
    if (rb !== ra) return rb - ra;
    const ca = state.collection[a.id]?.count || 0;
    const cb = state.collection[b.id]?.count || 0;
    if (cb !== ca) return cb - ca;
    return a.name.localeCompare(b.name, "ru");
  });

  els.collectionGrid.innerHTML = "";
  for (const c of sorted) {
    const owned = state.collection[c.id]?.count || 0;
    const dups = Math.max(0, owned - 1);

    const card = document.createElement("div");
    card.className = `card rarity-${c.rarity}`;

    const top = document.createElement("div");
    top.className = "card__top";
    const name = document.createElement("div");
    name.className = "card__name";
    name.textContent = c.name;
    const rr = document.createElement("div");
    rr.className = "card__rarity";
    rr.style.color = RARITY_COLORS[c.rarity] || "var(--muted)";
    rr.textContent = c.rarity;
    top.append(name, rr);

    const desc = document.createElement("div");
    desc.className = "card__desc";
    desc.textContent = c.blurb;

    const bottom = document.createElement("div");
    bottom.className = "card__bottom";
    const b1 = document.createElement("div");
    b1.className = "badge";
    b1.textContent = owned > 0 ? `Есть: ${owned}` : "Не выбит";
    const b2 = document.createElement("div");
    b2.className = "badge badge--dup";
    b2.textContent = dups > 0 ? `Дубликаты: ${dups}` : "—";
    bottom.append(b1, b2);

    els.collectionGrid.append(card);
    card.append(top, desc, bottom);
  }
}

function upgradeCost(u, level) {
  return Math.round(u.baseCost * Math.pow(u.costGrowth, level));
}

function buyUpgrade(id) {
  const u = UPGRADES.find((x) => x.id === id);
  if (!u) return;
  const lvl = state.upgrades[id] || 0;
  if (lvl >= u.max) return;
  const cost = upgradeCost(u, lvl);
  if (state.shards < cost) return;
  state.shards -= cost;
  state.upgrades[id] = lvl + 1;
  pushLog({ name: "Улучшение", meta: u.title, rarity: "B", extra: `ур. ${lvl + 1}` });
  renderAll();
  autosave();
}

function renderUpgrades() {
  if (!els.upgradeList) return;
  els.upgradeList.innerHTML = "";
  for (const u of UPGRADES) {
    const lvl = state.upgrades[u.id] || 0;
    const maxed = lvl >= u.max;
    const cost = upgradeCost(u, lvl);

    const row = document.createElement("div");
    row.className = "row";
    const left = document.createElement("div");
    left.className = "row__left";
    const t = document.createElement("div");
    t.className = "row__title";
    t.textContent = u.title;
    const d = document.createElement("div");
    d.className = "row__desc";
    d.textContent = u.desc;
    left.append(t, d);

    const right = document.createElement("div");
    right.className = "row__right";
    const prog = document.createElement("div");
    prog.className = "row__progress";
    prog.textContent = `${lvl} / ${u.max}`;
    const costEl = document.createElement("div");
    costEl.className = "row__cost";
    costEl.textContent = maxed ? "MAX" : `Цена: ${cost} осколков`;
    const btn = document.createElement("button");
    btn.className = "btn btn--primary";
    btn.type = "button";
    btn.textContent = maxed ? "Куплено" : "Купить";
    btn.disabled = maxed || state.shards < cost;
    btn.addEventListener("click", () => buyUpgrade(u.id));

    right.append(prog, costEl, btn);
    row.append(left, right);
    els.upgradeList.append(row);
  }
}

function renderQuests() {
  if (!els.questList) return;
  els.questList.innerHTML = "";
  for (const q of state.quests) {
    const row = document.createElement("div");
    row.className = "row";
    const left = document.createElement("div");
    left.className = "row__left";
    const t = document.createElement("div");
    t.className = "row__title";
    t.textContent = q.title;
    const d = document.createElement("div");
    d.className = "row__desc";
    const pct = Math.round((q.progress / q.target) * 100);
    d.textContent = `Прогресс: ${q.progress} / ${q.target} (${Math.min(100, pct)}%)`;
    left.append(t, d);

    const right = document.createElement("div");
    right.className = "row__right";
    const reward = Math.round(q.reward * questRewardMultiplier());
    const costEl = document.createElement("div");
    costEl.className = "row__cost";
    costEl.textContent = q.claimed ? "Получено" : `Награда: ${reward} кубов`;
    const btn = document.createElement("button");
    btn.className = "btn btn--glow";
    btn.type = "button";
    btn.textContent = q.claimed ? "Готово" : "Забрать";
    btn.disabled = q.claimed || q.progress < q.target;
    btn.addEventListener("click", () => claimQuest(q.id));
    right.append(costEl, btn);

    row.append(left, right);
    els.questList.append(row);
  }
}

function renderAll() {
  renderTop();
  renderStats();
  renderPity();
  renderCosts();
  renderCollection();
  renderUpgrades();
  renderQuests();
}

let saveTimer = null;
function autosave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveGame(state), 250);
}

function setTab(tab) {
  for (const b of els.navItems) b.classList.toggle("is-active", b.dataset.tab === tab);
  for (const p of els.panes) p.classList.toggle("is-hidden", p.dataset.pane !== tab);
  autosave();
}

function wireUI() {
  for (const b of els.navItems) {
    b.addEventListener("click", () => setTab(b.dataset.tab));
  }

  els.btnRoll1.addEventListener("click", () => doRoll(1));
  els.btnRoll10.addEventListener("click", () => doRoll(10));

  els.btnSave.addEventListener("click", () => {
    saveGame(state);
    pushLog({ name: "Сохранено", meta: "прогресс записан в браузер", rarity: "C", extra: "" });
    renderAll();
  });

  els.btnReset.addEventListener("click", () => {
    const ok = confirm("Сбросить прогресс? Это нельзя отменить.");
    if (!ok) return;
    clearSave();
    state = ensureQuests(DEFAULT_STATE());
    els.resultLog.innerHTML = "";
    setResultCard({ name: "Новый старт", blurb: "Прогресс сброшен. Удачи.", id: "x", rarity: "C" }, "C", "");
    renderAll();
    saveGame(state);
  });

  els.collectionFilter?.addEventListener("change", () => renderCollection());
  els.btnSortCollection?.addEventListener("click", () => {
    state.flags.sorted = !state.flags.sorted;
    renderCollection();
    autosave();
  });

  els.btnRerollQuests?.addEventListener("click", () => {
    state.questDay = "";
    state = ensureQuests(state);
    pushLog({ name: "Задания обновлены", meta: "новые контракты на сегодня", rarity: "B", extra: "" });
    renderAll();
    autosave();
  });
}

wireUI();
renderAll();
saveGame(state);

