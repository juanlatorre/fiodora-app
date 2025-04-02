import { useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { useMutation } from '../../hooks/useGraphQL';
import { useAuth } from '../../hooks/AuthContext';
import { graphql } from '../../gql/gql';
import { LoginDocument } from '../../gql/graphql';
import { LinearGradient } from 'expo-linear-gradient';
import { Toast } from 'toastify-react-native';

graphql(`
  mutation Login($input: MutationLoginInput!) {
    login(input: $input) {
      __typename
      ... on MutationLoginSuccess {
        data {
          token
          user {
            id
            name
            email
          }
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
  const { setAuth } = useAuth();

  const { mutateAsync, isPending } = useMutation(LoginDocument);

  const handleLogin = async () => {
    try {
      const result = await mutateAsync({ input: { email, password } });

      if (
        result?.login?.__typename === 'MutationLoginSuccess' &&
        result.login.data?.token &&
        result.login.data.user?.id &&
        result.login.data.user.name &&
        result.login.data.user.email
      ) {
        const userData = {
          id: result.login.data.user.id,
          name: result.login.data.user.name,
          email: result.login.data.user.email,
        };
        await setAuth(result.login.data.token, userData);
        Toast.success('Sesión iniciada correctamente');
      } else if (
        result?.login?.__typename === 'BaseError' ||
        result?.login?.__typename === 'ZodError'
      ) {
        Toast.error(result.login.message || 'Error al iniciar sesión');
      } else {
        Toast.error('Error al iniciar sesión');
      }
    } catch (error: any) {
      Toast.error('Error al iniciar sesión');
    }
  };

  return (
    <LinearGradient
      colors={['#F0E7F5', '#D4C9E8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-4xl font-bold text-text-primary mb-8 tracking-tight">
              Fiodora
            </Text>
            <Card className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
              <View className="p-8">
                <Title className="text-2xl font-bold text-center mb-8 text-gray-900">
                  Iniciar Sesión
                </Title>
                <View>
                  <Input
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 mb-4"
                  />
                  <Input
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 mb-4"
                  />
                  <Button
                    onPress={handleLogin}
                    disabled={isPending}
                    className="w-full py-3.5 bg-text-primary rounded-xl disabled:opacity-50"
                    textClassName="text-white font-medium text-base"
                  >
                    {isPending ? 'Cargando...' : 'Iniciar Sesión'}
                  </Button>
                </View>
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
