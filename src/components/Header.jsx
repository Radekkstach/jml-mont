import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  // Ošetření pro případ, že i18n ještě není plně načtené
  const currentLang = i18n?.language || "cs";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-gray-200"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center cursor-pointer z-50 relative">
            <a href="#">
              <img
                src="/logo1.png"
                alt="JML mont logo"
                className={`transition-all duration-300 object-contain ${scrolled ? "h-10" : "h-12"}`}
              />
            </a>
          </div>

          {/* MENU - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {/* Odkazy */}
            <div
              className={`flex space-x-8 font-medium text-base tracking-wide ${scrolled ? "text-gray-800" : "text-gray-200"}`}
            >
              <a
                href="#o-nas"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                {t("nav.about", "O nás")}
              </a>
              <a
                href="#reference"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                {t("nav.references", "Reference")}
              </a>
              <a
                href="#kontakt"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                {t("nav.contact", "Kontakt")}
              </a>
            </div>

            {/* Přepínač jazyků */}
            <div
              className={`flex items-center space-x-3 pl-6 border-l ${scrolled ? "border-gray-300" : "border-gray-600"}`}
            >
              {["cs", "en", "de"].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                    currentLang === lng
                      ? "text-yellow-500"
                      : scrolled
                        ? "text-gray-500 hover:text-gray-800"
                        : "text-gray-500 hover:text-white"
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>

          {/* MENU - Mobil (Hamburger) */}
          <div className="md:hidden z-50 relative flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${scrolled ? "text-gray-800" : "text-gray-200"} hover:text-yellow-500 transition-colors focus:outline-none`}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobilní menu rozbalené */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden flex flex-col pt-24 ${
          mobileMenuOpen
            ? "max-h-[400px] opacity-100 pb-8"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 px-6">
          <a
            href="#o-nas"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-800 hover:text-yellow-500 font-medium"
          >
            {t("nav.about", "O nás")}
          </a>
          <a
            href="#reference"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-800 hover:text-yellow-500 font-medium"
          >
            {t("nav.references", "Reference")}
          </a>
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-800 hover:text-yellow-500 font-medium"
          >
            {t("nav.contact", "Kontakt")}
          </a>

          <div className="flex space-x-6 pt-6 border-t border-gray-200 w-full justify-center">
            {["cs", "en", "de"].map((lng) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                className={`text-lg font-bold uppercase tracking-wider ${
                  currentLang === lng ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
