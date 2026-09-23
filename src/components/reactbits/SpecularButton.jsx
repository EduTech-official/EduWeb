/* eslint-disable react/prop-types */
// Source: React Bits (https://www.reactbits.dev) - MIT licensed.[cite: 3]
// Tailwind variant, vendored so it can be themed for EduMinerva.[cite: 3]
import { useRef, useEffect } from 'react'; //[cite: 3]
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl'; //[cite: 3]

const PAD = 20; //[cite: 3]

const SIZES = {
  sm: 'text-[0.85rem] px-[22px] py-[10px]',
  md: 'text-[1rem] px-[30px] py-[14px]',
  lg: 'text-[1.15rem] px-10 py-[18px]'
}; //[cite: 3]

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`; //[cite: 3]

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`; //[cite: 3]

const SpecularButton = ({
  children = 'Get Started',
  size = 'lg',
  radius = 18,
  tint = '#58a6ff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#c9d1d9',
  lineColor = '#58a6ff',
  baseColor = '#21262d',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) => { //[cite: 3]
  const btnRef = useRef(null); //[cite: 3]
  const fxRef = useRef(null); //[cite: 3]
  const propsRef = useRef({}); //[cite: 3]

  propsRef.current = { radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, followMouse, proximity, autoAnimate }; //[cite: 3]

  useEffect(() => { //[cite: 3]
    const btn = btnRef.current; //[cite: 3]
    const fx = fxRef.current; //[cite: 3]
    if (!btn || !fx) return; //[cite: 3]

    const dpr = window.devicePixelRatio || 1; //[cite: 3]
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr }); //[cite: 3]
    const gl = renderer.gl; //[cite: 3]
    gl.clearColor(0, 0, 0, 0); //[cite: 3]
    gl.enable(gl.BLEND); //[cite: 3]
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); //[cite: 3]

    const geometry = new Triangle(gl); //[cite: 3]
    if (geometry.attributes.uv) delete geometry.attributes.uv; //[cite: 3]

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] },
        uBaseColor: { value: [0.32, 0.32, 0.32] },
        uIntensity: { value: 1 },
        uShineSize: { value: 0.17 },
        uShineFade: { value: 0.7 },
        uThickness: { value: 1 },
        uBaseWidth: { value: dpr }
      }
    }); //[cite: 3]

    const mesh = new Mesh(gl, { geometry, program }); //[cite: 3]
    fx.appendChild(gl.canvas); //[cite: 3]

    const sizeRef = { w: 1, h: 1 }; //[cite: 3]
    const resize = () => { //[cite: 3]
      const rect = btn.getBoundingClientRect(); //[cite: 3]
      const w = rect.width; //[cite: 3]
      const h = rect.height; //[cite: 3]
      sizeRef.w = w; //[cite: 3]
      sizeRef.h = h; //[cite: 3]
      renderer.setSize(w + PAD * 2, h + PAD * 2); //[cite: 3]
      program.uniforms.uCenter.value = [(PAD + w / 2) * dpr, (PAD + h / 2) * dpr]; //[cite: 3]
      program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr]; //[cite: 3]
    }; //[cite: 3]
    const ro = new ResizeObserver(resize); //[cite: 3]
    ro.observe(btn); //[cite: 3]
    resize(); //[cite: 3]

    let pointerAngle = null; //[cite: 3]
    let proximityT = 0; //[cite: 3]
    const onPointerMove = e => { //[cite: 3]
      const rect = btn.getBoundingClientRect(); //[cite: 3]
      const cx = rect.left + rect.width / 2; //[cite: 3]
      const cy = rect.top + rect.height / 2; //[cite: 3]
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right); //[cite: 3]
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom); //[cite: 3]
      const dist = Math.hypot(dx, dy); //[cite: 3]
      
      if (dist === 0) { //[cite: 3]
        const nx = (e.clientX - cx) / (rect.width / 2); //[cite: 3]
        const ny = (cy - e.clientY) / (rect.height / 2); //[cite: 3]
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15; //[cite: 3]
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx); //[cite: 3]
      }
      const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity, 1)); //[cite: 3]
      proximityT = t * t * (3 - 2 * t); //[cite: 3]
    }; //[cite: 3]
    window.addEventListener('pointermove', onPointerMove); //[cite: 3]

    let angle = 2.4; //[cite: 3]
    let idleAngle = 2.4; //[cite: 3]
    let bright = 0; //[cite: 3]
    let last = performance.now(); //[cite: 3]
    let raf = 0; //[cite: 3]

    const lineC = new Color(); //[cite: 3]
    const baseC = new Color(); //[cite: 3]

    const update = now => { //[cite: 3]
      raf = requestAnimationFrame(update); //[cite: 3]
      const dt = Math.min((now - last) / 1000, 0.05); //[cite: 3]
      last = now; //[cite: 3]
      const p = propsRef.current; //[cite: 3]

      idleAngle += p.speed * dt; //[cite: 3]
      const steer = p.followMouse && pointerAngle != null && (!p.autoAnimate || proximityT > 0); //[cite: 3]
      const target = steer ? pointerAngle : idleAngle; //[cite: 3]
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI; //[cite: 3]
      angle += diff * (1 - Math.exp(-dt * 7)); //[cite: 3]

      const brightTarget = p.autoAnimate ? 1 : proximityT; //[cite: 3]
      bright += (brightTarget - bright) * (1 - Math.exp(-dt * 8)); //[cite: 3]

      lineC.set(p.lineColor); //[cite: 3]
      baseC.set(p.baseColor); //[cite: 3]
      program.uniforms.uAngle.value = angle; //[cite: 3]
      program.uniforms.uRadius.value = Math.min(p.radius, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr; //[cite: 3]
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b]; //[cite: 3]
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b]; //[cite: 3]
      program.uniforms.uIntensity.value = p.intensity * bright; //[cite: 3]
      program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180; //[cite: 3]
      program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180; //[cite: 3]
      program.uniforms.uThickness.value = p.thickness * dpr; //[cite: 3]
      renderer.render({ scene: mesh }); //[cite: 3]
    }; //[cite: 3]
    raf = requestAnimationFrame(update); //[cite: 3]

    return () => { //[cite: 3]
      cancelAnimationFrame(raf); //[cite: 3]
      ro.disconnect(); //[cite: 3]
      window.removeEventListener('pointermove', onPointerMove); //[cite: 3]
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas); //[cite: 3]
      gl.getExtension('WEBGL_lose_context')?.loseContext(); //[cite: 3]
    }; //[cite: 3]
  }, []); //[cite: 3]

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative m-0 inline-flex cursor-pointer items-center justify-center border-none font-medium leading-none tracking-[0.01em] outline-none transition-transform duration-150 active:scale-[0.97] disabled:cursor-default disabled:opacity-55 disabled:active:scale-100 [color:var(--sb-text-color)] [border-radius:var(--sb-radius)] [background:color-mix(in_srgb,var(--sb-tint)_calc(var(--sb-tint-opacity)*100%),transparent)] [backdrop-filter:blur(var(--sb-blur))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-[3px] ${SIZES[size] || SIZES.md}${className ? ` ${className}` : ''}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-blur': `${blur}px`,
        '--sb-text-color': textColor
      }}
    >
      <span ref={fxRef} aria-hidden="true" className="pointer-events-none absolute -inset-[20px] z-[1] [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full" />
      <span className="relative z-[2]">{children}</span>
    </button>
  ); //[cite: 3]
}; //[cite: 3]

export default SpecularButton; 