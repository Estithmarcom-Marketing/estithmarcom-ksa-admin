import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { DataTableProps } from "@/lib/types/table";
import { textTruncate } from "@/helper/text-truncate";

export function DataTable<TData extends object>({
  columns = [],
  data = [],
  entityLabel = "عنصر",
  formContent,
  onAdd,
  onEdit,
  onDelete,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const tanstackColumns: ColumnDef<TData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="تحديد الكل"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="تحديد الصف"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    ...columns.map(
      (col, idx): ColumnDef<TData> => ({
        id: col.key,
        header: col.name,
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

    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <button className="text-blue-600" onClick={() => setEditTarget(row.original)}>
            <Pencil className="h-4 w-4" />
          </button>
          <button
            className="text-destructive hover:text-destructive"
            onClick={() => {
              setDeleteTarget([row.original]);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable<TData>({
    data,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((r) => r.original);

  const handleBulkDelete = () => {
    setDeleteTarget(selectedRows);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(deleteTarget);
    setDeleteDialogOpen(false);
    table.resetRowSelection();
  };

  const handleConfirmEdit = () => {
    if (editTarget) onEdit?.(editTarget);
    setEditTarget(null);
  };

  return (
    <div className="space-y-4 overflow-hidden" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              className="gap-1 flex items-center"
            >
              <Trash2 className="h-4 w-4" />
              حذف المحدد ({selectedRows.length})
            </Button>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => setAddDialogOpen(true)}
          className="gap-1 flex items-center"
        >
          <Plus className="h-4 w-4" />
          إضافة {entityLabel}
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-main-light">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="text-right px-4!">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`${row.id as any % 2 !== 0 ? "bg-muted/50" : ""}`}
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
              <TableCell
                colSpan={tanstackColumns.length}
                className="h-24 text-center"
              >
                لا توجد بيانات
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="text-sm text-muted-foreground">
        {selectedRows.length} من {table.getFilteredRowModel().rows.length} صف
        محدد
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة {entityLabel}</DialogTitle>
            <DialogDescription className="sr-only">إضافة</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {formContent ?? (
              <p className="text-sm text-muted-foreground">حقول النموذج هنا…</p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={() => { onAdd?.(); setAddDialogOpen(false); }}>حفظ</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تعديل {entityLabel}</DialogTitle>
            <DialogDescription className="sr-only">تعديل</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {formContent ?? (
              <p className="text-sm text-muted-foreground">حقول النموذج هنا…</p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              إلغاء
            </Button>
            <Button onClick={handleConfirmEdit}>حفظ</Button>
          </div>
        </DialogContent>
      </Dialog>

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
    </div>
  );
}