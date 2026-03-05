import type { ReactNode } from "react";

export interface ColumnConfig {
  key: string;
  name: string;
}

export type AllowedActionType = "Add" | "Remove" | "Edit" | "Read";

export interface DataTableProps<TData extends object> {
  columns?: ColumnConfig[];
  data?: TData[];
  entityLabel?: string;
  formContent?: ReactNode | ((onClose: () => void) => ReactNode);
  editContent?: (row: TData, onClose: () => void) => ReactNode;
  isLoading?: boolean;
  onDelete?: (rows: TData[]) => void;
  popup?: boolean;
  allowedActions?: AllowedActionType[];
}