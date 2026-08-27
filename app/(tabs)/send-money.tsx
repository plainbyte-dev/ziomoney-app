import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { resetSendFlowData, sendFlowData } from '@/components/choose-receiver/send-flow-store';
import { GradientButton } from '@/components/gradient-button';
import { AmountExchangeCard } from '@/components/send-money/amount-exchange-card';
import { CampaignCodeRow } from '@/components/send-money/campaign-code-row';
import { CountryPickerModal } from '@/components/send-money/country-picker-modal';
import { MethodPickerModal } from '@/components/send-money/method-picker-modal';
import { PointsBanner } from '@/components/send-money/points-banner';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { RewardPointsRow } from '@/components/send-money/reward-points-row';
import { SelectorRow } from '@/components/send-money/selector-row';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';
import {
  availableRewardPoints,
  campaignCodeSavings,
  pointValueUsd,
  receivingCountries,
  receivingMethods,
  totalRewardPoints,
  validCampaignCodes,
} from '@/components/send-money/send-money-data';
import { currencies } from '@/lib/currencies';

export default function SendMoneyScreen() {
  const insets = useSafeAreaInsets();

  const [country, setCountry] = useState(receivingCountries[0]);
  const [methodId, setMethodId] = useState(receivingMethods[0].id);
  const [sendAmount, setSendAmount] = useState('');
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [methodPickerOpen, setMethodPickerOpen] = useState(false);
  const [campaignCode, setCampaignCode] = useState<string | null>(null);
  const [redeemedPoints, setRedeemedPoints] = useState(0);

  const sendCurrency = useMemo(
    () => currencies.find((c) => c.code === 'JPY') ?? currencies[0],
    [],
  );
  const receiveCurrency = useMemo(
    () => currencies.find((c) => c.code === country.currencyCode) ?? currencies[0],
    [country],
  );
  const method = receivingMethods.find((m) => m.id === methodId) ?? receivingMethods[0];

  const pointsDiscount = Math.min(method.fee, redeemedPoints * pointValueUsd);
  const fee = Math.max(method.fee - pointsDiscount, 0);
  const campaignDiscount = campaignCode ? campaignCodeSavings : 0;

  const amountValue = parseFloat(sendAmount) || 0;
  const convertedAmount = Math.max(amountValue - fee + campaignDiscount, 0);
  const rate = receiveCurrency.rateFromUsd / sendCurrency.rateFromUsd;
  const recipientGets = convertedAmount * rate;

  const handleNext = () => {
    resetSendFlowData();
    sendFlowData.sendAmount = amountValue;
    sendFlowData.sendCurrencyCode = sendCurrency.code;
    sendFlowData.receiveCurrencyCode = receiveCurrency.code;
    sendFlowData.rate = rate;
    sendFlowData.transferFee = fee;
    sendFlowData.couponDiscount = campaignDiscount;
    sendFlowData.recipientGets = recipientGets;
    router.push('/choose-receiver');
  };

  const handleApplyCampaignCode = (code: string) => {
    const isValid = validCampaignCodes.includes(code.toUpperCase());
    if (isValid) {
      setCampaignCode(code.toUpperCase());
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Send Money" onBack={() => router.push('/(tabs)')} />
        <View style={styles.progressWrap}>
          <ProgressBar progress={0.2} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled">
          <PointsBanner points={totalRewardPoints} />

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

          <View style={styles.section}>
            <AmountExchangeCard
              sendCurrencyCode={sendCurrency.code}
              sendAmount={sendAmount}
              onChangeSendAmount={setSendAmount}
              receiveCurrencyCode={receiveCurrency.code}
              recipientGets={recipientGets ? recipientGets.toFixed(2) : '0000000'}
              fee={fee}
              rate={rate}
              convertedAmount={convertedAmount}
            />
          </View>

          <Text style={styles.sectionTitle}>Apply Code</Text>
          <View style={styles.section}>
            <CampaignCodeRow
              appliedCode={campaignCode}
              savings={campaignCodeSavings}
              onApply={handleApplyCampaignCode}
              onRemove={() => setCampaignCode(null)}
            />
            <RewardPointsRow
              availablePoints={availableRewardPoints}
              redeemedPoints={redeemedPoints}
              savings={pointsDiscount}
              pointValueUsd={pointValueUsd}
              onApply={setRedeemedPoints}
              onRemove={() => setRedeemedPoints(0)}
            />
          </View>

          <View style={styles.nextButtonWrap}>
            <GradientButton label="Next" onPress={handleNext} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
  flex: {
    flex: 1,
  },
  progressWrap: {
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginTop: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A2B3C',
    marginTop: 24,
    marginBottom: 4,
  },
  nextButtonWrap: {
    marginTop: 28,
  },
});
