import React from 'react';
import { Box, Typography } from '@mui/material';
import { Quest } from '@types';
import QuizCard from '@modules/profile/components/QuizCard';

type QuizListProps = {
  quizzes: Quest[];
  emptyMessage: string;
};

const QuizList: React.FC<QuizListProps> = ({ quizzes, emptyMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        padding: 2,
      }}
    >
      {quizzes?.length > 0 ? (
        quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
      ) : (
        <Typography variant="body1" color="textSecondary">
          {emptyMessage}
        </Typography>
      )}
    </Box>
  );
};

export default QuizList;
