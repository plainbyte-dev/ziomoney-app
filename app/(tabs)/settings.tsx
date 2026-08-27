import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { languages } from '@/components/settings/language-data';
import { SectionTitle } from '@/components/settings/section-title';
import { SettingsRow } from '@/components/settings/settings-row';
import { SupportBanner } from '@/components/settings/support-banner';
import { StatusDialog } from '@/components/status-dialog';
import { OptionPickerModal } from '@/components/add-receiver/option-picker-modal';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  const [language, setLanguage] = useState('English');
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmOpen(false);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.backButton} onPress={() => router.push('/(tabs)')} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color="#1A2B3C" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        <SupportBanner onPress={() => {}} />

        <SectionTitle label="ACCOUNT SETTINGS" />
        <SettingsRow
          icon="person-outline"
          label="Account Information"
          onPress={() => router.push('/account-information')}
        />
        <SettingsRow
          icon="globe-outline"
          label="Language"
          value={language}
          onPress={() => setLanguagePickerOpen(true)}
        />
        <SettingsRow
          icon="shield-checkmark-outline"
          label="KYC Status"
          badge={{ label: 'Pending', background: '#FCEEDB', color: '#B7791F' }}
          onPress={() => {}}
        />
        <SettingsRow
          icon="finger-print-outline"
          label="Set Biometric"
          switchValue={biometricEnabled}
          onToggle={setBiometricEnabled}
        />
        <SettingsRow
          icon="notifications-outline"
          label="Notification"
          switchValue={notificationsEnabled}
          onToggle={setNotificationsEnabled}
        />

        <SectionTitle label="BENEFITS & SECURITY" />
        <SettingsRow
          icon="gift-outline"
          label="Refer and Earn"
          badge={{ label: 'New', background: '#DFF3DA', color: '#1AA80C' }}
          onPress={() => {}}
        />
        <SettingsRow
          icon="key-outline"
          label="Change Password"
          onPress={() => router.push('/change-password')}
        />

        <SectionTitle label="SUPPORT & LEGAL" />
        <SettingsRow icon="document-text-outline" label="Privacy and Policy" onPress={() => {}} />
        <SettingsRow icon="document-text-outline" label="Terms & Conditions" onPress={() => {}} />
        <SettingsRow
          icon="log-out-outline"
          label="Log Out"
          iconBackground="#FDEAEA"
          iconColor="#E24C4C"
          labelColor="#E24C4C"
          onPress={() => setLogoutConfirmOpen(true)}
        />
      </ScrollView>

      <OptionPickerModal
        visible={languagePickerOpen}
        title="Language"
        options={languages}
        selectedOption={language}
        onClose={() => setLanguagePickerOpen(false)}
        onSelect={setLanguage}
      />

      <StatusDialog
        visible={logoutConfirmOpen}
        tone="warning"
        title="Log Out?"
        message="Are you sure you want to log out of your account?"
        buttonLabel="Log Out"
        onButtonPress={handleLogout}
        onClose={() => setLogoutConfirmOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
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
  },
});
