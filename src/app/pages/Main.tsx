"use client";

import { useSession, UserButton } from "@clerk/nextjs";
import React from "react";
import NavBar from '@/components/NavBar';
import Stage from '@/components/Stage';

const MainPage = () => {
  const { session, isLoaded, isSignedIn } = useSession();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Authentication Required</h2>
            <p className="text-orange-700 mb-6">
              Please sign in to access the main dashboard and continue your learning journey.
            </p>
            <button 
              onClick={() => window.location.href = '/sign-in'}
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <NavBar />
      <div className="pt-4 pr-4 flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
};

export default MainPage;
