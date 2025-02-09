import { FunnyCat } from '@assets/images';
import { MyQuiz, Quiz, UserProfile } from '@types';

export const fetchUserProfile = async (): Promise<UserProfile> => {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: null,
  };
};

export const fetchPassedQuizzes = async (): Promise<Quiz[]> => {
  return [
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
  ];
};

export const fetchMyQuizzes = async (): Promise<MyQuiz[]> => {
  return [
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
  ];
};
