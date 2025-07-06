
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Default admin user for development
  const [user, setUser] = useState<User>({
    id: '1',
    email: 'admin@stonepath.com',
    name: 'Administrator',
    role: 'admin'
  });

  const login = async (email: string, password: string) => {
    // Simulate login - in production, this would connect to your auth service
    if (email === 'admin@stonepath.com' && password === 'admin') {
      setUser({
        id: '1',
        email: 'admin@stonepath.com',
        name: 'Administrator',
        role: 'admin'
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
