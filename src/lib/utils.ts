
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function getActiveStateFromPathname(currentPath: string, linkPath: string): boolean {
  if (currentPath === linkPath) return true;
  if (linkPath !== '/' && currentPath.startsWith(linkPath + '/')) return true;
  return false;
}
