import axios from "axios";

const intelligenceAPI = axios.create({
    baseURL: process.env.INTELLIGENCE_SERVICE_URL
    ? `${process.env.INTELLIGENCE_SERVICE_URL}api/intelligence`
    :  "http://127.0.0.1:8000/api/intelligence",
});

export default intelligenceAPI;

const AI_SERVICE_URL =
  `${process.env.INTELLIGENCE_SERVICE_URL}/api/intelligence`

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