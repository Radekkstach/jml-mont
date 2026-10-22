/*!
 * <stch-signature> — podpis STCH Studia do patičky klientských webů.
 *
 * Jeden soubor, žádné závislosti, funguje v čistém HTML, Astru, Reactu, Vue…
 *   <script type="module" src="/stch-signature.js"></script>
 *   <stch-signature></stch-signature>
 *
 * Co dělá:
 *   1. Když k němu návštěvník doscrolluje, logo se poskládá z barevného „prachu" teček
 *      (motiv z hero nového webu) a usadí se do čistého loga v barvě textu patičky.
 *   2. Při najetí / fokusu se logo přelije do barev značky, kolem se ručně dokreslí
 *      kroužek a odletí pár jisker.
 *
 * Popisek a logo jsou jedna pevná značka (lockup): popisek je v našem písmu Unbounded,
 * ale převedený na křivky (make-label-paths.py) — vypadá všude stejně, klientský
 * web nestahuje žádný font. Výška jeho verzálek = třetina výšky loga, nikdy se nezalomí.
 * Barvu přebírá z okolí (currentColor), takže sedí na světlé i tmavé patičce.
 * Volitelné atributy:
 *   lang="cs|en|de"     jazyk popisku (jinak podle <html lang>)
 *   href="…"            kam vede (výchozí https://www.stchstudio.cz)
 * Volitelné CSS proměnné na prvku:
 *   --stch-size  velikost (výchozí 13px)   --stch-ink  barva loga (výchozí currentColor)
 *   --stch-muted barva popisku             --stch-gap  mezera popisek–logo
 *
 * Výkon: plátno s tečkami běží jen během animace (pak se zastaví), žádné filter: blur
 * (Safari na iPhonu), prefers-reduced-motion = bez letících teček a kreslení.
 */

// Logo STCH jako čistý vektor (stejné jako na stchstudio.cz, viewBox 0 0 216.9 100)
const LOGO_PATH =
  "M0 16A16 16 0 0 1 16 0H106.1A22.6 22.6 0 0 0 99.5 16.2H79.1V98.5A1.5 1.5 0 0 1 77.6 100H63.5A1.5 1.5 0 0 1 62 98.5V16.2H21.5A4.5 4.5 0 0 0 17 20.7V38L46.6 48.5Q51 50.06 51 54V84A16 16 0 0 1 35 100H16A16 16 0 0 1 0 84V67.8A1.5 1.5 0 0 1 1.5 66.3H15.5A1.5 1.5 0 0 1 17 67.8V79.1A4.5 4.5 0 0 0 21.5 83.6H29.8A4.5 4.5 0 0 0 34.3 79.1V62L3.6 50.97Q0 49.68 0 46ZM34.4 22.7H49.8A1.2 1.2 0 0 1 51 23.9V32.5A1.2 1.2 0 0 1 49.8 33.7H35.6A1.2 1.2 0 0 1 34.4 32.5ZM85.4 22.7H92.9L115.3 49.9L85.4 87.2V63.25L96 50.02L85.4 37.15ZM106.1 28.19V16A16 16 0 0 1 122.1 0H140.4A16 16 0 0 1 156.4 16V32A1.2 1.2 0 0 1 155.2 33.2H141.6A1.2 1.2 0 0 1 140.4 32V20.8A4.5 4.5 0 0 0 135.9 16.3H126.9A4.5 4.5 0 0 0 122.4 20.8V47.98ZM122.4 51.76V79.2A4.5 4.5 0 0 0 126.9 83.7H135.9A4.5 4.5 0 0 0 140.4 79.2V67.6A1.5 1.5 0 0 1 141.9 66.1H154.9A1.5 1.5 0 0 1 156.4 67.6V84A16 16 0 0 1 140.4 100H122.1A16 16 0 0 1 106.1 84V72.1ZM167.7 0H181.3A1.5 1.5 0 0 1 182.8 1.5V41.8H200.2V1.5A1.5 1.5 0 0 1 201.7 0H215.4A1.5 1.5 0 0 1 216.9 1.5V98.5A1.5 1.5 0 0 1 215.4 100H201.7A1.5 1.5 0 0 1 200.2 98.5V58.1H182.8V98.5A1.5 1.5 0 0 1 181.3 100H167.7A1.5 1.5 0 0 1 166.2 98.5V1.5A1.5 1.5 0 0 1 167.7 0Z";
const LOGO_W = 216.9;
const LOGO_H = 100;

// Popisky pro čtečky (vidět jsou křivky z LABELS níž)
const TEXT = {
  cs: "Web vytvořilo",
  en: "Website by",
  de: "Website von",
};

// Popisky jako křivky z Unbounded SemiBold, prostrkané verzálky (generuje make-label-paths.py).
// Jednotky písma: y 0 = horní hrana verzálek, 750 = účaří.
const LABELS = {
  "cs": {
    "w": 12359,
    "d": "M1003 671 942 672 1139 0H1338L1103 750H862L635 98H714L488 750H246L11 0H211L408 671L348 670L575 0H775ZM2193 305V445H1650V305ZM1778 375 1728 685 1649 595H2225V750H1539L1597 375L1539 0H2220V155H1649L1728 65ZM2984 382 3000 345Q3088 347 3144 372Q3201 397 3228 440Q3256 484 3256 540Q3256 601 3228 648Q3200 696 3144 723Q3089 750 3006 750H2466L2524 365L2466 0H2987Q3091 0 3148 48Q3206 97 3206 182Q3206 229 3184 272Q3162 315 3114 344Q3066 374 2984 382ZM2652 704 2580 615H2961Q3010 615 3037 591Q3065 568 3065 525Q3065 482 3034 456Q3004 431 2944 431H2632V299H2920Q2961 299 2988 276Q3015 252 3015 211Q3015 178 2992 157Q2968 135 2925 135H2581L2652 46L2705 365ZM4327 666H4245L4543 0H4742L4390 750H4177L3824 0H4027ZM5245 750V387H5434V750ZM4893 0H5102L5382 356H5295L5575 0H5784L5400 488L5278 490ZM6244 84H6433V750H6244ZM5952 0H6725V167H5952ZM7388 666H7306L7604 0H7803L7451 750H7238L6885 0H7088ZM8425 766Q8293 766 8194 717Q8094 668 8039 580Q7984 492 7984 375Q7984 258 8039 170Q8094 82 8194 33Q8293 -16 8425 -16Q8557 -16 8657 33Q8756 82 8812 170Q8867 258 8867 375Q8867 492 8812 580Q8756 668 8657 717Q8557 766 8425 766ZM8425 597Q8503 597 8559 570Q8615 544 8646 494Q8676 444 8676 375Q8676 306 8646 256Q8615 206 8559 180Q8503 153 8425 153Q8348 153 8292 180Q8236 206 8205 256Q8174 306 8174 375Q8174 444 8205 494Q8236 544 8292 570Q8348 597 8425 597ZM9250 330H9531Q9584 330 9615 306Q9646 281 9646 237Q9646 193 9615 168Q9584 144 9531 144H9223L9308 51V750H9119V0H9556Q9640 0 9703 30Q9766 60 9801 113Q9836 166 9836 237Q9836 307 9801 360Q9766 413 9703 443Q9640 473 9556 473H9250ZM9371 399H9584L9860 750H9641ZM9555 -56H9356L9205 -221H9361L9498 -117H9413L9550 -221H9705ZM10099 0H10288V750H10099ZM10763 0V666L10678 583H11240V750H10574V0ZM11878 766Q11746 766 11647 717Q11547 668 11492 580Q11437 492 11437 375Q11437 258 11492 170Q11547 82 11647 33Q11746 -16 11878 -16Q12010 -16 12110 33Q12209 82 12265 170Q12320 258 12320 375Q12320 492 12265 580Q12209 668 12110 717Q12010 766 11878 766ZM11878 597Q11956 597 12012 570Q12068 544 12099 494Q12129 444 12129 375Q12129 306 12099 256Q12068 206 12012 180Q11956 153 11878 153Q11801 153 11745 180Q11689 206 11658 256Q11627 306 11627 375Q11627 444 11658 494Q11689 544 11745 570Q11801 597 11878 597Z"
  },
  "en": {
    "w": 9070,
    "d": "M1003 671 942 672 1139 0H1338L1103 750H862L635 98H714L488 750H246L11 0H211L408 671L348 670L575 0H775ZM2193 305V445H1650V305ZM1778 375 1728 685 1649 595H2225V750H1539L1597 375L1539 0H2220V155H1649L1728 65ZM2984 382 3000 345Q3088 347 3144 372Q3201 397 3228 440Q3256 484 3256 540Q3256 601 3228 648Q3200 696 3144 723Q3089 750 3006 750H2466L2524 365L2466 0H2987Q3091 0 3148 48Q3206 97 3206 182Q3206 229 3184 272Q3162 315 3114 344Q3066 374 2984 382ZM2652 704 2580 615H2961Q3010 615 3037 591Q3065 568 3065 525Q3065 482 3034 456Q3004 431 2944 431H2632V299H2920Q2961 299 2988 276Q3015 252 3015 211Q3015 178 2992 157Q2968 135 2925 135H2581L2652 46L2705 365ZM3467 505H3658Q3663 539 3689 565Q3715 591 3759 605Q3802 619 3860 619Q3943 619 3990 596Q4038 573 4038 531Q4038 499 4010 481Q3983 464 3908 456L3763 441Q3612 426 3544 371Q3477 316 3477 221Q3477 146 3521 93Q3566 40 3646 12Q3727 -16 3835 -16Q3942 -16 4024 15Q4106 46 4155 101Q4204 156 4208 230H4017Q4013 199 3989 178Q3966 156 3926 144Q3887 131 3832 131Q3756 131 3712 153Q3667 174 3667 214Q3667 244 3694 261Q3720 278 3788 286L3941 303Q4046 314 4109 338Q4172 362 4200 404Q4228 446 4228 510Q4228 587 4182 645Q4135 702 4052 734Q3968 766 3857 766Q3742 766 3656 733Q3569 700 3519 641Q3470 583 3467 505ZM4476 0H4665V750H4476ZM5188 84H5377V750H5188ZM4896 0H5669V167H4896ZM6531 305V445H5988V305ZM6116 375 6066 685 5987 595H6563V750H5877L5935 375L5877 0H6558V155H5987L6066 65ZM7714 382 7730 345Q7818 347 7874 372Q7931 397 7958 440Q7986 484 7986 540Q7986 601 7958 648Q7930 696 7874 723Q7819 750 7736 750H7196L7254 365L7196 0H7717Q7821 0 7878 48Q7936 97 7936 182Q7936 229 7914 272Q7892 315 7844 344Q7796 374 7714 382ZM7382 704 7310 615H7691Q7740 615 7767 591Q7795 568 7795 525Q7795 482 7764 456Q7734 431 7674 431H7362V299H7650Q7691 299 7718 276Q7745 252 7745 211Q7745 178 7722 157Q7698 135 7655 135H7311L7382 46L7435 365ZM8521 750V387H8710V750ZM8169 0H8378L8658 356H8571L8851 0H9060L8676 488L8554 490Z"
  },
  "de": {
    "w": 10272,
    "d": "M1003 671 942 672 1139 0H1338L1103 750H862L635 98H714L488 750H246L11 0H211L408 671L348 670L575 0H775ZM2193 305V445H1650V305ZM1778 375 1728 685 1649 595H2225V750H1539L1597 375L1539 0H2220V155H1649L1728 65ZM2984 382 3000 345Q3088 347 3144 372Q3201 397 3228 440Q3256 484 3256 540Q3256 601 3228 648Q3200 696 3144 723Q3089 750 3006 750H2466L2524 365L2466 0H2987Q3091 0 3148 48Q3206 97 3206 182Q3206 229 3184 272Q3162 315 3114 344Q3066 374 2984 382ZM2652 704 2580 615H2961Q3010 615 3037 591Q3065 568 3065 525Q3065 482 3034 456Q3004 431 2944 431H2632V299H2920Q2961 299 2988 276Q3015 252 3015 211Q3015 178 2992 157Q2968 135 2925 135H2581L2652 46L2705 365ZM3467 505H3658Q3663 539 3689 565Q3715 591 3759 605Q3802 619 3860 619Q3943 619 3990 596Q4038 573 4038 531Q4038 499 4010 481Q3983 464 3908 456L3763 441Q3612 426 3544 371Q3477 316 3477 221Q3477 146 3521 93Q3566 40 3646 12Q3727 -16 3835 -16Q3942 -16 4024 15Q4106 46 4155 101Q4204 156 4208 230H4017Q4013 199 3989 178Q3966 156 3926 144Q3887 131 3832 131Q3756 131 3712 153Q3667 174 3667 214Q3667 244 3694 261Q3720 278 3788 286L3941 303Q4046 314 4109 338Q4172 362 4200 404Q4228 446 4228 510Q4228 587 4182 645Q4135 702 4052 734Q3968 766 3857 766Q3742 766 3656 733Q3569 700 3519 641Q3470 583 3467 505ZM4476 0H4665V750H4476ZM5188 84H5377V750H5188ZM4896 0H5669V167H4896ZM6531 305V445H5988V305ZM6116 375 6066 685 5987 595H6563V750H5877L5935 375L5877 0H6558V155H5987L6066 65ZM7651 666H7569L7867 0H8066L7714 750H7501L7148 0H7351ZM8688 766Q8556 766 8457 717Q8357 668 8302 580Q8247 492 8247 375Q8247 258 8302 170Q8357 82 8457 33Q8556 -16 8688 -16Q8820 -16 8920 33Q9019 82 9075 170Q9130 258 9130 375Q9130 492 9075 580Q9019 668 8920 717Q8820 766 8688 766ZM8688 597Q8766 597 8822 570Q8878 544 8909 494Q8939 444 8939 375Q8939 306 8909 256Q8878 206 8822 180Q8766 153 8688 153Q8611 153 8555 180Q8499 206 8468 256Q8437 306 8437 375Q8437 444 8468 494Q8499 544 8555 570Q8611 597 8688 597ZM10077 621 10016 632V0H10199V750H9961L9504 118L9565 107V750H9382V0H9627Z"
  }
};

// Barvy značky (modrá → fialová → růžová → jantarová)
const BRAND = [
  [96, 165, 250],
  [168, 85, 247],
  [236, 72, 153],
  [245, 158, 11],
];
const colorAt = (t) => {
  const s = Math.min(0.999, Math.max(0, t)) * (BRAND.length - 1);
  const i = Math.floor(s);
  const f = s - i;
  const a = BRAND[i];
  const b = BRAND[i + 1];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
};

const MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_W} ${LOGO_H}"><path d="${LOGO_PATH}"/></svg>`
)}")`;

const CSS = `
:host {
  --size: var(--stch-size, 13px);
  --ink: var(--stch-ink, currentColor);
  --muted: var(--stch-muted, color-mix(in srgb, currentColor 52%, transparent));
  --brand: linear-gradient(100deg, #60a5fa 0%, #a855f7 40%, #ec4899 75%, #f59e0b 100%);
  display: inline-block;
  font-size: var(--size);
  line-height: 1;
  vertical-align: middle;
}
a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--stch-gap, 0.75em);
  padding: 0.6em 0.4em;
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  border-radius: 10px;
}
a:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }

/* ---- popisek: křivky, výška verzálek = 1/3 loga, vystředěný k logu ---- */
.label {
  display: block;
  height: 0.5em;
  width: auto;
  flex: none;
  overflow: visible; /* diakritika nad verzálkami */
  fill: var(--muted);
  transition: fill 0.45s ease, opacity 0.6s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ---- logo ---- */
.mark {
  position: relative;
  display: block;
  height: 1.5em;
  aspect-ratio: ${LOGO_W} / ${LOGO_H};
  flex: none;
}
.ink, .brand {
  position: absolute;
  inset: 0;
  -webkit-mask: ${MASK} center / contain no-repeat;
          mask: ${MASK} center / contain no-repeat;
}
.ink {
  background: var(--ink);
  transition: opacity 0.5s ease;
}
.brand {
  background: var(--brand);
  background-size: 220% 100%;
  opacity: 0;
  transition: opacity 0.45s ease;
  animation: flow 2.6s ease-in-out infinite alternate;
}
/* dokud se logo neposkládá z teček, je schované (jen s JS a animacemi); popisek se
   dopíše, až se tečky usadí */
:host([data-state="waiting"]) .ink,
:host([data-state="assembling"]) .ink { opacity: 0; }
:host([data-state="waiting"]) .label,
:host([data-state="assembling"]) .label { opacity: 0; transform: translateX(0.6em); }

/* ---- ručně kreslený kroužek kolem loga ---- */
.circle {
  position: absolute;
  left: -16%;
  top: -42%;
  width: 132%;
  height: 184%;
  overflow: visible;
  pointer-events: none;
}
.circle path {
  fill: none;
  stroke: url(#stch-g);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-dasharray: 1 2;
  stroke-dashoffset: 1.05;
  vector-effect: non-scaling-stroke;
  transition: stroke-dashoffset 0.5s cubic-bezier(0.6, 0, 0.4, 1);
}

/* ---- plátno s tečkami (přesahuje logo, aby měly tečky kam letět) ---- */
canvas {
  position: absolute;
  pointer-events: none;
  /* rozměry nastaví až _setupCanvas; výchozích 300×150 px by na mobilu rozšířilo stránku */
  width: 0;
  height: 0;
}

/* ---- najetí / fokus ---- */
a:hover .label, a:focus-visible .label { fill: var(--ink); }
a:hover .brand, a:focus-visible .brand { opacity: 1; }
a:hover .ink, a:focus-visible .ink { opacity: 0; }
a:hover .circle path, a:focus-visible .circle path {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.75s cubic-bezier(0.3, 0.7, 0.2, 1) 0.08s;
}
/* dotyk: krátké rozsvícení při ťuknutí */
a:active .brand { opacity: 1; }

@keyframes flow {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .label, .ink, .brand { transition-duration: 0.01s; }
  .brand { animation: none; }
  .circle path { stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; transition: opacity 0.2s; }
  a:hover .circle path, a:focus-visible .circle path { opacity: 1; }
}
`;

// Tvar kroužku (stejná ruka jako čmáranice na stchstudio.cz)
const CIRCLE =
  "M146 10 C104 0 36 6 14 28 C-6 48 22 74 86 76 C150 78 194 60 190 36 C186 14 142 4 96 7 C76 8 60 12 50 16";

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

class StchSignature extends HTMLElement {
  static observedAttributes = ["lang", "href"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._particles = [];
    this._sparks = [];
    this._raf = 0;
  }

  connectedCallback() {
    this._render();
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      this.dataset.state = "done";
      return;
    }
    // Poskládat logo z teček, až bude podpis vidět
    this.dataset.state = "waiting";
    this._io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        this._io.disconnect();
        this._assemble();
      },
      { threshold: 0.6 }
    );
    this._io.observe(this);
  }

  disconnectedCallback() {
    this._io?.disconnect();
    cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  _lang() {
    const lang = (this.getAttribute("lang") || document.documentElement.lang || "cs").slice(0, 2).toLowerCase();
    return LABELS[lang] ? lang : "en";
  }

  _render() {
    const lang = this._lang();
    const label = TEXT[lang];
    const shape = LABELS[lang];
    const href = this.getAttribute("href") || "https://www.stchstudio.cz";
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <a href="${href}" target="_blank" rel="noopener" aria-label="${label} STCH Studio">
        <svg class="label" viewBox="0 0 ${shape.w} 750" aria-hidden="true"><path d="${shape.d}"/></svg>
        <span class="mark" aria-hidden="true">
          <span class="ink"></span>
          <span class="brand"></span>
          <svg class="circle" viewBox="0 0 200 80" preserveAspectRatio="none">
            <defs><linearGradient id="stch-g" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stop-color="#60a5fa"/><stop offset=".45" stop-color="#a855f7"/>
              <stop offset=".8" stop-color="#ec4899"/><stop offset="1" stop-color="#f59e0b"/>
            </linearGradient></defs>
            <path d="${CIRCLE}" pathLength="1"/>
          </svg>
          <canvas></canvas>
        </span>
      </a>`;
    this._link = this.shadowRoot.querySelector("a");
    this._mark = this.shadowRoot.querySelector(".mark");
    this._canvas = this.shadowRoot.querySelector("canvas");
    if (!reducedMotion()) {
      this._link.addEventListener("pointerenter", (e) => e.pointerType !== "touch" && this._burst());
      this._link.addEventListener("focus", () => this._burst());
    }
  }

  // Plátno přes logo s okrajem, v rozlišení displeje; vrací rozměry v CSS px.
  // Okraj nikdy nepřesáhne okno (vlevo/vpravo) ani začátek/konec stránky — jinak by
  // plátno na mobilu rozšířilo nebo prodloužilo stránku. Tečky za okrajem se jen oříznou.
  _setupCanvas() {
    const w = this._mark.offsetWidth;
    const h = this._mark.offsetHeight;
    const pad = Math.round(h * 1.6);
    const r = this._mark.getBoundingClientRect();
    const root = document.documentElement;
    const room = (n) => Math.max(0, Math.min(pad, Math.floor(n)));
    const padX = room(r.left);
    const padR = room(root.clientWidth - r.right);
    const padY = room(r.top + window.scrollY);
    const padB = room(root.scrollHeight - (r.bottom + window.scrollY));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const c = this._canvas;
    c.style.left = `${-padX}px`;
    c.style.top = `${-padY}px`;
    c.style.width = `${w + padX + padR}px`;
    c.style.height = `${h + padY + padB}px`;
    c.width = Math.round((w + padX + padR) * dpr);
    c.height = Math.round((h + padY + padB) * dpr);
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h, padX, padY, dpr };
  }

  // Po animaci plátno zase zmizí (0×0), ať nic nepřečnívá
  _hideCanvas() {
    const c = this._canvas;
    c.style.width = c.style.height = "0px";
    c.width = c.height = 0;
  }

  // Body uvnitř loga (mřížka s trochou náhody), v CSS px vůči levému hornímu rohu loga
  _samplePoints(w, h, dpr, step) {
    const off = document.createElement("canvas");
    off.width = Math.ceil(w * dpr);
    off.height = Math.ceil(h * dpr);
    const o = off.getContext("2d");
    o.scale((w * dpr) / LOGO_W, (h * dpr) / LOGO_H);
    o.fill(new Path2D(LOGO_PATH));
    const data = o.getImageData(0, 0, off.width, off.height).data;
    const pts = [];
    for (let y = step / 2; y < h; y += step) {
      for (let x = step / 2; x < w; x += step) {
        const jx = x + (Math.random() - 0.5) * step * 0.5;
        const jy = y + (Math.random() - 0.5) * step * 0.5;
        const i = (Math.round(jy * dpr) * off.width + Math.round(jx * dpr)) * 4 + 3;
        if (data[i] > 140) pts.push([jx, jy]);
      }
    }
    return pts;
  }

  // 1) Prach teček se sletí do loga, pak se usadí do čistého loga
  _assemble() {
    const { w, h, padX, padY, dpr } = this._setupCanvas();
    const step = Math.max(1.35, h / 13);
    const r = step * 0.42;
    this._particles = this._samplePoints(w, h, dpr, step).map(([x, y]) => {
      const a = Math.random() * Math.PI * 2;
      const dist = h * (0.6 + Math.random() * 1.3);
      return {
        x: padX + x,
        y: padY + y,
        sx: padX + x + Math.cos(a) * dist * 1.6,
        sy: padY + y + Math.sin(a) * dist,
        delay: (x / w) * 380 + Math.random() * 260, // zleva doprava, jako by se psalo
        r: r * (0.8 + Math.random() * 0.45),
        color: colorAt(x / w + (Math.random() - 0.5) * 0.08),
      };
    });
    this.dataset.state = "assembling";
    this._start = performance.now();
    this._loop();
  }

  // 2) Při najetí odletí z loga pár jisker
  _burst() {
    if (this.dataset.state === "waiting" || this.dataset.state === "assembling") return;
    const { w, h, padX, padY, dpr } = this._setupCanvas();
    const pts = this._samplePoints(w, h, dpr, Math.max(1.6, h / 9));
    const now = performance.now();
    for (let k = 0; k < 16; k++) {
      const [x, y] = pts[Math.floor(Math.random() * pts.length)];
      const dx = x - w / 2;
      const dy = y - h / 2;
      const len = Math.hypot(dx, dy) || 1;
      const speed = h * (1.1 + Math.random() * 1.4);
      this._sparks.push({
        x: padX + x,
        y: padY + y,
        vx: (dx / len) * speed * 1.4 + (Math.random() - 0.5) * h * 0.6,
        vy: (dy / len) * speed + (Math.random() - 0.5) * h * 0.6 - h * 0.4,
        r: Math.max(0.8, h / 14) * (0.7 + Math.random() * 0.8),
        born: now + Math.random() * 120,
        life: 650 + Math.random() * 450,
        color: colorAt(x / w),
      });
    }
    this._loop();
  }

  _loop() {
    if (this._raf) return;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const frame = (now) => {
      const c = this._canvas;
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      let alive = false;

      if (this.dataset.state === "assembling") {
        const t0 = now - this._start;
        const FLY = 1050;
        let done = true;
        for (const p of this._particles) {
          const t = Math.min(1, Math.max(0, (t0 - p.delay) / FLY));
          if (t < 1) done = false;
          const e = ease(t);
          ctx.globalAlpha = Math.min(1, t * 2.2);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.sx + (p.x - p.sx) * e, p.sy + (p.y - p.sy) * e, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        // tečky jsou na místě -> chvíli podržet a rozpustit do čistého loga
        if (done) {
          if (!this._settleAt) this._settleAt = now;
          const s = Math.min(1, (now - this._settleAt) / 520);
          if (s > 0.15) this.dataset.state = "done"; // čisté logo se začne objevovat (CSS přechod)
          c.style.opacity = String(1 - s);
          if (s >= 1) {
            this._particles = [];
            ctx.clearRect(0, 0, c.width, c.height);
            c.style.opacity = "";
          } else alive = true;
        } else alive = true;
      }

      if (this._sparks.length) {
        this._sparks = this._sparks.filter((p) => now - p.born < p.life);
        for (const p of this._sparks) {
          const t = Math.max(0, now - p.born) / p.life;
          const e = ease(t);
          ctx.globalAlpha = (1 - t) * (t < 0.1 ? t * 10 : 1);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x + p.vx * e, p.y + p.vy * e + t * t * p.r * 6, p.r * (1 - t * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
        alive = true;
      }

      ctx.globalAlpha = 1;
      // nic se nehýbe -> plátno se zastaví (žádné zbytečné překreslování)
      this._raf = alive ? requestAnimationFrame(frame) : 0;
      if (!alive) this._hideCanvas();
    };
    this._raf = requestAnimationFrame(frame);
  }
}

if (!customElements.get("stch-signature")) customElements.define("stch-signature", StchSignature);
