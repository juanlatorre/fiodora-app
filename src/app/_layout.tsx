import '../global.css';

import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../hooks/AuthContext';
import { QueryProvider } from '../providers/QueryProvider';
import ToastContainer from 'toastify-react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ClashGrotesk-Bold': require('../assets/fonts/ClashGrotesk-Bold.otf'),
    'ClashGrotesk-Extralight': require('../assets/fonts/ClashGrotesk-Extralight.otf'),
    'ClashGrotesk-Light': require('../assets/fonts/ClashGrotesk-Light.otf'),
    'ClashGrotesk-Medium': require('../assets/fonts/ClashGrotesk-Medium.otf'),
    'ClashGrotesk-Regular': require('../assets/fonts/ClashGrotesk-Regular.otf'),
    'ClashGrotesk-Semibold': require('../assets/fonts/ClashGrotesk-Semibold.otf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(protected)" />
            </Stack>
            <StatusBar style="auto" />
            <ToastContainer position="bottom" theme="dark" duration={3000} />
          </ThemeProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryProvider>
  );
}
