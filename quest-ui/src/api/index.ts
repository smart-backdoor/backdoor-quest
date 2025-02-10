import axios, { AxiosResponse } from 'axios';
import { API } from '@constants';
import { AuthData, LoginResponse, Quest, RegisterResponse } from '@types';

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
    const response: AxiosResponse<Quest[]> = await axios.get(API.QUESTS);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error('Unknown error');
  }
};
