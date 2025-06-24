
import { supabase } from '@/integrations/supabase/client';
import { securityService } from './securityService';
import { Document, VerificationRequest } from '@/types/documents';

export const documentService = {
  async fetchDocuments(): Promise<Document[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    // Log access to documents
    await securityService.logAuditEvent({
      user_id: user.user.id,
      action: 'view_documents',
      resource_type: 'documents'
    });

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

    // Security validations
    const fileValidation = securityService.validateFile(file);
    if (!fileValidation.valid) {
      throw new Error(fileValidation.error);
    }

    // Generate file hash for integrity
    const fileHash = await securityService.generateFileHash(file);

    // Encrypt sensitive document metadata
    const encryptedName = securityService.encryptData(documentData.name || file.name);
    const encryptedIssuer = securityService.encryptData(documentData.issuer || '');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${currentUser.auth_id}/${fileName}`;

    // Upload to secure storage
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
        name: encryptedName,
        type: documentData.type || 'certificate',
        issuer: encryptedIssuer,
        file_url: publicUrl,
        file_size: file.size,
        file_type: file.type,
        file_hash: fileHash,
        expiry_date: documentData.expiry_date,
        status: 'uploaded',
        privacy: documentData.privacy || 'private',
        encrypted: true,
        malware_scan_status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    // Log document upload
    await securityService.logAuditEvent({
      user_id: currentUser.id,
      action: 'document_upload',
      resource_type: 'document',
      resource_id: data.id,
      details: {
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        encrypted: true
      }
    });

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

    // Log verification request
    await securityService.logAuditEvent({
      user_id: currentUser.id,
      action: 'verification_request',
      resource_type: 'document',
      resource_id: documentId,
      details: {
        request_type: requestType,
        request_id: data.id
      }
    });

    return data;
  },

  async deleteDocument(documentId: string): Promise<void> {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (error) throw error;

    // Log document deletion
    const { data: user } = await supabase.auth.getUser();
    if (user.user) {
      await securityService.logAuditEvent({
        user_id: user.user.id,
        action: 'document_delete',
        resource_type: 'document',
        resource_id: documentId,
        details: { permanent_deletion: true }
      });
    }
  },

  // Decrypt document name for display
  decryptDocumentName(encryptedName: string): string {
    try {
      return securityService.decryptData(encryptedName);
    } catch (error) {
      console.error('Failed to decrypt document name:', error);
      return 'Encrypted Document';
    }
  },

  // Decrypt document issuer for display
  decryptDocumentIssuer(encryptedIssuer: string): string {
    try {
      return securityService.decryptData(encryptedIssuer);
    } catch (error) {
      console.error('Failed to decrypt document issuer:', error);
      return 'Encrypted Issuer';
    }
  }
};
