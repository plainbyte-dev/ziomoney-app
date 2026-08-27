import type { Ionicons } from '@expo/vector-icons';
import { Ionicons as IoniconsComponent } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type GradientButtonProps = {
  label: string;
  onPress: () => void;
  colors?: [string, string];
  disabled?: boolean;
  icon?: IoniconName;
};

export function GradientButton({
  label,
  onPress,
  colors = ['#1AA80C', '#1C5FB6'],
  disabled = false,
  icon,
}: GradientButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.pressable, disabled && styles.disabled]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}>
        {icon && <IoniconsComponent name={icon} size={18} color="#FFFFFF" style={styles.icon} />}
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
