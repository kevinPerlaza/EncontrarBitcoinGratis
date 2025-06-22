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
  prompt: `You are a fun fact generator for a cryptocurrency simulation.

  The simulation checks random wallets for funds, but the chances of finding funds are astronomically low.

  Generate a fun fact based on the following information:

  Wallets checked: {{{walletsChecked}}}
  Elapsed time: {{{elapsedTime}}} seconds

  The fun fact should be related to the improbability of finding funds and highlight the scale of the problem.
  Keep it short and engaging.
  Make the fun fact conversational as though you are speaking to the user.
  Example: "You've checked {{walletsChecked}} wallets, which is still less than the number of grains of sand on a small beach!"
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
