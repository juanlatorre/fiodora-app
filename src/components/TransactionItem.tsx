import { View, TouchableOpacity } from 'react-native';
import { Title } from './Title';
import { Span } from './Span';

interface TransactionItemProps {
  name: string;
  amount: number;
  type: 'received' | 'paid';
  timestamp: string;
  user: 'juan' | 'wife';
  onPress?: () => void;
}

export function TransactionItem({
  name,
  amount,
  type,
  timestamp,
  user,
  onPress,
}: TransactionItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-2.5 px-4 bg-surface rounded-xl mb-1"
      activeOpacity={0.8}
    >
      <View className="flex-row items-center flex-[1]">
        <View
          className={`w-1 h-8 rounded-full mr-3 ${
            user === 'juan' ? 'bg-blue-400/50' : 'bg-pink-400/50'
          }`}
        />
        <View className="flex-shrink mr-2">
          <Title className="text-base text-text-primary font-medium" numberOfLines={1}>
            {name}
          </Title>
          <Span className="text-sm text-text-secondary/75">
            {type === 'received' ? 'Recibido' : 'Pagado'} · {timestamp}
          </Span>
        </View>
      </View>

      <View>
        <Title className={`text-base ${type === 'received' ? 'text-success' : 'text-danger'}`}>
          {type === 'received' ? '+' : '-'}${Math.abs(amount).toLocaleString()}
        </Title>
      </View>
    </TouchableOpacity>
  );
}
