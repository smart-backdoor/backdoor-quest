import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AuthorizationLayout from './src/layout/AuthorizationLayout';
import MainLayout from './src/layout/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from './src/constants';
import Theme from './src/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.AUTH} element={<AuthorizationLayout />} />
          <Route path={ROUTES.PROFILE} element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
