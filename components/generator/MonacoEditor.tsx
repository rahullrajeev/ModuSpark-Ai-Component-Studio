"use client";

import Editor from "@monaco-editor/react";

export default function MonacoEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <Editor
      height="420px"
      defaultLanguage="typescript"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize: 13,
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        tabSize: 2,
        padding: { top: 14, bottom: 14 },
        renderLineHighlight: "all",
      }}
    />
  );
}

