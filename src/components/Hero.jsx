import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  // Přidán hook pro překlady
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Epický počáteční Zoom-out obrázku na pozadí
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.5, ease: "power2.out" },
      );

      // Paralax efekt při scrollování
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animace textových elementů (efekt pružiny)
      gsap.from(".hero-text-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.5)",
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] font-sans"
    >
      {/* OBRÁZEK NA POZADÍ S PARALAXEM */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden">
        <img
          ref={imageRef}
          src="/regal4.jpeg"
          alt="Průmyslová hala a ocelové konstrukce JML mont"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradientní překryv */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
      </div>

      {/* HLAVNÍ OBSAH */}
      <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-6 text-white pt-10">
        {/* Hlavní nadpis */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 drop-shadow-2xl leading-tight tracking-tight">
          <span className="hero-text-element block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 pb-2">
            {t("hero.subtitle", "Průmyslové montáže")}
          </span>
          <span className="hero-text-element block text-white text-3xl md:text-5xl lg:text-6xl font-light mt-2">
            JML mont s.r.o.
          </span>
        </h1>

        {/* Dekorační linka */}
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-8 hero-text-element opacity-80"></div>

        {/* Podnadpis */}
        <p className="hero-text-element text-lg md:text-2xl max-w-2xl text-gray-300 leading-relaxed font-light tracking-wide">
          {t(
            "hero.services",
            "Ocelové konstrukce • Technologie • Průmyslové řízení",
          )}
        </p>

        {/* Tlačítka (skrytá na mobilu, flex od "sm") */}
        <div className="hero-text-element mt-12 hidden sm:flex flex-col sm:flex-row gap-5">
          <a
            href="#kontakt"
            className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-sm transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
          >
            {t("hero.btn_contact", "Nezávazná poptávka")}
          </a>
          <a
            href="#reference"
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            {t("hero.btn_references", "Naše reference")}
          </a>
        </div>
      </div>

      {/* MODERNÍ SCROLL INDIKÁTOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 hero-text-element">
          {t("hero.scroll", "Scrolluj dolů")}
        </span>
        <div className="w-[2px] h-16 bg-white/20 overflow-hidden relative rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-yellow-500 animate-[scrolldown_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
