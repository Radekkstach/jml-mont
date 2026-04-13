import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const MinimalCertificationsBar = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-item",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const certs = [
    {
      titleKey: "certs.quality_title",
      codeKey: "certs.quality_code",
      icon: (
        <svg
          className="w-7 h-7 text-yellow-500 shrink-0"
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
      titleKey: "certs.eco_title",
      codeKey: "certs.eco_code",
      icon: (
        <svg
          className="w-7 h-7 text-yellow-500 shrink-0"
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
      titleKey: "certs.safety_title",
      codeKey: "certs.safety_code",
      icon: (
        <svg
          className="w-7 h-7 text-yellow-500 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      ),
    },
    {
      titleKey: "certs.steel_title",
      codeKey: "certs.steel_code",
      icon: (
        <svg
          className="w-7 h-7 text-yellow-500 shrink-0"
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
      ref={containerRef}
      className="bg-[#0a0a0a] border-y border-white/5 py-6 font-sans"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-between">
        {certs.map((cert, index) => (
          <div
            key={index}
            className="cert-item flex items-center gap-3 md:justify-center"
          >
            {cert.icon}

            {/* PŘIDÁNO: min-w-0 aby flex box respektoval šířku rodiče */}
            <div className="flex flex-col min-w-0">
              {/* PŘIDÁNO: break-words a hyphens-auto pro zalomení dlouhých slov */}
              <span className="text-sm md:text-base font-bold text-white leading-tight break-words hyphens-auto">
                {t(cert.titleKey)}
              </span>
              {/* PŘIDÁNO: truncate, kdyby náhodou i kód certifikátu byl moc dlouhý */}
              <span className="text-[10px] md:text-xs font-mono text-gray-500 mt-0.5 truncate">
                {t(cert.codeKey)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinimalCertificationsBar;
