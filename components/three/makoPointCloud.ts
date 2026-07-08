/**
 * Parametric mako shark point cloud — the shark is grown from math,
 * not loaded from a model file. Zero external assets, deterministic
 * output (seeded PRNG), unmistakable silhouette at particle density.
 *
 * Anatomy, in local space before the final flip (nose +X → tail −X):
 *  - Fusiform body: pointed snout, max girth ~42% back, tapering to
 *    a narrow caudal peduncle. Elliptical cross-sections (taller than
 *    wide, like a real mako).
 *  - Lunate caudal fin: large swept upper lobe, smaller lower lobe.
 *  - Dorsal fin: swept-back blade just aft of the girth line.
 *  - Paired pectoral fins: swept back, down and out from the belly.
 *
 * The cloud is flipped at the end so the nose faces −X (screen-left,
 * toward the hero copy — the shark regards the reader).
 */

export type MakoCloud = {
  /** Formed positions on the shark surface (xyz per particle). */
  shark: Float32Array;
  /** Dispersed drift positions in the ambient volume (xyz). */
  drift: Float32Array;
  /** Per-particle random seed [0,1). */
  rand: Float32Array;
  /** Per-particle base point size. */
  size: Float32Array;
  /** 1 = participates in the shark form, 0 = ambient plankton. */
  role: Float32Array;
  count: number;
};

/** Deterministic PRNG so the shark is identical on every visit. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Body radius profile: 0 at nose and peduncle, max girth forward of middle. */
function girth(t: number): number {
  const s = Math.pow(t, 0.8);
  return Math.pow(Math.max(4 * s * (1 - s), 0), 0.65);
}

export function buildMakoCloud(count: number, seed = 20260707): MakoCloud {
  const rng = mulberry32(seed);
  const shark = new Float32Array(count * 3);
  const drift = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const size = new Float32Array(count);
  const role = new Float32Array(count);

  // ── proportions (unit-ish space; scene scales the group) ──
  const NOSE_X = 2.0;
  const PED_X = -1.6; // caudal peduncle
  const BODY_LEN = NOSE_X - PED_X;
  const R_Y = 0.46; // max half-height
  const R_Z = 0.34; // max half-width
  const FUZZ = 0.022; // surface fuzz — soft, made-of-light edges

  const AMBIENT_SHARE = 0.3; // plankton that never joins the form

  /** Sample a point inside a (thin) triangle, weighted toward the base edge. */
  const triPoint = (
    a: [number, number, number],
    b: [number, number, number],
    c: [number, number, number],
    thickness: number
  ): [number, number, number] => {
    // Barycentric with sqrt bias so density hugs the base (a→b edge)
    let u = rng();
    let v = rng();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    v *= Math.sqrt(rng()); // thin out toward the tip
    const w = 1 - u - v;
    return [
      a[0] * w + b[0] * u + c[0] * v + (rng() - 0.5) * thickness,
      a[1] * w + b[1] * u + c[1] * v + (rng() - 0.5) * thickness,
      a[2] * w + b[2] * u + c[2] * v + (rng() - 0.5) * thickness * 3
    ];
  };

  const bodyPoint = (): [number, number, number] => {
    // Rejection-sample t by circumference so density is even over the hide
    let t = rng();
    while (rng() > girth(t) * 0.92 + 0.08) t = rng();
    const g = girth(t);
    const x = NOSE_X - t * BODY_LEN;
    const ySpine = 0.06 * Math.sin(Math.PI * t); // subtle dorsal arc
    const theta = rng() * Math.PI * 2;
    const rr = 1 + (rng() - 0.5) * 0.08; // hide is not machine-perfect
    return [
      x + (rng() - 0.5) * FUZZ,
      ySpine + Math.sin(theta) * R_Y * g * rr + (rng() - 0.5) * FUZZ,
      Math.cos(theta) * R_Z * g * rr + (rng() - 0.5) * FUZZ
    ];
  };

  const caudalPoint = (): [number, number, number] => {
    // Two lobes of the crescent tail; upper dominant (mako signature)
    const upper = rng() < 0.62;
    return upper
      ? triPoint([PED_X, 0.02, 0], [PED_X - 0.32, 0.14, 0], [-2.3, 0.92, 0], 0.03)
      : triPoint([PED_X, -0.02, 0], [PED_X - 0.28, -0.12, 0], [-2.12, -0.62, 0], 0.03);
  };

  const dorsalPoint = (): [number, number, number] =>
    triPoint([-0.05, 0.4, 0], [-0.72, 0.3, 0], [-0.8, 0.98, 0], 0.026);

  const pectoralPoint = (): [number, number, number] => {
    const sideZ = rng() < 0.5 ? 1 : -1;
    const p = triPoint(
      [0.62, -0.26, 0.16 * sideZ],
      [0.18, -0.3, 0.2 * sideZ],
      [-0.42, -0.78, 0.58 * sideZ],
      0.024
    );
    return p;
  };

  for (let i = 0; i < count; i++) {
    const r = rng();
    rand[i] = r;

    const ambient = rng() < AMBIENT_SHARE;
    role[i] = ambient ? 0 : 1;

    // ── shark surface position (only meaningful when role = 1) ──
    let p: [number, number, number];
    const zone = rng();
    if (zone < 0.76) p = bodyPoint();
    else if (zone < 0.87) p = caudalPoint();
    else if (zone < 0.92) p = dorsalPoint();
    else p = pectoralPoint();

    // Flip: nose faces −X (screen-left, toward the copy)
    shark[i * 3] = -p[0];
    shark[i * 3 + 1] = p[1];
    shark[i * 3 + 2] = p[2];

    // ── dispersed drift home in the ambient volume ──
    drift[i * 3] = (rng() - 0.5) * 14;
    drift[i * 3 + 1] = (rng() - 0.5) * 7;
    drift[i * 3 + 2] = (rng() - 0.5) * 5 - 0.5;

    // ── point size: plankton small, hide medium, rare pearls bright ──
    const sparkle = r > 0.975;
    const base = ambient ? 1.3 + rng() * 1.6 : 1.9 + rng() * 2.2;
    size[i] = sparkle ? base * 2.3 : base;
  }

  return { shark, drift, rand, size, role, count };
}
