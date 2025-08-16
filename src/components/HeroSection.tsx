'use client';

import React, { useEffect, useState } from 'react';
import MoveableCard from './MoveableCard';


const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Animated background grid */}
      <div className="hidden md:block ">
        <MoveableCard />
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="w-full h-full grid grid-cols-20 grid-rows-20">
          {/* Only render the grid container, not individual squares */}
        </div>
        {/* Overlay horizontal lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full border-t border-black/20"
            style={{
              top: `${((i + 1) / 12) * 100}%`
            }}
          />
        ))}
        {/* Overlay vertical lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full border-l border-black/20"
            style={{
              left: `${((i + 1) / 12) * 100}%`
            }}
          />
        ))}
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-3000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div 
          className={`mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-black/10 backdrop-blur-sm border border-black/20 text-sm font-medium text-black/90">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
            We're hiring creative minds
          </span>
        </div>

        {/* Main headline */}
        <h1 
          className={`mb-6 transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="block mb-2">
              <span className="text-black">We Build </span>
              <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text">
                Thinkers
              </span>
            </span>
            <span className="block mb-2">
              <span className="text-black">Not </span>
              <span
                className="relative"
                style={{
                  WebkitTextFillColor: "transparent",
                  background: "linear-gradient(90deg, #facc15, #fb923c, #fde68a)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text"
                }}
              >
                <span
                  className="line-through"
                  style={{
                    textDecorationColor: "#ef4444" // Tailwind red-500
                  }}
                >
                  Machines
                </span>
              </span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`mb-8 max-w-2xl text-base sm:text-lg md:text-xl text-black/60 font-light leading-relaxed transition-all duration-700 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          At Coding Culture, we provide structured, mentor-led coding programs that combine practical learning, hands-on projects, and community support.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50 active:scale-95">
            <span className="relative z-10">Explore Our Vision</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="px-8 py-4 border border-black/20 text-black font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-black/10 hover:border-black/30 focus:outline-none focus:ring-2 focus:ring-black/50">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div 
          className={`mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl transition-all duration-700 ease-out delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">50+</div>
            <div className="text-xs sm:text-sm text-black/60">Students Trusted</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">40+</div>
            <div className="text-xs sm:text-sm text-black/60">Students Satified</div>
          </div>
          <div className="text-center col-span-2 sm:col-span-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">50%</div>
            <div className="text-xs sm:text-sm text-black/60">Students are Earning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

