import { login, registerUser } from '@api/index';
import { ROUTES } from '@constants';
import { AuthData } from '@types';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const loginSubmit = async (data: AuthData) => {
  const response = await login(data);

  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 7 });
    Cookies.set('userId', String(response.data.userId), { expires: 7 });
  }

  return response;
};

export const registerSubmit = async (data: AuthData) => {
  try {
    const registerResponse = await registerUser(data);

    if (registerResponse.status === 200) {
      const loginResponse = await login(data);

      if (loginResponse.data.token) {
        Cookies.set('token', loginResponse.data.token, { expires: 7 });
        Cookies.set('userId', String(loginResponse.data.userId), { expires: 7 });
      }

      return loginResponse;
    }

    return registerResponse;
  } catch (error) {
    throw new Error('Unknown error');
  }
};
