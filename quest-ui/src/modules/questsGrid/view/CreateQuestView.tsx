import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CreateQuizButton from '@components/CreateQuizButton';
import { ValidationSchema } from '@modules/questsGrid/model/validation.model';
import { useState } from 'react';

const CreateQuizView = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const {
    control,
    setValue,
    formState: { isDirty, isValid },
  } = useFormContext<ValidationSchema>();

  const {
    fields: tasks,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: 'tasks',
  });

  const handleFileUpload = (taskIndex: number, file: File) => {
    setUploadedFiles((prevFiles) => ({
      ...prevFiles,
      [`task-${taskIndex}`]: file,
    }));
    setValue(`tasks.${taskIndex}.file`, file.name);
  };

  return (
    <Box
      maxWidth={800}
      mx="auto"
      marginY={4}
      padding={4}
      boxShadow={4}
      borderRadius={4}
      bgcolor="background.paper"
    >
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Create Quiz
      </Typography>

      <Controller
        name="title"
        rules={{ required: 'Title is required' }}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Title"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Description"
            multiline
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          />
        )}
      />

      <Controller
        name="timeLimit"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            label="Time limit (min)"
            type="number"
            onChange={(e) => field.onChange(Number(e.target.value))}
            sx={{
              mb: 4,
              borderRadius: 2,
            }}
          />
        )}
      />

      {tasks.map((task, taskIndex) => {
        const {
          fields: answers,
          append: appendAnswer,
          remove: removeAnswer,
        } = useFieldArray({
          control,
          name: `tasks[${taskIndex}].answers`,
        });

        return (
          <Paper
            key={task.id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              position: 'relative',
            }}
          >
            <IconButton
              onClick={() => removeTask(taskIndex)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'error.main',
              }}
              aria-label="delete task"
            >
              <DeleteIcon />
            </IconButton>

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              color="text.primary"
            >
              Task {taskIndex + 1}
            </Typography>

            <Controller
              name={`tasks[${taskIndex}].title`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                  label="Task title"
                  sx={{
                    mb: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                  }}
                />
              )}
            />

            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <IconButton component="label" color="primary">
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || '';
                    if (file) {
                      handleFileUpload(taskIndex, file);
                    }
                  }}
                />
                <AddPhotoAlternateIcon />
              </IconButton>
              {task.file && (
                <Typography variant="body2" color="text.secondary">
                  {task.file.name}
                </Typography>
              )}
            </Stack>

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              color="text.primary"
            >
              Answers:
            </Typography>
            {answers.map((answer, answerIndex) => (
              <Box
                key={answer.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Controller
                  name={`tasks[${taskIndex}].answers[${answerIndex}].title`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!fieldState?.error}
                      helperText={fieldState?.error?.message}
                      label="Answer text"
                      sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                      }}
                    />
                  )}
                />

                <Controller
                  name={`tasks[${taskIndex}].answers[${answerIndex}].isCorrect`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          color="primary"
                        />
                      }
                      label="Correct"
                      sx={{ color: 'text.primary' }}
                    />
                  )}
                />

                <IconButton
                  onClick={() => removeAnswer(answerIndex)}
                  aria-label="delete answer"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}

            <Button
              onClick={() => appendAnswer({ title: '', isCorrect: false })}
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'primary.dark',
                },
              }}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Answer
            </Button>
          </Paper>
        );
      })}

      <Box textAlign="center" mt={4}>
        <Button
          onClick={() =>
            appendTask({
              title: '',
              file: '',
              answers: [{ title: '', isCorrect: false }],
            })
          }
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.5,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add Task
        </Button>
      </Box>

      <Box textAlign="center" mt={4}>
        <CreateQuizButton disabled={!isValid || !isDirty} />
      </Box>
    </Box>
  );
};

export default CreateQuizView;
