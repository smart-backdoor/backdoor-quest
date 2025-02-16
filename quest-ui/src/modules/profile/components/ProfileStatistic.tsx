import { Box, Card, Typography } from '@mui/material';
import { User } from '@types';

const cardStyle = {
  padding: 2,
  flex: 1,
  height: 140,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(208, 158, 231, 0.5)',
  width: 150,
};

const ProfileStatistics = ({ userData }: { userData: User }) => {
  return (
    <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Profile Statistics
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Card sx={cardStyle}>
          <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Completed Average Mark
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {userData.completedAverageMark}
          </Typography>
        </Card>
        <Card sx={cardStyle}>
          <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Created Average Rate
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {userData.createdAverageRate}
          </Typography>
        </Card>
        <Card sx={cardStyle}>
          <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Passed Quests
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {userData.completed.length}
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default ProfileStatistics;
