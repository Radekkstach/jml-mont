import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const slideData = [
  {
    id: 1,
    image: "/svarec1.jpg",
    titleKey: "references.ref1_title",
    descKey: "references.ref1_desc",
  },
  {
    id: 2,
    image: "/regal33.jpg",
    titleKey: "references.ref2_title",
    descKey: "references.ref2_desc",
  },
  {
    id: 3,
    image: "/lezec33.jpg",
    titleKey: "references.ref3_title",
    descKey: "references.ref3_desc",
  },
];

const References = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const { t } = useTranslation();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Automatické přepínání s vyčištěním
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => resetTimeout();
  }, [current]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Manuální ovládání s resetem časovače
  const nextSlide = () => {
    resetTimeout();
    setCurrent(current === slideData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    resetTimeout();
    setCurrent(current === 0 ? slideData.length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    resetTimeout();
    setCurrent(index);
  };

  return (
    <section
      id="reference"
      ref={sectionRef}
      className="relative w-full h-[90vh] bg-[#0a0a0a] overflow-hidden text-white font-sans"
    >
      {/* SLIDY */}
      {slideData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Obrázek s efektem pomalého přiblížení (Přidáno will-change-transform pro super plynulost) */}
          <img
            src={slide.image}
            alt={t(slide.titleKey)}
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out will-change-transform ${
              index === current ? "scale-110" : "scale-100"
            }`}
          />

          {/* Optimalizovaný jeden gradient pro čitelnost textu */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

          {/* Textový box */}
          {/* Textový box - Přidáno right-6 pro mobilní hranici */}
          <div className="absolute bottom-16 left-6 right-6 md:right-auto md:left-16 max-w-2xl p-4 md:p-8 bg-black/20 md:bg-transparent rounded-lg backdrop-blur-sm md:backdrop-blur-none">
            <div
              className={`transition-all duration-700 delay-200 transform ${index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              {/* Zmenšeno z text-4xl na text-3xl pro mobily a přidán break-words */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight break-words hyphens-auto">
                {t(slide.titleKey)}
              </h3>
              <div className="w-16 h-1 bg-yellow-500 mb-6 rounded-full"></div>
              {/* Jemně zmenšen i popis pro lepší čitelnost na úzkém displeji */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {t(slide.descKey)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* OVLÁDACÍ ŠIPKY (Odstraněn těžký backdrop-blur, použit jednodušší design) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 hover:bg-yellow-500 hover:text-black text-white transition-all duration-300 border border-white/10 group"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 hover:bg-yellow-500 hover:text-black text-white transition-all duration-300 border border-white/10 group"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Indikátory (tečky dole - zrušen náročný stín) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-yellow-500 w-10"
                : "bg-white/40 w-3 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default References;
