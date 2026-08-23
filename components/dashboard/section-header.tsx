import { Pressable, StyleSheet, Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onSeeAll} hitSlop={8}>
        <Text style={styles.seeAll}>See All</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  seeAll: {
    fontSize: 13,
    color: '#1C5FB6',
    fontWeight: '600',
  },
});
