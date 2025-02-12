import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import {
  fetchQuestions,
  submitQuestion,
} from '@modules/quizPassing/controller/QuestPassingController';
import { StartQuest, TaskResponse } from '@types';

const QuestPassingView = () => {
  const { id } = useParams<{ id: string }>();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [quest, setQuest] = useState<StartQuest | null>(null);

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
    if (selectedAnswers.includes(answerId)) {
      setSelectedAnswers((prev) => prev.filter((id) => id !== answerId));
    } else {
      setSelectedAnswers((prev) => [...prev, answerId]);
    }
  };

  const handleNextTask = async () => {
    if (quest && id) {
      try {
        const payload = {
          taskId: quest.currentTask.id,
          answerId: selectedAnswers[0],
        };

        const response = await submitQuestion(id, payload);

        if (response.correctAnswers.includes(true)) {
          setScore((prev) => prev + 1);
        }

        if (response.nextTask) {
          setQuest((prev) => ({
            ...prev!,
            currentTask: response.nextTask,
          }));
          setCurrentTaskIndex((prev) => prev + 1);
          setSelectedAnswers([]);
        } else {
          setIsFinished(true);
        }
      } catch (error) {
        console.error('Failed to submit answer:', error);
      }
    }
  };

  const progress = quest ? ((currentTaskIndex + 1) / quest.total) * 100 : 0;

  if (!quest) {
    return <div>Loading...</div>;
  }

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
                  alt="Task related"
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
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              textAlign="center"
            >
              Quest Result
            </Typography>
            <Typography variant="body1" textAlign="center">
              You answered correctly {score} out of {quest.total} tasks.
            </Typography>
          </Paper>
        )}
      </Box>
    </Modal>
  );
};

export default QuestPassingView;
