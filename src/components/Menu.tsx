import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Title } from './Title';
import { useAuth } from '../hooks/AuthContext';

export function Menu() {
  const { user, signOut } = useAuth();
  const version = Constants.expoConfig?.version || '1.0.0';
  const buildNumber = Constants.expoConfig?.ios?.buildNumber || '1';

  return (
    <LinearGradient colors={['#F0E7F5', '#D4C9E8']} className="flex-1 h-full">
      <View className="flex-1 p-6">
        {/* User Info Section */}
        <View className="mb-8">
          <Title className="text-text-primary text-2xl">{user?.name}</Title>
          <Title className="text-text-primary/80 text-base mt-1">{user?.email}</Title>
        </View>

        {/* Menu Items */}
        <View className="flex-1">
          <TouchableOpacity
            className="flex-row items-center py-4 px-2 rounded-lg bg-white/20"
            onPress={signOut}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
          >
            <MaterialCommunityIcons name="logout" size={24} color="#1F1A24" />
            <Title className="text-text-primary ml-3">Cerrar sesión</Title>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View className="mt-auto">
          <Title className="text-text-primary/60 text-sm">
            Version {version} (Build {buildNumber})
          </Title>
        </View>
      </View>
    </LinearGradient>
  );
}
