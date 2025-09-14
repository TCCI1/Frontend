"use client";

import * as React from "react";

// Timeline data type
type TimelineItem = {
  title: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
  link?: string;
};

const timelineData: TimelineItem[] = [
  {
    title: "Started Learning Programming",
    date: "2018",
    description: "Began with Python and basic web development.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-200 text-lg font-bold">
        🐍
      </span>
    ),
  },
  {
    title: "First Open Source Contribution",
    date: "2019",
    description: "Contributed to a GitHub project and learned about collaboration.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-lg font-bold">
        🌐
      </span>
    ),
  },
  {
    title: "Built My First App",
    date: "2020",
    description: "Created a to-do app using React and Firebase.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200 text-lg font-bold">
        ⚛️
      </span>
    ),
  },
  {
    title: "Joined University",
    date: "2021",
    description: "Started Computer Science degree.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200 text-lg font-bold">
        🎓
      </span>
    ),
  },
  {
    title: "Internship at Tech Company",
    date: "2022",
    description: "Worked as a software engineering intern.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-200 text-lg font-bold">
        💼
      </span>
    ),
  },
  {
    title: "Launched Portfolio Website",
    date: "2023",
    description: "Deployed my personal site and blog.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-200 text-lg font-bold">
        🚀
      </span>
    ),
    link: "https://myportfolio.com",
  },
];

const TimelineComponent: React.FC = () => {
  return (
    <div className="relative pl-4 sm:pl-6">
      {/* Vertical line */}
      <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-orange-200 dark:bg-orange-800 rounded-full" aria-hidden="true" />
      <ul className="space-y-6 sm:space-y-10">
        {timelineData.map((item, idx) => (
          <li key={idx} className="relative flex items-start group">
            {/* Icon */}
            <div className="absolute -left-1 sm:-left-1.5 z-10">
              {item.icon || (
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-sm sm:text-lg font-bold">
                  {idx + 1}
                </span>
              )}
            </div>
            <div className="ml-6 sm:ml-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-orange-900 dark:text-orange-100">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-0.5 rounded font-mono self-start sm:ml-2">
                  {item.date}
                </span>
              </div>
              {item.description && (
                <p className="mt-1 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineComponent;
