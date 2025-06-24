
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DocumentVaultHeader = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    // Navigate to seeker dashboard as default, or you can implement logic to detect user type
    navigate("/dashboard/seeker");
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/2c6e0c31-9b9d-41e7-8a6c-71bbba71fe34.png" alt="TrustTalent Logo" className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">TrustTalent</span>
            <span className="hidden sm:inline text-gray-600">/ Document Vault</span>
          </div>
          <Button 
            onClick={handleBackToDashboard}
            variant="outline"
            size="sm"
            className="flex items-center space-x-1 sm:space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DocumentVaultHeader;
