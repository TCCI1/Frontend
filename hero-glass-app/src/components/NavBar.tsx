'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white/60 backdrop-blur-md border-b border-black/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-black">
          <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 mr-2 shadow-lg animate-pulse"></span>
          HeroGlass
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-black/80 hover:text-black transition-colors font-medium">
            About
          </Link>
          <Link href="#projects" className="text-black/80 hover:text-black transition-colors font-medium">
            Projects
          </Link>
          <Link href="#team" className="text-black/80 hover:text-black transition-colors font-medium">
            Team
          </Link>
          <Link href="#contact" className="text-black/80 hover:text-black transition-colors font-medium">
            Contact
          </Link>
          <a
            href="#"
            className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 transition"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`} />
          <span className={`block w-6 h-0.5 bg-black rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : 'mb-1'}`} />
          <span className={`block w-6 h-0.5 bg-black rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-black/10 px-4 py-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
          <Link 
            href="#about" 
            className="text-black/80 hover:text-black transition-colors font-medium"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="#projects" 
            className="text-black/80 hover:text-black transition-colors font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="#team" 
            className="text-black/80 hover:text-black transition-colors font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Team
          </Link>
          <Link 
            href="#contact" 
            className="text-black/80 hover:text-black transition-colors font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <a
            href="#"
            className="mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold shadow-md hover:scale-105 transition-transform text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
