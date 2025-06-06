import { Skeleton } from "../../ui/skeleton";

const TransactionSkeletonLoader = ({
  isCalendar,
}: {
  isCalendar?: boolean;
}) => {
  return (
    <div>
      <div className="flex-between gap-3 mb-7">
        <Skeleton className="skeleton h-10 w-26 md:w-35" />
        <Skeleton className="skeleton h-10 w-full" />
        <Skeleton className="skeleton h-10 w-26 md:w-35" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-7">
        <Skeleton className="skeleton h-10" />
        <Skeleton className="skeleton h-10" />
        <Skeleton className="skeleton h-10" />
      </div>
      {!isCalendar ? (
        <Skeleton className="skeleton-data h-15" />
      ) : (
        <Skeleton className="skeleton-data w-30 h-20" />
      )}
    </div>
  );
};

export default TransactionSkeletonLoader;
