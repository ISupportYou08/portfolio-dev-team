import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines Tailwind class names, resolving conflicts via twMerge (used for conditional styling)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
