"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateFunFact } from '@/ai/flows/generate-fun-fact';
import { useToast } from '@/hooks/use-toast';
import { Play, Square, Cpu, Activity, Coins, Lightbulb } from 'lucide-react';

const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const generateRandomAddress = () => {
    let address = '1';
    for (let i = 0; i < 33; i++) {
        address += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return address;
};

interface LogEntry {
    id: number;
    address: string;
}

export default function ImprobabilitySimulator() {
    const [isSimulating, setIsSimulating] = useState(false);
    const [walletsChecked, setWalletsChecked] = useState(0);
    const [checkRate, setCheckRate] = useState(0);
    const [funFact, setFunFact] = useState("Press 'Start Simulation' to begin...");
    const [log, setLog] = useState<LogEntry[]>([]);

    const { toast } = useToast();

    const simIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const factIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const logCounterRef = useRef<number>(0);

    const stopSimulator = useCallback(() => {
        setIsSimulating(false);
        if (simIntervalRef.current) clearInterval(simIntervalRef.current);
        if (factIntervalRef.current) clearInterval(factIntervalRef.current);
        simIntervalRef.current = null;
        factIntervalRef.current = null;
    }, []);

    const fetchFunFact = useCallback(async () => {
        if (!startTimeRef.current) return;
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
        try {
            const result = await generateFunFact({
                walletsChecked,
                elapsedTime,
            });
            setFunFact(result.funFact);
        } catch (error) {
            console.error("Failed to generate fun fact:", error);
            toast({
                title: "AI Error",
                description: "Could not generate a fun fact at this time.",
                variant: "destructive"
            })
        }
    }, [walletsChecked, toast]);

    const runSimulator = useCallback(() => {
        startTimeRef.current = Date.now();
        setIsSimulating(true);

        simIntervalRef.current = setInterval(() => {
            const checksThisTick = Math.floor(Math.random() * 500) + 200;
            
            setWalletsChecked(prev => prev + checksThisTick);

            const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
            setCheckRate(elapsedTime > 0 ? Math.round((walletsChecked + checksThisTick) / elapsedTime) : 0);

            const newLogEntries: LogEntry[] = [];
            for (let i = 0; i < 5; i++) {
                newLogEntries.push({ id: logCounterRef.current++, address: generateRandomAddress() });
            }
            setLog(prevLog => [...prevLog.slice(-100), ...newLogEntries]);
        }, 100);

        // Fetch a fun fact immediately and then every 15 seconds
        fetchFunFact();
        factIntervalRef.current = setInterval(fetchFunFact, 15000);
    }, [walletsChecked, fetchFunFact]);

    useEffect(() => {
        return () => stopSimulator(); // Cleanup on unmount
    }, [stopSimulator]);

    const handleToggleSimulation = () => {
        if (isSimulating) {
            stopSimulator();
        } else {
            setWalletsChecked(0);
            setCheckRate(0);
            setLog([]);
            logCounterRef.current = 0;
            runSimulator();
        }
    };

    return (
        <section id="impossibility" className="w-full bg-background py-20 md:py-32">
            <div className="container mx-auto max-w-5xl px-4 text-center">
                <h2 className="font-headline text-4xl font-bold md:text-5xl">Don't Believe Us? Try It Yourself.</h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                    We built a simulator that runs 100% in your browser. Try to find random funds. Witness the futility in real-time.
                </p>

                <Card className="mt-12 text-left shadow-2xl bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center gap-2 rounded-t-lg border-b border-slate-800 bg-slate-900 p-3">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <p className="font-code text-sm text-slate-300">Heimdall Impossibility Simulator</p>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <StatBox icon={<Cpu className="text-primary" />} label="Wallets Checked" value={walletsChecked.toLocaleString()} />
                            <StatBox icon={<Activity className="text-primary" />} label="Check Rate" value={`${checkRate.toLocaleString()} w/s`} />
                            <StatBox icon={<Coins className="text-primary" />} label="Funds Found" value="0.00000000" />
                            <StatBox icon={<Lightbulb className="text-primary" />} label="Fun Fact" value={funFact} />
                        </div>
                        
                        <div className="mt-6">
                            <p className="font-code text-sm text-slate-400 mb-2">/var/log/wallet_checks.log</p>
                            <ScrollArea className="h-48 w-full rounded-md border border-slate-800 bg-black p-4">
                                <pre className="font-code text-sm">
                                    {log.map(entry => (
                                        <div key={entry.id}>
                                            <span className="text-green-400">[OK] </span>
                                            <span className="text-slate-500">BALANCE: 0.00 </span>
                                            <span className="text-cyan-400">{entry.address}</span>
                                        </div>
                                    ))}
                                </pre>
                            </ScrollArea>
                        </div>
                        
                        <Button onClick={handleToggleSimulation} className="mt-6 w-full" size="lg">
                            {isSimulating ? <Square className="mr-2" /> : <Play className="mr-2" />}
                            {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

const StatBox = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
    <div className="flex items-start gap-4 rounded-lg bg-slate-900 p-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm font-medium text-slate-400">{label}</p>
            <p className="font-code text-lg font-semibold text-white">{value}</p>
        </div>
    </div>
);
