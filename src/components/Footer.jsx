import React from "react";
import { useTranslation } from "react-i18next";
import myLogo from "../assets/logo2.svg"; // Importuj své logo z assets

// IMPORT TVÉHO LOGA ZDE (nebo použij cestu do složky public)
// import myLogo from '../assets/mylogo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0a0a0a] py-8 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* LEVÁ STRANA: Logo JML a Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          {/* Logo - s efektem: šedobílé a po najetí se vybarví */}
          <img
            src="/logo1.png"
            alt="JML mont"
            className="h-8 md:h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />

          <div className="text-gray-500 text-sm flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <span>© {currentYear} JML mont s.r.o.</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span>{t("footer.rights", "Všechna práva vyhrazena.")}</span>
          </div>
        </div>

        {/* PRAVÁ STRANA: Tvoje vizitka (STCH STUDIO) */}
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            {t("footer.designed", "Designed & Developed by")}
          </span>
          <a
            href="https://stchstudio.cz/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center transition-all"
            title="STCH Studio"
          >
            <img
              src={myLogo}
              alt="Radek Stach"
              // Přidal jsem lehký scale efekt při hoveru, ať to působí interaktivněji
              className="h-6 w-auto opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
