"use client";

import * as React from "react";

// Example project data
type Project = {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
};

const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description: "A modern portfolio website built with Next.js, Tailwind CSS, and shadcn/ui components.",
    link: "https://github.com/yourusername/portfolio",
    tags: ["Next.js", "Tailwind", "shadcn/ui"],
  },
  {
    title: "Task Manager App",
    description: "A full-stack task manager with authentication, real-time updates, and a beautiful UI.",
    link: "https://github.com/yourusername/task-manager",
    tags: ["React", "Node.js", "Prisma"],
  },
  {
    title: "Open Source CLI Tool",
    description: "A command-line tool to automate repetitive development tasks.",
    link: "https://github.com/yourusername/cli-tool",
    tags: ["TypeScript", "CLI"],
  },
];

// Minimal shadcn/ui Card and Badge components (replace with actual imports in your project)
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 mb-6 ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold mb-2">{children}</h3>;
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-neutral-700 dark:text-neutral-300 mb-3">{children}</p>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-0.5 rounded text-xs font-mono mr-2 mb-1">
      {children}
    </span>
  );
}

const ProjectsComponent: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-6">Projects</h2>
      <div>
        {projects.map((project, idx) => (
          <Card key={idx}>
            <div className="flex items-center justify-between">
              <CardTitle>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </CardTitle>
            </div>
            <CardDescription>{project.description}</CardDescription>
            <div className="flex flex-wrap gap-1">
              {project.tags?.map((tag, i) => (
                <Badge key={i}>{tag}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsComponent;
