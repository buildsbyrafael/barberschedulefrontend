import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { BenefitsSection } from "./BenefitsSection";
import { CTASection } from "./CTASection";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header isBookingPage={false} />
      <main>
        <HeroSection />
        <BenefitsSection />
        <CTASection />
      </main>
    </div>
  );
}