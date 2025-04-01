import { View, Image, TouchableOpacity } from 'react-native';
import { Title } from './Title';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  name: string;
  avatarUrl?: string;
  onNotificationPress?: () => void;
}

export function Header({ name, avatarUrl, onNotificationPress }: HeaderProps) {
  // Using UI Faces for a more realistic avatar placeholder
  const defaultAvatar = 'https://i.pravatar.cc/100?img=12';

  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-row items-center">
        <Image
          source={{ uri: avatarUrl || defaultAvatar }}
          className="w-8 h-8 rounded-full mr-3"
          defaultSource={{ uri: defaultAvatar }}
        />
        <Title className="text-lg text-text-primary">Hola, {name}</Title>
      </View>

      <TouchableOpacity onPress={onNotificationPress} className="p-2">
        <MaterialCommunityIcons name="bell-outline" size={20} color="#352F3D" />
      </TouchableOpacity>
    </View>
  );
}
