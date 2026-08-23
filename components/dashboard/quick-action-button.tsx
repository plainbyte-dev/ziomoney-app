import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { QuickAction } from './dashboard-data';
import { Ionicons } from '@expo/vector-icons';

type QuickActionButtonProps = {
  action: QuickAction;
  onPress?: () => void;
};

export function QuickActionButton({ action, onPress }: QuickActionButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.circle, { backgroundColor: action.backgroundColor }]}>
        <Ionicons name={action.icon} size={20} color={action.iconColor} />
      </View>
      <Text style={styles.label}>{action.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    width: 76,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11.5,
    color: '#3D4A54',
    textAlign: 'center',
  },
});
