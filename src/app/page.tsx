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
          <h2 className="font-headline text-3xl font-bold text-primary">Your Shield Against Scams</h2>
          <p className="mt-4 max-w-2xl mx-auto">This tool is for educational purposes only. Always be skeptical, do your own research, and never share your private keys or seed phrases. Stay safe in the digital world.</p>
          <Separator className="my-6 bg-slate-800" />
          <p className="text-sm">&copy; {new Date().getFullYear()} Crypto Skeptic. Built to protect.</p>
        </div>
      </footer>
    </main>
  );
}
