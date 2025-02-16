import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { MyQuest, Quest } from '@types';
import QuestList from '@modules/profile/components/QuestList';

type ProfileTabsProps = {
  passedQuests: Quest[];
  myQuests: MyQuest[];
};

const tabButtonStyle = (isActive: boolean) => ({
  fontWeight: 'bold',
  color: isActive ? '#4257b2' : '#2d2d2d',
  borderBottom: isActive ? '2px solid #4257b2' : 'none',
  fontSize: '1.2rem',
});

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  passedQuests,
  myQuests,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      <Stack direction="row" justifyContent="center" spacing={4} mb={3}>
        <Button
          onClick={() => handleTabChange(0)}
          sx={tabButtonStyle(tabIndex === 0)}
        >
          Passed Quests
        </Button>
        <Button
          onClick={() => handleTabChange(1)}
          sx={tabButtonStyle(tabIndex === 1)}
        >
          My Quests
        </Button>
      </Stack>

      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 ? (
          <QuestList
            quests={passedQuests}
            emptyMessage="No quests have been passed yet."
          />
        ) : (
          <QuestList quests={myQuests} emptyMessage="No quests created yet." />
        )}
      </Box>
    </Box>
  );
};

export default ProfileTabs;
