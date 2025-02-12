import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { fetchQuizzes } from '@modules/questsGrid/controller/QuestsGridController';
import {
  boxStyles,
  quizCardStyles,
  titleStyles,
} from '@modules/questsGrid/styles';
import { QuizCard, EmptyQuizCard } from '@components';
import { ROUTES } from '@constants';
import { Quest } from '@types';

const QuizListView = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quest[]>([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      }
    };
    loadQuizzes();
  }, []);

  const handleCreateQuiz = useCallback(() => {
    navigate(ROUTES.CREATE_QUIZ);
  }, [navigate]);

  const handleOpenQuiz = useCallback(
    (id: number) => {
      navigate(ROUTES.QUIZ.replace(':id', String(id)));
    },
    [navigate]
  );

  return (
    <Container sx={{ marginTop: 2, textAlign: 'center' }}>
      <Typography gutterBottom sx={titleStyles}>
        Quests
      </Typography>

      <Box sx={boxStyles}>
        <Box sx={quizCardStyles}>
          <EmptyQuizCard handleCreteQuiz={handleCreateQuiz} />
        </Box>
        {quizzes?.map((quiz) => (
          <Box
            key={quiz?.id}
            sx={quizCardStyles}
            onClick={() => handleOpenQuiz(quiz.id)}
          >
            <QuizCard quiz={quiz} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default QuizListView;
