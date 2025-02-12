export const API = Object.freeze({
  AUTH: {
    LOGIN: 'https://9784-176-37-182-123.ngrok-free.app/auth/login',
    REGISTER: 'https://9784-176-37-182-123.ngrok-free.app/auth/register',
  },
  USER: 'https://9784-176-37-182-123.ngrok-free.app/user/profile/:id',
  QUEST_COMPLETE:
    'https://9784-176-37-182-123.ngrok-free.app/quests/:id/complete',
  ALL_QUESTS: 'https://9784-176-37-182-123.ngrok-free.app/quests',
  START_QUEST: 'https://9784-176-37-182-123.ngrok-free.app/quests/:id/start',
  VALIDATE_QUEST:
    'https://9784-176-37-182-123.ngrok-free.app/quests/:id/validate',
});
