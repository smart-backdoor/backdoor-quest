import { getUserProfile } from '@api';
import { FunnyCat } from '@assets/images';
import { User } from '@types';

const fallbackData: User = {
  id: 1,
  email: 'rusakovdanil@gmail.com',
  firstName: 'Name',
  lastName: 'Name',
  avatar: null,
  enabled: true,
  completed: [
    {
      id: 4,
      title: 'Quest 4',
      mark: 2.9,
      quantityOfTasks: 7,
      file: 'quest4.pdf',
      authorName: null,
      authorAvatar: null,
    },
  ],
  completedAverageMark: 4.08,
  created: [
    {
      id: 1,
      title: 'Quest 1',
      description: 'Description for Quest 1',
      rate: 3.5,
      file: 'quest1.pdf',
    },
    {
      id: 2,
      title: 'Quest 2',
      description: 'Description for Quest 2',
      rate: 4.2,
      file: 'quest2.pdf',
    },
    {
      id: 3,
      title: 'Quest 3',
      description: 'Description for Quest 3',
      rate: 2.8,
      file: 'quest3.pdf',
    },
    {
      id: 4,
      title: 'Quest 4',
      description: 'Description for Quest 4',
      rate: 4.8,
      file: 'quest4.pdf',
    },
    {
      id: 5,
      title: 'Quest 5',
      description: 'Description for Quest 5',
      rate: 3.9,
      file: 'quest5.pdf',
    },
    {
      id: 6,
      title: 'Quest 6',
      description: 'Description for Quest 6',
      rate: 4.5,
      file: 'quest6.pdf',
    },
    {
      id: 7,
      title: 'Quest 7',
      description: 'Description for Quest 7',
      rate: 2.5,
      file: 'quest7.pdf',
    },
    {
      id: 8,
      title: 'Quest 8',
      description: 'Description for Quest 8',
      rate: 3.2,
      file: 'quest8.pdf',
    },
    {
      id: 9,
      title: 'Quest 9',
      description: 'Description for Quest 9',
      rate: 4.0,
      file: 'quest9.pdf',
    },
    {
      id: 10,
      title: 'Quest 10',
      description: 'Description for Quest 10',
      rate: 5.0,
      file: 'quest10.pdf',
    },
  ],
  createdAverageRate: 3.84,
  passedQuizzes: [
    {
      id: '1',
      title: 'Quiz 1',
      description: 'This is quiz 1',
      progress: 50,
      userName: 'Danylo',
      quizImage: FunnyCat,
    },
    {
      id: '2',
      title: 'Quiz 2',
      description: 'This is quiz 2',
      progress: 90,
      userName: 'Artem',
      quizImage: FunnyCat,
    },
    {
      id: '3',
      title: 'Quiz 3',
      description: 'This is quiz 3',
      progress: 90,
      userName: 'Oleksandr',
      quizImage: FunnyCat,
    },
    {
      id: '4',
      title: 'Quiz 4',
      description: 'This is quiz 4',
      progress: 70,
      userName: 'Someone',
    },
  ],
  myQuizzes: [
    {
      id: '5',
      title: 'Quiz 5',
      description: 'This is quiz 5',
      quizImage: FunnyCat,
    },
    {
      id: '6',
      title: 'Quiz 6',
      description: 'This is quiz 6',
      quizImage: FunnyCat,
    },
  ],
};

export const getProfile = async () => {
  try {
    const data = await getUserProfile('1');

    return data ?? fallbackData;
  } catch (error) {
    console.error('Error fetching quests:', error);
    return fallbackData;
  }
};
