import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FocusAreas from "@/components/FocusAreas";
import Opportunity from "@/components/Opportunity";
import IncubationBenefits from "@/components/IncubationBenefits";
import Community from "@/components/Community";
import CredibilityStrip from "@/components/CredibilityStrip";
import Footer from "@/components/Footer";
import KioskAutoRedirect from "@/components/kiosk/KioskAutoRedirect";

export default function Home() {
  return (
    <main className="min-h-screen">
      <KioskAutoRedirect />
      <Navbar />
      <Hero />
      <About />
      <FocusAreas />
      <Opportunity />
      <IncubationBenefits />
      <Community />
      <CredibilityStrip />
      <Footer />
    </main>
  );
}
