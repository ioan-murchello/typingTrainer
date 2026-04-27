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
    <div className="h-dvh flex items-center justify-center flex-col bg-[#151e36] backdrop-blur-sm text-slate-100 font-mono overflow-hidden">
        <BackgroundDecor />
      <div className="flex-1 items-center justify-center mx-auto max-w-7xl w-full relative p-8 ">

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
