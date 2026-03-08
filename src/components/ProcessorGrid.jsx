import React, { memo } from "react";
import { useStore } from "../store/useStore";

const gridCells = Array.from({ length: 80 }).map(() => ({
  delay: Math.random() * 2,
  duration: 0.5 + Math.random() * 1.5,
}));

const ProcessorGrid = memo(() => {
  const isAnimating = useStore((state) => state.isAnimating);

  return (
    <div className="absolute bottom-6 right-6 flex items-center justify-center p-2 pointer-events-none select-none">
      <div className="relative group scale-90">
        {/* Glass Top */}
        <div className="relative z-20 p-1.5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/50 rounded shadow-[0_0_20px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Matrix Grid */}
          <div className="relative z-10 grid grid-cols-10 gap-[1px] bg-black/60 p-0.5 border border-zinc-800">
            {gridCells.map((cell, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 transition-all duration-1000 ${
                  isAnimating ? "bg-[#fb923c]" : "bg-zinc-800/40"
                }`}
                style={{
                  boxShadow: isAnimating ? "0 0 4px #fb923c" : "none",
                  animation: `data-blink ${cell.duration}s ease-in-out ${cell.delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Underglow */}

          <div className="absolute inset-0 -z-10 bg-orange-500/10 blur-xl animate-pulse" />
        </div>

        {/* Screws */}
        <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rotate-45 z-30" />
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rotate-45 z-30" />
        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rotate-45 z-30" />
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-zinc-800 border border-zinc-700 rotate-45 z-30" />
      </div>

      <div className="absolute -bottom-3 right-0 opacity-20">
        <span className="text-[5px] text-zinc-500 font-mono tracking-[0.2em] uppercase">
          MTRX-PRC // DATA_STREAM
        </span>
      </div>
    </div>
  );
});

export default ProcessorGrid;
