import { Stack } from 'expo-router';
import { useAuth } from '../../hooks/AuthContext';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const { token, isLoading } = useAuth();

  // If user is already authenticated, redirect to home
  if (!isLoading && token) {
    return <Redirect href="/(protected)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
