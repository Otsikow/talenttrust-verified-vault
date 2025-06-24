
import { supabase } from '@/integrations/supabase/client';

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  company: string;
  bio: string;
}

class ProfileService {
  async updateProfile(userId: string, data: UpdateProfileData): Promise<{ error?: string }> {
    try {
      console.log('Updating profile for user:', userId, 'with data:', data);
      
      // Update the users table with the new profile data
      const { error } = await supabase
        .from('users')
        .update({
          full_name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          phone: data.phone,
          location: data.location,
          job_title: data.jobTitle,
          company: data.company,
          bio: data.bio,
          updated_at: new Date().toISOString()
        })
        .eq('auth_id', userId);

      if (error) {
        console.error('Profile update error:', error);
        return { error: error.message };
      }

      console.log('Profile updated successfully');
      return {};
    } catch (error: any) {
      console.error('Profile update error:', error);
      return { error: 'An unexpected error occurred while updating your profile.' };
    }
  }

  async uploadAvatar(userId: string, file: File): Promise<{ avatarUrl?: string; error?: string }> {
    try {
      console.log('Uploading avatar for user:', userId);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type 
        });

      if (uploadError) {
        console.error('Avatar upload error:', uploadError);
        return { error: uploadError.message };
      }

      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log('Avatar uploaded successfully:', data.publicUrl);
      return { avatarUrl: data.publicUrl };
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      return { error: 'An unexpected error occurred while uploading your avatar.' };
    }
  }

  async getProfile(userId: string): Promise<{ profile?: any; error?: string }> {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        return { error: error.message };
      }

      console.log('Profile fetched successfully:', data);
      return { profile: data };
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      return { error: 'An unexpected error occurred while fetching your profile.' };
    }
  }
}

export const profileService = new ProfileService();
