
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Briefcase } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TrustTalent</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join the verified talent revolution</p>
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Choose your account type and get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="seeker" className="text-xs">
                    <Users className="h-4 w-4 mr-1" />
                    Job Seeker
                  </TabsTrigger>
                  <TabsTrigger value="employer" className="text-xs">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Employer
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="text-xs">
                    <Shield className="h-4 w-4 mr-1" />
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
