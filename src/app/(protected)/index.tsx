import { SafeAreaView, View, Dimensions, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import { Title } from '../../components/Title';
import { ActionButton } from '../../components/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../../components/Header';
import { TransactionItem } from '../../components/TransactionItem';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Span } from '../../components/Span';

export default function HomeScreen() {
  const [currentBalanceIndex, setCurrentBalanceIndex] = useState(0);
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const CARD_WIDTH = SCREEN_WIDTH;

  const balances = [
    {
      id: '1',
      owner: 'Juan',
      amount: 15245533,
      change: 421,
      nextMonthProjection: 155000,
      type: 'bank' as const,
      name: 'Banco',
    },
    {
      id: '2',
      owner: 'Juan',
      amount: 32150,
      change: 650,
      nextMonthProjection: 98700,
      type: 'credit' as const,
      name: 'CMR',
    },
  ];

  const transactions = [
    {
      id: '1',
      name: 'Eva Novak',
      amount: 5710,
      type: 'received' as const,
      timestamp: 'Hoy',
      user: 'juan' as const,
      account: 'bank',
    },
    {
      id: '2',
      name: 'Binance',
      amount: 250000,
      type: 'received' as const,
      timestamp: 'Ayer',
      user: 'wife' as const,
      account: 'credit',
    },
    {
      id: '3',
      name: 'Nike',
      amount: 89990,
      type: 'paid' as const,
      timestamp: '19 Nov',
      user: 'juan' as const,
      account: 'credit',
    },
    {
      id: '4',
      name: 'Supermercado Lider',
      amount: 65750,
      type: 'paid' as const,
      timestamp: 'Ayer',
      user: 'wife' as const,
      account: 'credit',
    },
    {
      id: '5',
      name: 'Restaurante Perú Mágico',
      amount: 45500,
      type: 'paid' as const,
      timestamp: '18 Nov',
      user: 'juan' as const,
      account: 'credit',
    },
    {
      id: '6',
      name: 'Pago Enel',
      amount: 38500,
      type: 'paid' as const,
      timestamp: '17 Nov',
      user: 'juan' as const,
      account: 'bank',
    },
    {
      id: '7',
      name: 'Cineplanet',
      amount: 15000,
      type: 'paid' as const,
      timestamp: '16 Nov',
      user: 'wife' as const,
      account: 'credit',
    },
    {
      id: '8',
      name: 'Copec',
      amount: 50000,
      type: 'paid' as const,
      timestamp: '15 Nov',
      user: 'juan' as const,
      account: 'bank',
    },
    {
      id: '9',
      name: 'Transferencia de Mamá Transferencia de Mamá Transferencia de Mamá',
      amount: 150000,
      type: 'received' as const,
      timestamp: '15 Nov',
      user: 'juan' as const,
      account: 'bank',
    },
    {
      id: '10',
      name: 'Pago VTR',
      amount: 42990,
      type: 'paid' as const,
      timestamp: '14 Nov',
      user: 'juan' as const,
      account: 'bank',
    },
    {
      id: '11',
      name: 'Farmacia Cruz Verde',
      amount: 21300,
      type: 'paid' as const,
      timestamp: '14 Nov',
      user: 'wife' as const,
      account: 'credit',
    },
    {
      id: '12',
      name: 'Suscripción Spotify',
      amount: 4150,
      type: 'paid' as const,
      timestamp: '13 Nov',
      user: 'juan' as const,
      account: 'credit',
    },
    {
      id: '13',
      name: 'Depósito BancoEstado',
      amount: 200000,
      type: 'received' as const,
      timestamp: '12 Nov',
      user: 'juan' as const,
      account: 'bank',
    },
    {
      id: '14',
      name: 'Paris',
      amount: 115990,
      type: 'paid' as const,
      timestamp: '11 Nov',
      user: 'wife' as const,
      account: 'credit',
    },
    {
      id: '15',
      name: 'Pago Agua Andinas',
      amount: 22500,
      type: 'paid' as const,
      timestamp: '10 Nov',
      user: 'juan' as const,
      account: 'bank',
    },
  ];

  const currentBalanceType = balances[currentBalanceIndex]?.type;
  const filteredTransactions = transactions.filter(
    transaction => transaction.account === currentBalanceType,
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      contextX.value = translateX.value;
    })
    .onChange(event => {
      if (balances.length <= 1) return;
      translateX.value = contextX.value + event.translationX;
    })
    .onEnd(event => {
      if (balances.length <= 1) return;

      const velocity = event.velocityX;
      const translationX = event.translationX;
      const shouldSwipe = Math.abs(translationX) > CARD_WIDTH * 0.3 || Math.abs(velocity) > 300;

      let newIndex = currentBalanceIndex;
      if (shouldSwipe) {
        const direction = translationX < 0 ? 1 : -1;
        newIndex = Math.max(0, Math.min(balances.length - 1, currentBalanceIndex + direction));
      }

      translateX.value = withSpring(-(newIndex * CARD_WIDTH), {
        velocity: velocity,
        damping: 20,
        stiffness: 90,
      });

      if (newIndex !== currentBalanceIndex) {
        runOnJS(setCurrentBalanceIndex)(newIndex);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const currentBalance = balances[currentBalanceIndex];

  return (
    <LinearGradient
      colors={['#F0E7F5', '#D4C9E8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-[1]">
        <View className="flex-[1] overflow-hidden">
          <View className="px-6">
            <Header name={currentBalance?.owner ?? 'Cuenta'} onNotificationPress={() => {}} />
          </View>

          <GestureDetector gesture={panGesture}>
            <Animated.View
              className="flex-row"
              style={[{ width: SCREEN_WIDTH * balances.length }, animatedStyle]}
            >
              {balances.map(balance => (
                <View key={balance.id} style={{ width: SCREEN_WIDTH }} className="px-6">
                  <Card className="mb-6">
                    <View className="rounded-3xl px-6 py-2 w-full">
                      <Title className="text-sm text-text-secondary text-center mb-6">
                        Balance actual · {balance.name}
                      </Title>
                      <View className="items-center w-full">
                        <Title
                          className={`mb-3 ${balance.amount > 9999999 ? 'text-4xl' : 'text-5xl'} text-text-primary`}
                        >
                          ${balance.amount.toLocaleString()}
                        </Title>
                        <View className="items-center">
                          <Span className="text-xs text-text-secondary/80 mb-1">
                            Proyectado próximo mes
                          </Span>
                          <Title
                            className={`text-lg ${balance.nextMonthProjection > 0 ? 'text-successAlter' : 'text-text-secondary'}`}
                          >
                            ${balance.nextMonthProjection.toLocaleString()}
                          </Title>
                        </View>
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </Animated.View>
          </GestureDetector>

          <View className="flex-row justify-center mb-4 -mt-2">
            {balances.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentBalanceIndex ? 'bg-text-primary' : 'bg-text-secondary/30'
                }`}
              />
            ))}
          </View>

          <View className="flex-row justify-between mt-0 mb-4 px-6">
            <ActionButton
              label="Abono"
              icon={<MaterialCommunityIcons name="bank-transfer-in" size={22} color="#2D3A35" />}
              onPress={() => {}}
              className="flex-[1] mr-3"
            />
            <ActionButton
              label="Gasto"
              icon={<MaterialCommunityIcons name="bank-transfer-out" size={22} color="#2D3A35" />}
              onPress={() => {}}
              className="flex-[1] ml-3"
            />
          </View>

          <View className="mt-0 flex-1 px-6">
            <Title className="text-lg text-text-primary mb-3">Últimos movimientos</Title>

            <ScrollView className="flex-1">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    name={transaction.name}
                    amount={transaction.amount}
                    type={transaction.type}
                    timestamp={transaction.timestamp}
                    user={transaction.user}
                  />
                ))
              ) : (
                <View className="flex-1 items-center justify-center pt-10 pb-20">
                  <View className="w-20 h-20 bg-surface rounded-2xl shadow-soft-sm items-center justify-center mb-6">
                    <MaterialCommunityIcons
                      name="script-text-outline"
                      size={40}
                      color="#A69FB2"
                      style={{ opacity: 0.6 }}
                    />
                  </View>
                  <Title className="text-center text-text-secondary/90 text-base font-medium mb-1">
                    No hay movimientos
                  </Title>
                  <Span className="text-center text-text-secondary/70 text-sm max-w-[200px]">
                    Las nuevas transacciones de esta cuenta aparecerán aquí.
                  </Span>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
