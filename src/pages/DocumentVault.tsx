
import { useState } from "react";
import DocumentVaultHeader from "@/components/vault/DocumentVaultHeader";
import DocumentStats from "@/components/vault/DocumentStats";
import DocumentControls from "@/components/vault/DocumentControls";
import DocumentList from "@/components/vault/DocumentList";
import { useDocuments } from "@/hooks/useDocuments";

const DocumentVault = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const { documents, loading } = useDocuments();

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <DocumentVaultHeader />
        <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your documents...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
