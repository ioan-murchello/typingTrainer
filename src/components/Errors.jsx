import React, { memo } from "react";
import { useStore } from "../store/useStore";

const Errors = memo(() => {
  const mistakes = useStore((state) => state.mistakes);
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center w-24 h-16 
        bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden
        transition-colors duration-500
        ${mistakes > 0 ? "bg-red-950/20" : ""}
      `}
    >
      {/* glass blink */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-10" />

      <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-tighter mb-1">
        Critical Errors
      </p>

      <div className="relative">
        <p
          className={`
            text-2xl font-black font-mono transition-all duration-300
            ${mistakes > 0 ? "text-red-500 animate-[flicker_0.5s_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]" : "text-zinc-700"}
          `}
        >
          {mistakes.toString().padStart(2, "0")}
        </p>
      </div>

      {/* error level */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800 flex gap-px">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 ${i < mistakes ? "bg-red-600" : "bg-zinc-700"}`}
          />
        ))}
      </div>
    </div>
  );
});
export default Errors;
