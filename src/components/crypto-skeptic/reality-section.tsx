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
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Detente. Lo que intentas es matemáticamente imposible.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                La seguridad de Bitcoin no es una simple cerradura. Es un muro matemático diseñado para ser inquebrantable. La promesa de "encontrar" una billetera al azar no es solo difícil, es una fantasía.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-8 md:flex-row">
                <InfoBox 
                    icon={<Binary className="h-6 w-6" />}
                    title="Frases de recuperación de 12 palabras" 
                    number={<>~2<sup className="text-2xl">128</sup></>}
                    description="Combinaciones Posibles"
                />
                <InfoBox 
                    icon={<Atom className="h-6 w-6" />}
                    title="Átomos en el Universo" 
                    number={<>~10<sup className="text-2xl">80</sup></>}
                    description="Estimado"
                />
            </div>

            <p className="mx-auto mt-12 max-w-3xl border-l-4 border-primary bg-primary/5 p-4 text-left text-lg italic text-foreground">
                Necesitarías el poder de todas las supercomputadoras del planeta y miles de millones de años para tener una mínima posibilidad. Si fuera fácil, todo el sistema colapsaría.
            </p>
        </div>
    </section>
  )
}
