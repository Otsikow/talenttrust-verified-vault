
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { profileService, UpdateProfileData } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // User profile state that gets populated from auth
  const [profileData, setProfileData] = useState({
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

  // Load profile data when userProfile changes
  useEffect(() => {
    if (userProfile && user && !profileLoaded) {
      console.log('Loading profile data:', userProfile);
      
      // Parse full name into first and last name
      const nameParts = userProfile.full_name?.split(' ') || [''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setProfileData({
        firstName,
        lastName,
        email: userProfile.email || user.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        jobTitle: userProfile.job_title || '',
        company: userProfile.company || '',
        bio: userProfile.bio || '',
        joinDate: userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }) : '',
        verificationScore: userProfile.verification_score || 0,
        documentsVerified: userProfile.documents_verified || 0,
        totalDocuments: userProfile.total_documents || 0
      });

      // Set avatar URL if exists
      if (user.id) {
        setAvatarUrl(`https://mjaqvbuhnhatofwkgako.supabase.co/storage/v1/object/public/avatars/avatars/${user.id}.jpg`);
      }
      
      setProfileLoaded(true);
    }
  }, [userProfile, user, profileLoaded]);

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
        description: "Profile updated successfully and saved to database",
      });
      setIsEditing(false);
      // Force a reload of the profile data to confirm it was saved
      setProfileLoaded(false);
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

  // Show loading or redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  if (!profileLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/2c6e0c31-9b9d-41e7-8a6c-71bbba71fe34.png" alt="TrustTalent Logo" className="h-6 w-6" />
              <span className="text-xl font-bold text-gray-900">TrustTalent</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => navigate("/dashboard/seeker")}>Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate("/jobs")}>Find Jobs</Button>
              <Button variant="ghost" onClick={() => navigate("/vault")}>My Vault</Button>
              <Button variant="ghost" onClick={() => navigate("/messages")}>Messages</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")}>
              <span className="sr-only">Notifications</span>
              🔔
            </Button>
            <Button variant="ghost" size="sm" className="font-medium">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ProfileHeader 
          profileData={profileData}
          isEditing={isEditing && !isLoading}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          avatarUrl={avatarUrl}
          onAvatarChange={handleAvatarChange}
        />

        <ProfileTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          profileData={profileData}
          isEditing={isEditing && !isLoading}
          onProfileDataChange={setProfileData}
        />
      </div>
    </div>
  );
};

export default Profile;
