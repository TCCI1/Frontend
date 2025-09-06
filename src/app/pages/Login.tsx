'use client';

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold',
            card: 'shadow-xl border border-orange-100',
          }
        }}
        afterSignInUrl="/main"
      />
    </main>
  );
}