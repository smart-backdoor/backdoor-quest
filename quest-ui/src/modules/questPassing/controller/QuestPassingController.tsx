import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onQuestComplete, startQuest, submitTaskAnswer } from '@api';
import { ROUTES } from '@constants/routes';
import { StartQuest } from '@types';
import { mockQuestions } from '@modules/questPassing/mocks';

export const useQuestPassingController = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [quest, setQuest] = useState<StartQuest | null>(null);
  const [score, setScore] = useState(0);
  const [rate, setRate] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  const loadQuest = async () => {
    try {
      if (id) {
        const data = await startQuest(id);
        setQuest(data ?? mockQuestions);
      }
    } catch (error) {
      console.error('Failed to fetch quest:', error);
    }
  };

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswers((prev) =>
      prev.includes(answerId)
        ? prev.filter((id) => id !== answerId)
        : [...prev, answerId]
    );
  };

  const handleNextTask = async () => {
    if (quest && id) {
      try {
        const nextTaskIndex = currentTaskIndex + 1;
        const isLastTask = quest.total === nextTaskIndex;

        const payload = {
          taskId: quest.currentTask.id,
          answerId: selectedAnswers[0],
          nextTaskIndex: isLastTask ? null : nextTaskIndex,
        };

        const response = await submitTaskAnswer(id, payload);

        setCorrectAnswers(response?.correctAnswers ?? []);
        if (response?.correctAnswers.includes(true)) {
          setScore((prev) => prev + 1);
        }

        if (response?.nextTask) {
          setQuest((prev) => ({ ...prev!, currentTask: response?.nextTask }));
          setCurrentTaskIndex(nextTaskIndex);
          setSelectedAnswers([]);
        } else {
          setIsFinished(true);
        }
      } catch (error) {
        console.error('Failed to submit answer:', error);
      }
    }
  };

  const handleComplete = async () => {
    if (id && rate !== null) {
      const payload = { correctAnswers, rate };
      try {
        await onQuestComplete(id, payload);
        setIsModalOpen(false);
        navigate(ROUTES.ROOT);
      } catch (error) {
        console.error('Failed to complete quest:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(ROUTES.ROOT);
  };

  const progress = quest ? (currentTaskIndex / quest.total) * 100 : 0;

  return {
    quest,
    isFinished,
    isModalOpen,
    currentTaskIndex,
    selectedAnswers,
    score,
    rate,
    progress,
    handleAnswerSelect,
    handleNextTask,
    handleComplete,
    handleCloseModal,
    setRate,
    loadQuest,
  };
};
