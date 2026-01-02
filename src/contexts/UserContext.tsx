import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserData {
  id: string;
  userType: 'user' | 'employer' | 'property' | 'resource' | 'donor';
  email: string;
  name: string;
  fairPathScore?: number;
  createdAt: string;
  [key: string]: any;
}

interface UserContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('fairpath_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fairpath_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fairpath_current_user');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fairpath_current_user');
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
