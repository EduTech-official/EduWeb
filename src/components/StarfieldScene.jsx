/* eslint-disable react/prop-types, react/no-unknown-property */
// react/no-unknown-property is disabled because <points>, geometry and material
// are react-three-fiber intrinsics, not DOM attributes. Gloabe.jsx disables the
// same rule for the same reason.
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  MathUtils,
  PointsMaterial,
} from "three";

// Deliberately imports from @react-three/fiber only. @react-three/drei is an
// 881 kB dependency and is reserved for the Contact page globe, so pulling it in
// here would undo the bundle work.

const PALETTE = {
  white: new Color("#ffffff"),
  ice: new Color("#cfe3ff"),
  pink: new Color("#e61aa1"),
  green: new Color("#0cf996"),
};

// PointsMaterial draws a flat square quad by default, which reads as blocky
// pixels rather than stars. Painting a radial falloff once into a 64px canvas
// and using it as the sprite gives every point a soft round glow. Generated in
// code so it costs no network request.
let spriteTexture = null;
const getStarSprite = () => {
  if (spriteTexture) return spriteTexture;

  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.22)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  spriteTexture = new CanvasTexture(canvas);
  return spriteTexture;
};

// Random point inside a spherical shell. Using acos on a uniform variable keeps
// the distribution even; naive phi = random * PI clumps stars at the poles.
const buildLayer = (count, innerRadius, thickness) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = innerRadius + Math.random() * thickness;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const roll = Math.random();
    let tint = PALETTE.white;
    if (roll > 0.975) tint = PALETTE.pink;
    else if (roll > 0.95) tint = PALETTE.green;
    else if (roll > 0.6) tint = PALETTE.ice;

    colors[i * 3] = tint.r;
    colors[i * 3 + 1] = tint.g;
    colors[i * 3 + 2] = tint.b;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  return geometry;
};

const StarLayer = ({ count, innerRadius, thickness, size, opacity, spin }) => {
  const ref = useRef();

  const geometry = useMemo(
    () => buildLayer(count, innerRadius, thickness),
    [count, innerRadius, thickness],
  );

  const material = useMemo(
    () =>
      new PointsMaterial({
        size,
        map: getStarSprite(),
        vertexColors: true,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    [size, opacity],
  );

  // Geometries and materials are not garbage collected on their own. Without
  // this the GPU leaks memory every time the scene remounts.
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  // Delta based rotation. Multiplying by delta rather than a fixed step keeps the
  // speed identical on 60 Hz and 120 Hz screens, which is what stops the drift
  // from looking jittery.
  useFrame((_, delta) => {
    if (!ref.current) return;
    const step = Math.min(delta, 0.05);
    ref.current.rotation.y += step * spin;
    ref.current.rotation.x += step * spin * 0.35;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
};

// Eases the whole starfield toward the pointer. The canvas sits behind the page
// with pointer-events disabled, so it never receives pointer events itself and
// fiber's own state.pointer would stay at zero. Tracking on window instead is
// what makes the parallax actually respond.
const ParallaxRig = ({ children, strength }) => {
  const group = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Frame rate independent damping. A plain lerp with a fixed factor eases at a
  // different speed on 60 Hz and 120 Hz displays; this keeps it identical.
  useFrame((_, delta) => {
    if (!group.current) return;
    const damping = 1 - Math.pow(0.0015, Math.min(delta, 0.05));

    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      target.current.y * 0.16 * strength,
      damping,
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      target.current.x * 0.22 * strength,
      damping,
    );
  });

  return <group ref={group}>{children}</group>;
};

const StarfieldScene = ({ quality = "high", paused = false, still = false }) => {
  const isLow = quality === "low";
  // "still" renders the same starfield with no drift and no pointer parallax,
  // for visitors who asked their OS for reduced motion.
  const spinScale = still ? 0 : 1;

  return (
    <Canvas
      // Capping DPR matters more here than anywhere else on the site: a phone at
      // DPR 3 would otherwise shade nine times the pixels for a background.
      dpr={[1, isLow ? 1.25 : 1.5]}
      // Stops the render loop entirely when the tab is in the background, so it
      // does not sit there draining battery behind other windows.
      frameloop={paused ? "never" : "always"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }}
      camera={{ fov: 70, near: 0.1, far: 260, position: [0, 0, 1] }}
      style={{ pointerEvents: "none" }}
    >
      <ParallaxRig strength={still ? 0 : (isLow ? 0.6 : 1)}>
        <StarLayer
          count={isLow ? 420 : 1100}
          innerRadius={26}
          thickness={34}
          size={0.55}
          opacity={0.95}
          spin={0.012 * spinScale}
        />
        <StarLayer
          count={isLow ? 260 : 700}
          innerRadius={62}
          thickness={44}
          size={0.85}
          opacity={0.6}
          spin={0.007 * spinScale}
        />
        <StarLayer
          count={isLow ? 150 : 380}
          innerRadius={104}
          thickness={52}
          size={1.25}
          opacity={0.32}
          spin={0.004 * spinScale}
        />
      </ParallaxRig>
    </Canvas>
  );
};

export default StarfieldScene;
