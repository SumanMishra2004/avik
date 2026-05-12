import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResearchGrid from "@/components/ResearchGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import AwardsShelf from "@/components/AwardsShelf";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0E13] text-white overflow-x-hidden grain relative">
                 <div className="hairline-grid absolute inset-0 z-0 pointer-events-none" />
                 <div className="relative z-10">
                   <Navbar />
        <HeroSection />
        <AboutSection />
        <ResearchGrid />
        <ExperienceTimeline />
        <AwardsShelf />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
        
  );
}
