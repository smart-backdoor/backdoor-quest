import { Box, Typography } from '@mui/material';
import { CompletedQuest, Quest } from '@types';
import QuestCard from '@modules/profile/components/QuestCard';

type QuestsListProps = {
  quests: Quest[] | CompletedQuest[];
  emptyMessage: string;
};

const QuestList: React.FC<QuestsListProps> = ({ quests, emptyMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        padding: 2,
      }}
    >
      {quests?.length > 0 ? (
        quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)
      ) : (
        <Typography variant="body1" color="textSecondary">
          {emptyMessage}
        </Typography>
      )}
    </Box>
  );
};

export default QuestList;
