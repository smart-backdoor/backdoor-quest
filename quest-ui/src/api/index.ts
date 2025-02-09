import axios, { AxiosResponse } from 'axios';
import { API } from '@constants';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from '@types';

export const login = async (data: LoginData): Promise<LoginResponse> => {
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
  data: RegisterData
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
