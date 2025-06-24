
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
  const { user, userProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

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

  // Load profile data when userProfile changes or on mount
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

  const loadProfileData = (profile: any) => {
    console.log('Loading profile data:', profile);
    
    // Parse full name into first and last name
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

    // Set avatar URL if exists
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
        // Set default values with user email
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

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect if no user (will happen automatically via useEffect)
  if (!user) {
    return null;
  }

  // Show loading while fetching profile
  if (isLoading && !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  // Show error state
  if (profileError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">Error loading profile</div>
          <div className="text-sm text-gray-600 mb-4">{profileError}</div>
          <Button onClick={fetchProfileDirectly}>Try Again</Button>
        </div>
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
