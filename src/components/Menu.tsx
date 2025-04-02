import { View, SafeAreaView } from 'react-native';
import { Title } from './Title';
import { Span } from './Span';
import { useAuth } from '../hooks/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Constants from 'expo-constants';
import { Avatar } from './Avatar';

export function Menu() {
  const { user, signOut } = useAuth();

  return (
    <LinearGradient
      colors={['#F0E7F5', '#D4C9E8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-[1]">
        <View className="flex-[1] p-6">
          <View className="flex-[1]">
            <View className="mb-6 flex-row items-center">
              <Avatar name={user?.name ?? 'Usuario'} size="md" className="mr-4" />
              <View>
                <Title className="text-xl text-text-primary">{user?.name}</Title>
                <Span className="text-sm text-text-secondary">{user?.email}</Span>
              </View>
            </View>

            <View className="flex-[1]">
              <View
                className="flex-row items-center py-3 px-4 rounded-2xl bg-white/50"
                onTouchEnd={signOut}
              >
                <MaterialCommunityIcons name="logout" size={20} color="#352F3D" />
                <Title className="text-base text-text-primary ml-3">Cerrar sesión</Title>
              </View>
            </View>

            <View>
              <Span className="text-xs text-text-secondary text-center">
                Versión {Constants.default.expoConfig?.version}
              </Span>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
