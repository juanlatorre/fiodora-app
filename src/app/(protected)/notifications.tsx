import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NotificationItem } from '../../components/NotificationItem';
import { Title } from '../../components/Title';
import { Span } from '../../components/Span';
import { Button } from '../../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

// This would come from your backend in a real app
const mockNotifications = [
  {
    id: '1',
    title: 'Nuevo abono recibido',
    message: 'Has recibido un abono de $250.000 desde Binance',
    timestamp: 'Hace 2 horas',
    isRead: false,
  },
  {
    id: '2',
    title: 'Gasto registrado',
    message: 'Se ha registrado un gasto de $89.990 en Nike',
    timestamp: 'Hace 5 horas',
    isRead: false,
  },
  {
    id: '3',
    title: 'Recordatorio de pago',
    message: 'Tienes un pago programado para mañana',
    timestamp: 'Hace 1 día',
    isRead: true,
  },
  {
    id: '4',
    title: 'Nuevo balance disponible',
    message: 'Tu balance del mes de Noviembre está listo',
    timestamp: 'Hace 2 días',
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleReadAll = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationPress = (id: string) => {
    setNotifications(notifications.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#F0E7F5', '#D4C9E8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-[1]">
        <View className="flex-[1]">
          <View className="flex-row items-center justify-between px-6 mb-6">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={handleBack} className="mr-3">
                <MaterialCommunityIcons name="chevron-left" size={32} color="#352F3D" />
              </TouchableOpacity>
              <Title className="text-2xl text-text-primary">Notificaciones</Title>
            </View>
            <TouchableOpacity
              onPress={handleReadAll}
              disabled={unreadCount === 0}
              className={`bg-white/80 p-1.5 rounded-xl items-center justify-center ${unreadCount === 0 ? 'opacity-50' : ''}`}
            >
              <MaterialCommunityIcons name="check-all" size={22} color="#352F3D" />
            </TouchableOpacity>
          </View>

          <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  title={notification.title}
                  message={notification.message}
                  timestamp={notification.timestamp}
                  isRead={notification.isRead}
                  onPress={() => handleNotificationPress(notification.id)}
                />
              ))
            ) : (
              <View className="items-center justify-center pt-10">
                <View className="w-20 h-20 bg-surface rounded-2xl shadow-soft-sm items-center justify-center mb-6">
                  <MaterialCommunityIcons
                    name="bell-outline"
                    size={40}
                    color="#A69FB2"
                    style={{ opacity: 0.6 }}
                  />
                </View>
                <Title className="text-center text-text-secondary/90 text-base font-medium mb-1">
                  No hay notificaciones
                </Title>
                <Span className="text-center text-text-secondary/70 text-sm max-w-[200px]">
                  Las nuevas notificaciones aparecerán aquí.
                </Span>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
