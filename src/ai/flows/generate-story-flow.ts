'use server';

/**
 * @fileOverview AI-powered story generation agent for the wheel winner.
 *
 * - generateStory - A function that generates a short story about the winner.
 * - GenerateStoryInput - The input type for the generateStory function.
 * - GenerateStoryOutput - The return type for the generateStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryInputSchema = z.object({
  winner: z.string().describe('The winning item from the wheel.'),
  contextItems: z
    .array(z.string())
    .describe('The other items that were on the wheel, for context.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
  story: z
    .string()
    .describe('A short, creative story about the winning item.'),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryPrompt',
  input: {schema: GenerateStoryInputSchema},
  output: {schema: GenerateStoryOutputSchema},
  prompt: `You are a fun and exceptionally creative storyteller.
  
  A user has just spun a wheel of choices, and the winner is "{{winner}}".
  The other items on the wheel were:
  {{#each contextItems}}
  - {{{this}}}
  {{/each}}

  Write a short, celebratory, and slightly humorous story (no more than 3-4 sentences) about why "{{winner}}" was the chosen one. Make it epic and fun!`,
});

const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
