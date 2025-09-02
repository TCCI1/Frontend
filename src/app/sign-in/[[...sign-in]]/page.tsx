'use client';

import { SignIn } from "@clerk/nextjs";
import NavBar from '@/components/NavBar';

export default function SignInPage() {
  return (
    <main className="min-h-screen">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-3000" />
      </div>
      <NavBar />
      <div className="flex items-center justify-center min-h-[80vh] bg-transparent">
        <SignIn />
      </div>
    </main>
  );
}
