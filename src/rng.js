/** @param {number} n */
export function clamp01(n) {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

/** @param {number} min @param {number} max */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @template T
 * @param {Array<{item:T, w:number}>} weighted
 * @returns {T}
 */
export function pickWeighted(weighted) {
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

