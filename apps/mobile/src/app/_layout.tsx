import { DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="create" options={{ headerBackVisible: true }} />
        <Stack.Screen name="(admin)/bookings" options={{ headerBackVisible: true }} />
      </Stack>
    </ThemeProvider>
  );
}
