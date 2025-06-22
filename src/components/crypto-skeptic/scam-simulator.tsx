"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

type ResultKey = 'error' | 'catastrophe' | 'correct' | 'default';

const scamResults = {
    default: {
        text: "Haz clic en una opción para ver el resultado.",
        class: "scam-result-default"
    },
    error: {
        text: "¡ERROR! Acabas de perder tu dinero. El estafador toma tu pago y desaparece. Esta es la estafa más común.",
        class: "scam-result-error"
    },
    catastrophe: {
        text: "¡CATÁSTROFE! Acabas de dar acceso total a tu billetera. El estafador la vaciará en segundos. NUNCA compartas tu frase de recuperación.",
        class: "scam-result-catastrophe"
    },
    correct: {
        text: "¡DECISIÓN CORRECTA! Reconociste que era una trampa. Tu mejor defensa es el escepticismo y el conocimiento.",
        class: "scam-result-correct"
    }
};

export default function ScamSimulator() {
    const [resultKey, setResultKey] = useState<ResultKey>('default');

    const currentResult = scamResults[resultKey];

    return (
        <section id="scam" className="w-full bg-slate-900 py-20 md:py-32">
            <div className="container mx-auto max-w-3xl px-4 text-center">
                <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">¿Cómo roban si no funciona?</h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                    Estos programas son una fachada. Su objetivo real es robarte a TI usando simples trucos psicológicos.
                </p>

                <div className="mt-12 rounded-xl border border-slate-700 bg-slate-950 p-6 text-left shadow-2xl md:p-10">
                    <h3 className="text-center font-headline text-2xl font-semibold text-primary">Simulación de Estafa: El Software "Encuentra" 2 BTC</h3>
                    <p className="mt-4 text-center text-slate-400">Tu corazón se acelera. Para reclamar tu fortuna, el software te pide que realices una acción. ¿Qué haces?</p>
                    
                    <div className="mt-8 flex flex-col gap-4">
                        <Button variant="outline" className="h-auto justify-start p-4 text-left" onClick={() => setResultKey('error')}>
                            <ShieldAlert className="mr-4 h-6 w-6 flex-shrink-0 text-red-400" />
                            <span className="flex-grow whitespace-normal">A. Pagar la "tarifa de gas" de 0.05 ETH que piden.</span>
                        </Button>
                        <Button variant="outline" className="h-auto justify-start p-4 text-left" onClick={() => setResultKey('catastrophe')}>
                            <ShieldX className="mr-4 h-6 w-6 flex-shrink-0 text-red-600" />
                            <span className="flex-grow whitespace-normal">B. Ingresar mi propia frase de recuperación para reclamarlos.</span>
                        </Button>
                        <Button variant="outline" className="h-auto justify-start p-4 text-left" onClick={() => setResultKey('correct')}>
                           <ShieldCheck className="mr-4 h-6 w-6 flex-shrink-0 text-green-400" />
                           <span className="flex-grow whitespace-normal">C. Cerrar el programa y eliminarlo inmediatamente.</span>
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
