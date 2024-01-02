import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to correctly overwrite old classes when using tailwind
 * @param inputs set of new classes to add
 * @returns string of classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Utility function to wait for a number of milliseconds.
 * @param ms is the number in milliseconds
 * @returns a promise that resolves after a specified number of milliseconds
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
