import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import RouteExplorer from "@/components/RouteExplorer";
import GallerySection from "@/components/GallerySection";
import WhyRakayaSection from "@/components/WhyRakayaSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramSection from "@/components/InstagramSection";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-deep-sea text-white overflow-x-hidden">
      {/* Floating Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Pinned 3D Hero Scrolling Experience */}
        <HeroSection />

        {/* Narrative / Story */}
        <AboutSection />

        {/* Dynamic Service Grid Cards */}
        <ExperiencesSection />

        {/* SVG Scroll drawn map routing */}
        <RouteExplorer />

        {/* Premium Masonry visual feed */}
        <GallerySection />

        {/* Stat metrics counter */}
        <WhyRakayaSection />

        {/* Reviews carousel */}
        <TestimonialsSection />

        {/* Social Feed preview */}
        <InstagramSection />

        {/* Action sunset backdrop CTA */}
        <BookingCTA />
      </main>

      {/* Semantic luxury footer */}
      <Footer />
    </div>
  );
}
