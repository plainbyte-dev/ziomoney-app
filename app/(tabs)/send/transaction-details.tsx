import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SummaryRow } from '@/components/add-receiver/summary-row';
import { ReceiverCard } from '@/components/choose-receiver/receiver-card';
import { sendFlowData } from '@/components/choose-receiver/send-flow-store';
import { GradientButton } from '@/components/gradient-button';
import { OutlineButton } from '@/components/outline-button';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';
import { StatusDialog } from '@/components/status-dialog';

export default function TransactionDetailsScreen() {
  const insets = useSafeAreaInsets();
  const [successOpen, setSuccessOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const data = sendFlowData;
  const receiver = data.receiver;

  const payable = data.sendAmount + data.transferFee;

  const handleCancel = () => {
    setCancelConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setCancelConfirmOpen(false);
    router.push('/(tabs)');
  };

  const handlePayNow = () => {
    setSuccessOpen(true);
  };

  const handleDone = () => {
    setSuccessOpen(false);
    router.push('/send/receipt');
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader
          title="Transaction Details"
          onBack={() =>
            router.push(data.depositType === 'Wallet' ? '/send/wallet-details' : '/send/additional-info')
          }
        />
        <View style={styles.progressWrap}>
          <ProgressBar progress={1} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.payableCard}>
          <Text style={styles.payableLabel}>Transfer Payable</Text>
          <Text style={styles.payableValue}>
            {payable.toFixed(2)} {data.sendCurrencyCode}
          </Text>
        </View>

        <View style={styles.card}>
          <SummaryRow label="Transfer Amount" value={`${data.sendAmount.toFixed(2)} ${data.sendCurrencyCode}`} />
          <SummaryRow
            label="Receive Amount"
            value={`${data.recipientGets.toFixed(2)} ${data.receiveCurrencyCode}`}
          />
          <SummaryRow
            label="Exchange Rate"
            value={`1 ${data.sendCurrencyCode} = ${data.rate.toFixed(4)} ${data.receiveCurrencyCode}`}
          />
          {data.couponDiscount > 0 && (
            <SummaryRow
              label="Coupon Discount"
              value={`- ${data.couponDiscount.toFixed(2)} ${data.sendCurrencyCode}`}
            />
          )}
          <SummaryRow label="Transfer Fee" value={`${data.transferFee.toFixed(2)} ${data.sendCurrencyCode}`} />
          {data.depositType === 'Wallet' && (
            <>
              <SummaryRow label="Wallet" value={data.walletName ?? '—'} />
              <SummaryRow label="Wallet ID" value={data.walletId || '—'} />
            </>
          )}
        </View>

        {receiver && (
          <View style={styles.card}>
            <ReceiverCard receiver={receiver} />
            <View style={styles.divider} />

            {receiver.bankName && <SummaryRow label="Bank Name" value={receiver.bankName} />}
            {receiver.accountNumber && <SummaryRow label="Account Number" value={receiver.accountNumber} />}
            {receiver.walletProvider && <SummaryRow label="Wallet Provider" value={receiver.walletProvider} />}
            {receiver.idType && <SummaryRow label="ID Type" value={receiver.idType} />}
            {receiver.idNumber && <SummaryRow label="ID Number" value={receiver.idNumber} />}
            <SummaryRow label="Receiving Method" value={receiver.method} />
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerButton}>
          <OutlineButton label="Cancel" onPress={handleCancel} />
        </View>
        <View style={styles.footerButton}>
          <GradientButton label="Pay Now" onPress={handlePayNow} />
        </View>
      </View>

      <StatusDialog
        visible={successOpen}
        tone="success"
        title="Payment Successful!"
        message="Your transfer has been submitted successfully."
        buttonLabel="Ok"
        onButtonPress={handleDone}
        onClose={() => setSuccessOpen(false)}
      />

      <StatusDialog
        visible={cancelConfirmOpen}
        tone="warning"
        title="Cancel Transaction?"
        message="Are you sure you want to cancel this transaction?"
        buttonLabel="Confirm"
        onButtonPress={handleConfirmCancel}
        onClose={() => setCancelConfirmOpen(false)}
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
    gap: 16,
  },
  payableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
  },
  payableLabel: {
    fontSize: 13,
    color: '#7A8894',
  },
  payableValue: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '700',
    color: '#1C5FB6',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDEFF1',
    marginVertical: 14,
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
