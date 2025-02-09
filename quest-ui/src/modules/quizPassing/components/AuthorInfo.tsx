import { Box, Typography, Avatar } from '@mui/material';

const AuthorInfo = ({
  authorName,
  avatar,
}: {
  authorName: string;
  avatar: string;
}) => {
  return (
    <Box display="flex" alignItems="center" mt={2}>
      <Avatar alt={authorName} src={avatar} />
      <Typography variant="body2" color="text.secondary" ml={1}>
        {authorName}
      </Typography>
    </Box>
  );
};

export default AuthorInfo;
