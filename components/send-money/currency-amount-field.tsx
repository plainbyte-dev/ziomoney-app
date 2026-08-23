import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Currency } from '@/lib/currencies';

import { CurrencyPickerModal } from './currency-picker-modal';

type CurrencyAmountFieldProps = {
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
  amount?: string;
  onChangeAmount?: (amount: string) => void;
  editable?: boolean;
  displayValue?: string;
};

export function CurrencyAmountField({
  currency,
  onChangeCurrency,
  amount,
  onChangeAmount,
  editable = true,
  displayValue,
}: CurrencyAmountFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.row}>
      <Pressable style={styles.currencyButton} onPress={() => setOpen(true)}>
        <Text style={styles.flag}>{currency.flag}</Text>
        <Text style={styles.code}>{currency.code}</Text>
        <Ionicons name="chevron-down" size={16} color="#7A8894" />
      </Pressable>

      <View style={styles.divider} />

      {editable ? (
        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#B7C2CB"
          style={styles.amountInput}
        />
      ) : (
        <Text style={styles.amountText}>{displayValue}</Text>
      )}

      <CurrencyPickerModal visible={open} onClose={() => setOpen(false)} onSelect={onChangeCurrency} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flag: {
    fontSize: 18,
  },
  code: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: '#E5E9EC',
    marginHorizontal: 14,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
    textAlign: 'right',
  },
  amountText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
    textAlign: 'right',
  },
});
