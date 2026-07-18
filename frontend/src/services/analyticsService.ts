import api from "./api";

export const getOverview = async (
  token: string
) => {
console.log("Frontend Token:", token);
  const response = await api.get(
    "/analytics/overview",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getStudyTrend = async (
  token: string
) => {

  const response = await api.get(
    "/analytics/study-trend",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSubjectAnalysis =
  async (token: string) => {

    const response = await api.get(
      "/analytics/subject-analysis",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

export const getLearningCoach = async (token: string) => {
  const response = await api.get(
    "/analytics/learning-coach",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getProductivity = async (
  token: string
) => {
  const response = await api.get(
    "/analytics/productivity",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};