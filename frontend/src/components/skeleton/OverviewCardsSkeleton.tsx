import Skeleton from "./skeleton";

export default function OverviewCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {[...Array(4)].map((_, index) => (

        <div
          key={index}
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            border
          "
        >

          <Skeleton className="h-5 w-24" />

          <Skeleton className="h-10 w-20 mt-5" />

          <Skeleton className="h-4 w-32 mt-4" />

        </div>

      ))}

    </div>
  );
}