import { useEffect, useRef, useCallback } from "react";

export const useAudioManager = (isMuted) => {
  const sounds = useRef({
    click: null,
    zap: null,
    thinking: null,
  });

  useEffect(() => {
    sounds.current.click = new Audio("/public/sounds/key_press.mp3");
    sounds.current.zap = new Audio("/public/sounds/electro.mp3");
    sounds.current.thinking = new Audio("/public/sounds/computer_thinking.mp3");

    sounds.current.click.volume = 0.6;
    sounds.current.zap.volume = 0.6;
    sounds.current.thinking.volume = 0.6;
    sounds.current.thinking.loop = true;

    return () => {
      Object.values(sounds.current).forEach((s) => {
        if (s) {
          s.pause();
          s.src = "";
        }
      });
    };
  }, []);

  const playSound = useCallback(
    (type, action = "play") => {
      const sound = sounds.current[type];
      if (!sound) return;

      if (action === "play") {
        if (isMuted) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
      } else if (action === "stop") {
        sound.pause();
        sound.currentTime = 0;
      }
    },
    [isMuted],
  );

  useEffect(() => {
    if (isMuted) {
      Object.values(sounds.current).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
      });
    }
  }, [isMuted]);

  return playSound;
};
