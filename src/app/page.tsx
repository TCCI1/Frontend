import HeroSection from '@/components/HeroSection';
import NavBar from '@/components/NavBar';
import RoadMap from '@/components/RoadMap';
export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <RoadMap />
    </main>
  );
}
