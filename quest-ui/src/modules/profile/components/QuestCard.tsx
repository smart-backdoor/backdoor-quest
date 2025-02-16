import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';

const QuestCard: React.FC<{ quest: any }> = ({ quest }) => {
  const { title, mark, quantityOfTasks, file, authorName, authorAvatar, rate } =
    quest;

  return (
    <Card
      sx={{
        textAlign: 'start',
        flex: 1,
        padding: 3,
        borderRadius: 4,
        minWidth: 250,
        maxWidth: 300,
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
          avatar={<Avatar src={authorAvatar} alt={authorName} />}
          title={title ?? 'Test name'}
          subheader={authorName}
        />
        <CardMedia
          component="img"
          height="180"
          image={file}
          alt={title}
          sx={{ borderRadius: 2 }}
        />

        <Stack direction="row" spacing={1}>
          <Chip label={`${quantityOfTasks ?? 0} questions`} color="primary" />
          <Chip label={`mark: ${mark ?? rate}`} color="secondary" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default QuestCard;
