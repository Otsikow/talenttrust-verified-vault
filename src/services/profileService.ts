
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
      
      // Ensure we have clean data with fallbacks for empty strings
      const updateData = {
        full_name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        job_title: data.jobTitle || '',
        company: data.company || '',
        bio: data.bio || '',
        updated_at: new Date().toISOString()
      };

      console.log('Prepared update data:', updateData);

      // Get the most recent profile for this user first
      const { data: existingProfiles, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error('Error fetching existing profile:', fetchError);
        return { error: fetchError.message };
      }

      if (!existingProfiles || existingProfiles.length === 0) {
        console.error('No profile found for user:', userId);
        return { error: 'No profile found for user' };
      }

      // Update the most recent profile using its ID
      const profileId = existingProfiles[0].id;
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', profileId);

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
      // Use the correct path structure that matches our RLS policy
      const filePath = `${userId}/${fileName}`;

      console.log('Uploading to path:', filePath);

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
      
      // Get the most recent profile for this user
      const { data: profiles, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Profile fetch error:', error);
        return { error: error.message };
      }

      if (!profiles || profiles.length === 0) {
        console.log('No profile found, creating default profile');
        
        // Get user data from auth to populate email
        const { data: { user } } = await supabase.auth.getUser();
        
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            auth_id: userId,
            email: user?.email || '',
            full_name: user?.user_metadata?.full_name || '',
            phone: '',
            location: '',
            job_title: '',
            company: '',
            bio: '',
            user_type: 'job_seeker'
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          return { error: createError.message };
        }

        console.log('Profile created successfully:', newProfile);
        return { profile: newProfile };
      }

      const profile = profiles[0];
      console.log('Profile fetched successfully:', profile);
      return { profile };
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      return { error: 'An unexpected error occurred while fetching your profile.' };
    }
  }
}

export const profileService = new ProfileService();
