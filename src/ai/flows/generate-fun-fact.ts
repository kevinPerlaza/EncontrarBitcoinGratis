'use server';

/**
 * @fileOverview Fun fact generator for the crypto simulation.
 *
 * - generateFunFact - A function that generates fun facts related to the simulation.
 * - GenerateFunFactInput - The input type for the generateFunFact function.
 * - GenerateFunFactOutput - The return type for the generateFunFact function.
 */

import {z} from 'zod';

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

export async function generateFunFact(
  input: GenerateFunFactInput
): Promise<GenerateFunFactOutput> {
  const funFacts = [
    `Has comprobado ${input.walletsChecked.toLocaleString()} billeteras. ¡Eso es más que la cantidad de estrellas que puedes ver a simple vista!`,
    `Si cada billetera que has comprobado fuera un grano de arena, todavía no tendrías suficiente para llenar un dedal.`,
    `La probabilidad de encontrar una billetera con fondos es menor que la de ser alcanzado por un rayo... dos veces.`,
    `En los ${Math.round(
      input.elapsedTime
    )} segundos que llevas, se han realizado millones de transacciones de Bitcoin reales en todo el mundo.`,
    `¡Sigue así! A este ritmo, comprobarás tantas billeteras como átomos hay en el universo en solo unos pocos billones de años.`,
  ];

  const randomIndex = Math.floor(Math.random() * funFacts.length);

  return Promise.resolve({
    funFact: funFacts[randomIndex],
  });
}
