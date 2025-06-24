
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import DocumentCard from "./DocumentCard";

interface Document {
  id: number;
  name: string;
  type: string;
  issuer: string;
  uploadDate: string;
  expiryDate: string | null;
  status: string;
  verificationScore: number | null;
  privacy: string;
  fileUrl: string;
}

interface DocumentListProps {
  documents: Document[];
  filteredDocuments: Document[];
  searchTerm: string;
  filterType: string;
  filterStatus: string;
}

const DocumentList = ({ documents, filteredDocuments, searchTerm, filterType, filterStatus }: DocumentListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Your Documents</CardTitle>
        <CardDescription>
          {filteredDocuments.length} of {documents.length} documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
                {searchTerm || filterType !== "all" || filterStatus !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Upload your first document to get started with verification"
                }
              </p>
              {!searchTerm && filterType === "all" && filterStatus === "all" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md mx-4 sm:mx-auto">
                    <DialogHeader>
                      <DialogTitle>Upload Your First Document</DialogTitle>
                      <DialogDescription>
                        Start building your verified credential profile
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentList;
