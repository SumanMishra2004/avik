import Navbar from "@/components/Navbar";
import PublicationsSection from "@/components/PublicationsSection";
import Footer from "@/components/Footer";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#0C0E13] text-white overflow-x-hidden grain relative">
      <div className="hairline-grid absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24">
          <PublicationsSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
