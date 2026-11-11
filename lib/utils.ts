import { type ClassValue, clsx, twMerge } from "cn";
import { string } from "zod";

export function cn(... inputs: ClassValue[]){
  return twMerge(clsx(...inputs));
}

export const getInitials = (name: string): string =>
  name
    .split("")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);