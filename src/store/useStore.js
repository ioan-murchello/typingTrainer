import { create } from "zustand";
import { useAudioManager } from "../hooks/useAudio";

export const LEVELS = {
  easy: "qwertyuiop[]asdfghjkl;'zxcvbnm,./ ".split(""),
  medium: "qwertyuiop[]asdfghjkl;'zxcvbnm,./ `1234567890-=".split(""),
  hard: "qwertyuiop[]asdfghjkl;'zxcvbnm,./ `1234567890-=QWERTYUIOPASDFGHJKLZXCVBNM".split(
    "",
  ),
};

export const STR_LENGTH = 60;

export const themeMap = {
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-400",
    shadow: "rgba(59, 130, 246, 0.5)",
    glow: "shadow-[0_0_10px_rgba(59,130,246,0.3)]", // Постійне слабке сяйво
  },
  green: {
    bg: "bg-green-600",
    text: "text-green-400",
    shadow: "rgba(88, 255, 27, 0.5)",
    glow: "shadow-[0_0_10px_rgba(83, 224, 32, 0.5))]",
  },
  purple: {
    bg: "bg-purple-600",
    text: "text-purple-400",
    shadow: "rgba(147, 51, 234, 0.5)",
    glow: "shadow-[0_0_10px_rgba(147,51,234,0.3)]",
  },
  amber: {
    bg: "bg-amber-600",
    text: "text-amber-400",
    shadow: "rgba(245, 158, 11, 0.5)",
    glow: "shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  },
};

export const useStore = create((set, get) => ({
 
  level: "easy",
  showLevelMenu: false,

  targetStr: "",
  userInput: "",
  index: 0,
  mistakes: 0,
  activeKey: null,
  startTime: null,
  cpm: 0,
  isFinished: false,
  isMuted: true,
  themeColor: "blue",
  isAnimating: false,
  signals: [],
  colorChangeTrigger: 0,
 
  setIndex: () => set((prev) => prev + 1),
 
  setThemeColor: (color) =>
    set((state) => ({
      themeColor: color,
      colorChangeTrigger: state.colorChangeTrigger + 1,
    })),
 
  toggleLevelMenu: () =>
    set((state) => ({ showLevelMenu: !state.showLevelMenu })),

  setLevel: (level) => set({ level, showLevelMenu: false }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

 
  generateString: () => {
    const { level } = get();
    const chars = LEVELS[level];
    set({ isAnimating: true });

    let newStr = "";
    
    while (newStr.length < STR_LENGTH) {  
      const char = chars[Math.floor(Math.random() * chars.length) ];
      let repeatCount = 1
      if(level === "easy"){
        repeatCount = 3
      }else if(level === "medium"){
        repeatCount = 2
      }

      for(let i = 0; i < repeatCount && (newStr.length < STR_LENGTH); i++){
        newStr += char
      }
    }
 
    let iterations = 0;
    const interval = setInterval(() => {
      let matrixStr = Array.from({ length: STR_LENGTH })
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("");

      set({ targetStr: matrixStr });
      iterations++;

      if (iterations > 10) {
        clearInterval(interval);
        set({
          targetStr: newStr,
          isAnimating: false,
          userInput: "",
          index: 0,
          mistakes: 0,
          startTime: null,
          isFinished: false,
        });
      }
    }, 200);
  },
 
  handleKeyPress: (key) => {
    const { targetStr, index, startTime, isFinished } = get();
    if (isFinished) return;
 
    if (!startTime) set({ startTime: Date.now() });

    set({ activeKey: key === " " ? "space" : key });

    const expected = targetStr[index];
    const isCorrect = key === expected;

    if (isCorrect) {
      const newIndex = index + 1;
      const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const newCpm = timeElapsed > 0 ? Math.floor(newIndex / timeElapsed) : 0;

      set((state) => ({
        index: newIndex,
        userInput: state.userInput + key,
        cpm: newCpm,
      }));
 
      if (newIndex === STR_LENGTH) {
        set({ isFinished: true });
        setTimeout(() => get().generateString(), 2500);
      }
    } else {
      set((state) => ({ mistakes: state.mistakes + 1 }));
    }
  },

  resetActiveKey: () => set({ activeKey: null }),

  addSignal: (key) => {
    const id = Math.random();
    const keyboardLayout = "qwertyuiopasdfghjklzxcvbnm";
    const keyIndex = keyboardLayout.indexOf(key.toLowerCase());
    const startX =
      keyIndex !== -1 ? (keyIndex / keyboardLayout.length) * 90 + 5 : 50;

    set((state) => ({ signals: [...state.signals, { id, startX }] }));
    setTimeout(() => {
      set((state) => ({ signals: state.signals.filter((s) => s.id !== id) }));
    }, 600);
  },
}));
