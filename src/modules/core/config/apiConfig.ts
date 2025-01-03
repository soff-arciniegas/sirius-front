import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL, API_AUTH_TOKEN } from "@core/config/hooksConfig";
import {
  Feedback,
  GetChallengeRequest,
  GetFeedbackRequest,
  LoginRequest,
  LoginResponse,
} from "@interfaces/Api.interface";
import { Challenge } from "../interfaces/Shared.interface";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${API_AUTH_TOKEN}`,
  },
});

export const getLoginApi = (
  data: LoginRequest
): Promise<AxiosResponse<LoginResponse>> =>
  apiClient.post<LoginResponse>("/login/", data);

export const getChallengeApi = (
  data: GetChallengeRequest
): Promise<AxiosResponse<Challenge>> =>
  apiClient.post<Challenge>("/api/get-challenge/", data);

export const getFeedbackApi = (
  data: GetFeedbackRequest
): Promise<AxiosResponse<Feedback>> => {
  const formData = new FormData();
  formData.append("student_id", data.student_id.toString());
  formData.append("challenge_id", data.challenge_id.toString());
  formData.append("answer_type", data.answer_type);

  if ("answer_text" in data) {
    formData.append("answer_text", data.answer_text);
  } else if ("answer_audio" in data) {
    formData.append("answer_audio", data.answer_audio);
  }
  return apiClient.post<Feedback>("/api/get-feedback/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllChallengesApi = (): Promise<AxiosResponse<Challenge[]>> =>
  apiClient.get<Challenge[]>("/api/challenges/");

export default apiClient;
