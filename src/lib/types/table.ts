import type { ReactNode } from "react";

export interface ColumnConfig {
  key: string;
  name: string;
}

export type AllowedActionType = "Add" | "Remove" | "Edit" | "Read" | "Approve" | "Contact" | "Status" | "Password";

export interface DataTableProps<TData extends object> {
  columns?: ColumnConfig[];
  data?: TData[];
  entityLabel?: string;
  formContent?: ReactNode | ((onClose: () => void) => ReactNode);
  editContent?: (row: TData, onClose: () => void) => ReactNode;
  passwordContent?: (row: TData, onClose: () => void) => ReactNode;
  isLoading?: boolean;
  onDelete?: (rows: TData) => void;
  onApprove?: (rows: TData) => void;
  onContact?: (rows: TData) => void;
  popup?: boolean;
  allowedActions?: AllowedActionType[];
}