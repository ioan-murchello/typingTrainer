import React, { memo } from "react";
import Key from "./Key";

const fingerZones = {
  pinky_L: {
    keys: ["1", "q", "a", "z", "`"],
    color: "rgba(243, 13, 13, 0.8)",
  }, // Red
  ring_L: { keys: ["2", "w", "s", "x"], color: "rgba(255, 0, 255, 0.8)" }, // Orange
  middle_L: { keys: ["3", "e", "d", "c"], color: "rgba(234, 196, 8, 0.800)" }, // Yellow
  index_L: {
    keys: ["4", "5", "r", "t", "f", "g", "v", "b"],
    color: "rgba(41, 228, 110, 0.800)",
  }, // Green
  index_R: {
    keys: ["6", "7", "y", "u", "h", "j", "n", "m"],
    color: "rgba(59, 131, 246, 0.800)",
  }, // Blue
  middle_R: { keys: ["8", "i", "k", ","], color: "rgba(85, 247, 247, 0.8)" }, // Purple
  ring_R: { keys: ["9", "o", "l", "."], color: "rgba(236, 72, 153, 0.800)" }, // Pink
  pinky_R: {
    keys: ["0", "-", "=", "p", "[", "]", ";", "'"],
    color: "rgba(186, 236, 95, 0.8)",
  }, // Grey
};

const getKeyColor = (key) => {
  for (const zone in fingerZones) {
    if (fingerZones[zone].keys.includes(key.toLowerCase())) {
      return fingerZones[zone].color;
    }
  }
  return "rgba(84, 82, 82, 0.1)";
};

const KeyboardRow = memo(({ keys, activeKey }) => {
  return (
    <div className="flex justify-center gap-2 my-1">
      {keys.map((k) => (
        <Key
          key={k}
          k={k}
          isActive={activeKey === k}
          zoneColor={getKeyColor(k)}
        />
      ))}
    </div>
  );
});

export default KeyboardRow;
