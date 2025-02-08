import { type RouteObject } from 'react-router';

import { ROUTES } from '@constants';
import AuthorizationLayout from '@layout/AuthorizationLayout';

const AuthRoutes: RouteObject = {
  children: [],
  element: <AuthorizationLayout />,
  path: ROUTES.AUTH.LOGIN,
};

export default AuthRoutes;
