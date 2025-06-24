
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Download, Trash2, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { gdprService } from '@/services/gdprService';
import { useAuth } from '@/hooks/useAuth';

const PrivacySettings = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    dataSharing: false,
    analyticsOptIn: false,
    marketingEmails: false,
    profileVisibility: 'private'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportData = async () => {
    if (!userProfile) return;
    
    setIsExporting(true);
    try {
      const exportData = await gdprService.exportUserData(userProfile.id);
      if (exportData) {
        gdprService.downloadUserData(exportData);
        toast({
          title: "Data Export Complete",
          description: "Your personal data has been downloaded successfully.",
        });
      } else {
        toast({
          title: "Export Failed",
          description: "Unable to export your data. Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Export Error",
        description: "An error occurred while exporting your data.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userProfile) return;
    
    setIsDeleting(true);
    try {
      const success = await gdprService.deleteUserData(userProfile.id);
      if (success) {
        toast({
          title: "Account Deleted",
          description: "Your account and all associated data have been permanently deleted.",
        });
        // Redirect to home page after deletion
        window.location.href = '/';
      } else {
        toast({
          title: "Deletion Failed",
          description: "Unable to delete your account. Please contact support.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Deletion Error",
        description: "An error occurred while deleting your account.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
          <CardDescription>
            Manage how your data is used and shared in accordance with GDPR
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow sharing of anonymised data for service improvement
                </p>
              </div>
              <Switch 
                checked={settings.dataSharing}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, dataSharing: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve our service by sharing usage analytics
                </p>
              </div>
              <Switch 
                checked={settings.analyticsOptIn}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, analyticsOptIn: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and opportunities
                </p>
              </div>
              <Switch 
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Control who can see your verified credentials
                </p>
              </div>
              <Button variant="outline" size="sm">
                {settings.profileVisibility === 'private' ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Private
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Public
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Data Rights</CardTitle>
          <CardDescription>
            Under GDPR, you have the right to access, export, and delete your personal data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleExportData}
              disabled={isExporting}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export My Data'}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account 
                    and remove all your data from our servers. This includes:
                    <br /><br />
                    • All uploaded documents and credentials
                    <br />
                    • Your profile and verification history
                    <br />
                    • All messages and communications
                    <br />
                    • Any job applications or matches
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Export Data:</strong> Download a complete copy of all your personal data in JSON format.
            </p>
            <p>
              <strong>Delete Account:</strong> Permanently remove your account and all associated data. 
              Some anonymised audit logs may be retained for security and compliance purposes.
            </p>
          </div>
        </Car_dContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
