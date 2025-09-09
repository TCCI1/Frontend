import React from "react";
import Link from "next/link";

const SoftwareCard = () => {
  return (
    <div className="rounded-xl bg-white shadow-lg p-8 flex flex-col items-center justify-between min-h-[320px] border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl">💻</span>
        </div>
        <h3 className="text-xl font-bold text-orange-900 mb-2 text-center">
          Software Development
        </h3>
        <p className="text-orange-800 text-center mb-4">
          Learn the fundamentals of software engineering, coding best practices, and build real-world projects using modern technologies.
        </p>
      </div>
      <Link
        href="/courses/software"
        className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold shadow-md hover:shadow-lg transition-shadow"
      >
        Explore Course
      </Link>
    </div>
  );
};

export default SoftwareCard;
