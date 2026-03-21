import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const CertificationsBar = () => {
  const barRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Jednoduchá a rychlá animace (žádný fluff)
      gsap.from(barRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 95%",
        },
      });
    }, barRef);
    return () => ctx.revert();
  }, []);

  // Definice certifikátů s robustními solidními ikonami v yellow-500
  const certs = [
    {
      titleKey: "certs.iso9001_title",
      descKey: "certs.iso9001_desc",
      // Robustní solidní štít a fajfka (Kvalita)
      icon: (
        <svg
          className="w-9 h-9 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path
            fillRule="evenodd"
            d="M9 12l2 2 4-4"
            className="text-[#0a0a0a]"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      titleKey: "certs.iso14001_title",
      descKey: "certs.iso14001_desc",
      // Robustní solidní list a štít (Ekologie)
      icon: (
        <svg
          className="w-9 h-9 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.955 11.955 0 0112 2.944zM10 14.5c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
            clipRule="evenodd"
          />
          <path d="M11 11.5c1.5 0 3 2 3 5" className="text-[#0a0a0a]" />
        </svg>
      ),
    },
    {
      titleKey: "certs.en1090_title",
      descKey: "certs.en1090_desc",
      // Robustní solidní profil ocelového nosníku (Konstrukce)
      icon: (
        <svg
          className="w-9 h-9 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
          <path d="M12 6.5v11M6.5 12h11" className="text-[#0a0a0a]" />
          <path fillRule="evenodd" d="M19 12l-7 7-7-7h14z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={barRef}
      className="bg-[#0f0f0f] border-t border-b border-white/5 font-sans relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-5">
        {/* Symetrický grid bez postranních nadpisů */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-12 justify-items-center">
          {certs.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-5 w-full max-w-sm md:max-w-none md:justify-center"
            >
              {/* Robustní ikonka v pevném kroužku s těžším ohraničením */}
              <div className="w-16 h-16 rounded-full bg-black border-2 border-white/10 flex items-center justify-center shrink-0">
                {cert.icon}
              </div>

              {/* Čistá, silná typografie */}
              <div>
                <p className="text-xl font-black text-white tracking-tight leading-tight">
                  {t(cert.titleKey)}
                </p>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                  {t(cert.descKey)}
                </p>
              </div>

              {/* Jemný svislý rozdělovač (skrytý na mobilu) */}
              {index < certs.length - 1 && (
                <div
                  className="hidden md:block h-12 w-[1px] bg-white/5 absolute right-0 top-1/2 -translate-y-1/2"
                  style={{ marginRight: "-24px" }}
                ></div>
              )}
              {index < certs.length - 1 && (
                <div className="hidden md:block h-12 border-l border-white/5 absolute right-1/3 top-1/2 -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsBar;
