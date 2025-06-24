
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Edit, 
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Camera
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+44 7700 900123",
    location: "London, United Kingdom",
    jobTitle: "Senior Software Engineer",
    company: "Tech Solutions Ltd",
    bio: "Experienced software engineer with over 8 years in full-stack development. Passionate about creating scalable web applications and mentoring junior developers.",
    joinDate: "January 2023",
    verificationScore: 95,
    documentsVerified: 8,
    totalDocuments: 9
  });

  const verifiedSkills = [
    "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "GraphQL"
  ];

  const recentActivity = [
    { action: "Updated CV", date: "2 days ago" },
    { action: "Verified AWS Certificate", date: "1 week ago" },
    { action: "Applied to TechCorp Position", date: "2 weeks ago" },
    { action: "Completed Profile", date: "3 weeks ago" }
  ];

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
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
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-2xl">
                    {userProfile.firstName[0]}{userProfile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </h1>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
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
                
                <p className="text-lg text-gray-600 mb-4">{userProfile.jobTitle}</p>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    {userProfile.verificationScore}% Verified
                  </Badge>
                  <Badge variant="outline">
                    {userProfile.documentsVerified}/{userProfile.totalDocuments} Documents Verified
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="skills">Skills & Qualifications</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
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
                      value={userProfile.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Surname</Label>
                    <Input
                      id="lastName"
                      value={userProfile.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      disabled={!isEditing}
                      onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Current Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={userProfile.jobTitle}
                      disabled={!isEditing}
                      onChange={(e) => setUserProfile({...userProfile, jobTitle: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label htmlFor="bio">Professional Summary</Label>
                  <textarea
                    id="bio"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    rows={4}
                    value={userProfile.bio}
                    disabled={!isEditing}
                    onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Verified Skills & Qualifications</CardTitle>
                <CardDescription>Skills and qualifications verified through your uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {verifiedSkills.map((skill) => (
                        <Badge key={skill} className="bg-green-100 text-green-700">
                          <Shield className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Verified Documents</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span>Bachelor's Degree - Computer Science</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span>AWS Solutions Architect Certificate</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => navigate("/vault")}>
                    View All Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and updates on TrustTalent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Important account management options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
