import { Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function CropsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        headerBackTitle: 'Back',
      }}
    />
  );
}
