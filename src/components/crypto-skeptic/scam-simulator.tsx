"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

type ResultKey = 'error' | 'catastrophe' | 'correct' | 'default';

const scamResults = {
    default: {
        text: "Click an option to see the result.",
        class: "scam-result-default"
    },
    error: {
        text: "ERROR! You just lost your money. The scammer takes your payment and disappears. This is the most common scam.",
        class: "scam-result-error"
    },
    catastrophe: {
        text: "CATASTROPHE! You just gave away total access to your wallet. The scammer will empty it in seconds. NEVER share your seed phrase.",
        class: "scam-result-catastrophe"
    },
    correct: {
        text: "CORRECT DECISION! You recognized it was a trap. Your best defense is skepticism and knowledge.",
        class: "scam-result-correct"
    }
};

export default function ScamSimulator() {
    const [resultKey, setResultKey] = useState<ResultKey>('default');

    const currentResult = scamResults[resultKey];

    return (
        <section id="scam" className="w-full bg-slate-900 py-20 md:py-32">
            <div className="container mx-auto max-w-3xl px-4 text-center">
                <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">How Do They Steal If It Doesn't Work?</h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                    These programs are a facade. Their real goal is to steal from YOU using simple psychological tricks.
                </p>

                <div className="mt-12 rounded-xl border border-slate-700 bg-slate-950 p-6 text-left shadow-2xl md:p-10">
                    <h3 className="text-center font-headline text-2xl font-semibold text-primary">Scam Simulation: The Software "Finds" 2 BTC</h3>
                    <p className="mt-4 text-center text-slate-400">Your heart races. To claim your fortune, the software asks you to take an action. What do you do?</p>
                    
                    <div className="mt-8 flex flex-col gap-4">
                        <Button variant="outline" className="h-auto justify-start p-4 text-left" onClick={() => setResultKey('error')}>
                            <ShieldAlert className="mr-4 h-6 w-6 flex-shrink-0 text-red-400" />
                            <span className="flex-grow whitespace-normal">A. Pay the 0.05 ETH "gas fee" they ask for.</span>
                        </Button>
                        <Button variant="outline" className="h-auto justify-start p-4 text-left" onClick={() => setResultKey('catastrophe')}>
                            <ShieldX className="mr-4 h-6 w-6 flex-shrink-0 text-red-600" />
                            <span className="flex-grow whitespace-normal">B. Enter my own seed phrase to claim them.</span>
                        </Button>
                        <Button variant="outline" className="h-auto justify-start p-4 text-left" onClick={() => setResultKey('correct')}>
                           <ShieldCheck className="mr-4 h-6 w-6 flex-shrink-0 text-green-400" />
                           <span className="flex-grow whitespace-normal">C. Close the program and delete it immediately.</span>
                        </Button>
                    </div>

                    <div className={cn("mt-8 rounded-lg p-6 text-center text-lg transition-all duration-300", currentResult.class)}>
                        <p>{currentResult.text}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
