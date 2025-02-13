import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateQuizButton from '@components/CreateQuizButton';
import { ValidationSchema } from '@modules/questsGrid/model/validation.model';
import { useState } from 'react';
import TaskItem from '@modules/questsGrid/view/TaskItem';

const CreateQuizView = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const {
    control,
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
  };

  const handleAddTask = () => {
    appendTask({
      title: '',
      isCorrect: false,
      answers: [{ title: '', isCorrect: false }],
    });
  };

  const handleRemoveTask = (taskIndex: number) => {
    removeTask(taskIndex);
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

      {tasks.map((task, taskIndex) => (
        <TaskItem
          key={task.id}
          task={task}
          taskIndex={taskIndex}
          control={control}
          onRemoveTask={() => handleRemoveTask(taskIndex)}
          onFileUpload={(file) => handleFileUpload(taskIndex, file)}
        />
      ))}

      <Box textAlign="center" mt={4}>
        <Button
          onClick={handleAddTask}
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
        <CreateQuizButton disabled={!isDirty || !isValid} />
      </Box>
    </Box>
  );
};

export default CreateQuizView;
