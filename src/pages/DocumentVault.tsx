
import { useState } from "react";
import DocumentVaultHeader from "@/components/vault/DocumentVaultHeader";
import DocumentStats from "@/components/vault/DocumentStats";
import DocumentControls from "@/components/vault/DocumentControls";
import DocumentList from "@/components/vault/DocumentList";

const DocumentVault = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DocumentVaultHeader />

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Page Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Document Vault</h1>
          <p className="text-sm sm:text-base text-gray-600">Securely store, verify, and manage your professional credentials</p>
        </div>

        <DocumentStats documents={documents} />
        <DocumentControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <DocumentList 
          documents={documents}
          filteredDocuments={filteredDocuments}
          searchTerm={searchTerm}
          filterType={filterType}
          filterStatus={filterStatus}
        />
      </div>
    </div>
  );
};

export default DocumentVault;
