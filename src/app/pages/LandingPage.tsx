import HeroSection from '@/components/HeroSection';
import NavBar from '@/components/NavBar';
import RoadMap from '@/components/RoadMap';
import FeatureSection from '@/components/FeatureSection';
import RoadMapPreview from '@/components/RoadMapPreview';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <RoadMap />
      <FeatureSection />
      <RoadMapPreview />
      <Community/>
      <Footer/>
    </main>
  );
}
