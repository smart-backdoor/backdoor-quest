import { login, registerUser } from '@api/index';
import { LoginData, RegisterData } from '@types';

export const loginSubmit = async (data: LoginData) => {
  const response = await login(data);
  return response;
};

export const registerSubmit = async (data: RegisterData) => {
  const response = await registerUser(data);
  return response;
};
