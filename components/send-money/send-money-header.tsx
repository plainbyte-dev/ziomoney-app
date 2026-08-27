import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SendMoneyHeaderProps = {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
};

export function SendMoneyHeader({ title, onBack, onClose }: SendMoneyHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.iconButton} onPress={onBack ?? (() => router.back())} hitSlop={8}>
        <Ionicons name="chevron-back" size={22} color="#1A2B3C" />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Pressable
        style={styles.iconButton}
        onPress={onClose ?? (() => router.push('/(tabs)'))}
        hitSlop={8}>
        <Ionicons name="close" size={20} color="#1A2B3C" />
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2B3C',
  },
});
