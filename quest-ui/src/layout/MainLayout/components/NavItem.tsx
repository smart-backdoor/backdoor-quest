import { JSX } from 'react';
import { IconButton, Link, Typography } from '@mui/material';

const NavItem = ({
  to,
  label,
  icon,
  active,
}: {
  to: string;
  label: string;
  icon: JSX.Element;
  active: boolean;
}) => {
  return (
    <Link
      href={to}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        textDecoration: 'none',
        color: active ? '#9370db' : 'text.secondary',
        fontWeight: active ? 600 : 400,
        transition: 'color 0.2s',
        '&:hover': {
          color: '#9370db',
        },
      }}
    >
      <IconButton sx={{ color: 'inherit', padding: 0 }}>{icon}</IconButton>
      <Typography
        variant="body1"
        sx={{
          fontSize: active ? '1.2rem' : '1rem',
          fontWeight: active ? '500' : '400',
        }}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavItem;
