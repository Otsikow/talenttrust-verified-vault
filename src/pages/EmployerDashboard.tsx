
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Briefcase, 
  CheckCircle, 
  Search,
  Bell,
  User,
  Plus,
  Filter,
  Calendar,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data with British terminology
  const hiringStats = {
    activeJobs: 12,
    totalApplicants: 248,
    verifiedApplicants: 156,
    interviews: 24
  };

  const recentJobs = [
    { id: 1, title: "Senior Software Engineer", applicants: 45, verified: 32, status: "active", posted: "2 days ago" },
    { id: 2, title: "Product Manager", applicants: 67, verified: 41, status: "active", posted: "5 days ago" },
    { id: 3, title: "UX Designer", applicants: 23, verified: 18, status: "paused", posted: "1 week ago" },
    { id: 4, title: "DevOps Engineer", applicants: 34, verified: 28, status: "active", posted: "3 days ago" }
  ];

  const topApplicants = [
    { id: 1, name: "Sarah Johnson", role: "Senior Software Engineer", verificationScore: 98, documents: 8, match: 95 },
    { id: 2, name: "Michael Chen", role: "Product Manager", verificationScore: 94, documents: 6, match: 88 },
    { id: 3, name: "Emily Rodriguez", role: "UX Designer", verificationScore: 96, documents: 7, match: 92 },
    { id: 4, name: "David Kim", role: "DevOps Engineer", verificationScore: 91, documents: 5, match: 87 }
  ];

  const getStatusColour = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "paused": return "text-yellow-600 bg-yellow-100";
      case "closed": return "text-red-600 bg-red-100";
      default: return "text-grey-600 bg-grey-100";
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
              <Button variant="ghost">Manage Jobs</Button>
              <Button variant="ghost">Candidates</Button>
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
          <h1 className="text-3xl font-bold text-grey-900 mb-2">Welcome back, TechCorp!</h1>
          <p className="text-grey-600">You have {hiringStats.verifiedApplicants} verified candidates across {hiringStats.activeJobs} active jobs</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Active Jobs</p>
                      <p className="text-3xl font-bold text-blue-700">{hiringStats.activeJobs}</p>
                    </div>
                    <Briefcase className="h-12 w-12 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Applicants</p>
                      <p className="text-3xl font-bold text-green-700">{hiringStats.totalApplicants}</p>
                    </div>
                    <Users className="h-12 w-12 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Verified Candidates</p>
                      <p className="text-3xl font-bold text-purple-700">{hiringStats.verifiedApplicants}</p>
                    </div>
                    <Shield className="h-12 w-12 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Scheduled Interviews</p>
                      <p className="text-3xl font-bold text-orange-700">{hiringStats.interviews}</p>
                    </div>
                    <Calendar className="h-12 w-12 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your hiring process efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="h-24 flex-col space-y-2" variant="outline">
                    <Plus className="h-8 w-8" />
                    <span>Post New Job</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2" variant="outline">
                    <Filter className="h-8 w-8" />
                    <span>Filter Verified</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2" variant="outline">
                    <Calendar className="h-8 w-8" />
                    <span>Schedule Interview</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2" variant="outline" onClick={() => navigate("/messages")}>
                    <MessageSquare className="h-8 w-8" />
                    <span>Message Candidates</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Verified Candidates */}
            <Card>
              <CardHeader>
                <CardTitle>Top Verified Candidates</CardTitle>
                <CardDescription>Highest verified candidates across all your jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topApplicants.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-200 transition-colours">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold">{candidate.name}</h4>
                          <p className="text-sm text-grey-600">{candidate.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-centre">
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">{candidate.verificationScore}%</span>
                          </div>
                          <p className="text-xs text-grey-600">{candidate.documents} docs verified</p>
                        </div>
                        <Badge variant="outline">
                          {candidate.match}% match
                        </Badge>
                        <Button size="sm">View Profile</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Jobs</CardTitle>
                    <CardDescription>Manage your active job postings</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-grey-900">{job.title}</h3>
                          <p className="text-grey-600">Posted {job.posted}</p>
                        </div>
                        <Badge className={getStatusColour(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-centre p-3 bg-grey-50 rounded-lg">
                          <p className="text-2xl font-bold text-grey-900">{job.applicants}</p>
                          <p className="text-sm text-grey-600">Total Applicants</p>
                        </div>
                        <div className="text-centre p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-700">{job.verified}</p>
                          <p className="text-sm text-green-600">Verified Candidates</p>
                        </div>
                        <div className="text-centre p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-700">{Math.round((job.verified / job.applicants) * 100)}%</p>
                          <p className="text-sm text-blue-600">Verification Rate</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit Job</Button>
                          <Button variant="outline" size="sm">View Applicants</Button>
                        </div>
                        <Button size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter Verified Only
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle>All Candidates</CardTitle>
                <CardDescription>Browse and filter candidates across all jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-center space-x-4">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Show Verified Only
                  </Button>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Filter by Skills
                  </Button>
                </div>
                <div className="space-y-4">
                  {topApplicants.map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{candidate.name}</h4>
                            <p className="text-grey-600">Applied for {candidate.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-700">
                            <Shield className="h-3 w-3 mr-1" />
                            {candidate.verificationScore}% Verified
                          </Badge>
                          <Badge variant="outline">{candidate.match}% Match</Badge>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-centre">
                        <div>
                          <p className="text-sm text-grey-600">Documents Verified</p>
                          <p className="text-xl font-semibold">{candidate.documents}</p>
                        </div>
                        <div>
                          <p className="text-sm text-grey-600">Verification Score</p>
                          <p className="text-xl font-semibold text-green-600">{candidate.verificationScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-grey-600">Job Match</p>
                          <p className="text-xl font-semibold text-blue-600">{candidate.match}%</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="outline">View Full Profile</Button>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => navigate("/messages")}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Interviews</CardTitle>
                <CardDescription>Manage your upcoming interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-centre py-12">
                  <Calendar className="h-16 w-16 text-grey-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-grey-900 mb-2">No interviews scheduled</h3>
                  <p className="text-grey-600 mb-4">Schedule interviews with qualified candidates to see them here</p>
                  <Button>
                    Browse Candidates
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

export default EmployerDashboard;
