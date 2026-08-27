import { Pressable, StyleSheet, Text } from 'react-native';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9EC',
  },
  chipSelected: {
    backgroundColor: '#1AA80C',
    borderColor: '#1AA80C',
  },
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#3D4A54',
  },
  labelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
