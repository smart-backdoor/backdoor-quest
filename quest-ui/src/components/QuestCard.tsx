import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Stack,
  Typography,
  Chip,
} from '@mui/material';
import { Quest } from '@types';

const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => {
  const { title, file, description, quantityOfTasks, timeLimit, user } = quest;

  return (
    <Card
      sx={{
        textAlign: 'start',
        flex: 1,
        padding: 3,
        borderRadius: 4,
        minWidth: 250,
        maxWidth: 350,
        boxShadow: 6,
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 10,
        },
      }}
    >
      <Stack spacing={2}>
        <CardHeader
          sx={{ padding: 0 }}
          avatar={
            <Avatar
              src={user?.avatar}
              alt={`${user?.firstName} ${user.lastName}`}
            />
          }
          title={title ?? 'Test name'}
          subheader={`${user?.firstName} ${user.lastName}`}
        />
        <CardMedia
          component="img"
          height="180"
          image={file}
          alt={title}
          sx={{ borderRadius: 2 }}
        />
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {description ?? 'No description available'}
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={1}>
          <Chip label={`${quantityOfTasks ?? 0} questions`} color="primary" />
          <Chip label={`${timeLimit ?? 0} min`} color="secondary" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default QuestCard;
