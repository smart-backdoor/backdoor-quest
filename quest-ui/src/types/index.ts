export type LoginResponse = {
  token: string;
};

export type RegisterResponse = {
  message: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export interface RegisterData extends LoginData {
  name: string;
}

export type UserProfile = {
  name: string;
  email: string;
  photo: string | null;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  progress: number;
  avatar?: string;
  quizImage?: string;
  authorName: string;
  questionCount: number;
  time: number;
  category: string;
};

export type MyQuiz = {
  id: string;
  title: string;
  description: string;
  quizImage?: string;
};
