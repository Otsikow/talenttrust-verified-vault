
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileNavigation = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/2c6e0c31-9b9d-41e7-8a6c-71bbba71fe34.png" alt="TrustTalent Logo" className="h-6 w-6" />
            <span className="text-xl font-bold text-gray-900">TrustTalent</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Button variant="ghost" onClick={() => navigate("/dashboard/seeker")}>Dashboard</Button>
            <Button variant="ghost" onClick={() => navigate("/jobs")}>Find Jobs</Button>
            <Button variant="ghost" onClick={() => navigate("/vault")}>My Vault</Button>
            <Button variant="ghost" onClick={() => navigate("/messages")}>Messages</Button>
            <Button variant="ghost" onClick={() => navigate("/pricing")}>Pricing</Button>
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
  );
};

export default ProfileNavigation;
