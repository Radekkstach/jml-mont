import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SEO = () => {
  const { t, i18n } = useTranslation();

  // Získáme aktuální jazyk (cs, en, de)
  const currentLang = i18n.language || "cs";

  // Pro sociální sítě potřebujeme formát jazyka např. cs_CZ, en_US
  const getLocale = () => {
    switch (currentLang) {
      case "en":
        return "en_US";
      case "de":
        return "de_DE";
      default:
        return "cs_CZ";
    }
  };

  return (
    <Helmet>
      {/* 1. Změní jazyk celého HTML dokumentu */}
      <html lang={currentLang} />

      {/* 2. Dynamický Titulek a Popis */}
      <title>{t("seo.title")}</title>
      <meta name="description" content={t("seo.description")} />

      {/* 3. Open Graph tagy pro Facebook/LinkedIn atd. */}
      <meta property="og:title" content={t("seo.title")} />
      <meta property="og:description" content={t("seo.description")} />
      <meta property="og:locale" content={getLocale()} />

      {/* 4. HREFLANG - Magie pro mezinárodní SEO */}
      <link rel="alternate" hreflang="cs" href="https://jmlmont.eu/" />
      {/* Pokud používáte ?lang= parameter nebo jinou strukturu url, uprav to zde. 
          Předpokládáme, že jazyk se zatím mění jen v paměti Reactu, ale i tak je dobré
          to Googlu naznačit takto, nebo pokud byste v budoucnu zavedli URL jako jmlmont.eu/en */}
      <link rel="alternate" hreflang="en" href="https://jmlmont.eu/?lang=en" />
      <link rel="alternate" hreflang="de" href="https://jmlmont.eu/?lang=de" />

      {/* x-default říká Googlu, kam poslat uživatele, jehož jazyk nemáme (např. Francouze) */}
      <link rel="alternate" hreflang="x-default" href="https://jmlmont.eu/" />
    </Helmet>
  );
};

export default SEO;
