'use client';

import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface WinnerDialogProps {
  winner: string;
  isOpen: boolean;
  onContinue: () => void;
  onRemove: () => void;
  soundEnabled: boolean;
  playWinnerSound: () => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ winner, isOpen, onContinue, onRemove, soundEnabled, playWinnerSound }) => {
  useEffect(() => {
    // Basic confetti effect
    if (isOpen) {
      if (soundEnabled) {
        playWinnerSound();
      }
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
            <AlertDialogDescription className="text-center text-4xl font-bold font-headline text-primary py-4">
              {winner}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            <Button onClick={onRemove}>Remove Winner</Button>
            <Button variant="outline" onClick={onContinue}>
              Awesome!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WinnerDialog;
