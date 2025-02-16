import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import {
  boxStyles,
  questCardStyles,
  titleStyles,
} from '@modules/questsGrid/styles';
import { QuestCard, EmptyQuestCard } from '@components';
import { ROUTES } from '@constants';
import { Quest } from '@types';
import { fetchQuests } from '@api';
import { mockQuests } from '@modules/questsGrid/mocks';

const QuestListView = () => {
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const data = await fetchQuests();
        setQuests(data ?? mockQuests);
      } catch (error) {
        console.error('Failed to fetch quests:', error);
      }
    };
    loadQuests();
  }, []);

  const handleCreateQuest = useCallback(() => {
    navigate(ROUTES.CREATE_QUEST);
  }, [navigate]);

  const handleOpenQuest = useCallback(
    (id: number) => {
      navigate(ROUTES.QUEST.replace(':id', String(id)));
    },
    [navigate]
  );

  return (
    <Container sx={{ marginTop: 2, textAlign: 'center' }}>
      <Typography gutterBottom sx={titleStyles}>
        Quests
      </Typography>

      <Box sx={boxStyles}>
        <Box sx={questCardStyles}>
          <EmptyQuestCard handleCreteQuest={handleCreateQuest} />
        </Box>
        {quests?.map((quest) => (
          <Box
            key={quest?.id}
            sx={questCardStyles}
            onClick={() => handleOpenQuest(quest.id)}
          >
            <QuestCard quest={quest} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default QuestListView;
