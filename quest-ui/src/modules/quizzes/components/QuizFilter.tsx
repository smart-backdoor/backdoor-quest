import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

const QuizFilter = () => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  return (
    <Box mb={3}>
      <TextField
        select
        label="Categories"
        value={category}
        onChange={handleChange}
        variant="outlined"
        sx={{
          textAlign: 'start',
          width: 300,
          backgroundColor: 'white',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9370db',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4257b2',
          },
        }}
      >
        <MenuItem value="open">Open answers</MenuItem>
        <MenuItem value="test">Test questions</MenuItem>
        <MenuItem value="image">Question with a picture</MenuItem>
      </TextField>
    </Box>
  );
};

export default QuizFilter;
