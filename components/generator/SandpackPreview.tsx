"use client";

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { useMemo } from "react";

function stripCodeFences(input: string) {
  // Handles ```tsx ... ``` or ``` ... ```
  return input
    .replace(/^\s*```[\w-]*\s*\n?/m, "")
    .replace(/\n?\s*```\s*$/m, "")
    .trim();
}

export function SandpackComponentPreview({ componentTsx }: { componentTsx: string }) {
  const cleaned = useMemo(() => stripCodeFences(componentTsx), [componentTsx]);

  const files = useMemo(
    () => ({
      "/Component.tsx": cleaned,
      "/App.tsx": `import React from "react";
import Component from "./Component";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <Component />
    </div>
  );
}
`,
      "/index.tsx": `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
`,
      "/index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Preview</title>
  </head>
  <body class="bg-transparent">
    <div id="root"></div>
  </body>
</html>`,
    }),
    [cleaned],
  );

  return (
    <SandpackProvider
      template="react-ts"
      files={files}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    >
      <SandpackLayout style={{ borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "none" }}>
          <SandpackCodeEditor />
        </div>
        <div style={{ width: "100%" }}>
          <SandpackPreview style={{ height: 650, width: "100%" }} />
     
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}

