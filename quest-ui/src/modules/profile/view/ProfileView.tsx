import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Modal,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { User, MyQuest, PassedQuests } from '@types';
import ProfileTabs from '@modules/profile/components/ProfileTabs';
import UserInfo from '@modules/profile/components/UserInfo';
import ProfileStatistics from '@modules/profile/components/ProfileStatistic';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  ProfileFormData,
  profileSchema,
} from '@modules/profile/model/validation.model';
import {
  fetchProfileData,
  handleProfileUpdate,
} from '@modules/profile/controller/ProfileController';

const ProfileView: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [passedQuests, setPassedQuests] = useState<PassedQuests[]>([]);
  const [myQuests, setMyQuests] = useState<MyQuest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fetchProfileData(setUser, setPassedQuests, setMyQuests);
  }, []);

  const handleOpenModal = () => {
    if (user) {
      reset({ firstName: user.firstName ?? '', lastName: user.lastName ?? '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setFileUrl(null);
  };

  const onSubmit = (data: ProfileFormData) => {
    handleProfileUpdate(
      data,
      user,
      selectedFile,
      fileUrl,
      setUser,
      handleCloseModal
    );
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3, width: '80%' }}>
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
      >
        <UserInfo
          name={`${user.firstName || ''} ${user.lastName || ''}`.trim()}
          email={user.email}
          onUpload={(file) => console.log('Uploading file:', file)}
          onEditClick={handleOpenModal}
        />
        <ProfileStatistics userData={user} />
      </Stack>
      <ProfileTabs passedQuests={passedQuests} myQuests={myQuests} />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2, backgroundColor: 'white' },
                  }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2, backgroundColor: 'white' },
                  }}
                />
              )}
            />
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton component="label">
                <AttachFileIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setValue('avatar', file);
                    }
                  }}
                />
              </IconButton>
              <Typography variant="body2" ml={1}>
                {selectedFile ? selectedFile.name : 'Upload avatar'}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
              }}
            >
              <Button
                onClick={handleCloseModal}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#4257b2',
                  '&:hover': { backgroundColor: '#9370db' },
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '0.7rem',
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileView;
