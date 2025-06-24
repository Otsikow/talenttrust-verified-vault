
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Building, 
  Clock, 
  Pound, 
  Shield, 
  BookmarkPlus,
  Heart,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FindJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [verificationRequired, setVerificationRequired] = useState("all");

  // Mock job data with British terminology
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Ltd",
      location: "London, Greater London",
      type: "Permanent",
      salary: "£80,000 - £100,000",
      posted: "2 days ago",
      description: "We're seeking a talented Senior Software Engineer to join our innovative team. You'll be working on cutting-edge projects using the latest technologies.",
      requirements: ["5+ years experience", "React/TypeScript", "Node.js", "AWS"],
      verificationRequired: true,
      saved: false
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Manchester, Greater Manchester",
      type: "Permanent",
      salary: "£70,000 - £85,000",
      posted: "1 day ago",
      description: "Join our growing team as a Product Manager. You'll drive product strategy and work closely with our engineering and design teams.",
      requirements: ["3+ years Product Management", "Agile methodologies", "Stakeholder management"],
      verificationRequired: true,
      saved: true
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Agency",
      location: "Edinburgh, Scotland",
      type: "Contract",
      salary: "£450 - £550 per day",
      posted: "3 days ago",
      description: "We're looking for a creative UX Designer to help us craft exceptional user experiences for our clients.",
      requirements: ["Portfolio of UX work", "Figma/Sketch", "User research experience"],
      verificationRequired: false,
      saved: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Birmingham, West Midlands",
      type: "Permanent",
      salary: "£65,000 - £80,000",
      posted: "5 days ago",
      description: "Join our infrastructure team to build and maintain scalable cloud solutions for our enterprise clients.",
      requirements: ["Docker/Kubernetes", "AWS/Azure", "CI/CD pipelines", "Terraform"],
      verificationRequired: true,
      saved: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === "" || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase();
    const matchesVerification = verificationRequired === "all" || 
                               (verificationRequired === "required" && job.verificationRequired) ||
                               (verificationRequired === "not-required" && !job.verificationRequired);
    
    return matchesSearch && matchesLocation && matchesType && matchesVerification;
  });

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
              <Button variant="ghost" className="font-medium">Find Jobs</Button>
              <Button variant="ghost" onClick={() => navigate("/vault")}>My Vault</Button>
              <Button variant="ghost" onClick={() => navigate("/messages")}>Messages</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")}>
              <span className="sr-only">Notifications</span>
              🔔
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
              <span className="sr-only">Profile</span>
              👤
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-600">Discover opportunities that match your verified skills and experience</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter Jobs</CardTitle>
            <CardDescription>Use the filters below to find the perfect role for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, company, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>

              <Select value={verificationRequired} onValueChange={setVerificationRequired}>
                <SelectTrigger>
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="required">Verification Required</SelectItem>
                  <SelectItem value="not-required">No Verification Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                        {job.title}
                      </h3>
                      {job.verificationRequired && (
                        <Badge className="bg-green-100 text-green-700">
                          <Shield className="h-3 w-3 mr-1" />
                          Verification Required
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="outline">{job.type}</Badge>
                      <div className="flex items-center space-x-1 text-green-600 font-medium">
                        <Pound className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" variant={job.saved ? "default" : "outline"}>
                      {job.saved ? <Heart className="h-4 w-4 mr-2 fill-current" /> : <BookmarkPlus className="h-4 w-4 mr-2" />}
                      {job.saved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Company Profile</Button>
                  </div>
                  <Button size="sm">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more opportunities
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setLocation("");
                setJobType("all");
                setVerificationRequired("all");
              }}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindJobs;
