import React, { useEffect, memo } from "react";
import { useStore } from "../store/useStore";
import { useAudioManager } from "../hooks/useAudio";
import KeyboardRow from "./KeyboardRow";

const Keyboard = memo(() => {
  const themeColor = useStore((state) => state.themeColor);
  const activeKey = useStore((state) => state.activeKey);
  const index = useStore((state) => state.index);
  const targetStr = useStore((state) => state.targetStr);
  const handleKeyPress = useStore((state) => state.handleKeyPress);
  const resetActiveKey = useStore((state) => state.resetActiveKey);
  const addSignal = useStore((state) => state.addSignal);
  const isMuted = useStore((state) => state.isMuted);

  const playSound = useAudioManager();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // ignore system keys without space btn
      if (e.key.length > 1 && e.key !== " ") return;

      const expected = targetStr[index];
      const actual = e.key;
 
      if (!isMuted) {
        if (actual === expected) {
          playSound("click", "play");
        } else {
          playSound("zap", "play");
        }
      }
 
      addSignal(e.key);
      handleKeyPress(e.key);
    };

    const handleKeyUp = () => {
      resetActiveKey();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    index,
    targetStr,
    playSound,
    addSignal,
    handleKeyPress,
    resetActiveKey,
    isMuted,
  ]);

  return (
    <div className="shadow-inner">
      <div className="hidden md:flex gap-2 flex-col max-w-fit mx-auto">
        <KeyboardRow
          keys={[
            "`",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "-",
            "=",
          ]}
          activeKey={activeKey}
          color={themeColor}
        />
        <KeyboardRow
          keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"]}
          activeKey={activeKey}
          color={themeColor}
        />
        <KeyboardRow
          keys={["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"]}
          activeKey={activeKey}
          color={themeColor}
        />
        <KeyboardRow
          keys={["z", "x", "c", "v", "b", "n", "m", ",", "."]}
          activeKey={activeKey}
          color={themeColor}
        />

        {/* space btn */}
        <div className="flex justify-center mt-1">
          <div className="relative group p-px">
            <div
              className={`absolute -inset-0.5 transition-all duration-500 rounded-sm
              ${
                activeKey === "space" || activeKey === " "
                  ? "bg-blue-500/20"
                  : "bg-blue-600/40"
              }
            `}
            />

            <div
              style={{
                boxShadow:
                  activeKey === "space" || activeKey === " "
                    ? `0 0 25px rgba(255,255,255,0.2), inset 0 0 12px rgba(255,255,255,0.1)`
                    : `inset 0 0 5px rgba(255,255,255,0.02)`,
              }}
              className={`
        relative h-10 w-80 flex items-center justify-center 
        transition-all duration-150 border border-white/10  overflow-hidden

        [clip-path:polygon(5%_0%,_100%_0%,_100%_70%,_95%_100%,_0%_100%,_0%_30%)]
        ${
          activeKey === "space" || activeKey === " "
            ? `bg-white/20 translate-y-0.5`
            : `bg-slate-900/40`
        }
      `}
            >
              {(activeKey === "space" || activeKey === " ") && (
                <div
                  className="absolute left-0 w-full h-px bg-white/40 shadow-[0_0_10px_white] z-20"
                  style={{ animation: "scan 1.5s linear infinite" }}
                />
              )}

              <div
                className={` w-24 h-0.5 rounded-full transition-all duration-300
                  ${
                    activeKey === "space" || activeKey === " "
                      ? "bg-white shadow-[0_0_8px_white] w-32"
                      : "bg-white/20"
                  }
                `}
              />

              {/* point chain */}
              <div
                className="absolute inset-0 opacity-[0.1] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #fff 0.5px, transparent 0.5px)`,
                  backgroundSize: "6px 6px",
                }}
              />

              {/*  (HUD Brackets) */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Keyboard;
