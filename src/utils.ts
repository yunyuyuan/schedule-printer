import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function colorIsValid(color: string) {
  return /^#[0-9a-f]{6}$/.test(color);
}

export function print() {
  const el = document.getElementById("print")!.cloneNode(true);
  document.body.style.display = "none";
  document.body.parentElement!.appendChild(el);
  window.print();
  setTimeout(() => {
    document.body.style.display = "initial";
    (el as HTMLElement).remove();
  });
}

export function getTextColor(backgroundColor: string) {
  const bigint = parseInt(backgroundColor.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  // Calculate the luminance of the background color.
  const luminance = r * 0.299 + g * 0.587 + b * 0.114;

  // Choose the text color with the highest contrast against the background color.
  return luminance > 186 ? "black" : "white";
}
