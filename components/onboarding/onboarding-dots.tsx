import { StyleSheet, View } from 'react-native';

type OnboardingDotsProps = {
  count: number;
  activeIndex: number;
};

export function OnboardingDots({ count, activeIndex }: OnboardingDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === activeIndex ? styles.dotActive : styles.dotInactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 5,
    borderRadius: 4.62,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#3E8E5A',
  },
  dotInactive: {
    width: 5,
    backgroundColor: '#D9E2DC',
  },
});
