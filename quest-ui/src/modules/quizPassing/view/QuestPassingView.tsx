import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import CloseIcon from '@mui/icons-material/Close';
import {
  fetchQuestions,
  submitQuestion,
} from '@modules/quizPassing/controller/QuestPassingController';
import { StartQuest } from '@types';
import { ROUTES } from '@constants/routes';
import { onQuestComplete } from '@api';
import StarIcon from '@mui/icons-material/Star';

const QuestPassingView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [quest, setQuest] = useState<StartQuest | null>(null);
  const [score, setScore] = useState(0);
  const [rate, setRate] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    const loadQuest = async () => {
      try {
        if (id) {
          const data = await fetchQuestions(id);
          setQuest(data);
        }
      } catch (error) {
        console.error('Failed to fetch quest:', error);
      }
    };
    loadQuest();
  }, [id]);

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswers((prev) =>
      prev.includes(answerId)
        ? prev.filter((id) => id !== answerId)
        : [...prev, answerId]
    );
  };

  const handleNextTask = async () => {
    if (quest && id) {
      try {
        const nextTaskIndex = currentTaskIndex + 1;
        const isLastTask = quest.total === nextTaskIndex;

        const payload = {
          taskId: quest.currentTask.id,
          answerId: selectedAnswers[0],
          nextTaskIndex: isLastTask ? null : nextTaskIndex,
        };

        const response = await submitQuestion(id, payload);

        setCorrectAnswers(response.correctAnswers);
        if (response.correctAnswers.includes(true)) {
          setScore((prev) => prev + 1);
        }

        if (response.nextTask) {
          setQuest((prev) => ({ ...prev!, currentTask: response.nextTask }));
          setCurrentTaskIndex(nextTaskIndex);
          setSelectedAnswers([]);
        } else {
          setIsFinished(true);
        }
      } catch (error) {
        console.error('Failed to submit answer:', error);
      }
    }
  };

  const handleComplete = async () => {
    if (id && rate !== null) {
      const payload = { correctAnswers, rate };
      try {
        await onQuestComplete(id, payload);
        setIsModalOpen(false);
        navigate(ROUTES.ROOT);
      } catch (error) {
        console.error('Failed to complete quest:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(ROUTES.ROOT);
  };

  const progress = quest ? ((currentTaskIndex + 1) / quest.total) * 100 : 0;

  if (!quest) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
          Quest {quest.questId}
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
                onClick={() => setCurrentTaskIndex(currentTaskIndex - 1)}
                disabled={currentTaskIndex === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Task {currentTaskIndex + 1} of {quest.total}
              </Typography>
            </Stack>

            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {quest.currentTask.title}
              </Typography>
              {quest.currentTask.file && (
                <img
                  src={quest.currentTask.file}
                  alt="Task"
                  style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
                />
              )}
              <Stack spacing={1}>
                {quest.currentTask.answers.map((answer) => (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox
                        checked={selectedAnswers.includes(answer.id)}
                        onChange={() => handleAnswerSelect(answer.id)}
                        sx={{
                          color: '#4257b2',
                          '&.Mui-checked': {
                            color: '#9370db',
                          },
                        }}
                      />
                    }
                    label={answer.title}
                    sx={{
                      borderRadius: 2,
                      bgcolor: selectedAnswers.includes(answer.id)
                        ? '#e8eaf6'
                        : 'transparent',
                      p: 1,
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        bgcolor: '#e8eaf6',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Paper>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                onClick={handleNextTask}
                variant="contained"
                disabled={selectedAnswers.length === 0}
                sx={{
                  backgroundColor: '#4257b2',
                  '&:hover': { backgroundColor: '#9370db' },
                  fontWeight: 'bold',
                  borderRadius: 3,
                  textTransform: 'none',
                }}
              >
                {currentTaskIndex < quest.total - 1 ? 'Next Task' : 'Finish'}
              </Button>
            </Stack>
          </>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5" textAlign="center">
              You answered correctly {score} out of {quest.total} tasks.
            </Typography>

            <Box>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton key={star} onClick={() => setRate(star)}>
                  <StarIcon
                    sx={{ color: star <= (rate || 0) ? '#FFD700' : '#ccc' }}
                  />
                </IconButton>
              ))}
            </Box>

            <Button
              onClick={handleComplete}
              variant="contained"
              disabled={rate === null}
              sx={{
                backgroundColor: '#4257b2',
                '&:hover': { backgroundColor: '#9370db' },
                fontWeight: 'bold',
                borderRadius: 3,
                textTransform: 'none',
              }}
            >
              Complete and Close
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default QuestPassingView;
