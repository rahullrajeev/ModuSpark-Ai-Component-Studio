"use client";

import { ThemeSelector } from "@/components/theme/ThemeSelector";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell relative flex min-h-dvh flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="app-blob app-blob-1 absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-2xl motion-safe:animate-float-slow" />
        <div className="app-blob app-blob-2 absolute -bottom-64 right-[-10%] h-[620px] w-[620px] rounded-full blur-2xl motion-safe:animate-float-slower" />
        <div className="app-blob app-blob-3 absolute -bottom-40 left-[-10%] h-[520px] w-[520px] rounded-full blur-2xl motion-safe:animate-float-slow [animation-delay:2s]" />
      </div>

      <header className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-10 motion-safe:animate-fade-in-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="group flex items-center gap-3">
            <div
              aria-hidden="true"
              className="app-logo flex h-9 w-9 items-center justify-center rounded-2xl ring-1 transition duration-300 ease-out group-hover:scale-105 motion-safe:animate-shimmer"
            >
              <span className="app-logo-text font-mono text-[13px] font-semibold leading-none tracking-[-0.08em]">
                M<span className="app-logo-accent">S</span>
              </span>
            </div>
            <div className="leading-tight">
              <div className="app-heading text-sm font-medium tracking-tight">
                ModuSpark
              </div>
              <div className="app-subtle text-xs">AI component studio</div>
            </div>
          </div>

          <ThemeSelector />
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-10 px-6 pb-16 pt-10 motion-safe:animate-fade-in-up [animation-delay:120ms]"">
        {children}

        <footer className="app-border flex flex-col items-start justify-between gap-3 border-t pt-8 text-xs motion-safe:animate-fade-in [animation-delay:400ms] sm:flex-row sm:items-center">
          <div className="app-subtle">
            Built for modern SaaS UI: dark, glassy, minimal, responsive.
          </div>
          <div className="app-faint">prompt → Gemini → code → editor → preview</div>
        </footer>
      </main>
    </div>
  );
}
