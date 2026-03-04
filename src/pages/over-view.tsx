import SpecialHeader from "@/components/SpecialHeader";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthsNames } from "@/config/months-names";
import { Box, MessageCircle, Phone, Rss } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
  type ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
);

const lineData = monthsNames.map((m, i) => ({
  name: m,
  طلبات: Math.round(80 + Math.sin(i * 0.7) * 30 + i * 8),
  رسائل: Math.round(120 + Math.cos(i * 0.5) * 40 + i * 5),
  تعليقات: Math.round(60 + Math.sin(i * 0.9) * 20 + i * 6),
}));

const barData = [
  { service: "القضايا الجزائية", count: 142 },
  { service: "القضايا المدنية", count: 98 },
  { service: "القضايا التجارية", count: 76 },
  { service: "القضايا العمالية", count: 65 },
  { service: "قضايا الأحوال الشخصية", count: 53 },
  { service: "القضايا الإدارية", count: 44 },
  { service: "القضايا التنفيذ", count: 130 },
  { service: "التحكيم وتسوية المنازعات", count: 16 },
];

const stats = [
  { label: "عدد الطلبات", value: "1,284", change: +12, Icon: Box },
  { label: "عدد الرسائل", value: "3,920", change: -8, Icon: Phone },
  { label: "عدد التعليقات", value: "876", change: +20, Icon: MessageCircle },
  { label: "عدد المدونات", value: "134", change: -3, Icon: Rss },
];

const mainColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--main-color")
  .trim();

const mainDarkerColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--main-darker-color")
  .trim();

const barChartData = {
  labels: barData.map((d) => d.service),
  datasets: [
    {
      label: "عدد الطلبات",
      data: barData.map((d) => d.count),
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
      bodyColor: "#cbd5e1",
      padding: 10,
      cornerRadius: 8,
    },
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748b", font: { size: 11 } },
    },
    y: {
      grid: { color: "#f1f5f9" },
      ticks: { color: "#94a3b8", font: { size: 11 } },
    },
  },
};

function makeLineChartData(key: "طلبات" | "رسائل" | "تعليقات", color: string) {
  return {
    labels: lineData.map((d) => d.name),
    datasets: [
      {
        label: key,
        data: lineData.map((d) => d[key]),
        borderColor: color,
        backgroundColor: `${color}22`,
        borderWidth: 2.5,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  };
}

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: "rgba(15,23,42,0.85)",
      titleColor: "#f1f5f9",
      bodyColor: "#cbd5e1",
      padding: 10,
      cornerRadius: 8,
    },
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#94a3b8", font: { size: 9 }, maxTicksLimit: 6 },
    },
    y: {
      grid: { color: "#f8fafc" },
      ticks: { color: "#94a3b8", font: { size: 10 } },
    },
  },
};

const lineConfigs = [
  {
    key: "طلبات" as const,
    color: "#10b981",
    title: "الطلبات عبر العام",
  },
  { key: "رسائل" as const, color: mainColor, title: "الرسائل عبر العام" },
  { key: "تعليقات" as const, color: "#ff0000", title: "التعليقات عبر العام" },
];

const Overview = () => (
  <div dir="rtl" className="space-y-6 min-h-screen">
    <SpecialHeader title="نظرة عامة" />

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">أكثر الخدمات طلباً</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: 280 }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {lineConfigs.map(({ key, color, title }) => (
        <Card key={key}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 200 }}>
              <Line
                data={makeLineChartData(key, color)}
                options={lineOptions}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Overview;
