import { DataTable } from "@/components/DataTable";
import type { BlogType } from "@/lib/types/blog";
import type { ColumnConfig } from "@/lib/types/table";

const serviceColumns: ColumnConfig[] = [
  { key: "id", name: "#" },
  { key: "title_ar", name: "الاسم (عربي)" },
  { key: "title_en", name: "الاسم (انجليزي)" },
  { key: "desc_ar", name: "الوصف (عربي)" },
  { key: "desc_en", name: "الوصف (انجليزي)" },
];

export interface blogType {
  id: number;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
}

export const blogsData: blogType[] = [
  {
    id: 1,
    title_ar: "ما هي إجراءات رفع دعوى مدنية في القانون المصري؟",
    title_en:
      "What Are the Procedures for Filing a Civil Lawsuit in Egyptian Law?",
    desc_ar:
      "تبدأ إجراءات رفع الدعوى المدنية بتقديم صحيفة الدعوى إلى قلم كتاب المحكمة المختصة، متضمنة بيانات الأطراف وموضوع النزاع والطلبات بشكل واضح. بعد ذلك يتم إعلان الخصم قانونًا وتحديد جلسة لنظر الدعوى أمام القاضي المختص.",
    desc_en:
      "Filing a civil lawsuit begins by submitting a statement of claim to the competent court, including the parties' details, subject of dispute, and clear requests. The defendant is then legally notified and a court session is scheduled before the assigned judge.",
  },
  {
    id: 2,
    title_ar: "الفرق بين الجنحة والجناية في القانون",
    title_en: "The Difference Between a Misdemeanor and a Felony in Law",
    desc_ar:
      "الجنحة هي جريمة يعاقب عليها القانون بعقوبات أخف مثل الحبس لمدة قصيرة أو الغرامة، بينما الجناية تُعد من الجرائم الجسيمة التي يعاقب عليها بعقوبات مشددة قد تصل إلى السجن المشدد أو المؤبد.",
    desc_en:
      "A misdemeanor is a crime punishable by lighter penalties such as short-term imprisonment or fines, while a felony is considered a serious offense that may result in severe penalties including long-term or life imprisonment.",
  },
  {
    id: 3,
    title_ar: "حقوق العامل عند الفصل التعسفي",
    title_en: "Employee Rights in Case of Unfair Dismissal",
    desc_ar:
      "يحق للعامل الذي تم فصله تعسفيًا المطالبة بالتعويض أمام المحكمة العمالية، ويُحدد التعويض بناءً على مدة الخدمة والأجر والضرر الواقع عليه نتيجة الفصل دون مبرر مشروع.",
    desc_en:
      "An employee who has been unfairly dismissed has the right to claim compensation before the labor court. The compensation is determined based on the length of service, salary, and damages caused by the unjust termination.",
  },
  {
    id: 4,
    title_ar: "كيفية توثيق العقود لضمان الحقوق",
    title_en: "How to Notarize Contracts to Protect Your Rights",
    desc_ar:
      "توثيق العقود في الشهر العقاري أو أمام الجهات المختصة يمنحها قوة قانونية أكبر، ويساعد في حماية حقوق الأطراف ومنع النزاعات المستقبلية، خاصة في عقود البيع والإيجار والشراكة.",
    desc_en:
      "Registering contracts with official authorities grants them stronger legal validity and helps protect the rights of all parties, preventing future disputes, especially in sales, lease, and partnership agreements.",
  },
  {
    id: 5,
    title_ar: "متى يسقط الحق بالتقادم؟",
    title_en: "When Does a Legal Right Expire by Limitation?",
    desc_ar:
      "يسقط الحق بالتقادم إذا انقضت مدة معينة يحددها القانون دون مطالبة صاحب الحق به. وتختلف مدة التقادم حسب نوع الحق، فقد تكون ثلاث سنوات أو خمس عشرة سنة في بعض الحالات.",
    desc_en:
      "A legal right expires by limitation if a specific period defined by law passes without the claimant demanding it. The limitation period varies depending on the type of right, ranging from three to fifteen years in certain cases.",
  },
];

const Services = () => {
  const handleAdd = () => {
    console.log("add triggered");
  };

  const handleEdit = (row: BlogType) => {
    console.log("edit", row);
  };

  const handleDelete = (rows: BlogType[]) => {
    console.log("delete", rows);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-bold">الخدمات</h2>
      </div>

      <DataTable<BlogType>
        columns={serviceColumns}
        data={blogsData}
        entityLabel="خدمة"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        // formContent={<ServiceForm />}  ← plug in your form later
      />
    </div>
  );
};

export default Services;
