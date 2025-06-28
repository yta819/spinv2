
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useWheelState, type WheelSettings } from '@/hooks/use-wheel-state';
import WheelCanvas from '@/components/wheel-canvas';
import Controls from '@/components/controls';
import WinnerDialog from '@/components/winner-dialog';
import SuggestionsDialog from '@/components/suggestions-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Maximize, Minimize, Share2 } from 'lucide-react';
import { suggestListItems } from '@/ai/flows/suggest-list-items';
import { useAudio } from '@/hooks/use-audio';
import { useToast } from '@/hooks/use-toast';

// Define the WheelCanvasMethods interface
interface WheelCanvasMethods {
  spin: () => void;
}

export default function WheelPage() {
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
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { toast } = useToast();

  const { initializeAudio, playTickSound, playWinnerSound } = useAudio();

  const handleSpin = () => {
    if (items.length > 1 && wheelRef.current) {
      initializeAudio();
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

  const handleContinue = () => {
    setIsWinnerDialogOpen(false);
    setWinner(null);
  };

  const handleRemoveWinner = () => {
    if (winner) {
      handleWinnerRemoved(winner);
    }
    handleContinue();
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

  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: 'Spin The Wheel',
      text: 'Check out this wheel I made!',
      url: url,
    };

    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // If share is successful, we're done.
        return;
      } catch (error) {
        // Ignore AbortError which is thrown when the user cancels the share dialog.
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Web Share API failed, falling back to clipboard.', error);
      }
    }
    
    // Fallback to clipboard for browsers without Web Share API or if it fails
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "The link to this wheel has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Could not copy the wheel link.",
      });
    }
  };
  
  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);


  return (
    <div className="flex w-full flex-1 flex-col md:flex-row bg-background text-foreground">
      <main className="w-full md:w-2/3 flex flex-col items-center justify-start p-4 md:p-8">
        <div className="relative flex items-center justify-center w-full max-w-[400px] md:max-w-[600px] aspect-square">
            <div className="absolute top-0 right-0 z-10 flex gap-2 p-2">
              <Button onClick={handleShare} variant="outline" size="icon" aria-label="Share wheel">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button onClick={handleToggleFullScreen} variant="outline" size="icon" aria-label="Toggle fullscreen">
                {isFullScreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </Button>
            </div>
            <WheelCanvas
              ref={wheelRef}
              items={items}
              onSpinEnd={onSpinEnd}
              settings={settings}
              playTickSound={playTickSound}
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
          onContinue={handleContinue}
          onRemove={handleRemoveWinner}
          soundEnabled={settings.soundEnabled}
          playWinnerSound={playWinnerSound}
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
