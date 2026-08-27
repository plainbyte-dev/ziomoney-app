import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { addReceiverData, resetAddReceiverData } from '@/components/add-receiver/add-receiver-store';
import { SummaryRow } from '@/components/add-receiver/summary-row';
import { GradientButton } from '@/components/gradient-button';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';
import { StatusDialog } from '@/components/status-dialog';

export default function BeneficiarySummaryScreen() {
  const insets = useSafeAreaInsets();
  const [successOpen, setSuccessOpen] = useState(false);
  const data = addReceiverData;

  const handleConfirm = () => {
    setSuccessOpen(true);
  };

  const handleDone = () => {
    setSuccessOpen(false);
    resetAddReceiverData();
    router.replace('/choose-receiver');
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Beneficiary Summary" onBack={() => router.push('/add-receiver/address')} />
        <View style={styles.progressWrap}>
          <ProgressBar progress={1} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarFlag}>{data.countryFlag}</Text>
            </View>
            <View>
              <Text style={styles.name}>{data.fullName}</Text>
              <Text style={styles.subtitle}>Recipient in {data.countryName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <SummaryRow label="Mobile Number" value={`${data.phoneDialCode}-${data.phoneNumber}`} />

          {data.methodId === 'bank' && (
            <>
              <SummaryRow label="Bank Name" value={data.bankName ?? '—'} />
              <SummaryRow label="Account Number" value={data.accountNumber || '—'} />
            </>
          )}

          {data.methodId === 'wallet' && (
            <>
              <SummaryRow label="Wallet" value={data.walletName ?? '—'} />
              <SummaryRow label="Wallet ID" value={data.walletId || '—'} />
            </>
          )}

          {data.methodId === 'cash' && (
            <SummaryRow label="Payout Location" value={data.payoutLocation ?? '—'} />
          )}

          <SummaryRow label="Receiving Method" value={data.methodLabel} />
          <SummaryRow label="Street Address" value={data.streetAddress || '—'} />
          <SummaryRow label="State" value={data.state ?? '—'} />
          <SummaryRow label="Zip Code" value={data.zipCode || '—'} />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <GradientButton label="Confirm" onPress={handleConfirm} />
      </View>

      <StatusDialog
        visible={successOpen}
        tone="success"
        title="Successful!"
        message="Beneficiary added successfully."
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
  progressWrap: {
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F3F5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarFlag: {
    fontSize: 22,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#7A8894',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEFF1',
    marginVertical: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F7F9F8',
  },
});
