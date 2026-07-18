import Card from "@/components/ui/Card";
import {
    Sparkles,
    CalendarRange,
    TrendingUp,
    FileText,
} from "lucide-react";

export default function ComingSoonCard() {

    return (

        <Card>

            <div className="flex items-center gap-3">

                <Sparkles className="text-amber-500" />

                <h2 className="text-xl font-semibold">

                    Coming Soon

                </h2>

            </div>

            <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3">

                    <CalendarRange />

                    <span>Smart Study Planner</span>

                </div>

                <div className="flex items-center gap-3">

                    <TrendingUp />

                    <span>Performance Forecast</span>

                </div>

                <div className="flex items-center gap-3">

                    <FileText />

                    <span>Notes Q&A (RAG)</span>

                </div>

            </div>

        </Card>

    );

}