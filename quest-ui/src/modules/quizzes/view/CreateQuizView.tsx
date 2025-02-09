import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Stack,
  Paper,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateQuizButton from '@modules/quizzes/components/CreateQuizButton';

const questionTypes = [
  { value: 'open', label: 'Open answers' },
  { value: 'test', label: 'Test questions' },
  { value: 'image', label: 'Question with a picture' },
];

const CreateQuizView = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    tasksCount: 1,
    timeLimit: '',
    questions: [{ type: 'open', content: '', media: null }],
  });

  const handleChange = (field: string, value: string | number) => {
    setQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuiz((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { type: 'open', content: '', media: null },
      ],
    }));
  };

  const handleSubmit = () => {
    console.log('Quiz Data:', quiz);
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mt={4}
      p={3}
      boxShadow={4}
      borderRadius={4}
      bgcolor="white"
    >
      <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
        Create quiz
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={quiz.title}
        onChange={(e) => handleChange('title', e.target.value)}
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        value={quiz.description}
        multiline
        onChange={(e) => handleChange('description', e.target.value)}
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 2 }}
      />
      <TextField
        fullWidth
        label="Number of tasks"
        type="number"
        value={quiz.tasksCount}
        onChange={(e) => handleChange('tasksCount', Number(e.target.value))}
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 2 }}
      />
      <TextField
        fullWidth
        label="Time limit (min)"
        type="number"
        value={quiz.timeLimit}
        onChange={(e) => handleChange('timeLimit', Number(e.target.value))}
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: 2 }}
      />

      <Typography variant="h6" fontWeight="bold" mb={1}>
        Question:
      </Typography>

      {quiz.questions.map((question, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 3, boxShadow: 2 }}>
          <TextField
            fullWidth
            select
            label="Question type"
            value={question.type}
            onChange={(e) =>
              handleQuestionChange(index, 'type', e.target.value)
            }
            sx={{ mb: 2, backgroundColor: 'white', borderRadius: 2 }}
          >
            {questionTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Question text"
            value={question.content}
            onChange={(e) =>
              handleQuestionChange(index, 'content', e.target.value)
            }
            sx={{ mb: 2, backgroundColor: 'white', borderRadius: 2 }}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton component="label">
              <input
                type="file"
                hidden
                onChange={(e) =>
                  handleQuestionChange(
                    index,
                    'media',
                    e.target.files?.[0] || null
                  )
                }
              />
              <AddPhotoAlternateIcon color="primary" />
            </IconButton>
            {question.media && (
              <Typography variant="body2">
                {(question.media as File).name}
              </Typography>
            )}
          </Stack>
        </Paper>
      ))}

      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Button
          onClick={addQuestion}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 'bold',
            borderColor: '#4257b2',
            color: '#4257b2',
            '&:hover': { backgroundColor: '#e8eaf6', borderColor: '#9370db' },
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add question
        </Button>
        <CreateQuizButton onClick={handleSubmit} />
      </Box>
    </Box>
  );
};

export default CreateQuizView;
