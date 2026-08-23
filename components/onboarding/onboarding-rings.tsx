import { StyleSheet, View } from 'react-native';

type OnboardingRingsProps = {
  size: number;
};

const RING_COUNT = 9;
const RING_COLOR = '#3FA79A';

export function OnboardingRings({ size }: OnboardingRingsProps) {
  const rings = Array.from({ length: RING_COUNT }, (_, index) => {
    const scale = 0.3 + (index / (RING_COUNT - 1)) * 0.7;
    return { scale, opacity: 0.12 + (index / (RING_COUNT - 1)) * 0.28 };
  });

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      {rings.map((ring, index) => {
        const ringSize = size * ring.scale;
        return (
          <View
            key={index}
            style={[
              styles.ring,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
                borderColor: RING_COLOR,
                opacity: ring.opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
  },
});
