
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  register: (email: string, password: string, fullName: string, userType: string) => Promise<{ user: User | null; error: string | null }>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
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
            } else {
              console.log('User profile created:', newProfile);
              setUserProfile(newProfile);
            }
          }
        }
      } else {
        console.log('User profile fetched:', profile);
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login({ email, password });
      return result;
    } catch (error: any) {
      console.error('Login error:', error);
      return { user: null, error: error.message || 'Login failed' };
    }
  };

  const register = async (email: string, password: string, fullName: string, userType: string) => {
    try {
      const result = await authService.register({ email, password, fullName, userType: userType as any });
      return result;
    } catch (error: any) {
      console.error('Registration error:', error);
      return { user: null, error: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setUserProfile(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signOut = async () => {
    await logout();
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (mounted) {
          console.log('Initial session:', session?.user?.id || 'No session');
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Defer profile fetch to avoid blocking initial render
            setTimeout(() => {
              if (mounted) {
                fetchUserProfile(session.user.id);
              }
            }, 0);
          }
          
          // Set loading to false after initial check
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (mounted) {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Defer profile fetch to avoid auth state callback issues
            setTimeout(() => {
              if (mounted) {
                fetchUserProfile(session.user.id);
              }
            }, 0);
          } else {
            setUserProfile(null);
          }
          
          // Ensure loading is false after auth state changes
          setLoading(false);
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      login,
      register,
      logout,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
