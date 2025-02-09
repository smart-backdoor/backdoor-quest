import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { MyQuiz, Quiz, UserProfile } from '@types';
import {
  fetchMyQuizzes,
  fetchPassedQuizzes,
  fetchUserProfile,
} from '@modules/profile/controller/ProfileController';
import ProfileTabs from '@modules/profile/components/ProfileTabs';
import UserInfo from '@modules/profile/components/UserInfo';
import ProfileStatistics from '@modules/profile/components/ProfileStatistic';

const ProfileView: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [passedQuizzes, setPassedQuizzes] = useState<Quiz[]>([]);
  const [myQuizzes, setMyQuizzes] = useState<MyQuiz[]>([]);

  useEffect(() => {
    fetchUserProfile().then((data) => setUser(data));
    fetchPassedQuizzes().then((data) => setPassedQuizzes(data));
    fetchMyQuizzes().then((data) => setMyQuizzes(data));
  }, []);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
      >
        <UserInfo
          name={user.name}
          email={user.email}
          onUpload={(file) => console.log('Uploading file:', file)}
        />
        <ProfileStatistics />
      </Stack>
      <ProfileTabs passedQuizzes={passedQuizzes} myQuizzes={myQuizzes} />
    </Box>
  );
};

export default ProfileView;
