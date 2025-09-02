"use client";

import React from "react";

// Decorative butterfly, can be kept for visual appeal
const ButterflyMover: React.FC = () => null;

const DemoSection = () => (
  <section
    id="roadmap"
    className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
  >
    <ButterflyMover />

    {/* Decorative background */}
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-orange-500/30 to-yellow-400/30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-40 right-10 w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-orange-400/30 to-yellow-300/30 rounded-full blur-2xl animate-pulse delay-2000" />
      <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-yellow-300/30 to-orange-500/30 rounded-full blur-2xl animate-pulse delay-3000" />
    </div>

    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white/80 mt-20 border border-orange-100 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl">
        {/* Vision & Mission */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-4 text-center">Our Vision</h2>
          <p className="text-lg text-orange-800 text-center mb-8">
            To empower every aspiring learner to confidently code, build real-world projects, and unlock career opportunities in technology, regardless of their background.
          </p>
          <h2 className="text-3xl font-bold text-orange-900 mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-orange-800 text-center">
            At <span className="font-semibold text-orange-500">Coding Culture</span>, we provide structured, mentor-led coding programs that combine practical learning, hands-on projects, and community support. We aim to bridge the gap between academic knowledge and industry skills, ensuring our students are job-ready and future-proof in the ever-evolving tech world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Product Overview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-50/80 to-yellow-50/60 border border-orange-100 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">What We Offer</h3>
              <ul className="list-disc pl-6 space-y-3 text-orange-800 text-base">
                <li>
                  <span className="font-semibold text-orange-500">Structured Roadmaps & Courses:</span> 
                  <span> Learn coding step-by-step with clear paths, practical projects, and self-paced modules.</span>
                </li>
                <li>
                  <span className="font-semibold text-orange-500">Progress Tracking & Grading:</span> 
                  <span> Your journey is tracked, and you receive grades and feedback based on your performance.</span>
                </li>
                <li>
                  <span className="font-semibold text-orange-500">Internship Opportunities:</span> 
                  <span> Top performers are matched with real internships, with or without stipend, to kickstart their careers.</span>
                </li>
                <li>
                  <span className="font-semibold text-orange-500">Mentor Support:</span> 
                  <span> Get your doubts solved anytime by connecting directly with IITians and experienced mentors via live calls.</span>
                </li>
                <li>
                  <span className="font-semibold text-orange-500">Community Learning:</span> 
                  <span> Join a vibrant community of learners, collaborate, and grow together.</span>
                </li>
              </ul>
              <div className="mt-6">
                <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Sign up, start learning, and unlock your tech future!
                </span>
              </div>
            </div>
          </div>

          {/* Coming Soon & Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Coming Soon</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100/80 to-yellow-100/60 border border-orange-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <p className="text-orange-900 font-semibold">Coding Challenge Arena</p>
                  <p className="text-orange-800 text-sm">
                    Compete with others in real-time coding challenges. Results based on speed and problem-solving skills.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100/80 to-yellow-100/60 border border-orange-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <p className="text-orange-900 font-semibold">Anytime, Any Doubt</p>
                  <p className="text-orange-800 text-sm">
                    Instantly connect with mentors for doubt resolution, 24/7.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100/80 to-yellow-100/60 border border-orange-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="text-orange-900 font-semibold">College Connect</p>
                  <p className="text-orange-800 text-sm">
                    Trying to find the best college? Connect with students and alumni to get real insights.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100/80 to-yellow-100/60 border border-orange-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <p className="text-orange-900 font-semibold">And More...</p>
                  <p className="text-orange-800 text-sm">
                    Stay tuned for more features to help you learn, grow, and succeed in tech!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RoadMap = () => (
  <>
    <DemoSection />
    <section
      id="roadmap-2"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden bg-white">
        <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-orange-400/40 to-yellow-300/40 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-16 right-1/4 w-36 h-36 bg-gradient-to-r from-yellow-300/40 to-orange-500/40 rounded-full blur-xl animate-pulse delay-3000" />
        <div className="absolute top-24 left-16 w-40 h-40 bg-gradient-to-r from-orange-400/40 to-yellow-400/40 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-56 right-16 w-32 h-32 bg-gradient-to-r from-yellow-400/40 to-orange-400/40 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/90 mt-20 border border-orange-100 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg mb-8">
              Roadmap
            </div>
            <div className="relative w-full">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-yellow-400/0 rounded-full"></div>
              <div className="space-y-16">
                {[
                  {
                    title: "Sign Up & Start Learning",
                    desc: "Register on Coding Culture, choose your roadmap, and begin your journey with structured, practical modules.",
                  },
                  {
                    title: "Track Progress & Get Graded",
                    desc: "Complete lessons and projects. Your progress is tracked and you receive grades and feedback from mentors.",
                  },
                  {
                    title: "Mentor Support & Doubt Solving",
                    desc: "Stuck anywhere? Instantly connect with IITians and experienced mentors for live doubt resolution.",
                  },
                  {
                    title: "Internship Opportunities",
                    desc: "Based on your performance and grades, get matched with real-world internships—with or without stipend.",
                  },
                  {
                    title: "Community & Competitions",
                    desc: "Join coding challenges, connect with peers, and access exclusive features coming soon!",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative flex items-start group">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg">{idx + 1}</span>
                      </div>
                    </div>
                    <div className="ml-8 flex-1">
                      <div className="bg-gradient-to-r from-orange-50/80 to-yellow-50/60 border border-orange-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                          {step.title}
                        </h3>
                        <p className="text-orange-800 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default RoadMap;
