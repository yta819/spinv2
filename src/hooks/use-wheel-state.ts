'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export interface WheelSettings {
  spinDuration: number;
  removeWinner: boolean;
  soundEnabled: boolean;
  colorPalette: string;
}

const defaultSettings: WheelSettings = {
  spinDuration: 5,
  removeWinner: false,
  soundEnabled: true,
  colorPalette: 'default',
};

const defaultText = "Prize 1\nPrize 2\nPrize 3\nPrize 4\nPrize 5\nPrize 6";

export function useWheelState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);
  const [text, setText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [settings, setSettings] = useState<WheelSettings>(defaultSettings);
  
  const items = useMemo(() => text.split('\n').map(item => item.trim()).filter(Boolean), [text]);

  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const urlItems = params.get('items');
    const urlSettings = params.get('settings');
    
    let initialText = defaultText;
    let initialSettings = defaultSettings;

    try {
      if (urlItems) {
        initialText = atob(urlItems);
      } else {
        const localText = localStorage.getItem('wheel-text');
        if (localText !== null) {
          initialText = localText;
        }
      }
      
      if (urlSettings) {
        initialSettings = { ...defaultSettings, ...JSON.parse(atob(urlSettings)) };
      } else {
        const localSettings = localStorage.getItem('wheel-settings');
        if (localSettings) {
          initialSettings = { ...defaultSettings, ...JSON.parse(localSettings) };
        }
      }
    } catch (e) {
      console.error("Failed to parse state from URL or localStorage", e);
    }
    
    setText(initialText);
    setSettings(initialSettings);
    setHistory([initialText]);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams();
    try {
      if (text) {
        params.set('items', btoa(text));
      }
      params.set('settings', btoa(JSON.stringify(settings)));
      
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });

      localStorage.setItem('wheel-text', text);
      localStorage.setItem('wheel-settings', JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to update state", e);
    }

  }, [text, settings, isMounted, router, pathname]);

  const setTextWithHistory = useCallback((newText: string) => {
    setHistory(prev => [...prev, text]);
    setText(newText);
  }, [text]);

  const updateSettings = useCallback((newSettings: Partial<WheelSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handleShuffle = useCallback(() => {
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setTextWithHistory(shuffledItems.join('\n'));
  }, [items, setTextWithHistory]);

  const handleClear = useCallback(() => {
    setTextWithHistory('');
  }, [setTextWithHistory]);

  const handleUndo = useCallback(() => {
    if (history.length > 1) {
      const lastState = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setText(lastState);
    }
  }, [history]);
  
  const handleWinnerRemoved = useCallback((winner: string) => {
    const newItems = items.filter(item => item !== winner);
    setTextWithHistory(newItems.join('\n'));
  }, [items, setTextWithHistory]);

  return {
    text,
    items,
    settings,
    setTextWithHistory,
    updateSettings,
    handleShuffle,
    handleClear,
    handleUndo,
    handleWinnerRemoved,
    isMounted,
  };
}
