import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export const StatCard = ({
  label,
  value,
  change,
  Icon,
}: {
  label: string;
  value: string;
  change: number;
  Icon: LucideIcon;
}) => {
  const positive = change >= 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <span className="text-2xl"><Icon /></span>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
        <p
          className={`mt-1 text-sm font-medium ${positive ? "text-emerald-600" : "text-rose-500"}`}
        >
          {positive ? "▲" : "▼"} {Math.abs(change)}%{" "}
          {positive ? "زيادة" : "انخفاض"} عن الشهر الماضي
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
