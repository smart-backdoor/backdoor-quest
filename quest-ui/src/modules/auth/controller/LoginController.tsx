import { login, registerUser } from '@api/index';
import { AuthData } from '@types';

export const loginSubmit = async (data: AuthData) => {
  const response = await login(data);
  return response;
};

export const registerSubmit = async (data: AuthData) => {
  const response = await registerUser(data);
  return response;
};
