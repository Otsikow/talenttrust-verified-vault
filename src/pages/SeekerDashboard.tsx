
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, 
  Shield, 
  Briefcase, 
  MessageSquare, 
  Star,
  TrendingUp,
  Calendar,
  Bell,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [displayName, setDisplayName] = useState("Your Name");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  useEffect(() => {
    if (userProfile && user) {
      // Parse full name or use email
      const fullName = userProfile.full_name?.trim();
      if (fullName) {
        setDisplayName(fullName);
      } else if (user.email) {
        setDisplayName(user.email.split('@')[0]);
      }

      // Set avatar URL if exists
      if (user.id) {
        setAvatarUrl(`https://mjaqvbuhnhatofwkgako.supabase.co/storage/v1/object/public/avatars/avatars/${user.id}.jpg`);
      }
    }
  }, [userProfile, user]);

  // Generate initials from display name
  const getInitials = () => {
    if (userProfile?.full_name) {
      const nameParts = userProfile.full_name.split(' ');
      const firstInitial = nameParts[0]?.[0] || '';
      const lastInitial = nameParts[1]?.[0] || '';
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    return displayName?.slice(0, 2).toUpperCase() || 'U';
  };

  // Show loading or redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  const stats = [
    { label: "Documents Uploaded", value: userProfile?.total_documents || 0, icon: FileText },
    { label: "Verification Score", value: `${userProfile?.verification_score || 0}%`, icon: Shield },
    { label: "Applications Sent", value: 12, icon: Briefcase },
    { label: "Profile Views", value: 48, icon: TrendingUp },
  ];

  const recentActivity = [
    { action: "Document verified", item: "University Degree", time: "2 hours ago", status: "success" },
    { action: "Application sent", item: "Software Engineer at TechCorp", time: "1 day ago", status: "pending" },
    { action: "Profile updated", item: "Work experience added", time: "2 days ago", status: "info" },
    { action: "Document uploaded", item: "Professional Certificate", time: "3 days ago", status: "success" },
  ];

  const quickActions = [
    { title: "Upload Document", description: "Add new credentials to your vault", icon: FileText, action: () => navigate("/vault") },
    { title: "Find Jobs", description: "Browse and apply to new opportunities", icon: Briefcase, action: () => navigate("/jobs") },
    { title: "Update Profile", description: "Keep your information current", icon: User, action: () => navigate("/profile") },
    { title: "Messages", description: "Check your conversations", icon: MessageSquare, action: () => navigate("/messages") },
  ];

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
              <Button variant="ghost" className="font-medium">Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate("/jobs")}>Find Jobs</Button>
              <Button variant="ghost" onClick={() => navigate("/vault")}>My Vault</Button>
              <Button variant="ghost" onClick={() => navigate("/messages")}>Messages</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")}>
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-xs">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{displayName}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {displayName.split(' ')[0] || displayName}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your job search today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get things done faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <action.icon className="h-6 w-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Completion */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Profile Completion</span>
            </CardTitle>
            <CardDescription>Complete your profile to get better job matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">✓ Basic Info</Badge>
              <Badge variant="outline">✓ Work Experience</Badge>
              <Badge variant="outline">Education</Badge>
              <Badge variant="secondary">Skills</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeekerDashboard;
