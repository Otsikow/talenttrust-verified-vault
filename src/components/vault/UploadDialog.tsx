
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Upload, Camera } from "lucide-react";
import CameraCapture from "./CameraCapture";
import { useDocuments } from "@/hooks/useDocuments";
import { useToast } from "@/hooks/use-toast";

const UploadDialog = () => {
  const [uploadMethod, setUploadMethod] = useState<"file" | "camera">("file");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [customDocumentType, setCustomDocumentType] = useState("");
  const [issuer, setIssuer] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { uploadDocument } = useDocuments();
  const { toast } = useToast();
  const cameraCapture = CameraCapture({ onCapture: setCapturedImage });

  const resetUploadForm = () => {
    setUploadMethod("file");
    setCapturedImage(null);
    setSelectedFile(null);
    setDocumentName("");
    setDocumentType("");
    setCustomDocumentType("");
    setIssuer("");
    setExpiryDate("");
    setIsUploading(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF, JPEG, or PNG file",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const convertDataUrlToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);

      if (!documentName || !documentType || !issuer) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      let fileToUpload: File | null = null;

      if (uploadMethod === "file" && selectedFile) {
        fileToUpload = selectedFile;
      } else if (uploadMethod === "camera" && capturedImage) {
        fileToUpload = convertDataUrlToFile(capturedImage, `${documentName}.jpg`);
      }

      if (!fileToUpload) {
        toast({
          title: "No File Selected",
          description: "Please select a file or capture an image",
          variant: "destructive"
        });
        return;
      }

      // Use custom document type if "other" is selected
      const finalDocumentType = documentType === "other" ? customDocumentType : documentType;

      if (documentType === "other" && !customDocumentType) {
        toast({
          title: "Missing Custom Type",
          description: "Please specify the custom document type",
          variant: "destructive"
        });
        return;
      }

      await uploadDocument(fileToUpload, {
        name: documentName,
        type: finalDocumentType as any,
        issuer: issuer,
        expiry_date: expiryDate || undefined,
        privacy: 'private'
      });

      setIsOpen(false);
      resetUploadForm();
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetUploadForm();
    }}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
          <DialogDescription>
            Add a new document to your secure vault for verification
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Upload Method Selection */}
          <div className="space-y-2">
            <Label>Upload Method</Label>
            <div className="flex space-x-2">
              <Button 
                variant={uploadMethod === "file" ? "default" : "outline"}
                size="sm"
                onClick={() => setUploadMethod("file")}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                File Upload
              </Button>
              <Button 
                variant={uploadMethod === "camera" ? "default" : "outline"}
                size="sm"
                onClick={() => setUploadMethod("camera")}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
            </div>
          </div>

          {/* File Upload or Camera Capture */}
          <div>
            <Label htmlFor="file">
              {uploadMethod === "file" ? "Select File" : "Capture Document"}
            </Label>
            {uploadMethod === "file" ? (
              <div className="space-y-2">
                <Input 
                  id="file" 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, JPEG, PNG (max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={cameraCapture.handleCameraCapture}
                  className="w-full"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                {capturedImage && (
                  <div className="mt-2">
                    <img 
                      src={capturedImage} 
                      alt="Captured document" 
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <p className="text-sm text-green-600 mt-1">✓ Document captured</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="docName">Document Name *</Label>
            <Input 
              id="docName" 
              placeholder="e.g., Bachelor's Degree in Computer Science"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="docType">Document Type *</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="degree">Degree</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="license">License</SelectItem>
                <SelectItem value="reference">Reference</SelectItem>
                <SelectItem value="work_sample">Work Sample</SelectItem>
                <SelectItem value="cv_resume">CV/Resume</SelectItem>
                <SelectItem value="transcript">Transcript</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="id_card">ID Card</SelectItem>
                <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                <SelectItem value="marriage_certificate">Marriage Certificate</SelectItem>
                <SelectItem value="bank_statement">Bank Statement</SelectItem>
                <SelectItem value="insurance_document">Insurance Document</SelectItem>
                <SelectItem value="tax_document">Tax Document</SelectItem>
                <SelectItem value="medical_record">Medical Record</SelectItem>
                <SelectItem value="other">Other (specify below)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {documentType === "other" && (
            <div>
              <Label htmlFor="customType">Custom Document Type *</Label>
              <Input 
                id="customType" 
                placeholder="e.g., Professional Membership Card"
                value={customDocumentType}
                onChange={(e) => setCustomDocumentType(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="issuer">Issuing Institution *</Label>
            <Input 
              id="issuer" 
              placeholder="e.g., Stanford University, DMV, etc."
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="expiry">Expiry Date (if applicable)</Label>
            <Input 
              id="expiry" 
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              className="flex-1" 
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
