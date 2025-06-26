'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useWheelState, type WheelSettings } from '@/hooks/use-wheel-state';
import WheelCanvas from '@/components/wheel-canvas';
import Controls from '@/components/controls';
import WinnerDialog from '@/components/winner-dialog';
import SuggestionsDialog from '@/components/suggestions-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { suggestListItems } from '@/ai/flows/suggest-list-items';

// Define the WheelCanvasMethods interface
interface WheelCanvasMethods {
  spin: () => void;
}

export default function Home() {
  const {
    text,
    items,
    settings,
    setTextWithHistory,
    updateSettings,
    handleShuffle,
    handleClear,
    handleUndo,
    handleWinnerRemoved,
  } = useWheelState();

  const wheelRef = useRef<WheelCanvasMethods>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [isSuggestionsDialogOpen, setIsSuggestionsDialogOpen] = useState(false);

  const handleSpin = () => {
    if (items.length > 1 && wheelRef.current) {
      setIsSpinning(true);
      setWinner(null);
      wheelRef.current.spin();
    }
  };

  const onSpinEnd = useCallback((newWinner: string) => {
    setWinner(newWinner);
    setIsSpinning(false);
    setIsWinnerDialogOpen(true);
  }, []);

  const closeWinnerDialog = () => {
    setIsWinnerDialogOpen(false);
    if (settings.removeWinner && winner) {
      handleWinnerRemoved(winner);
    }
    setWinner(null);
  };
  
  const handleGetSuggestions = async () => {
    setIsSuggestionsLoading(true);
    try {
      const result = await suggestListItems({
        existingItems: items,
        numberOfSuggestions: 5,
      });
      setSuggestions(result.suggestions);
      setIsSuggestionsDialogOpen(true);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };
  
  const handleAddSuggestion = (suggestion: string) => {
    const newText = `${text}\n${suggestion}`.trim();
    setTextWithHistory(newText);
  };

  const handleAddAllSuggestions = () => {
    const newText = `${text}\n${suggestions.join('\n')}`.trim();
    setTextWithHistory(newText);
    setIsSuggestionsDialogOpen(false);
  };

  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="relative flex items-center justify-center">
            <WheelCanvas
              ref={wheelRef}
              items={items}
              onSpinEnd={onSpinEnd}
              settings={settings}
            />
            <Button
              onClick={handleSpin}
              disabled={isSpinning || items.length < 2}
              className="absolute text-2xl font-bold rounded-full px-12 py-8 shadow-lg transition-transform transform hover:scale-105"
              size="lg"
            >
              {isSpinning ? <Loader2 className="mr-2 h-8 w-8 animate-spin" /> : null}
              {isSpinning ? 'Spinning...' : 'SPIN!'}
            </Button>
        </div>
      </main>
      
      <aside className="w-full lg:w-[380px] lg:h-full bg-card text-card-foreground lg:border-l border-t lg:border-t-0 p-4 lg:p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <Controls
            text={text}
            settings={settings}
            onTextChange={setTextWithHistory}
            onSettingsChange={updateSettings}
            onShuffle={handleShuffle}
            onClear={handleClear}
            onUndo={handleUndo}
            onGetSuggestions={handleGetSuggestions}
            isSuggestionsLoading={isSuggestionsLoading}
            isUndoable={true} 
          />
        </div>
      </aside>

      {winner && (
        <WinnerDialog
          winner={winner}
          isOpen={isWinnerDialogOpen}
          onClose={closeWinnerDialog}
        />
      )}

      <SuggestionsDialog
        isOpen={isSuggestionsDialogOpen}
        onClose={() => setIsSuggestionsDialogOpen(false)}
        suggestions={suggestions}
        onAddSuggestion={handleAddSuggestion}
        onAddAll={handleAddAllSuggestions}
      />
    </div>
  );
}
