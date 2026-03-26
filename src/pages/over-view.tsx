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
import { useOverView } from "@/lib/querykeys/overview-query";
import OverviewSkeleton from "@/components/overview-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
);

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
    { title: "عدد الطلبات", card: overView.service_requests, Icon: Box },
    { title: "عدد الرسائل", card: overView.contact_us, Icon: Phone },
    { title: "عدد التعليقات", card: overView.comments, Icon: MessageCircle },
    { title: "عدد الاشتراكات", card: overView.newsletter_subscriptions, Icon: Rss },
  ];

  const barChartData = {
    labels: overView.most_requested_services.map((item) => item.title),
    datasets: [
      {
        label: "عدد الطلبات",
        data: overView.most_requested_services.map((item) => item.total),
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

  const lineLabelsShort = overView.yearly_charts.months.map(
    (m) => monthsNames[m - 1] || `شهر ${m}`,
  );

  const lineLabelsFull = overView.yearly_charts.months.map((m, i) => {
    const monthName = monthsNames[m - 1] || `شهر ${m}`;
    const year = overView.yearly_charts.years[i] ?? "";
    return `${monthName} ${year}`.trim();
  });

  const makeLineChartData = (
    key: "requests" | "messages" | "comments" | "subscriptions",
    color: string,
    label: string,
  ) => ({
    labels: lineLabelsShort,
    datasets: [
      {
        label,
        data: overView.yearly_charts[key],
        borderColor: color,
        backgroundColor: `${color}22`,
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        tension: 0.4,
        fill: true,
      },
    ],
  });

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
        callbacks: {
          title: (items) => lineLabelsFull[items[0].dataIndex],
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 15 },
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f8fafc" },
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
          precision: 0,
          stepSize: 10,
          callback: (value) => Math.round(Number(value)),
        },
      },
    },
  };

  const lineConfigs = [
    { key: "requests" as const, color: "#10b981", title: "الطلبات عبر العام" },
    { key: "messages" as const, color: mainColor, title: "الرسائل عبر العام" },
    { key: "comments" as const, color: "#ef4444", title: "التعليقات عبر العام" },
    { key: "subscriptions" as const, color: "#14192b", title: "الأشتراكات عبر العام" },
  ];

  return (
    <div className="space-y-6 min-h-screen">
      <SpecialHeader title="نظرة عامة" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, index) => (
          <StatCard key={index} card={s.card} title={s.title} Icon={s.Icon} />
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

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
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
                  data={makeLineChartData(key, color, title.replace(" عبر العام", ""))}
                  options={lineOptions}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;