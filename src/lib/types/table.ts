export interface ColumnConfig {
  key: string;
  name: string;
}

export interface DataTableProps<TData extends object> {
  columns: ColumnConfig[];
  data: TData[];
  entityLabel?: string;
  formContent?: React.ReactNode;
  onAdd?: () => void;
  onEdit?: (row: TData) => void;
  onDelete?: (rows: TData[]) => void;
}