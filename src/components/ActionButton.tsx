import { TouchableOpacity } from 'react-native';
import { Title } from './Title';
import { twMerge } from 'tailwind-merge';

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  className?: string;
}

export function ActionButton({ label, icon, onPress, className }: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge(
        'flex-row items-center justify-center py-3 px-4 rounded-2xl bg-surface',
        'shadow-[0_2px_6px_rgba(166,159,178,0.1)]',
        'border border-white/10',
        className,
      )}
      activeOpacity={0.9}
    >
      {icon}
      <Title className="text-sm text-text-secondary/90 ml-2">{label}</Title>
    </TouchableOpacity>
  );
}
