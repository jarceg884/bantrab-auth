// Pure-SVG 3D illustration for the auth page right column.
// Matches the reference mockup: large SOLID angular mustard planes crossing
// behind the cubes, a free-floating orange circle, gray cubes with slots,
// and a dark base bar. No external assets.

export default function AuthIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 760 620"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', maxWidth: '560px' }}
    >
      <defs>
        <radialGradient id="orangeBall" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffa25c" />
          <stop offset="55%" stopColor="#f4712e" />
          <stop offset="100%" stopColor="#d9531a" />
        </radialGradient>
        <linearGradient id="planeMustard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0c04a" />
          <stop offset="100%" stopColor="#dda029" />
        </linearGradient>
        <linearGradient id="planeMustard2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e3a92f" />
          <stop offset="100%" stopColor="#c98d1c" />
        </linearGradient>
      </defs>

      {/* ---- large SOLID angular mustard planes (crossing behind the cubes) ---- */}
      {/* plane 1: big tilted slab sweeping from upper-left down behind the cubes */}
      <polygon
        points="60,120 330,40 430,180 160,260"
        fill="url(#planeMustard)"
        opacity="0.96"
      />
      {/* plane 2: narrower slab crossing plane 1, angled the other way */}
      <polygon
        points="250,60 420,110 360,250 190,200"
        fill="url(#planeMustard2)"
        opacity="0.9"
      />
      {/* plane 3: small solid shard floating upper-right */}
      <polygon
        points="560,90 660,120 620,180 520,150"
        fill="url(#planeMustard)"
        opacity="0.92"
      />

      {/* ---- orange circle (free-floating, no mount) ---- */}
      <circle cx="580" cy="180" r="64" fill="url(#orangeBall)" />
      <ellipse cx="562" cy="158" rx="22" ry="13" fill="#ffffff" opacity="0.28" transform="rotate(-28 562 158)" />

      {/* ---- gray cubes (isometric) ---- */}
      {/* Cube A: large, center. Top-center at (380,290), size 170 */}
      <g>
        {/* right face */}
        <polygon points="527,375 380,460 380,594 527,509" fill="#c9cccd" />
        {/* left face */}
        <polygon points="233,375 380,460 380,594 233,509" fill="#b4b8b9" />
        {/* top face */}
        <polygon points="380,290 527,375 380,460 233,375" fill="#dcdfdf" />
        {/* slots on top face */}
        <polygon points="380,317 480,367 457,379 357,329" fill="#9ea3a4" />
        <polygon points="337,339 437,389 414,401 314,351" fill="#a9adaf" />
        <polygon points="294,361 394,411 371,423 271,373" fill="#9ea3a4" />
        {/* edge lines */}
        <polyline points="233,375 380,460 527,375" stroke="#a6aaab" strokeWidth="1.5" fill="none" />
        <polyline points="380,460 380,594" stroke="#a6aaab" strokeWidth="1.5" fill="none" />
      </g>

      {/* Cube B: medium, right of A, sitting lower. Top-center at (600,440), size 105 */}
      <g>
        <polygon points="691,492 600,538 600,620 691,574" fill="#c2c6c7" />
        <polygon points="509,492 600,538 600,620 509,574" fill="#adb1b2" />
        <polygon points="600,446 691,492 600,538 509,492" fill="#d7dada" />
        <polygon points="600,465 658,494 642,502 584,473" fill="#9ea3a4" />
        <polygon points="572,481 630,510 614,518 556,489" fill="#a9adaf" />
      </g>

      {/* Cube C: small, left of A. Top-center at (215,470), size 75 */}
      <g>
        <polygon points="280,507 215,540 215,599 280,566" fill="#c6c9ca" />
        <polygon points="150,507 215,540 215,599 150,566" fill="#b1b5b6" />
        <polygon points="215,477 280,507 215,537 150,507" fill="#dadddd" />
        <polygon points="215,491 257,512 244,518 202,497" fill="#a0a4a5" />
      </g>

      {/* ---- dark base bar (plinth under the cubes) ---- */}
      <g>
        {/* front face */}
        <rect x="120" y="600" width="520" height="20" rx="4" fill="#232326" />
        {/* top face (isometric hint) */}
        <polygon points="134,594 626,594 610,600 150,600" fill="#3a3a3e" />
      </g>
    </svg>
  );
}
