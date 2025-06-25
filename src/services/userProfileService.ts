
import { supabase } from '@/integrations/supabase/client';

export const userProfileService = {
  async fetchUserProfile(userId: string) {
    console.log('Fetching user profile for:', userId);
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data: newProfile, error: insertError } = await supabase
              .from('users')
              .insert({
                auth_id: user.id,
                email: user.email || '',
                full_name: user.user_metadata?.full_name || '',
                user_type: 'job_seeker'
              })
              .select()
              .single();

            if (insertError) {
              console.error('Error creating user profile:', insertError);
              return null;
            } else {
              console.log('User profile created:', newProfile);
              return newProfile;
            }
          }
        }
        return null;
      } else {
        console.log('User profile fetched:', profile);
        return profile;
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  }
};
