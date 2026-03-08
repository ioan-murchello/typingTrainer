import React, { memo } from "react";

const Key = memo(({ k, isActive, zoneColor }) => { 

  return (
    <div className="relative group">
      {/* light background lighting */}
      <div
        className={`absolute -inset-0.5 transition-all duration-500 rounded-sm ${
          isActive ? "opacity-100 scale-110" : "opacity-20 scale-100"
        }`}
        style={{ backgroundColor: zoneColor }}
      />

      <div
        style={{ 
          borderColor: zoneColor,
        }}
        className={`relative h-9 w-9 flex items-center justify-center transition-all duration-150 uppercase font-mono font-medium text-[11px] border backdrop-blur-[1px] overflow-hidden [clip-path:polygon(15%_0%,_100%_0%,_100%_85%,_85%_100%,_0%_100%,_0%_15%)]`}
      >
        {isActive && (
          <div
            style={{ animation: "scan 0.4s linear infinite" }}
            className="absolute left-0 w-full h-px bg-white/60 shadow-[0_0_8px_white] z-20"
          />
        )}
        <span
          className={`relative bg-${zoneColor} z-10 text-white/70 text-xl tracking-widest ${isActive ? "text-white drop-shadow-[0_0_5px_white]" : ""}`}
        >
          {k}
        </span>
        {(k.toLowerCase() === "f" || k.toLowerCase() === "j") && (
          <div
            className={`absolute bottom-1.5 w-3 h-[1.5px] rounded-full ${isActive ? "bg-white opacity-100" : "bg-white/30 opacity-60"}`}
          />
        )}
      </div>
    </div>
  );
});

export default Key;
