import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';

interface User {
  email: string | null;
  displayName: string | null;
  uid: string;
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to convert Firebase User to our User interface
const convertFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) return null;
  return {
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    uid: firebaseUser.uid,
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(convertFirebaseUser(firebaseUser));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update display name if username is provided
      if (username && firebaseUser) {
        await updateProfile(firebaseUser, {
          displayName: username,
        });
      }
      
      const convertedUser = convertFirebaseUser(firebaseUser);
      setUser(convertedUser);
      setLoading(false);
      // Navigation to MainAppScreen happens automatically in App.tsx when user is set
      return { success: true, user: convertedUser || undefined };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Sign up failed';
      return { success: false, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const convertedUser = convertFirebaseUser(firebaseUser);
      setUser(convertedUser);
      setLoading(false);
      // Navigation to MainAppScreen happens automatically in App.tsx when user is set
      return { success: true, user: convertedUser || undefined };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Sign in failed';
      return { success: false, error: errorMessage };
    }
  };

  const signInWithGoogle = async (): Promise<AuthResult> => {
    setLoading(true);
    // Mock implementation - replace with your Google Sign-In logic
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return { success: false, error: 'Google Sign-In not implemented yet' };
  };

  const signOut = async (): Promise<AuthResult> => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      setLoading(false);
      return { success: true };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Sign out failed';
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      return { success: true };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Password reset failed';
      return { success: false, error: errorMessage };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
