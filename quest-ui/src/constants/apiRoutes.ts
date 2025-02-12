export const API = Object.freeze({
  AUTH: {
    LOGIN: 'http://localhost:8080/auth/login',
    REGISTER: 'http://localhost:8080/auth/register',
  },
  ALL_QUESTS: 'http://localhost:8080/quests',
  START_QUEST: 'http://localhost:8080/quests/:id/start',
  VALIDATE_QUEST: 'http://localhost:8080/quests/:id/validate',
});
