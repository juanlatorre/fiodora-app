/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'title-bold': ['ClashGrotesk-Bold'],
        'title-semibold': ['ClashGrotesk-Semibold'],
        'title-medium': ['ClashGrotesk-Medium'],
        'base-regular': ['Manrope-Regular'],
        'base-medium': ['Manrope-Medium'],
        'base-semibold': ['Manrope-SemiBold'],
      },
      colors: {
        primary: '#F0E7F5',
        secondary: '#FDF6E3',
        accent: '#FF6B9C',
        success: '#22C55E',
        successAlter: '#7C3AED',
        danger: '#FF5252',
        background: '#F4F0F7',
        surface: '#FFFFFF',
        text: {
          primary: '#352F3D',
          secondary: '#6F6A7A',
          muted: '#A69FB2',
        },
        gradient: {
          start: '#F0E7F5',
          end: '#D4C9E8',
        },
        highlight: '#E9D5FF',
      },
      boxShadow: {
        soft: '4px 4px 10px rgba(166, 159, 178, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.7)',
        'soft-sm': '2px 2px 6px rgba(166, 159, 178, 0.1), -2px -2px 6px rgba(255, 255, 255, 0.7)',
        inset:
          'inset 2px 2px 6px rgba(166, 159, 178, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)',
      },
      borderRadius: {
        xl: '24px',
        '2xl': '32px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};
