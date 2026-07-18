import intelligenceAPI from "./intelligenceService.js";

export const generateWeeklyReport = async (payload) => {

    const response =
        await intelligenceAPI.post(
            "/analyze",
            payload
        );

    return response.data;
};