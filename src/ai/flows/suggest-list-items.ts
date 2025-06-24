'use server';

/**
 * @fileOverview AI-powered list item suggestion agent.
 *
 * - suggestListItems - A function that suggests new items to add to a list.
 * - SuggestListItemsInput - The input type for the suggestListItems function.
 * - SuggestListItemsOutput - The return type for the suggestListItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestListItemsInputSchema = z.object({
  existingItems: z
    .array(z.string())
    .describe('The list of existing items to base suggestions on.'),
  numberOfSuggestions: z
    .number()
    .default(3)
    .describe('The number of suggestions to generate.'),
});
export type SuggestListItemsInput = z.infer<typeof SuggestListItemsInputSchema>;

const SuggestListItemsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('The list of suggested items to add.'),
});
export type SuggestListItemsOutput = z.infer<typeof SuggestListItemsOutputSchema>;

export async function suggestListItems(input: SuggestListItemsInput): Promise<SuggestListItemsOutput> {
  return suggestListItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestListItemsPrompt',
  input: {schema: SuggestListItemsInputSchema},
  output: {schema: SuggestListItemsOutputSchema},
  prompt: `You are a creative assistant helping users expand their lists of items for a spinning wheel game.

  Based on the existing items in the list, suggest {{{numberOfSuggestions}}} new, related, and interesting items to add to the list.
  Return the suggestions as a simple array of strings.

  Existing items:
  {{#each existingItems}}- {{{this}}}\n{{/each}}`,
});

const suggestListItemsFlow = ai.defineFlow(
  {
    name: 'suggestListItemsFlow',
    inputSchema: SuggestListItemsInputSchema,
    outputSchema: SuggestListItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
