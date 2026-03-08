import React, { memo } from "react";
import { useStore, themeMap } from "../store/useStore";

const CircuitBoard = memo(() => {
  const signals = useStore((state) => state.signals);
  const themeColor = useStore((state) => state.themeColor);

  const lineCount = 14;
  const width = 800;
  const spacing = width / (lineCount + 1);
  const currentThemeColor = themeMap[themeColor]?.shadow || "#34ca13";

  const paths = Array.from({ length: lineCount }).map((_, i) => {
    const xStart = spacing * (i + 1);

    const centerStart = 345;
    const xEnd = centerStart + i * 10;

    //  symmetric cascade
    // calculate distance to middle
    const distanceFromEdge = i < lineCount / 2 ? i : lineCount - 1 - i;

    // each two line left and right have self height turn
    // 5px — distance between horizontal line
    const yBreak = 30 + distanceFromEdge * 6;

    const yBottom = 100;
    const yTop = 0;

    return {
      id: i,
      d: `M ${xStart} ${yBottom} L ${xStart} ${yBreak} L ${xEnd} ${yBreak} L ${xEnd} ${yTop}`,
    };
  });

  return (
    <div className="max-w-2xl mx-auto h-18 relative overflow-visible pointer-events-none  px-10">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 100"
        preserveAspectRatio="none"
      >
        {/* lines */}
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            fill="none"
            stroke={currentThemeColor}
            strokeWidth="1.5"
            className="opacity-80"
          />
        ))}

        {/* active signals */}
        {signals.map((s) => {
          const pathIndex = Math.floor((s.startX / 100) * lineCount);
          const safeIndex = Math.max(0, Math.min(pathIndex, lineCount - 1));

          return (
            <path
              key={s.id}
              d={paths[safeIndex].d}
              fill="none"
              stroke={currentThemeColor}
              strokeWidth="7"
              strokeLinecap="round"
              className="signal-pulse"
            />
          );
        })}
      </svg>
    </div>
  );
});
export default CircuitBoard;
