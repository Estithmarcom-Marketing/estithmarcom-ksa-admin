"use client";

import { useRef, useState, useCallback } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  placeholder = "اسحب الصورة هنا أو اضغط للاختيار",
  className,
  disabled = false,
  invalid = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const previewUrl =
    value instanceof File
      ? URL.createObjectURL(value)
      : typeof value === "string" && value.length > 0
      ? value
      : null;

  const handleFile = useCallback(
    (file: File | null) => {
      if (disabled) return;
      if (file && !file.type.startsWith("image/")) return;
      onChange?.(file);
    },
    [disabled, onChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div className={cn(`${previewUrl ? "w-50!" : "w-full"}`, className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        aria-label="رفع صورة"
        className={cn(
          "relative flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed transition-colors duration-200 cursor-pointer select-none overflow-hidden h-48",
          isDragging
            ? "border-main bg-main/5"
            : invalid
            ? "border-destructive bg-destructive/5"
            : "border-input bg-muted/30 hover:border-primary/60 hover:bg-muted/50",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        )}
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="معاينة الصورة"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center group">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1 text-white">
                <Upload className="h-5 w-5" />
                <span className="text-xs font-medium">تغيير الصورة</span>
              </div>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 left-2 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-destructive transition-colors duration-150"
                aria-label="إزالة الصورة"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center pointer-events-none">
            <div
              className={cn(
                "rounded-full p-2.5",
                isDragging
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <ImagePlus className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground leading-snug">
              {isDragging ? "أفلت الصورة هنا" : placeholder}
            </p>
            <p className="text-[11px] text-muted-foreground/60">
              PNG، JPG، WEBP — حتى 5 ميغابايت
            </p>
          </div>
        )}
      </div>
    </div>
  );
}