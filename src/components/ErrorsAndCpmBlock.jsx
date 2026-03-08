import React, { memo } from "react";
import Errors from "./Errors";
import Cpm from "./Cpm";

const ErrorsAndCpmBlock = memo(() => {
  return (
    <div className="flex items-center gap-2 p-1 bg-zinc-950 rounded-lg border-2 border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
      <Errors />

      {/* (JUNCTION) */}
      <div className="flex flex-col gap-1">
        <div className="w-1 h-1 rounded-full bg-zinc-700" />
        <div className="w-1 h-1 rounded-full bg-zinc-700" />
        <div className="w-1 h-1 rounded-full bg-zinc-700" />
      </div>

      <Cpm />
    </div>
  );
});

export default ErrorsAndCpmBlock;
