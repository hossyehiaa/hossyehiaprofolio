import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      {/* Subtle global noise/grain effect could go here, relying on dark background instead for cleaner look */}
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Work />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
