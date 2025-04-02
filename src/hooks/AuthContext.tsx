import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'auth_token';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  setToken: (token: string | null) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token from secure storage on mount
    SecureStore.getItemAsync(AUTH_TOKEN_KEY).then((storedToken: string | null) => {
      setTokenState(storedToken);
      setIsLoading(false);
    });
  }, []);

  const setToken = async (newToken: string | null) => {
    if (newToken) {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, newToken);
    } else {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    }
    setTokenState(newToken);
  };

  const signOut = async () => {
    await setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, setToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
