import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import type { User } from '../gql/graphql';

const AUTH_TOKEN_KEY = 'fiodora_auth_token';
const USER_DATA_KEY = 'fiodora_user_data';

type AuthUser = Required<Pick<User, 'id' | 'name' | 'email'>>;

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  setAuth: (token: string | null, user: AuthUser | null) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token and user data from secure storage on mount
    Promise.all([SecureStore.getItemAsync(AUTH_TOKEN_KEY), SecureStore.getItemAsync(USER_DATA_KEY)])
      .then(([storedToken, storedUser]) => {
        try {
          setTokenState(storedToken);
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (!parsedUser?.id || !parsedUser?.name || !parsedUser?.email) {
              setUserState(null);
            } else {
              setUserState(parsedUser);
            }
          } else {
            setUserState(null);
          }
        } catch (error) {
          setUserState(null);
        }

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const setAuth = async (newToken: string | null, newUser: AuthUser | null) => {
    try {
      if (newToken && newUser) {
        await Promise.all([
          SecureStore.setItemAsync(AUTH_TOKEN_KEY, newToken),
          SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(newUser)),
        ]);
      } else {
        await Promise.all([
          SecureStore.deleteItemAsync(AUTH_TOKEN_KEY),
          SecureStore.deleteItemAsync(USER_DATA_KEY),
        ]);
      }

      setTokenState(newToken);
      setUserState(newUser);
    } catch (error) {
      // Still update state even if storage fails
      setTokenState(newToken);
      setUserState(newUser);
    }
  };

  const signOut = async () => {
    await setAuth(null, null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, setAuth, signOut }}>
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
