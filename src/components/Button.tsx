import { TouchableOpacity, Text } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  textClassName?: string;
}

export function Button({ children, className = '', textClassName = '', ...props }: ButtonProps) {
  return (
    <TouchableOpacity className={`bg-primary rounded-xl py-4 px-6 ${className}`} {...props}>
      <Text className={`text-white text-center font-semibold ${textClassName}`}>{children}</Text>
    </TouchableOpacity>
  );
}
