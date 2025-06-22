import HeroSection from '@/components/crypto-skeptic/hero-section';
import RealitySection from '@/components/crypto-skeptic/reality-section';
import ScamSimulator from '@/components/crypto-skeptic/scam-simulator';
import ImprobabilitySimulator from '@/components/crypto-skeptic/improbability-simulator';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <HeroSection />
      <RealitySection />
      <ScamSimulator />
      <ImprobabilitySimulator />

      <footer className="w-full bg-slate-950 p-8 text-center text-muted-foreground">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-headline text-3xl font-bold text-primary">Tu Escudo Contra Estafas</h2>
          <p className="mt-4 max-w-2xl mx-auto">Esta herramienta es solo para fines educativos. Sé siempre escéptico, investiga por tu cuenta y nunca compartas tus claves privadas o frases de recuperación. Mantente seguro en el mundo digital.</p>
          <Separator className="my-6 bg-slate-800" />
          <p className="text-sm">&copy; {new Date().getFullYear()} Cripto Escéptico. Construido para proteger.</p>
        </div>
      </footer>
    </main>
  );
}
