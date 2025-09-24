import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <Card className="bg-background border-0">
      {Array.from({ length: 5 }).map((_) => (
        <div className="flex gap-5 px-3" key={`skeleton-row-${_}-${Math.random()}`}>
          <Skeleton className="h-7 w-full bg-gray-300" />
          <Skeleton className="h-7 w-full bg-gray-300" />
          <Skeleton className="h-7 w-full bg-gray-300" />
          <Skeleton className="h-7 w-full bg-gray-300" />
          <Skeleton className="h-7 w-full bg-gray-300" />
        </div>
      ))}
    </Card>
  );
};

export default SkeletonTable;
