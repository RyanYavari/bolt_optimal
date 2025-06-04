import { Stack } from 'expo-router';
import { colors } from '@/src/constants/colors';

export default function HabitSummaryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Habit Summary',
        }}
      />
      <Stack.Screen
        name="goals"
        options={{
          title: 'Goals Analytics',
        }}
      />
    </Stack>
  );
}