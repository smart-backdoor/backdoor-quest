import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  Modal,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const questions = [
  {
    id: 1,
    text: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    text: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'O2', 'NaCl'],
    correctAnswer: 'H2O',
  },
  {
    id: 4,
    text: 'Identify the animal in the image',
    image: 'https://example.com/sample-image.jpg',
    correctAnswer: 'Tiger',
  },
  {
    id: 5,
    text: 'Describe your favorite book.',
    type: 'open-ended',
  },
];

const QuizPassingView = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers((prev) => prev.filter((item) => item !== option));
    } else {
      setSelectedAnswers((prev) => [...prev, option]);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (
      currentQuestion.correctAnswer &&
      selectedAnswers.includes(currentQuestion.correctAnswer)
    ) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswers([]);
    } else {
      setIsFinished(true);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
          Not Quiz
        </Typography>

        {!isFinished ? (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 5, mb: 3 }}
            />

            <Stack direction="row" alignItems="center">
              <IconButton
                disableRipple
                sx={{ mb: '16px', color: '#4257b2' }}
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
              >
                <ArrowBackIosIcon />
              </IconButton>

              <Typography variant="h6" fontWeight="bold" mb={2}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
            </Stack>

            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {questions[currentQuestionIndex].text}
              </Typography>
              {questions[currentQuestionIndex].image && (
                <img
                  src={questions[currentQuestionIndex].image}
                  alt="Question related"
                  style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
                />
              )}

              {questions[currentQuestionIndex].options ? (
                <Stack spacing={1}>
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={selectedAnswers.includes(option)}
                            onChange={() => handleAnswerSelect(option)}
                            sx={{
                              color: '#4257b2',
                              '&.Mui-checked': {
                                color: '#9370db',
                              },
                            }}
                          />
                        }
                        label={option}
                        sx={{
                          borderRadius: 2,
                          bgcolor: selectedAnswers.includes(option)
                            ? '#e8eaf6'
                            : 'transparent',
                          p: 1,
                          transition: 'background-color 0.3s',
                          '&:hover': {
                            bgcolor: '#e8eaf6',
                          },
                        }}
                      />
                    )
                  )}
                </Stack>
              ) : (
                <textarea
                  placeholder="Type your answer here..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 4,
                    border: '1px solid #ccc',
                  }}
                />
              )}
            </Paper>

            <Stack direction="row" justifyContent="flex-end">
              <Button
                onClick={handleNextQuestion}
                variant="contained"
                disabled={
                  selectedAnswers.length === 0 &&
                  !questions[currentQuestionIndex].options
                }
                sx={{
                  backgroundColor: '#4257b2',
                  '&:hover': { backgroundColor: '#9370db' },
                  fontWeight: 'bold',
                  borderRadius: 3,
                  textTransform: 'none',
                }}
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Next Question'
                  : 'Finish'}
              </Button>
            </Stack>
          </>
        ) : (
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              textAlign="center"
            >
              Quiz Result
            </Typography>
            <Typography variant="body1" textAlign="center">
              You answered correctly {score} out of {questions.length}{' '}
              questions.
            </Typography>
          </Paper>
        )}
      </Box>
    </Modal>
  );
};

export default QuizPassingView;
