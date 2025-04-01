import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Title } from '../../components/Title';
import { Span } from '../../components/Span';
import { Card } from '../../components/Card';
import { TextInput } from 'react-native';
import { router, Redirect } from 'expo-router';

// API: https://fiodora-api-production.up.railway.app/graphql

export default function LoginScreen() {
  // If already authenticated, redirect to home
  const isAuthenticated = false; // Replace with your auth check
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  const handleLogin = () => {
    // Here you would typically validate credentials
    // For now, we'll just navigate to the main app
    router.replace('/');
  };

  return (
    <LinearGradient
      colors={['#F0E7F5', '#D4C9E8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-surface rounded-2xl shadow-soft-sm items-center justify-center mb-6">
              <MaterialCommunityIcons
                name="wallet-outline"
                size={40}
                color="#7C3AED"
                style={{ opacity: 0.8 }}
              />
            </View>
            <Title className="text-3xl text-text-primary mb-2">Bienvenido</Title>
            <Span className="text-text-secondary text-center">Inicia sesión para continuar</Span>
          </View>

          <Card className="mb-6">
            <View className="space-y-4">
              <View>
                <Span className="text-sm text-text-secondary mb-1.5">Correo electrónico</Span>
                <View className="bg-background rounded-xl px-4 py-3.5 shadow-inset">
                  <TextInput
                    placeholder="ejemplo@correo.com"
                    placeholderTextColor="#A69FB2"
                    className="font-base-regular text-text-primary"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View>
                <Span className="text-sm text-text-secondary mb-1.5">Contraseña</Span>
                <View className="bg-background rounded-xl px-4 py-3.5 shadow-inset">
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#A69FB2"
                    className="font-base-regular text-text-primary"
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-surface rounded-xl py-3.5 shadow-soft items-center mt-2"
                activeOpacity={0.9}
              >
                <Title className="text-successAlter text-base">Iniciar sesión</Title>
              </TouchableOpacity>
            </View>
          </Card>

          <TouchableOpacity className="items-center" activeOpacity={0.7}>
            <Span className="text-text-secondary">
              ¿No tienes una cuenta? <Title className="text-successAlter">Regístrate</Title>
            </Span>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
