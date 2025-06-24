
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import ProfileSkills from "./ProfileSkills";
import ProfileActivity from "./ProfileActivity";
import ProfileSettings from "./ProfileSettings";

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

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  profileData: ProfileData;
  isEditing: boolean;
  onProfileDataChange: (data: ProfileData) => void;
}

const ProfileTabs = ({ 
  activeTab, 
  onTabChange, 
  profileData, 
  isEditing, 
  onProfileDataChange 
}: ProfileTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-8">
        <TabsTrigger value="profile">Profile Details</TabsTrigger>
        <TabsTrigger value="skills">Skills & Qualifications</TabsTrigger>
        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <ProfilePersonalInfo 
          profileData={profileData}
          isEditing={isEditing}
          onProfileDataChange={onProfileDataChange}
        />
      </TabsContent>

      <TabsContent value="skills">
        <ProfileSkills />
      </TabsContent>

      <TabsContent value="activity">
        <ProfileActivity />
      </TabsContent>

      <TabsContent value="settings">
        <ProfileSettings />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
