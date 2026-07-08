"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { buildMakoCloud } from "./makoPointCloud";

/**
 * The living centerpiece: tens of thousands of GPU particles drifting
 * as plankton that coalesce into a swimming mako. All motion lives in
 * the vertex shader — the CPU only eases a handful of uniforms.
 *
 * uForm 0 → 1 : dispersed current → formed shark (intro, and reversed
 *               again by scroll as the visitor dives past the hero).
 * uPointer    : world-space cursor; nearby particles are gently pushed
 *               aside, so brushing the shark disturbs its light.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uForm;
  uniform float uPixelRatio;
  uniform float uFade;
  uniform vec3 uPointer;

  attribute vec3 aShark;
  attribute float aRand;
  attribute float aSize;
  attribute float aRole;

  varying vec3 vColor;
  varying float vAlpha;

  // Layered-sine pseudo-curl: cheap, organic, no texture fetch.
  vec3 driftOffset(vec3 p, float t, float r) {
    return vec3(
      sin(t * 0.11 + p.y * 0.55 + r * 6.2832) * 0.55,
      sin(t * 0.14 + p.z * 0.75 + r * 3.11) * 0.4,
      cos(t * 0.09 + p.x * 0.42 + r * 9.42) * 0.35
    );
  }

  void main() {
    float t = uTime;

    // ── dispersed home: drift with the current (slow +X flow, wrapped) ──
    vec3 dp = position;
    dp += driftOffset(position, t, aRand);
    dp.x = mod(dp.x + t * 0.22 + 7.0, 14.0) - 7.0;

    // ── formed home: ride the shark's hide, undulating ──
    vec3 sp = aShark;
    // Lateral traveling wave, amplitude growing nose → tail.
    // Nose is at −X ≈ −2, tail at +X ≈ +2.3 (cloud is pre-flipped).
    float tail = smoothstep(-1.2, 2.3, aShark.x);
    sp.z += sin(aShark.x * 2.1 - t * 2.6) * 0.16 * tail;
    sp.y += sin(t * 0.55) * 0.045;            // gentle whole-body bob
    sp += driftOffset(aShark, t * 1.8, aRand) * 0.016; // hide shimmer

    float form = uForm * aRole;
    vec3 p = mix(dp, sp, form);

    // ── pointer repulsion: light parts around a touch ──
    vec3 away = p - uPointer;
    float d = length(away);
    p += normalize(away + 0.0001) * smoothstep(1.1, 0.0, d) * 0.4 * form;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (5.4 / -mv.z);

    // ── bioluminescence ──
    vec3 deep  = vec3(0.231, 0.510, 0.965);  // tide
    vec3 lumen = vec3(0.369, 0.918, 1.0);    // cyan glow
    vec3 pearl = vec3(0.788, 0.976, 1.0);    // rare bright motes
    vec3 c = mix(deep, lumen, aRand * aRand);
    if (aRand > 0.975) c = pearl;

    float flicker = 0.72 + 0.28 * sin(t * (1.0 + aRand * 2.2) + aRand * 40.0);
    float bodyGlow = mix(0.38, 1.0, form);   // formed hide burns brighter
    float depthFog = 1.0 - smoothstep(4.0, 11.0, -mv.z);

    vColor = c * flicker;
    vAlpha = bodyGlow * depthFog * uFade;
  }
`;

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Hot core, soft halo — additive blending turns this into bloom.
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.4);
    gl_FragColor = vec4(vColor * (0.35 + glow), core * vAlpha);
  }
`;

export default function MakoParticles({
  count,
  formed
}: {
  count: number;
  /** Ref-like driver: 0..1, eased outside (intro + scroll). */
  formed: { current: number };
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const pointerWorld = useRef(new THREE.Vector3(999, 999, 0));

  const cloud = useMemo(() => buildMakoCloud(count), [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(cloud.drift, 3));
    g.setAttribute("aShark", new THREE.BufferAttribute(cloud.shark, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(cloud.rand, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(cloud.size, 1));
    g.setAttribute("aRole", new THREE.BufferAttribute(cloud.role, 1));
    // The cloud roams a fixed volume — skip per-frame culling math.
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 20);
    return g;
  }, [cloud]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uForm: { value: 0 },
      uFade: { value: 1 },
      uPixelRatio: { value: 1 },
      uPointer: { value: pointerWorld.current }
    }),
    []
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);
    m.uniforms.uForm.value = formed.current;
    m.uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    // Pointer in world space at the shark's plane (z ≈ 0)
    pointerWorld.current.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    // The whole school leans subtly toward the cursor — parallax life
    if (group.current) {
      const g = group.current;
      g.rotation.y += (pointer.x * 0.14 - g.rotation.y) * 0.04;
      g.rotation.x += (-pointer.y * 0.08 - g.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={mat}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
