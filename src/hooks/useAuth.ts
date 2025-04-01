import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useGraphQL } from './useGraphQL';

const AUTH_TOKEN_KEY = 'auth_token';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token from secure storage on mount
    SecureStore.getItemAsync(AUTH_TOKEN_KEY).then((storedToken: string | null) => {
      setToken(storedToken);
      setIsLoading(false);
    });
  }, []);

  const { mutateAsync: loginMutation } = useGraphQL({
    query: `
      mutation Login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
          ... on MutationLoginSuccess {
            __typename
            token
          }
          ... on Error {
            message
          }
        }
      }
    `,
  });

  const signIn = async (email: string, password: string) => {
    try {
      const result = await loginMutation({ email, password });
      if (result.login.__typename === 'MutationLoginSuccess') {
        const newToken = result.login.token;
        await SecureStore.setItemAsync(AUTH_TOKEN_KEY, newToken);
        setToken(newToken);
      } else {
        throw new Error(result.login.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, signIn, signOut }}>
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