export const API = Object.freeze({
  AUTH: {
    LOGIN: 'http://localhost:8080/auth/login',
    REGISTER: 'http://localhost:8080/auth/register',
  },
  USER: 'http://localhost:8080/user/profile/:id',
  QUEST: {
    ALL_QUESTS: 'http://localhost:8080/quests',
    START_QUEST: 'http://localhost:8080/quests/:id/start',
    QUEST_COMPLETE: 'http://localhost:8080/quests/:id/complete',
    VALIDATE_QUEST: 'http://localhost:8080/quests/:id/validate',
  },
  UPLOAD_FILE: 'http://localhost:8080/files',
});
