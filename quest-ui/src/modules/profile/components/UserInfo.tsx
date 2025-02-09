import React from 'react';
import { Box, Typography } from '@mui/material';
import UserAvatar from '@modules/profile/components/UserAvatar';
import { User } from '@assets/images';

interface UserInfoProps {
  name: string;
  email: string;
  onUpload: (file: File) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email, onUpload }) => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 4 }}
    >
      <UserAvatar photo={User} onUpload={onUpload} />
      <Box>
        <Typography variant="h5" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
