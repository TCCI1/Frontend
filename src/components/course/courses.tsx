import React, { useState } from "react";
import Link from "next/link";

// Example course data (expand as needed)
const courses = [
  {
    name: "Software Development",
    path: "software",
    Card: React.lazy(() => import("./software/card")),
  },
  // Add more courses here, e.g.:
  // { name: "Data Science", path: "datascience", Card: React.lazy(() => import("./datascience/card")) },
  // { name: "UI/UX Design", path: "uiux", Card: React.lazy(() => import("./uiux/card")) },
];

// Example filter categories (expand as needed)
const filters = [
  { label: "All", value: "all" },
  { label: "Software", value: "software" },
  // { label: "Data Science", value: "datascience" },
  // { label: "UI/UX", value: "uiux" },
];

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter logic (expand as you add more courses/filters)
  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((course) => course.path === activeFilter);

  return (
    <section className="mt-8 pt-8 bg-white min-h-screen flex flex-col">
      {/* Filter Bar */}
      <div className="flex gap-4 px-6 pt-4 pb-6">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-xl px-6 py-2 font-semibold text-base transition-all duration-200
              ${
                activeFilter === filter.value
                  ? "bg-black text-white shadow"
                  : "bg-white text-black border border-black/20 hover:bg-black/10"
              }
            `}
            style={{ minWidth: "120px" }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="flex-1 px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center text-black/70 font-medium py-12">
              No courses found.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const CardComponent = course.Card;
              return (
                <React.Suspense
                  fallback={
                    <div className="rounded-xl bg-black/90 shadow p-8 flex items-center justify-center min-h-[200px]">
                      <span className="animate-pulse text-white font-semibold">
                        Loading...
                      </span>
                    </div>
                  }
                  key={course.path}
                >
                  <CardComponent />
                </React.Suspense>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
