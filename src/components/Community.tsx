"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, Network } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i:number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Community = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6"
        >
          Join Our Thriving{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Community
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
        >
          Learn, connect, and grow with peers, mentors, and industry
          professionals in a vibrant ecosystem.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {[
            {
              icon: <Users className="w-12 h-12 text-indigo-600 mb-4" />,
              title: "Peer Learning",
              desc: "Collaborate with fellow learners, share knowledge, and grow together.",
            },
            {
              icon: <GraduationCap className="w-12 h-12 text-green-600 mb-4" />,
              title: "Expert Guidance",
              desc: "Get support from experienced mentors and industry professionals.",
            },
            {
              icon: <Network className="w-12 h-12 text-pink-600 mb-4" />,
              title: "Networking Opportunities",
              desc: "Connect with like-minded individuals and expand your professional network.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              // variants={cardVariants}
              whileHover={{
                scale: 1.07,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center w-full md:w-1/3"
            >
              {card.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
