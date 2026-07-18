import api from "./api";

export interface ChatResponse {
  answer: string;
  reasoning: string;
  recommendation: string;
}

export const chatWithAI = async (
  question: string
): Promise<ChatResponse> => {

  const response = await api.post(
    "/intelligence/chat",
    {
      question,
    }
  );

  return response.data;
};