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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700 dark:text-neutral-300 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 border border-orange-100 dark:border-neutral-800">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-orange-900 dark:text-neutral-100 mb-4">Authentication Required</h2>
            <p className="text-orange-700 dark:text-neutral-300 mb-6">
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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-neutral-950 dark:to-neutral-950 flex">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-2 rounded-md border border-orange-200 dark:border-neutral-700 text-orange-800 dark:text-neutral-200 bg-orange-50 dark:bg-neutral-800 font-medium hover:bg-orange-100 dark:hover:bg-neutral-700 transition ${activeTab === 'course' ? 'ring-2 ring-orange-400' : ''}`}
                onClick={() => setActiveTab('course')}
                aria-pressed={activeTab === 'course'}
              >
                Course
              </button>
              <button
                className={`px-3 py-2 rounded-md border border-orange-200 dark:border-neutral-700 text-orange-800 dark:text-neutral-200 bg-orange-50 dark:bg-neutral-800 font-medium hover:bg-orange-100 dark:hover:bg-neutral-700 transition ${activeTab === 'timeline' ? 'ring-2 ring-orange-400' : ''}`}
                onClick={() => setActiveTab('timeline')}
                aria-pressed={activeTab === 'timeline'}
              >
                Timeline
              </button>
              <button
                className={`px-3 py-2 rounded-md border border-orange-200 dark:border-neutral-700 text-orange-800 dark:text-neutral-200 bg-orange-50 dark:bg-neutral-800 font-medium hover:bg-orange-100 dark:hover:bg-neutral-700 transition ${activeTab === 'projects' ? 'ring-2 ring-orange-400' : ''}`}
                onClick={() => setActiveTab('projects')}
                aria-pressed={activeTab === 'projects'}
              >
                Projects
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={toggleTheme} aria-label="Toggle theme" className="inline-flex items-center justify-center rounded-md border border-orange-200 dark:border-neutral-700 px-3 py-2 text-orange-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800 transition">
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>
          </div>
          {/* Remove <article className="notion"> to avoid <div> inside <p> */}
          {activeTab === 'course' && (
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-6">
              <MDXProvider components={components}>
                <CourseMDX />
              </MDXProvider>
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-6">
              <TimelineComponent />
            </div>
          )}
          {activeTab === 'projects' && (
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-6">
              <ProjectsComponent />
            </div>
          )}
        </div>
      </div>
      {/* 
        This container is now scroll-proof: 
        - It uses 'sticky' positioning to stay fixed at the top of its parent container while scrolling.
        - 'top-0' ensures it sticks to the top.
        - 'z-50' keeps it above other content.
        - The rest of the styling is preserved.
      */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-2xl shadow border border-orange-100 dark:border-neutral-800 p-8">
          <div className="mb-6">
            <span className="block text-base font-semibold text-orange-700 dark:text-orange-200 mb-3">Live Chat Rooms</span>
            <div className="flex flex-col gap-4">
              {/* Zoom Room Preview */}
              <a
                href="https://zoom.us/j/your-room-id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 transition group shadow-sm"
              >
                <div className="flex-shrink-0">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="rounded-lg bg-blue-200 dark:bg-blue-800 p-2">
                    <rect width="36" height="36" rx="8" fill="currentColor" className="text-blue-200 dark:text-blue-800"/>
                    <path d="M24.5 15.5L28 13.5V22.5L24.5 20.5V15.5Z" fill="#2563eb"/>
                    <rect x="8" y="13" width="14" height="10" rx="2" fill="#2563eb"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-blue-900 dark:text-blue-100 text-lg">Zoom Room</div>
                  <div className="text-sm text-blue-700 dark:text-blue-200 truncate">Weekly Study Group – Mondays 7:00pm IST</div>
                  <div className="text-xs text-blue-500 dark:text-blue-300 mt-1 truncate">https://zoom.us/j/your-room-id</div>
                </div>
                <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition">Join</span>
              </a>
              {/* Google Meet Preview */}
              <a
                href="https://meet.google.com/your-room-id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900 transition group shadow-sm"
              >
                <div className="flex-shrink-0">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="rounded-lg bg-green-200 dark:bg-green-800 p-2">
                    <rect width="36" height="36" rx="8" fill="currentColor" className="text-green-200 dark:text-green-800"/>
                    <path d="M12 13a2 2 0 0 1 2-2h4v4l3-3v10l-3-3v4h-4a2 2 0 0 1-2-2V13z" fill="#22c55e"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-green-900 dark:text-green-100 text-lg">Google Meet</div>
                  <div className="text-sm text-green-700 dark:text-green-200 truncate">Doubt Solving Session – Thursdays 8:30pm IST</div>
                  <div className="text-xs text-green-500 dark:text-green-300 mt-1 truncate">https://meet.google.com/your-room-id</div>
                </div>
                <span className="ml-2 px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">Join</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
