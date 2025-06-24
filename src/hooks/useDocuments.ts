
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Document {
  id: string;
  user_id: string;
  name: string;
  type: 'degree' | 'certificate' | 'license' | 'reference' | 'work_sample' | 'cv_resume';
  issuer: string;
  institution_id?: string;
  file_url: string;
  file_size?: number;
  file_type?: string;
  upload_date: string;
  expiry_date?: string;
  status: 'uploaded' | 'pending' | 'verified' | 'failed' | 'expired';
  privacy: 'private' | 'shared' | 'public';
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface VerificationRequest {
  id: string;
  document_id: string;
  user_id: string;
  request_type: 'ai_analysis' | 'institution_verify' | 'manual_review';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  priority: number;
  requested_at: string;
  started_at?: string;
  completed_at?: string;
  metadata?: any;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchDocuments();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Check if user profile exists, create if not
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (!profile) {
        const { data: newProfile } = await supabase
          .from('users')
          .insert({
            auth_id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || '',
            user_type: 'job_seeker'
          })
          .select()
          .single();
        
        setCurrentUser(newProfile);
      } else {
        setCurrentUser(profile);
      }
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          institutions (name, type),
          verification_requests (
            id,
            status,
            request_type,
            requested_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, documentData: Partial<Document>) => {
    try {
      if (!currentUser) throw new Error('User not authenticated');

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${currentUser.auth_id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user_documents')
        .getPublicUrl(filePath);

      // Insert document record
      const { data, error } = await supabase
        .from('documents')
        .insert({
          user_id: currentUser.id,
          name: documentData.name || file.name,
          type: documentData.type || 'certificate',
          issuer: documentData.issuer || '',
          file_url: publicUrl,
          file_size: file.size,
          file_type: file.type,
          expiry_date: documentData.expiry_date,
          status: 'uploaded',
          privacy: documentData.privacy || 'private'
        })
        .select()
        .single();

      if (error) throw error;

      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      });
      throw error;
    }
  };

  const requestVerification = async (documentId: string, requestType: VerificationRequest['request_type'] = 'ai_analysis') => {
    try {
      if (!currentUser) throw new Error('User not authenticated');

      // Create verification request
      const { data, error } = await supabase
        .from('verification_requests')
        .insert({
          document_id: documentId,
          user_id: currentUser.id,
          request_type: requestType,
          status: 'pending',
          priority: 1
        })
        .select()
        .single();

      if (error) throw error;

      // Update document status to pending
      await supabase
        .from('documents')
        .update({ status: 'pending' })
        .eq('id', documentId);

      await fetchDocuments();
      
      toast({
        title: "Verification Started",
        description: "Your document has been sent to TalentTrust AI for verification. You'll be notified when complete.",
      });

      return data;
    } catch (error) {
      console.error('Error requesting verification:', error);
      toast({
        title: "Error",
        description: "Failed to start verification",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

      if (error) throw error;

      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  return {
    documents,
    loading,
    currentUser,
    uploadDocument,
    requestVerification,
    deleteDocument,
    fetchDocuments
  };
};
