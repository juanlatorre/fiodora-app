/* eslint-disable no-restricted-syntax */

import { type ConfigContext, type ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'Fiodora',
    slug: 'fiodora',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'fiodora',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    extra: {
      eas: {
        projectId: 'bd8c80fb-2776-41ea-be6f-8dc76cca5b41',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      [
        'expo-font',
        {
          fonts: [
            './src/assets/fonts/ClashGrotesk-Bold.otf',
            './src/assets/fonts/ClashGrotesk-Extralight.otf',
            './src/assets/fonts/ClashGrotesk-Light.otf',
            './src/assets/fonts/ClashGrotesk-Medium.otf',
            './src/assets/fonts/ClashGrotesk-Regular.otf',
            './src/assets/fonts/ClashGrotesk-Semibold.otf',
            './src/assets/fonts/Manrope-Bold.ttf',
            './src/assets/fonts/Manrope-ExtraBold.ttf',
            './src/assets/fonts/Manrope-ExtraLight.ttf',
            './src/assets/fonts/Manrope-Light.ttf',
            './src/assets/fonts/Manrope-Medium.ttf',
            './src/assets/fonts/Manrope-Regular.ttf',
            './src/assets/fonts/Manrope-SemiBold.ttf',
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
