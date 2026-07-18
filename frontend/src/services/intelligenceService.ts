import api from "./api";

export const getWeeklyReport = async (
    token: string
) => {

    const response =
        await api.get(
            "/intelligence/report",
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                },
            }
        );

    return response.data;
};