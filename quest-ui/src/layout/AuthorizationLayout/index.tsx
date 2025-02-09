import React from 'react';
import { Box } from '@mui/material';
import AuthTabs from '@modules/auth/components/AuthTabs';
import { Questions } from '@assets/images';

const AuthorizationLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
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
          opacity: 0.5,
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
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            padding: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1.5rem',
            boxShadow: '0 0.25rem 1.5rem rgba(0, 0, 0, 0.1)',
          }}
        >
          <AuthTabs />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthorizationLayout;
