// Repeater.tsx

"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./button";

interface RepeaterProps<T extends Record<string, unknown>> {
  addLabel?: string;
  defaultItem?: T;
  initial?: T[];
  renderItem: (
    item: T,
    index: number,
    onChange: (key: keyof T, value: unknown) => void
  ) => React.ReactNode;
}

export function Repeater<T extends Record<string, unknown>>({
  addLabel = "إضافة",
  defaultItem = {} as T,
  initial = [],
  renderItem,
}: RepeaterProps<T>) {
  const [items, setItems] = useState<T[]>(initial);

  const add = () => setItems((prev) => [...prev, { ...defaultItem }]);

  const remove = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const update = (index: number, key: keyof T, value: unknown) =>
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative border border-input rounded-md p-4 bg-muted/20"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-3 left-3 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="حذف"
            >
              <Trash2 size={15} />
            </button>

            {renderItem(item, index, (key, value) => update(index, key, value))}
          </div>
        ))}
      </div>

      <Button type="button" size="sm" onClick={add} className="gap-1.5 flex items-center">
        <Plus size={15} />
        {addLabel}
      </Button>
    </div>
  );
}