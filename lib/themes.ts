export const APP_THEMES = [
  "dark",
  "light",
  "futuristic",
  "minimal",
  "glassmorphism",
] as const;

export type AppTheme = (typeof APP_THEMES)[number];

export const THEME_OPTIONS: { id: AppTheme; label: string }[] = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "futuristic", label: "Futuristic" },
  { id: "minimal", label: "Minimal" },
  { id: "glassmorphism", label: "Glass" },
];

export const DEFAULT_THEME: AppTheme = "dark";

export function isAppTheme(value: string): value is AppTheme {
  return APP_THEMES.includes(value as AppTheme);
}
