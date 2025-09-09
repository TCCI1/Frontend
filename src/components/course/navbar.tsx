'use client';

import { UserButton } from "@clerk/nextjs";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '@clerk/nextjs';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useSession();


  return (
    <nav className="fixed z-50 top-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-black/10 rounded-full px-6 py-3 max-w-2xl w-[95vw] shadow-lg transition-all duration-500 ease-out">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-black">
          <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 mr-2 shadow-lg animate-pulse"></span>
          <span>Codinnnnn</span>
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
          {isSignedIn ? (
            <UserButton />
          ) : (
            <a
              href="/sign-in"
              className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold shadow-md hover:shadow-lg transition-shadow"
            >
              Get Started
            </a>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`} />
          <span className={`block w-6 h-0.5 bg-black rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : 'mb-1'}`} />
          <span className={`block w-6 h-0.5 bg-black rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl px-4 py-4 flex flex-col gap-3 shadow-lg z-50">
          <Link 
            href="#about" 
            className="text-black/80 hover:text-black transition-colors font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="#projects" 
            className="text-black/80 hover:text-black transition-colors font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="#team" 
            className="text-black/80 hover:text-black transition-colors font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Team
          </Link>
          <Link 
            href="#contact" 
            className="text-black/80 hover:text-black transition-colors font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <a
              href="#"
              className="mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold shadow-md hover:shadow-lg transition-shadow text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
