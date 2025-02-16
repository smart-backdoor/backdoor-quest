import { toast } from 'react-toastify';
import { useFormWithContext } from '@hooks/useFormWithContext';
import {
  ValidationSchema,
  validationSchema,
} from '@modules/questsGrid/model/validation.model';
import CreateQuestView from '@modules/questsGrid/view/CreateQuestView';
import { createQuest } from '@api';

const initialValues = {
  title: '',
  description: '',
  timeLimit: 1,
  file: '',
  tasks: Array.from({ length: 3 }, () => ({
    title: '',
    isCorrect: false,
    answers: [{ title: '', isCorrect: false }],
  })),
};

const CreateQuestController = () => {
  const { renderFormWithContext } = useFormWithContext({
    defaultValues: initialValues,
    mode: 'onChange',
    validationSchema,
  });

  const handleSubmit = async (data: ValidationSchema): Promise<void> => {
    try {
      const payload = {
        title: data.title,
        description: data.description ?? '',
        timeLimit: data.timeLimit,
        file: data.file ?? '',
        tasks: data.tasks.map((task) => ({
          title: task.title,
          isCorrect: task.isCorrect ?? '',
          answers: task.answers ?? [],
        })),
      };

      await createQuest(payload);
      toast.success('Quest successfully created!');
    } catch (error) {
      toast.error('Unable to process your request. Please try again');
      console.error('Error:', error);
    }
  };

  return renderFormWithContext<ValidationSchema>({
    children: <CreateQuestView />,
    onSubmit: handleSubmit,
  });
};

export default CreateQuestController;
