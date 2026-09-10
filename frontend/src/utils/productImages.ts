/**
 * Generates branded SVG product images for the TSSA store.
 * Each image includes a gold "TSSA" name tag.
 */

type ProductKind =
  | 'jersey'
  | 'training'
  | 'scarf'
  | 'cap'
  | 'football'
  | 'jacket'
  | 'bottle';

const svg = (body: string, bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="${bg}"/>
      ${body}
      <rect x="140" y="330" width="120" height="36" rx="6" fill="#facc15"/>
      <text x="200" y="355" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#1e3a8a" text-anchor="middle">TSSA</text>
    </svg>`
  )}`;

const jersey = (main: string, accent: string) =>
  `<path d="M120 60 L160 40 L200 55 L240 40 L280 60 L310 110 L270 130 L270 320 L130 320 L130 130 L90 110 Z" fill="${main}" stroke="${accent}" stroke-width="6"/>
   <path d="M160 40 Q200 75 240 40" fill="none" stroke="${accent}" stroke-width="6"/>
   <text x="200" y="200" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="${accent}" text-anchor="middle">10</text>`;

const footballSvg = () =>
  `<circle cx="200" cy="190" r="110" fill="#ffffff" stroke="#111827" stroke-width="6"/>
   <polygon points="200,130 245,165 228,220 172,220 155,165" fill="#111827"/>
   <path d="M200 80 L200 130 M290 150 L245 165 M255 260 L228 220 M145 260 L172 220 M110 150 L155 165" stroke="#111827" stroke-width="6"/>`;

const scarfSvg = (c1: string, c2: string) =>
  `<rect x="60" y="150" width="280" height="80" rx="10" fill="${c1}"/>
   <rect x="60" y="150" width="40" height="80" fill="${c2}"/>
   <rect x="140" y="150" width="40" height="80" fill="${c2}"/>
   <rect x="220" y="150" width="40" height="80" fill="${c2}"/>
   <rect x="300" y="150" width="40" height="80" fill="${c2}"/>
   <rect x="55" y="230" width="290" height="20" fill="${c2}"/>`;

const capSvg = (main: string, accent: string) =>
  `<path d="M110 200 Q110 110 200 110 Q290 110 290 200 Z" fill="${main}"/>
   <ellipse cx="200" cy="205" rx="120" ry="22" fill="${accent}"/>
   <circle cx="200" cy="105" r="10" fill="${accent}"/>`;

const jacketSvg = (main: string, accent: string) =>
  `<path d="M120 70 L165 50 L200 70 L235 50 L280 70 L315 130 L275 150 L275 330 L125 330 L125 150 L85 130 Z" fill="${main}" stroke="${accent}" stroke-width="6"/>
   <line x1="200" y1="70" x2="200" y2="330" stroke="${accent}" stroke-width="6"/>`;

const bottleSvg = (main: string) =>
  `<rect x="165" y="80" width="70" height="30" rx="6" fill="#374151"/>
   <rect x="150" y="110" width="100" height="220" rx="20" fill="${main}" stroke="#374151" stroke-width="5"/>
   <rect x="150" y="180" width="100" height="50" fill="#facc15"/>`;

const trainingSvg = (main: string, accent: string) =>
  `<path d="M130 80 L170 60 L200 75 L230 60 L270 80 L295 125 L260 140 L260 300 L140 300 L140 140 L105 125 Z" fill="${main}" stroke="${accent}" stroke-width="6"/>
   <rect x="150" y="300" width="100" height="30" fill="${accent}"/>`;

export const getProductImage = (kind: ProductKind): string => {
  switch (kind) {
    case 'jersey':
      return svg(jersey('#1d4ed8', '#facc15'), '#eff6ff');
    case 'training':
      return svg(trainingSvg('#ffffff', '#1d4ed8'), '#dbeafe');
    case 'scarf':
      return svg(scarfSvg('#1d4ed8', '#facc15'), '#eff6ff');
    case 'cap':
      return svg(capSvg('#1e3a8a', '#facc15'), '#eff6ff');
    case 'football':
      return svg(footballSvg(), '#dcfce7');
    case 'jacket':
      return svg(jacketSvg('#111827', '#facc15'), '#e5e7eb');
    case 'bottle':
      return svg(bottleSvg('#3b82f6'), '#eff6ff');
    default:
      return svg('', '#e5e7eb');
  }
};

// Variant for the away jersey (white/gold instead of blue)
export const getAwayJerseyImage = (): string =>
  svg(jersey('#f8fafc', '#1d4ed8'), '#dbeafe');
