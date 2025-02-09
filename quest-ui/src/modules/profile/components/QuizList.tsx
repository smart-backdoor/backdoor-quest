import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Quiz } from '@types';

type QuizListProps = {
  quizzes: Quiz[];
  emptyMessage: string;
};

const QuizList: React.FC<QuizListProps> = ({ quizzes, emptyMessage }) => {
  return (
    <Box>
      {quizzes?.length > 0 ? (
        quizzes.map((quiz) => (
          <Paper
            key={quiz.id}
            sx={{
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6">{quiz.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {quiz.description}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          {emptyMessage}
        </Typography>
      )}
    </Box>
  );
};

export default QuizList;
