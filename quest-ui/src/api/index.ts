import axios, { AxiosResponse } from 'axios';
import { API } from '@constants';
import {
  AuthData,
  LoginResponse,
  Quest,
  RegisterResponse,
  StartQuest,
  TaskResponse,
} from '@types';

export const login = async (data: AuthData): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      API.AUTH.LOGIN,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error('Unknown error');
  }
};

export const registerUser = async (
  data: AuthData
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      API.AUTH.REGISTER,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error('Unknown error');
  }
};

export const fetchQuests = async (): Promise<Quest[]> => {
  try {
    const response: AxiosResponse<Quest[]> = await axios.get(API.ALL_QUESTS);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error('Unknown error');
  }
};

export const startQuest = async (id: string): Promise<StartQuest> => {
  try {
    const response: AxiosResponse<StartQuest> = await axios.get(
      API.START_QUEST.replace(':id', id)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Error fetching start quest'
      );
    }
    throw new Error('Unknown error');
  }
};

export const submitTaskAnswer = async (
  id: string,
  payload: { taskId: number; answerId: number }
): Promise<TaskResponse> => {
  try {
    const response: AxiosResponse<TaskResponse> = await axios.post(
      API.VALIDATE_QUEST.replace(':id', id),
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Error fetching start quest'
      );
    }
    throw new Error('Unknown error');
  }
};
