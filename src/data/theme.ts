/**
 * theme.ts
 * Runtime design token reference.
 * CSS custom properties are the canonical source — see globals.css @theme.
 * This file exposes typed constants for use in JS/TS logic (e.g., chart colors).
 * Source: 02-implementation-plan.md §3, 03-design-system.md §1
 */
import type { ThemeConfig } from "../types/data.types";

export const themeConfig: ThemeConfig = {
  colors: {
    primaryBlue: "#0052CC",
    primaryRed: "#E53E3E",
    black: "#000000",
    white: "#FFFFFF",
    textGray: "#4B5563",
    borderGray: "#E5E7EB",
    surfaceGray: "#F9FAFB",
  },
};
