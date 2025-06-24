
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Download,
  Share,
  Trash2,
  Plus,
  Search,
  Filter,
  Camera,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DocumentVault = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [uploadMethod, setUploadMethod] = useState<"file" | "camera">("file");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Mock documents data
  const [documents] = useState([
    {
      id: 1,
      name: "Bachelor's Degree - Computer Science",
      type: "degree",
      issuer: "Stanford University",
      uploadDate: "2024-01-15",
      expiryDate: null,
      status: "verified",
      verificationScore: 98,
      privacy: "private",
      fileUrl: "/mock/degree.pdf"
    },
    {
      id: 2,
      name: "AWS Cloud Practitioner Certificate",
      type: "certificate",
      issuer: "Amazon Web Services",
      uploadDate: "2024-02-10",
      expiryDate: "2027-02-10",
      status: "verified",
      verificationScore: 95,
      privacy: "shared",
      fileUrl: "/mock/aws-cert.pdf"
    },
    {
      id: 3,
      name: "Employment Reference - Google",
      type: "reference",
      issuer: "Google Inc.",
      uploadDate: "2024-02-20",
      expiryDate: null,
      status: "pending",
      verificationScore: null,
      privacy: "private",
      fileUrl: "/mock/reference.pdf"
    },
    {
      id: 4,
      name: "Portfolio - Mobile App Project",
      type: "work_sample",
      issuer: "Self",
      uploadDate: "2024-02-25",
      expiryDate: null,
      status: "verified",
      verificationScore: 92,
      privacy: "shared",
      fileUrl: "/mock/portfolio.pdf"
    },
    {
      id: 5,
      name: "Driver's License",
      type: "license",
      issuer: "California DMV",
      uploadDate: "2024-01-30",
      expiryDate: "2028-01-30",
      status: "failed",
      verificationScore: null,
      privacy: "private",
      fileUrl: "/mock/license.pdf"
    }
  ]);

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

  const handleCameraCapture = async () => {
    try {
      // Check if we're on mobile and can access camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          } 
        });
        
        // Create a video element to capture frame
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        
        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          
          // Create capture button overlay
          const captureDiv = document.createElement('div');
          captureDiv.style.position = 'fixed';
          captureDiv.style.top = '0';
          captureDiv.style.left = '0';
          captureDiv.style.width = '100vw';
          captureDiv.style.height = '100vh';
          captureDiv.style.backgroundColor = 'black';
          captureDiv.style.zIndex = '9999';
          captureDiv.style.display = 'flex';
          captureDiv.style.flexDirection = 'column';
          captureDiv.style.alignItems = 'center';
          captureDiv.style.justifyContent = 'center';
          
          video.style.width = '100%';
          video.style.height = 'auto';
          video.style.maxHeight = '80vh';
          
          const captureBtn = document.createElement('button');
          captureBtn.textContent = 'Capture';
          captureBtn.style.margin = '20px';
          captureBtn.style.padding = '15px 30px';
          captureBtn.style.fontSize = '18px';
          captureBtn.style.backgroundColor = '#3b82f6';
          captureBtn.style.color = 'white';
          captureBtn.style.border = 'none';
          captureBtn.style.borderRadius = '8px';
          captureBtn.style.cursor = 'pointer';
          
          const closeBtn = document.createElement('button');
          closeBtn.textContent = 'Close';
          closeBtn.style.margin = '10px';
          closeBtn.style.padding = '10px 20px';
          closeBtn.style.fontSize = '16px';
          closeBtn.style.backgroundColor = '#6b7280';
          closeBtn.style.color = 'white';
          closeBtn.style.border = 'none';
          closeBtn.style.borderRadius = '8px';
          closeBtn.style.cursor = 'pointer';
          
          captureDiv.appendChild(video);
          captureDiv.appendChild(captureBtn);
          captureDiv.appendChild(closeBtn);
          document.body.appendChild(captureDiv);
          
          captureBtn.onclick = () => {
            ctx?.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            setCapturedImage(imageData);
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(captureDiv);
            toast({
              title: "Photo Captured",
              description: "Document photo captured successfully. Fill in the details below.",
            });
          };
          
          closeBtn.onclick = () => {
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(captureDiv);
          };
        };
      } else {
        // Fallback for browsers without camera access
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setCapturedImage(e.target?.result as string);
              toast({
                title: "Photo Selected",
                description: "Document photo selected successfully. Fill in the details below.",
              });
            };
            reader.readAsDataURL(file);
          }
        };
        
        input.click();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      // Fallback to file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setCapturedImage(e.target?.result as string);
            toast({
              title: "Photo Selected",
              description: "Document photo selected successfully. Fill in the details below.",
            });
          };
          reader.readAsDataURL(file);
        }
      };
      
      input.click();
    }
  };

  const resetUploadForm = () => {
    setUploadMethod("file");
    setCapturedImage(null);
  };

  const handleBackToDashboard = () => {
    navigate(-1); // Go back to previous page
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header - Mobile Optimized */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
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

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Page Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Document Vault</h1>
          <p className="text-sm sm:text-base text-gray-600">Securely store, verify, and manage your professional credentials</p>
        </div>

        {/* Stats Cards - Mobile Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-green-600">Verified</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700">
                    {documents.filter(doc => doc.status === "verified").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-700">
                    {documents.filter(doc => doc.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Avg. Score</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
                    {Math.round(documents.filter(doc => doc.verificationScore).reduce((acc, doc) => acc + doc.verificationScore!, 0) / documents.filter(doc => doc.verificationScore).length)}%
                  </p>
                </div>
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls - Mobile Responsive */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col space-y-4">
              {/* Search and Filters Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2 sm:space-x-4">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="degree">Degrees</SelectItem>
                      <SelectItem value="certificate">Certificates</SelectItem>
                      <SelectItem value="license">Licenses</SelectItem>
                      <SelectItem value="reference">References</SelectItem>
                      <SelectItem value="work_sample">Work Samples</SelectItem>
                      <SelectItem value="cv_resume">CV/Resume</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Upload Button */}
              <div className="flex justify-center sm:justify-end">
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
                              onClick={handleCameraCapture}
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List - Mobile Responsive */}
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
                <div key={document.id} className="border rounded-lg p-4 sm:p-6 hover:border-blue-200 transition-colors">
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
                        {/* Upload form would go here */}
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentVault;
