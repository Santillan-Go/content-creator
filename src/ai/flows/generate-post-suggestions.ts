'use server';

/**
 * @fileOverview A flow that generates suggestions for poses, background elements, and fashion styles for model posts.
 *
 * - generatePostSuggestions - A function that generates post suggestions.
 * - GeneratePostSuggestionsInput - The input type for the generatePostSuggestions function.
 * - GeneratePostSuggestionsOutput - The return type for the generatePostSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePostSuggestionsInputSchema = z.object({
  currentPose: z.string().describe('The current pose of the model in the photo.'),
  currentBackground: z.string().describe('The current background of the photo.'),
  fashionTrend: z.string().describe('The current fashion trend.'),
});
export type GeneratePostSuggestionsInput = z.infer<typeof GeneratePostSuggestionsInputSchema>;

const GeneratePostSuggestionsOutputSchema = z.object({
  poseSuggestion: z.string().describe('A suggestion for a pose.'),
  backgroundSuggestion: z.string().describe('A suggestion for a background element.'),
  fashionSuggestion: z.string().describe('A suggestion for a fashion style.'),
});
export type GeneratePostSuggestionsOutput = z.infer<typeof GeneratePostSuggestionsOutputSchema>;

export async function generatePostSuggestions(input: GeneratePostSuggestionsInput): Promise<GeneratePostSuggestionsOutput> {
  return generatePostSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostSuggestionsPrompt',
  input: {schema: GeneratePostSuggestionsInputSchema},
  output: {schema: GeneratePostSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide creative suggestions for model posts.

  Based on the current pose, background, and fashion trend, suggest improvements for each category to enhance the impact of future posts.

  Current Pose: {{{currentPose}}}
Current Background: {{{currentBackground}}}
Current Fashion Trend: {{{fashionTrend}}}

  Provide specific and actionable suggestions for each category. Consider current trends and what makes a visually appealing post.

  Output your suggestions in a JSON format.
  `,
});

const generatePostSuggestionsFlow = ai.defineFlow(
  {
    name: 'generatePostSuggestionsFlow',
    inputSchema: GeneratePostSuggestionsInputSchema,
    outputSchema: GeneratePostSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
