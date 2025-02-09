import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Quiz } from '@types';
import QuizList from '@modules/profile/components/QuizList';

type ProfileTabsProps = {
  passedQuizzes: Quiz[];
  myQuizzes: Quiz[];
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          onClick={() => handleTabChange(0)}
          sx={{
            fontWeight: 'bold',
            color: tabIndex === 0 ? '#4257b2' : '#2d2d2d',
            borderBottom: tabIndex === 0 ? '2px solid #4257b2' : 'none',
            fontSize: '1.2rem',
          }}
        >
          Passed Quiz
        </Button>
        <Button
          onClick={() => handleTabChange(1)}
          sx={{
            fontWeight: 'bold',
            color: tabIndex === 1 ? '#4257b2' : '#2d2d2d',
            borderBottom: tabIndex === 1 ? '2px solid #4257b2' : 'none',
            fontSize: '1.2rem',
          }}
        >
          My Quiz
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && (
          <QuizList
            quizzes={passedQuizzes}
            emptyMessage="No quiz have been passed yet."
          />
        )}
        {tabIndex === 1 && (
          <QuizList quizzes={myQuizzes} emptyMessage="No quiz created yet." />
        )}
      </Box>
    </Box>
  );
};

export default ProfileTabs;
