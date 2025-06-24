
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobsHeader from "@/components/jobs/JobsHeader";
import JobSearchFilters from "@/components/jobs/JobSearchFilters";
import JobList from "@/components/jobs/JobList";

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

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setJobType("all");
    setVerificationRequired("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <JobsHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-600">Discover opportunities that match your verified skills and experience</p>
        </div>

        <JobSearchFilters
          searchTerm={searchTerm}
          location={location}
          jobType={jobType}
          verificationRequired={verificationRequired}
          onSearchTermChange={setSearchTerm}
          onLocationChange={setLocation}
          onJobTypeChange={setJobType}
          onVerificationRequiredChange={setVerificationRequired}
        />

        <JobList 
          jobs={filteredJobs}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
};

export default FindJobs;
