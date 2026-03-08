import React, { memo} from "react";
import { useStore } from "../store/useStore";

// generate stabile values for each diode
const LED_SETTINGS = Array.from({ length: 4 }).map(() => ({
  duration: `${1 + Math.random() * 3}s`,
  delay: `${Math.random() * 2}s`,
}));

const Indicators = memo(() => {
  const mistakes = useStore((state) => state.mistakes);

  return (
    <div className="flex gap-2 justify-center items-start">
      {LED_SETTINGS.map((settings, i) => {
        let colorClass = "bg-[#b6ee00] shadow-[0_0_6px_#3bee00c9]";
        let animationClass = "animate-flicker";

        if (mistakes > 0) {
          if (mistakes >= 5) {
            colorClass = "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]";
          } else if (i < mistakes) {
            colorClass = "bg-yellow-600 [0_0_6px_rgba(239, 255, 18, 0.8)]";
          }
        }

        return (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${colorClass} ${animationClass}`}
            style={{
              animationDuration: settings.duration,
              animationDelay: settings.delay,
              border:
                mistakes >= 5 ? "1px solid rgba(255,255,255,0.2)" : "none",
            }}
          />
        );
      })}
    </div>
  );
});

export default Indicators;
