
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Briefcase, 
  Search,
  Bell,
  User,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data with British terminology
  const verificationStats = {
    total: 8,
    verified: 5,
    pending: 2,
    failed: 1
  };

  const recentDocuments = [
    { id: 1, name: "Bachelor's Degree - Computer Science", type: "degree", status: "verified", university: "Oxford University" },
    { id: 2, name: "AWS Cloud Practitioner Certificate", type: "certificate", status: "verified", issuer: "Amazon Web Services" },
    { id: 3, name: "Employment Reference - Google", type: "reference", status: "pending", issuer: "Google Ltd" },
    { id: 4, name: "Portfolio - Mobile App Project", type: "work_sample", status: "verified", issuer: "Self" }
  ];

  const jobRecommendations = [
    { id: 1, title: "Senior Software Engineer", company: "TechCorp Ltd", location: "London, UK", verificationRequired: true, match: 95 },
    { id: 2, title: "Full Stack Developer", company: "StartupXYZ", location: "Remote", verificationRequired: true, match: 88 },
    { id: 3, title: "Software Architect", company: "BigTech Inc", location: "Manchester, UK", verificationRequired: false, match: 92 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "failed": return "text-red-600 bg-red-100";
      default: return "text-grey-600 bg-grey-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "failed": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-grey-900">TrustTalent</span>
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
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-grey-900 mb-2">Welcome back, John!</h1>
          <p className="text-grey-600">Your verification profile is {Math.round((verificationStats.verified / verificationStats.total) * 100)}% complete</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Recommended Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="vault">Document Vault</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Verified Documents</p>
                      <p className="text-3xl font-bold text-green-700">{verificationStats.verified}</p>
                    </div>
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Pending Verification</p>
                      <p className="text-3xl font-bold text-yellow-700">{verificationStats.pending}</p>
                    </div>
                    <Clock className="h-12 w-12 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Documents</p>
                      <p className="text-3xl font-bold text-blue-700">{verificationStats.total}</p>
                    </div>
                    <FileText className="h-12 w-12 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Profile Strength</p>
                      <p className="text-3xl font-bold text-purple-700">{Math.round((verificationStats.verified / verificationStats.total) * 100)}%</p>
                    </div>
                    <Shield className="h-12 w-12 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with TrustTalent verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-24 flex-col space-y-2" variant="outline" onClick={() => navigate("/vault")}>
                    <Upload className="h-8 w-8" />
                    <span>Upload Documents</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2" variant="outline" onClick={() => navigate("/jobs")}>
                    <Search className="h-8 w-8" />
                    <span>Find Jobs</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2" variant="outline" onClick={() => navigate("/profile")}>
                    <Briefcase className="h-8 w-8" />
                    <span>Update Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Your latest document verification activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-grey-600">{doc.issuer || doc.university}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>Jobs matched to your verified skills and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobRecommendations.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6 hover:border-blue-200 transition-colours">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-grey-900">{job.title}</h3>
                          <p className="text-grey-600">{job.company} • {job.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">
                            {job.match}% Match
                          </Badge>
                          {job.verificationRequired && (
                            <Badge className="block bg-green-100 text-green-700">
                              <Shield className="h-3 w-3 mr-1" />
                              Verification Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Progress value={job.match} className="w-32" />
                          <span className="text-sm text-grey-600">Skill Match</span>
                        </div>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button onClick={() => navigate("/jobs")}>
                    View All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track your job application status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-grey-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-grey-900 mb-2">No applications yet</h3>
                  <p className="text-grey-600 mb-4">Start applying to jobs to see your application status here</p>
                  <Button onClick={() => navigate("/jobs")}>
                    Find Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vault">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Document Vault</CardTitle>
                    <CardDescription>Manage your verified credentials</CardDescription>
                  </div>
                  <Button onClick={() => navigate("/vault")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-grey-600">{doc.issuer || doc.university}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button onClick={() => navigate("/vault")}>
                    View All Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SeekerDashboard;
