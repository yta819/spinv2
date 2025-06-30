'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface WinnerDialogProps {
  winner: string;
  isOpen: boolean;
  onContinue: () => void;
  onRemove: () => void;
  onGenerateStory: () => Promise<string>;
  soundEnabled: boolean;
  playWinnerSound: () => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ winner, isOpen, onContinue, onRemove, onGenerateStory, soundEnabled, playWinnerSound }) => {
  const [story, setStory] = useState<string>('');
  const [isStoryLoading, setIsStoryLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (soundEnabled) {
        playWinnerSound();
      }
      // Reset story state when dialog opens
      setStory('');
      setIsStoryLoading(false);

      const confettiCount = 100;
      const confettiContainer = document.body;
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -50}vh`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
      }
    }
  }, [isOpen, soundEnabled, playWinnerSound]);

  const handleGenerateStory = async () => {
    setIsStoryLoading(true);
    const newStory = await onGenerateStory();
    setStory(newStory);
    setIsStoryLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx global>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          opacity: 0.8;
          z-index: 1000;
          animation: fall linear forwards;
          border-radius: 5px;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      <AlertDialog open={isOpen} onOpenChange={onContinue}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-bold">
              We have a winner!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-4xl font-bold font-headline text-primary py-4 break-words">
              {winner}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {story && (
            <div className="my-4 p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-muted-foreground italic">{story}</p>
            </div>
          )}

          {!story && (
            <div className="flex justify-center my-2">
               <Button onClick={handleGenerateStory} disabled={isStoryLoading} variant="secondary">
                 {isStoryLoading ? (
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 ) : (
                   <Sparkles className="mr-2 h-4 w-4" />
                 )}
                 {isStoryLoading ? 'Writing...' : 'Generate Story'}
               </Button>
            </div>
          )}

          <AlertDialogFooter className="sm:justify-center gap-2 pt-4">
            <Button onClick={onRemove}>Remove Winner & Close</Button>
            <Button variant="outline" onClick={onContinue}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WinnerDialog;
