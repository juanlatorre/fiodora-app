import { View, TouchableOpacity } from 'react-native';
import { Title } from './Title';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from './Avatar';

interface HeaderProps {
  name: string;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

export function Header({ name, onNotificationPress, onMenuPress }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity onPress={onMenuPress} className="p-2">
        <MaterialCommunityIcons name="menu" size={24} color="#352F3D" />
      </TouchableOpacity>

      <View className="flex-row items-center">
        <Avatar name={name} size="sm" className="mr-3" />
        <Title className="text-xl text-text-primary">Hola, {name}</Title>
      </View>

      <TouchableOpacity onPress={onNotificationPress} className="p-2">
        <MaterialCommunityIcons name="bell-outline" size={24} color="#352F3D" />
      </TouchableOpacity>
    </View>
  );
}
