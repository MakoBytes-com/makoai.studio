/**
 * The pricing page's resident anglerfish — decorative chrome for the
 * empty water to the right of the hero. Pure SVG + CSS keyframes
 * (see globals.css `.angler-*`): a slow drift, a swaying tail and
 * pectoral fin, and a pulsing bioluminescent lure in lumen cyan.
 *
 * Dark theme only — `[data-theme='light']` hides it, the same way the
 * rest of the abyss chrome yields to the light surface. Pointer-inert
 * and aria-hidden: it can never block a click or reach a crawler.
 */
export default function AnglerFish() {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="angler-fish w-full h-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="angler-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#132b52" />
          <stop offset="55%" stopColor="#0a1832" />
          <stop offset="100%" stopColor="#060e20" />
        </linearGradient>
        <radialGradient id="angler-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(94, 234, 255, 0.85)" />
          <stop offset="35%" stopColor="rgba(94, 234, 255, 0.28)" />
          <stop offset="100%" stopColor="rgba(94, 234, 255, 0)" />
        </radialGradient>
      </defs>

      {/* Tail — sways from its joint against the body */}
      <g className="angler-tail">
        <path
          d="M415 180 C448 158 470 146 494 128 C483 164 484 198 493 238 C468 224 446 214 415 212 Z"
          fill="rgba(59, 130, 246, 0.14)"
          stroke="rgba(94, 234, 255, 0.22)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>

      {/* Body, open mouth included in the outline */}
      <path
        d="M118 158
           C150 116 204 95 262 97
           C332 100 393 129 418 178
           C425 190 425 204 417 215
           C389 262 321 287 252 281
           C196 276 151 254 108 225
           C133 214 151 205 168 196
           C151 187 134 172 118 158 Z"
        fill="url(#angler-body)"
        stroke="rgba(94, 234, 255, 0.18)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Dorsal fin */}
      <path
        d="M268 103 C288 72 330 68 354 90 C331 95 301 102 280 111 Z"
        fill="rgba(59, 130, 246, 0.14)"
        stroke="rgba(94, 234, 255, 0.2)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Pectoral fin — its own slow flutter */}
      <g className="angler-fin">
        <path
          d="M293 216 C324 226 346 251 352 278 C322 268 299 249 287 230 Z"
          fill="rgba(59, 130, 246, 0.16)"
          stroke="rgba(94, 234, 255, 0.22)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>

      {/* Teeth — thin, translucent, deliberately a little crooked */}
      <g fill="rgba(201, 249, 255, 0.65)">
        <path d="M133 165 L139 180 L143 167 Z" />
        <path d="M148 176 L154 191 L158 178 Z" />
        <path d="M162 187 L166 199 L170 189 Z" />
        <path d="M126 217 L136 206 L138 216 Z" />
        <path d="M142 210 L151 200 L153 210 Z" />
      </g>

      {/* Eye */}
      <circle cx="212" cy="152" r="11" fill="rgba(154, 242, 255, 0.22)" />
      <circle cx="212" cy="152" r="6" fill="#9af2ff" opacity="0.9" />
      <circle cx="210" cy="150" r="2.2" fill="#020509" />

      {/* Bioluminescent flank dots */}
      <g fill="#5eeaff" opacity="0.32">
        <circle cx="252" cy="192" r="2" />
        <circle cx="282" cy="201" r="2" />
        <circle cx="312" cy="207" r="2" />
        <circle cx="342" cy="209" r="2" />
        <circle cx="370" cy="206" r="1.6" />
      </g>

      {/* Illicium + esca — the rod and the glowing lure */}
      <g className="angler-rod">
        <path
          d="M234 100 C212 52 162 38 131 80"
          stroke="rgba(154, 242, 255, 0.55)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          className="angler-lure-glow"
          cx="129"
          cy="83"
          r="30"
          fill="url(#angler-glow)"
        />
        <circle cx="129" cy="83" r="6.5" fill="#bff6ff" />
      </g>
    </svg>
  );
}
