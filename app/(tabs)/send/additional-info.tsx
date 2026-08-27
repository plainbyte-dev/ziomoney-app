import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OptionPickerModal } from '@/components/add-receiver/option-picker-modal';
import { ReceiverCard } from '@/components/choose-receiver/receiver-card';
import { depositTypes, sendFlowData, sourceOfFunds, transferPurposes } from '@/components/choose-receiver/send-flow-store';
import { GradientButton } from '@/components/gradient-button';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';

export default function AdditionalInfoScreen() {
  const insets = useSafeAreaInsets();
  const receiver = sendFlowData.receiver;

  const [purpose, setPurpose] = useState<string | null>(sendFlowData.purpose);
  const [purposePickerOpen, setPurposePickerOpen] = useState(false);
  const [sourceOfFund, setSourceOfFund] = useState<string | null>(sendFlowData.sourceOfFund);
  const [sourceOfFundPickerOpen, setSourceOfFundPickerOpen] = useState(false);
  const [depositType, setDepositType] = useState<string | null>(sendFlowData.depositType);
  const [depositTypePickerOpen, setDepositTypePickerOpen] = useState(false);

  const handleNext = () => {
    sendFlowData.purpose = purpose;
    sendFlowData.sourceOfFund = sourceOfFund;
    sendFlowData.depositType = depositType;

    if (depositType === 'Wallet') {
      router.push('/send/wallet-details');
    } else {
      router.push('/send/transaction-details');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Additional Info" onBack={() => router.push('/choose-receiver')} />
        <View style={styles.progressWrap}>
          <ProgressBar progress={0.3} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {receiver && <ReceiverCard receiver={receiver} />}

        <View style={styles.field}>
          <Text style={styles.label}>Purpose of transfer</Text>
          <Pressable style={styles.selectRow} onPress={() => setPurposePickerOpen(true)}>
            <Text style={purpose ? styles.selectValue : styles.placeholder}>{purpose ?? 'Select Purpose'}</Text>
            <Ionicons name="chevron-down" size={18} color="#7A8894" />
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Source of fund</Text>
          <Pressable style={styles.selectRow} onPress={() => setSourceOfFundPickerOpen(true)}>
            <Text style={sourceOfFund ? styles.selectValue : styles.placeholder}>
              {sourceOfFund ?? 'Select Source of Fund'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#7A8894" />
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Deposit Type</Text>
          <Pressable style={styles.selectRow} onPress={() => setDepositTypePickerOpen(true)}>
            <Text style={depositType ? styles.selectValue : styles.placeholder}>
              {depositType ?? 'Select Deposit Type'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#7A8894" />
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <GradientButton label="Next" onPress={handleNext} />
      </View>

      <OptionPickerModal
        visible={purposePickerOpen}
        title="Purpose of Transfer"
        options={transferPurposes}
        selectedOption={purpose}
        onClose={() => setPurposePickerOpen(false)}
        onSelect={setPurpose}
      />
      <OptionPickerModal
        visible={sourceOfFundPickerOpen}
        title="Source of Fund"
        options={sourceOfFunds}
        selectedOption={sourceOfFund}
        onClose={() => setSourceOfFundPickerOpen(false)}
        onSelect={setSourceOfFund}
      />
      <OptionPickerModal
        visible={depositTypePickerOpen}
        title="Deposit Type"
        options={depositTypes}
        selectedOption={depositType}
        onClose={() => setDepositTypePickerOpen(false)}
        onSelect={setDepositType}
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
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F7F9F8',
  },
});
