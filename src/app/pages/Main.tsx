"use client";

import { useSession, UserButton } from "@clerk/nextjs";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import CourseMDX from "@/components/course/software/course.mdx";
import { components } from "@/components/course/software/mdx-components";
import TimelineComponent from "@/components/timeline";
import ProjectsComponent from "@/components/projects";

const MainPage = () => {
  const { isLoaded, isSignedIn } = useSession();
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  const [activeTab, setActiveTab] = React.useState<"course" | "timeline" | "projects">("course");

  React.useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') as ("light"|"dark"|null) : null;
    const initial: "light"|"dark" = stored ? stored : "dark";
    setTheme(initial);
    const root = document.documentElement;
    if (initial === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      if (next === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);


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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950 px-4">
        <div className="text-center w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-orange-100 dark:border-neutral-800">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl">🔒</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-orange-900 dark:text-neutral-100 mb-3 sm:mb-4">Authentication Required</h2>
            <p className="text-sm sm:text-base text-orange-700 dark:text-neutral-300 mb-4 sm:mb-6">
              Please sign in to access the main dashboard and continue your learning journey.
            </p>
            <button 
              onClick={() => window.location.href = '/sign-in'}
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              Sign In
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
          {/* Header Section - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Navigation Tabs - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-2 text-sm sm:text-base rounded-md border border-orange-200 dark:border-neutral-700 text-orange-800 dark:text-neutral-200 bg-orange-50 dark:bg-neutral-800 font-medium hover:bg-orange-100 dark:hover:bg-neutral-700 transition whitespace-nowrap ${activeTab === 'course' ? 'ring-2 ring-orange-400' : ''}`}
                  onClick={() => setActiveTab('course')}
                  aria-pressed={activeTab === 'course'}
                >
                  Course
                </button>
                <button
                  className={`px-3 py-2 text-sm sm:text-base rounded-md border border-orange-200 dark:border-neutral-700 text-orange-800 dark:text-neutral-200 bg-orange-50 dark:bg-neutral-800 font-medium hover:bg-orange-100 dark:hover:bg-neutral-700 transition whitespace-nowrap ${activeTab === 'timeline' ? 'ring-2 ring-orange-400' : ''}`}
                  onClick={() => setActiveTab('timeline')}
                  aria-pressed={activeTab === 'timeline'}
                >
                  Timeline
                </button>
                <button
                  className={`px-3 py-2 text-sm sm:text-base rounded-md border border-orange-200 dark:border-neutral-700 text-orange-800 dark:text-neutral-200 bg-orange-50 dark:bg-neutral-800 font-medium hover:bg-orange-100 dark:hover:bg-neutral-700 transition whitespace-nowrap ${activeTab === 'projects' ? 'ring-2 ring-orange-400' : ''}`}
                  onClick={() => setActiveTab('projects')}
                  aria-pressed={activeTab === 'projects'}
                >
                  Projects
                </button>
              </div>
            </div>
            {/* User Controls - Responsive */}
            <div className="flex items-center justify-end gap-2 sm:gap-4">
              <button 
                onClick={toggleTheme} 
                aria-label="Toggle theme" 
                className="inline-flex items-center justify-center rounded-md border border-orange-200 dark:border-neutral-700 p-2 sm:px-3 sm:py-2 text-orange-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800 transition"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <UserButton afterSignOutUrl="/"/>
            </div>
          </div>
          {/* Content Sections - Responsive */}
          {activeTab === 'course' && (
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-xl sm:rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-4 sm:p-6">
              <MDXProvider components={components}>
                <CourseMDX />
              </MDXProvider>
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-xl sm:rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-4 sm:p-6">
              <TimelineComponent />
            </div>
          )}
          {activeTab === 'projects' && (
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-xl sm:rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-4 sm:p-6">
              <ProjectsComponent />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
