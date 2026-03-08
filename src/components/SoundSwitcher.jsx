import React, { memo } from "react";
import { useStore } from "../store/useStore.js";

const SoundSwitcher = memo(() => {
  const toggleMute = useStore((state) => state.toggleMute);
  const isMuted = useStore((state) => state.isMuted);

  return (
    <div className="flex  items-center gap-2 p-2 bg-zinc-900 border border-zinc-800 rounded-md shadow-inner">
      {/* indicator lamp top */}
      <div
        className={`
        w-2 h-2 rounded-full transition-all duration-300
        ${
          !isMuted
            ? "bg-orange-500 shadow-[0_0_8px_#f97316] ring-1 ring-orange-400/50"
            : "bg-zinc-800 shadow-inner"
        }
      `}
      />

      <button
        onClick={() => toggleMute()}
        className={`
          relative w-10 h-12 flex items-center justify-center
          rounded-sm border-b-4 border-zinc-950 transition-all active:translate-y-1 active:border-b-0
          ${
            isMuted
              ? "bg-zinc-800 text-zinc-600 shadow-md"
              : "bg-zinc-700 text-orange-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
          }
        `}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_0%,transparent_50%,rgba(0,0,0,0.1)_100%)] pointer-events-none" />

        {isMuted ? (
          <svg
            className="w-5 h-5 z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 z-10 drop-shadow-[0_0_3px_rgba(251,146,60,0.5)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>
    </div>
  );
});

export default SoundSwitcher;
