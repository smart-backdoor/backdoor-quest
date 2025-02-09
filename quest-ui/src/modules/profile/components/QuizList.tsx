import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { MyQuiz, Quiz } from '@types';
import QuizCard from '@modules/profile/components/QuizCard';

type QuizListProps = {
  quizzes: Quiz[] | MyQuiz[];
  emptyMessage: string;
};

const QuizList: React.FC<{
  quizzes: Quiz[] | MyQuiz[];
  emptyMessage: string;
}> = ({ quizzes, emptyMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
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
