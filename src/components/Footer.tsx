"use client"

const Footer = () => {
  return (
    <footer className="w-full bg-[#18181b] text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between md:items-end gap-10 relative">
        {/* Logo and tagline */}
        <div className="flex flex-col gap-3">
          <span
            className="font-bold text-2xl tracking-tight lowercase"
            style={{ fontFamily: "monospace, monospace" }}
          >
            Coding Culture .
          </span>
          <span className="text-zinc-400 text-sm">
            There is no risk-free trading.
          </span>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-zinc-300 mb-1 text-sm uppercase tracking-wider">Product</span>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">About</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">Features</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">Pricing</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">Blog</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-zinc-300 mb-1 text-sm uppercase tracking-wider">Support</span>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">Docs</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">FAQ</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">Contact</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-zinc-300 mb-1 text-sm uppercase tracking-wider">Social</span>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">X (Twitter)</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">LinkedIn</a>
            <a href="#" className="text-zinc-400 hover:text-white text-sm transition">YouTube</a>
          </div>
        </div>

        {/* Contact button */}
        <div className="flex flex-col gap-2 items-start">
          <a
            href="mailto:hello@codingculture.in"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-sm shadow hover:bg-zinc-100 transition"
            style={{ fontFamily: "monospace, monospace" }}
          >
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Contact us
          </a>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-400">
          <span>
            &copy; {new Date().getFullYear()} nock. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;