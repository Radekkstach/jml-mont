import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animace textů vlevo
      gsap.from(".about-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animace karet se statistikami vpravo
      gsap.from(".stat-card", {
        scale: 0.9,
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="o-nas"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#fdfdfd] relative overflow-hidden font-sans"
    >
      {/* Jemný industriální glow efekt na pozadí (čistě estetické) */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEVÝ SLOUPEC - TEXTY */}
          <div className="space-y-8">
            <div>
              <h2 className="about-item text-sm md:text-base font-bold text-yellow-500 uppercase tracking-widest mb-3">
                {t("about.subtitle", "Kdo jsme")}
              </h2>
              <h3 className="about-item text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {t("about.title", "Poctivé a precizní montáže")}
              </h3>
              <div className="about-item w-20 h-1 bg-yellow-500 mt-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p className="about-item text-xl font-medium text-gray-800">
                {t(
                  "about.p1",
                  "Jsme JML mont s.r.o., firma, kterou založili dva bratři se společným cílem. Vedeme tým zkušených montérů, kteří se specializují na ocelové konstrukce, hasicí systémy a technologické celky.",
                )}
              </p>
              <p className="about-item">
                {t(
                  "about.p2",
                  "Naší vizitkou je spolehlivost a zodpovědný přístup. Každou zakázku dokončujeme tak, aby fungovala na 100 % a zákazník se na nás mohl kdykoli spolehnout.",
                )}
              </p>
              <p className="about-item">
                {t(
                  "about.p3",
                  "Pocházíme z Třebíče, ale působíme po celé Evropě. Vítáme jak nové spolupráce, tak dlouhodobá partnerství.",
                )}
              </p>
            </div>
          </div>

          {/* PRAVÝ SLOUPEC - STATISTIKY (KARTY) */}
          <div className="stats-container grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mt-10 lg:mt-0 relative">
            {/* Světlá karta (Bez hover efektu) */}
            <div className="stat-card bg-white p-8 md:p-10 rounded-xl shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
              <span className="block text-5xl lg:text-6xl font-black text-yellow-500 mb-4">
                {t("about.stat1_val", "30+")}
              </span>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {t("about.stat1_title", "Projektů")}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(
                  "about.stat1_desc",
                  "Úspěšně dokončených zakázek s maximální přesností.",
                )}
              </p>
            </div>

            {/* Tmavá karta - posunutá mírně dolů pro asymetrický look (Bez hover efektu) */}
            <div className="stat-card bg-[#0a0a0a] p-8 md:p-10 rounded-xl shadow-2xl sm:translate-y-12">
              <span className="block text-5xl lg:text-6xl font-black text-yellow-500 mb-4">
                {t("about.stat2_val", "EU")}
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                {t("about.stat2_title", "Působnost")}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(
                  "about.stat2_desc",
                  "Montujeme po celé Evropě, od Třebíče až za hranice.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
