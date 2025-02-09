import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { registerSchema } from '@modules/auth/model/validation.model';
import { registerSubmit } from '@modules/auth/controller/LoginController';
import { RegisterData } from '@types';

const RegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerSubmit(data);
      toast.success('you are successfully registered!');
    } catch (error) {
      toast.error('Registration error. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
