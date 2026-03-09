import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Trash2,
  Pencil,
  Plus,
  Eye,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { AllowedActionType, DataTableProps } from "@/lib/types/table";
import { textTruncate } from "@/helper/text-truncate";
import { ResponsiveModal } from "./responsive-model";
import { ViewBody } from "./ViewBody";

const SKELETON_ROWS = 5;

export function DataTable<TData extends object>({
  columns = [],
  data,
  entityLabel = "عنصر",
  formContent,
  editContent,
  isLoading,
  onDelete,
  popup = true,
  allowedActions = ["Add", "Remove", "Edit", "Read"],
}: DataTableProps<TData>) {
  const nav = useNavigate();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TData | null>(null);
  const [viewTarget, setViewTarget] = useState<TData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleEditOpenChange = (open: boolean) => {
    setEditDialogOpen(open);
    if (!open) setTimeout(() => setEditTarget(null), 300);
  };

  const handleViewOpenChange = (open: boolean) => {
    setViewDialogOpen(open);
    if (!open) setTimeout(() => setViewTarget(null), 300);
  };

  const can = (action: AllowedActionType) => allowedActions.includes(action);

  const getRowId = (row: TData): string => {
    const r = row as Record<string, unknown>;
    return String(r["id"] ?? r["_id"] ?? "");
  };

  const handleAdd = () => {
    if (popup) setAddDialogOpen(true);
    else nav(`new`);
  };

  const handleEdit = (row: TData) => {
    if (popup) {
      setEditTarget(row);
      setEditDialogOpen(true);
    } else nav(`edit/${getRowId(row)}`);
  };

  const handleView = (row: TData) => {
    if (popup) {
      setViewTarget(row);
      setViewDialogOpen(true);
    } else nav(`read/${getRowId(row)}`);
  };

  const hasAnyRowAction = can("Read") || can("Edit") || can("Remove");

  const tanstackColumns: ColumnDef<TData>[] = [
    ...columns.map(
      (col, idx): ColumnDef<TData> => ({
        id: col.key,
        accessorKey: col.key,
        header: col.name,
        enableSorting: idx !== 0,
        cell: ({ row, table }) => {
          if (idx === 0) {
            return (
              table.getSortedRowModel().rows.findIndex((r) => r.id === row.id) +
              1
            );
          }
          const value = (row.original as Record<string, unknown>)[col.key];
          return value !== undefined && value !== null
            ? textTruncate(String(value), 30)
            : "—";
        },
      }),
    ),
    ...(hasAnyRowAction
      ? [
          {
            id: "actions",
            header: "الإجراءات",
            enableSorting: false,
            cell: ({ row }: { row: { original: TData } }) => (
              <div className="flex gap-4">
                {can("Read") && (
                  <button
                    className="text-main hover:text-main-darker cursor-pointer"
                    onClick={() => handleView(row.original)}
                    title="عرض"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
                {can("Edit") && (
                  <button
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(row.original)}
                    title="تعديل"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                {can("Remove") && (
                  <button
                    className="text-destructive hover:text-destructive cursor-pointer"
                    onClick={() => {
                      setDeleteTarget([row.original]);
                      setDeleteDialogOpen(true);
                    }}
                    title="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ),
          } as ColumnDef<TData>,
        ]
      : []),
  ];

  const table = useReactTable<TData>({
    data: data ?? [],
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: { rowSelection, sorting },
  });

  const handleConfirmDelete = () => {
    onDelete?.(deleteTarget);
    setDeleteDialogOpen(false);
    table.resetRowSelection();
  };

  const totalCols = tanstackColumns.length;

  const resolveFormContent = (onClose: () => void) =>
    typeof formContent === "function" ? formContent(onClose) : formContent;

  return (
    <div className="space-y-4 overflow-hidden" dir="rtl">
      {/* Toolbar */}
      <div className="flex items-center justify-end">
        {can("Add") && (
          <Button
            size="sm"
            onClick={handleAdd}
            className="gap-1 justify-end flex items-center"
          >
            <Plus className="h-4 w-4" />
            إضافة {entityLabel}
          </Button>
        )}
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className="text-right bg-main-light px-4!"
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        className="flex items-center gap-1 cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {sorted === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : sorted === "desc" ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronsUpDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
              <TableRow
                key={`skeleton-${rowIdx}`}
                className={rowIdx % 2 === 0 ? "bg-muted/50" : ""}
              >
                {Array.from({ length: totalCols }).map((_, colIdx) => (
                  <TableCell key={`skeleton-cell-${colIdx}`} className="px-4!">
                    <Skeleton height={16} borderRadius={6} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={index % 2 === 0 ? "bg-muted/50" : ""}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="px-4!" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={totalCols} className="h-24 text-center">
                لا توجد بيانات
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add Modal */}
      {popup && can("Add") && (
        <ResponsiveModal
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          title={`إضافة ${entityLabel}`}
          description="إضافة"
        >
          {resolveFormContent(() => setAddDialogOpen(false))}
        </ResponsiveModal>
      )}

      {/* Edit Modal */}
      {popup && can("Edit") && (
        <ResponsiveModal
          open={editDialogOpen}
          onOpenChange={handleEditOpenChange}
          title={`تعديل ${entityLabel}`}
          description="تعديل"
        >
          {editTarget &&
            (editContent
              ? editContent(editTarget, () => setEditDialogOpen(false))
              : resolveFormContent(() => setEditDialogOpen(false)))}
        </ResponsiveModal>
      )}

      {/* View Modal */}
      {popup && can("Read") && (
        <ResponsiveModal
          open={viewDialogOpen}
          onOpenChange={handleViewOpenChange}
          title={`عرض ${entityLabel}`}
          description="تفاصيل العنصر"
        >
          {viewTarget && (
            <div className="space-y-4">
              <ViewBody item={viewTarget} columns={columns} />
              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setViewTarget(null)}>
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </ResponsiveModal>
      )}

      {/* Delete Dialog */}
      {can("Remove") && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من حذف{" "}
                {deleteTarget.length === 1
                  ? `هذا ${entityLabel}`
                  : `${deleteTarget.length} عناصر`}
                ؟ لا يمكن التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2">
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive hover:bg-destructive/90"
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
