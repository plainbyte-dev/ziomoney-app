import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { GradientButton } from '@/components/gradient-button';
import { CurrencyAmountField } from '@/components/send-money/currency-amount-field';
import { DeliveryMethodCard } from '@/components/send-money/delivery-method-card';
import { RecipientCard } from '@/components/send-money/recipient-card';
import { SecurityBanner } from '@/components/send-money/security-banner';
import { defaultRecipient, deliveryMethods } from '@/components/send-money/send-money-data';
import { SupportedCountriesFooter } from '@/components/send-money/supported-countries-footer';
import { TransferSummary } from '@/components/send-money/transfer-summary';
import { currencies } from '@/lib/currencies';

export default function SendMoneyScreen() {
  const insets = useSafeAreaInsets();
  const [methodId, setMethodId] = useState(deliveryMethods[0].id);
  const [sendAmount, setSendAmount] = useState('1000.00');
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState(currencies[1]);

  const method = deliveryMethods.find((m) => m.id === methodId) ?? deliveryMethods[0];
  const amountValue = parseFloat(sendAmount) || 0;
  const convertedAmount = Math.max(amountValue - method.fee, 0);
  const rate = receiveCurrency.rateFromUsd / sendCurrency.rateFromUsd;
  const recipientGets = convertedAmount * rate;

  const availableBalance = useMemo(() => 12450.75, []);

  const handleContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled">
        <AuthHeader title="Send Money" />

        <Text style={styles.sectionTitle}>Delivery Method</Text>
        <View style={styles.section}>
          {deliveryMethods.map((item) => (
            <DeliveryMethodCard
              key={item.id}
              method={item}
              selected={item.id === methodId}
              onSelect={() => setMethodId(item.id)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recipient</Text>
        <View style={styles.section}>
          <RecipientCard recipient={defaultRecipient} />
          <Text style={styles.addRecipient} onPress={() => router.push('/(tabs)/recipients')}>
            + Add New Recipient
          </Text>
        </View>

        <Text style={styles.sectionTitle}>You Send</Text>
        <View style={styles.section}>
          <CurrencyAmountField
            currency={sendCurrency}
            onChangeCurrency={setSendCurrency}
            amount={sendAmount}
            onChangeAmount={setSendAmount}
          />
          <Text style={styles.balanceHint}>Available Balance: ${availableBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <TransferSummary
            fee={method.fee}
            fromCode={sendCurrency.code}
            toCode={receiveCurrency.code}
            rate={rate}
            convertedAmount={convertedAmount}
          />
        </View>

        <Text style={styles.sectionTitle}>Recipient Gets</Text>
        <View style={styles.section}>
          <CurrencyAmountField
            currency={receiveCurrency}
            onChangeCurrency={setReceiveCurrency}
            editable={false}
            displayValue={recipientGets.toFixed(2)}
          />
          <Text style={styles.balanceHint}>Exchange rate guaranteed for 2 hours</Text>
        </View>

        <View style={styles.section}>
          <SecurityBanner />
        </View>

        <GradientButton label="Continue to Confirm" onPress={handleContinue} />

        <SupportedCountriesFooter />
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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A2B3C',
    marginTop: 24,
    marginBottom: 12,
  },
  section: {
    gap: 10,
  },
  addRecipient: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C5FB6',
    textAlign: 'center',
    paddingVertical: 4,
  },
  balanceHint: {
    fontSize: 12.5,
    color: '#7A8894',
  },
});
