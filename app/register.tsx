import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { AuthTextField } from '@/components/auth/auth-text-field';
import { NationalityField } from '@/components/auth/nationality-field';
import { TermsCheckbox } from '@/components/auth/terms-checkbox';
import { GradientButton } from '@/components/gradient-button';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('United States');
  const [referralCode, setReferralCode] = useState('');
  const [agreed, setAgreed] = useState(true);

  const canContinue = email.trim().length > 0 && agreed;

  const handleContinue = () => {
    if (!canContinue) return;
    router.push({ pathname: '/otp-verification', params: { email: email.trim() } });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled">
        <AuthHeader />

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Let&apos;s get started</Text>
          <Text style={styles.subtitle}>Create your account to access all the features.</Text>
        </View>

        <View style={styles.form}>
          <AuthTextField
            label="Email Address"
            placeholder="Enter your email address"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <NationalityField label="Nationality" value={nationality} onChange={setNationality} />

          <AuthTextField
            label="Referral Code (Optional)"
            placeholder="Enter referral code"
            autoCapitalize="characters"
            value={referralCode}
            onChangeText={setReferralCode}
          />

          <TermsCheckbox checked={agreed} onToggle={() => setAgreed((prev) => !prev)} />
        </View>

        <View style={styles.footer}>
          <GradientButton
            label="Continue"
            colors={['#1C5FB6', '#1AA80C']}
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  titleBlock: {
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A2B3C',
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7A8894',
  },
  form: {
    flex: 1,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 32,
  },
});
