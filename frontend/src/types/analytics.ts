export interface OverviewData {
  totalStudyHours: string;
  subjectsCount: number;
  totalQuizzes: number;
  averageQuizPercentage: string;
}

export interface StudyTrendData {
  date: string;
  hours: number;
}

export interface SubjectAnalysisData {
  id: number;
  name: string;
  studyHours: string;
  totalQuizzes: number;
  averageScore: string;
}

export interface ProductivityData {
  studyStreak: number;
  averageSessionDuration: number;
  longestSession: number;
  totalSessions: number;
}

export interface Recommendation {
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
}

export interface SubjectPerformance {
  id: number;
  name: string;
  average_score: string;
  total_minutes?: string;
  daysWithoutStudy?: number;
}

export interface LearningCoachData {
  strongestSubject: SubjectPerformance | null;
  weakestSubject: SubjectPerformance | null;
  mostStudied: SubjectPerformance | null;
  neglectedSubject: SubjectPerformance | null;
  recommendation: Recommendation;
}