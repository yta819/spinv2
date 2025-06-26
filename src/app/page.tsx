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
    <div className="flex w-full flex-1 flex-col md:flex-row bg-background text-foreground">
      <main className="w-full md:w-2/3 flex flex-col items-center justify-start p-4 md:p-8">
        <div className="relative flex items-center justify-center w-full max-w-[400px] md:max-w-[600px] aspect-square">
            <WheelCanvas
              ref={wheelRef}
              items={items}
              onSpinEnd={onSpinEnd}
              settings={settings}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={handleSpin}
                  disabled={isSpinning || items.length < 2}
                  className="text-2xl font-bold rounded-full h-32 w-32 shadow-lg transition-transform transform hover:scale-105"
                  size="lg"
                >
                  {isSpinning ? <Loader2 className="h-8 w-8 animate-spin" /> : null}
                  {isSpinning ? '' : 'SPIN!'}
                </Button>
            </div>
        </div>
      </main>
      
      <aside className="w-full md:w-1/3 bg-card text-card-foreground md:border-l border-t md:border-t-0 p-4 md:p-6 flex flex-col">
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
