"use client";

import { THEME_OPTIONS } from "@/lib/themes";

import { useTheme } from "./ThemeProvider";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-1.5 sm:items-end">
      <span className="app-label text-[10px] font-medium uppercase tracking-wider">
        Theme
      </span>
      <div
        className="app-theme-picker flex max-w-full gap-1 overflow-x-auto rounded-2xl p-1 ring-1"
        role="radiogroup"
        aria-label="Select app theme"
      >
        {THEME_OPTIONS.map((option) => {
          const active = theme === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTheme(option.id)}
              className={`shrink-0 rounded-xl px-2.5 py-1.5 text-xs font-medium transition duration-300 ease-out ${
                active ? "app-theme-pill-active" : "app-theme-pill"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
