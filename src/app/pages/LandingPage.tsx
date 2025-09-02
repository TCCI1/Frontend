import HeroSection from '@/components/HeroSection';
import NavBar from '@/components/NavBar';
import FeatureSection from '@/components/FeatureSection';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <Community/>
      <Footer/>
    </main>
  );
}