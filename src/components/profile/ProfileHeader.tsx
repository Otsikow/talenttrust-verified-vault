
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Edit, 
  Save,
  Mail,
  MapPin,
  Calendar,
  Camera
} from "lucide-react";
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

interface ProfileHeaderProps {
  profileData: ProfileData;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
}

const ProfileHeader = ({ profileData, isEditing, onEditToggle, onSave }: ProfileHeaderProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
    onSave();
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl">
                {profileData.firstName[0] || 'U'}{profileData.lastName[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData.firstName || profileData.lastName ? 
                  `${profileData.firstName} ${profileData.lastName}`.trim() : 
                  'Your Name'
                }
              </h1>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button onClick={onEditToggle}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={onEditToggle}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-4">
              {profileData.jobTitle || 'Add your job title'}
            </p>
            
            <div className="flex items-center space-x-6 text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{profileData.email}</span>
              </div>
              {profileData.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData.joinDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                {profileData.verificationScore}% Verified
              </Badge>
              <Badge variant="outline">
                {profileData.documentsVerified}/{profileData.totalDocuments} Documents Verified
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
