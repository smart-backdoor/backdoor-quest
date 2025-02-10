export type LoginResponse = {
  token: string;
};

export type RegisterResponse = {
  message: string;
};

export type AuthData = {
  email: string;
  password: string;
};

export type UserProfile = {
  name: string;
  email: string;
  photo: string | null;
};

export type PassedQuiz = {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  correctAnswers: number;
  image: string;
  category: string;
  author: {
    avatar?: string;
    name: string;
  };
};

export type MyQuiz = {
  id: string;
  title: string;
  description: string;
  quizImage: string;
};

export type Quest = {
  id: number;
  title: string;
  file: string;
  description: string;
  quantityOfTasks: number;
  timeLimit: number;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
};
