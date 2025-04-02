import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { useMutation } from '../../hooks/useGraphQL';
import { useAuth } from '../../hooks/AuthContext';
import { graphql } from '../../gql/gql';
import { LoginDocument } from '../../gql/graphql';
import { LinearGradient } from 'expo-linear-gradient';

graphql(`
  mutation Login($input: MutationLoginInput!) {
    login(input: $input) {
      __typename
      ... on MutationLoginSuccess {
        data {
          token
        }
      }
      ... on BaseError {
        message
      }
      ... on ZodError {
        message
      }
    }
  }
`);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();

  const { mutateAsync, isPending } = useMutation(LoginDocument);

  const handleLogin = async () => {
    try {
      const result = await mutateAsync({ input: { email, password } });
      if (result?.login?.__typename === 'MutationLoginSuccess' && result.login.data?.token) {
        await setToken(result.login.data.token);
      } else if (
        result?.login?.__typename === 'BaseError' ||
        result?.login?.__typename === 'ZodError'
      ) {
        throw new Error(result.login.message || 'Error al iniciar sesión');
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Handle error (show toast, alert, etc.)
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 h-64"
      />
      <View className="flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
          <View className="p-8">
            <Title className="text-2xl font-bold text-center mb-8 text-gray-900">
              Iniciar Sesión
            </Title>
            <View className="space-y-4">
              <Input
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900"
              />
              <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900"
              />
              <Button
                onPress={handleLogin}
                disabled={isPending}
                className="w-full py-3.5 bg-primary rounded-xl disabled:opacity-50"
                textClassName="text-white font-medium text-base"
              >
                {isPending ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
