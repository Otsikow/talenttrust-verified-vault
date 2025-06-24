
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface ProfilePersonalInfoProps {
  profileData: ProfileData;
  isEditing: boolean;
  onProfileDataChange: (data: ProfileData) => void;
}

const ProfilePersonalInfo = ({ profileData, isEditing, onProfileDataChange }: ProfilePersonalInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Manage your personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, firstName: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Surname</Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, lastName: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, email: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profileData.phone}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, phone: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profileData.location}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, location: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="jobTitle">Current Job Title</Label>
            <Input
              id="jobTitle"
              value={profileData.jobTitle}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, jobTitle: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profileData.company}
              disabled={!isEditing}
              onChange={(e) => onProfileDataChange({...profileData, company: e.target.value})}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Label htmlFor="bio">Professional Summary</Label>
          <Textarea
            id="bio"
            rows={4}
            value={profileData.bio}
            disabled={!isEditing}
            onChange={(e) => onProfileDataChange({...profileData, bio: e.target.value})}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePersonalInfo;
