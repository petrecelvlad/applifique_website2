import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import InteractiveDemo from "@/components/interactive-demo";
import HowItWorks from "@/components/how-it-works";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ScrollSectionsContainer from "@/components/scroll-sections-container";
import ScrollSectionWrapper from "@/components/scroll-section-wrapper";

export default function LandingPage() {
  const sections = [
    {
      id: 'hero',
      label: 'Welcome',
      component: (
        <ScrollSectionWrapper background="primary">
          <div className="relative h-full">
            <Navigation />
            <HeroSection />
          </div>
        </ScrollSectionWrapper>
      )
    },
    {
      id: 'demo',
      label: 'Interactive Demo',
      component: (
        <ScrollSectionWrapper background="light">
          <div className="relative h-full">
            <Navigation />
            <InteractiveDemo />
          </div>
        </ScrollSectionWrapper>
      )
    },
    {
      id: 'features',
      label: 'Features',
      component: (
        <ScrollSectionWrapper background="primary">
          <div className="relative h-full">
            <Navigation />
            <FeaturesSection />
          </div>
        </ScrollSectionWrapper>
      )
    },
    {
      id: 'how-it-works',
      label: 'How It Works',
      component: (
        <ScrollSectionWrapper background="light">
          <div className="relative h-full">
            <Navigation />
            <HowItWorks />
          </div>
        </ScrollSectionWrapper>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      component: (
        <ScrollSectionWrapper background="dark">
          <div className="relative h-full">
            <Navigation />
            <ContactSection />
            <Footer />
          </div>
        </ScrollSectionWrapper>
      )
    }
  ];

  return (
    <ScrollSectionsContainer 
      sections={sections} 
      className="bg-elegant-white"
    />
  );
}
