import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, Binary } from 'lucide-react';

const InfoBox = ({ icon, title, number, description }: { icon: React.ReactNode, title: string, number: React.ReactNode, description: string }) => (
    <Card className="w-full max-w-sm flex-1 bg-card/5 text-center shadow-lg transition-all hover:scale-105 hover:shadow-xl">
        <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
            </div>
            <CardTitle className="mt-4 font-headline text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="font-headline text-4xl font-bold text-primary">{number}</p>
            <span className="text-sm text-muted-foreground">{description}</span>
        </CardContent>
    </Card>
);

export default function RealitySection() {
  return (
    <section id="reality" className="w-full bg-background py-20 md:py-32">
        <div className="container mx-auto max-w-5xl px-4 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Stop. What You're Trying is Mathematically Impossible.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                The security of Bitcoin isn't a simple lock. It's a mathematical wall designed to be unbreakable. The promise of "finding" a random wallet isn't just difficult—it's a fantasy.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-8 md:flex-row">
                <InfoBox 
                    icon={<Binary className="h-6 w-6" />}
                    title="12-Word Seed Phrases" 
                    number={<>~2<sup className="text-2xl">128</sup></>}
                    description="Possible Combinations"
                />
                <InfoBox 
                    icon={<Atom className="h-6 w-6" />}
                    title="Atoms in the Universe" 
                    number={<>~10<sup className="text-2xl">80</sup></>}
                    description="Estimated"
                />
            </div>

            <p className="mx-auto mt-12 max-w-3xl border-l-4 border-primary bg-primary/5 p-4 text-left text-lg italic text-foreground">
                You would need the power of every supercomputer on the planet and billions of years to have a minimal chance. If it were easy, the entire system would collapse.
            </p>
        </div>
    </section>
  )
}
