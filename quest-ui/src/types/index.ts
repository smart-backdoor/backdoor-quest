type Answer = {
  id: number;
  title: string;
};

type Task = {
  id: number;
  title: string;
  file: string;
  answers: Answer[];
};

export type LoginResponse = {
  token: string;
  userId: number;
  email: string;
  avatar: string;
  firstName: string;
};

export type RegisterResponse = {
  message: string;
  userId: number;
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

export interface CreateQuizRequest {
  title: string;
  description: string;
  timeLimit: number;
  file?: File | string;
  tasks: {
    title: string;
    file?: File | string;
    answers: Answer[];
  }[];
}

export interface CreateQuizResponse {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  tasks: {
    id: string;
    title: string;
    answers: Answer[];
  }[];
}

export interface StartQuest {
  questId: number;
  currentTask: Task;
  total: number;
}

export type TaskResponse = {
  nextTask: Task;
  correctAnswers: boolean[];
};

interface CompletedQuest {
  id: number;
  title: string;
  mark: number | null;
  quantityOfTasks: number;
  file: string;
  authorName: string | null;
  authorAvatar: string | null;
}

interface CreatedQuest {
  id: number;
  title: string;
  description: string;
  rate: number;
  file: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  enabled: boolean;
  completed: CompletedQuest[];
  completedAverageMark: number;
  created: CreatedQuest[];
  createdAverageRate: number;
}
