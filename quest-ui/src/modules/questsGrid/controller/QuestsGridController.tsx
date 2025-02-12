import axios, { AxiosResponse } from 'axios';
import { API } from '@constants';
import { fetchQuests } from '@api';
import { CreateQuizRequest, CreateQuizResponse, Quest } from '@types';

const MOCK_QUIZZES: Quest[] = [
  {
    id: 13,
    title: 'Quest 1',
    file: 'https://storage.googleapis.com/backdoor-unique/quest-content/bb844118-b838-4c12-9b16-bf493b02795d',
    description: 'Description',
    quantityOfTasks: 2,
    timeLimit: 600,
    user: {
      firstName: 'qwe',
      lastName: 'asd',
      avatar: '111',
    },
  },
  {
    id: 14,
    title: 'Quest 1',
    file: 'https://storage.googleapis.com/backdoor-unique/quest-content/bb844118-b838-4c12-9b16-bf493b02795d',
    description: 'Description',
    quantityOfTasks: 2,
    timeLimit: 600,
    user: {
      firstName: 'qwe',
      lastName: 'asd',
      avatar: '111',
    },
  },
  {
    id: 15,
    title: 'Quest 1',
    file: 'https://storage.googleapis.com/backdoor-unique/quest-content/bb844118-b838-4c12-9b16-bf493b02795d',
    description: 'Description',
    quantityOfTasks: 2,
    timeLimit: 600,
    user: {
      firstName: 'qwe',
      lastName: 'asd',
      avatar: '111',
    },
  },
  {
    id: 16,
    title: 'Quest 1',
    file: 'https://storage.googleapis.com/backdoor-unique/quest-content/bb844118-b838-4c12-9b16-bf493b02795d',
    description: 'Description',
    quantityOfTasks: 2,
    timeLimit: 600,
    user: {
      firstName: 'qwe',
      lastName: 'asd',
      avatar: '111',
    },
  },
  {
    id: 17,
    title: 'Quest 1',
    file: 'https://storage.googleapis.com/backdoor-unique/quest-content/bb844118-b838-4c12-9b16-bf493b02795d',
    description: 'Description',
    quantityOfTasks: 2,
    timeLimit: 600,
    user: {
      firstName: 'qwe',
      lastName: 'asd',
      avatar: '111',
    },
  },
];

export const fetchQuizzes = async (): Promise<Quest[]> => {
  try {
    const quests = await fetchQuests();

    return Array.isArray(quests) ? quests : MOCK_QUIZZES;
  } catch (error) {
    console.error('Error fetching quests:', error);
    return MOCK_QUIZZES;
  }
};

export const createQuiz = async (
  data: CreateQuizRequest
): Promise<CreateQuizResponse> => {
  try {
    const response: AxiosResponse<CreateQuizResponse> = await axios.post(
      API.ALL_QUESTS,
      data
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create quiz');
    }
    throw new Error('Unknown error');
  }
};
