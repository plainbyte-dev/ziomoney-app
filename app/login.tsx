import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { AuthTextField } from '@/components/auth/auth-text-field';
import { BiometricPrompt } from '@/components/auth/biometric-prompt';
import { OutlineButton } from '@/components/auth/outline-button';
import { GradientButton } from '@/components/gradient-button';
import { markLoggedIn } from '@/lib/auth-storage';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const enterApp = async () => {
    await markLoggedIn();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled">
        <AuthHeader title="Log In" />

        <View style={styles.form}>
          <AuthTextField
            label="Email Address/Mobile"
            placeholder="Enter your email or mobile number"
            autoCapitalize="none"
            keyboardType="email-address"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <AuthTextField
            label="Password"
            placeholder="Enter your password"
            secure
            value={password}
            onChangeText={setPassword}
          />

          <GradientButton
            label="Login"
            colors={['#1C5FB6', '#1AA80C']}
            onPress={enterApp}
          />

          <Text style={styles.forgotPassword}>Forgot password?</Text>

          <BiometricPrompt onSuccess={enterApp} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <View style={styles.footerButton}>
            <OutlineButton label="Create new account" onPress={() => router.push('/register')} />
          </View>
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
  form: {
    marginTop: 40,
  },
  forgotPassword: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#3D4A54',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#3D4A54',
    marginBottom: 12,
  },
  footerButton: {
    width: '100%',
  },
});
