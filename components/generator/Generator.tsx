"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { SandpackComponentPreview } from "@/components/generator/SandpackPreview";

const CodeEditor = dynamic(() => import("./MonacoEditor"), { ssr: false });

type GenerateResponse =
  | { code: string }
  | { error: string; details?: unknown };

export function Generator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const canGenerate = prompt.trim().length > 0 && !isGenerating;

  const previewCode = useMemo(() => code.trim(), [code]);

  async function onGenerate() {
    if (!canGenerate) return;
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = (await res.json()) as GenerateResponse;
      if (!res.ok) {
        const msg = "error" in data ? data.error : "Failed to generate";
        throw new Error(msg);
      }

      if (!("code" in data) || typeof data.code !== "string") {
        throw new Error("Malformed response from server.");
      }

      setCode(data.code);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function onCopy() {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function onDownload() {
    if (!code) return;
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "download.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="lg:col-span-5 motion-safe:animate-fade-in-up [animation-delay:180ms]">
        <h1 className="app-heading text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Generate premium UI components from a single prompt.
        </h1>
        <p className="app-muted mt-4 text-pretty text-base leading-7">
          Describe what you want. We’ll produce a beautiful, responsive React component using Tailwind CSS—then let you tweak
          the code and preview it live.
        </p>

        <div className="app-card mt-8 rounded-3xl p-4 ring-1 backdrop-blur transition duration-500 ease-out hover:shadow-[var(--app-card-shadow)]">
          <label className="app-label text-xs font-medium">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the component you want to build…"
            className="app-input mt-2 min-h-36 w-full resize-none rounded-2xl px-4 py-3 text-sm ring-1 outline-none transition duration-300 ease-out focus:scale-[1.01] focus:ring-2"
          />

          {error ? (
            <div className="mt-3 rounded-2xl bg-red-500/10 px-4 py-3 text-xs text-red-200 ring-1 ring-red-500/20 motion-safe:animate-fade-in-up">
              {error}
            </div>
          ) : null}

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="app-subtle text-xs transition-opacity duration-300">
              Tip: ask for “accessible” + “mobile-first” + “dark mode friendly”.
            </div>
            <button
              type="button"
              onClick={onGenerate}
              disabled={!canGenerate}
              className="app-btn-primary inline-flex h-10 min-w-[108px] items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium ring-1 ring-[var(--app-ring)] hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isGenerating ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current/20 border-t-current"
                  />
                  Generating…
                </>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 motion-safe:animate-fade-in-up [animation-delay:280ms]">
        <div className="app-card rounded-3xl ring-1 backdrop-blur transition duration-500 ease-out">
          <div className="app-border flex items-center justify-between gap-3 border-b px-5 py-4">
            <div className="app-heading text-sm font-medium">Preview</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCopy}
                disabled={!code}
                className="app-btn-secondary inline-flex h-8 items-center justify-center rounded-xl px-3 text-xs font-medium ring-1 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={onDownload}
                disabled={!code}
                className="app-btn-secondary inline-flex h-8 items-center justify-center rounded-xl px-3 text-xs font-medium ring-1 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                Download
              </button>
              <div className="app-subtle hidden text-xs sm:block">Sandboxed preview</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6">
     
            <div className="app-panel rounded-2xl ring-1 transition duration-300">
              {code ? (
                <div className="min-h-[200px] max-h-[650px] overflow-auto rounded-2xl motion-safe:animate-scale-in">
           
           
                  <CodeEditor value={code} onChange={setCode} />
                </div>
              ) : (
                <div className="p-6">
                  <div className="app-heading text-sm font-medium">Nothing generated yet</div>
                  <p className="app-muted mt-2 text-sm leading-6">
                    Generate a component to unlock an editable Monaco editor here.
                  </p>
                </div>
              )}
            </div>

            <div className="app-panel rounded-2xl ring-1 transition duration-300">
              {previewCode ? (
                <div className="motion-safe:animate-scale-in">
                  <SandpackComponentPreview componentTsx={previewCode} />
                </div>
              ) : (
                <div className="p-6">
                  <div className="app-heading text-sm font-medium">Preview</div>
                  <p className="app-muted mt-2 text-sm leading-6">Live render will appear here after generation.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

