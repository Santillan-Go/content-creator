"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lightbulb, Loader2, Wand2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  generatePostSuggestions,
  type GeneratePostSuggestionsOutput,
} from "@/ai/flows/generate-post-suggestions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  currentPose: z.string().min(3, "Please describe the pose.").max(100),
  currentBackground: z.string().min(3, "Please describe the background.").max(100),
  fashionTrend: z.string().min(3, "Please describe the fashion trend.").max(100),
});

type FormSchema = z.infer<typeof formSchema>;

export function AiSuggestions() {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<GeneratePostSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPose: "",
      currentBackground: "",
      fashionTrend: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    setSuggestions(null);
    startTransition(async () => {
      try {
        const result = await generatePostSuggestions(data);
        if (result) {
          setSuggestions(result);
        } else {
          throw new Error("Received an empty response from the AI.");
        }
      } catch (error) {
        console.error("Failed to generate suggestions:", error);
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Could not generate suggestions. Please try again later.",
        });
      }
    });
  };

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline">AI Style Advisor</CardTitle>
                <CardDescription>Get AI-powered tips to elevate your next post.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="currentPose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Pose</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Standing, hands in pockets" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentBackground"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Background</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Urban street at night" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fashionTrend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fashion Trend</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Y2K aesthetic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Get Suggestions"
              )}
            </Button>
          </form>
        </Form>

        {isPending && (
            <div className="text-center p-12">
                <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Our AI is crafting your suggestions...</p>
            </div>
        )}

        {suggestions && (
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-bold font-headline text-center">Your AI Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    Pose
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{suggestions.poseSuggestion}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{suggestions.backgroundSuggestion}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    Fashion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{suggestions.fashionSuggestion}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
