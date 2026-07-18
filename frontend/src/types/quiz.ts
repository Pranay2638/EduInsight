export interface Quiz {
  id: number;

  subjects_id: number;

  subject_name: string;

  quize_name: string;

  score: number;

  total_marks: number;

  quize_date: string;

  remarks?: string;
}