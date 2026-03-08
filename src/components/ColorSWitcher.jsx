import React, { memo } from "react";
import { useStore } from "../store/useStore";

const colors = [
  { id: "blue", bg: "bg-blue-600", glow: "shadow-blue-500/50" },
  { id: "green", bg: "bg-emerald-600", glow: "shadow-emerald-500/50" },
  { id: "purple", bg: "bg-purple-600", glow: "shadow-purple-500/50" },
  { id: "amber", bg: "bg-amber-600", glow: "shadow-amber-500/50" },
];

const ColorSwitcher = memo(() => {
  const themeColor = useStore((state) => state.themeColor);
  const setThemeColor = useStore((state) => state.setThemeColor);

  return (
    <div className="relative group">
      {/* main panel */}
      <div
        className="
        flex gap-3 p-2 bg-zinc-950 
        border-2 border-zinc-800 rounded-lg 
        shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_1px_3px_rgba(255,255,255,0.05)]
      "
      >
        {colors.map((color) => {
          const isActive = themeColor === color.id;

          return (
            <button
              key={color.id}
              onClick={() => setThemeColor(color.id)}
              className="relative flex flex-col items-center gap-1 group/btn cursor-pointer"
            >
              {/* lense body*/}
              <div
                className={`
                relative w-5 h-5 rounded-full border-b-2 border-black/50
                transition-all duration-300 flex items-center justify-center
                ${color.bg}
                ${
                  isActive
                    ? `scale-110 shadow-[0_0_15px_1px_var(--tw-shadow-color)] ${color.glow} brightness-125`
                    : "opacity-40 grayscale-[0.5] hover:opacity-70"
                }
              `}
              >
                {/* inner blink (glass effect) */}
                <div className="absolute top-0.5 left-1 w-2 h-1.5 bg-white/30 rounded-full blur-[0.5px]" />

                {/* metal circle around lense */}
                <div
                  className={`
                  absolute -inset-[2px] rounded-full border border-zinc-700/50 pointer-events-none
                  ${isActive ? "border-zinc-400" : ""}
                `}
                />
              </div>

              {/* small point under lense */}
              <div
                className={`
                w-1 h-1 rounded-full transition-all duration-500
                ${isActive ? color.bg + " shadow-[0_0_4px_currentColor]" : "bg-zinc-800"}
              `}
              />
            </button>
          );
        })}
      </div>

      {/* text marker */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-zinc-950 text-[6px] text-zinc-600 font-bold uppercase tracking-[0.3em] whitespace-nowrap">
        Spectral Output
      </div>
    </div>
  );
});

export default ColorSwitcher;
