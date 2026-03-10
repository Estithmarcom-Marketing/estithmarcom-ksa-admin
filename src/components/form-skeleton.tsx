import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton({ children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-input bg-card p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-input pb-3">
        <Skeleton className="h-4 w-32" />
      </div>
      {children}
    </div>
  );
}

function FieldSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`space-y-1.5 ${wide ? "col-span-2" : "col-span-2 sm:col-span-1"}`}>
      <Skeleton className="h-3.5 w-28" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

function TextareaFieldSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`space-y-1.5 ${wide ? "col-span-2" : "col-span-2 sm:col-span-1"}`}>
      <Skeleton className="h-3.5 w-28" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

function RichEditorFieldSkeleton() {
  return (
    <div className="col-span-2 space-y-1.5">
      <Skeleton className="h-3.5 w-28" />
      {/* Toolbar */}
      <div className="border border-input rounded-md overflow-hidden">
        <div className="flex items-center gap-1 border-b border-input px-2 py-1.5 bg-muted/30">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded" />
          ))}
          <div className="w-px h-4 bg-border mx-1" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded" />
          ))}
        </div>
        <Skeleton className="h-28 w-full rounded-none" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      {/* Basic Info Section */}
      <SectionSkeleton title="المعلومات الأساسية">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">

          {/* Published toggle */}
          <div className="col-span-2 flex items-center justify-end gap-3">
            <Skeleton className="h-5 w-9 rounded-full" />
            <Skeleton className="h-3.5 w-14" />
          </div>

          {/* Image uploader */}
          <div className="col-span-2">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
          </div>

          {/* Title AR / EN */}
          <FieldSkeleton />
          <FieldSkeleton />

          {/* Short desc AR / EN */}
          <TextareaFieldSkeleton />
          <TextareaFieldSkeleton />

          {/* Long desc AR */}
          <RichEditorFieldSkeleton />

          {/* Long desc EN */}
          <RichEditorFieldSkeleton />
        </div>
      </SectionSkeleton>

      {/* Features Section */}
      <SectionSkeleton title="المميزات">
        <div className="space-y-3">
          {/* One sample feature card */}
          <div className="border border-input rounded-md p-4 bg-muted/20 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-9 rounded-full" />
              <Skeleton className="h-3.5 w-14" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
          </div>

          {/* Add button */}
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </SectionSkeleton>

      {/* FAQ Section */}
      <SectionSkeleton title="الأسئلة الشائعة">
        <div className="space-y-3">
          {/* One sample FAQ card */}
          <div className="border border-input rounded-md p-4 bg-muted/20 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-9 rounded-full" />
              <Skeleton className="h-3.5 w-14" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <FieldSkeleton />
              <FieldSkeleton />
              <TextareaFieldSkeleton wide />
              <TextareaFieldSkeleton wide />
            </div>
          </div>

          {/* Add button */}
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </SectionSkeleton>

      {/* SEO Section */}
      <SectionSkeleton title="محركات البحث (SEO)">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <FieldSkeleton />
          <FieldSkeleton />
          <TextareaFieldSkeleton wide />
          <TextareaFieldSkeleton wide />
        </div>
      </SectionSkeleton>

      {/* Submit button */}
      <div className="flex justify-end">
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}