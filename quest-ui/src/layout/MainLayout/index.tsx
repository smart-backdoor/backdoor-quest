import React from 'react';
import { Box } from '@mui/material';
import ProfileView from '@modules/profile/view/ProfileView';
import { Questions } from '@assets/images';

const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url(${Questions})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <ProfileView />
      </Box>
    </Box>
  );
};

export default MainLayout;
