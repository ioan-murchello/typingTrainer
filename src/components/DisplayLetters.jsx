import React, { memo } from "react";
import { useStore } from "../store/useStore.js";

const DisplayLetters = memo(() => {
  const isAnimating = useStore((state) => state.isAnimating);
  const targetStr = useStore((state) => state.targetStr);
  const index = useStore((state) => state.index);

  return (
    <div
      className={`flex justify-center gap-x-1 gap-y-1 flex-wrap font-mono min-h-20  relative z-10
              ${isAnimating ? "opacity-40 blur-[1px]" : "opacity-100"}`}
    >
      {targetStr.split("").map((char, i) => {
        let colorClass = "text-slate-2f00";
        let glowEffect = "";

        if (i < index) {
          colorClass = "text-white/20";
        } else if (i === index) {
          colorClass = "text-orange-400";
          glowEffect =
            "drop-shadow-[0_0_12px_rgba(251,146,60,0.9)] scale-110 mx-1";
        }

        return (
          <span
            key={i}
            className={`${colorClass} ${glowEffect} transition-all text-2xl md:text-3xl duration-150 transform inline-block font-bold`}
          >
            {char === " " ? "__" : char}
          </span>
        );
      })}
    </div>
  );
});
export default DisplayLetters;
