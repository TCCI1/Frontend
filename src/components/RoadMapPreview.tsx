"use client";
import Image from "next/image";
import Roadmap from "../assets/roadmap.png";

const RoadMapPreview = () => {
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Learning  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Roadmap</span>
        </h2>

        <div className="relative w-full h-64 bg-gray-100 rounded-2xl shadow-lg overflow-hidden flex items-center">
          <div className="flex-shrink-0 h-full">
            <Image
              src={Roadmap}
              alt="Roadmap Example"
              className="h-full w-auto object-contain"
              priority
            />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-700 bg-white/60 px-3 py-1 rounded-lg">
              Zero to hero notation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMapPreview;
