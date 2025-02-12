import React from 'react';
import { Box } from '@mui/material';
import { ExitToApp, ListAlt, Person } from '@mui/icons-material';
import { Logo, Text } from '@assets/images';
import NavItem from '@layout/MainLayout/components/NavItem';

const Header: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={Logo} alt="App Logo" style={{ height: 50 }} />
        <img src={Text} alt="App Text" style={{ height: 40 }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <NavItem
          to="/"
          label="All quests"
          icon={<ListAlt />}
          active={location.pathname === '/'}
        />
        {isAuthenticated ? (
          <NavItem
            to="/profile/1"
            label="Profile"
            icon={<Person />}
            active={location.pathname === '/profile/1'}
          />
        ) : (
          <NavItem
            to="/auth"
            label="Login"
            icon={<ExitToApp />}
            active={location.pathname === '/auth'}
          />
        )}
      </Box>
    </Box>
  );
};

export default Header;
