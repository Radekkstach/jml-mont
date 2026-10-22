// Po buildu vyrobí hotové HTML pro každý jazyk: dist/index.html (cs), dist/en/, dist/de/.
// Do hlavičky doplní titulek, popis, kanonickou adresu, jazykové verze (hreflang),
// náhled pro sociální sítě a strukturovaná data (schema.org) pro Google a AI.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://jmlmont.eu";

const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const LANGS = {
  cs: { path: "/", locale: "cs_CZ" },
  en: { path: "/en/", locale: "en_US" },
  de: { path: "/de/", locale: "de_DE" },
};

// Služby podle textů na webu (O nás, Reference)
const SERVICES = {
  cs: ["Montáž ocelových konstrukcí", "Montáž hasicích systémů", "Montáž technologických celků", "Montáž hal a regálových systémů", "Svařování ocelových konstrukcí", "Výškové práce s využitím horolezecké techniky"],
  en: ["Steel structure assembly", "Fire extinguishing system installation", "Technology unit installation", "Hall and racking system assembly", "Steel structure welding", "Work at height using rope access techniques"],
  de: ["Stahlbaumontage", "Montage von Feuerlöschsystemen", "Montage technologischer Anlagen", "Montage von Hallen und Regalsystemen", "Schweißen von Stahlkonstruktionen", "Höhenarbeiten mit Seilzugangstechnik"],
};

const CERTS = ["ČSN EN ISO 9001:2016", "ČSN EN ISO 14001:2016", "ČSN EN ISO 45001:2018", "ČSN EN 1090-2 + A1"];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function structuredData(lang, t) {
  const url = SITE + LANGS[lang].path;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "JML mont s.r.o.",
        legalName: "JML mont s.r.o.",
        alternateName: "JML mont",
        url: `${SITE}/`,
        logo: `${SITE}/logohead.png`,
        image: `${SITE}/og.jpg`,
        description: t.seo.description,
        email: "info@jmlmont.eu",
        ...(t.contact.phone ? { telephone: t.contact.phone.replace(/\s/g, "") } : {}),
        taxID: "09833269",
        vatID: "CZ09833269",
        foundingDate: "2021-01-18",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Karlovo nám. 53/42",
          addressLocality: "Třebíč",
          postalCode: "674 01",
          addressRegion: "Kraj Vysočina",
          addressCountry: "CZ",
        },
        areaServed: { "@type": "Place", name: "Europe" },
        knowsLanguage: ["cs", "en", "de"],
        hasCredential: CERTS.map((name) => ({ "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name })),
        makesOffer: SERVICES[lang].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: "Europe" } })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@jmlmont.eu",
          availableLanguage: ["Czech", "English", "German"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "JML mont",
        inLanguage: ["cs", "en", "de"],
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        primaryImageOfPage: `${SITE}/og.jpg`,
      },
    ],
  };
}

function head(lang, t) {
  const url = SITE + LANGS[lang].path;
  const alternates = Object.entries(LANGS)
    .map(([l, { path: p }]) => `<link rel="alternate" hreflang="${l}" href="${SITE}${p}" />`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${SITE}/" />`);
  const otherLocales = Object.entries(LANGS)
    .filter(([l]) => l !== lang)
    .map(([, { locale }]) => `<meta property="og:locale:alternate" content="${locale}" />`);

  return [
    `<title>${esc(t.seo.title)}</title>`,
    `<meta name="description" content="${esc(t.seo.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="JML mont" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(t.seo.title)}" />`,
    `<meta property="og:description" content="${esc(t.seo.description)}" />`,
    `<meta property="og:image" content="${SITE}/og.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${LANGS[lang].locale}" />`,
    ...otherLocales,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(lang, t)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

for (const lang of Object.keys(LANGS)) {
  const t = JSON.parse(fs.readFileSync(path.join(root, "src", "locales", `${lang}.json`), "utf-8"));
  const html = template
    .replace('<html lang="cs">', `<html lang="${lang}">`)
    .replace(/<!--\s*Titulek[\s\S]*?-->\s*/, "")
    .replace("<!--app-head-->", head(lang, t))
    .replace("<!--app-html-->", await render(lang));

  const outDir = path.join(dist, LANGS[lang].path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerender: ${LANGS[lang].path}`);
}

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
