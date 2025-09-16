"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

// Data for each week in the timeline
const weeksData = [
  {
    label: "Week 1",
    tasks: ["C-programming Basics", "Simple Calculator"],
  },
  {
    label: "Week 2",
    tasks: ["Control Flow", "Number Guessing Game"],
  },
  {
    label: "Week 3",
    tasks: ["Functions & Arrays", "Simple To-Do List"],
  },
  {
    label: "Week 4",
    tasks: ["Pointers & Memory Management", "Employee Recording System"],
  },
  {
    label: "Week 5",
    tasks: ["Python Basics", "Control Flow Statement", "Operations"],
  },
  {
    label: "Week 6",
    tasks: ["Data Structures", "Functions"],
  },
  {
    label: "Week 7",
    tasks: ["Object-Oriented Programming (OOP)", "File I/O"],
  },
  {
    label: "Week 8",
    tasks: ["Advanced Topics"],
  },
  {
    label: "Week 9",
    tasks: ["Structure"],
  },
  {
    label:"Week 10",
    tasks:["Html "]
  }
];

export default function Timeline() {
  return (
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-b from-gray-950 via-black to-gray-900 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        🚀 Programming Journey (8 Weeks)
      </h2>
      <p className="text-center text-gray-400 mb-12 text-lg">
        Master programming step by step — from C fundamentals to Python and
        beyond.
      </p>

      <div className="relative border-l border-gray-700 pl-6 space-y-10">
        {weeksData.map((week, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline dot: CheckCircle for first 4 weeks, Circle for others */}
            <div className="absolute -left-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-md">
              {idx < 4 ? <CheckCircle size={18} /> : <Circle size={18} />}
            </div>

            {/* Python section intro only once, before week 5 */}
            {idx === 4 && (
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-400">
                  🔥 Python Programming (Weeks 5–8)
                </h3>
                <p className="text-gray-400">
                  After completing 4 weeks of C-Programming, it’s time to
                  explore Python and expand your skills!
                </p>
              </div>
            )}

            {/* DSA section intro only once, before week 9 */}
            {idx === 8 && (
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-400">
                  🔥 DSA Programming (Weeks 9)
                </h3>
                <p className="text-gray-400">
                  After completing 8 weeks of C-Programming and Python, it’s time to
                  explore Data Structures and Algorithms!
                </p>
              </div>
            )}
            {
              idx === 9 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-purple-400">
                  🔥 Frontend development(weeks 9)
                  </h3>
                  <p className="text-gray-400">
                  After completing 16 weeks of DataStructure , it’s time to
                  explore frontend
                  </p>
                </div>
              )}
            {/* Week card */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-purple-600/40 transition duration-300">
              <h4 className="text-xl font-semibold text-pink-400 mb-4">
                {week.label}
              </h4>

              <div className="flex flex-wrap gap-3">
                {week.tasks.map((task, tIdx) => (
                  <motion.span
                    key={tIdx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium cursor-pointer hover:shadow-lg transition"
                  >
                    {task}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
