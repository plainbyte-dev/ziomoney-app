import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { AuthTextField } from '@/components/auth/auth-text-field';
import { isPasswordValid, PasswordChecklist } from '@/components/auth/password-checklist';
import { GradientButton } from '@/components/gradient-button';

export default function CreatePasswordScreen() {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canContinue = isPasswordValid(password) && password === confirmPassword && confirmPassword.length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    router.push('/create-profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled">
        <AuthHeader title="Create Password" />

        <View style={styles.form}>
          <AuthTextField
            label="Password"
            placeholder="e.g. Arjun#123"
            secure
            value={password}
            onChangeText={setPassword}
          />
          <AuthTextField
            label="Confirm Password"
            placeholder="e.g. Arjun#123"
            secure
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <PasswordChecklist password={password} />
        </View>

        <View style={styles.footer}>
          <GradientButton label="Continue" onPress={handleContinue} disabled={!canContinue} />
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
    marginTop: 28,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 32,
  },
});
