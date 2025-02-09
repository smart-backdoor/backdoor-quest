import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import QuizCard from '@modules/quizzes/components/QuizCard';
import QuizFilter from '@modules/quizzes/components/QuizFilter';
import { fetchQuizzes } from '@modules/quizzes/controller/QuizController';
import CreateQuizButton from '@modules/quizzes/components/CreateQuizButton';
import { ROUTES } from '@constants';
import { Quiz } from '@types';

const QuizListView = () => {
  const navigate = useNavigate();

  const handleCreteQuiz = () => {
    navigate(ROUTES.CREATE_QUIZ);
  };

  const handleOpenQuiz = (id: string) => {
    navigate(ROUTES.QUIZ.replace(':id', id));
  };

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await fetchQuizzes();
      setQuizzes(data);
    };
    loadQuizzes();
  }, []);

  return (
    <Container sx={{ marginTop: 10, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Quizzes
      </Typography>
      <Box>
        <QuizFilter />
      </Box>
      <CreateQuizButton onClick={handleCreteQuiz} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {quizzes.map((quiz) => (
          <Box
            key={quiz?.id as string}
            sx={{
              width: { xs: '100%', sm: '48%', md: '30%' },
              cursor: 'pointer',
            }}
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
