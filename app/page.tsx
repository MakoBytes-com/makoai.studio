import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DepthGauge from "@/components/DepthGauge";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <DepthGauge />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
