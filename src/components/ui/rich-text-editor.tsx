// RichTextEditor.tsx
// npm install react-quill-new

"use client";

import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic"],
  [{ list: "bullet" }, { list: "ordered" }],
];

// Quill emits "<p><br></p>" (and variants) when the editor is empty.
// This makes Zod's .min(1) think there's content, so errors never surface.
// We normalise those cases back to "" before calling onChange.
function normalizeQuillEmpty(html: string): string {
  const stripped = html.replace(/<[^>]+>/g, "").trim();
  return stripped === "" ? "" : html;
}

interface RichTextEditorProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  "aria-invalid"?: boolean;
  className?: string;
}

export function RichTextEditor({
  id,
  value,
  onChange,
  placeholder,
  dir = "rtl",
  "aria-invalid": ariaInvalid,
  className,
}: RichTextEditorProps) {
  const uid = useMemo(
    () => `rte-${id ?? Math.random().toString(36).slice(2)}`,
    [id],
  );

  const styles = `
    /* ── reset quill borders ── */
    .${uid} .ql-toolbar,
    .${uid} .ql-container {
      border: none !important;
    }

    /* ── toolbar ── */
    .${uid} .ql-toolbar {
      border-bottom: 1px solid #e2e8f0 !important;
      background: #f8fafc;
      padding: 5px 8px;
      direction: ltr;
    }

    /* ── icons default ── */
    .${uid} .ql-snow .ql-stroke {
      stroke: #64748b !important;
    }
    .${uid} .ql-snow .ql-fill,
    .${uid} .ql-snow .ql-stroke.ql-fill {
      fill: #64748b !important;
    }
    .${uid} .ql-snow .ql-picker,
    .${uid} .ql-snow .ql-picker-label,
    .${uid} .ql-snow button {
      color: #64748b !important;
    }

    /* ── icons hover & active ── */
    .${uid} .ql-snow .ql-toolbar button:hover .ql-stroke,
    .${uid} .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .${uid} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .${uid} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke {
      stroke: #0f172a !important;
    }
    .${uid} .ql-snow .ql-toolbar button:hover .ql-fill,
    .${uid} .ql-snow .ql-toolbar button.ql-active .ql-fill {
      fill: #0f172a !important;
    }
    .${uid} .ql-snow .ql-toolbar button:hover,
    .${uid} .ql-snow .ql-toolbar button.ql-active,
    .${uid} .ql-snow .ql-toolbar .ql-picker-label:hover,
    .${uid} .ql-snow .ql-toolbar .ql-picker-label.ql-active {
      color: #0f172a !important;
    }

    /* ── picker dropdown ── */
    .${uid} .ql-snow .ql-picker-options {
      background: #fff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
    }
    .${uid} .ql-snow .ql-picker-options .ql-picker-item {
      color: #64748b !important;
    }
    .${uid} .ql-snow .ql-picker-options .ql-picker-item:hover,
    .${uid} .ql-snow .ql-picker-options .ql-picker-item.ql-selected {
      color: #0f172a !important;
    }

    /* ── editor area ── */
    .${uid} .ql-container {
      font-size: 0.875rem;
      font-family: inherit;
    }
    .${uid} .ql-editor {
      min-height: 120px;
      padding: 8px 12px;
      color: #0f172a;
      direction: ${dir};
      text-align: ${dir === "rtl" ? "right" : "left"};
    }

    /* ── placeholder ── */
    .${uid} .ql-editor.ql-blank::before {
      color: #94a3b8;
      font-style: normal;
      left:  ${dir === "rtl" ? "unset" : "12px"};
      right: ${dir === "rtl" ? "12px"  : "unset"};
    }
  `;

  return (
    <div
      className={cn(
        uid,
        "w-full bg-white border border-input shadow-xs overflow-hidden",
        "transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        ariaInvalid &&
          "border-destructive focus-within:ring-destructive/20 dark:focus-within:ring-destructive/40",
        className,
      )}
    >
      <style>{styles}</style>
      <ReactQuill
        id={id}
        theme="snow"
        value={value}
        onChange={(html) => onChange?.(normalizeQuillEmpty(html))}
        placeholder={placeholder}
        modules={{ toolbar: TOOLBAR }}
      />
    </div>
  );
}