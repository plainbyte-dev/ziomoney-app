import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SummaryRow } from '@/components/add-receiver/summary-row';
import { resetSendFlowData, sendFlowData } from '@/components/choose-receiver/send-flow-store';
import { GradientButton } from '@/components/gradient-button';
import { OutlineButton } from '@/components/outline-button';
import { WarningBanner } from '@/components/warning-banner';

export default function ReceiptScreen() {
  const insets = useSafeAreaInsets();
  const data = sendFlowData;

  const payable = data.sendAmount + data.transferFee;
  const transactionId = useMemo(() => `REF${Math.floor(1000000 + Math.random() * 9000000)}`, []);

  const handleShare = () => {
    Share.share({
      message: `ZioMoney Receipt\nTransaction ID: ${transactionId}\nTotal Payable: ${payable.toFixed(2)} ${data.sendCurrencyCode}\nTransfer Amount: ${data.sendAmount.toFixed(2)} ${data.sendCurrencyCode}\nReceive Amount: ${data.recipientGets.toFixed(2)} ${data.receiveCurrencyCode}`,
    });
  };

  const handleDone = () => {
    resetSendFlowData();
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Receipt</Text>
        <Pressable style={styles.shareButton} onPress={handleShare} hitSlop={8}>
          <Ionicons name="share-outline" size={20} color="#1A2B3C" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.successWrap}>
          <View style={styles.halo}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={30} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.successTitle}>Success!</Text>
          <Text style={styles.successSubtitle}>Transaction was Successfully Completed!</Text>
        </View>

        <View style={styles.card}>
          <SummaryRow label="Total Payable" value={`${payable.toFixed(2)} ${data.sendCurrencyCode}`} />
          <View style={styles.transactionIdRow}>
            <Text style={styles.transactionIdLabel}>Transaction ID</Text>
            <View style={styles.transactionIdValueRow}>
              <Text style={styles.transactionIdValue}>{transactionId}</Text>
              <Pressable onPress={handleShare} hitSlop={8}>
                <Ionicons name="copy-outline" size={16} color="#1C5FB6" />
              </Pressable>
            </View>
          </View>
          <SummaryRow label="Transfer Amount" value={`${data.sendAmount.toFixed(2)} ${data.sendCurrencyCode}`} />
          <SummaryRow
            label="Receive Amount"
            value={`${data.recipientGets.toFixed(2)} ${data.receiveCurrencyCode}`}
          />
          {data.couponDiscount > 0 && (
            <SummaryRow
              label="Coupon Discount"
              value={`- ${data.couponDiscount.toFixed(2)} ${data.sendCurrencyCode}`}
            />
          )}
          <SummaryRow
            label="Exchange Rate"
            value={`1 ${data.sendCurrencyCode} = ${data.rate.toFixed(4)} ${data.receiveCurrencyCode}`}
          />
          <SummaryRow label="Transfer Fee" value={`${data.transferFee.toFixed(2)} ${data.sendCurrencyCode}`} />
        </View>

        <View style={styles.bannerWrap}>
          <WarningBanner message="Having trouble?" linkLabel="Get Help." />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerButton}>
          <OutlineButton label="Download" onPress={() => {}} />
        </View>
        <View style={styles.footerButton}>
          <GradientButton label="OK" onPress={handleDone} />
        </View>
      </View>
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
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  successWrap: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  halo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(26,168,12,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1AA80C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  successSubtitle: {
    marginTop: 4,
    fontSize: 13.5,
    color: '#7A8894',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  transactionIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  transactionIdLabel: {
    fontSize: 14,
    color: '#7A8894',
  },
  transactionIdValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionIdValue: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  bannerWrap: {
    marginTop: 4,
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
