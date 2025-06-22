'use server';

/**
 * @fileOverview Fun fact generator for the crypto simulation.
 *
 * - generateFunFact - A function that generates fun facts related to the simulation.
 * - GenerateFunFactInput - The input type for the generateFunFact function.
 * - GenerateFunFactOutput - The return type for the generateFunFact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFunFactInputSchema = z.object({
  walletsChecked: z
    .number()
    .describe('The total number of wallets checked by the simulator.'),
  elapsedTime: z
    .number()
    .describe('The elapsed time of the simulation in seconds.'),
});
export type GenerateFunFactInput = z.infer<typeof GenerateFunFactInputSchema>;

const GenerateFunFactOutputSchema = z.object({
  funFact: z.string().describe('A fun fact related to the simulation.'),
});
export type GenerateFunFactOutput = z.infer<typeof GenerateFunFactOutputSchema>;

export async function generateFunFact(input: GenerateFunFactInput): Promise<GenerateFunFactOutput> {
  return generateFunFactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFunFactPrompt',
  input: {schema: GenerateFunFactInputSchema},
  output: {schema: GenerateFunFactOutputSchema},
  prompt: `Eres un generador de datos curiosos para una simulación de criptomonedas.

  La simulación comprueba billeteras aleatorias en busca de fondos, pero las posibilidades de encontrar fondos son astronómicamente bajas.

  Genera un dato curioso en español basado en la siguiente información:

  Billeteras comprobadas: {{{walletsChecked}}}
  Tiempo transcurrido: {{{elapsedTime}}} segundos

  El dato curioso debe estar relacionado con la improbabilidad de encontrar fondos y resaltar la escala del problema.
  Debe ser corto y atractivo.
  Haz que el dato curioso sea conversacional, como si estuvieras hablando con el usuario.
  Ejemplo: "Has comprobado {{walletsChecked}} billeteras, ¡lo que sigue siendo menos que el número de granos de arena en una playa pequeña!"
  `,
});

const generateFunFactFlow = ai.defineFlow(
  {
    name: 'generateFunFactFlow',
    inputSchema: GenerateFunFactInputSchema,
    outputSchema: GenerateFunFactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
