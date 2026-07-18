import api from "./api";
import { ProfileResponse } from "@/types/profile";

export const getProfile = async (): Promise<ProfileResponse> => {
    const response = await api.get("/profile");
    return response.data
}