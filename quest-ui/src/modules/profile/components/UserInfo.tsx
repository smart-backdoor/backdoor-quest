import { Box, Typography, IconButton } from '@mui/material';
import UserAvatar from '@modules/profile/components/UserAvatar';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '@assets/images';

interface UserInfoProps {
  name: string;
  email: string;
  onUpload: (file: File) => void;
  onEditClick: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  email,
  onUpload,
  onEditClick,
}) => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 4 }}
    >
      <UserAvatar avatar={User} onUpload={onUpload} />
      <Box>
        <Typography variant="h5" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {email}
        </Typography>
      </Box>
      <IconButton onClick={onEditClick}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default UserInfo;
