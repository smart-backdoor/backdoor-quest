import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AuthorizationLayout from './src/layout/AuthorizationLayout';
import MainLayout from './src/layout/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from './src/constants';
import Theme from './src/theme';
import ProfileView from './src/modules/profile/view/ProfileView';
import QuestGridView from './src/modules/questsGrid/view/QuestGridView';
import CreateQuestController from './src/modules/questsGrid/controller/CreateQuestController';
import QuestPassingView from './src/modules/questPassing/view/QuestPassingView';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.AUTH} element={<AuthorizationLayout />} />
          <Route
            path={ROUTES.PROFILE.replace(':id', String(Cookies.get('userId')))}
            element={
              <MainLayout>
                <ProfileView />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.ROOT}
            element={
              <MainLayout>
                <QuestGridView />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.CREATE_QUEST}
            element={
              <MainLayout>
                <CreateQuestController />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.QUEST}
            element={
              <MainLayout>
                <QuestPassingView />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
