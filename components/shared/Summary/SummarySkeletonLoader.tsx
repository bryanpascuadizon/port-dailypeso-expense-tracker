import { Skeleton } from "@/components/ui/skeleton";

const SummarySkeletonLoader = () => {
  return (
    <>
      <div className="flex-between gap-3 mb-3">
        <Skeleton className="skeleton h-10 w-26 md:w-35" />
        <Skeleton className="skeleton h-10 w-full" />
        <Skeleton className="skeleton h-10 w-26 md:w-35" />
      </div>
      <div>
        <Skeleton className="skeleton w-full h-30 mb-3" />
        <Skeleton className="skeleton w-full h-30 mb-3" />
        <Skeleton className="skeleton w-full h-30 mb-3" />
      </div>
    </>
  );
};

export default SummarySkeletonLoader;
