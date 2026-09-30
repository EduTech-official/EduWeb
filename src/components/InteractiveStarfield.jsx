import React, { useEffect, useRef } from "react";

// Pure, elegant celestial star colors
const ELEGANT_STAR_COLORS = [
  "#ffffff",
  "#f8fafc",
  "#f1f5f9",
  "#e0f2fe",
  "#ffffff",
  "#dbeafe",
  "#f8fafc",
];

const InteractiveStarfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000 };

    // Dense starry night sky (~1600 - 1900 stars on desktop)
    const starCount = Math.floor((width * height) / 1100);
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const depth = Math.random();

      // Layered sizing
      const baseRadius =
        depth > 0.92
          ? Math.random() * 0.4 + 1.1 // Prominent foreground stars
          : depth > 0.6
          ? Math.random() * 0.3 + 0.75 // Mid-ground stars
          : Math.random() * 0.25 + 0.35; // Deep distant star dust

      const baseAlpha =
        depth > 0.92
          ? Math.random() * 0.3 + 0.55
          : depth > 0.6
          ? Math.random() * 0.3 + 0.3
          : Math.random() * 0.25 + 0.15;

      // Varied twinkling behavior: active sparkling vs slow pulsing
      const isSparkler = Math.random() > 0.65;
      const twinkleSpeed = isSparkler
        ? Math.random() * 0.045 + 0.02 // Fast sparkling
        : Math.random() * 0.02 + 0.008; // Gentle breathing

      const twinkleAmplitude = isSparkler
        ? Math.random() * 0.4 + 0.35 // Higher sparkle flare
        : Math.random() * 0.25 + 0.2; // Smooth pulsation

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius,
        baseAlpha,
        twinkleSpeed,
        twinkleAmplitude,
        twinklePhase: Math.random() * Math.PI * 2,
        color: ELEGANT_STAR_COLORS[Math.floor(Math.random() * ELEGANT_STAR_COLORS.length)],
        isSparkler,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    let isPaused = false;
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let time = 0;
    const PROXIMITY_RADIUS = 150;

    const render = () => {
      if (!isPaused) {
        ctx.clearRect(0, 0, width, height);
        time += 1;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];

          // Continuous organic twinkling all the time
          const naturalTwinkle =
            Math.sin(time * star.twinkleSpeed + star.twinklePhase) *
            star.twinkleAmplitude;

          // Extra shimmer pulse for sparkling stars
          const sparklePulse =
            star.isSparkler && naturalTwinkle > 0.25
              ? (naturalTwinkle - 0.25) * 0.8
              : 0;

          // Distance from cursor
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let proximityGlow = 0;
          let proximitySize = 0;

          if (dist < PROXIMITY_RADIUS) {
            const factor = 1 - dist / PROXIMITY_RADIUS;
            const eased = factor * factor;
            proximityGlow = eased * 0.75;
            proximitySize = eased * 1.1;
          }

          const currentAlpha = Math.min(
            1,
            Math.max(
              0.04,
              star.baseAlpha + naturalTwinkle + sparklePulse + proximityGlow
            )
          );
          const currentRadius =
            star.baseRadius + (sparklePulse > 0 ? 0.3 : 0) + proximitySize;

          // Draw star point
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();

          // Soft twinkle halo when cursor is near or when star reaches peak sparkle
          if (proximityGlow > 0.1 || (star.isSparkler && currentAlpha > 0.8)) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, currentRadius * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = Math.max(proximityGlow * 0.3, 0.12);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};

export default InteractiveStarfield;
