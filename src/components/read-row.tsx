import { cn } from "@/lib/utils";

interface RichRowProps {
  label: string;
  value?: string;
  fullWidth?: boolean;
}

export function Row({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value?: string | null;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-0.5 py-3 border-b border-input last:border-b-0 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}
    >
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-sm text-[#666]">{value || "—"}</span>
    </div>
  );
}

// read-row.tsx
export function RichRow({ label, value, fullWidth }: RichRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 py-3 border-b border-input",
        fullWidth && "col-span-full",
      )}
    >
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <div
        className="prose prose-sm max-w-none text-foreground
                   prose-headings:font-bold
                   prose-ol:list-decimal prose-ol:pr-5
                   prose-ul:list-disc prose-ul:pr-5
                   prose-li:my-0.5"
        dir="rtl"
        dangerouslySetInnerHTML={{ __html: value ?? "" }}
      />
    </div>
  );
}
