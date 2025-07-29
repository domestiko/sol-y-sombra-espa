import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <main className="pt-0"> {/* Eliminamos padding top ya que tenemos header móvil */}
        <Hero />
        <Services />
        <Features />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
};

export default Index;
