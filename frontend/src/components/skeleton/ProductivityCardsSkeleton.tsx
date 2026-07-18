import Skeleton from "./skeleton";

export default function ProductivityCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {[1,2,3].map((item) => (

        <div
          key={item}
          className="
            bg-white
            rounded-2xl
            border
            p-6
            shadow-sm
          "
        >

          <Skeleton className="w-12 h-12 rounded-full" />

          <Skeleton className="w-28 h-5 mt-5" />

          <Skeleton className="w-20 h-10 mt-4" />

          <Skeleton className="w-32 h-4 mt-4" />

        </div>

      ))}

    </div>
  );
}