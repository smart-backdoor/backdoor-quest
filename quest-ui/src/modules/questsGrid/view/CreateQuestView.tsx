import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateQuestButton from '@components/CreateQuestButton';
import { ValidationSchema } from '@modules/questsGrid/model/validation.model';
import TaskItem from '@modules/questsGrid/view/TaskItem';

const CreateQuestView = () => {
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
      <Typography
        variant="h4"
        fontWeight="bold"
        marginBottom={3}
        textAlign="center"
      >
        Create Quest
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
              marginBottom: 3,
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
              marginBottom: 3,
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
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            sx={{
              marginBottom: 4,
              borderRadius: 2,
            }}
          />
        )}
      />

      {tasks.map((task, taskIndex) => (
        <Box key={task.id} mb={3}>
          <TaskItem
            taskIndex={taskIndex}
            control={control}
            onRemoveTask={() => handleRemoveTask(taskIndex)}
            onFileUpload={(file: File) => handleFileUpload(taskIndex, file)}
            uploadedFileName={uploadedFiles[`task-${taskIndex}`]?.name}
          />
        </Box>
      ))}

      <Box textAlign="center" marginTop={4}>
        <Button
          onClick={handleAddTask}
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderWidth: 1.5,
            paddingY: 1.5,
            borderColor: '#4257b2',
            color: '#4257b2',
            fontWeight: '700',
            fontSize: '1rem',
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add Task
        </Button>
      </Box>

      <Box textAlign="center" marginTop={4}>
        <CreateQuestButton disabled={!isDirty || !isValid} />
      </Box>
    </Box>
  );
};

export default CreateQuestView;
