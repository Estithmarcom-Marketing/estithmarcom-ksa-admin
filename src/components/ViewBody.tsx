import { formatDate } from "@/helper/date-format";
import type { ColumnConfig } from "@/lib/types/table";

interface ViewBodyProps<TData extends object> {
  item: TData;
  columns: ColumnConfig[];
}

export function ViewBody<TData extends object>({ item, columns }: ViewBodyProps<TData>) {
  const record = item as Record<string, unknown>;

  const renderValue = (key: string, value: unknown) => {
    if (key === "published" || key === "active" || key === "approved") {
      const isActive = value === true;
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "مفعل" : "غير مفعل"}
        </span>
      );
    }

    if (key === "created_at") {
      return <span className="text-sm">{formatDate(value as any)}</span>;
    }

    if (key === "image") {
      return value ? (
        <img
          src={String(value)}
          alt="صورة"
          className="h-20 w-20 object-cover border border-border"
          loading="lazy"
        />
      ) : (
        <div className="h-10 w-10 bg-muted flex items-center justify-center text-muted-foreground text-xs border border-border">
          لا صورة
        </div>
      );
    }

    return (
      <span className="text-sm">{value !== undefined && value !== null ? String(value) : "—"}</span>
    );
  };

  return (
    <div>
      {columns.slice(1).map((col) => (
        <div key={col.key} className="flex items-center gap-3 border-b py-3 last:border-0">
          <span className="text-sm font-medium text-muted-foreground w-32 shrink-0">
            {col.name}
          </span>
          <div>{renderValue(col.key, record[col.key])}</div>
        </div>
      ))}
    </div>
  );
}