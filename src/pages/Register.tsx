
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const defaultRole = searchParams.get("role") || "seeker";
  
  const [activeTab, setActiveTab] = useState(defaultRole);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    company: "",
    universityName: "",
    accreditationId: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Mock registration - in real app, this would integrate with Supabase Auth
    toast({
      title: "Account Created!",
      description: "Welcome to TrustTalent. Redirecting to your dashboard...",
    });

    // Simulate successful registration and redirect to appropriate dashboard
    setTimeout(() => {
      if (activeTab === "seeker") {
        navigate("/dashboard/seeker");
      } else if (activeTab === "employer") {
        navigate("/dashboard/employer");
      } else if (activeTab === "university") {
        navigate("/dashboard/university");
      } else {
        navigate("/dashboard/admin");
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 py-12">
      {/* Back Arrow */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/lovable-uploads/50f771b2-c841-4b41-8a90-1fa61ce4d7f9.png" alt="TrustTalent Shield" className="h-8 w-8" />
            <span className="text-2xl font-bold text-gray-900">TrustTalent</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join the verified talent revolution</p>
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Choose your account type and get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="seeker" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Seeker
                  </TabsTrigger>
                  <TabsTrigger value="employer" className="text-xs">
                    <Briefcase className="h-3 w-3 mr-1" />
                    Employer
                  </TabsTrigger>
                  <TabsTrigger value="university" className="text-xs">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    University
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="text-xs">
                    <img src="/lovable-uploads/50f771b2-c841-4b41-8a90-1fa61ce4d7f9.png" alt="TrustTalent" className="h-3 w-3 mr-1" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  {/* Common Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <TabsContent value="employer" className="space-y-4 m-0">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required={activeTab === "employer"}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="university" className="space-y-4 m-0">
                    <div className="space-y-2">
                      <Label htmlFor="universityName">University Name</Label>
                      <Input
                        id="universityName"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleInputChange}
                        required={activeTab === "university"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accreditationId">Accreditation ID (Optional)</Label>
                      <Input
                        id="accreditationId"
                        name="accreditationId"
                        value={formData.accreditationId}
                        onChange={handleInputChange}
                        placeholder="e.g., WASC, ABET, etc."
                      />
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Create Account
                  </Button>
                </form>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
                    Sign in
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
