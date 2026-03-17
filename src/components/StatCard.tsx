import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CardType } from "@/lib/types/overview";
import type { LucideIcon } from "lucide-react";

export const StatCard = ({
  card,
  Icon,
  title,
}: {
  card: CardType;
  Icon: LucideIcon;
  title: string;
}) => {
  const positive = card.trend === "up";
  const negative = card.trend === "down";
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <span className="text-2xl">
          <Icon />
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{card.total}</p>
        <p
          className={`mt-1 text-sm flex items-start gap-2 font-medium ${positive ? "text-emerald-600" : negative ? "text-rose-500" : "text-gray-400"}`}
        >
          <span>{positive ? "▲" : negative ? "▼" : "▬"}</span>
          <span className="flex-1">{card.change_percentage}% {" "} {card.label}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
