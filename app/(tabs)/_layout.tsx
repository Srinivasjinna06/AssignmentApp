import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="web" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video Player',
          tabBarIcon: ({ color }) => <MaterialIcons name="play-circle-fill" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}