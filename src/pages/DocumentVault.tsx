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
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentVault = () => {
  const { toast } = useToast();
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

  const handleCameraCapture = () => {
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
            title: "Photo Captured",
            description: "Document photo captured successfully. Fill in the details below.",
          });
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const resetUploadForm = () => {
    setUploadMethod("file");
    setCapturedImage(null);
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
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TrustTalent</span>
            <span className="text-gray-600">/ Document Vault</span>
          </div>
          <Button onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Document Vault</h1>
          <p className="text-gray-600">Securely store, verify, and manage your professional credentials</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Verified</p>
                  <p className="text-3xl font-bold text-green-700">
                    {documents.filter(doc => doc.status === "verified").length}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-700">
                    {documents.filter(doc => doc.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Avg. Score</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {Math.round(documents.filter(doc => doc.verificationScore).reduce((acc, doc) => acc + doc.verificationScore!, 0) / documents.filter(doc => doc.verificationScore).length)}%
                  </p>
                </div>
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="degree">Degrees</SelectItem>
                    <SelectItem value="certificate">Certificates</SelectItem>
                    <SelectItem value="license">Licenses</SelectItem>
                    <SelectItem value="reference">References</SelectItem>
                    <SelectItem value="work_sample">Work Samples</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
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
              
              <Dialog onOpenChange={() => resetUploadForm()}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
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
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>
              {filteredDocuments.length} of {documents.length} documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="border rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getStatusColor(document.status)}`}>
                        {getStatusIcon(document.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{document.name}</h3>
                        <p className="text-gray-600">{document.issuer}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getTypeColor(document.type)}>
                            {document.type.replace('_', ' ')}
                          </Badge>
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                          {document.verificationScore && (
                            <Badge variant="outline">
                              <Shield className="h-3 w-3 mr-1" />
                              {document.verificationScore}% verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {document.status === "verified" && (
                        <Button variant="outline" size="sm" onClick={() => handleShareDocument(document.id)}>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      )}
                      {document.status !== "verified" && document.status !== "pending" && (
                        <Button size="sm" onClick={() => handleVerifyDocument(document.id)}>
                          <Shield className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
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
                      <p className="text-sm text-red-700">
                        <AlertTriangle className="h-4 w-4 inline mr-2" />
                        Verification failed. The document could not be verified with the issuing institution. 
                        Please check the document quality and try again.
                      </p>
                    </div>
                  )}
                  
                  {document.status === "pending" && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-700">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Verification in progress. TalentTrust AI is currently verifying this document. 
                        You'll be notified when complete.
                      </p>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-600 mb-4">
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
                      <DialogContent>
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
