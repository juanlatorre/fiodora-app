import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View className={twMerge('bg-surface rounded-2xl shadow-soft p-6', className)}>{children}</View>
  );
}
