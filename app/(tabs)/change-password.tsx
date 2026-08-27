import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientButton } from '@/components/gradient-button';
import { PasswordField } from '@/components/settings/password-field';
import { PasswordRequirements } from '@/components/settings/password-requirements';
import { StatusDialog } from '@/components/status-dialog';

function isPasswordValid(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export default function ChangePasswordScreen() {
  const insets = useSafeAreaInsets();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const canSubmit =
    currentPassword.length > 0 &&
    isPasswordValid(newPassword) &&
    confirmPassword.length > 0 &&
    confirmPassword === newPassword;

  const handleSubmit = () => {
    setSuccessOpen(true);
  };

  const handleDone = () => {
    setSuccessOpen(false);
    router.push('/settings');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.backButton} onPress={() => router.push('/settings')} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color="#1A2B3C" />
        </Pressable>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <PasswordField label="Current Password" value={currentPassword} onChangeText={setCurrentPassword} />
          <PasswordField label="New Password" value={newPassword} onChangeText={setNewPassword} />
          <PasswordField label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} />

          <PasswordRequirements password={newPassword} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <GradientButton label="Change Password" onPress={handleSubmit} disabled={!canSubmit} />
      </View>

      <StatusDialog
        visible={successOpen}
        tone="success"
        title="Password Changed!"
        message="Your password has been updated successfully."
        buttonLabel="Ok"
        onButtonPress={handleDone}
        onClose={() => setSuccessOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F7F9F8',
  },
});
