import { Avatar, Typography } from '@mui/material';

type UserAvatarProps = {
  avatar: string | null;
  onUpload: (file: File) => void;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ avatar, onUpload }) => {
  return (
    <Avatar
      src={avatar ?? undefined}
      sx={{
        width: 120,
        height: 120,
        backgroundColor: avatar ? 'transparent' : '#f0f0f0',
        border: '2px dashed #ccc',
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#aaa',
        },
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
      {!avatar && (
        <Typography variant="h4" sx={{ color: '#666' }}>
          +
        </Typography>
      )}
    </Avatar>
  );
};

export default UserAvatar;
