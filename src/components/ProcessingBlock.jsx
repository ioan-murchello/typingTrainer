import React, { memo, useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { useAudioManager } from "../hooks/useAudio";

const ProcessingBlock = memo(() => {
  const playSound = useAudioManager();

  const isAnimating = useStore((state) => state.isAnimating);
  const isMuted = useStore((state) => state.isMuted);

  const [points, setPoints] = useState("");

  useEffect(() => {
    if (isMuted) return;
    if (isAnimating) {
      playSound("thinking");
    }

    return () => {
      playSound("thinking", "stop");
    };
  }, [isAnimating, isMuted, playSound]);

  useEffect(() => {
    if (!isAnimating) return;
    const generateBolt = () => {
      const segments = 10;
      const width = 200;
      const height = 12;
      let newPoints = `2,${height / 2} `;
      for (let i = 1; i < segments; i++) {
        const x = (width / segments) * i;
        const y = 2 + Math.random() * (height - 4);
        newPoints += `${x},${y} `;
      }
      newPoints += `${width - 2},${height / 2}`;
      setPoints(newPoints);
    };
    const interval = setInterval(generateBolt, 60);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="absolute -left-1/3 mt-3 w-full flex justify-center items-center h-16">
      <div className="relative z-10 flex flex-col items-center">
        {/* lamp body */}
        <div
          className="
          relative w-[230px] h-[36px] 
          bg-zinc-950 rounded-full 
          border-[3px] border-zinc-800
          shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(0,0,0,1)]
          flex items-center justify-center overflow-hidden
        "
        >
          {/* (Anode Grid) */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none z-10"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "4px 4px",
            }}
          />

          {/* glass blink effect */}
          <div className="absolute inset-x-8 top-1 h-[6px] bg-gradient-to-b from-white/20 to-transparent rounded-full z-40 blur-[0.5px]" />

          {/* bottom blink effect */}
          <div className="absolute inset-x-12 bottom-1 h-[3px] bg-white/5 rounded-full z-40" />

          {/* metal heads */}
          <div className="absolute -left-1 h-full w-6 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-950 border-r border-black shadow-xl z-50" />
          <div className="absolute -right-1 h-full w-6 bg-gradient-to-l from-zinc-700 via-zinc-800 to-zinc-950 border-l border-black shadow-xl z-50" />

          {/* (Background Glow) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 z-0 ${isAnimating ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-orange-600/20 blur-xl animate-pulse" />
            <div className="absolute inset-y-0 left-10 right-10 bg-orange-500/10 blur-md" />
          </div>

          {/* 6. SVG zipper */}
          {isAnimating && (
            <svg className="w-[200px] h-[16px] overflow-visible relative z-30">
              {/*  (Aura) */}
              <polyline
                points={points}
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                className="blur-[6px] opacity-40"
              />
              {/* main zipper */}
              <polyline
                points={points}
                fill="none"
                stroke="#fdba74"
                strokeWidth="1.5"
                className="animate-[flicker_0.1s_infinite]"
              />
              {/* white light */}
              <polyline
                points={points}
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                strokeOpacity="0.9"
              />
            </svg>
          )}
        </div>

        {/* diode and text */}
        <div className="flex items-center gap-3 mt-3">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isAnimating ? "bg-red-500 shadow-[0_0_8px_red] animate-pulse" : "bg-zinc-800"}`}
          />
          <span className="text-[8px] text-zinc-600 font-mono font-bold tracking-[0.5em] uppercase">
            Surge Tube v.2
          </span>
        </div>
      </div>
    </div>
  );
});

export default ProcessingBlock;
