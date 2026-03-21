import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-element", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("contact.php", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: t(
            "contact.msg_success",
            "Děkujeme! Vaše zpráva byla úspěšně odeslána.",
          ),
        });
        e.target.reset();
      } else {
        setStatusMessage({
          type: "error",
          text: t("contact.msg_error", "Chyba: Zprávu se nepodařilo odeslat."),
        });
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: t("contact.msg_error", "Chyba: Zprávu se nepodařilo odeslat."),
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      className="py-24 bg-[#0a0a0a] text-white font-sans border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEVÝ SLOUPEC - Texty a fyzické kontakty */}
          <div className="space-y-10">
            <div>
              <h3 className="contact-element text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
                {t("contact.title", "Kontaktujte nás")}
              </h3>
              <div className="contact-element w-16 h-1 bg-yellow-500 rounded-full mb-6"></div>
              <p className="contact-element text-lg text-gray-400 font-light max-w-md leading-relaxed">
                {t(
                  "contact.desc",
                  "Pokud hledáte montážní firmu, která drží slovo a maká naplno, ozvěte se – rádi se s vámi spojíme.",
                )}
              </p>
            </div>

            {/* Fyzické kontakty */}
            <div className="contact-element space-y-6 pt-4">
              {/* Telefon */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    {t("contact.phone_title", "Zavolejte nám")}
                  </h4>
                  <a
                    href="tel:+420123456789"
                    className="text-xl text-gray-200 hover:text-yellow-500 transition-colors"
                  >
                    {t("contact.phone", "+420 123 456 789")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    {t("contact.email_title", "Napište nám")}
                  </h4>
                  <a
                    href="mailto:info@jmlmont.eu"
                    className="text-xl text-gray-200 hover:text-yellow-500 transition-colors"
                  >
                    {t("contact.email", "info@jmlmont.eu")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PRAVÝ SLOUPEC - FORMULÁŘ */}
          <div className="contact-element bg-[#111] p-8 md:p-10 rounded-xl border border-white/10 shadow-2xl">
            {statusMessage && (
              <div
                className={`mb-6 p-4 rounded-md border ${statusMessage.type === "success" ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {t("contact.form_name", "Vaše jméno")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition-colors"
                  placeholder="Jan Novák"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {t("contact.form_email", "Váš e-mail")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition-colors"
                  placeholder="jan@email.cz"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {t("contact.form_message", "Zpráva")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition-colors resize-none"
                  placeholder={t(
                    "contact.form_message_placeholder",
                    "Dobrý den, měl bych zájem o...",
                  )}
                ></textarea>
              </div>

              {/* HONEYPOT (proti spamu) */}
              <input
                type="text"
                name="hp-check"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-yellow-500 text-black font-bold py-4 rounded-md transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-400 hover:scale-[1.02]"}`}
              >
                {isSubmitting
                  ? t("contact.form_sending", "Odesílám...")
                  : t("contact.form_submit", "Odeslat zprávu")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
