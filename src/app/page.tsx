import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FocusAreas from "@/components/FocusAreas";
import Opportunity from "@/components/Opportunity";
import IncubationBenefits from "@/components/IncubationBenefits";
import ApplicationCTA from "@/components/ApplicationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <FocusAreas />
      <Opportunity />
      <IncubationBenefits />
      <ApplicationCTA />
      <Footer />
    </main>
  );
}
