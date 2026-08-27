import { Pressable, StyleSheet, Text } from 'react-native';

type OutlineButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function OutlineButton({ label, onPress, disabled = false }: OutlineButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.button, disabled && styles.disabled]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 1000,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E9EC',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#1C5FB6',
    fontSize: 15,
    fontWeight: '700',
  },
});
