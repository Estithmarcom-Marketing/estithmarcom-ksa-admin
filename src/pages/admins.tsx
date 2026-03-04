import BlogForm from "@/components/blog-form";
import { DataTable } from "@/components/DataTable";
import SpecialHeader from "@/components/SpecialHeader";
import { useAdmins } from "@/lib/querykeys/admins-query";
import type { ColumnConfig } from "@/lib/types/table";
import type { UserType } from "@/lib/types/user";

const adminsColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "name", name: "الاسم" },
  { key: "email", name: "البريد الإلكتروني" },
  { key: "created_at", name: "تاريخ الإنشاء" },
];

const Admins = () => {

  const {data: admins, isLoading: isLoadingAdmins} = useAdmins()

  const handleAdd = () => {
    console.log("add triggered");
  };

  const handleEdit = (row: UserType) => {
    console.log("edit", row);
  };

  const handleDelete = (rows: UserType[]) => {
    console.log("delete", rows);
  };

  const adminData = admins?.admins ?? []

  return (
    <div className="space-y-6">
      <div>
        <SpecialHeader title="المشرفين" />
      </div>

      <DataTable<UserType>
        columns={adminsColumns}
        data={adminData}
        entityLabel="مشرف"
        isLoading={isLoadingAdmins}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        formContent={<BlogForm />}
        popup={true}
        allowedActions={["Add", "Read", "Remove"]}
      />
    </div>
  );
};

export default Admins;
