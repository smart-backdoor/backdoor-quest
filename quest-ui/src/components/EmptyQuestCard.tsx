import { Card, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const EmptyQuestCard = ({
  handleCreteQuest,
}: {
  handleCreteQuest: () => void;
}) => {
  return (
    <Card
      onClick={handleCreteQuest}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minWidth: 250,
        maxWidth: 340,
        borderRadius: 4,
        boxShadow: 4,
        transition: '0.3s',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        border: '2px dashed #d1d1d1',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 8,
          backgroundColor: '#f9f9f9',
        },
        height: '23rem',
      }}
    >
      <IconButton sx={{ color: '#4257b2', fontSize: '56px' }}>
        <AddRoundedIcon fontSize="inherit" />
      </IconButton>
    </Card>
  );
};

export default EmptyQuestCard;
