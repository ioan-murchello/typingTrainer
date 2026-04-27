import { useEffect, useRef, useCallback } from "react";

export const useAudioManager = (isMuted) => {
  // AudioContext is the "brain" of the web audio system
  const audioCtx = useRef(null);
  
  // Storage for decoded binary audio data (ready for instant playback)
  const soundBuffers = useRef({
    click: null,
    zap: null,
    thinking: null,
  });
 
  // Keeps track of playing nodes (useful for stopping loops like 'thinking')
  const activeNodes = useRef({});

  useEffect(() => {
    // Initialize the AudioContext (supporting Safari with webkit prefix)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx.current = new AudioContextClass();

    /**
     * Fetch and decode audio files into buffers
     * Decoding ahead of time ensures zero-latency playback
     */
    const loadSound = async (type, url) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        // Convert raw file data into an AudioBuffer
        const decodedData = await audioCtx.current.decodeAudioData(arrayBuffer);
        soundBuffers.current[type] = decodedData;
      } catch (err) {
        console.error(`Failed to load sound: ${type}`, err);
      }
    };

    // Pre-load all necessary assets
    loadSound("click", "/sounds/key_press.mp3");
    loadSound("zap", "/sounds/electro.mp3");
    loadSound("thinking", "/sounds/computer_thinking.mp3");

    // Cleanup: Close the audio context when the component unmounts
    return () => {
      if (audioCtx.current) {
        audioCtx.current.close();
      }
    };
  }, []);

  const playSound = useCallback(
    (type, action = "play") => {
      if (!audioCtx.current || !soundBuffers.current[type]) return;

      // Crucial for Safari/Chrome: AudioContext starts 'suspended' 
      // and must be resumed after a user interaction (like a click/keypress)
      if (audioCtx.current.state === "suspended") {
        audioCtx.current.resume();
      }

      if (action === "play") {
        if (isMuted) return;

        /**
         * WEB AUDIO FLOW:
         * 1. Source (The Buffer) -> 2. Gain (Volume) -> 3. Destination (Speakers)
         */
        const source = audioCtx.current.createBufferSource();
        const gainNode = audioCtx.current.createGain();

        source.buffer = soundBuffers.current[type];
        gainNode.gain.value = 0.5; // Equivalent to sound.volume = 0.5

        // Connect the chain
        source.connect(gainNode);
        gainNode.connect(audioCtx.current.destination);

        // Special handling for looping background sounds
        if (type === "thinking") {
          source.loop = true;

          // If a 'thinking' sound is already playing, stop it first to avoid overlaps
          if (activeNodes.current[type]) {
            try { activeNodes.current[type].stop(); } catch(e) { console.error(e); }
          }
          activeNodes.current[type] = source;
        }

        // Start playback immediately (0 means now)
        source.start(0);

      } else if (action === "stop") {
        // Stop specific looping sound if it exists
        if (activeNodes.current[type]) {
          try {
            activeNodes.current[type].stop();
          } catch (e) {
            // Node might have already stopped
            console.error(e);
          }
          delete activeNodes.current[type];
        }
      }
    },
    [isMuted],
  );

  /**
   * Watch for Mute changes:
   * If the user mutes mid-session, kill all currently active looping sounds
   */
  useEffect(() => {
    if (isMuted) {
      Object.keys(activeNodes.current).forEach((type) => {
        try {
          activeNodes.current[type].stop();
        } catch(e) {
          console.error(e);
        }
        delete activeNodes.current[type];
      });
    }
  }, [isMuted]);

  return playSound;
};