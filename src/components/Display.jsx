import React, { memo, useEffect } from "react";
import HeaderCircuits from "./HeaderCircuits";
import SparkContainer from "./SparkContainer";
import { useStore } from "../store/useStore";
import DisplayLetters from "./DisplayLetters";

const Display = memo(() => {
  const generateString = useStore((state) => state.generateString);
  const level = useStore((state) => state.level);

  useEffect(() => {
    generateString();
  }, [generateString, level]);

  return (
    <div className="relative group max-w-full mx-auto">
      <HeaderCircuits />
      <SparkContainer />
 
      <div className="relative p-0.5">
        {/* outside light over container */}
        <div className="absolute -inset-1 bg-orange-500/10 blur-xl opacity-70" />

        <div
          className={`
            relative p-3 min-h-20 flex items-center justify-center
            bg-slate-900/60 backdrop-blur-md
            border border-white/10 transition-all duration-500 
            [clip-path:polygon(3%_0%,_100%_0%,_100%_80%,_97%_100%,_0%_100%,_0%_20%)]
          `}
          style={{
            boxShadow: `inset 0 0 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)`,
          }}
        >
          {/* glass blink */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

          {/* points chain on background */}
          <div
            className="absolute inset-0 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 0.5px, transparent 0.5px)`,
              backgroundSize: "8px 8px",
            }}
          />

          {/* (Display Content) */}
          <DisplayLetters />

          {/* (HUD Brackets) */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />

          {/* marker code */}
          <div className="absolute bottom-4 right-8 flex items-center gap-3 opacity-40">
            <div className="flex gap-px">
              {[1, 4, 2, 8].map((h, i) => (
                <div
                  key={i}
                  className={`bg-orange-500 w-[${h}px] h-3`}
                  style={{ width: h }}
                />
              ))}
            </div>
            <span className="text-[10px] text-orange-500 font-mono tracking-[0.3em] uppercase">
              Main_Core_Feed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Display;
