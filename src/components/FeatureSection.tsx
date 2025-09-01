"use client";

import { motion } from "framer-motion";
import { BookOpen, LineChart, Users, PlayCircle } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-indigo-600" />,
    title: "Structured Roadmap",
    desc: "Follow a step-by-step learning path from beginner to pro with clear milestones.",
  },
  {
    icon: <LineChart className="w-10 h-10 text-green-600" />,
    title: "Progress Tracking",
    desc: "Stay motivated with visual progress bars, streak counters, and learning insights.",
  },
  {
    icon: <PlayCircle className="w-10 h-10 text-pink-600" />,
    title: "Tuition Channel",
    desc: "Access live and recorded classes anytime, anywhere with expert tutors.",
  },
  {
    icon: <Users className="w-10 h-10 text-yellow-600" />,
    title: "Community Support",
    desc: "Learn together with peers, share doubts, and grow as a team.",
  },
];

const FeatureSection = () => {
  return (
    <>
    <section className="py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Our Platform?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};
export default FeatureSection;