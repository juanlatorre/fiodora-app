import { View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getInitialColor(name: string): string {
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

const sizeClasses = {
  sm: 'w-9 h-9 text-base',
  md: 'w-12 h-12 text-xl',
  lg: 'w-16 h-16 text-2xl',
};

export function Avatar({ name, size = 'sm', className }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const bgColorClass = getInitialColor(name);
  const [containerSize, textSize] = sizeClasses[size].split(' text-');

  return (
    <View
      className={twMerge(
        'rounded-full items-center justify-center',
        containerSize,
        bgColorClass,
        className,
      )}
    >
      <Text className={`text-white font-bold text-${textSize}`}>{initial}</Text>
    </View>
  );
}
