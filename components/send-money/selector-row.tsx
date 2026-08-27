import type { Ionicons } from '@expo/vector-icons';
import { Ionicons as IoniconsComponent } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type SelectorRowProps = {
  label: string;
  icon: IoniconName;
  emoji?: string;
  value: string;
  onPress: () => void;
};

export function SelectorRow({ label, icon, emoji, value, onPress }: SelectorRowProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.row} onPress={onPress}>
        <View style={styles.iconCircle}>
          {emoji ? <Text style={styles.emoji}>{emoji}</Text> : <IoniconsComponent name={icon} size={18} color="#1C5FB6" />}
        </View>
        <Text style={styles.value}>{value}</Text>
        <IoniconsComponent name="chevron-down" size={18} color="#7A8894" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A2B3C',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E7F0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2B3C',
  },
});
