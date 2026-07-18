import axios from "axios";

const intelligenceAPI = axios.create({
    baseURL: process.env.INTELLIGENCE_SERVICE_URL,
});

export default intelligenceAPI;

const AI_SERVICE_URL =
  process.env.INTELLIGENCE_SERVICE_URL;

export const askEduInsight = async (snapshot, question) => {
  const response = await axios.post(
    `${AI_SERVICE_URL}/chat`,
    {
      snapshot,
      question,
    },
    {
        timeout: 30000
    }
  );

  return response.data;
};