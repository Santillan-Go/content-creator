import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatLikes = (likes: number): string => {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(1) + "M";
  } else if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + "K";
  }
  return likes.toString();
};
