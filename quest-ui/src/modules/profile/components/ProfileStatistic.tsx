import React from 'react';
import { Box, Card, Typography } from '@mui/material';

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

const ProfileStatistics: React.FC = () => {
  return (
    <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Profile Statistics
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Card sx={cardStyle}>
          <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Quests Completed
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            24
          </Typography>
        </Card>
        <Card sx={cardStyle}>
          <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Total Points
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            1500
          </Typography>
        </Card>
        <Card sx={cardStyle}>
          <Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Rank
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            #12
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default ProfileStatistics;
