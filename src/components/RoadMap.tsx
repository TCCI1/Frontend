"use client";

import React, { useRef, useEffect, useState } from "react";

const ButterflyMover: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionRect = section.getBoundingClientRect();
      setMousePos({
        x: e.clientX - sectionRect.left,
        y: e.clientY - sectionRect.top,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Move butterfly towards mouse position
  useEffect(() => {
    if (dragging) return; // Don't auto-move while dragging

    let animationFrame: number;
    let lastTime = performance.now();

    const move = (now: number) => {
      const elapsed = now - lastTime;
      lastTime = now;
      // 50px/sec towards mouse
      const step = (elapsed / 1000) * 50;

      setPos(prev => {
        const section = sectionRef.current;
        if (!section) return prev;
        
        const width = section.offsetWidth;
        const height = section.offsetHeight;
        const imgW = 128; // w-32
        const imgH = 128; // h-32

        // Calculate direction to mouse
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) return prev; // Stop if very close to mouse

        // Normalize direction and apply step
        const moveX = (dx / distance) * step;
        const moveY = (dy / distance) * step;

        let nx = prev.x + moveX;
        let ny = prev.y + moveY;

        // Clamp to section bounds
        nx = Math.max(0, Math.min(width - imgW, nx));
        ny = Math.max(0, Math.min(height - imgH, ny));

        return { x: nx, y: ny };
      });

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [dragging, mousePos]);

  // Mouse/touch drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    const pointerX = e.type === "touchstart"
      ? (e as any).touches[0].clientX
      : e.clientX;
    const pointerY = e.type === "touchstart"
      ? (e as any).touches[0].clientY
      : e.clientY;
    setOffset({
      x: pointerX - pos.x - (sectionRef.current?.getBoundingClientRect().left || 0),
      y: pointerY - pos.y - (sectionRef.current?.getBoundingClientRect().top || 0),
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const section = sectionRef.current;
    if (!section) return;
    const sectionRect = section.getBoundingClientRect();
    const pointerX = e.clientX;
    const pointerY = e.clientY;
    const imgW = 128;
    const imgH = 128;
    let nx = pointerX - sectionRect.left - offset.x;
    let ny = pointerY - sectionRect.top - offset.y;
    // Clamp to section
    nx = Math.max(0, Math.min(section.offsetWidth - imgW, nx));
    ny = Math.max(0, Math.min(section.offsetHeight - imgH, ny));
    setPos({ x: nx, y: ny });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
  };

  // Attach section ref to parent section
  useEffect(() => {
    // Find the parent section element
    if (!sectionRef.current) {
      // @ts-ignore
      sectionRef.current = document.getElementById("roadmap");
    }
  }, []);

  return (
    <img
      src="/images/butterfly.gif"
      alt="Butterfly animation"
      className={`w-32 h-32 object-contain select-none`}
      loading="lazy"
      style={{
        position: "absolute",
        left: pos.x - 80,
        top: pos.y - 80,
        zIndex: 10,
        userSelect: "none",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      draggable={false}
    />
  );
};

const RoadMap = () => (
  <section
    id="roadmap"
    className="relative w-full min-h-screen flex flex-col items-center bg-white overflow-hidden gap-10"
  >
    {/* 
      Animated, draggable butterfly that moves in a criss-cross pattern at 10px/sec.
      User can drag and hold to move it manually.
    */}
    <ButterflyMover />
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse delay-2000" />
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-3000" />
    </div>
    {/* Section Headline */}
    <h1
      className="mb-6 mt-40 transition-all duration-700 ease-out text-center"
    >
      <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        <span className="block mb-2">
          <span className="text-black">What's the difference between </span>
          <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text">
            School
          </span>
          <span className="text-black"> and </span>
          <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text">
            Us
          </span>
          <span className="text-black">?</span>
        </span>
      </span>
    </h1>
    {/* Full background grid with circular gradient overlay */}
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50">
      <div className="w-full h-full grid grid-cols-12 grid-rows-8">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 12 }).map((_, col) => (
            <div
              key={`cell-${row}-${col}`}
              className="border border-black/10"
              style={{ width: '100%', height: '100%' }}
            />
          ))
        )}
      </div>
    </div>
    {/* Content goes here */}
    <div className="ml-0 relative w-full flex flex-col sm:flex-row items-start gap-8 mt-10 justify-center px-2 sm:px-6">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <div className="rounded-md border overflow-hidden relative shadow">
            <table className="w-full caption-bottom text-[1rem] sm:text-base relative z-10">
              <thead className="[&_tr]:border-b bg-white bg-opacity-90">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-16 px-5 text-left align-middle font-semibold text-yellow-600 tracking-wide text-base [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-block animate-bounce text-lg">🎓</span>
                      <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                        The Old Way
                      </span>
                    </div>
                    <div className="text-xs font-normal text-muted-foreground mt-1">Aspect</div>
                  </th>
                  <th className="h-16 px-5 text-left align-middle font-semibold text-gray-700 tracking-wide text-base [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-block animate-spin-slow text-lg">📚</span>
                      <span className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 bg-clip-text text-transparent">
                        Traditional
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 relative">
                {/* Blurred background for tbody only */}
                <tr>
                  <td colSpan={2} className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <div className="w-full h-full backdrop-blur-md bg-white/40 rounded-b-md" />
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Learning Pace</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Fixed curriculum</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Assessment</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Standardized tests</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Environment</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Classroom-based</td>
                </tr>
                <tr className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Flexibility</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Limited options</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <div className="rounded-md border overflow-hidden relative shadow">
            <table className="w-full caption-bottom text-[1rem] sm:text-base relative z-10">
              <thead className="[&_tr]:border-b bg-white bg-opacity-90">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-16 px-5 text-left align-middle font-semibold text-orange-600 tracking-wide text-base [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-block animate-bounce text-lg">🦋</span>
                      <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 bg-clip-text text-transparent">
                        The New Way
                      </span>
                    </div>
                    <div className="text-xs font-normal text-muted-foreground mt-1">Aspect</div>
                  </th>
                  <th className="h-16 px-5 text-left align-middle font-semibold text-yellow-700 tracking-wide text-base [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-block animate-spin-slow text-lg">🚀</span>
                      <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                        Innovative
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 relative">
                {/* Blurred background for tbody only */}
                <tr>
                  <td colSpan={2} className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <div className="w-full h-full backdrop-blur-md bg-white/40 rounded-b-md" />
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Learning Pace</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Personalized approach</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Assessment</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Project-based learning</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Environment</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Flexible & adaptive</td>
                </tr>
                <tr className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted relative z-10">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-gray-800">Flexibility</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700">Maximum customization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default RoadMap;
