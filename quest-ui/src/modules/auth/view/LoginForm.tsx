import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { loginSchema } from '@modules/auth/model/validation.model';
import { loginSubmit } from '@modules/auth/controller/LoginController';
import { AuthData } from '@types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: AuthData) => {
    try {
      const response = await loginSubmit(data);
      toast.success('Successful login!');
      navigate(ROUTES.PROFILE.replace(':id', String(response.data.id)));
    } catch (error) {
      toast.error('Login error. Please check the data.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: '8px',
                backgroundColor: 'white',
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
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: '8px',
                backgroundColor: 'white',
              },
            }}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#4257b2',
          '&:hover': {
            backgroundColor: '#9370db',
          },
          fontWeight: 'bold',
          fontSize: '16px',
          padding: '10px',
          borderRadius: '8px',
          textTransform: 'none',
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
