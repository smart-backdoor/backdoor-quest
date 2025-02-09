import React from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateQuizButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      sx={{
        backgroundColor: '#4257b2',
        color: 'white',
        fontWeight: 'bold',
        maxWidth: 300,
        fontSize: '18px',
        padding: '12px',
        borderRadius: '10px',
        textTransform: 'none',
        transition: 'background-color 0.3s',
        marginBottom: 5,
        '&:hover': {
          backgroundColor: '#9370db',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '24px',
        },
      }}
    >
      Create Quiz
    </Button>
  );
};

export default CreateQuizButton;
