import api from "./api";

export const getSubjects = async (token: string) => {
  const response = await api.get("/subjects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createSubject = async (
  token: string,
  name: string
) => {
  const response = await api.post(
    "/subjects",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateSubject = async (
  token: string,
  id: number,
  name: string
) => {
  const response = await api.put(
    `/subjects/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteSubject = async (
  token: string,
  id: number
) => {
  const response = await api.delete(
    `/subjects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};