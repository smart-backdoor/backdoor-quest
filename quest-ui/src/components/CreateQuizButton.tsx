import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateQuizButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      fullWidth
      disabled={disabled}
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      type="submit"
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
