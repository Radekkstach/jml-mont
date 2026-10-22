import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import References from "./components/References";
import Career from "./components/Career";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CertificationsBar from "./components/CertificationsBar";

function App() {
  return (
    <>
      {/* bg-black na pozadí, abychom měli konzistentní tmavý základ */}
      <div className="bg-black min-h-screen text-white font-sans">
        <Header />
        <main>
        <Hero />

        {/* Vložíme Trust Bar hned pod Hero sekci (Možnost A) */}
        <CertificationsBar />

        {/* Následuje sekce O nás, která už v sobě má ty certifikáty integrované (Možnost B) */}
        <About />

        <References />
        <Career />
        <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
