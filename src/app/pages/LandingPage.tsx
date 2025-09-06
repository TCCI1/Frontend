"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import HeroSection from '@/components/HeroSection';
import NavBar from '@/components/NavBar';
import FeatureSection from '@/components/FeatureSection';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/main');
    }
  }, [isLoaded, isSignedIn, router]);

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