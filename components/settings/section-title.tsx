import { StyleSheet, Text } from 'react-native';

type SectionTitleProps = {
  label: string;
};

export function SectionTitle({ label }: SectionTitleProps) {
  return <Text style={styles.title}>{label}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A97A0',
    letterSpacing: 0.6,
    marginTop: 24,
    marginBottom: 10,
  },
});
