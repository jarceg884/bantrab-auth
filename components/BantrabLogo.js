// Bantrab logo — geometric mark rebuilt from the provided brand image:
// yellow square (top-right), magenta parallelogram (below), teal parallelogram (left),
// plus the BANTRAB wordmark and tagline.
export default function BantrabLogo({ size = 160, withWordmark = true }) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bantrab"
    >
      {/* Teal parallelogram (left) */}
      <path d="M20 130 L100 130 L100 230 L20 230 Z" fill="#00ACAA" transform="translate(0,-10) skewY(-12) translate(0,20)" />
      {/* Yellow square (top-right) */}
      <rect x="100" y="10" width="80" height="80" fill="#FFE200" />
      {/* Magenta parallelogram (below yellow) */}
      <path d="M105 100 L185 100 L185 180 L105 180 Z" fill="#DE0066" transform="skewX(-14) translate(30,0)" />
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
          color: #3c4043;
        }
        .logo-tagline {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #6b7280;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
