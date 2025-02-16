import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateQuestButton = ({ disabled }: { disabled: boolean }) => {
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
        fontSize: '1.1rem',
        padding: '0.75rem',
        borderRadius: '0.7rem',
        textTransform: 'none',
        transition: 'background-color 0.3s',
        marginBottom: 5,
        '&:hover': {
          backgroundColor: '#9370db',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1.6rem',
        },
      }}
    >
      Create Quest
    </Button>
  );
};

export default CreateQuestButton;
