import { supabase } from '@/integrations/supabase/client';
import { securityService } from './securityService';

export interface UserDataExport {
  personal_information: any;
  documents: any[];
  audit_logs: any[];
  verification_requests: any[];
  verification_results: any[];
  references: any[];
}

class GdprService {
  // Export all user data for GDPR compliance
  async exportUserData(userId: string): Promise<UserDataExport | null> {
    try {
      await securityService.logAuditEvent({
        user_id: userId,
        action: 'data_export_request',
        resource_type: 'user_data',
        details: { gdpr_compliance: true }
      });

      // Get user profile
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      // Get user documents
      const { data: documents } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId);

      // Get audit logs
      const { data: auditLogs } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId);

      // Get verification requests
      const { data: verificationRequests } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('user_id', userId);

      // Get verification results
      const { data: verificationResults } = await supabase
        .from('verification_results')
        .select('*')
        .in('document_id', documents?.map(d => d.id) || []);

      // Get references
      const { data: references } = await supabase
        .from('references')
        .select('*')
        .eq('user_id', userId);

      const exportData: UserDataExport = {
        personal_information: user,
        documents: documents || [],
        audit_logs: auditLogs || [],
        verification_requests: verificationRequests || [],
        verification_results: verificationResults || [],
        references: references || []
      };

      await securityService.logAuditEvent({
        user_id: userId,
        action: 'data_export_completed',
        resource_type: 'user_data',
        details: { 
          gdpr_compliance: true,
          records_exported: {
            documents: documents?.length || 0,
            audit_logs: auditLogs?.length || 0,
            verification_requests: verificationRequests?.length || 0,
            verification_results: verificationResults?.length || 0,
            references: references?.length || 0
          }
        }
      });

      return exportData;
    } catch (error) {
      console.error('Error exporting user data:', error);
      return null;
    }
  }

  // Delete all user data for GDPR compliance
  async deleteUserData(userId: string): Promise<boolean> {
    try {
      await securityService.logAuditEvent({
        user_id: userId,
        action: 'data_deletion_request',
        resource_type: 'user_data',
        details: { gdpr_compliance: true }
      });

      // Delete in reverse order of dependencies
      await supabase.from('verification_results').delete().in(
        'document_id', 
        supabase.from('documents').select('id').eq('user_id', userId)
      );

      await supabase.from('verification_requests').delete().eq('user_id', userId);
      await supabase.from('references').delete().eq('user_id', userId);
      await supabase.from('documents').delete().eq('user_id', userId);
      await supabase.from('user_sessions').delete().eq('user_id', userId);
      
      // Keep audit logs for compliance but anonymise them
      await supabase
        .from('audit_logs')
        .update({ 
          user_id: null,
          details: { anonymised: true, original_deletion_date: new Date().toISOString() }
        })
        .eq('user_id', userId);

      // Delete user profile last
      await supabase.from('users').delete().eq('id', userId);

      await securityService.logAuditEvent({
        user_id: userId,
        action: 'data_deletion_completed',
        resource_type: 'user_data',
        details: { gdpr_compliance: true }
      });

      return true;
    } catch (error) {
      console.error('Error deleting user data:', error);
      return false;
    }
  }

  // Download user data as JSON file
  downloadUserData(data: UserDataExport, filename?: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `user_data_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const gdprService = new GdprService();
