import Skeleton from "./skeleton";

export default function AILearningCoachSkeleton() {

    return (

        <div
            className="
                rounded-3xl
                p-8
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
            "
        >

            <Skeleton className="h-8 w-56 bg-white/20"/>

            <div className="grid md:grid-cols-2 gap-5 mt-8">

                {[1,2].map((item)=>(

                    <div
                        key={item}
                        className="
                            rounded-2xl
                            bg-white/10
                            p-5
                        "
                    >

                        <Skeleton className="h-5 w-32 bg-white/20"/>

                        <Skeleton className="h-8 w-20 mt-5 bg-white/20"/>

                        <Skeleton className="h-4 w-24 mt-4 bg-white/20"/>

                    </div>

                ))}

            </div>

            <div className="mt-8">

                <Skeleton className="h-5 w-44 bg-white/20"/>

                <Skeleton className="h-4 w-full mt-5 bg-white/20"/>

                <Skeleton className="h-4 w-3/4 mt-3 bg-white/20"/>

            </div>

        </div>

    );

}