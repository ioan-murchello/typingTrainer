import React, { memo } from "react";
import { useStore } from "../store/useStore";

const Cpm = memo(() => {
  
    const cpm = useStore((state) => state.cpm);
  const isAnimating = useStore((state) => state.isAnimating);

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center w-32 h-16 
        bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden
      `}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-10" />

      <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-tighter mb-1">
        Neural Sync Speed
      </p>

      <div className="flex items-baseline gap-1">
        <p
          className={`
            text-2xl font-black font-mono transition-all duration-300
            ${isAnimating ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" : "text-blue-900"}
          `}
        >
          {cpm}
        </p>
        <span className="text-[8px] font-bold text-zinc-600">CPM</span>
      </div>

      {/* (Oscilloscope effect) */}
      <div className="absolute bottom-1 left-2 right-2 h-0.5 bg-zinc-800 overflow-hidden">
        <div
          className={`h-full bg-blue-500/50 transition-all duration-1000 ${isAnimating ? "w-full translate-x-0" : "w-0 -translate-x-full"}`}
        />
      </div>
    </div>
  );
});
export default Cpm;
