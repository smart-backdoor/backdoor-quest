import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import { ExitToApp, ListAlt, Person } from '@mui/icons-material';
import { Logo, Text } from '@assets/images';
import NavItem from '@layout/MainLayout/components/NavItem';
import { ROUTES } from '@constants';

const Header: React.FC = () => {
  const userId = String(Cookies.get('userId'));

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
        {userId ? (
          <NavItem
            to={ROUTES.PROFILE.replace(':id', userId)}
            label="Profile"
            icon={<Person />}
            active={location.pathname === ROUTES.PROFILE.replace(':id', userId)}
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
