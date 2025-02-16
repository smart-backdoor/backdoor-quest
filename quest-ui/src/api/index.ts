import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { API } from '@constants';
import {
  AuthData,
  CreateQuestRequest,
  CreateQuestResponse,
  LoginResponse,
  Quest,
  RegisterResponse,
  StartQuest,
  TaskResponse,
  User,
} from '@types';

const getTokenFromCookies = () => {
  return Cookies.get('token');
};

axios.interceptors.request.use((config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || 'Unknown error');
  }
  throw new Error('Unknown error');
};

export const login = async (data: AuthData) => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      API.AUTH.LOGIN,
      data
    );

    return response;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (data: AuthData) => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      API.AUTH.REGISTER,
      data
    );

    return response;
  } catch (error) {
    handleError(error);
  }
};

export const createQuest = async (
  data: CreateQuestRequest
): Promise<CreateQuestResponse | undefined> => {
  try {
    const response: AxiosResponse<CreateQuestResponse> = await axios.post(
      API.QUEST.ALL_QUESTS,
      data
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchQuests = async (): Promise<Quest[] | undefined> => {
  try {
    const response: AxiosResponse<Quest[]> = await axios.get(
      API.QUEST.ALL_QUESTS
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const startQuest = async (
  id: string
): Promise<StartQuest | undefined> => {
  try {
    const response: AxiosResponse<StartQuest> = await axios.post(
      API.QUEST.START_QUEST.replace(':id', id)
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const submitTaskAnswer = async (
  id: string,
  payload: { taskId: number; answerId: number }
): Promise<TaskResponse | undefined> => {
  try {
    const response: AxiosResponse<TaskResponse> = await axios.post(
      API.QUEST.VALIDATE_QUEST.replace(':id', id),
      payload
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const onQuestComplete = async (
  id: string,
  payload: { correctAnswers: boolean[]; rate: number }
) => {
  try {
    const response: AxiosResponse<User> = await axios.post(
      API.QUEST.QUEST_COMPLETE.replace(':id', id),
      payload
    );

    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getUserProfile = async (id: string): Promise<User | undefined> => {
  try {
    const response: AxiosResponse<User> = await axios.get(
      API.USER.replace(':id', id)
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserProfile = async (
  id: string,
  payload: { firstName: string; lastName: string; file: string }
): Promise<User | undefined> => {
  try {
    const response: AxiosResponse<User> = await axios.post(
      API.USER.replace(':id', id),
      payload
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(API.UPLOAD_FILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
