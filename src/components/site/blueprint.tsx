/**
 * Faded blueprint of an industrial site behind the hero: grid, two structural frames,
 * a tower crane, a few dimension lines. A slow light sweep passes over the linework.
 */
export function Blueprint() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="blueprint absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <pattern id="bp-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M200 0H0V200" stroke="currentColor" strokeWidth="0.9" />
          </pattern>
          <radialGradient id="bp-fade" cx="68%" cy="55%" r="62%">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="bp-mask">
            <rect width="1600" height="900" fill="url(#bp-fade)" />
          </mask>
          <linearGradient id="bp-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="bp-sweep-mask">
            <rect className="blueprint-sweep" x="-600" y="0" width="520" height="900" fill="url(#bp-sweep)" />
          </mask>
        </defs>

        <g mask="url(#bp-mask)" className="text-foreground">
          <rect width="1600" height="900" fill="url(#bp-grid)" opacity="0.5" />
          <rect width="1600" height="900" fill="url(#bp-grid-major)" opacity="0.7" />

          <g id="bp-art" transform="translate(220 -40)" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            {/* ground line */}
            <path d="M0 700H1600" strokeWidth="1.4" />
            {/* left structural frame, 3 bays x 3 storeys */}
            <g>
              {[260, 380, 500, 620].map((x) => (
                <path key={x} d={`M${x} 700V400`} />
              ))}
              {[400, 500, 600, 700].map((y) => (
                <path key={y} d={`M260 ${y}H620`} />
              ))}
              {/* diagonal bracing */}
              <path d="M260 700L380 600M380 700L260 600M500 500L620 400M620 500L500 400" strokeWidth="0.8" strokeDasharray="4 5" />
              {/* footings */}
              {[260, 380, 500, 620].map((x) => (
                <path key={`f${x}`} d={`M${x - 14} 700v16h28v-16`} strokeWidth="0.9" />
              ))}
            </g>
            {/* right long-span frame with roof trusses */}
            <g>
              {[900, 1040, 1180, 1320, 1460].map((x) => (
                <path key={x} d={`M${x} 700V470`} />
              ))}
              <path d="M900 470H1460M900 560H1460" />
              <path d="M900 470L970 420L1040 470L1110 420L1180 470L1250 420L1320 470L1390 420L1460 470" strokeWidth="0.9" />
              <path d="M900 420H1460" strokeWidth="0.8" strokeDasharray="6 6" />
              {[900, 1040, 1180, 1320, 1460].map((x) => (
                <path key={`f${x}`} d={`M${x - 14} 700v16h28v-16`} strokeWidth="0.9" />
              ))}
            </g>
            {/* tower crane */}
            <g>
              <path d="M760 700V180" strokeWidth="1.4" />
              <path d="M748 700V180M772 700V180" strokeWidth="0.7" />
              <path d="M748 660L772 630M772 660L748 630M748 600L772 570M772 600L748 570M748 540L772 510M772 540L748 510M748 480L772 450M772 480L748 450M748 420L772 390M772 420L748 390M748 360L772 330M772 360L748 330M748 300L772 270M772 300L748 270M748 240L772 210M772 240L748 210" strokeWidth="0.6" />
              {/* jib */}
              <path d="M700 190H1180" strokeWidth="1.3" />
              <path d="M700 176H1180" strokeWidth="0.7" />
              <path d="M760 150L1180 190M760 150L700 190" strokeWidth="0.8" />
              <path d="M760 150V120" strokeWidth="1" />
              {/* counterweight */}
              <path d="M700 190v22h40v-22" strokeWidth="1" />
              {/* hook line and load */}
              <path d="M1060 190V330" strokeWidth="0.8" strokeDasharray="3 4" />
              <path d="M1040 330h40v18h-40z" strokeWidth="1" />
            </g>
            {/* excavation / earthworks outline */}
            <path d="M40 700L120 760H520L600 700" strokeWidth="0.9" strokeDasharray="5 6" />
            {/* dimension lines */}
            <g strokeWidth="0.7">
              <path d="M260 760H620M260 752v16M620 752v16" />
              <path d="M900 760H1460M900 752v16M1460 752v16" />
              <path d="M220 400V700M212 400h16M212 700h16" />
            </g>
            {/* section markers */}
            <circle cx="180" cy="400" r="12" strokeWidth="0.9" />
            <circle cx="180" cy="560" r="12" strokeWidth="0.9" />
            <circle cx="1520" cy="470" r="12" strokeWidth="0.9" />
          </g>

          {/* shimmer: the same linework, brighter, revealed by a moving band */}
          <g mask="url(#bp-sweep-mask)" className="text-brand">
            <use href="#bp-art" />
          </g>
        </g>
      </svg>
    </div>
  );
}
