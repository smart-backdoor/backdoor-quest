import { useEffect } from 'react';
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
import { Close, Star } from '@mui/icons-material';
import { useQuestPassingController } from '@modules/questPassing/controller/QuestPassingController';

const QuestPassingView = () => {
  const {
    quest,
    isFinished,
    isModalOpen,
    currentTaskIndex,
    selectedAnswers,
    score,
    rate,
    progress,
    handleAnswerSelect,
    handleNextTask,
    handleComplete,
    handleCloseModal,
    setRate,
    loadQuest,
  } = useQuestPassingController();

  useEffect(() => {
    loadQuest();
  }, [loadQuest]);

  if (!quest) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      open={isModalOpen}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          boxShadow: 24,
          padding: 4,
          outline: 'none',
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={handleCloseModal}
        >
          <Close />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
          marginBottom={2}
          textAlign="center"
        >
          Quest {quest.questId}
        </Typography>

        {!isFinished ? (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 5, marginBottom: 3 }}
            />
            <Stack direction="row" alignItems="center">
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                Task {currentTaskIndex + 1} of {quest.total}
              </Typography>
            </Stack>

            <Paper
              sx={{
                padding: 3,
                marginBottom: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
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
                        checked={selectedAnswers.includes(Number(answer?.id))}
                        onChange={() => handleAnswerSelect(Number(answer.id))}
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
                      bgcolor: selectedAnswers.includes(Number(answer.id))
                        ? '#e8eaf6'
                        : 'transparent',
                      padding: 1,
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
                  <Star
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
