// Bantrab logo — 4-blade pinwheel/turbine mark rebuilt from the brand image:
// sheared parallelogram blades (one sharp corner pointing outward) arranged at
// 90° rotations around a small white hub gap:
//   yellow #FFE200 (top-right), magenta #DE0066 (bottom-right),
//   teal #00ACAA (bottom-left), gray #D2D7DB (top-left)
// Blades touch but don't overlap; small white gaps between them and at center.
// Below the mark: BANTRAB wordmark (#1C1C1B) and letter-spaced tagline.
const BLADES = [
  { color: '#FFE200', rotate: 0 }, // top-right
  { color: '#DE0066', rotate: 90 }, // bottom-right
  { color: '#00ACAA', rotate: 180 }, // bottom-left
  { color: '#D2D7DB', rotate: 270 }, // top-left
];

// One blade drawn in the top-right quadrant; the other three are 90° rotations
// around the center (100,100). Geometry leaves a small white hub gap and thin
// white channels between blades.
const BLADE_PATH = 'M106 94 L118 22 L188 22 L176 94 Z';

export default function BantrabLogo({ size = 160, withWordmark = true }) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bantrab"
    >
      {BLADES.map(({ color, rotate }) => (
        <path
          key={color}
          d={BLADE_PATH}
          fill={color}
          transform={`rotate(${rotate} 100 100)`}
        />
      ))}
    </svg>
  );

  if (!withWordmark) return mark;

  return (
    <div className="logo-block">
      {mark}
      <div className="logo-text">
        <span className="logo-wordmark">BANTRAB</span>
        <span className="logo-tagline">TU BIENESTAR ES NUESTRO TRABAJO</span>
      </div>
      <style jsx>{`
        .logo-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .logo-wordmark {
          font-weight: 800;
          font-size: 28px;
          letter-spacing: 0.18em;
          color: #1c1c1b;
        }
        .logo-tagline {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #1c1c1b;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
