import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";

// One shared backdrop for the whole site, lazy so it never blocks first paint.
// This replaced the three.js starfield: ogl is a fraction of three.js's size, so
// three.js now only downloads on /contact for the globe.
const RippleGrid = lazy(() => import("./reactbits/RippleGrid"));

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isMeteredConnection = () => {
  const connection =
    typeof navigator === "undefined"
      ? null
      : navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return false;
  return Boolean(connection.saveData) || /(^|-)2g$/.test(connection.effectiveType || "");
};

// Some older phones and locked down browsers have no usable WebGL context. This
// probe is cheap and prevents a blank canvas or a thrown error on those devices.
const hasWebGL = () => {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
};

const BasicComp = () => {
  const [bg, setBg] = useState({ enabled: false, calm: false, light: false });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (isMeteredConnection() || !hasWebGL()) return;

    // Lighter settings for phones and low-core machines: a coarser grid means
    // far fewer bright fragments to shade every frame.
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    const weakCpu = (navigator.hardwareConcurrency || 8) <= 4;

    setBg({
      enabled: true,
      calm: prefersReducedMotion(),
      light: smallScreen || weakCpu,
    });
  }, []);

  // Stop rendering entirely when the tab is hidden so it cannot drain battery
  // in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      {/* Fixed backdrop shared by every route, so the theme is identical
          site-wide. It never participates in layout. */}
      <div className="site-backdrop" aria-hidden="true">
        {bg.enabled && !paused && (
          <Suspense fallback={null}>
            <div className="site-backdrop__scene">
              <RippleGrid
                gridColor="#48a8d8"
                gridSize={bg.light ? 8 : 10}
                gridThickness={bg.light ? 10 : 8}
                rippleIntensity={bg.calm ? 0 : 0.045}
                fadeDistance={3}
                vignetteStrength={1.6}
                glowIntensity={bg.light ? 0.14 : 0.2}
                opacity={0.42}
                mouseInteraction={!bg.calm}
                mouseInteractionRadius={1.2}
              />
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
};

export default BasicComp;
