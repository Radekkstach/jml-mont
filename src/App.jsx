import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import References from "./components/References";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Career from "./components/Career";

function App() {
  return (
    <div className="font-sans bg-white text-gray-800 antialiased selection:bg-gold selection:text-white">
      <Header />

      <main>
        <Hero />
        <About />
        <References />
        <Career />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
