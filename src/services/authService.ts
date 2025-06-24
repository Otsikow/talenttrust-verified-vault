
import { supabase } from '@/integrations/supabase/client';
import { securityService } from './securityService';
import { User, Session } from '@supabase/supabase-js';

export interface LoginCredentials {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  userType?: 'job_seeker' | 'employer' | 'university';
}

class AuthService {
  private maxFailedAttempts = 5;
  private lockoutDurationMs = 15 * 60 * 1000; // 15 minutes

  async login(credentials: LoginCredentials): Promise<{ user: User | null; session: Session | null; error?: string }> {
    try {
      // Check rate limiting
      const canAttempt = await securityService.checkRateLimit(
        `login_${credentials.email}`,
        5, // 5 attempts
        15 * 60 * 1000 // per 15 minutes
      );

      if (!canAttempt) {
        await securityService.logSecurityEvent({
          event_type: 'multiple_failed_attempts',
          details: { email: credentials.email, reason: 'Rate limit exceeded' },
          severity: 'high'
        });
        return { user: null, session: null, error: 'Too many login attempts. Please try again later.' };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        // Log failed login attempt
        await securityService.logSecurityEvent({
          event_type: 'failed_login',
          details: { 
            email: credentials.email, 
            error: error.message,
            timestamp: new Date().toISOString()
          },
          severity: 'medium'
        });

        return { user: null, session: null, error: error.message };
      }

      if (data.user) {
        // Log successful login
        await securityService.logAuditEvent({
          user_id: data.user.id,
          action: 'login',
          resource_type: 'authentication',
          details: { 
            login_method: 'password',
            timestamp: new Date().toISOString()
          }
        });

        // Update last login information
        await this.updateLastLogin(data.user.id);
      }

      return { user: data.user, session: data.session };
    } catch (error: any) {
      console.error('Login error:', error);
      return { user: null, session: null, error: 'An unexpected error occurred during login.' };
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User | null; error?: string }> {
    try {
      // Validate password strength
      const passwordValidation = this.validatePassword(credentials.password);
      if (!passwordValidation.valid) {
        return { user: null, error: passwordValidation.error };
      }

      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.fullName,
            user_type: credentials.userType || 'job_seeker'
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        await securityService.logSecurityEvent({
          event_type: 'failed_login',
          details: { 
            email: credentials.email, 
            action: 'registration',
            error: error.message
          },
          severity: 'low'
        });
        return { user: null, error: error.message };
      }

      if (data.user) {
        await securityService.logAuditEvent({
          user_id: data.user.id,
          action: 'register',
          resource_type: 'user',
          details: { 
            email: credentials.email,
            user_type: credentials.userType || 'job_seeker'
          }
        });
      }

      return { user: data.user };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { user: null, error: 'An unexpected error occurred during registration.' };
    }
  }

  async logout(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await securityService.logAuditEvent({
          user_id: user.id,
          action: 'logout',
          resource_type: 'authentication',
          details: { timestamp: new Date().toISOString() }
        });
      }

      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  private validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 8) {
      return { valid: false, error: 'Password must be at least 8 characters long.' };
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, error: 'Password must contain at least one lowercase letter.' };
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, error: 'Password must contain at least one uppercase letter.' };
    }

    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, error: 'Password must contain at least one number.' };
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return { valid: false, error: 'Password must contain at least one special character (@$!%*?&).' };
    }

    return { valid: true };
  }

  private async updateLastLogin(userId: string): Promise<void> {
    try {
      const clientInfo = await securityService.getClientInfo();
      
      await supabase
        .from('users')
        .update({
          last_login_at: new Date().toISOString(),
          last_login_ip: clientInfo.ip_address,
          failed_login_attempts: 0 // Reset on successful login
        })
        .eq('auth_id', userId);
    } catch (error) {
      console.error('Failed to update last login:', error);
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      return profile;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
