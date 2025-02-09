import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import UserAvatar from '@modules/profile/components/UserAvatar';
import ProfileTabs from '@modules/profile/components/ProfileTabs';

import { Quiz, UserProfile } from '@types';
import {
  fetchMyQuizzes,
  fetchPassedQuizzes,
  fetchUserProfile,
} from '@modules/profile/controller/ProfileController';

const ProfileView: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [passedQuizzes, setPassedQuizzes] = useState<Quiz[]>([]);
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      console.log('User Profile:', data);
      setUser(data);
    });
    fetchPassedQuizzes().then((data) => {
      console.log('Passed Quizzes:', data);
      setPassedQuizzes(data);
    });
    fetchMyQuizzes().then((data) => {
      console.log('My Quizzes:', data);
      setMyQuizzes(data);
    });
  }, []);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Stack sx={{ padding: 10, zIndex: 3, width: '100%' }} direction="row">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, width: '40%' }}>
        <UserAvatar
          photo={user.photo}
          onUpload={(file) => {
            console.log('Uploading file:', file);
          }}
        />
        <Box sx={{ ml: 3 }}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: '60%',
          backgroundColor: 'transparent',
        }}
      >
        <ProfileTabs passedQuizzes={passedQuizzes} myQuizzes={myQuizzes} />
      </Paper>
    </Stack>
  );
};

export default ProfileView;
