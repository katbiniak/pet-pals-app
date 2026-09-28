import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines classes into a single line and merges conflicting tailwind styles
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
