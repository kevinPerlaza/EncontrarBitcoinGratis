"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackgroundAnimation = () => (
  <div
    className="absolute inset-0 z-0 opacity-20"
    style={{
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 0V2" stroke="%2390EE90" stroke-width="0.1"/></svg>')`,
      backgroundSize: '30px 30px',
      animation: 'rain 0.5s linear infinite',
    }}
  />
);

export default function HeroSection() {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 15000) + 1000);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStartClick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    document.getElementById('reality')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex h-screen w-full flex-col items-center justify-center bg-slate-950 text-center text-primary">
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col items-center p-4">
        <h1 className="font-headline text-5xl font-bold uppercase text-primary md:text-7xl" style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' }}>
          Find Free Bitcoin?
        </h1>
        <p className="mt-4 font-code text-lg text-primary/80">
          Initiating digital treasure hunt protocol...
        </p>

        <div className="mt-8 rounded-lg border border-primary/50 bg-slate-900/50 p-6 backdrop-blur-sm">
          <p className="text-sm uppercase text-primary/70">Combinations Tested</p>
          <span className="font-code text-4xl font-bold text-white md:text-5xl" style={{ textShadow: '0 0 5px #fff' }}>
            {counter.toLocaleString()}
          </span>
        </div>

        <Button onClick={handleStartClick} className="mt-8" size="lg">
          <ArrowDown className="mr-2" /> Start the Treasure Hunt
        </Button>
      </div>
    </section>
  );
}
