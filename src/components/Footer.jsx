import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-[#0a0a0a] py-8 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* LEVÁ STRANA: Logo JML a Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          {/* Logo - s efektem: šedobílé a po najetí se vybarví */}
          <img
            src="/logo1.png"
            alt="JML mont"
            loading="lazy"
            className="h-8 md:h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />

          <div className="text-gray-500 text-sm flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <span>© {currentYear} JML mont s.r.o.</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span>{t("footer.rights", "Všechna práva vyhrazena.")}</span>
          </div>
        </div>

        {/* PRAVÁ STRANA: podpis STCH Studia (web komponenta z public/stch-signature.js,
            při změně podpisu jen znovu zkopírovat z nastroje/stch-podpis) */}
        <stch-signature lang={i18n.language} class="text-gray-400"></stch-signature>
      </div>
    </footer>
  );
};

export default Footer;
