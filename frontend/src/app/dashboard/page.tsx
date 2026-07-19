"use client";
import { useEffect, useState } from "react";
import { StudyTrendData,OverviewData,SubjectAnalysisData } from "@/types/analytics";
import OverviewCards from "@/components/dashboard/OverviewCards";
import StudyTrendChart from "@/components/dashboard/studyTrendChart";
import AILearningCoach from "@/components/dashboard/AILearingCoach";
import { LearningCoachData } from "@/types/analytics";
import { getLearningCoach, getProductivity } from "@/services/analyticsService";
import PageHeader from "@/components/ui/PageHeader"
import {
  getOverview,
  getStudyTrend,
  getSubjectAnalysis,
} from "@/services/analyticsService";
import AppShell from "@/components/layout/AppShell";
import { ProductivityData } from "@/types/analytics";
import ProductivityCards from "@/components/dashboard/productivityCards";
import SubjectAnalysisCard from "@/components/dashboard/subjectAnalysisCard";
import OverviewCardsSkeleton from "@/components/skeleton/OverviewCardsSkeleton";
import ProductivityCardsSkeleton from "@/components/skeleton/ProductivityCardsSkeleton";
import AILearningCoachSkeleton from "@/components/skeleton/AILearningCoachSkeleton";

export default function DashboardPage() {
  const [overview, setOverview] =
  useState<OverviewData | null>(null);

  const [studyTrend, setStudyTrend] =
  useState<StudyTrendData[]>([]);

  const [subjects, setSubjects] =
  useState<SubjectAnalysisData[]>([]);
  const [coach, setCoach] =
  useState<LearningCoachData | null>(null);
  const [productivity, setProductivity] = useState<ProductivityData | null>(null);
  useEffect(() => {
  const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const overviewRes = await getOverview(token);
    const trendRes = await getStudyTrend(token);
    const subjectRes = await getSubjectAnalysis(token);
    const coachRes = await getLearningCoach(token);
    const productivity = await getProductivity(token)


    setOverview(overviewRes.data);
    setStudyTrend(trendRes.data);
    setSubjects(subjectRes.data);
    setCoach(coachRes.data);
    setProductivity(productivity.data)

  } catch (error) {
    console.error(error);
  }
};

    fetchAnalytics();
  }, []);
  return (
    <AppShell>

  <div className="space-y-8">

    <PageHeader
      title="Dashboard"
      subtitle="Track your learning journey with AI-powered insights."
    />

    {overview ? (
      <OverviewCards
        overview={overview}
      />
    ) : (
      <OverviewCardsSkeleton />
    )}

    {productivity ? (

        <ProductivityCards
            productivity={productivity}
        />

    ) : (

        <ProductivityCardsSkeleton/>

    )}

   {coach ? (

        <AILearningCoach
            coach={coach}
        />

    ) : (

        <AILearningCoachSkeleton/>

    )}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      "
    >

      <StudyTrendChart
        data={studyTrend}
      />

      <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-5">
              Subject Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {subjects.map((subject) => (

                  <SubjectAnalysisCard
                      key={subject.id}
                      subject={subject}
                  />

              ))}

          </div>
      </div>

    </div>

  </div>

</AppShell>
  );
}