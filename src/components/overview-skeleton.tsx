import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpecialHeader from "@/components/SpecialHeader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OverviewSkeleton = () => {
  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <SpecialHeader title="نظرة عامة" />

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton height={16} width={120} />
              </CardTitle>
              <Skeleton circle height={32} width={32} />
            </CardHeader>
            <CardContent>
              <Skeleton height={32} width={80} className="mb-2" />
              <Skeleton height={12} width={140} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            <Skeleton height={20} width={200} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] flex items-center justify-center bg-muted/30 rounded-md">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <Skeleton height={220} width="95%" />
              <div className="flex w-[95%] gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} height={12} width="100%" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                <Skeleton height={16} width={150} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                <div className="w-full h-[170px] px-4 flex items-end gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-full">
                      <Skeleton
                        height={`${Math.random() * 100 + 40}px`}
                        width="100%"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OverviewSkeleton;
