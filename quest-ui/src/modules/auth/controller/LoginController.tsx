import { login, registerUser } from '@api/index';
import { AuthData } from '@types';
import Cookies from 'js-cookie';

const setAuthCookies = (token: string, userId: string) => {
  Cookies.set('token', token, { expires: 7 });
  Cookies.set('userId', userId, { expires: 7 });
};

export const loginSubmit = async (data: AuthData) => {
  const response = await login(data);

  if (response?.data.token) {
    setAuthCookies(response?.data.token, String(response?.data.userId));
  }

  return response;
};

export const registerSubmit = async (data: AuthData) => {
  try {
    const registerResponse = await registerUser(data);

    if (registerResponse?.status === 200) {
      const loginResponse = await login(data);

      if (loginResponse?.data.token) {
        setAuthCookies(
          loginResponse.data.token,
          String(loginResponse.data.userId)
        );
      }

      return loginResponse;
    }

    return registerResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error');
  }
};
