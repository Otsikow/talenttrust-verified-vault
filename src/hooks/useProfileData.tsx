
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { profileService, UpdateProfileData } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  company: string;
  bio: string;
  joinDate: string;
  verificationScore: number;
  documentsVerified: number;
  totalDocuments: number;
}

export const useProfileData = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    company: "",
    bio: "",
    joinDate: "",
    verificationScore: 0,
    documentsVerified: 0,
    totalDocuments: 0
  });

  const loadProfileData = (profile: any) => {
    console.log('Loading profile data:', profile);
    
    const nameParts = profile.full_name?.split(' ') || [''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    setProfileData({
      firstName,
      lastName,
      email: profile.email || user?.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      jobTitle: profile.job_title || '',
      company: profile.company || '',
      bio: profile.bio || '',
      joinDate: profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }) : '',
      verificationScore: profile.verification_score || 0,
      documentsVerified: profile.documents_verified || 0,
      totalDocuments: profile.total_documents || 0
    });

    if (user?.id) {
      setAvatarUrl(`https://mjaqvbuhnhatofwkgako.supabase.co/storage/v1/object/public/avatars/avatars/${user.id}.jpg`);
    }
    
    setProfileError(null);
  };

  const fetchProfileDirectly = async () => {
    if (!user?.id) return;
    
    console.log('Fetching profile directly for user:', user.id);
    setIsLoading(true);
    
    try {
      const { profile, error } = await profileService.getProfile(user.id);
      
      if (error) {
        console.error('Error fetching profile:', error);
        setProfileError(error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } else if (profile) {
        console.log('Profile fetched successfully:', profile);
        loadProfileData(profile);
      } else {
        console.log('No profile found, using default values');
        setProfileData(prev => ({
          ...prev,
          email: user.email || ''
        }));
        setProfileError(null);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      setProfileError('An unexpected error occurred');
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading your profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save your profile",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const updateData: UpdateProfileData = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      location: profileData.location,
      jobTitle: profileData.jobTitle,
      company: profileData.company,
      bio: profileData.bio
    };

    console.log('Saving profile data:', updateData);

    const { error } = await profileService.updateProfile(user.id, updateData);
    
    if (error) {
      console.error('Profile save error:', error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    }
    
    setIsLoading(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarChange = async (file: File) => {
    if (!user) return;

    setIsLoading(true);
    const { avatarUrl: newAvatarUrl, error } = await profileService.uploadAvatar(user.id, file);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else if (newAvatarUrl) {
      setAvatarUrl(newAvatarUrl);
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('Profile component mounted - user:', user?.id, 'userProfile:', userProfile, 'authLoading:', authLoading);
    
    if (!authLoading && user && userProfile) {
      console.log('Loading profile data from userProfile:', userProfile);
      loadProfileData(userProfile);
    } else if (!authLoading && user && !userProfile) {
      console.log('User exists but no profile data, attempting to fetch...');
      fetchProfileDirectly();
    } else if (!authLoading && !user) {
      console.log('No user found, redirecting to login');
      navigate("/login", { replace: true });
    }
  }, [user, userProfile, authLoading, navigate]);

  return {
    user,
    authLoading,
    isLoading,
    profileError,
    profileData,
    setProfileData,
    isEditing,
    avatarUrl,
    handleSave,
    handleEditToggle,
    handleAvatarChange,
    fetchProfileDirectly
  };
};
