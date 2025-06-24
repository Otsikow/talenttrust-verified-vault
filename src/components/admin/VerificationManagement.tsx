
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Eye, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface Verification {
  id: string;
  user_id: string;
  document_id: string | null;
  filename: string;
  status: 'pending' | 'verified' | 'suspicious' | 'failed';
  explanation: string;
  ai_confidence_score: number;
  admin_override: boolean;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const VerificationManagement = () => {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const { data, error } = await supabase
        .from('verifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVerifications(data || []);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      toast({
        title: "Error",
        description: "Failed to load verifications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateVerificationStatus = async (verificationId: string) => {
    if (!newStatus || !selectedVerification) return;

    try {
      const { error } = await supabase
        .from('verifications')
        .update({
          status: newStatus,
          admin_override: true,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', verificationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Verification status updated successfully"
      });

      fetchVerifications();
      setSelectedVerification(null);
      setAdminNotes('');
      setNewStatus('');
    } catch (error) {
      console.error('Error updating verification:', error);
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'suspicious':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'suspicious':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading verifications...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Verification Management</CardTitle>
          <CardDescription>
            Review and manage document verification results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verifications.map((verification) => (
              <div key={verification.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(verification.status)}
                    <div>
                      <h3 className="font-medium">{verification.filename}</h3>
                      <p className="text-sm text-gray-600">
                        Submitted: {new Date(verification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(verification.status)}>
                      {verification.status}
                    </Badge>
                    {verification.admin_override && (
                      <Badge variant="outline">Admin Override</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVerification(verification)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-700">
                  <p><strong>AI Analysis:</strong> {verification.explanation}</p>
                  {verification.ai_confidence_score && (
                    <p><strong>Confidence:</strong> {verification.ai_confidence_score}%</p>
                  )}
                  {verification.admin_notes && (
                    <p><strong>Admin Notes:</strong> {verification.admin_notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedVerification && (
        <Card>
          <CardHeader>
            <CardTitle>Update Verification Status</CardTitle>
            <CardDescription>
              Review and update the status for: {selectedVerification.filename}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Status</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="suspicious">Suspicious</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Admin Notes</label>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this verification..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => updateVerificationStatus(selectedVerification.id)}
                disabled={!newStatus}
              >
                Update Status
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedVerification(null);
                  setAdminNotes('');
                  setNewStatus('');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerificationManagement;
