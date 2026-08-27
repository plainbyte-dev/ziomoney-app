import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';

const BASE_HEIGHT = 80;
const BASE_PADDING_TOP = 12;
const BASE_PADDING_BOTTOM = 20;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1C5FB6',
        tabBarInactiveTintColor: '#8A97A0',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E9EC',
          height: BASE_HEIGHT + insets.bottom,
          paddingTop: BASE_PADDING_TOP,
          paddingBottom: BASE_PADDING_BOTTOM + insets.bottom,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recipients"
        options={{
          title: 'Recipients',
          tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color, size }) => <Feather name="repeat" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, size }) => <Feather name="credit-card" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
      <Tabs.Screen name="send-money" options={{ href: null }} />
      <Tabs.Screen name="choose-receiver" options={{ href: null }} />
      <Tabs.Screen name="add-receiver/receiving-country" options={{ href: null }} />
      <Tabs.Screen name="add-receiver/bank-details" options={{ href: null }} />
      <Tabs.Screen name="add-receiver/wallet-details" options={{ href: null }} />
      <Tabs.Screen name="add-receiver/cash-pickup-details" options={{ href: null }} />
      <Tabs.Screen name="add-receiver/personal-details" options={{ href: null }} />
      <Tabs.Screen name="add-receiver/beneficiary-summary" options={{ href: null }} />
      <Tabs.Screen name="send/additional-info" options={{ href: null }} />
      <Tabs.Screen name="send/transaction-details" options={{ href: null }} />
      <Tabs.Screen name="send/receipt" options={{ href: null }} />
    </Tabs>
  );
}
