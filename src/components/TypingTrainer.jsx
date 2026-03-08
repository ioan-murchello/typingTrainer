import React, { memo } from "react";
import CircuitBoard from "./CircuitBoard";
import Display from "./Display";
import Keyboard from "./Keyboard";
import ProcessingBlock from "./ProcessingBlock";
import ProcessorGrid from "./ProcessorGrid";
import BackgroundDecor from "./BackgroundDecor";
import Header from "./Header";

const TypingTrainer = memo(() => {
  return (
    <div className="h-dvh  flex justify-center flex-col bg-[#0a0c10] text-slate-100 font-mono overflow-hidden">
      <div className="flex-1 mx-auto max-w-7xl w-full relative p-8 bg-slate-900/80 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <BackgroundDecor />

        {/* Header Stats */}
        <Header />

        <Display />
        <ProcessingBlock />

        <CircuitBoard />

        {/* Visual Keyboard */}
        <Keyboard />
        <ProcessorGrid />
      </div>
    </div>
  );
});

export default TypingTrainer;
