import SpecialHeader from "@/components/SpecialHeader";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, MessageCircle, Phone } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useOverView } from "@/lib/querykeys/overview-query";
import OverviewSkeleton from "@/components/overview-skeleton";
import type { CardType } from "@/lib/types/overview";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const convertStatItemToCardType = (
  item: { count: number; percentage: number; trend: "neutral" | "up" | "down" },
  label: string,
): CardType => ({
  total: item.count,
  change_percentage: item.percentage,
  trend: item.trend,
  label,
});

const mainColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--main-color")
  .trim();

const mainDarkerColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--main-darker-color")
  .trim();

const Overview = () => {
  const { data: overView, isLoading } = useOverView();

  if (isLoading || !overView) {
    return <OverviewSkeleton />;
  }

  const stats = [
    {
      title: "عدد الخدمات",
      card: convertStatItemToCardType(overView.services, "الخدمات"),
      Icon: Box,
    },
    {
      title: "عدد طلبات الخدمات",
      card: convertStatItemToCardType(overView.service_requests, "الطلبات"),
      Icon: Phone,
    },
    {
      title: "عدد رسائل التواصل",
      card: convertStatItemToCardType(overView.contact_us, "الرسائل"),
      Icon: MessageCircle,
    },
  ];

  const barChartData = {
    labels: overView.requests_by_service.map((item) => item.service),
    datasets: [
      {
        label: "عدد الطلبات",
        data: overView.requests_by_service.map((item) => item.count),
        backgroundColor: mainColor,
        hoverBackgroundColor: mainDarkerColor,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.85)",
        titleColor: "#f1f5f9",
        bodyColor: "#44295a",
        padding: 10,
        cornerRadius: 8,
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
          stepSize: 5,
          precision: 0,
          callback: (value) => Math.round(Number(value)),
        },
      },
    },
  };

  return (
    <div className="space-y-6 min-h-screen">
      <SpecialHeader title="نظرة عامة" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s, index) => (
          <StatCard key={index} card={s.card} title={s.title} Icon={s.Icon} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">طلبات الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 280 }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
