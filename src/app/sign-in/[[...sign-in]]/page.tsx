'use client';

import { SignIn } from "@clerk/nextjs";
import NavBar from '@/components/NavBar';

export default function SignInPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="flex items-center justify-center min-h-[80vh] bg-transparent">
        <SignIn />
      </div>
    </main>
  );
}
