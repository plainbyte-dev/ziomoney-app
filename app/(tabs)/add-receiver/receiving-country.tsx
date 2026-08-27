import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { addReceiverData } from '@/components/add-receiver/add-receiver-store';
import { FraudBanner } from '@/components/add-receiver/fraud-banner';
import { GradientButton } from '@/components/gradient-button';
import { CountryPickerModal } from '@/components/send-money/country-picker-modal';
import { MethodPickerModal } from '@/components/send-money/method-picker-modal';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { receivingCountries, receivingMethods } from '@/components/send-money/send-money-data';
import { SelectorRow } from '@/components/send-money/selector-row';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';
import { currencies } from '@/lib/currencies';

export default function ReceivingCountryScreen() {
  const insets = useSafeAreaInsets();

  const [country, setCountry] = useState(receivingCountries[0]);
  const [methodId, setMethodId] = useState(receivingMethods[0].id);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [methodPickerOpen, setMethodPickerOpen] = useState(false);

  const receiveCurrency = currencies.find((c) => c.code === country.currencyCode) ?? currencies[0];
  const method = receivingMethods.find((m) => m.id === methodId) ?? receivingMethods[0];

  const handleNext = () => {
    addReceiverData.countryName = country.name;
    addReceiverData.countryFlag = country.flag;
    addReceiverData.currencyCode = receiveCurrency.code;
    addReceiverData.methodId = methodId;
    addReceiverData.methodLabel = method.label;

    if (methodId === 'wallet') {
      router.push('/add-receiver/wallet-details');
    } else if (methodId === 'cash') {
      router.push('/add-receiver/cash-pickup-details');
    } else {
      router.push('/add-receiver/bank-details');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Receiving Country" />
        <View style={styles.progressWrap}>
          <ProgressBar progress={0.2} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FraudBanner />

        <View style={styles.section}>
          <SelectorRow
            label="Receiving Country"
            icon="flag-outline"
            emoji={country.flag}
            value={country.name}
            onPress={() => setCountryPickerOpen(true)}
          />
        </View>

        <View style={styles.section}>
          <SelectorRow
            label="Receiving Method"
            icon={method.icon}
            value={`${method.label} - ${receiveCurrency.code}`}
            onPress={() => setMethodPickerOpen(true)}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <GradientButton label="Next" onPress={handleNext} />
      </View>

      <CountryPickerModal
        visible={countryPickerOpen}
        onClose={() => setCountryPickerOpen(false)}
        onSelect={setCountry}
      />
      <MethodPickerModal
        visible={methodPickerOpen}
        selectedMethodId={methodId}
        onClose={() => setMethodPickerOpen(false)}
        onSelect={(selected) => setMethodId(selected.id)}
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
  section: {
    gap: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F7F9F8',
  },
});
