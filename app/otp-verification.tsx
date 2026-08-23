import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { OtpInputField } from '@/components/auth/otp-input-field';
import { ResendCode } from '@/components/auth/resend-code';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 54;

export default function OtpVerificationScreen() {
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (code.length === OTP_LENGTH) {
      router.push('/create-password');
    }
  }, [code]);

  const handleResend = () => {
    setSecondsLeft(RESEND_SECONDS);
    setCode('');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12, paddingBottom: insets.bottom }]}>
      <AuthHeader title="OTP Verification" />

      <Text style={styles.message}>
        Please key in Activation code send to{' '}
        <Text style={styles.email}>{email ?? 'your email'}</Text>. Please enter it.
      </Text>

      <View style={styles.boxesWrapper}>
        <OtpInputField code={code} onChangeCode={setCode} />
      </View>

      <ResendCode secondsLeft={secondsLeft} onResend={handleResend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    paddingHorizontal: 20,
  },
  message: {
    marginTop: 28,
    fontSize: 14.5,
    color: '#5A6772',
    lineHeight: 21,
  },
  email: {
    fontWeight: '700',
    color: '#1A2B3C',
  },
  boxesWrapper: {
    marginTop: 24,
  },
});
