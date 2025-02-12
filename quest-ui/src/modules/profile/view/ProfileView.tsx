import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { MyQuiz, Quest, User } from '@types';
import { getProfile } from '@modules/profile/controller/ProfileController';
import ProfileTabs from '@modules/profile/components/ProfileTabs';
import UserInfo from '@modules/profile/components/UserInfo';
import ProfileStatistics from '@modules/profile/components/ProfileStatistic';

const ProfileView: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [passedQuizzes, setPassedQuizzes] = useState<Quest[]>([]);
  const [myQuizzes, setMyQuizzes] = useState<MyQuiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getProfile();

      setUser(userData);
      setPassedQuizzes(userData?.completed || []);
      setMyQuizzes(userData?.created || []);
    };

    fetchData();
  }, []);

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
        />
        <ProfileStatistics userData={user} />
      </Stack>
      <ProfileTabs passedQuizzes={passedQuizzes} myQuizzes={myQuizzes} />
    </Box>
  );
};

export default ProfileView;
