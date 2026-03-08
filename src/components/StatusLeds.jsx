import React from "react";
const StatusLeds = () => (
  <div className="absolute top-4 right-4 flex gap-2">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full bg-emerald-500 led-node"
        style={{ "--duration": `${0.5 + i * 0.3}s` }}
      />
    ))}
  </div>
);

export default StatusLeds;
