import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../hooks/AuthContext';
import { View, Text } from 'react-native';

export default function ProtectedLayout() {
  const { token, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
