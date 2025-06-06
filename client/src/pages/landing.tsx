import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import InteractiveDemo from "@/components/interactive-demo";
import HowItWorks from "@/components/how-it-works";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-elegant-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <InteractiveDemo />
      <FeaturesSection />
      <HowItWorks />
      <ContactSection />
      <Footer />
    </div>
  );
}
