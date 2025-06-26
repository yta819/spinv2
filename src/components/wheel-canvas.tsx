'use client';

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import type { WheelSettings } from '@/hooks/use-wheel-state';

interface WheelCanvasProps {
  items: string[];
  settings: WheelSettings;
  onSpinEnd: (winner: string) => void;
  playTickSound: () => void;
}

interface WheelCanvasMethods {
  spin: () => void;
}

const colorPalettes: { [key: string]: string[] } = {
  default: ['#41B6E6', '#4183E6', '#5DADE2', '#2E86C1', '#85C1E9', '#3498DB'],
  vintage: ['#D4A276', '#BC986A', '#A18276', '#8D7E6F', '#6C584C', '#5A3F37'],
  neon: ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'],
  pastel: ['#F7B2B7', '#F7D6B2', '#B2D6F7', '#B2F7D6', '#D6B2F7', '#F7F7B2'],
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const WheelCanvas = forwardRef<WheelCanvasMethods, WheelCanvasProps>(({ items, settings, onSpinEnd, playTickSound }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const currentAngle = useRef(0);
  const lastAngle = useRef(0);
  const spinStartTime = useRef<number | null>(null);
  const spinDuration = useRef(0);
  const targetAngle = useRef(0);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get logical dimensions for drawing from the canvas element's bounding box
    const { width, height } = canvas.getBoundingClientRect();

    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;
    const sliceAngle = items.length > 0 ? (2 * Math.PI) / items.length : 2 * Math.PI;
    const colors = colorPalettes[settings.colorPalette] || colorPalettes.default;

    // Clear the canvas using logical dimensions (context is scaled)
    ctx.clearRect(0, 0, width, height);
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentAngle.current);

    items.forEach((item, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'hsl(var(--card))';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Poppins';
      ctx.fillText(item.length > 20 ? item.substring(0, 17) + '...' : item, radius - 10, 5);
      ctx.restore();
    });

    ctx.restore();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 5, centerY);
    ctx.lineTo(centerX + radius + 20, centerY - 10);
    ctx.lineTo(centerX + radius + 20, centerY + 10);
    ctx.closePath();
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.fill();
  }, [items, settings.colorPalette]);

  const animateSpin = useCallback((timestamp: number) => {
    if (!spinStartTime.current) {
      spinStartTime.current = timestamp;
    }

    const elapsed = timestamp - spinStartTime.current;
    const progress = Math.min(elapsed / spinDuration.current, 1);
    const easedProgress = easeOut(progress);

    const oldAngle = lastAngle.current;
    currentAngle.current = easedProgress * targetAngle.current;
    lastAngle.current = currentAngle.current;

    if (settings.soundEnabled) {
      const sliceAngle = items.length > 0 ? (2 * Math.PI) / items.length : 0;
      if (sliceAngle > 0) {
        const oldSliceIndex = Math.floor(oldAngle / sliceAngle);
        const newSliceIndex = Math.floor(currentAngle.current / sliceAngle);
        if (newSliceIndex > oldSliceIndex) {
          playTickSound();
        }
      }
    }

    drawWheel();

    if (progress < 1) {
      animationFrameId.current = requestAnimationFrame(animateSpin);
    } else {
      if (items.length > 0) {
        const fullRotations = Math.floor(currentAngle.current / (2 * Math.PI));
        const finalAngle = currentAngle.current - fullRotations * (2 * Math.PI);
        const winnerIndex = Math.floor(items.length - (finalAngle * items.length) / (2 * Math.PI)) % items.length;
        onSpinEnd(items[winnerIndex]);
      }
    }
  }, [drawWheel, items, onSpinEnd, settings.soundEnabled, playTickSound]);

  useImperativeHandle(ref, () => ({
    spin: () => {
      const minSpins = 5;
      const randomExtra = Math.random();
      targetAngle.current = (minSpins + randomExtra) * 2 * Math.PI;
      spinDuration.current = settings.spinDuration * 1000;
      spinStartTime.current = null;
      lastAngle.current = 0;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = requestAnimationFrame(animateSpin);
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const resizeObserver = new ResizeObserver(() => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement!.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
        drawWheel();
    });

    resizeObserver.observe(canvas.parentElement);
    return () => resizeObserver.disconnect();
  }, [drawWheel]);


  return (
    <div className="w-full max-w-[400px] lg:max-w-[600px] aspect-square">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
});

WheelCanvas.displayName = 'WheelCanvas';
export default WheelCanvas;
