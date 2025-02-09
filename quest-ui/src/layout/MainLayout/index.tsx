import React from 'react';
import { Box } from '@mui/material';
import ProfileView from '@modules/profile/view/ProfileView';

const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
        background: `linear-gradient(
          to bottom right, 
          rgba(242, 210, 247, 0.5), 
          rgba(208, 158, 231, 0.5), 
          rgba(150, 121, 187, 0.5) 
        )`,
      }}
    >
      <ProfileView />
    </Box>
  );
};

export default MainLayout;
