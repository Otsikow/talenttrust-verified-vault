
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/auth/BackButton";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { RegistrationTabs } from "@/components/auth/RegistrationTabs";

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
      <BackButton 
        onClick={() => navigate("/")}
        text="Back to Home"
      />

      <div className="container mx-auto px-4">
        <LoginHeader
          logoSrc="/lovable-uploads/50f771b2-c841-4b41-8a90-1fa61ce4d7f9.png"
          title="Create Your Account"
          subtitle="Join the verified talent revolution"
        />

        {/* Registration Form */}
        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Choose your account type and get started</CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />

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
