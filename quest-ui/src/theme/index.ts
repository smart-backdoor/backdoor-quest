import { createTheme } from '@mui/material';

const Theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

export default Theme;
