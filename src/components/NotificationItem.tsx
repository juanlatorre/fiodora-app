import { View, TouchableOpacity } from 'react-native';
import { Title } from './Title';
import { Span } from './Span';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  onPress?: () => void;
}

export function NotificationItem({
  title,
  message,
  timestamp,
  isRead = false,
  onPress,
}: NotificationItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-3 px-4 rounded-2xl bg-white/50 mb-3"
    >
      <View className="w-8 h-8 rounded-xl items-center justify-center bg-white/50 mr-3">
        <MaterialCommunityIcons
          name="bell-outline"
          size={20}
          color={isRead ? '#A69FB2' : '#352F3D'}
        />
      </View>

      <View className="flex-[1]">
        <Title
          className={`text-base ${isRead ? 'text-text-secondary' : 'text-text-primary'} mb-0.5`}
        >
          {title}
        </Title>
        <Span className={`text-sm ${isRead ? 'text-text-secondary/70' : 'text-text-secondary'}`}>
          {message}
        </Span>
        <Span className="text-xs text-text-secondary/60 mt-1">{timestamp}</Span>
      </View>

      {!isRead && <View className="w-2 h-2 rounded-full bg-text-primary ml-2" />}
    </TouchableOpacity>
  );
}
