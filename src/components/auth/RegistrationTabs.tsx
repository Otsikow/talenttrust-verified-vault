
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, GraduationCap } from "lucide-react";
import { RegistrationForm } from "./RegistrationForm";

interface RegistrationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const RegistrationTabs: React.FC<RegistrationTabsProps> = ({
  activeTab,
  setActiveTab,
  formData,
  handleInputChange,
  handleSubmit
}) => {
  return (
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

      <RegistrationForm
        activeTab={activeTab}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Tabs>
  );
};
