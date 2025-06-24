
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText,
  Download,
  Share,
  Trash2,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface DocumentCardProps {
  document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "failed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "failed": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "degree": return "bg-blue-100 text-blue-700";
      case "certificate": return "bg-purple-100 text-purple-700";
      case "license": return "bg-orange-100 text-orange-700";
      case "reference": return "bg-green-100 text-green-700";
      case "work_sample": return "bg-pink-100 text-pink-700";
      case "cv_resume": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleVerifyDocument = (docId: number) => {
    toast({
      title: "Verification Started",
      description: "Your document has been sent to TalentTrust AI for verification. You'll be notified when complete.",
    });
  };

  const handleShareDocument = (docId: number) => {
    toast({
      title: "Document Shared",
      description: "Document sharing link has been copied to your clipboard.",
    });
  };

  return (
    <div className="border rounded-lg p-4 sm:p-6 hover:border-blue-200 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 space-y-4 sm:space-y-0">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className={`p-2 sm:p-3 rounded-lg ${getStatusColor(document.status)} flex-shrink-0`}>
            {getStatusIcon(document.status)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">{document.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 break-words">{document.issuer}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={`${getTypeColor(document.type)} text-xs`}>
                {document.type.replace('_', ' ')}
              </Badge>
              <Badge className={`${getStatusColor(document.status)} text-xs`}>
                {document.status}
              </Badge>
              {document.verificationScore && (
                <Badge variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  {document.verificationScore}% verified
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:space-x-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          {document.status === "verified" && (
            <Button variant="outline" size="sm" onClick={() => handleShareDocument(document.id)} className="text-xs sm:text-sm">
              <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          )}
          {document.status !== "verified" && document.status !== "pending" && (
            <Button size="sm" onClick={() => handleVerifyDocument(document.id)} className="text-xs sm:text-sm">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Verify</span>
            </Button>
          )}
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
        <div>
          <span className="font-medium">Uploaded:</span> {new Date(document.uploadDate).toLocaleDateString()}
        </div>
        {document.expiryDate && (
          <div>
            <span className="font-medium">Expires:</span> {new Date(document.expiryDate).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="font-medium">Privacy:</span> {document.privacy}
        </div>
        {document.status === "verified" && (
          <div>
            <span className="font-medium">Verification Date:</span> {new Date().toLocaleDateString()}
          </div>
        )}
      </div>
      
      {document.status === "failed" && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs sm:text-sm text-red-700">
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            Verification failed. The document could not be verified with the issuing institution. 
            Please check the document quality and try again.
          </p>
        </div>
      )}
      
      {document.status === "pending" && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs sm:text-sm text-yellow-700">
            <Clock className="h-4 w-4 inline mr-2" />
            Verification in progress. TalentTrust AI is currently verifying this document. 
            You'll be notified when complete.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
