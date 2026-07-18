import api from "./api";

export const getQuizzes = async (
  token: string
) => {
  const response = await api.get(
    "/quizzes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createQuiz = async (
  token: string,
  data: {
    subjectId: number;
    quizName: string;
    score: number;
    totalMarks: number;
    quizDate: string;
  }
) => {
  const response = await api.post(
    "/quizzes",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateQuiz = async (
  token: string,
  id: number,
  data: {
    subjectId: number;
    quizName: string;
    score: number;
    totalMarks: number;
    quizDate: string;
  }
) => {
  const response = await api.put(
    `/quizzes/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteQuiz = async (
  token: string,
  id: number
) => {
  const response = await api.delete(
    `/quizzes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};