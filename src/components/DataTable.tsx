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
  BadgeCheck,
  CircleX,
  PhoneCall,
  PhoneMissed,
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
import { formatDate } from "@/helper/date-format";
import { ViewBody } from "./ViewBody";

const SKELETON_ROWS = 5;

export function DataTable<TData extends object>({
  columns = [],
  data,
  entityLabel = "عنصر",
  formContent,
  editContent,
  onApprove,
  onContact,
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
  const [deleteTarget, setDeleteTarget] = useState<TData | null>(null);
  const [approveTarget, setApproveTarget] = useState<TData | null>(null);
  const [contactTarget, setContactTarget] = useState<TData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isContacting, setIsContacting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  function getNestedValue(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  const approveTargetApproved =
    (approveTarget as Record<string, unknown>)?.["approved"] === false;

  const contactTargetContacted =
    (contactTarget as Record<string, unknown>)?.["contacted"] === false;

  const handleEditOpenChange = (open: boolean) => {
    setEditDialogOpen(open);
    if (!open) setTimeout(() => setEditTarget(null), 300);
  };

  const handleViewOpenChange = (open: boolean) => {
    setViewDialogOpen(open);
    if (!open) setTimeout(() => setViewTarget(null), 300);
  };

  const handleDeleteOpenChange = (open: boolean) => {
    if (isDeleting) return;
    setDeleteDialogOpen(open);
    if (!open) setTimeout(() => setDeleteTarget(null), 300);
  };

  const handleApproveOpenChange = (open: boolean) => {
    if (isApproving) return;
    setApproveDialogOpen(open);
    if (!open) setTimeout(() => setApproveTarget(null), 300);
  };

  const handleContactOpenChange = (open: boolean) => {
    if (isContacting) return;
    setContactDialogOpen(open);
    if (!open) setTimeout(() => setContactTarget(null), 300);
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

          const value = getNestedValue(row.original, col.key);

          if (
            col.key === "published" ||
            col.key === "active" ||
            col.key === "approved" ||
            col.key === "contact"
          ) {
            const isActive = value === true;
            return (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isActive ? "مفعل" : "غير مفعل"}
              </span>
            );
          }

          if (col.key === "contacted") {
            const isActive = value === true;
            return (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isActive ? "تم التواصل" : "لم يتم التواصل"}
              </span>
            );
          }

          if (col.key === "created_at") {
            return (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                {formatDate(value as any)}
              </span>
            );
          }

          if (col.key === "image") {
            return value ? (
              <img
                src={String(value)}
                alt="صورة"
                className="h-10 w-10 object-cover border border-border"
                loading="lazy"
              />
            ) : (
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs border border-border">
                لا صورة
              </div>
            );
          }

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
                {can("Approve") && (
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setApproveTarget(row.original);
                      setApproveDialogOpen(true);
                    }}
                    title={
                      (row.original as Record<string, unknown>)["approved"] ===
                      false
                        ? "نشر"
                        : "إلغاء النشر"
                    }
                  >
                    {(row.original as Record<string, unknown>)["approved"] ===
                    false ? (
                      <BadgeCheck className="h-4 w-4 text-green-600 hover:text-green-700" />
                    ) : (
                      <CircleX className="h-4 w-4 text-red-600 hover:text-red-700" />
                    )}
                  </button>
                )}
                {can("Contact") && (
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setContactTarget(row.original);
                      setContactDialogOpen(true);
                    }}
                    title={
                      (row.original as Record<string, unknown>)[
                        "contacted"
                      ] === false
                        ? "تواصل"
                        : "إلغاء التواصل"
                    }
                  >
                    {(row.original as Record<string, unknown>)[
                      "contacted"
                    ] === false ? (
                      <PhoneCall className="h-4 w-4 text-green-600 hover:text-green-700" />
                    ) : (
                      <PhoneMissed className="h-4 w-4 text-red-600 hover:text-red-700" />
                    )}
                  </button>
                )}
                {can("Remove") && (
                  <button
                    className="text-destructive hover:text-destructive cursor-pointer"
                    onClick={() => {
                      setDeleteTarget(row.original);
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

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDelete?.(deleteTarget);
      setDeleteDialogOpen(false);
      setTimeout(() => setDeleteTarget(null), 300);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmApprove = async () => {
    if (!approveTarget) return;
    setIsApproving(true);
    try {
      await onApprove?.(approveTarget);
      setApproveDialogOpen(false);
      setTimeout(() => setApproveTarget(null), 300);
    } finally {
      setIsApproving(false);
    }
  };

  const handleConfirmContact = async () => {
    if (!contactTarget) return;
    setIsContacting(true);
    try {
      await onContact?.(contactTarget);
      setContactDialogOpen(false);
      setTimeout(() => setContactTarget(null), 300);
    } finally {
      setIsContacting(false);
    }
  };

  const totalCols = tanstackColumns.length;

  const resolveFormContent = (onClose: () => void) =>
    typeof formContent === "function" ? formContent(onClose) : formContent;

  return (
    <div className="space-y-4 mb-0 overflow-hidden" dir="rtl">
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
                <Button
                  variant="outline"
                  onClick={() => handleViewOpenChange(false)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </ResponsiveModal>
      )}

      {/* Delete Dialog */}
      {can("Remove") && (
        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={handleDeleteOpenChange}
        >
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من حذف هذا {entityLabel}؟ لا يمكن التراجع عن هذا
                الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2">
              <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
              <Button
                className="flex items-center gap-1"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                {isDeleting ? <>جارٍ الحذف...</> : "حذف"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Approve Dialog */}
      {can("Approve") && (
        <AlertDialog
          open={approveDialogOpen}
          onOpenChange={handleApproveOpenChange}
        >
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {approveTargetApproved ? "تأكيد النشر" : "تأكيد إلغاء النشر"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {approveTargetApproved
                  ? `هل أنت متأكد من نشر هذا ${entityLabel}؟.`
                  : `هل أنت متأكد من إلغاء نشر هذا ${entityLabel}؟.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2">
              <AlertDialogCancel disabled={isApproving}>
                إلغاء
              </AlertDialogCancel>
              <Button
                className={`flex items-center text-white gap-1 ${
                  approveTargetApproved
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={isApproving}
                onClick={handleConfirmApprove}
              >
                {isApproving ? (
                  <>
                    {approveTargetApproved
                      ? "جارٍ النشر..."
                      : "جارٍ إلغاء النشر..."}
                  </>
                ) : approveTargetApproved ? (
                  "نشر"
                ) : (
                  "إلغاء النشر"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Contact Dialog */}
      {can("Contact") && (
        <AlertDialog
          open={contactDialogOpen}
          onOpenChange={handleContactOpenChange}
        >
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {contactTargetContacted
                  ? "تأكيد التواصل"
                  : "تأكيد إلغاء التواصل"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {contactTargetContacted
                  ? `هل أنت متأكد من تفعيل التواصل لهذا ${entityLabel}؟.`
                  : `هل أنت متأكد من إلغاء التواصل لهذا ${entityLabel}؟.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2">
              <AlertDialogCancel disabled={isContacting}>
                إلغاء
              </AlertDialogCancel>
              <Button
                className={`flex items-center text-white gap-1 ${
                  contactTargetContacted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={isContacting}
                onClick={handleConfirmContact}
              >
                {isContacting ? (
                  <>
                    {contactTargetContacted
                      ? "جارٍ التواصل..."
                      : "جارٍ إلغاء التواصل..."}
                  </>
                ) : contactTargetContacted ? (
                  "تواصل"
                ) : (
                  "إلغاء التواصل"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
