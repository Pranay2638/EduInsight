export interface UserProfile {
  id: number;
  name: string;
  email: string;
  provider: string;
  created_at: string;
}

export interface LifetimeStats {
  subjects: number;
  studyHours: number;
  studySessions: number;
  quizzes: number;
  longestStreak: number;
  learningPoints: number;
}

export interface ProfileResponse {
  user: UserProfile;
  lifetimeStats: LifetimeStats;
  achievements: string[];
}