
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

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

  useEffect(() => {
    if (userProfile && user) {
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
    }
  }, [userProfile, user]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Show loading or redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
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
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
        />

        <ProfileTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          profileData={profileData}
          isEditing={isEditing}
          onProfileDataChange={setProfileData}
        />
      </div>
    </div>
  );
};

export default Profile;
