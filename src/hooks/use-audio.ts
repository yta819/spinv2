'use client';

import { useRef, useCallback } from 'react';

// This hook uses the Web Audio API to generate sounds programmatically,
// avoiding the need to load audio files.
export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);

  // AudioContext must be initialized after a user gesture.
  const initializeAudio = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser");
      }
    }
  }, []);

  const playTickSound = useCallback(() => {
    if (!audioContextRef.current) return;
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(880, audioContextRef.current.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContextRef.current.currentTime + 0.1);
  
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.1);
    } catch (e) {
      console.error("Error playing tick sound", e);
    }
  }, []);

  const playWinnerSound = useCallback(() => {
    if (!audioContextRef.current) return;
    try {
      const now = audioContextRef.current.currentTime;
      const gainNode = audioContextRef.current.createGain();
      gainNode.connect(audioContextRef.current.destination);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  
      // A simple winning arpeggio
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, i) => {
          const oscillator = audioContextRef.current!.createOscillator();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(freq, now + i * 0.1);
          oscillator.connect(gainNode);
          oscillator.start(now + i * 0.1);
          oscillator.stop(now + i * 0.1 + 0.15);
      });
    } catch (e) {
      console.error("Error playing winner sound", e);
    }
  }, []);

  return { initializeAudio, playTickSound, playWinnerSound };
}
