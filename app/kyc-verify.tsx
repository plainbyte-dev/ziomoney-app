import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { KycIllustration } from '@/components/auth/kyc-illustration';
import { kycRequirements, KycRequirementRow } from '@/components/auth/kyc-requirement-row';
import { StepProgressBar } from '@/components/auth/step-progress-bar';
import { GradientButton } from '@/components/gradient-button';
import { markLoggedIn } from '@/lib/auth-storage';

export default function KycVerifyScreen() {
  const insets = useSafeAreaInsets();

  const handleNext = async () => {
    await markLoggedIn();
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }]}>
      <AuthHeader title="KYC Verify" />

      <View style={styles.progressWrapper}>
        <StepProgressBar progress={0.9} />
      </View>

      <View style={styles.illustrationWrapper}>
        <KycIllustration />
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>Let&apos;s Verify your Profile</Text>
        <Text style={styles.subtitle}>
          Please be ready with following documents to verify your identification.
        </Text>
      </View>

      <View style={styles.requirements}>
        {kycRequirements.map((requirement) => (
          <KycRequirementRow key={requirement.id} requirement={requirement} />
        ))}
      </View>

      <View style={styles.footer}>
        <GradientButton label="Next" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    paddingHorizontal: 20,
  },
  progressWrapper: {
    marginTop: 20,
  },
  illustrationWrapper: {
    marginTop: 28,
  },
  titleBlock: {
    marginTop: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    fontWeight: '700',
    color: '#1A2B3C',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7A8894',
    textAlign: 'center',
    lineHeight: 20,
  },
  requirements: {
    marginTop: 28,
  },
  footer: {
    marginTop: 'auto',
  },
});
