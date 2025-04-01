import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function Title({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & TextProps) {
  return (
    <Text className={twMerge('font-title-semibold', className)} {...rest}>
      {children}
    </Text>
  );
}
