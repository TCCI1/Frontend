// src/app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold',
            card: 'shadow-xl border border-orange-100',
          }
        }}
        afterSignUpUrl="/main"
      />
    </div>
  );
}