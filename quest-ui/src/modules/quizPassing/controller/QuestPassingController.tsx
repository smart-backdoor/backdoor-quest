import { startQuest, submitTaskAnswer } from '@api';

export const fetchQuestions = async (questId: string) => {
  try {
    const data = await startQuest(questId);
    return data ?? mockQuestions;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return mockQuestions;
  }
};

export const submitQuestion = async (
  questId: string,
  payload: { taskId: number; answerId: number; questId: number }
) => {
  try {
    const data = await submitTaskAnswer(questId, payload);
    return data ?? mockQuestions;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return mockQuestions;
  }
};

const mockQuestions = {
  questId: 13,
  currentTask: {
    id: 21,
    title: 'Sample Task Title',
    file: 'https://storage.googleapis.com/backdoor-unique/quest-content/bb844118-b838-4c12-9b16-bf493b02795q',
    answers: [
      {
        id: 42,
        title: 'Answer 1',
      },
      {
        id: 43,
        title: 'Answer 2',
      },
    ],
  },
  total: 2,
};
