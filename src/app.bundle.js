(() => {
  "use strict";

  // ===== data.js =====
  const RARITY_COLORS = {
    O: "var(--o)",
    SS: "var(--ss)",
    "S+": "var(--splus)",
    S: "var(--s)",
    A: "var(--a)",
    B: "var(--b)",
    C: "var(--c)",
  };

  function rarityCssClass(rarity) {
    if (rarity === "S+") return "rarity-Splus";
    if (rarity === "O") return "rarity-O";
    return `rarity-${rarity}`;
  }

  const CHARACTERS = [
    // S
    {
      id: "gojo_satoru",
      name: "Годзё Сатору",
      rarity: "S+",
      fullEvolveName: "Сатору Безграничный",
      blurb: "Абсолютная уверенность. Абсолютная редкость.",
      passive: { type: "luck", value: 0.6 },
    },
    {
      id: "sukuna_ryomen",
      name: "Рёмен Сукуна",
      rarity: "S+",
      fullEvolveName: "Хелан Сукуна",
      blurb: "Опасная сила. Дубликаты дают больше осколков.",
      passive: { type: "shards_bonus", value: 0.25 },
    },
    {
      id: "yuta_okkotsu",
      name: "Оккоцу Юта",
      rarity: "S",
      fullEvolveName: "Юта — Покровитель Рики",
      blurb: "Непредсказуемый рывок. Иногда возвращает кубы.",
      passive: { type: "refund", value: 0.08 },
    },

    // A
    {
      id: "itadori_yuji",
      name: "Итадори Юдзи",
      rarity: "A",
      fullEvolveName: "Юдзи — Носитель",
      blurb: "Настойчивость. Pity растёт чуточку быстрее.",
      passive: { type: "pity_boost", value: 1 },
    },
    {
      id: "mudolo_yuji",
      name: "Мудоло Юджи",
      rarity: "S+",
      fullEvolveName: "Мудоло Юджи — разрыв предела",
      blurb: "Иная грань носителя: сила на грани контроля.",
    },
    {
      id: "fushiguro_megumi",
      name: "Фушигуро Мэгуми",
      rarity: "A",
      fullEvolveName: "Мэгуми — Тень десяти",
      blurb: "Тактика. Больше кубов за задания.",
      passive: { type: "quest_reward", value: 0.12 },
    },
    {
      id: "kugisaki_nobara",
      name: "Кугисаки Нобара",
      rarity: "A",
      fullEvolveName: "Нобара — Гвозди судьбы",
      blurb: "Жёсткий стиль. Скидка на крутку x10.",
      passive: { type: "ten_discount", value: 0.05 },
    },
    {
      id: "nanami_kento",
      name: "Нанами Кэнто",
      rarity: "A",
      fullEvolveName: "Кэнто — Чёткие часы",
      blurb: "Планомерность. +кубы за каждые 10 круток.",
      passive: { type: "milestone", value: 6 },
    },
    {
      id: "maki_zenin",
      name: "Дзэнин Маки",
      rarity: "A",
      fullEvolveName: "Маки — Стекло клана",
      blurb: "Дисциплина. Дубликаты чаще превращаются в осколки (вместо мусора).",
      passive: { type: "junk_to_shards", value: 0.18 },
    },

    {
      id: "geto_suguru",
      name: "Гэто Сугуру",
      rarity: "S",
      fullEvolveName: "Гэто — Путь теней",
      blurb: "Идеал и жестокость в одном флаконе.",
    },
    {
      id: "yuki_tsukumo",
      name: "Цукумо Юки",
      rarity: "S",
      fullEvolveName: "Юки Звёздная",
      blurb: "Редкость звёздного уровня.",
    },
    {
      id: "hakari_kinji",
      name: "Хакари Киндзи",
      rarity: "S",
      fullEvolveName: "Хакари — Джекпот",
      blurb: "Ставка на удачу. Всегда.",
    },
    {
      id: "kashimo_hajime",
      name: "Касимо Хадзимэ",
      rarity: "S",
      fullEvolveName: "Касимо Громовержец",
      blurb: "Старый гром, новая игра.",
    },
    {
      id: "toji_fushiguro",
      name: "Фушигуро Тодзи",
      rarity: "S",
      fullEvolveName: "Тодзи Нулевой",
      blurb: "Тело без проклятой энергии — и без пощады.",
    },
    {
      id: "rika_orimoto",
      name: "Оримото Рика",
      rarity: "S",
      fullEvolveName: "Рика Вечная",
      blurb: "Обещание сильнее смерти.",
    },
    {
      id: "angel",
      name: "Ангел",
      rarity: "S",
      fullEvolveName: "Ангел — Печать Неба",
      blurb: "Свет, который не спрашивает разрешения.",
    },

    // B
    { id: "panda", name: "Панда", rarity: "B", fullEvolveName: "Панда — Ядро", blurb: "Редкий гость среди обычных." },
    { id: "toge_inumaki", name: "Инумаки Тогэ", rarity: "B", fullEvolveName: "Тогэ — Запретное слово", blurb: "Лаконично. Эффективно." },
    { id: "mai_zenin", name: "Дзэнин Май", rarity: "B", fullEvolveName: "Май — Отверженная сталь", blurb: "Сложный характер. Простой дроп." },
    { id: "miwa_kasumi", name: "Мива Касуми", rarity: "B", fullEvolveName: "Мива Новая сталь", blurb: "Почти легенда. Почти." },
    { id: "utahime", name: "Утахимэ", rarity: "B", fullEvolveName: "Утахимэ — Гимн", blurb: "Спокойствие и контроль." },
    { id: "todo_aoi", name: "Тодо Аои", rarity: "B", fullEvolveName: "Тодо — Бро на миллион", blurb: "Вайб решает. RNG тоже." },

    // A (ещё)
    {
      id: "ino_takuma",
      name: "Ино Такума",
      rarity: "A",
      fullEvolveName: "Ино — Наследник",
      blurb: "Тихий, пока не позовут.",
    },
    {
      id: "mei_mei",
      name: "Мэй Мэй",
      rarity: "A",
      fullEvolveName: "Мэй — Вороновод",
      blurb: "Вороны знают цену контракту.",
    },
    {
      id: "ui_ui",
      name: "Уи Уи",
      rarity: "A",
      fullEvolveName: "Уи — Опора",
      blurb: "Сестринская решимость.",
    },
    {
      id: "kusakabe_atsuya",
      name: "Кусакабэ Ацуя",
      rarity: "A",
      fullEvolveName: "Кусакабэ Стальной",
      blurb: "Простой стиль, тяжёлый удар.",
    },
    {
      id: "higuruma_hiromi",
      name: "Хигурума Хироми",
      rarity: "A",
      fullEvolveName: "Хигурума Судья",
      blurb: "Вердикт без колебаний.",
    },
    {
      id: "kurusu_hana",
      name: "Курусу Хана",
      rarity: "A",
      fullEvolveName: "Хана Исцеляющая",
      blurb: "Свет для союзников.",
    },
    {
      id: "takaba_takako",
      name: "Такаба",
      rarity: "SS",
      fullEvolveName: "Такаба — Комедиант",
      blurb: "Сцена — его домен.",
    },
    {
      id: "yuji_itadori_alt",
      name: "Сакамото (стиль)",
      rarity: "A",
      fullEvolveName: "Удар чистоты",
      blurb: "Чужой стиль, своя воля.",
    },
    {
      id: "zenin_naoya",
      name: "Дзэнин Наоя",
      rarity: "A",
      fullEvolveName: "Наоя — Наследие",
      blurb: "Токсичность как оружие.",
    },
    {
      id: "zenin_oji",
      name: "Дзэнин Одзи",
      rarity: "A",
      fullEvolveName: "Одзи Старый клан",
      blurb: "Старые правила.",
    },
    {
      id: "ino_momo",
      name: "Ино Момо",
      rarity: "A",
      fullEvolveName: "Момо — Швабра",
      blurb: "Летит выше, чем кажется.",
    },
    {
      id: "kamome",
      name: "Чайка (напарник)",
      rarity: "A",
      fullEvolveName: "Чайка — Разведка",
      blurb: "Глаза в небе.",
    },

    // B (ещё)
    { id: "inumaki_toge_alt", name: "Тогэ — слово", rarity: "B", fullEvolveName: "Тогэ Молчаливый гром", blurb: "Одно слово — и тишина." },
    { id: "miwa_kasumi_alt", name: "Мива — катана", rarity: "B", fullEvolveName: "Мива Новая сталь", blurb: "Сталь ученицы." },
    { id: "kokichi_muta", name: "Мута Кокити", rarity: "B", fullEvolveName: "Мехамару Полный", blurb: "Тело далеко, разум рядом." },
    { id: "kirara_hoshi", name: "Кирара Хоси", rarity: "B", fullEvolveName: "Кирара Звезда", blurb: "Притяжение странное." },
    { id: "reggie_star", name: "Реджи", rarity: "B", fullEvolveName: "Реджи Контракт", blurb: "Контракты как лезвия." },
    { id: "remi", name: "Рэми", rarity: "B", fullEvolveName: "Рэми Проводник", blurb: "Знает коридоры." },
    { id: "ogami_granny", name: "Бабушка Огами", rarity: "B", fullEvolveName: "Огами Ритуал", blurb: "Старый обряд." },
    { id: "junpei_yoshino", name: "Ёсино Дзюнпэй", rarity: "B", fullEvolveName: "Дзюнпэй — Искра", blurb: "Обидно и по-настоящему." },
    { id: "nitta_akari", name: "Нитта Акари", rarity: "B", fullEvolveName: "Нитта Исцеление", blurb: "Первая помощь магии." },
    { id: "ibaraki_shoko", name: "Ибараки Сёко", rarity: "B", fullEvolveName: "Сёко Медицина", blurb: "Лечит то, что сломано." },
    { id: "kusakabe_student", name: "Студент Кусакабэ", rarity: "B", fullEvolveName: "Ученик стали", blurb: "Ещё учится." },
    { id: "zenin_chojuro", name: "Дзэнин Тюдзюро", rarity: "B", fullEvolveName: "Тюдзюро Клан", blurb: "Тень клана." },
    { id: "dhruv_lakdawala", name: "Дхрув", rarity: "B", fullEvolveName: "Дхрув Слон", blurb: "Тяжёлый как слон." },
    { id: "charles_bernstein", name: "Чарльз", rarity: "B", fullEvolveName: "Чарльз Комикс", blurb: "Рисует судьбу." },
    { id: "fumihiko_takaba_alt", name: "Фанат такабы", rarity: "B", fullEvolveName: "Фанат №1", blurb: "Аплодирует стоя." },

    // C (ещё предметы и мелочь)
    { id: "curse_charm", name: "Проклятый талисман", rarity: "C", blurb: "Мелочь, но копится." },
    { id: "paper_seal", name: "Бумажный печатник", rarity: "C", blurb: "Пахнет библиотекой и шансами." },
    { id: "training_tag", name: "Бирка тренировки", rarity: "C", blurb: "Прогресс из рутины." },
    { id: "broken_knife", name: "Сломанный нож", rarity: "C", blurb: "Не страшно. Утилизируем." },
    { id: "old_mask", name: "Старая маска", rarity: "C", blurb: "Смотрит в душу. И в pity." },
    { id: "luck_string", name: "Нить удачи", rarity: "C", blurb: "Почти магия. Почти работает." },
    { id: "cursed_flower", name: "Проклятый цветок", rarity: "C", fullEvolveName: "Цветок · Полный расцвет", blurb: "Вянет медленно." },
    { id: "shadow_nail", name: "Тень гвоздя", rarity: "C", fullEvolveName: "Гвоздь · Вечная метка", blurb: "Один укол — и метка." },
    { id: "domain_shard", name: "Осколок домена", rarity: "C", fullEvolveName: "Осколок · Грань", blurb: "Кусочек чужого мира." },
    { id: "cursed_water", name: "Проклятая вода", rarity: "C", fullEvolveName: "Вода · Исток", blurb: "Течёт не туда." },
    { id: "spirit_ribbon", name: "Лента духа", rarity: "C", fullEvolveName: "Лента · Узел", blurb: "Связывает судьбу." },
    { id: "grade_scroll", name: "Свиток ранга", rarity: "C", fullEvolveName: "Свиток · Испытание", blurb: "Бумажная гордость." },
    { id: "shikigami_feather", name: "Перо сикигами", rarity: "C", fullEvolveName: "Перо · Зов", blurb: "Лёгкое, но злое." },
    { id: "barrier_chip", name: "Чип барьера", rarity: "C", fullEvolveName: "Барьер · Ядро", blurb: "Держит линию." },
    { id: "reversed_knife", name: "Обратный клинок", rarity: "C", fullEvolveName: "Клинок · Отражение", blurb: "Режет не так." },
    { id: "cursed_bell", name: "Проклятый колокол", rarity: "C", fullEvolveName: "Колокол · Отзвук", blurb: "Звонит один раз." },
    { id: "memory_photo", name: "Фото воспоминания", rarity: "C", fullEvolveName: "Снимок · Вечность", blurb: "Улыбка на бумаге." },
    { id: "black_flash_dust", name: "Пыль чёрной вспышки", rarity: "C", fullEvolveName: "Пыль · Импульс", blurb: "След удара." },
    { id: "simple_domain_seed", name: "Семя простого домена", rarity: "C", fullEvolveName: "Семя · Росток", blurb: "Маленький круг." },
    {
      id: "mahoraga_tamed",
      name: "Махорага",
      rarity: "SS",
      fromGacha: false,
      fullEvolveName: "Махорага — восьмикрылый союзник",
      blurb: "Только приручение в бою с испытанием. В баннере не выпадает.",
    },
    {
      id: "artifact_prison_realm",
      name: "Тюремная сфера (Гокумонкё)",
      rarity: "O",
      fromGacha: false,
      fullEvolveName: "Гокумонкё — заточение без выхода",
      blurb: "Проклятый объект из «Дзюдзюцу кайсен»: тюремная сфера, способная запечатать цель. Не падает из гачи.",
    },
    {
      id: "artifact_ten_shadows",
      name: "Техника десяти теней",
      rarity: "O",
      fromGacha: false,
      fullEvolveName: "Дзюдзюцу рода Дзэнин — десять сикигами",
      blurb: "Наследуемая техника клана Дзэнин / Фушигуро: призыв десяти сикигами. Из оригинала JJK.",
    },
    {
      id: "artifact_sukuna_fingers",
      name: "Пальцы Рёмена Сукуны",
      rarity: "O",
      fromGacha: false,
      fullEvolveName: "Двадцать пальцев короля проклятых",
      blurb: "Особые предметы силы Сукуны из «Дзюдзюцу кайсен». Только особая миссия.",
    },
    {
      id: "artifact_boss_chain",
      name: "Цепь на тысячу ли",
      rarity: "O",
      fromGacha: false,
      fullEvolveName: "Банри но кусари",
      blurb: "Проклятый инструмент из JJK: цепь Тодзи Фушигуро, растягивающаяся на огромное расстояние.",
    },
    {
      id: "artifact_shards_fate",
      name: "Небесное копьё-перевёртыш",
      rarity: "O",
      fromGacha: false,
      fullEvolveName: "Тэндзикухо — отмена сути",
      blurb: "Легендарное копьё из «Дзюдзюцу кайсен», обнуляющее техники при контакте.",
    },
    {
      id: "artifact_banner_peak",
      name: "Игривое облако",
      rarity: "O",
      fromGacha: false,
      fullEvolveName: "Юун — трёхсекционный посох",
      blurb: "Тяжёлый проклятый инструмент из JJK, не требующий проклятой энергии для силы удара.",
    },
  ];

  const BASE_RATES = {
    SS: 0.001,
    "S+": 0.0035,
    S: 0.0075,
    A: 0.07,
    B: 0.23,
    C: 1 - (0.001 + 0.0035 + 0.0075 + 0.07 + 0.23),
  };

  const PITY = {
    S: { cap: 80 },
    A: { cap: 20 },
  };

  const SHARDS_FROM_DUP = {
    O: 520,
    SS: 200,
    "S+": 120,
    S: 80,
    A: 20,
    B: 6,
    C: 2,
  };

  const STARTER = {
    cubes: 90,
    shards: 0,
  };

  /** Чит: кнопка «Получить всё» — ввод последовательности цифр на клавиатуре */
  const CHEAT_GET_ALL_CODE = "1778216";
  const CHEAT_MAX = Number.MAX_SAFE_INTEGER;
  const UI_INFINITY = "∞";

  function cheatInfinityUi() {
    return Boolean(state.flags?.cheatInfinityUi);
  }

  /** Кубы/осколки в шапке при чите — символ бесконечности */
  function fmtUiNum(n) {
    if (cheatInfinityUi()) return UI_INFINITY;
    return String(n);
  }

  const UPGRADES = [
    { id: "luck", title: "Удача", desc: "Повышает базовый шанс A и S (чуть-чуть, но постоянно).", max: 20, baseCost: 18, costGrowth: 1.22 },
    { id: "income", title: "Доход", desc: "Даёт кубы за каждую крутку (пассивный фарм).", max: 25, baseCost: 14, costGrowth: 1.18 },
    { id: "discount", title: "Скидка", desc: "Уменьшает стоимость крутки x1 и x10.", max: 12, baseCost: 22, costGrowth: 1.25 },
    { id: "questing", title: "Контракты", desc: "Увеличивает награды за задания и шанс получить доп. кубы.", max: 15, baseCost: 16, costGrowth: 1.2 },
  ];

  const QUEST_TEMPLATES = [
    { id: "rolls_10", title: "Сделай 10 круток", type: "rolls", target: 10, reward: 45 },
    { id: "rolls_25", title: "Сделай 25 круток", type: "rolls", target: 25, reward: 120 },
    { id: "get_A_1", title: "Выбей A (1 раз)", type: "rarity", rarity: "A", target: 1, reward: 70 },
    { id: "get_S_1", title: "Выбей S (1 раз)", type: "rarity", rarity: "S", target: 1, reward: 220 },
    { id: "shards_60", title: "Накопи 60 осколков", type: "shardsEarn", target: 60, reward: 75 },
    { id: "unique_8", title: "Собери 8 уникальных", type: "unique", target: 8, reward: 90 },
    { id: "roll10_1", title: "Сделай крутку x10", type: "roll10", target: 1, reward: 55 },
  ];

  /** Особые миссии: награды — предметы редкости O (не из гачи) */
  const SPECIAL_MISSIONS = [
    {
      id: "sm_prison",
      title: "Тюремная сфера (Гокумонкё)",
      desc: "Сделай 400 круток всего за игру.",
      type: "rolls_total",
      target: 400,
      rewardId: "artifact_prison_realm",
    },
    {
      id: "sm_ten_shadows",
      title: "Техника десяти теней",
      desc: "Собери 22 уникальных персонажа в коллекции.",
      type: "unique_count",
      target: 22,
      rewardId: "artifact_ten_shadows",
    },
    {
      id: "sm_sukuna_fingers",
      title: "Пальцы Рёмена Сукуны",
      desc: "Получи редкость S+ с баннера 6 раз.",
      type: "got_splus",
      target: 6,
      rewardId: "artifact_sukuna_fingers",
    },
    {
      id: "sm_boss_chain",
      title: "Цепь на тысячу ли",
      desc: "Победи 18 боссов в режиме боя.",
      type: "boss_kills",
      target: 18,
      rewardId: "artifact_boss_chain",
    },
    {
      id: "sm_shards_fate",
      title: "Небесное копьё-перевёртыш",
      desc: "Накопи 1000 осколков с дубликатов (всего за игру).",
      type: "shards_total",
      target: 1000,
      rewardId: "artifact_shards_fate",
    },
    {
      id: "sm_banner_peak",
      title: "Игривое облако",
      desc: "Выбей SS с баннера 1 раз.",
      type: "got_ss",
      target: 1,
      rewardId: "artifact_banner_peak",
    },
  ];

  /** Кликер-бой: порядок и награды (HP ↑ сложность, кубы/осколки ↑ награда) */
  const BOSS_LIST = [
    // Stage 1 → Stage 2 chains (forms are consecutive).
    { id: "dagon", name: "Дагон", maxHp: 1450, cubes: 70, shards: 24 },
    { id: "dagon_true", name: "Истинный Дагон", maxHp: 2950, cubes: 120, shards: 44 },

    { id: "hanami", name: "Ханами", maxHp: 2200, cubes: 90, shards: 31 },
    { id: "hanami_awakened", name: "Ханами (пробуждение)", maxHp: 4100, cubes: 150, shards: 54 },

    { id: "jogo", name: "Джого", maxHp: 2850, cubes: 105, shards: 38 },
    { id: "jogo_meteor", name: "Джого (пик)", maxHp: 7400, cubes: 260, shards: 95 },

    { id: "mahito", name: "Махито", maxHp: 3850, cubes: 130, shards: 48 },
    { id: "mahito_true", name: "Истинный Махито", maxHp: 6800, cubes: 225, shards: 82 },

    { id: "toji", name: "Тодзи Фушигуро", maxHp: 4900, cubes: 165, shards: 60 },
    { id: "toji_unbound", name: "Тодзи (без уз)", maxHp: 8600, cubes: 290, shards: 105 },

    { id: "choso", name: "Чосо", maxHp: 6100, cubes: 200, shards: 72 },
    { id: "choso_rage", name: "Чосо (ярость)", maxHp: 9800, cubes: 340, shards: 124 },

    { id: "sukuna_boss", name: "Рёмен Сукуна", maxHp: 10600, cubes: 380, shards: 140 },
    { id: "sukuna_helan", name: "Хелан Сукуна", maxHp: 15800, cubes: 520, shards: 190 },

    { id: "kenjaku", name: "Кэндзяку", maxHp: 9800, cubes: 345, shards: 125 },
    { id: "geto_boss", name: "Сугуру Гэто", maxHp: 9200, cubes: 325, shards: 118 },
    { id: "kurourushi", name: "Куроуси", maxHp: 5700, cubes: 180, shards: 66 },
    { id: "uriami", name: "Урауми", maxHp: 4500, cubes: 152, shards: 55 },

    // Final local challenge.
    { id: "mahoraga", name: "Махорага (испытание)", maxHp: 16500, cubes: 600, shards: 210 },
  ];

  /**
   * Глобальные боссы: общая угроза для всех игроков (одна цель на мир).
   * Огромный запас HP, повышенный урон за клик (см. globalClickDamage).
   */
  const GLOBAL_BOSS_LIST = [
    {
      id: "global_special_grade_disaster",
      name: "Бедствие особого уровня",
      maxHp: 2_400_000,
      cubes: 3200,
      shards: 1100,
    },
    {
      id: "global_ryomen_cataclysm",
      name: "Рёмен — катаклизм",
      maxHp: 4_200_000,
      cubes: 5800,
      shards: 1950,
    },
    {
      id: "global_merge_heaven_earth",
      name: "Слияние неба и земли",
      maxHp: 6_800_000,
      cubes: 9200,
      shards: 3100,
    },
    {
      id: "global_world_end_omen",
      name: "Предвестник конца мира",
      maxHp: 10_500_000,
      cubes: 15000,
      shards: 5200,
    },
    {
      id: "global_dabura",
      name: "Дабура",
      maxHp: 13_500_000,
      cubes: 19000,
      shards: 6600,
    },
    {
      id: "global_true_helan_sukuna",
      name: "Истинный Хелан Сукуна",
      maxHp: 18_000_000,
      cubes: 26000,
      shards: 9000,
    },
  ];

  const MAHORAGA_TAME = {
    costCubes: 920,
    costShards: 450,
    /** Нужно ослабить босса: HP не выше этой доли от максимума */
    maxHpRatio: 0.26,
    /** Базовый шанс успеха (очень низкий); удача из апгрейда чуть помогает */
    baseChance: 0.021,
    luckBonusPerLevel: 0.0007,
  };

  // ===== rng.js =====
  function clamp01(n) {
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function pickWeighted(weighted) {
    let total = 0;
    for (const it of weighted) total += it.w;
    const r = Math.random() * total;
    let acc = 0;
    for (const it of weighted) {
      acc += it.w;
      if (r <= acc) return it.item;
    }
    return weighted[weighted.length - 1].item;
  }

  // ===== storage.js =====
  const KEY = "jjk_rng_save_v1";
  function loadSave() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch {
      return null;
    }
  }
  function saveGame(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }
  function clearSave() {
    localStorage.removeItem(KEY);
  }
  function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  // ===== app.js (adapted) =====
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
    btnCheatUnlock: document.getElementById("btnCheatUnlock"),
    btnGetAll: document.getElementById("btnGetAll"),
    btnTitles: document.getElementById("btnTitles"),
    titlesModal: document.getElementById("titlesModal"),
    btnCloseTitles: document.getElementById("btnCloseTitles"),
    titlesList: document.getElementById("titlesList"),
    navItems: Array.from(document.querySelectorAll(".nav__item")),
    panes: Array.from(document.querySelectorAll("[data-pane]")),
    collectionGrid: document.getElementById("collectionGrid"),
    collectionFilter: document.getElementById("collectionFilter"),
    btnSortCollection: document.getElementById("btnSortCollection"),
    upgradeList: document.getElementById("upgradeList"),
    questListDaily: document.getElementById("questListDaily"),
    questListSpecial: document.getElementById("questListSpecial"),
    btnRerollQuests: document.getElementById("btnRerollQuests"),
    btnMission: document.getElementById("btnMission"),
    missionStatus: document.getElementById("missionStatus"),
    missionBar: document.getElementById("missionBar"),
    battleBossList: document.getElementById("battleBossList"),
    battleBossTitle: document.getElementById("battleBossTitle"),
    battleHpText: document.getElementById("battleHpText"),
    battleHpFill: document.getElementById("battleHpFill"),
    battleDmgHint: document.getElementById("battleDmgHint"),
    btnBattleHit: document.getElementById("btnBattleHit"),
    battleLastHit: document.getElementById("battleLastHit"),
    battleRewards: document.getElementById("battleRewards"),
    battleArena: document.getElementById("battleArena"),
    battleTameWrap: document.getElementById("battleTameWrap"),
    langSelect: document.getElementById("langSelect"),
    cutsceneMahoraga: document.getElementById("cutsceneMahoraga"),
    cutsceneFinal: document.getElementById("cutsceneFinal"),
  };

  const DEFAULT_STATE = () => ({
    v: 1,
    lang: "ru",
    cubes: STARTER.cubes,
    shards: STARTER.shards,
    rolls: 0,
    pityS: 0,
    pityA: 0,
    collection: {},
    evo: {},
    fullEvo: {},
    upgrades: { luck: 0, income: 0, discount: 0, questing: 0 },
    quests: [],
    questDay: "",
    specialMissions: {},
    mission: { lastAt: 0 },
    afk: { enabled: false, lastAt: 0 },
    timeIncome: { lastAt: 0 },
    stats: { gotS: 0, gotA: 0, shardsEarned: 0, gotSPlus: 0, gotSS: 0, bossKills: 0 },
    flags: {
      sorted: true,
      getAllCheatUnlocked: false,
      infiniteBattleDamage: false,
      cheatInfinityUi: false,
      mahoragaCutsceneShown: false,
      finalCutsceneShown: false,
    },
    battle: {
      unlockedMaxIndex: 0,
      activeIndex: 0,
      hp: {},
      mode: "local",
      globalUnlocked: false,
      /** Победа над последним локальным боссом (Махорага); нужна для миграции старых сейвов */
      localFinalBossWon: false,
      globalUnlockedMaxIndex: 0,
      globalActiveIndex: 0,
      globalHp: {},
    },
  });

  let state = hydrate(loadSave());

  function lang() {
    const l = state?.lang;
    return l === "en" || l === "ja" || l === "ru" ? l : "ru";
  }

  function t(key) {
    const packs = typeof window !== "undefined" ? window.JJK_I18N : null;
    if (!packs) return key;
    return packs[lang()]?.[key] ?? packs.ru?.[key] ?? key;
  }

  function charName(c) {
    const n = typeof window !== "undefined" ? window.JJK_CHAR_NAMES?.[lang()]?.[c.id] : null;
    return n || c.name;
  }

  function bossLabel(b) {
    const k = `boss_${b.id}`;
    const s = t(k);
    return s !== k ? s : b.name;
  }

  function dailyQuestTitle(q) {
    if (q.templateId) {
      const k = `quest_${q.templateId}_title`;
      const s = t(k);
      if (s !== k) return s;
    }
    return q.title;
  }

  function localeSort() {
    return lang() === "ja" ? "ja" : lang() === "en" ? "en" : "ru";
  }

  function applyDocumentI18n() {
    if (typeof window === "undefined" || !window.JJK_I18N) return;
    document.documentElement.lang = lang() === "ja" ? "ja" : lang() === "en" ? "en" : "ru";
    document.title = t("doc_title");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (k) el.textContent = t(k);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const k = el.getAttribute("data-i18n-title");
      if (k) el.setAttribute("title", t(k));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const k = el.getAttribute("data-i18n-aria");
      if (k) el.setAttribute("aria-label", t(k));
    });
    if (els.langSelect) els.langSelect.value = lang();
    const bb = document.getElementById("battleBossList");
    if (bb) bb.setAttribute("aria-label", t("battle_bosslist_aria"));
    if (els.collectionFilter) {
      const optAll = els.collectionFilter.querySelector('option[value="all"]');
      const optO = els.collectionFilter.querySelector('option[value="O"]');
      if (optAll) optAll.textContent = t("filter_all");
      if (optO) optO.textContent = t("filter_o");
    }
    const chipO = document.querySelector(".chip--o");
    if (chipO) chipO.setAttribute("title", t("chip_o_title"));
    const rnm = els.resultCard?.querySelector(".resultcard__name");
    const rdc = els.resultCard?.querySelector(".resultcard__desc");
    if (rnm && rdc && rnm.textContent === "—") {
      rnm.textContent = t("roll_result_empty_name");
      rdc.textContent = t("roll_result_empty_desc");
    }
  }

  function hydrate(save) {
    const base = DEFAULT_STATE();
    if (!save) return ensureSpecialMissions(ensureQuests(base));
    const merged = {
      ...base,
      ...save,
      stats: {
        ...base.stats,
        ...(save.stats || {}),
        gotSPlus: Number(save.stats?.gotSPlus) || 0,
        gotSS: Number(save.stats?.gotSS) || 0,
        bossKills: Number(save.stats?.bossKills) || 0,
      },
      upgrades: { ...base.upgrades, ...(save.upgrades || {}) },
      flags: { ...base.flags, ...(save.flags || {}) },
    };
    merged.flags = { ...base.flags, ...merged.flags };
    merged.flags.getAllCheatUnlocked = Boolean(merged.flags.getAllCheatUnlocked);
    merged.flags.infiniteBattleDamage = Boolean(merged.flags.infiniteBattleDamage);
    merged.flags.cheatInfinityUi = Boolean(merged.flags.cheatInfinityUi);
    merged.flags.mahoragaCutsceneShown = Boolean(merged.flags.mahoragaCutsceneShown);
    merged.flags.finalCutsceneShown = Boolean(merged.flags.finalCutsceneShown);
    if (merged.cubes === CHEAT_MAX) merged.flags.infiniteBattleDamage = true;
    if (merged.cubes === CHEAT_MAX && merged.shards === CHEAT_MAX) merged.flags.cheatInfinityUi = true;
    if (!merged.collection || typeof merged.collection !== "object") merged.collection = {};
    if (!merged.evo || typeof merged.evo !== "object") merged.evo = {};
    if (!merged.fullEvo || typeof merged.fullEvo !== "object") merged.fullEvo = {};
    if (!merged.battle || typeof merged.battle !== "object") merged.battle = { unlockedMaxIndex: 0, activeIndex: 0, hp: {} };
    merged.battle = { ...base.battle, ...merged.battle };
    if (!merged.battle.hp || typeof merged.battle.hp !== "object") merged.battle.hp = {};
    if (!merged.battle.globalHp || typeof merged.battle.globalHp !== "object") merged.battle.globalHp = {};
    merged.battle.globalUnlocked = Boolean(merged.battle.globalUnlocked);
    merged.battle.localFinalBossWon = Boolean(merged.battle.localFinalBossWon);
    if (merged.battle.localFinalBossWon) merged.battle.globalUnlocked = true;
    /**
     * Раньше globalUnlocked выставлялся только при победе после обновления.
     * Если цепочка уже пройдена: открыт последний слот и было >= 13 убийств боссов
     * (12 до Махораги + победа над ней), считаем финал пройденным.
     */
    if (!merged.battle.globalUnlocked) {
      const bk = merged.stats?.bossKills || 0;
      const lastIdx = BOSS_LIST.length - 1;
      if (merged.battle.unlockedMaxIndex >= lastIdx && bk > lastIdx) {
        merged.battle.globalUnlocked = true;
        merged.battle.localFinalBossWon = true;
      }
    }
    if (merged.battle.mode === "global" && !merged.battle.globalUnlocked) merged.battle.mode = "local";
    if (!merged.battle.mode || merged.battle.mode !== "global") merged.battle.mode = "local";
    if (!Number.isFinite(merged.battle.globalUnlockedMaxIndex)) merged.battle.globalUnlockedMaxIndex = 0;
    merged.battle.globalUnlockedMaxIndex = Math.max(
      0,
      Math.min(GLOBAL_BOSS_LIST.length - 1, merged.battle.globalUnlockedMaxIndex)
    );
    if (!Number.isFinite(merged.battle.globalActiveIndex)) merged.battle.globalActiveIndex = 0;
    merged.battle.globalActiveIndex = Math.max(
      0,
      Math.min(merged.battle.globalUnlockedMaxIndex, merged.battle.globalActiveIndex)
    );
    if (!Number.isFinite(merged.battle.unlockedMaxIndex)) merged.battle.unlockedMaxIndex = 0;
    if (!Number.isFinite(merged.battle.activeIndex)) merged.battle.activeIndex = 0;
    merged.battle.unlockedMaxIndex = Math.max(0, Math.min(BOSS_LIST.length - 1, merged.battle.unlockedMaxIndex));
    merged.battle.activeIndex = Math.max(0, Math.min(BOSS_LIST.length - 1, merged.battle.activeIndex));
    if (!merged.mission || typeof merged.mission !== "object") merged.mission = { lastAt: 0 };
    if (!Number.isFinite(merged.mission.lastAt)) merged.mission.lastAt = 0;
    if (!merged.afk || typeof merged.afk !== "object") merged.afk = { enabled: false, lastAt: 0 };
    merged.afk.enabled = Boolean(merged.afk.enabled);
    if (!Number.isFinite(merged.afk.lastAt)) merged.afk.lastAt = 0;
    if (!merged.timeIncome || typeof merged.timeIncome !== "object") merged.timeIncome = { lastAt: 0 };
    if (!Number.isFinite(merged.timeIncome.lastAt)) merged.timeIncome.lastAt = 0;
    if (!Number.isFinite(merged.cubes)) merged.cubes = base.cubes;
    if (!Number.isFinite(merged.shards)) merged.shards = base.shards;
    if (!Number.isFinite(merged.rolls)) merged.rolls = base.rolls;
    if (!Number.isFinite(merged.pityS)) merged.pityS = base.pityS;
    if (!Number.isFinite(merged.pityA)) merged.pityA = base.pityA;
    if (!["ru", "en", "ja"].includes(merged.lang)) merged.lang = "ru";
    return ensureSpecialMissions(ensureQuests(merged));
  }

  // (dialogs removed)

  function ensureSpecialMissions(s) {
    if (!s.specialMissions || typeof s.specialMissions !== "object") s.specialMissions = {};
    for (const m of SPECIAL_MISSIONS) {
      if (!s.specialMissions[m.id]) {
        s.specialMissions[m.id] = { progress: 0, claimed: false };
      } else {
        const r = s.specialMissions[m.id];
        if (typeof r.progress !== "number" || Number.isNaN(r.progress)) r.progress = 0;
        r.claimed = Boolean(r.claimed);
      }
    }
    return s;
  }

  function syncSpecialMissionsFromState() {
    state = ensureSpecialMissions(state);
    const uniq = Object.keys(state.collection || {}).length;
    for (const m of SPECIAL_MISSIONS) {
      const rec = state.specialMissions[m.id];
      if (!rec || rec.claimed) continue;
      let p = 0;
      if (m.type === "rolls_total") p = Math.min(m.target, state.rolls || 0);
      else if (m.type === "unique_count") p = Math.min(m.target, uniq);
      else if (m.type === "got_splus") p = Math.min(m.target, state.stats.gotSPlus || 0);
      else if (m.type === "boss_kills") p = Math.min(m.target, state.stats.bossKills || 0);
      else if (m.type === "shards_total") p = Math.min(m.target, state.stats.shardsEarned || 0);
      else if (m.type === "got_ss") p = Math.min(m.target, state.stats.gotSS || 0);
      rec.progress = p;
    }
  }

  function cheatDigitFromEvent(e) {
    if (e.key >= "0" && e.key <= "9") return e.key;
    if (e.code && /^Digit[0-9]$/.test(e.code)) return e.code.slice(5);
    if (e.code && /^Numpad[0-9]$/.test(e.code)) return e.code.slice(6);
    return null;
  }

  function unlockGetAllButton() {
    if (!state.flags) state.flags = { sorted: true, getAllCheatUnlocked: false };
    state.flags.getAllCheatUnlocked = true;
    renderTop();
    autosave();
  }

  function applyGetAllCheat() {
    if (!state.flags?.getAllCheatUnlocked) return;
    state.flags.infiniteBattleDamage = true;
    state.flags.cheatInfinityUi = true;
    state.cubes = CHEAT_MAX;
    state.shards = CHEAT_MAX;
    const now = Date.now();
    for (const c of CHARACTERS) {
      if (!c.id || !c.name) continue;
      const ex = state.collection[c.id];
      state.collection[c.id] = { count: CHEAT_MAX, firstAt: ex?.firstAt ?? now };
    }
    syncSpecialMissionsFromState();
    pushLog({ name: t("log_get_all"), meta: t("log_get_all_meta"), rarity: "SS", extra: "" });
    renderAll();
    autosave();
  }

  function claimSpecialMission(id) {
    syncSpecialMissionsFromState();
    const m = SPECIAL_MISSIONS.find((x) => x.id === id);
    const rec = state.specialMissions[id];
    if (!m || !rec || rec.claimed) return;
    if (rec.progress < m.target) return;
    rec.claimed = true;
    const char = CHARACTERS.find((c) => c.id === m.rewardId);
    if (char) addToCollection(char);
    pushLog({
      name: t("log_special_done"),
      meta: t(`special_${m.id}_title`),
      rarity: "O",
      extra: char ? `${t("log_special_reward")} ${charName(char)}` : "",
    });
    renderAll();
    autosave();
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
        templateId: q.id,
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

  function hasUnique(id) {
    return Boolean(state.collection?.[id]?.count);
  }

  const TITLES = [
    {
      id: "strongest_mage_true",
      name: "Сильнейший Маг Настоящего",
      desc: "Победить мирового босса: Истинный Хелан Сукуна.",
      color: "#ffcc66",
      unlocked: () => Boolean(state.flags?.finalCutsceneShown),
    },
    {
      id: "luck_before_death",
      name: "Удача Перед Смертью",
      desc: "Приручить Махорагу (редчайший успех).",
      color: "#39d5ff",
      unlocked: () => hasUnique("mahoraga_tamed"),
    },
    {
      id: "cheater",
      name: "Читер",
      desc: "Ввести секретный чит‑код и открыть кнопку «Получить всё».",
      color: "#ff5a6a",
      unlocked: () => Boolean(state.flags?.getAllCheatUnlocked),
    },
    {
      id: "boss_chain",
      name: "Разрыв Цепи",
      desc: "Победить 10 боссов в бою.",
      color: "#7c5cff",
      unlocked: () => (state.stats?.bossKills || 0) >= 10,
    },
    {
      id: "collector",
      name: "Коллекционер Проклятий",
      desc: "Собрать 18 уникальных карт в коллекции.",
      color: "#59ffb0",
      unlocked: () => Object.keys(state.collection || {}).length >= 18,
    },
    {
      id: "rich",
      name: "Кубовый Магнат",
      desc: "Накопить 2500 кубов одновременно.",
      color: "#ffffff",
      unlocked: () => (state.cubes || 0) >= 2500,
    },
  ];

  function openTitles() {
    if (!els.titlesModal) return;
    renderTitles();
    els.titlesModal.classList.remove("is-hidden");
    els.titlesModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const btn = els.btnCloseTitles || document.getElementById("btnCloseTitles");
    if (btn) window.setTimeout(() => btn.focus(), 50);
  }

  function closeTitles() {
    if (!els.titlesModal) return;
    els.titlesModal.classList.add("is-hidden");
    els.titlesModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function renderTitles() {
    if (!els.titlesList) return;
    els.titlesList.innerHTML = "";
    for (const tt of TITLES) {
      const ok = Boolean(tt.unlocked());
      const card = document.createElement("div");
      card.className = `titlecard${ok ? "" : " is-locked"}`;

      const top = document.createElement("div");
      top.className = "titlecard__top";

      const badge = document.createElement("div");
      badge.className = "titlebadge";
      badge.style.color = tt.color;
      const dot = document.createElement("span");
      dot.className = "titlebadge__dot";
      const badgeText = document.createElement("span");
      badgeText.textContent = ok ? "Получено" : "Закрыто";
      badge.append(dot, badgeText);

      const name = document.createElement("div");
      name.className = "titlecard__name";
      name.textContent = tt.name;

      top.append(name, badge);

      const desc = document.createElement("div");
      desc.className = "titlecard__desc";
      desc.textContent = tt.desc;

      card.append(top, desc);
      els.titlesList.append(card);
    }
  }

  function evoLevel(id) {
    return Math.max(0, Math.min(5, Number(state.evo?.[id] || 0)));
  }

  function starsText(level) {
    if (level <= 0) return "";
    return "★".repeat(Math.min(5, level));
  }

  function resolvedFullEvolveName(char) {
    return char.fullEvolveName || `${charName(char)} · ${t("evo_peak_suffix")}`;
  }

  function isFullEvolved(id) {
    return Boolean(state.fullEvo?.[id]);
  }

  function evolvedDisplayName(char) {
    if (isFullEvolved(char.id)) {
      return `· ${resolvedFullEvolveName(char)} ·`;
    }
    const lvl = evoLevel(char.id);
    if (lvl < 5) {
      const st = starsText(lvl);
      return st ? `${charName(char)}  ${st}` : charName(char);
    }

    const title =
      char.rarity === "SS" ? t("evo_mythic") :
      char.rarity === "S+" ? t("evo_ascended_p") :
      char.rarity === "S" ? t("evo_ascended") :
      char.rarity === "A" ? t("evo_awakened") :
      char.rarity === "B" ? t("evo_reinforced") : t("evo_refined");

    return `· ${title} ${charName(char)} ·`;
  }

  function evolutionLuckBonus() {
    let sum = 0;
    for (const id in state.evo) sum += evoLevel(id);
    return Math.min(6, sum * 0.15);
  }

  function evolutionIncomeBonus() {
    let sum = 0;
    for (const id in state.evo) sum += evoLevel(id);
    return Math.min(12, Math.floor(sum * 0.25));
  }

  function effectiveLuckPercent() {
    const lvl = state.upgrades.luck || 0;
    const base = lvl * 0.35;
    let uniquePassives = 0;
    if (hasUnique("gojo_satoru")) uniquePassives += 0.6;
    return Math.min(18, base + uniquePassives + evolutionLuckBonus());
  }

  function rollCost(mult) {
    const discLvl = state.upgrades.discount || 0;
    const discount = Math.min(0.3, discLvl * 0.02);
    const base = mult === 10 ? 95 : 10;
    let extraTenDiscount = 0;
    if (mult === 10 && hasUnique("kugisaki_nobara")) extraTenDiscount += 0.05;
    const finalDisc = clamp01(discount + extraTenDiscount);
    return Math.max(1, Math.round(base * (1 - finalDisc)));
  }

  function incomePerRoll() {
    const lvl = state.upgrades.income || 0;
    const base = lvl === 0 ? 0 : Math.round(0.8 + lvl * 1.15);
    return base + evolutionIncomeBonus();
  }

  // ===== Time income (online always) + offline (AFK toggle) =====
  // Requirement: while game is open, earn exactly +1 cube every second.
  const TIME_INCOME = {
    perSecond: 1,
  };

  function tickOnlineIncome() {
    state.cubes += TIME_INCOME.perSecond;
  }

  const AFK = {
    // Base cubes per minute while AFK is enabled.
    basePerMin: 3,
    // Max offline accrual to avoid runaway.
    offlineCapHours: 12,
  };

  function afkRatePerMin() {
    // Scales with upgrades and evolution a bit.
    const q = state.upgrades.questing || 0;
    const incomeLvl = state.upgrades.income || 0;
    const evoCount = Object.keys(state.evo || {}).length;
    const mult = 1 + q * 0.03 + incomeLvl * 0.015 + evoCount * 0.01;
    return Math.max(1, Math.round(AFK.basePerMin * mult));
  }

  function claimOfflineAfkGain(nowMs) {
    if (!state.afk?.enabled) return 0;
    const last = Number(state.afk.lastAt || 0);
    if (!last) {
      state.afk.lastAt = nowMs;
      return 0;
    }
    const capMs = AFK.offlineCapHours * 60 * 60 * 1000;
    const dt = Math.max(0, Math.min(capMs, nowMs - last));
    const rate = afkRatePerMin();
    const gain = Math.floor((dt / 60000) * rate);
    if (gain > 0) {
      state.cubes += gain;
      pushLog({
        name: t("log_offline_afk"),
        meta: t("log_offline_meta"),
        rarity: "A",
        extra: `+${gain} ${t("cubes_word")}`,
      });
    }
    state.afk.lastAt = nowMs;
    return gain;
  }

  function armOfflineAfkTimestamp(nowMs) {
    if (!state.afk?.enabled) return;
    state.afk.lastAt = nowMs;
  }

  function setAfkEnabled(enabled) {
    const now = Date.now();
    state.afk.enabled = Boolean(enabled);
    state.afk.lastAt = now;
    pushLog({
      name: t("log_afk_mode"),
      meta: state.afk.enabled ? t("log_afk_on_meta") : t("log_afk_off_meta"),
      rarity: state.afk.enabled ? "A" : "C",
      extra: state.afk.enabled ? `≈${afkRatePerMin()}/мин` : "",
    });
    renderAll();
    autosave();
  }

  function evolutionCost(char) {
    const lvl = evoLevel(char.id);
    const next = lvl + 1;
    const base =
      char.rarity === "SS" ? 220 :
      char.rarity === "S+" ? 180 :
      char.rarity === "S" ? 120 :
      char.rarity === "A" ? 60 :
      char.rarity === "B" ? 24 : 12;
    const shardCost = Math.round(base * (0.85 + next * 0.75));
    const dupNeed = next;
    return { shardCost, dupNeed, next, max: 5 };
  }

  function canEvolve(char) {
    const owned = state.collection?.[char.id]?.count || 0;
    if (owned <= 0) return { ok: false, reason: t("reason_not_owned") };
    const lvl = evoLevel(char.id);
    if (lvl >= 5) return { ok: false, reason: t("reason_max_evo") };
    const { shardCost, dupNeed } = evolutionCost(char);
    const dups = Math.max(0, owned - 1);
    if (dups < dupNeed) return { ok: false, reason: `${t("reason_need_dups")} ${dupNeed}` };
    if (state.shards < shardCost) return { ok: false, reason: `${t("reason_need_shards")} ${shardCost}` };
    return { ok: true, reason: "" };
  }

  function evolveCharacter(char) {
    const check = canEvolve(char);
    if (!check.ok) return;
    const { shardCost, dupNeed, next } = evolutionCost(char);
    const ok = confirm(
      `${t("confirm_evo_title")} ${charName(char)}\n` +
        `${t("confirm_evo_level")} ${evoLevel(char.id)} → ${next}\n` +
        `${t("confirm_evo_price")} ${shardCost} ${t("evolve_confirm_shards_label")}\n` +
        `${t("evolve_confirm_dups_label")} -${dupNeed}\n\n` +
        t("confirm_evo_go")
    );
    if (!ok) return;
    state.shards -= shardCost;
    const entry = state.collection[char.id];
    if (entry) entry.count = Math.max(1, entry.count - dupNeed);
    state.evo[char.id] = next;
    pushLog({ name: t("log_evolution"), meta: charName(char), rarity: char.rarity, extra: `→ ${starsText(next) || "★"}` });
    renderAll();
    autosave();
  }

  function fullEvolutionPrice(char) {
    const r = char.rarity;
    if (r === "SS") return { shards: 900, cubes: 450 };
    if (r === "S+") return { shards: 750, cubes: 375 };
    if (r === "S") return { shards: 600, cubes: 300 };
    if (r === "A") return { shards: 300, cubes: 150 };
    if (r === "B") return { shards: 120, cubes: 60 };
    return { shards: 40, cubes: 20 };
  }

  function canFullEvolve(char) {
    if (isFullEvolved(char.id)) return { ok: false, reason: t("reason_full_done") };
    if (evoLevel(char.id) < 5) return { ok: false, reason: t("reason_need_evo5") };
    const owned = state.collection?.[char.id]?.count || 0;
    if (owned <= 0) return { ok: false, reason: t("reason_not_owned") };
    const { shards, cubes } = fullEvolutionPrice(char);
    if (state.shards < shards) return { ok: false, reason: `${t("reason_shards_short")} ${shards}` };
    if (state.cubes < cubes) return { ok: false, reason: `${t("reason_cubes_short")} ${cubes}` };
    return { ok: true, reason: "" };
  }

  function applyFullEvolution(char) {
    const check = canFullEvolve(char);
    if (!check.ok) return;
    const { shards, cubes } = fullEvolutionPrice(char);
    const newName = resolvedFullEvolveName(char);
    const ok = confirm(
      `${t("confirm_full_title")}\n\n` +
        `${charName(char)}  →  ${newName}\n\n` +
        `${t("confirm_full_price")} ${shards} ${t("evolve_confirm_shards_label")} + ${cubes} ${t("cubes_word")}\n\n` +
        t("confirm_evo_go")
    );
    if (!ok) return;
    state.shards -= shards;
    state.cubes -= cubes;
    state.fullEvo[char.id] = true;
    pushLog({
      name: t("log_full_evo"),
      meta: newName,
      rarity: char.rarity,
      extra: t("log_full_evo_extra"),
    });
    renderAll();
    autosave();
  }

  function questRewardMultiplier() {
    const lvl = state.upgrades.questing || 0;
    let mult = 1 + lvl * 0.05;
    if (hasUnique("fushiguro_megumi")) mult *= 1.12;
    return mult;
  }

  function pitySMax() {
    return PITY.S.cap;
  }
  function pityAMax() {
    return PITY.A.cap;
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
    if (state.pityS >= pitySMax() - 1) {
      return pickWeighted([
        { item: "S", w: 52 },
        { item: "S+", w: 35 },
        { item: "SS", w: 13 },
      ]);
    }
    if (state.pityA >= pityAMax() - 1) return "A";

    const luck = effectiveLuckPercent() / 100;
    let ss = BASE_RATES.SS + luck * 0.0008;
    let sp = BASE_RATES["S+"] + luck * 0.002;
    let s = BASE_RATES.S + luck * 0.004;
    const a = clamp01(BASE_RATES.A + luck * 0.45);
    const b = BASE_RATES.B;
    const rnd = Math.random();
    let acc = 0;
    acc += ss;
    if (rnd < acc) return "SS";
    acc += sp;
    if (rnd < acc) return "S+";
    acc += s;
    if (rnd < acc) return "S";
    acc += a;
    if (rnd < acc) return "A";
    acc += b;
    if (rnd < acc) return "B";
    return "C";
  }

  function isHighTier(rarity) {
    return rarity === "SS" || rarity === "S+" || rarity === "S";
  }

  function pickCharacterByRarity(rarity) {
    const pool = CHARACTERS.filter((c) => c.rarity === rarity && c.fromGacha !== false);
    if (pool.length === 0) return CHARACTERS[0];
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
      pushLog({ name: t("log_nanami_bonus"), meta: t("log_nanami_meta"), rarity: "B", extra: `+6 ${t("cubes_word")}` });
    }
  }

  function maybeRefund(cost) {
    if (!hasUnique("yuta_okkotsu")) return;
    if (Math.random() < 0.08) {
      const back = Math.max(1, Math.round(cost * 0.55));
      state.cubes += back;
      pushLog({ name: t("log_yuta_refund"), meta: t("log_yuta_meta"), rarity: "A", extra: `+${back} ${t("cubes_word")}` });
    }
  }

  function maybeJunkToShards() {
    if (!hasUnique("maki_zenin")) return 0;
    return Math.random() < 0.18 ? 3 : 0;
  }

  function updateQuests(event) {
    for (const q of state.quests) {
      if (q.claimed) continue;
      if (q.type === "rolls" && event.type === "roll") q.progress = Math.min(q.target, q.progress + 1);
      if (q.type === "roll10" && event.type === "roll10") q.progress = Math.min(q.target, q.progress + 1);
      if (q.type === "rarity" && event.type === "gotRarity" && q.rarity === event.rarity) q.progress = Math.min(q.target, q.progress + 1);
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
    pushLog({ name: t("log_quest_reward"), meta: dailyQuestTitle(q), rarity: "B", extra: `+${reward} ${t("cubes_word")}` });
    renderAll();
    autosave();
  }

  function setResultCard(char, rarity, extraText) {
    const card = els.resultCard;
    card.classList.remove(
      "rarity-S",
      "rarity-A",
      "rarity-B",
      "rarity-C",
      "rarity-SS",
      "rarity-Splus",
      "rarity-O",
      "evo-max",
      "evo-full"
    );
    card.classList.add(rarityCssClass(rarity));
    card.querySelector(".resultcard__rarity").textContent = `${t("rarity_prefix")} ${rarity}`;
    const isMax = evoLevel(char.id) >= 5;
    card.classList.toggle("evo-max", isMax);
    card.classList.toggle("evo-full", isFullEvolved(char.id));
    card.querySelector(".resultcard__name").textContent = evolvedDisplayName(char);
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

  function doRoll(mult) {
    state = ensureQuests(state);
    const cost = mult === 10 ? (cheatInfinityUi() ? 0 : 100) : rollCost(1);
    if (state.cubes < cost) {
      pushLog({ name: t("log_no_cubes"), meta: t("log_no_cubes_meta"), rarity: "C", extra: "" });
      renderAll();
      return;
    }

    state.cubes -= cost;
    let lastDrop = null;

    for (let i = 0; i < mult; i++) {
      const rarity = rollRarity();
      const char = pickCharacterByRarity(rarity);
      const prevUnique = hasUnique(char.id);

      const addRes = addToCollection(char);
      const isDup = addRes.isDup;
      let extraText = "";

      if (!prevUnique) updateQuests({ type: "unique" });

      if (isHighTier(rarity)) state.pityS = 0;
      else state.pityS += 1;

      if (rarity === "A" || isHighTier(rarity)) state.pityA = 0;
      else state.pityA += 1;

      if (isDup) {
        const s = shardsFromDup(rarity) + maybeJunkToShards();
        if (s > 0) {
          state.shards += s;
          state.stats.shardsEarned += s;
          extraText = `дубликат → +${s} осколков`;
          updateQuests({ type: "shardsEarn", amount: s });
        }
      }

      if (rarity === "S" || rarity === "S+" || rarity === "SS") updateQuests({ type: "gotRarity", rarity: "S" });
      if (rarity === "A") updateQuests({ type: "gotRarity", rarity: "A" });
      updateQuests({ type: "roll" });

      if (rarity === "S+") state.stats.gotSPlus = (state.stats.gotSPlus || 0) + 1;
      if (rarity === "SS") state.stats.gotSS = (state.stats.gotSS || 0) + 1;

      state.rolls += 1;
      applyMilestones();

      const income = incomePerRoll();
      if (income > 0) state.cubes += income;

      lastDrop = { char, rarity, extraText };
      pushLog({
        name: charName(char),
        meta: char.blurb,
        rarity,
        extra: extraText || (income > 0 ? `+${income} ${t("cubes_word")} (${t("income_word")})` : ""),
      });
    }

    if (mult === 10) updateQuests({ type: "roll10" });
    maybeRefund(cost);

    if (hasUnique("itadori_yuji") && Math.random() < 0.1) {
      state.pityA = Math.max(0, state.pityA - 1);
      state.pityS = Math.max(0, state.pityS - 1);
      pushLog({ name: t("log_yuji_passive"), meta: t("log_yuji_meta"), rarity: "C", extra: "-1 pity" });
    }

    if (lastDrop) setResultCard(lastDrop.char, lastDrop.rarity, lastDrop.extraText);
    renderAll();
    autosave();
  }

  function renderTop() {
    els.currency.textContent = fmtUiNum(state.cubes);
    els.luck.textContent = `${effectiveLuckPercent().toFixed(1)}%`;
    if (els.shards) els.shards.textContent = fmtUiNum(state.shards);

    if (els.btnGetAll) {
      if (state.flags?.getAllCheatUnlocked) els.btnGetAll.classList.remove("is-hidden");
      else els.btnGetAll.classList.add("is-hidden");
    }
    if (els.btnCheatUnlock) {
      if (state.flags?.getAllCheatUnlocked) els.btnCheatUnlock.classList.add("is-hidden");
      else els.btnCheatUnlock.classList.remove("is-hidden");
    }
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
    const rc1 = cheatInfinityUi() ? UI_INFINITY : String(rollCost(1));
    els.rollCost1.textContent = rc1;
    const cost10 = cheatInfinityUi() ? UI_INFINITY : 100;
    const h10 = els.btnRoll10.querySelector(".btn__hint");
    if (h10) h10.textContent = `(${t("roll_hint_cost")} ${cost10})`;
    const h1 = els.btnRoll1.querySelector(".btn__hint");
    if (h1) h1.textContent = `(${t("roll_hint_cost")} ${rc1})`;
  }

  function rarityRank(r) {
    if (r === "O") return 9;
    if (r === "SS") return 8;
    if (r === "S+") return 7;
    if (r === "S") return 6;
    if (r === "A") return 5;
    if (r === "B") return 4;
    if (r === "C") return 3;
    return 1;
  }

  function renderCollection() {
    if (!els.collectionGrid) return;
    const filter = (els.collectionFilter && els.collectionFilter.value) || "all";
    const items = CHARACTERS.slice().filter((c) => c.name && c.id);
    const shown = items.filter((c) => {
      if (c.rarity === "O") return filter === "O";
      if (filter === "all") return true;
      return c.rarity === filter;
    });
    const unique = Object.keys(state.collection).length;
    els.uniqueCount.textContent = cheatInfinityUi() ? UI_INFINITY : String(unique);

    const sorted = shown.sort((a, b) => {
      const ra = rarityRank(a.rarity);
      const rb = rarityRank(b.rarity);
      if (rb !== ra) return rb - ra;
      const ca = state.collection[a.id]?.count || 0;
      const cb = state.collection[b.id]?.count || 0;
      if (cb !== ca) return cb - ca;
      return charName(a).localeCompare(charName(b), localeSort());
    });

    els.collectionGrid.innerHTML = "";
    for (const c of sorted) {
      const owned = state.collection[c.id]?.count || 0;
      const dups = Math.max(0, owned - 1);
      const evo = evoLevel(c.id);
      const card = document.createElement("div");
      card.className = `card ${rarityCssClass(c.rarity)}`;
      if (evo >= 5) card.classList.add("evo-max");
      if (isFullEvolved(c.id)) card.classList.add("evo-full");
      const top = document.createElement("div");
      top.className = "card__top";
      const name = document.createElement("div");
      name.className = "card__name";
      name.textContent = evolvedDisplayName(c);
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
      const ownDisp = owned > 0 ? `${t("collection_owned")} ${cheatInfinityUi() ? UI_INFINITY : owned}` : t("collection_not_owned");
      b1.textContent = ownDisp;
      const b2 = document.createElement("div");
      b2.className = "badge badge--dup";
      b2.textContent =
        dups > 0 ? `${t("collection_dups")} ${cheatInfinityUi() ? UI_INFINITY : dups}` : t("collection_dups_none");
      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.flexWrap = "wrap";
      right.style.gap = "8px";
      right.style.alignItems = "center";
      right.style.justifyContent = "flex-end";

      const evoBtn = document.createElement("button");
      evoBtn.className = "btn btn--tiny btn--glow";
      evoBtn.type = "button";
      const check = canEvolve(c);
      evoBtn.textContent = evo >= 5 ? t("evo_btn_max") : `${t("evo_btn_level")} (${evo}/5)`;
      evoBtn.disabled = !check.ok;
      evoBtn.title = check.ok ? t("evo_btn_title_ok") : check.reason;
      evoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        evolveCharacter(c);
      });

      const fullBtn = document.createElement("button");
      fullBtn.className = "btn btn--tiny btn--primary";
      fullBtn.type = "button";
      const fullCheck = canFullEvolve(c);
      const price = fullEvolutionPrice(c);
      fullBtn.textContent = isFullEvolved(c.id) ? t("full_evo_done") : t("full_evo_btn");
      fullBtn.disabled = !fullCheck.ok;
      fullBtn.title = fullCheck.ok
        ? `${resolvedFullEvolveName(c)} — ${cheatInfinityUi() ? UI_INFINITY : price.shards} ${t("full_evo_price")} ${cheatInfinityUi() ? UI_INFINITY : price.cubes} ${t("full_evo_price_cubes")}`
        : fullCheck.reason;
      fullBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        applyFullEvolution(c);
      });

      right.append(b2, evoBtn, fullBtn);
      bottom.append(b1, right);
      card.append(top, desc, bottom);
      els.collectionGrid.append(card);
    }
  }

  // ===== Missions (earn cubes) =====
  const MISSION = { cooldownMs: 30_000 };

  function missionRemainingMs() {
    const last = Number(state.mission?.lastAt || 0);
    return Math.max(0, last + MISSION.cooldownMs - Date.now());
  }

  function missionReward() {
    const base = randInt(14, 26);
    const questLvl = state.upgrades.questing || 0;
    const mult = 1 + questLvl * 0.03 + (effectiveLuckPercent() / 100) * 0.25;
    const evoMult = 1 + Math.min(0.25, Object.keys(state.evo || {}).length * 0.01);
    return Math.max(1, Math.round(base * mult * evoMult));
  }

  function doMission() {
    state = ensureQuests(state);
    if (missionRemainingMs() > 0) return;
    state.mission.lastAt = Date.now();
    const reward = missionReward();
    state.cubes += reward;
    pushLog({ name: t("log_mission_done"), meta: t("log_mission_meta"), rarity: "B", extra: `+${reward} ${t("cubes_word")}` });
    renderAll();
    autosave();
  }

  function renderMission() {
    if (!els.btnMission || !els.missionStatus || !els.missionBar) return;
    const rem = missionRemainingMs();
    const ready = rem <= 0;
    els.btnMission.disabled = !ready;
    els.btnMission.textContent = ready ? t("mission_btn_go") : t("mission_btn_cd");
    if (ready) {
      els.missionStatus.textContent = t("mission_ready");
      els.missionBar.style.width = "100%";
      return;
    }
    const done = Math.max(0, Math.min(1, 1 - rem / MISSION.cooldownMs));
    els.missionBar.style.width = `${Math.round(done * 100)}%`;
    els.missionStatus.textContent = `${t("mission_cd")} ${Math.ceil(rem / 1000)}${t("mission_cd_suffix")}`;
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
    pushLog({ name: t("log_upgrade"), meta: t(`upg_${u.id}_title`), rarity: "B", extra: `${t("log_upgrade_extra")} ${lvl + 1}` });
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
      const titleEl = document.createElement("div");
      titleEl.className = "row__title";
      titleEl.textContent = t(`upg_${u.id}_title`);
      const d = document.createElement("div");
      d.className = "row__desc";
      d.textContent = t(`upg_${u.id}_desc`);
      left.append(titleEl, d);

      const right = document.createElement("div");
      right.className = "row__right";
      const prog = document.createElement("div");
      prog.className = "row__progress";
      prog.textContent = `${lvl} / ${u.max}`;
      const costEl = document.createElement("div");
      costEl.className = "row__cost";
      costEl.textContent = maxed
        ? t("upgrade_max")
        : `${t("upgrade_cost")} ${cheatInfinityUi() ? UI_INFINITY : cost} ${t("upgrade_shards")}`;
      const btn = document.createElement("button");
      btn.className = "btn btn--primary";
      btn.type = "button";
      btn.textContent = maxed ? t("upgrade_bought") : t("upgrade_buy");
      btn.disabled = maxed || state.shards < cost;
      btn.addEventListener("click", () => buyUpgrade(u.id));
      right.append(prog, costEl, btn);
      row.append(left, right);
      els.upgradeList.append(row);
    }
  }

  function getBattleBossHp(idx) {
    const b = BOSS_LIST[idx];
    if (!b) return 0;
    const raw = state.battle.hp[String(idx)];
    if (raw === undefined || raw === null) return b.maxHp;
    return Math.max(0, raw);
  }

  function setBattleBossHp(idx, hp) {
    const b = BOSS_LIST[idx];
    if (!b) return;
    const v = Math.max(0, Math.min(b.maxHp, hp));
    if (v >= b.maxHp) delete state.battle.hp[String(idx)];
    else state.battle.hp[String(idx)] = v;
  }

  function battleClickDamage() {
    if (state.flags?.infiniteBattleDamage) {
      const b = BOSS_LIST[state.battle.activeIndex];
      return b ? b.maxHp : CHEAT_MAX;
    }
    let d = 12 + (state.upgrades.luck || 0) * 4;
    d += Math.min(40, Object.keys(state.evo || {}).length * 2);
    if (Math.random() < 0.12) d = Math.round(d * 2);
    const mult =
      state.battle?.dialog?.dmgClicksLeft > 0 && Number.isFinite(state.battle.dialog.dmgMult)
        ? state.battle.dialog.dmgMult
        : 1;
    if (state.battle?.dialog?.dmgClicksLeft > 0) state.battle.dialog.dmgClicksLeft -= 1;
    return Math.max(1, Math.round(d * mult));
  }

  function getGlobalBossHp(idx) {
    const b = GLOBAL_BOSS_LIST[idx];
    if (!b) return 0;
    const raw = state.battle.globalHp[String(idx)];
    if (raw === undefined || raw === null) return b.maxHp;
    return Math.max(0, raw);
  }

  function setGlobalBossHp(idx, hp) {
    const b = GLOBAL_BOSS_LIST[idx];
    if (!b) return;
    const v = Math.max(0, Math.min(b.maxHp, hp));
    if (v >= b.maxHp) delete state.battle.globalHp[String(idx)];
    else state.battle.globalHp[String(idx)] = v;
  }

  /** Урон по мировому боссу: % от MaxHP + масштаб, иначе кликов слишком много */
  function globalClickDamage(boss) {
    if (state.flags?.infiniteBattleDamage) return boss.maxHp;
    const luck = state.upgrades.luck || 0;
    const evoN = Object.keys(state.evo || {}).length;
    const pct = 0.0009 + Math.min(0.0011, luck * 0.000045) + Math.min(0.0004, evoN * 0.00002);
    let d = Math.floor(boss.maxHp * pct);
    d += Math.min(80000, evoN * 500);
    d = Math.max(2500, d);
    if (Math.random() < 0.11) d = Math.round(d * 1.55);
    return Math.max(1, Math.round(d));
  }

  function selectBattleBoss(idx) {
    if (idx < 0 || idx > state.battle.unlockedMaxIndex) return;
    state.battle.activeIndex = idx;
    renderBattle();
    autosave();
  }

  function selectGlobalBoss(idx) {
    if (idx < 0 || idx > state.battle.globalUnlockedMaxIndex) return;
    state.battle.globalActiveIndex = idx;
    renderBattle();
    autosave();
  }

  function setBattleMode(mode) {
    if (mode === "global" && !state.battle.globalUnlocked) return;
    state.battle.mode = mode === "global" ? "global" : "local";
    renderBattle();
    autosave();
  }

  function mahoragaTamedChar() {
    return CHARACTERS.find((c) => c.id === "mahoraga_tamed");
  }

  function mahoragaTameChance() {
    const luck = state.upgrades.luck || 0;
    return Math.min(
      0.045,
      MAHORAGA_TAME.baseChance + luck * MAHORAGA_TAME.luckBonusPerLevel
    );
  }

  function hideMahoragaCutscene() {
    const el = els.cutsceneMahoraga || document.getElementById("cutsceneMahoraga");
    if (!el) return;
    el.classList.add("is-hidden");
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cutscene-open");
  }

  function showMahoragaCutscene() {
    const el = els.cutsceneMahoraga || document.getElementById("cutsceneMahoraga");
    if (!el) return;
    applyDocumentI18n();
    el.classList.remove("is-hidden");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("cutscene-open");
    const btn = document.getElementById("btnCutsceneMahoraga");
    if (btn) window.setTimeout(() => btn.focus(), 100);
  }

  function hideFinalCutscene() {
    const el = els.cutsceneFinal || document.getElementById("cutsceneFinal");
    if (!el) return;
    el.classList.add("is-hidden");
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cutscene-open");
  }

  function showFinalCutscene() {
    const el = els.cutsceneFinal || document.getElementById("cutsceneFinal");
    if (!el) return;
    applyDocumentI18n();
    el.classList.remove("is-hidden");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("cutscene-open");
    const btn = document.getElementById("btnCutsceneFinal");
    if (btn) window.setTimeout(() => btn.focus(), 100);
  }

  function attemptTameMahoraga() {
    const idx = state.battle.activeIndex;
    const boss = BOSS_LIST[idx];
    if (!boss || boss.id !== "mahoraga") return;

    const hp = getBattleBossHp(idx);
    const ratio = hp / boss.maxHp;
    const cheatTame = cheatInfinityUi();
    if (!cheatTame && ratio > MAHORAGA_TAME.maxHpRatio) {
      pushLog({
        name: t("log_tame_fail_title"),
        meta: t("log_tame_strong"),
        rarity: "C",
        extra: `${t("log_tame_strong_extra")} ${Math.round(MAHORAGA_TAME.maxHpRatio * 100)}% HP`,
      });
      renderAll();
      return;
    }
    if (
      !cheatTame &&
      (state.cubes < MAHORAGA_TAME.costCubes || state.shards < MAHORAGA_TAME.costShards)
    ) {
      pushLog({
        name: t("log_tame_fail_title"),
        meta: t("log_tame_res"),
        rarity: "C",
        extra: "",
      });
      renderAll();
      return;
    }

    if (!cheatTame) {
      state.cubes -= MAHORAGA_TAME.costCubes;
      state.shards -= MAHORAGA_TAME.costShards;
    }

    const ch = cheatTame ? 1 : mahoragaTameChance();
    const char = mahoragaTamedChar();
    if (!char) return;

    if (Math.random() < ch) {
      addToCollection(char);
      pushLog({
        name: t("log_tame_ok"),
        meta: t("log_tame_ok_meta"),
        rarity: "SS",
        extra: t("log_tame_ok_extra"),
      });
      if (!state.flags) {
        state.flags = {
          sorted: true,
          getAllCheatUnlocked: false,
          infiniteBattleDamage: false,
          cheatInfinityUi: false,
          mahoragaCutsceneShown: false,
        };
      }
      if (!state.flags.mahoragaCutsceneShown) {
        state.flags.mahoragaCutsceneShown = true;
        showMahoragaCutscene();
      }
    } else {
      pushLog({
        name: t("log_tame_bad"),
        meta: t("log_tame_bad_meta"),
        rarity: "C",
        extra: `~${(ch * 100).toFixed(2)}%`,
      });
    }
    renderAll();
    autosave();
  }

  function globalBattleHit() {
    const idx = state.battle.globalActiveIndex;
    const boss = GLOBAL_BOSS_LIST[idx];
    if (!boss) return;
    let hp = getGlobalBossHp(idx);
    if (hp <= 0) {
      setGlobalBossHp(idx, boss.maxHp);
      hp = boss.maxHp;
    }
    const dmg = globalClickDamage(boss);
    const newHp = hp - dmg;
    const dmgShow = state.flags?.infiniteBattleDamage ? UI_INFINITY : dmg;
    if (els.battleLastHit) {
      els.battleLastHit.textContent =
        newHp <= 0
          ? `${t("battle_hit_final")} ${dmgShow} ${t("battle_dmg_suffix")}`
          : `${t("battle_hit_normal")} ${dmgShow} ${t("battle_dmg_suffix")}`;
    }
    if (newHp <= 0) {
      state.cubes += boss.cubes;
      state.shards += boss.shards;
      delete state.battle.globalHp[String(idx)];
      const nextU = Math.min(GLOBAL_BOSS_LIST.length - 1, Math.max(state.battle.globalUnlockedMaxIndex, idx + 1));
      state.battle.globalUnlockedMaxIndex = nextU;
      if (idx < GLOBAL_BOSS_LIST.length - 1) state.battle.globalActiveIndex = idx + 1;
      pushLog({
        name: t("log_global_boss_win"),
        meta: bossLabel(boss),
        rarity: "SS",
        extra: `+${boss.cubes} ${t("cubes_word")}, +${boss.shards} ${t("shards_word")}`,
      });
      if (boss.id === "global_true_helan_sukuna") {
        // Always play the finale on victory (even in cheat mode). Reset clears this flag.
        state.flags.finalCutsceneShown = true;
        showFinalCutscene();
      }
    } else {
      setGlobalBossHp(idx, newHp);
    }
    renderBattle();
    renderTop();
    autosave();
  }

  function battleHit() {
    if (state.battle.mode === "global") {
      globalBattleHit();
      return;
    }
    const idx = state.battle.activeIndex;
    const boss = BOSS_LIST[idx];
    if (!boss) return;
    let hp = getBattleBossHp(idx);
    if (hp <= 0) {
      setBattleBossHp(idx, boss.maxHp);
      hp = boss.maxHp;
    }
    const dmg = battleClickDamage();
    const newHp = hp - dmg;
    const dmgShowLocal = state.flags?.infiniteBattleDamage ? UI_INFINITY : dmg;
    if (els.battleLastHit) {
      els.battleLastHit.textContent =
        newHp <= 0
          ? `${t("battle_hit_final")} ${dmgShowLocal} ${t("battle_dmg_suffix")}`
          : `${t("battle_hit_normal")} ${dmgShowLocal} ${t("battle_dmg_suffix")}`;
    }

    if (newHp <= 0) {
      state.stats.bossKills = (state.stats.bossKills || 0) + 1;
      state.cubes += boss.cubes;
      state.shards += boss.shards;
      delete state.battle.hp[String(idx)];
      const nextUnlock = Math.min(BOSS_LIST.length - 1, Math.max(state.battle.unlockedMaxIndex, idx + 1));
      state.battle.unlockedMaxIndex = nextUnlock;
      if (idx < BOSS_LIST.length - 1) state.battle.activeIndex = idx + 1;
      if (idx === BOSS_LIST.length - 1) {
        state.battle.localFinalBossWon = true;
        state.battle.globalUnlocked = true;
        pushLog({
          name: t("log_global_mode_unlocked"),
          meta: t("log_global_mode_unlocked_meta"),
          rarity: "SS",
          extra: "",
        });
      }
      pushLog({
        name: t("log_boss_win"),
        meta: bossLabel(boss),
        rarity: "A",
        extra: `+${boss.cubes} ${t("cubes_word")}, +${boss.shards} ${t("shards_word")}`,
      });
    } else {
      setBattleBossHp(idx, newHp);
    }
    renderBattle();
    renderTop();
    autosave();
  }

  function renderBattle() {
    if (!els.battleBossList || !els.battleBossTitle) return;
    if (state.battle.mode === "global" && !state.battle.globalUnlocked) state.battle.mode = "local";

    document.querySelectorAll("[data-battle-tab]").forEach((btn) => {
      const m = btn.getAttribute("data-battle-tab");
      const on = m === state.battle.mode;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
      if (m === "global") {
        btn.disabled = !state.battle.globalUnlocked;
        btn.title = state.battle.globalUnlocked ? "" : t("battle_global_locked_title");
      }
    });
    const hint = document.getElementById("battleModeHint");
    if (hint) {
      if (state.battle.mode === "global") {
        hint.textContent = t("battle_global_sub");
        hint.style.display = "block";
      } else {
        hint.textContent = "";
        hint.style.display = "none";
      }
    }

    if (state.battle.mode === "global") {
      if (els.battleTameWrap) els.battleTameWrap.innerHTML = "";
      const gu = state.battle.globalUnlockedMaxIndex;
      const gActive = state.battle.globalActiveIndex;
      els.battleBossList.innerHTML = "";
      GLOBAL_BOSS_LIST.forEach((b, i) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "battle__bossbtn";
        if (i === gActive) row.classList.add("is-active");
        if (i > gu) row.classList.add("is-locked");
        row.disabled = i > gu;
        row.append(document.createTextNode(`${i + 1}. ${bossLabel(b)}`));
        if (i > gu) {
          const lock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          lock.setAttribute("class", "battle__lock");
          lock.setAttribute("viewBox", "0 0 24 24");
          lock.setAttribute("aria-label", t("lock_aria"));
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("fill", "currentColor");
          path.setAttribute(
            "d",
            "M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2H4v12h16V11h-2z"
          );
          lock.append(path);
          row.append(lock);
        }
        row.addEventListener("click", () => selectGlobalBoss(i));
        els.battleBossList.append(row);
      });

      const gboss = GLOBAL_BOSS_LIST[gActive];
      if (!gboss) return;
      let ghp = getGlobalBossHp(gActive);
      if (ghp <= 0) {
        setGlobalBossHp(gActive, gboss.maxHp);
        ghp = gboss.maxHp;
      }
      els.battleBossTitle.textContent = bossLabel(gboss);
      els.battleHpText.textContent = `HP: ${Math.ceil(ghp).toLocaleString()} / ${gboss.maxHp.toLocaleString()}`;
      const gpct = Math.min(100, Math.max(0, (ghp / gboss.maxHp) * 100));
      if (els.battleHpFill) els.battleHpFill.style.width = `${gpct}%`;
      const gLo = globalClickDamage(gboss);
      const gHi = Math.round(gLo * 1.55);
      if (els.battleDmgHint) {
        els.battleDmgHint.textContent = state.flags?.infiniteBattleDamage
          ? t("battle_dmg_infinite")
          : `${t("battle_global_dmg_hint")} ${gLo.toLocaleString()}–${gHi.toLocaleString()} (${t("battle_dmg_range")})`;
      }
      if (els.battleRewards) {
        const gc = cheatInfinityUi() ? UI_INFINITY : gboss.cubes;
        const gs = cheatInfinityUi() ? UI_INFINITY : gboss.shards;
        els.battleRewards.textContent = `${t("battle_reward_line")} ${gc} ${t("cubes_word")} ${t("battle_reward_sep")} ${gs} ${t("shards_word")}`;
      }
      return;
    }

    const u = state.battle.unlockedMaxIndex;
    const active = state.battle.activeIndex;
    els.battleBossList.innerHTML = "";
    BOSS_LIST.forEach((b, i) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "battle__bossbtn";
      if (i === active) row.classList.add("is-active");
      if (i > u) row.classList.add("is-locked");
      row.disabled = i > u;
      row.append(document.createTextNode(`${i + 1}. ${bossLabel(b)}`));
      if (i > u) {
        const lock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        lock.setAttribute("class", "battle__lock");
        lock.setAttribute("viewBox", "0 0 24 24");
        lock.setAttribute("aria-label", t("lock_aria"));
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "currentColor");
        path.setAttribute(
          "d",
          "M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2H4v12h16V11h-2z"
        );
        lock.append(path);
        row.append(lock);
      }
      row.addEventListener("click", () => selectBattleBoss(i));
      els.battleBossList.append(row);
    });

    const boss = BOSS_LIST[active];
    if (!boss) return;
    let hp = getBattleBossHp(active);
    if (hp <= 0) {
      setBattleBossHp(active, boss.maxHp);
      hp = boss.maxHp;
    }
    els.battleBossTitle.textContent = bossLabel(boss);
    els.battleHpText.textContent = `HP: ${Math.ceil(hp)} / ${boss.maxHp}`;
    const pct = Math.min(100, Math.max(0, (hp / boss.maxHp) * 100));
    if (els.battleHpFill) els.battleHpFill.style.width = `${pct}%`;
    const sample = 12 + (state.upgrades.luck || 0) * 4 + Math.min(40, Object.keys(state.evo || {}).length * 2);
    if (els.battleDmgHint) {
      els.battleDmgHint.textContent = state.flags?.infiniteBattleDamage
        ? t("battle_dmg_infinite")
        : `${t("battle_dmg_hint")} ${sample}–${Math.round(sample * 2)} (${t("battle_dmg_range")})`;
    }
    if (els.battleRewards) {
      const bc = cheatInfinityUi() ? UI_INFINITY : boss.cubes;
      const bs = cheatInfinityUi() ? UI_INFINITY : boss.shards;
      els.battleRewards.textContent = `${t("battle_reward_line")} ${bc} ${t("cubes_word")} ${t("battle_reward_sep")} ${bs} ${t("shards_word")}`;
    }

    if (els.battleTameWrap) {
      els.battleTameWrap.innerHTML = "";
      if (boss.id === "mahoraga") {
        const ratio = hp / boss.maxHp;
        const cheatTame = cheatInfinityUi();
        const canHp = cheatTame || ratio <= MAHORAGA_TAME.maxHpRatio;
        const canRes =
          cheatTame ||
          (state.cubes >= MAHORAGA_TAME.costCubes && state.shards >= MAHORAGA_TAME.costShards);
        const ch = cheatTame ? 1 : mahoragaTameChance();

        const box = document.createElement("div");
        box.className = "battle__tamebox";

        const hint = document.createElement("div");
        hint.className = "battle__tametext";
        if (cheatTame) {
          hint.innerHTML = `<strong>${t("tame_btn")}</strong> — ${t("tame_cheat_hint")} <b>~${(ch * 100).toFixed(2)}%</b>.`;
        } else {
          hint.innerHTML = `<strong>${t("tame_btn")}</strong> — ${t("log_tame_ok_extra")}. ~<b>${(ch * 100).toFixed(2)}%</b>. ${t("confirm_evo_price")} <b>${MAHORAGA_TAME.costCubes}</b> ${t("cubes_word")} + <b>${MAHORAGA_TAME.costShards}</b> ${t("shards_word")}. ≤<b>${Math.round(MAHORAGA_TAME.maxHpRatio * 100)}% HP</b> (${Math.round(ratio * 100)}%).`;
        }

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn--primary battle__tamebtn";
        btn.textContent = t("tame_btn");
        btn.disabled = !canHp || !canRes;
        btn.title = cheatTame
          ? t("tame_btn_title_cheat")
          : canHp && canRes
            ? t("tame_btn_title_ok")
            : !canHp
              ? t("tame_btn_hp")
              : t("tame_btn_res");
        btn.addEventListener("click", () => attemptTameMahoraga());

        if (hasUnique("mahoraga_tamed")) {
          const note = document.createElement("div");
          note.className = "battle__tametext";
          note.style.marginBottom = "8px";
          note.textContent = t("tame_repeat_hint");
          box.append(note);
        }

        box.append(hint, btn);
        els.battleTameWrap.append(box);
      }
    }
  }

  function renderSpecialQuests() {
    if (!els.questListSpecial) return;
    els.questListSpecial.innerHTML = "";
    for (const m of SPECIAL_MISSIONS) {
      const rec = state.specialMissions[m.id];
      if (!rec) continue;
      const rewardChar = CHARACTERS.find((c) => c.id === m.rewardId);
      const row = document.createElement("div");
      row.className = "row";
      const left = document.createElement("div");
      left.className = "row__left";
      const titleEl = document.createElement("div");
      titleEl.className = "row__title";
      titleEl.textContent = t(`special_${m.id}_title`);
      const d = document.createElement("div");
      d.className = "row__desc";
      const pct = Math.round((rec.progress / m.target) * 100);
      d.textContent = `${t(`special_${m.id}_desc`)} ${t("quest_progress")} ${rec.progress} / ${m.target} (${Math.min(100, pct)}%).`;
      left.append(titleEl, d);
      if (rewardChar) {
        const tag = document.createElement("div");
        tag.className = "row__desc";
        tag.style.marginTop = "4px";
        tag.style.color = "var(--o)";
        tag.textContent = `${t("special_reward_tag")} ${charName(rewardChar)}`;
        left.append(tag);
      }

      const right = document.createElement("div");
      right.className = "row__right";
      const rewardEl = document.createElement("div");
      rewardEl.className = "row__cost";
      rewardEl.textContent = rec.claimed ? t("quest_claimed") : t("special_reward_label");
      const btn = document.createElement("button");
      btn.className = "btn btn--glow";
      btn.type = "button";
      btn.textContent = rec.claimed ? t("quest_done") : t("quest_take");
      btn.disabled = rec.claimed || rec.progress < m.target;
      btn.addEventListener("click", () => claimSpecialMission(m.id));
      right.append(rewardEl, btn);
      row.append(left, right);
      els.questListSpecial.append(row);
    }
  }

  function renderQuests() {
    syncSpecialMissionsFromState();
    if (els.questListDaily) {
      els.questListDaily.innerHTML = "";
      for (const q of state.quests) {
        const row = document.createElement("div");
        row.className = "row";
        const left = document.createElement("div");
        left.className = "row__left";
        const titleEl = document.createElement("div");
        titleEl.className = "row__title";
        titleEl.textContent = dailyQuestTitle(q);
        const d = document.createElement("div");
        d.className = "row__desc";
        const pct = Math.round((q.progress / q.target) * 100);
        d.textContent = `${t("quest_progress")} ${q.progress} / ${q.target} (${Math.min(100, pct)}%)`;
        left.append(titleEl, d);

        const right = document.createElement("div");
        right.className = "row__right";
        const reward = Math.round(q.reward * questRewardMultiplier());
        const rewardEl = document.createElement("div");
        rewardEl.className = "row__cost";
        rewardEl.textContent = q.claimed ? t("quest_claimed") : `${t("quest_reward_cubes")} ${reward} ${t("cubes_word")}`;
        const btn = document.createElement("button");
        btn.className = "btn btn--glow";
        btn.type = "button";
        btn.textContent = q.claimed ? t("quest_done") : t("quest_take");
        btn.disabled = q.claimed || q.progress < q.target;
        btn.addEventListener("click", () => claimQuest(q.id));
        right.append(rewardEl, btn);
        row.append(left, right);
        els.questListDaily.append(row);
      }
    }
    renderSpecialQuests();
  }

  function setQuestTab(which) {
    const daily = which === "daily";
    if (els.questListDaily) els.questListDaily.classList.toggle("is-hidden", !daily);
    if (els.questListSpecial) els.questListSpecial.classList.toggle("is-hidden", daily);
    document.querySelectorAll("[data-quest-tab]").forEach((btn) => {
      const on = btn.getAttribute("data-quest-tab") === which;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    const tb = document.querySelector(".quest-toolbar");
    if (tb) tb.style.display = daily ? "" : "none";
  }

  function renderAll() {
    renderTop();
    renderStats();
    renderPity();
    renderCosts();
    renderMission();
    renderCollection();
    renderUpgrades();
    renderQuests();
    renderBattle();
    renderTitles();
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
    for (const b of els.navItems) b.addEventListener("click", () => setTab(b.dataset.tab));

    document.querySelectorAll("[data-quest-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setQuestTab(btn.getAttribute("data-quest-tab") || "daily");
      });
    });
    setQuestTab("daily");

    document.querySelectorAll("[data-battle-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const m = btn.getAttribute("data-battle-tab");
        if (m === "local" || m === "global") setBattleMode(m);
      });
    });

    els.btnRoll1.addEventListener("click", () => doRoll(1));
    els.btnRoll10.addEventListener("click", () => doRoll(10));
    if (els.btnMission) els.btnMission.addEventListener("click", () => doMission());
    if (els.btnGetAll) els.btnGetAll.addEventListener("click", () => applyGetAllCheat());
    if (els.btnCheatUnlock)
      els.btnCheatUnlock.addEventListener("click", () => {
        if (state.flags?.getAllCheatUnlocked) return;
        const raw = window.prompt(t("cheat_prompt"), "");
        if (raw != null && String(raw).replace(/\s/g, "") === CHEAT_GET_ALL_CODE) unlockGetAllButton();
      });

    if (els.btnTitles) els.btnTitles.addEventListener("click", () => openTitles());
    if (els.titlesModal) {
      els.titlesModal.querySelector(".modal__backdrop")?.addEventListener("click", () => closeTitles());
    }
    if (els.btnCloseTitles) els.btnCloseTitles.addEventListener("click", () => closeTitles());

    let cheatBuf = "";
    function cheatKeyHandler(e) {
      if (state.flags?.getAllCheatUnlocked) return;
      const el = e.target;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const d = cheatDigitFromEvent(e);
      if (!d) return;
      cheatBuf = (cheatBuf + d).slice(-32);
      if (cheatBuf.endsWith(CHEAT_GET_ALL_CODE)) unlockGetAllButton();
    }
    window.addEventListener("keydown", cheatKeyHandler, true);

    if (els.btnBattleHit) els.btnBattleHit.addEventListener("click", () => battleHit());
    if (els.battleArena) {
      els.battleArena.addEventListener("click", (e) => {
        if (e.target.closest(".battle__hitbtn")) return;
        battleHit();
      });
    }

    els.btnSave.addEventListener("click", () => {
      saveGame(state);
      pushLog({ name: t("log_saved"), meta: t("log_saved_meta"), rarity: "C", extra: "" });
      renderAll();
    });

    els.btnReset.addEventListener("click", () => {
      const ok = confirm(t("confirm_reset"));
      if (!ok) return;
      hideMahoragaCutscene();
      hideFinalCutscene();
      clearSave();
      state = ensureSpecialMissions(ensureQuests(DEFAULT_STATE()));
      if (!state.flags) state.flags = { sorted: true };
      state.flags.mahoragaCutsceneShown = false;
      state.flags.finalCutsceneShown = false;
      els.resultLog.innerHTML = "";
      setResultCard({ name: t("reset_card_name"), blurb: t("reset_card_blurb"), id: "x" }, "C", "");
      renderAll();
      saveGame(state);
    });

    if (els.collectionFilter) els.collectionFilter.addEventListener("change", () => renderCollection());
    if (els.btnSortCollection)
      els.btnSortCollection.addEventListener("click", () => {
        state.flags.sorted = !state.flags.sorted;
        renderCollection();
        autosave();
      });

    if (els.btnRerollQuests)
      els.btnRerollQuests.addEventListener("click", () => {
        state.questDay = "";
        state = ensureQuests(state);
        pushLog({ name: t("log_quests_reroll"), meta: t("log_quests_reroll_meta"), rarity: "B", extra: "" });
        renderAll();
        autosave();
      });

    if (els.langSelect) {
      els.langSelect.addEventListener("change", () => {
        const v = els.langSelect.value;
        state.lang = v === "en" || v === "ja" || v === "ru" ? v : "ru";
        applyDocumentI18n();
        renderAll();
        autosave();
      });
    }

    const closeMahoragaCs = () => hideMahoragaCutscene();
    if (els.cutsceneMahoraga) {
      els.cutsceneMahoraga.querySelector(".cutscene__backdrop")?.addEventListener("click", closeMahoragaCs);
      document.getElementById("btnCutsceneMahoraga")?.addEventListener("click", closeMahoragaCs);
    }
    const closeFinalCs = () => hideFinalCutscene();
    if (els.cutsceneFinal) {
      els.cutsceneFinal.querySelector(".cutscene__backdrop")?.addEventListener("click", closeFinalCs);
      document.getElementById("btnCutsceneFinal")?.addEventListener("click", closeFinalCs);
    }
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const csM = els.cutsceneMahoraga || document.getElementById("cutsceneMahoraga");
      const csF = els.cutsceneFinal || document.getElementById("cutsceneFinal");
      const mdT = els.titlesModal || document.getElementById("titlesModal");
      if (mdT && !mdT.classList.contains("is-hidden")) {
        e.preventDefault();
        closeTitles();
        return;
      }
      if (csF && !csF.classList.contains("is-hidden")) {
        e.preventDefault();
        hideFinalCutscene();
        return;
      }
      if (csM && !csM.classList.contains("is-hidden")) {
        e.preventDefault();
        hideMahoragaCutscene();
      }
    });
  }

  // Boot
  wireUI();
  applyDocumentI18n();
  // Apply offline AFK gain once on load (only if AFK was enabled when you left).
  claimOfflineAfkGain(Date.now());
  renderAll();
  saveGame(state);

  // +1 cube per second while tab is open.
  setInterval(() => {
    tickOnlineIncome();
    armOfflineAfkTimestamp(Date.now());
    renderTop();
    autosave();
  }, 1000);

  setInterval(() => {
    renderMission();
    // If AFK is enabled, keep timestamp fresh so offline counts from exit time.
    armOfflineAfkTimestamp(Date.now());
    renderTop();
  }, 350);

  window.addEventListener("beforeunload", () => {
    const now = Date.now();
    // Arm offline AFK timestamp at exit.
    armOfflineAfkTimestamp(now);
    saveGame(state);
  });
})();

