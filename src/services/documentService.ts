
import { supabase } from '@/integrations/supabase/client';
import { Document, VerificationRequest } from '@/types/documents';

export const documentService = {
  async fetchDocuments(): Promise<Document[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        institutions (name, type),
        verification_requests (
          id,
          document_id,
          user_id,
          status,
          request_type,
          priority,
          requested_at,
          started_at,
          completed_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(doc => ({
      ...doc,
      type: doc.type as Document['type'],
      status: doc.status as Document['status'],
      privacy: doc.privacy as Document['privacy'],
      verification_requests: doc.verification_requests?.map((vr: any) => ({
        ...vr,
        request_type: vr.request_type as VerificationRequest['request_type'],
        status: vr.status as VerificationRequest['status']
      })) || []
    }));
  },

  async uploadDocument(file: File, documentData: Partial<Document>, currentUser: any): Promise<any> {
    if (!currentUser) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${currentUser.auth_id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('user_documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('user_documents')
      .getPublicUrl(filePath);

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
    return data;
  },

  async requestVerification(documentId: string, requestType: VerificationRequest['request_type'], currentUser: any): Promise<any> {
    if (!currentUser) throw new Error('User not authenticated');

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

    await supabase
      .from('documents')
      .update({ status: 'pending' })
      .eq('id', documentId);

    return data;
  },

  async deleteDocument(documentId: string): Promise<void> {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (error) throw error;
  }
};
