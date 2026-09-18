/* eslint-disable react/prop-types, react/no-unknown-property */
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Earth = ({ hovered }) => {
  const earth = useGLTF("./planet/scene.gltf");
  const ref = useRef();

  // Gentle bob plus a scale-up on hover. Delta based so the speed is the same
  // on 60 Hz and 120 Hz displays.
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.6) * 0.08;

    const target = hovered ? 2.35 : 2.1;
    const step = 1 - Math.pow(0.005, Math.min(delta, 0.05));
    ref.current.scale.setScalar(
      ref.current.scale.x + (target - ref.current.scale.x) * step,
    );
  });

  return <primitive ref={ref} object={earth.scene} scale={2.1} />;
};

const EarthCanvas = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      shadows
      frameloop="always"
      // Capping device pixel ratio at 1.5 avoids rendering 4x the pixels on
      // high density phone screens.
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{ cursor: "inherit", touchAction: "pan-y" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          // Slows the spin while the visitor is inspecting it.
          autoRotateSpeed={hovered ? 0.6 : 2}
          enableZoom={false}
          enablePan={false}
          // Damping is what makes a drag feel weighted instead of rigid, and
          // opening the polar range lets people actually tilt the globe. It was
          // previously pinned to a single angle, so drags did almost nothing.
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.72}
          minPolarAngle={Math.PI * 0.28}
        />
        <Earth hovered={hovered} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
