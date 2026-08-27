import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FraudBanner } from '@/components/add-receiver/fraud-banner';
import { OptionPickerModal } from '@/components/add-receiver/option-picker-modal';
import { walletProviders } from '@/components/add-receiver/wallet-data';
import { sendFlowData } from '@/components/choose-receiver/send-flow-store';
import { GradientButton } from '@/components/gradient-button';
import { OutlineButton } from '@/components/outline-button';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';

export default function SendWalletDetailsScreen() {
  const insets = useSafeAreaInsets();

  const [wallet, setWallet] = useState<string | null>(sendFlowData.walletName);
  const [walletPickerOpen, setWalletPickerOpen] = useState(false);
  const [walletId, setWalletId] = useState(sendFlowData.walletId);

  const handlePrev = () => {
    router.push('/send/additional-info');
  };

  const handleNext = () => {
    sendFlowData.walletName = wallet;
    sendFlowData.walletId = walletId;
    router.push('/send/transaction-details');
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Wallet Details" onBack={handlePrev} />
        <View style={styles.progressWrap}>
          <ProgressBar progress={0.8} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <FraudBanner />

          <View style={styles.field}>
            <Text style={styles.label}>Wallet</Text>
            <Pressable style={styles.selectRow} onPress={() => setWalletPickerOpen(true)}>
              <Text style={wallet ? styles.selectValue : styles.placeholder}>{wallet ?? 'Select Wallet'}</Text>
              <Ionicons name="chevron-down" size={18} color="#7A8894" />
            </Pressable>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Wallet ID</Text>
            <TextInput
              value={walletId}
              onChangeText={setWalletId}
              keyboardType="number-pad"
              placeholder="12345678"
              placeholderTextColor="#B7C2CB"
              style={styles.input}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerButton}>
          <OutlineButton label="Prev" onPress={handlePrev} />
        </View>
        <View style={styles.footerButton}>
          <GradientButton label="Next" onPress={handleNext} />
        </View>
      </View>

      <OptionPickerModal
        visible={walletPickerOpen}
        title="Wallet"
        options={walletProviders}
        selectedOption={wallet}
        onClose={() => setWalletPickerOpen(false)}
        onSelect={setWallet}
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
  progressWrap: {
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  field: {
    gap: 10,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2B3C',
  },
  placeholder: {
    fontSize: 15,
    color: '#B7C2CB',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A2B3C',
  },
  footer: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F7F9F8',
  },
  footerButton: {
    flex: 1,
  },
});
