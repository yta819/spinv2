'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnimatedNumber = ({ value, fractionDigits = 0 }: { value: number; fractionDigits?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (value === 0) {
            setDisplayValue(0);
            return;
        }

        let startTimestamp: number | null = null;
        const duration = 1500; // slightly faster animation
        
        const animationFrame = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            
            const nextValue = easedProgress * value;
            setDisplayValue(nextValue);

            if (progress < 1) {
                requestAnimationFrame(animationFrame);
            } else {
                setDisplayValue(value);
            }
        };

        const handle = requestAnimationFrame(animationFrame);
        return () => cancelAnimationFrame(handle);
    }, [value, fractionDigits]);

    return <>{displayValue.toLocaleString('en-US', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })}</>;
};

interface ActivityStatsProps {
    wheelSpins: number;
    spinningSeconds: number;
}

const ActivityStats = ({ wheelSpins, spinningSeconds }: ActivityStatsProps) => {
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const spinningHours = spinningSeconds / 3600;

    return (
        <Card className="w-full mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2 A 10 10 0 0 1 22 12" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M22 12 A 10 10 0 0 1 12 22" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M12 22 A 10 10 0 0 1 2 12" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M2 12 A 10 10 0 0 1 12 2" stroke="#FBBC05" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="3" fill="hsl(var(--primary))"/>
                    </svg>
                    <span>Your Activity in {currentYear || new Date().getFullYear()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground text-center">Wheel spins</p>
                    <p className="text-4xl lg:text-5xl font-bold text-chart-2 tracking-tight text-center">
                        <AnimatedNumber value={wheelSpins} />
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground text-center">Hours of spinning</p>
                    <p className="text-4xl lg:text-5xl font-bold text-chart-2 tracking-tight text-center">
                        <AnimatedNumber value={spinningHours} fractionDigits={2} />
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ActivityStats;
