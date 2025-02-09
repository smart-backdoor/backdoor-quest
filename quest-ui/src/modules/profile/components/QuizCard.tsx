import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Stack,
  LinearProgress,
} from '@mui/material';
import { MyQuiz, Quiz } from '@types';

const QuizCard = ({ quiz }: { quiz: MyQuiz | Quiz }) => {
  return (
    <Card
      sx={{
        flex: 1,
        padding: 2,
        borderRadius: 4,
        minWidth: 150,
        maxWidth: 200,
        boxShadow: 3,
      }}
    >
      <Stack gap={2}>
        <CardHeader
          sx={{ padding: 0, marginLeft: 0 }}
          avatar={<Avatar aria-label="quiz">{quiz?.userName ?? ''}</Avatar>}
          title={quiz.title ?? 'Name '}
        />
        <CardMedia
          component="img"
          height="150"
          image={quiz?.quizImage ?? 'FunnyCat'}
          alt="Quiz image"
          sx={{ borderRadius: 2 }}
        />
        <LinearProgress
          variant="determinate"
          value={80}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Stack>
    </Card>
  );
};

export default QuizCard;
