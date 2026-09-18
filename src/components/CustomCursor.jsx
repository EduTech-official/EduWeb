import { useEffect, useRef } from "react";

// Selectors that should make the cursor react. Kept broad but explicit so the
// cursor never "lights up" over plain text.
const INTERACTIVE = 'a, button, [role="button"], summary, label[for], select, [data-cursor="hover"]';
const TEXT_FIELD = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, [contenteditable="true"]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frame = useRef(0);

  // Kept in refs, never in state: this updates every frame, and setState here
  // would re-render the tree 60+ times a second.
  const pointer = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Touch and pen users already have a real pointer. A fake one would just lag
    // behind their finger, so this only runs for an actual mouse.
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return undefined;

    // Reduced motion does not mean "no cursor". It means no trailing lag: the
    // ring snaps to the pointer instead of easing behind it, so there is no
    // independent movement on screen.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : 0.18;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return undefined;

    // Stay hidden until the mouse actually moves. Without this the ring parks at
    // the origin and shows as a stray circle in the top-left corner on load.
    let seenPointer = false;
    const onMove = (e) => {
      if (!seenPointer) {
        seenPointer = true;
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        dot.classList.remove("is-hidden");
        ringEl.classList.remove("is-hidden");
      }
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(TEXT_FIELD)) {
        ringEl.dataset.state = "text";
      } else if (t.closest(INTERACTIVE)) {
        ringEl.dataset.state = "hover";
      } else {
        ringEl.dataset.state = "default";
      }
    };

    const onDown = () => ringEl.classList.add("is-pressed");
    const onUp = () => ringEl.classList.remove("is-pressed");
    // Both layers fade out together when the mouse leaves the window.
    const onLeave = () => {
      dot.classList.add("is-hidden");
      ringEl.classList.add("is-hidden");
    };
    const onEnter = () => {
      if (!seenPointer) return;
      dot.classList.remove("is-hidden");
      ringEl.classList.remove("is-hidden");
    };

    // The dot tracks the pointer exactly; the ring eases toward it. That lag is
    // what reads as "smooth" rather than mechanical.
    const tick = () => {
      const p = pointer.current;
      const r = ring.current;
      r.x += (p.x - r.x) * ease;
      r.y += (p.y - r.y) * ease;

      dot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%)`;
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // aria-hidden and pointer-events:none in CSS: this must never intercept a
  // click or be announced by a screen reader.
  return (
    <>
      <div ref={dotRef} className="cursor-dot is-hidden" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring is-hidden" data-state="default" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
