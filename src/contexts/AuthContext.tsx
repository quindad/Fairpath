import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Types
interface User {
  id: string;
  phone?: string;
  email?: string;
  user_metadata?: any;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: any | null;
  loading: boolean;
  signInWithPhone: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (phone: string, token: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event, session?.user?.id);
        
        if (session) {
          setSession(session);
          setUser(session.user as User);
        } else {
          setSession(null);
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Session check error:', error);
        setLoading(false);
        return;
      }

      if (session) {
        console.log('✅ Existing session found:', session.user.id);
        setSession(session);
        setUser(session.user as User);
      } else {
        console.log('ℹ️ No existing session');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('❌ Session check failed:', error);
      setLoading(false);
    }
  }

  /**
   * Send OTP to phone number
   */
  async function signInWithPhone(phone: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📱 Sending OTP to:', phone);

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
        options: {
          channel: 'sms',
        },
      });

      if (error) {
        console.error('❌ OTP send error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ OTP sent successfully');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Sign in with phone failed:', error);
      return { success: false, error: error.message || 'Failed to send OTP' };
    }
  }

  /**
   * Verify OTP code
   */
  async function verifyOtp(
    phone: string,
    token: string
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      console.log('🔐 Verifying OTP for:', phone);

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
      });

      if (error) {
        console.error('❌ OTP verification error:', error);
        return { success: false, error: error.message };
      }

      if (data.session && data.user) {
        console.log('✅ OTP verified successfully:', data.user.id);
        setSession(data.session);
        setUser(data.user as User);
        return { success: true, user: data.user as User };
      }

      return { success: false, error: 'No session created' };
    } catch (error: any) {
      console.error('❌ OTP verification failed:', error);
      return { success: false, error: error.message || 'Failed to verify OTP' };
    }
  }

  /**
   * Sign out current user
   */
  async function signOut(): Promise<void> {
    try {
      console.log('👋 Signing out user:', user?.id);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Sign out error:', error);
        throw error;
      }

      setSession(null);
      setUser(null);
      console.log('✅ Signed out successfully');
    } catch (error) {
      console.error('❌ Sign out failed:', error);
      throw error;
    }
  }

  /**
   * Update user metadata
   */
  async function updateUser(updates: Partial<User>): Promise<{ success: boolean; error?: string }> {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      console.log('📝 Updating user:', user.id);

      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) {
        console.error('❌ Update user error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser(data.user as User);
        console.log('✅ User updated successfully');
        return { success: true };
      }

      return { success: false, error: 'Update failed' };
    } catch (error: any) {
      console.error('❌ Update user failed:', error);
      return { success: false, error: error.message || 'Failed to update user' };
    }
  }

  const value = {
    user,
    session,
    loading,
    signInWithPhone,
    verifyOtp,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { supabase };
