import { Pressable, StyleSheet, Text } from 'react-native';

type OutlineButtonProps = {
  label: string;
  onPress: () => void;
};

export function OutlineButton({ label, onPress }: OutlineButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#1C5FB6',
    borderRadius: 1000,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#1C5FB6',
    fontSize: 15,
    fontWeight: '700',
  },
});
