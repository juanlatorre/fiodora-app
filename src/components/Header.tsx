import { View, Text, TouchableOpacity } from 'react-native';
import { Title } from './Title';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  name: string;
  onNotificationPress?: () => void;
}

function getInitialColor(name: string): string {
  // Generate a consistent color based on the name
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
  ];

  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index] ?? 'bg-gray-500';
}

export function Header({ name, onNotificationPress }: HeaderProps) {
  const initial = name.charAt(0).toUpperCase();
  const bgColorClass = getInitialColor(name);

  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-row items-center">
        <View className={`w-8 h-8 rounded-full mr-3 items-center justify-center ${bgColorClass}`}>
          <Text className="text-white text-sm font-bold">{initial}</Text>
        </View>
        <Title className="text-lg text-text-primary">Hola, {name}</Title>
      </View>

      <TouchableOpacity onPress={onNotificationPress} className="p-2">
        <MaterialCommunityIcons name="bell-outline" size={20} color="#352F3D" />
      </TouchableOpacity>
    </View>
  );
}
