"use client";

import { useSession, useUser } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import AdminMeetComponent from "@/components/admin/meet";

const AdminPage = () => {
  const { isLoaded, isSignedIn } = useSession();
  const { user } = useUser();
  const router = useRouter();

  // Check if user is authorized admin
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === "hiphopmusicradio25@gmail.com";

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    } else if (isLoaded && isSignedIn && !isAdmin) {
      router.push("/main");
    }
  }, [isLoaded, isSignedIn, isAdmin, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950 px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700 dark:text-neutral-300 font-medium text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // Will redirect to sign-in
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950 px-4">
        <div className="text-center w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-orange-100 dark:border-neutral-800">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl">🚫</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-red-900 dark:text-red-100 mb-3 sm:mb-4">Access Denied</h2>
            <p className="text-sm sm:text-base text-red-700 dark:text-red-300 mb-4 sm:mb-6">
              You don't have permission to access the admin panel.
            </p>
            <button 
              onClick={() => router.push('/main')}
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              Go to Main Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-xl sm:rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-orange-900 dark:text-neutral-100 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Admin Panel
              </h1>
              <p className="text-orange-700 dark:text-neutral-300 mt-1">
                Manage events and meetings
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right">
                <div className="text-sm text-orange-600 dark:text-neutral-400">Admin</div>
                <div className="text-sm font-medium text-orange-800 dark:text-neutral-200">
                  {user?.emailAddresses?.[0]?.emailAddress}
                </div>
              </div>
              <button 
                onClick={() => router.push('/main')}
                className="inline-flex items-center justify-center rounded-md border border-orange-200 dark:border-neutral-700 p-2 sm:px-3 sm:py-2 text-orange-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800 transition"
              >
                ← Back to Main
              </button>
            </div>
          </div>

          {/* Admin Content */}
          <div className="space-y-6">
            <AdminMeetComponent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
