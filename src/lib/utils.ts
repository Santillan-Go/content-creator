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

export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number; name: string }> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: img.width,
        height: img.height,
        name: file.name,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    // ✅ Load the file
    img.src = objectUrl;
  });
};
