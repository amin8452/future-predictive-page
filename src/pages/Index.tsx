
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <KeyFeatures />
      <VideoSection />
      <Testimonials />
      <HowItWorks />
      <LeadForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
