import { Controller, useFieldArray } from 'react-hook-form';
import {
  Box,
  TextField,
  IconButton,
  Stack,
  Paper,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TaskItem = ({
  task,
  taskIndex,
  control,
  onRemoveTask,
  onFileUpload,
}: any) => {
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
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        boxShadow: 2,
        position: 'relative',
      }}
    >
      <IconButton
        onClick={onRemoveTask}
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

      <Typography variant="h6" fontWeight="bold" mb={2} color="text.primary">
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
                onFileUpload(file);
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

      <Typography variant="h6" fontWeight="bold" mb={2} color="text.primary">
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
                  <Checkbox {...field} checked={field.value} color="primary" />
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
};

export default TaskItem;
