import React, { useEffect, useState } from "react";
import { useStore, themeMap } from "../store/useStore";

const HeaderCircuits = () => {
  const themeColor = useStore((s) => s.themeColor);
  const isMuted = useStore((s) => s.isMuted);
  const colorChangeTrigger = useStore((s) => s.colorChangeTrigger);
  const level = useStore((s) => s.level);
  const mistakes = useStore((s) => s.mistakes);
  const [active, setActive] = useState({ left: 0, center: 0, right: 0 });
  const currentThemeColor = themeMap[themeColor]?.shadow || "#34ca13";

  useEffect(() => {
    setActive((p) => ({ ...p, left: p.left + 1 }));
  }, [isMuted, colorChangeTrigger, themeColor]);

  useEffect(() => {
    setActive((p) => ({ ...p, center: p.center + 1 }));
  }, [level]);

  useEffect(() => {
    setActive((p) => ({ ...p, right: p.right + 1 }));
  }, [mistakes]);

  const bgStrokeProps = {
    fill: "none",
    stroke: currentThemeColor,
    strokeWidth: 1.6,
    strokeOpacity: 0.8,
  };

  return (
    <div className="absolute hidden lg:block inset-x-0 -top-11 h-11 pointer-events-none overflow-visible">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <g {...bgStrokeProps}>
          {/* left */}
          <path d="M 150 0 L 150 50 L 472 50 L 472 100" />
          <path d="M 175 0 L 175 40 L 486 40 L 486 100" />
          {/* centre */}
          <path d="M 495 0 L 495 100" />
          <path d="M 505 0 L 505 100" />
          {/* right */}
          <path d="M 520 100 L 520 50 L 850 50 L 850 0" />
          <path d="M 512 100 L 512 40 L 825 40 L 825 0" />
        </g>

        {/* impulses */}
        {/* left (Music/Color) */}
        {active.left > 0 && (
          <g
            key={`l1-${active.left}`}
            fill="none"
            stroke={currentThemeColor}
            strokeWidth="3"
            className="signal-pulse"
          >
            <path d="M 150 0 L 150 50 L 472 50 L 472 100" />
            <path
              key={`l2-${active.left}`}
              d="M 175 0 L 175 40 L 486 40 L 486 100"
            />
          </g>
        )}

        {/* centre (Level) */}
        {active.center > 0 && (
          <g
            key={`c1-${active.center}`}
            fill="none"
            stroke={currentThemeColor}
            strokeWidth="3"
            className="signal-pulse"
          >
            <path d="M 495 0 L 495 100" />
            <path key={`c2-${active.center}`} d="M 505 0 L 505 100" />
          </g>
        )}

        {/* right (Mistakes) */}
        {active.right > 0 && (
          <g
            key={`r1-${active.right}`}
            fill="none"
            stroke={currentThemeColor}
            strokeWidth="3"
            className="signal-pulse"
          >
            <path d="M 520 100 L 520 50 L 850 50 L 850 0" />
            <path
              key={`r2-${active.right}`}
              d="M 512 100 L 512 40 L 825 40 L 825 0"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default HeaderCircuits;
