import { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import LoginForm from '@modules/auth/view/LoginForm';
import RegisterForm from '@modules/auth/view/RegisterForm';

const AuthTabs: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        background: 'transparent',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Button
          onClick={() => handleTabChange(0)}
          sx={{
            fontWeight: 'bold',
            color: tabIndex === 0 ? '#4257b2' : '#2d2d2d',
            fontSize: '1.2rem',
            ...(tabIndex === 0 && { borderBottom: '2px solid #4257b2' }),
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => handleTabChange(1)}
          sx={{
            fontWeight: 'bold',
            color: tabIndex === 1 ? '#4257b2' : '#2d2d2d',
            fontSize: '1.2rem',
            ...(tabIndex === 1 && { borderBottom: '2px solid #4257b2' }),
          }}
        >
          Registration
        </Button>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        {tabIndex === 0 && <LoginForm />}
        {tabIndex === 1 && <RegisterForm />}
      </Box>
    </Paper>
  );
};

export default AuthTabs;
