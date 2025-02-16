import { getUserProfile, updateUserProfile, uploadFile } from '@api';
import Cookies from 'js-cookie';
import { mockProfile } from '@modules/profile/mocks';
import { ProfileFormData } from '@modules/profile/model/validation.model';
import { toast } from 'react-toastify';
import { User, MyQuest, CompletedQuest } from '@types';

export const getProfile = async () => {
  try {
    const data = await getUserProfile(String(Cookies.get('userId')));

    return data ?? mockProfile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return mockProfile;
  }
};

export const updateProfile = async (payload: {
  firstName: string;
  lastName: string;
  file: string;
}) => {
  try {
    const data = await updateUserProfile(
      String(Cookies.get('userId')),
      payload
    );

    return data ?? mockProfile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return mockProfile;
  }
};

export const fetchProfileData = async (
  setUser: (user: User | null) => void,
  setPassedQuests: (quests: CompletedQuest[]) => void,
  setMyQuests: (quests: MyQuest[]) => void
) => {
  try {
    const userData = await getProfile();
    setUser(userData);
    setPassedQuests(userData?.completed || []);
    setMyQuests(userData?.created || []);
  } catch (error) {
    toast.error('Failed to load profile data.');
  }
};

export const handleFileUpload = async (
  file: File,
  setFileUrl: (url: string | null) => void
) => {
  try {
    const response = await uploadFile(file);
    setFileUrl(response.url);
    toast.success('File uploaded successfully!');
  } catch (error) {
    toast.error('Failed to upload file. Please try again.');
  }
};

export const handleProfileUpdate = async (
  data: ProfileFormData,
  user: User | null,
  selectedFile: File | null,
  fileUrl: string | null,
  setUser: (user: User) => void,
  handleCloseModal: () => void
) => {
  if (!user) return;

  try {
    let updatedavatar = fileUrl || user.avatar;
    if (selectedFile) {
      await handleFileUpload(selectedFile, (url) => (updatedavatar = url));
    }

    const payload = { ...data, avatar: updatedavatar };
    const updatedUser = await updateProfile(payload);
    setUser(updatedUser);
    toast.success('Profile updated successfully!');
    handleCloseModal();
  } catch (error) {
    toast.error('Failed to update profile. Please try again.');
  }
};
