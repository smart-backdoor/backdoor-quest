import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Stack,
  Typography,
  Chip,
  LinearProgress,
} from '@mui/material';
import { Quiz } from '@types';

const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  return (
    <Card
      sx={{
        textAlign: 'start',
        flex: 1,
        padding: 3,
        borderRadius: 4,
        minWidth: 250,
        maxWidth: 350,
        boxShadow: 6,
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 10,
        },
      }}
    >
      <Stack spacing={2}>
        <CardHeader
          sx={{ padding: 0 }}
          avatar={<Avatar src={quiz?.avatar} alt={quiz?.authorName} />}
          title={quiz.title ?? 'Test name'}
          subheader={quiz?.authorName ?? 'Author unknown'}
        />
        <CardMedia
          component="img"
          height="180"
          image={quiz?.quizImage ?? 'default-image.jpg'}
          alt={quiz?.title}
          sx={{ borderRadius: 2 }}
        />
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {quiz.description}
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={1}>
          <Chip label={`${quiz.questionCount} questions`} color="primary" />
          <Chip label={`${quiz.time} min`} color="secondary" />
          <Chip
            label={quiz.category}
            variant="outlined"
            sx={{ maxWidth: 150 }}
          />
        </Stack>
        <LinearProgress
          variant="determinate"
          value={quiz.progress ?? 0}
          sx={{ height: 8, borderRadius: 5 }}
        />
      </Stack>
    </Card>
  );
};

export default QuizCard;
