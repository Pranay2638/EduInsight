import api from "./api";

export const getStudySessions = async (
  token: string
) => {
  const response = await api.get(
    "/studySessions",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createStudySession = async (
  token: string,
  data: {
    subjectId: number;
    duration: number;
    notes: string;
    sessionDate: string;
  }
) => {
  const response = await api.post(
    "/studySessions",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateStudySession = async (
  token: string,
  id: number,
  data: {
    subjectId: number;
    duration: number;
    notes: string;
    sessionDate: string;
  }
) => {
  const response = await api.put(
    `/studySessions/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteStudySession = async (
  token: string,
  id: number
) => {
  const response = await api.delete(
    `/studySessions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};