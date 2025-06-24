
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, FileText, Shield, Eye, Download, Trash2 } from "lucide-react";
import DocumentVaultHeader from "@/components/vault/DocumentVaultHeader";
import UploadDialog from "@/components/vault/UploadDialog";
import DocumentStats from "@/components/vault/DocumentStats";
import DocumentList from "@/components/vault/DocumentList";
import { useDocuments } from "@/hooks/useDocuments";

const DocumentVault = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { documents, isLoading } = useDocuments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DocumentVaultHeader />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Document Vault</h1>
            <p className="text-gray-600 text-sm sm:text-base">Securely store and manage your professional documents</p>
          </div>
          <Button 
            onClick={() => setIsUploadDialogOpen(true)}
            className="flex items-center space-x-2 w-full sm:w-auto"
            size="default"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Document</span>
          </Button>
        </div>

        {/* Stats Section */}
        <DocumentStats />

        {/* Quick Actions */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm">Common document management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-start space-x-3 h-auto p-4 hover:shadow-md transition-shadow"
                onClick={() => setIsUploadDialogOpen(true)}
              >
                <Upload className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">Upload New Document</div>
                  <div className="text-xs text-gray-500">Add credentials to your vault</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-start space-x-3 h-auto p-4 hover:shadow-md transition-shadow"
              >
                <Shield className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">Verify Documents</div>
                  <div className="text-xs text-gray-500">Increase your trust score</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-start space-x-3 h-auto p-4 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1"
              >
                <FileText className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">Share Portfolio</div>
                  <div className="text-xs text-gray-500">Generate shareable link</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <DocumentList documents={documents} isLoading={isLoading} />

        {/* Upload Dialog */}
        <UploadDialog 
          isOpen={isUploadDialogOpen} 
          onClose={() => setIsUploadDialogOpen(false)} 
        />
      </div>
    </div>
  );
};

export default DocumentVault;
