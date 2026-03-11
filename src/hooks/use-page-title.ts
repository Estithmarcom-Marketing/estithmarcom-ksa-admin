import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `ميثاق | ${title}`;
  }, [title]);
}