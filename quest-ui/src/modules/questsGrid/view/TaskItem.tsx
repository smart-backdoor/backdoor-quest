import { useEffect, useRef } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
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
import {
  Delete,
  Close,
  AddCircleOutline,
  AddPhotoAlternate,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

interface TaskItemProps {
  taskIndex: number;
  control: Control<any>;
  onRemoveTask: () => void;
  onFileUpload: (file: File) => void;
  uploadedFileName?: string;
}

const TaskItem = ({
  taskIndex,
  control,
  onRemoveTask,
  onFileUpload,
  uploadedFileName,
}: TaskItemProps) => {
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `tasks[${taskIndex}].answers`,
  });

  const prevFileNameRef = useRef<string | undefined>(null);

  useEffect(() => {
    if (uploadedFileName && uploadedFileName !== prevFileNameRef.current) {
      toast.success(`File "${uploadedFileName}" uploaded successfully!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      prevFileNameRef.current = uploadedFileName;
    }
  }, [uploadedFileName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        marginBottom: 3,
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
        <Delete />
      </IconButton>

      <Typography
        variant="h6"
        fontWeight="bold"
        marginBottom={2}
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
              marginBottom: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
            }}
          />
        )}
      />

      <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
        <IconButton component="label" color="primary">
          <input type="file" hidden onChange={handleFileChange} />
          <AddPhotoAlternate />
        </IconButton>
        {uploadedFileName && (
          <Typography variant="body2" color="text.secondary">
            {uploadedFileName}
          </Typography>
        )}
      </Stack>

      <Typography
        variant="h6"
        fontWeight="bold"
        marginBottom={2}
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
            marginBottom: 2,
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
            <Close />
          </IconButton>
        </Box>
      ))}

      <Box sx={{ textAlign: 'center' }}>
        <IconButton
          disableRipple
          onClick={() => appendAnswer({ title: '', isCorrect: false })}
          sx={{
            fontWeight: '700',
            color: 'primary.main',
            fontSize: '1rem',
          }}
        >
          <AddCircleOutline sx={{ marginRight: 1 }} />
          Add Answer
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TaskItem;
