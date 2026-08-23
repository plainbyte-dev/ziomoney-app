import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type BalanceActionButtonProps = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
};

export function BalanceActionButton({ label, icon, onPress }: BalanceActionButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
