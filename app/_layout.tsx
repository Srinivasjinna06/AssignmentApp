import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // Request permissions for native local notifications on mobile 
    if (Platform.OS !== 'web') {
      const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Notification permissions not granted');
        }
      };
      requestPermissions();
    }
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast />
    </>
  );
}