import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type DashboardHeaderProps = {
  notificationCount?: number;
  onPressNotifications?: () => void;
};

export function DashboardHeader({ notificationCount = 0, onPressNotifications }: DashboardHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable hitSlop={12}>
        <Ionicons name="menu-outline" size={26} color="#1A2B3C" />
      </Pressable>

      <Image
        source={require('@/assets/images/logo/logo.png')}
        style={styles.logo}
        contentFit="contain"
      />

      <Pressable hitSlop={12} style={styles.bellButton} onPress={onPressNotifications}>
        <Ionicons name="notifications-outline" size={24} color="#1A2B3C" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    // Matches the source PNG's 200x62 aspect ratio at a size close to its
    // native resolution, avoiding the upscale blur a larger box would cause.
    width: 100,
    height: 31,
  },
  bellButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E24C4C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
