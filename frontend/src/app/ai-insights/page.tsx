"use client";

import AppShell from "@/components/layout/AppShell";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageHeader from "@/components/ui/PageHeader";
import { useEffect, useState } from "react";
import { getWeeklyReport } from "@/services/intelligenceService";
import { IntelligenceResponse } from "@/types/intelligence";
import WeeklyReportCard from "@/components/AI/WeeklyReportCard";
import AICoachCard from "@/components/AI/AICoachCard";
import ChatAssistantCard from "@/components/AI/ChatAssistantCard";
import ComingSoonCard from "@/components/AI/ComingSoonCard";

export default function AIInsightsPage() {
    const [report, setReport] = useState<IntelligenceResponse | null>(null);
    useEffect(() => {

        const fetchReport = async () => {

            try {
 
                const token =
                    localStorage.getItem("token");

                if (!token) return;

                const response =
                    await getWeeklyReport(token);

                setReport(response.data);
                console.log("Fetching report...");
                const data = await getWeeklyReport(token);

                console.log("j",data);

            }

            catch(error){

                console.error(error);

            }

        };
        
        

        fetchReport();

    }, []);

    return (

        <ProtectedRoute>

            <AppShell>

                <div className="space-y-8">

                    <PageHeader
                        title="AI Insights" 
                        subtitle="Personalized learning intelligence powered by EduInsight."
                    />

                    <WeeklyReportCard
                        report={report}
                    />

                    <AICoachCard 
                       report={report}
                    />

                    <div className="grid lg:grid-cols-2 gap-6">

                        <ChatAssistantCard />

                        <ComingSoonCard />

                    </div>

                </div>

            </AppShell>

        </ProtectedRoute>

    );

}