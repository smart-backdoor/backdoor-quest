import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { MyQuiz, Quiz } from '@types';
import QuizList from '@modules/profile/components/QuizList';

type ProfileTabsProps = {
  passedQuizzes: Quiz[];
  myQuizzes: MyQuiz[];
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  passedQuizzes,
  myQuizzes,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="center" spacing={4} mb={3}>
        <Button
          onClick={() => handleTabChange(0)}
          sx={tabButtonStyle(tabIndex === 0)}
        >
          Passed Quiz
        </Button>
        <Button
          onClick={() => handleTabChange(1)}
          sx={tabButtonStyle(tabIndex === 1)}
        >
          My Quiz
        </Button>
      </Stack>

      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 ? (
          <QuizList
            quizzes={passedQuizzes}
            emptyMessage="No quiz have been passed yet."
          />
        ) : (
          <QuizList quizzes={myQuizzes} emptyMessage="No quiz created yet." />
        )}
      </Box>
    </Box>
  );
};

const tabButtonStyle = (isActive: boolean) => ({
  fontWeight: 'bold',
  color: isActive ? '#4257b2' : '#2d2d2d',
  borderBottom: isActive ? '2px solid #4257b2' : 'none',
  fontSize: '1.2rem',
});

export default ProfileTabs;
