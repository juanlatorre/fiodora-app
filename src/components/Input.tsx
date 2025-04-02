import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <TextInput
      className={`bg-white/50 p-4 rounded-xl mb-4 ${className}`}
      placeholderTextColor="#666"
      {...props}
    />
  );
}
