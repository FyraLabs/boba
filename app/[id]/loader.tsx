import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return <Skeleton className="h-[200px] w-full rounded-xl" />;
};

export const Loader = () => {
  return (
    <main className="flex flex-wrap gap-6">
      <div className="flex flex-col gap-6 basis-96 flex-1">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="flex flex-col gap-6 basis-96 flex-1">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="basis-96 flex-1">
        <SkeletonCard />
      </div>
    </main>
  );
};
