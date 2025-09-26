// Create a new file: src/components/ui/FullScreenLoader.tsx
"use client";

import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  isLoading: boolean;
  message?: string;
}

export default function FullScreenLoader({
  isLoading,
  message = "Creating your profile...",
}: FullScreenLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-primary/90 to-secondary/80 backdrop-blur-sm">
      <div className="bg-background/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-border/20 flex flex-col items-center gap-4 max-w-sm mx-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-secondary" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse"></div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">{message}</h3>
          <p className="text-sm text-gray-300">
            Please wait while we process your information
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
