import React from 'react';
import { Avatar, Typography } from '@mui/material';

type UserAvatarProps = {
  photo: string | null;
  onUpload: (file: File) => void;
};

const UserAvatar: React.FC<{
  photo: string | null;
  onUpload: (file: File) => void;
}> = ({ photo, onUpload }) => {
  return (
    <Avatar
      src={photo || undefined}
      sx={{
        width: 300,
        height: 300,
        backgroundColor: photo ? 'transparent' : '#f0f0f0',
        border: '2px dashed #ccc',
        cursor: 'pointer',
      }}
      onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) onUpload(file);
        };
        input.click();
      }}
    >
      {!photo && (
        <Typography variant="h4" sx={{ color: '#666' }}>
          +
        </Typography>
      )}
    </Avatar>
  );
};

export default UserAvatar;
