
import React from "react";
import { Button } from "@/components/ui/button";
import { CommonFormFields } from "./CommonFormFields";
import { RoleSpecificFields } from "./RoleSpecificFields";

interface RegistrationFormProps {
  activeTab: string;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  activeTab,
  formData,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <CommonFormFields 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      <RoleSpecificFields
        activeTab={activeTab}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <Button type="submit" className="w-full" size="lg">
        Create Account
      </Button>
    </form>
  );
};
