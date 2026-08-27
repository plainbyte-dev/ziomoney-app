import type { Ionicons } from '@expo/vector-icons';
import { Ionicons as IoniconsComponent } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type GradientOutlineButtonProps = {
  label: string;
  onPress: () => void;
  icon?: IoniconName;
  iconElement?: ReactNode;
  colors?: [string, string];
};

export function GradientOutlineButton({
  label,
  onPress,
  icon,
  iconElement,
  colors = ['#1C5FB6', '#1AA80C'],
}: GradientOutlineButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.borderWrap}>
        <View style={styles.inner}>
          {iconElement ?? (icon && <IoniconsComponent name={icon} size={18} color="#1C5FB6" />)}
          <Text style={styles.label}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  borderWrap: {
    borderRadius: 14,
    padding: 1.5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12.5,
    paddingVertical: 13,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C5FB6',
  },
});
