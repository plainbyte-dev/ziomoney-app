import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

// Source PNG is 1040x694 (~3x headroom over the display size below), so this
// stays sharp even on high-density screens instead of upscaling and blurring.
export function KycIllustration() {
  return (
    <Image
      source={require('@/assets/images/kyc/kyc-illustration.png')}
      style={styles.image}
      contentFit="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 340,
    height: 227,
    alignSelf: 'center',
  },
});
