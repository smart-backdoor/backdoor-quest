import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Box } from '@mui/material';

const LinearProgressWithLabel = ({ value }: { value: number }) => {
  const color = value < 50 ? 'error' : value < 80 ? 'warning' : 'success';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} color={color} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const LinearWithValueLabel = ({ progress }: { progress: number }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={80} />
    </Box>
  );
};

export default LinearWithValueLabel;
