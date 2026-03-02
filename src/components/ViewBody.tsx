import type { ColumnConfig } from "@/lib/types/table";

interface ViewBodyProps<TData extends object> {
  item: TData;
  columns: ColumnConfig[];
}

export function ViewBody<TData extends object>({ item, columns }: ViewBodyProps<TData>) {
  return (
    <div className="space-y-3 py-2">
      {columns.map((col) => {
        const value = (item as Record<string, unknown>)[col.key];
        return (
          <div key={col.key} className="grid grid-cols-3 gap-2 border-b pb-2 last:border-0">
            <span className="text-sm font-medium text-muted-foreground col-span-1">
              {col.name}
            </span>
            <span className="text-sm col-span-2 break-words">
              {value !== undefined && value !== null ? String(value) : "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
