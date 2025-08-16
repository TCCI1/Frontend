const RoadMap = () => (
  <section
    id="roadmap"
    className="relative w-full min-h-screen flex flex-col items-center bg-white overflow-hidden gap-10"
  >
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
    {/* Full background grid */}
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
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
    <div className="relative w-full flex flex-row items-start gap-8 mt-10">
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Roadmap</h2>
        {/* Left division content goes here */}
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Roadmap</h2>
      </div>
    </div>
  </section>
);
export default RoadMap;
