
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileNavigation from "@/components/navigation/MobileNavigation";

const JobsHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6 min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/2c6e0c31-9b9d-41e7-8a6c-71bbba71fe34.png" alt="TrustTalent Logo" className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">TrustTalent</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => navigate("/dashboard/seeker")} className="text-sm">Dashboard</Button>
              <Button variant="ghost" className="font-medium text-sm">Find Jobs</Button>
              <Button variant="ghost" onClick={() => navigate("/vault")} className="text-sm">My Vault</Button>
              <Button variant="ghost" onClick={() => navigate("/messages")} className="text-sm">Messages</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <MobileNavigation />
            <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")} className="hidden sm:flex">
              <span className="sr-only">Notifications</span>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="hidden sm:flex">
              <span className="sr-only">Profile</span>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JobsHeader;
