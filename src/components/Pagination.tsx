import type { PaginationType } from "@/lib/types/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  meta: PaginationType;
}

const Pagination = ({ meta }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { current_page, last_page } = meta;

  if (last_page <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | "...")[] = [];
    const left = Math.max(2, current_page - delta);
    const right = Math.min(last_page - 1, current_page + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < last_page - 1) range.push("...");
    if (last_page > 1) range.push(last_page);

    return range;
  };

  return (
    <div className="flex items-center justify-end gap-1 py-4">
      <button
        onClick={() => goToPage(current_page - 1)}
        disabled={current_page === 1}
        className="flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all hover:border-main hover:bg-main/5 hover:text-main disabled:pointer-events-none disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
          >
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page as number)}
            className={`flex h-9 w-9 items-center justify-center border text-sm font-medium transition-all ${
              page === current_page
                ? "border-main bg-main text-primary-foreground shadow-sm"
                : "border-border bg-background text-foreground hover:border-main hover:bg-main/5 hover:text-primary"
            }`}
            aria-current={page === current_page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(current_page + 1)}
        disabled={current_page === last_page}
        className="flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all hover:border-main hover:bg-main/5 hover:text-main disabled:pointer-events-none disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;