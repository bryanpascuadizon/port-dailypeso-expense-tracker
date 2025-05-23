import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div>
      <Skeleton className="skeleton h-5 w-28 md:w-35 m-auto mb-7 mt-5" />
      <div className="flex-between gap-3 mb-7">
        <Skeleton className="skeleton h-5 w-26 md:w-35" />
        <Skeleton className="skeleton h-5 w-full" />
        <Skeleton className="skeleton h-5 w-26 md:w-35" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-7">
        <Skeleton className="skeleton h-5" />
        <Skeleton className="skeleton h-5" />
        <Skeleton className="skeleton h-5" />
      </div>
      <Skeleton className="skeleton-data h-15" />
    </div>
  );
};

export default SkeletonLoader;
