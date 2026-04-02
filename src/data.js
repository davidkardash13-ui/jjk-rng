export const RARITIES = /** @type {const} */ ({
  S: "S",
  A: "A",
  B: "B",
  C: "C",
});

export const RARITY_COLORS = {
  S: "var(--s)",
  A: "var(--a)",
  B: "var(--b)",
  C: "var(--c)",
};

/** Weighted list of characters. Names are "по мотивам" and not plot-heavy. */
export const CHARACTERS = [
  // S
  {
    id: "gojo_satoru",
    name: "Годзё Сатору",
    rarity: "S",
    blurb: "Абсолютная уверенность. Абсолютная редкость.",
    passive: { type: "luck", value: 0.6 }, // +0.6% luck per unique owned (applied once)
  },
  {
    id: "sukuna_ryomen",
    name: "Рёмен Сукуна",
    rarity: "S",
    blurb: "Опасная сила. Дубликаты дают больше осколков.",
    passive: { type: "shards_bonus", value: 0.25 }, // +25% shards from dups
  },
  {
    id: "yuta_okkotsu",
    name: "Оккоцу Юта",
    rarity: "S",
    blurb: "Непредсказуемый рывок. Иногда возвращает кубы.",
    passive: { type: "refund", value: 0.08 }, // 8% refund chance per roll
  },

  // A
  {
    id: "itadori_yuji",
    name: "Итадори Юдзи",
    rarity: "A",
    blurb: "Настойчивость. Pity растёт чуточку быстрее.",
    passive: { type: "pity_boost", value: 1 }, // +1 pity progress every 10 rolls (implemented as chance)
  },
  {
    id: "fushiguro_megumi",
    name: "Фушигуро Мэгуми",
    rarity: "A",
    blurb: "Тактика. Больше кубов за задания.",
    passive: { type: "quest_reward", value: 0.12 },
  },
  {
    id: "kugisaki_nobara",
    name: "Кугисаки Нобара",
    rarity: "A",
    blurb: "Жёсткий стиль. Скидка на крутку x10.",
    passive: { type: "ten_discount", value: 0.05 },
  },
  {
    id: "nanami_kento",
    name: "Нанами Кэнто",
    rarity: "A",
    blurb: "Планомерность. +кубы за каждые 10 круток.",
    passive: { type: "milestone", value: 6 }, // +6 cubes per 10 rolls
  },
  {
    id: "maki_zenin",
    name: "Дзэнин Маки",
    rarity: "A",
    blurb: "Дисциплина. Дубликаты чаще превращаются в осколки (вместо мусора).",
    passive: { type: "junk_to_shards", value: 0.18 },
  },

  // B
  { id: "panda", name: "Панда", rarity: "B", blurb: "Редкий гость среди обычных." },
  { id: "toge_inumaki", name: "Инумаки Тогэ", rarity: "B", blurb: "Лаконично. Эффективно." },
  { id: "mai_zenin", name: "Дзэнин Май", rarity: "B", blurb: "Сложный характер. Простой дроп." },
  { id: "miwa_kasumi", name: "Мива Касуми", rarity: "B", blurb: "Почти легенда. Почти." },
  { id: "utahime", name: "Утахимэ", rarity: "B", blurb: "Спокойствие и контроль." },
  { id: "todo_aoi", name: "Тодо Аои", rarity: "B", blurb: "Вайб решает. RNG тоже." },

  // C
  { id: "curse_charm", name: "Проклятый талисман", rarity: "C", blurb: "Мелочь, но копится." },
  { id: "paper_seal", name: "Бумажный печатник", rarity: "C", blurb: "Пахнет библиотекой и шансами." },
  { id: "training_tag", name: "Бирка тренировки", rarity: "C", blurb: "Прогресс из рутины." },
  { id: "broken_knife", name: "Сломанный нож", rarity: "C", blurb: "Не страшно. Утилизируем." },
  { id: "old_mask", name: "Старая маска", rarity: "C", blurb: "Смотрит в душу. И в pity." },
  { id: "luck_string", name: "Нить удачи", rarity: "C", blurb: "Почти магия. Почти работает." },
];

export const BASE_RATES = {
  S: 0.012, // 1.2%
  A: 0.07, // 7%
  B: 0.23, // 23%
  C: 1 - (0.012 + 0.07 + 0.23),
};

export const PITY = {
  S: { cap: 80 },
  A: { cap: 20 },
};

export const SHARDS_FROM_DUP = {
  S: 80,
  A: 20,
  B: 6,
  C: 2,
};

export const STARTER = {
  cubes: 90,
  shards: 0,
};

export const UPGRADES = [
  {
    id: "luck",
    title: "Удача",
    desc: "Повышает базовый шанс A и S (чуть-чуть, но постоянно).",
    max: 20,
    baseCost: 18,
    costGrowth: 1.22,
  },
  {
    id: "income",
    title: "Доход",
    desc: "Даёт кубы за каждую крутку (пассивный фарм).",
    max: 25,
    baseCost: 14,
    costGrowth: 1.18,
  },
  {
    id: "discount",
    title: "Скидка",
    desc: "Уменьшает стоимость крутки x1 и x10.",
    max: 12,
    baseCost: 22,
    costGrowth: 1.25,
  },
  {
    id: "questing",
    title: "Контракты",
    desc: "Увеличивает награды за задания и шанс получить доп. кубы.",
    max: 15,
    baseCost: 16,
    costGrowth: 1.20,
  },
];

export const QUEST_TEMPLATES = [
  { id: "rolls_10", title: "Сделай 10 круток", type: "rolls", target: 10, reward: 45 },
  { id: "rolls_25", title: "Сделай 25 круток", type: "rolls", target: 25, reward: 120 },
  { id: "get_A_1", title: "Выбей A (1 раз)", type: "rarity", rarity: "A", target: 1, reward: 70 },
  { id: "get_S_1", title: "Выбей S (1 раз)", type: "rarity", rarity: "S", target: 1, reward: 220 },
  { id: "shards_60", title: "Накопи 60 осколков", type: "shardsEarn", target: 60, reward: 75 },
  { id: "unique_8", title: "Собери 8 уникальных", type: "unique", target: 8, reward: 90 },
  { id: "roll10_1", title: "Сделай крутку x10", type: "roll10", target: 1, reward: 55 },
];

