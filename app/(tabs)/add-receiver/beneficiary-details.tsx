import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { addReceiverData } from '@/components/add-receiver/add-receiver-store';
import { FraudBanner } from '@/components/add-receiver/fraud-banner';
import { OptionPickerModal } from '@/components/add-receiver/option-picker-modal';
import { payoutLocations } from '@/components/add-receiver/payout-location-data';
import { GradientButton } from '@/components/gradient-button';
import { OutlineButton } from '@/components/outline-button';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';

export default function BeneficiaryDetailsScreen() {
  const insets = useSafeAreaInsets();

  const [payoutLocation, setPayoutLocation] = useState<string | null>(addReceiverData.payoutLocation);
  const [payoutLocationPickerOpen, setPayoutLocationPickerOpen] = useState(false);

  const handlePrev = () => {
    router.push('/add-receiver/receiving-country');
  };

  const handleNext = () => {
    addReceiverData.payoutLocation = payoutLocation;
    router.push('/add-receiver/personal-details');
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Beneficiary Details" onBack={handlePrev} />
        <View style={styles.progressWrap}>
          <ProgressBar progress={0.6} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FraudBanner />

        <View style={styles.field}>
          <Text style={styles.label}>Payout Location</Text>
          <Pressable style={styles.selectRow} onPress={() => setPayoutLocationPickerOpen(true)}>
            <Text style={payoutLocation ? styles.selectValue : styles.placeholder}>
              {payoutLocation ?? 'Payout Location'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#7A8894" />
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerButton}>
          <OutlineButton label="Prev" onPress={handlePrev} />
        </View>
        <View style={styles.footerButton}>
          <GradientButton label="Next" onPress={handleNext} />
        </View>
      </View>

      <OptionPickerModal
        visible={payoutLocationPickerOpen}
        title="Payout Location"
        options={payoutLocations}
        selectedOption={payoutLocation}
        onClose={() => setPayoutLocationPickerOpen(false)}
        onSelect={setPayoutLocation}
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
