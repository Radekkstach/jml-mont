import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animace textové části (zleva)
      gsap.from(".career-text", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animace obrázku (zprava)
      gsap.from(".career-image", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white text-gray-900 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEVÝ SLOUPEC - TEXTY A VÝHODY */}
          <div className="space-y-8">
            <div>
              <h2 className="career-text text-sm md:text-base font-bold text-yellow-500 uppercase tracking-widest mb-3">
                {t("career.subtitle", "Kariéra v JML mont")}
              </h2>
              <h3 className="career-text text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {t("career.title", "Hledáme právě tebe")}
              </h3>
              <div className="career-text w-20 h-1 bg-yellow-500 mt-6 rounded-full"></div>
            </div>

            <p className="career-text text-lg text-gray-600 leading-relaxed font-light">
              {t(
                "career.desc",
                "Rozšiřujeme tým! Hledáme spolehlivé parťáky na montáže po celé Evropě. Nabízíme férové jednání, stabilní práci a skvělou partu.",
              )}
            </p>

            {/* Seznam výhod s checkmark ikonami */}
            <ul className="career-text space-y-4 pt-2">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  {t("career.list_1", "Zkušené montéry i šikovné nováčky")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  {t("career.list_2", "Práce po celé EU")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  {t("career.list_3", "Férové finanční ohodnocení")}
                </span>
              </li>
            </ul>

            <div className="career-text pt-6">
              <a
                href="#kontakt"
                className="inline-block px-8 py-4 bg-yellow-500 text-black font-bold rounded-sm text-lg transition-transform duration-300 hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-lg"
              >
                {t("career.btn", "Chci k vám do týmu")}
              </a>
            </div>
          </div>

          {/* PRAVÝ SLOUPEC - OBRÁZEK S DEKORACÍ */}
          <div className="career-image relative mt-10 lg:mt-0">
            {/* Ozdobný rámeček na pozadí posunutý do strany */}
            <div className="absolute top-6 -left-6 w-full h-full border-2 border-yellow-500 rounded-xl hidden sm:block"></div>

            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl bg-gray-100">
              {/* Zde můžeš použít libovolnou fotku z tvé složky public, dal jsem jako placeholder svarec1.jpeg */}
              <img
                src="/svarec1.jpg"
                alt="Práce v JML mont"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              {/* Lehký gradient dole, aby to nevypadalo ustřiženě */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
