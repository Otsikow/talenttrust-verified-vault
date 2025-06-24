
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Upload, Camera } from "lucide-react";
import CameraCapture from "./CameraCapture";

const UploadDialog = () => {
  const [uploadMethod, setUploadMethod] = useState<"file" | "camera">("file");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraCapture = CameraCapture({ onCapture: setCapturedImage });

  const resetUploadForm = () => {
    setUploadMethod("file");
    setCapturedImage(null);
  };

  return (
    <Dialog onOpenChange={() => resetUploadForm()}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
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
              <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
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
            <Label htmlFor="docName">Document Name</Label>
            <Input id="docName" placeholder="e.g., Bachelor's Degree in Computer Science" />
          </div>
          <div>
            <Label htmlFor="docType">Document Type</Label>
            <Select>
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
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="issuer">Issuing Institution</Label>
            <Input id="issuer" placeholder="e.g., Stanford University" />
          </div>
          <div>
            <Label htmlFor="expiry">Expiry Date (if applicable)</Label>
            <Input id="expiry" type="date" />
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1">Upload Document</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
