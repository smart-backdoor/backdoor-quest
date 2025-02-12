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
import QuizPassingView from './src/modules/quizPassing/view/QuestPassingView';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.AUTH} element={<AuthorizationLayout />} />
          <Route
            path={ROUTES.PROFILE}
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
            path={ROUTES.CREATE_QUIZ}
            element={
              <MainLayout>
                <CreateQuestController />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.QUIZ}
            element={
              <MainLayout>
                <QuizPassingView />
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
