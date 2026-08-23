import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { OnboardingRings } from './onboarding-rings';

export type OnboardingSlideData = {
  image: ImageSource;
  title: string;
  subtitle: string;
};

type OnboardingSlideProps = Pick<OnboardingSlideData, 'image'>;

const FRAME_WIDTH = 335;
const FRAME_HEIGHT = 320;
// Kept at 200 (not the original 260 design spec) so the source PNGs — the
// smallest of which is 200x133 — never get upscaled and blurred.
const ILLUSTRATION_SIZE = 200;
const ILLUSTRATION_TOP = 82;
const ILLUSTRATION_LEFT = 68;
const RINGS_SIZE = 280;

const illustrationCenterX = ILLUSTRATION_LEFT + ILLUSTRATION_SIZE / 2;
const illustrationCenterY = ILLUSTRATION_TOP + ILLUSTRATION_SIZE / 2;

export function OnboardingSlide({ image }: OnboardingSlideProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.frame}>
        <View
          style={[
            styles.ringsAnchor,
            {
              width: RINGS_SIZE,
              height: RINGS_SIZE,
              left: illustrationCenterX - RINGS_SIZE / 2,
              top: illustrationCenterY - RINGS_SIZE / 2,
            },
          ]}>
          <OnboardingRings size={RINGS_SIZE} />
        </View>

        <View style={styles.illustrationContainer}>
          <Image source={image} style={styles.illustration} contentFit="contain" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
  },
  ringsAnchor: {
    position: 'absolute',
  },
  illustrationContainer: {
    position: 'absolute',
    top: ILLUSTRATION_TOP,
    left: ILLUSTRATION_LEFT,
    width: ILLUSTRATION_SIZE,
    height: ILLUSTRATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
});
