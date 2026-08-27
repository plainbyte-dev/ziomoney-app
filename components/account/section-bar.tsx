import { StyleSheet, Text, View } from 'react-native';

type SectionBarProps = {
  label: string;
};

export function SectionBar({ label }: SectionBarProps) {
  return (
    <View style={styles.bar}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#E7F0FC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1C5FB6',
  },
});
