import React from "react";
import { useStore } from "../store/useStore";
import { LEVELS } from "../store/useStore";

const LevelMenu = () => {
  const level = useStore((state) => state.level);
  const setLevel = useStore((state) => state.setLevel);

  return (
    <div className="flex flex-col items-center gap-1 self-end p-2 bg-zinc-950 border-2 border-zinc-800 rounded-lg shadow-xl">
      <div className="flex gap-4 px-2 py-1">
        {Object.keys(LEVELS).map((lvl) => {
          const isActive = level === lvl;

          return (
            <div key={lvl} className="flex  items-center gap-2">
              <span
                className={`text-xs font-mono transition-colors duration-300 ${isActive ? "text-orange-400" : "text-zinc-700"}`}
              >
                {lvl}
              </span>

              {/* mechanical tumbler */}
              <button
                onClick={() => setLevel(lvl)}
                className={`
                  relative w-6 h-10 rounded-sm transition-all duration-200
                  border-x border-zinc-800 shadow-inner flex items-center justify-center
                  ${isActive ? "bg-zinc-800" : "bg-zinc-900"}
                `}
              >
                {/* vertical line */}
                <div className="absolute inset-y-1 w-0.5 bg-black opacity-40" />

                {/* tumbler (Lever) */}
                <div
                  className={`
                  w-4 h-5 bg-linear-to-b from-zinc-400 to-zinc-600 
                  rounded-sm shadow-md transition-all duration-300 transform
                  border border-zinc-400/30
                  ${
                    isActive
                      ? "translate-y-1.5 shadow-[0_4px_8px_rgba(249,115,22,0.4)] brightness-125"
                      : "translate-y1.5 grayscale opacity-60"
                  }
                `}
                >
                  {/* texture */}
                  <div className="w-full h-px bg-white/20 mt-1" />
                  <div className="w-full h-px bg-black/20 mt-1" />
                </div>
              </button>

              {/* lamp */}
              <div
                className={`
                w-1.5 h-1.5 rounded-full transition-all duration-500
                ${isActive ? "bg-orange-500 shadow-[0_0_6px_#f97316]" : "bg-zinc-900"}
              `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelMenu;
