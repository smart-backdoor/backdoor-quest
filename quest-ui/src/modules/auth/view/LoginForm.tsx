import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { loginSchema } from '@modules/auth/model/validation.model';
import { loginSubmit } from '@modules/auth/controller/LoginController';
import { AuthData } from '@types';
import { ROUTES } from '@constants';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: AuthData) => {
    try {
      await loginSubmit(data);

      toast.success('Successful login!');
      navigate(ROUTES.ROOT);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Login error. Please check the data.');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: 2 }}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ marginBottom: 2 }}
            variant="outlined"
            slotProps={{
              input: {
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'white',
                },
              },
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ marginBottom: 2 }}
            variant="outlined"
            slotProps={{
              input: {
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'white',
                  paddingRight: 3,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isValid}
        sx={{
          backgroundColor: '#4257b2',
          fontWeight: 'bold',
          fontSize: '1rem',
          padding: '0.7rem',
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#9370db',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
