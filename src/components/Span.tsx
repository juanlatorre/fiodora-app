import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function Span({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={twMerge('font-base-regular', className)}>{children}</Text>;
}
