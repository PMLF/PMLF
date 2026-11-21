// Regenerates the README's SVGs: `node assets/generate.mjs`
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = dirname(fileURLToPath(import.meta.url));

const themes = {
  dark: {
    bg: "#0a0a0a",
    stripe: "rgba(255,255,255,0.018)",
    line: "rgba(255,255,255,0.09)",
    border: "rgba(255,255,255,0.08)",
    text: "#fafafa",
    muted: "#a3a3a3",
    dim: "#5c5c5c",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.16)",
    glow: "rgba(245,158,11,0.10)",
    floodlight: "rgba(255,244,214,0.07)",
  },
  light: {
    bg: "#fbfaf7",
    stripe: "rgba(21,128,61,0.025)",
    line: "rgba(10,10,10,0.10)",
    border: "rgba(10,10,10,0.08)",
    text: "#0a0a0a",
    muted: "#525252",
    dim: "#a3a3a3",
    accent: "#d97706",
    accentSoft: "rgba(217,119,6,0.14)",
    glow: "rgba(217,119,6,0.06)",
    floodlight: "rgba(255,255,255,0)",
  },
};

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const baseStyle = (t) => `
  .sans { font-family: ${SANS}; }
  .mono { font-family: ${MONO}; letter-spacing: 2.5px; }
  .up { animation: up .8s cubic-bezier(.2,.7,.2,1) both; }
  .fade { animation: fade 1.2s ease both; }
  .pulse { animation: pulse 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  @keyframes up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse { 0%,100% { opacity: .25; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.25); } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;

const stripes = (x, y, w, h, n, t, vertical = true) =>
  Array.from({ length: n }, (_, i) =>
    i % 2
      ? vertical
        ? `<rect x="${x + (w / n) * i}" y="${y}" width="${w / n}" height="${h}" fill="${t.stripe}"/>`
        : `<rect x="${x}" y="${y + (h / n) * i}" width="${w}" height="${h / n}" fill="${t.stripe}"/>`
      : ""
  ).join("");

function header(t, mode) {
  const W = 840, H = 300;
  const stats = [
    ["6+", "SEASONS SHIPPING"],
    ["8", "CLIENT PROJECTS"],
    ["700+", "ART CUSTOMERS"],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Pedro Fonseca, design engineer, illustrator, teacher and founder. Matchday card, number 26.">
<style>${baseStyle(t)}
  .flood { animation: flood 6s ease-in-out infinite; }
  @keyframes flood { 0%,100% { opacity: .75; } 50% { opacity: 1; } }
</style>
<defs>
  <clipPath id="c"><rect width="${W}" height="${H}" rx="18"/></clipPath>
  <radialGradient id="fl" cx="0.9" cy="-0.1" r="0.9"><stop offset="0" stop-color="${t.floodlight}"/><stop offset="1" stop-color="${t.floodlight}" stop-opacity="0"/></radialGradient>
  <linearGradient id="num" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.accent}" stop-opacity=".95"/><stop offset="1" stop-color="${t.accent}" stop-opacity=".12"/></linearGradient>
  <radialGradient id="gl" cx="0.82" cy="0.62" r="0.45"><stop offset="0" stop-color="${t.glow}"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
</defs>
<g clip-path="url(#c)">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  ${stripes(0, 0, W, H, 12, t)}
  <rect width="${W}" height="${H}" fill="url(#gl)"/>
  ${mode === "dark" ? `<rect class="flood" width="${W}" height="${H}" fill="url(#fl)"/>` : ""}
  <line x1="640" y1="0" x2="640" y2="${H}" stroke="${t.line}"/>
  <circle cx="640" cy="${H / 2}" r="92" fill="none" stroke="${t.line}"/>
  <circle cx="640" cy="${H / 2}" r="3" fill="${t.line}"/>
  <text x="${W - 36}" y="246" text-anchor="end" class="sans up" style="animation-delay:.3s" font-size="230" font-weight="900" letter-spacing="-6" fill="url(#num)">26</text>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="17.5" fill="none" stroke="${t.border}"/>

<g class="fade">
  <text x="40" y="46" class="mono" font-size="11.5" fill="${t.muted}">MATCHDAY · LISBON, PT</text>
  <circle class="pulse" cx="${W - 238}" cy="42" r="4" fill="${t.accent}"/>
  <text x="${W - 226}" y="46" class="mono" font-size="11.5" fill="${t.muted}">ON THE PITCH · FUTURICE</text>
</g>
<g class="up" style="animation-delay:.1s">
  <text x="36" y="120" class="sans" font-size="68" font-weight="900" letter-spacing="-2.5" fill="${t.text}">PEDRO</text>
</g>
<g class="up" style="animation-delay:.2s">
  <text x="36" y="180" class="sans" font-size="68" font-weight="900" letter-spacing="-2.5" fill="${t.text}">FONSECA<tspan fill="${t.accent}">.</tspan></text>
</g>
<g class="up" style="animation-delay:.35s">
  <text x="40" y="214" class="sans" font-size="17" fill="${t.muted}"><tspan fill="${t.text}" font-weight="700">Design Engineer.</tspan> Illustrator. Teacher. Founder.</text>
</g>
<g class="up" style="animation-delay:.5s">
  <line x1="40" y1="236" x2="560" y2="236" stroke="${t.line}"/>
  ${stats
    .map(
      ([n, l], i) => `
  <text x="${40 + i * 180}" y="268" class="sans" font-size="22" font-weight="900" letter-spacing="-.5" fill="${t.accent}">${n}</text>
  <text x="${40 + i * 180}" y="284" class="mono" font-size="9" letter-spacing="1.6" fill="${t.dim}">${l}</text>`
    )
    .join("")}
</g>
</svg>`;
}

function lineup(t) {
  const W = 840, H = 540;
  const px = 40, py = 70, pw = 760, ph = 400;
  const rows = [
    [130, ["Next.js", "D3", "Claude Code"], [240, 420, 600]],
    [228, ["React", "Tailwind", "TanStack"], [260, 420, 580]],
    [326, ["Jest", "Playwright", "Storybook", "a11y"], [160, 330, 510, 680]],
    [418, ["TypeScript"], [420]],
  ];
  let k = 0;
  const players = rows
    .flatMap(([y, names, xs]) =>
      names.map((n, i) => {
        const d = (0.15 + k++ * 0.08).toFixed(2);
        return `<g class="up" style="animation-delay:${d}s">
    <circle class="pulse" style="animation-delay:${(k * 0.37).toFixed(2)}s" cx="${xs[i]}" cy="${y}" r="15" fill="${t.accentSoft}"/>
    <circle cx="${xs[i]}" cy="${y}" r="6" fill="${t.accent}"/>
    <text x="${xs[i]}" y="${y + 34}" text-anchor="middle" class="sans" font-size="15" font-weight="700" fill="${t.text}">${n}</text>
  </g>`;
      })
    )
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Starting XI in a 4-3-3. Forwards: Next.js, D3, Claude Code. Midfield: React, Tailwind, TanStack. Defence: Jest, Playwright, Storybook, accessibility. Goalkeeper: TypeScript. Bench: Redux, Leaflet, Git.">
<style>${baseStyle(t)}</style>
<defs><clipPath id="p"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12"/></clipPath></defs>
<rect width="${W}" height="${H}" rx="18" fill="${t.bg}"/>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="17.5" fill="none" stroke="${t.border}"/>

<text x="40" y="44" class="mono" font-size="11.5" fill="${t.muted}">STARTING XI</text>
<text x="${W - 40}" y="44" text-anchor="end" class="mono" font-size="11.5" fill="${t.muted}">FORMATION <tspan fill="${t.accent}">4-3-3</tspan></text>

<g clip-path="url(#p)">
  ${stripes(px, py, pw, ph, 8, t, false)}
  <circle cx="420" cy="${py}" r="70" fill="none" stroke="${t.line}"/>
  <rect x="270" y="${py + ph - 90}" width="300" height="90" fill="none" stroke="${t.line}"/>
  <rect x="355" y="${py + ph - 34}" width="130" height="34" fill="none" stroke="${t.line}"/>
  <path d="M 370 ${py + ph - 90} A 60 60 0 0 1 470 ${py + ph - 90}" fill="none" stroke="${t.line}"/>
</g>
<rect x="${px + 0.5}" y="${py + 0.5}" width="${pw - 1}" height="${ph - 1}" rx="12" fill="none" stroke="${t.line}"/>

  ${players}

<g class="fade" style="animation-delay:1.2s">
  <text x="40" y="512" class="mono" font-size="11.5" fill="${t.dim}">BENCH</text>
  <text x="122" y="512" class="sans" font-size="15" fill="${t.muted}">Redux  ·  Leaflet  ·  Git</text>
</g>
</svg>`;
}

function fixture(t, { no, title, lines, tags }) {
  const W = 410, H = 200;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}: ${lines.join(" ")}">
<style>${baseStyle(t)}</style>
<rect width="${W}" height="${H}" rx="16" fill="${t.bg}"/>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="15.5" fill="none" stroke="${t.border}"/>
<defs><clipPath id="f"><rect width="${W}" height="${H}" rx="16"/></clipPath></defs>
<rect width="4" height="${H}" fill="${t.accent}" clip-path="url(#f)"/>
<text x="28" y="38" class="mono" font-size="10.5" fill="${t.muted}">FIXTURE ${no}</text>
<g class="up">
  <text x="26" y="76" class="sans" font-size="25" font-weight="900" letter-spacing="-.8" fill="${t.text}">${title}</text>
  ${lines.map((l, i) => `<text x="28" y="${102 + i * 19}" class="sans" font-size="13.5" fill="${t.muted}">${l}</text>`).join("\n  ")}
</g>
<line x1="28" y1="150" x2="${W - 24}" y2="150" stroke="${t.line}"/>
<text x="28" y="177" class="mono" font-size="9.5" letter-spacing="1.2" fill="${t.dim}">${tags}</text>
</svg>`;
}


const icons = {
  site: (c) => `<circle cx="8" cy="8" r="6.5" fill="none" stroke="${c}" stroke-width="1.4"/><ellipse cx="8" cy="8" rx="2.8" ry="6.5" fill="none" stroke="${c}" stroke-width="1.4"/><line x1="1.5" y1="8" x2="14.5" y2="8" stroke="${c}" stroke-width="1.4"/>`,
  linkedin: (c) => `<rect x="1" y="1" width="14" height="14" rx="3" fill="none" stroke="${c}" stroke-width="1.4"/><line x1="5" y1="7" x2="5" y2="11.5" stroke="${c}" stroke-width="1.6"/><circle cx="5" cy="4.6" r=".9" fill="${c}"/><path d="M8 11.5 V7 M8 8.8 C8 6.4 11.5 6.2 11.5 8.6 V11.5" fill="none" stroke="${c}" stroke-width="1.5"/>`,
  mail: (c) => `<rect x="1" y="3" width="14" height="10" rx="2" fill="none" stroke="${c}" stroke-width="1.4"/><path d="M1.8 4 L8 8.8 L14.2 4" fill="none" stroke="${c}" stroke-width="1.4"/>`,
  art: (c) => `<path d="M2.5 13.5 L3.2 10.4 L11 2.6 L13.4 5 L5.6 12.8 Z M9.6 4 L12 6.4" fill="none" stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>`,
};

function button(t, icon, label) {
  const H = 40, W = Math.round(52 + label.length * 7.9);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="10" fill="${t.bg}" stroke="${t.border}"/>
<g transform="translate(16 12)">${icons[icon](t.accent)}</g>
<text x="42" y="24.5" font-family="${MONO}" font-size="12.5" letter-spacing=".4" fill="${t.text}">${label}</text>
</svg>`;
}

const buttons = { site: "pedrofonseca.dev", linkedin: "LinkedIn", mail: "pedro@pedro26.pt", art: "pedro26.pt" };

const logo = (f) => readFileSync(join(OUT, "logos", f));
const futuricePaths = logo("futurice.svg").toString().replace(/^<svg[^>]*>|<\/svg>$/g, "");
const dataUri = (f) => `data:image/png;base64,${logo(f).toString("base64")}`;
const hex = (c) => [1, 3, 5].map((i) => (parseInt(c.slice(i, i + 2), 16) / 255).toFixed(3));

const notes = {
  club: {
    label: "CURRENT CLUB",
    mark: (t) => `<svg x="28" y="54" width="97" height="20" viewBox="0 0 116 24">${futuricePaths.replaceAll('fill="#000"', `fill="${t.text}"`)}</svg>`,
    lines: ["Building digital products.", "Previously at KWAN and Deloitte."],
  },
  coaching: {
    label: "COACHING JOBS · FORMER",
    mark: (t) => `<text x="28" y="72" class="sans" font-size="19" font-weight="900" letter-spacing="-.5" fill="${t.text}">EDIT <tspan fill="${t.dim}" font-weight="400">·</tspan> As Raparigas do Código</text>`,
    lines: ["Git &amp; React tutor at EDIT – Disruptive", "Digital Education. Mentor for women in tech."],
  },
  art: {
    label: "OFF THE PITCH · FOUNDER",
    mark: (t) => {
      const [r, g, b] = hex(t.text);
      return `<filter id="ink"><feColorMatrix type="matrix" values="0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 1 0"/></filter>
<image x="28" y="53" width="147" height="22" href="${dataUri("p26.png")}" filter="url(#ink)"/>`;
    },
    lines: ["My football illustration brand.", "700+ customers, from fans to clubs."],
  },
  home: {
    label: "HOME GROUND",
    mark: (t) => `<image x="28" y="44" width="25" height="38" href="${dataUri("caldas.png")}"/>
<text x="63" y="70" class="sans" font-size="19" font-weight="900" letter-spacing="-.5" fill="${t.text}">Caldas Sport Clube</text>`,
    lines: ["The club from my hometown.", "Where most of my art starts."],
  },
};

function note(t, { label, mark, lines }) {
  const W = 410, H = 150;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}: ${lines.join(" ")}">
<style>${baseStyle(t)}</style>
<rect width="${W}" height="${H}" rx="16" fill="${t.bg}"/>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="15.5" fill="none" stroke="${t.border}"/>
<text x="28" y="34" class="mono" font-size="10.5" fill="${t.accent}">${label}</text>
<g class="up">
${mark(t)}
${lines.map((l, i) => `<text x="28" y="${106 + i * 19}" class="sans" font-size="13.5" fill="${t.muted}">${l}</text>`).join("\n")}
</g>
</svg>`;
}

const fixtures = {
  liga: {
    no: "01",
    title: "liga-atlantica",
    lines: ["A fictional Portuguese football league, built", "as a component-driven testing playground."],
    tags: "NEXT 16 · STORYBOOK 10 · MSW",
  },
  site: {
    no: "02",
    title: "pedrofonseca.dev",
    lines: ["My bilingual portfolio: code, illustration,", "teaching and writing on one page."],
    tags: "NEXT 16 · REACT 19 · TAILWIND 4",
  },
};

for (const [mode, t] of Object.entries(themes)) {
  writeFileSync(join(OUT, `matchday-${mode}.svg`), header(t, mode));
  writeFileSync(join(OUT, `lineup-${mode}.svg`), lineup(t));
  for (const [key, label] of Object.entries(buttons)) writeFileSync(join(OUT, `btn-${key}-${mode}.svg`), button(t, key, label));
  for (const [key, n] of Object.entries(notes)) writeFileSync(join(OUT, `note-${key}-${mode}.svg`), note(t, n));
  for (const [key, f] of Object.entries(fixtures)) writeFileSync(join(OUT, `fixture-${key}-${mode}.svg`), fixture(t, f));
}
