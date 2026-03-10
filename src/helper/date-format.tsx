import { monthsNames } from "@/config/months-names";
import { getDate, getMonth, getYear } from "date-fns";

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  const day = getDate(d);
  const month = monthsNames[getMonth(d)];
  const year = getYear(d);
  return `${day} ${month} ${year}`;
}