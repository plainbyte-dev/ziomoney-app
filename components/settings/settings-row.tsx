import type { Ionicons } from '@expo/vector-icons';
import { Ionicons as IoniconsComponent } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type Badge = {
  label: string;
  background: string;
  color: string;
};

type SettingsRowProps = {
  icon: IoniconName;
  label: string;
  onPress?: () => void;
  iconBackground?: string;
  iconColor?: string;
  labelColor?: string;
  value?: string;
  badge?: Badge;
  switchValue?: boolean;
  onToggle?: (value: boolean) => void;
};

export function SettingsRow({
  icon,
  label,
  onPress,
  iconBackground = '#E7F0FC',
  iconColor = '#1C5FB6',
  labelColor = '#1A2B3C',
  value,
  badge,
  switchValue,
  onToggle,
}: SettingsRowProps) {
  const hasSwitch = switchValue !== undefined;

  return (
    <Pressable style={styles.row} onPress={onPress} disabled={!onPress && !hasSwitch}>
      <View style={[styles.iconCircle, { backgroundColor: iconBackground }]}>
        <IoniconsComponent name={icon} size={18} color={iconColor} />
      </View>

      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>

      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E9EC', true: '#1AA80C' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View style={styles.rightGroup}>
          {value && <Text style={styles.value}>{value}</Text>}
          {badge && (
            <View style={[styles.badge, { backgroundColor: badge.background }]}>
              <Text style={[styles.badgeLabel, { color: badge.color }]}>{badge.label}</Text>
            </View>
          )}
          {onPress && <IoniconsComponent name="chevron-forward" size={18} color="#1C5FB6" />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: {
    fontSize: 13.5,
    color: '#7A8894',
  },
  badge: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeLabel: {
    fontSize: 11.5,
    fontWeight: '700',
  },
});
