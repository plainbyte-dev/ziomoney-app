import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BalanceActionButton } from './balance-action-button';

type BalanceCardProps = {
  balance: number;
  currency?: string;
  convertedAmount: string;
};

export function BalanceCard({ balance, currency = '$', convertedAmount }: BalanceCardProps) {
  const [hidden, setHidden] = useState(false);
  const [whole, fraction] = balance.toFixed(2).split('.');
  const formattedWhole = Number(whole).toLocaleString('en-US');

  return (
    <LinearGradient
      colors={['#1C5FB6', '#1AA80C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <View style={styles.balanceLabelRow}>
        <Text style={styles.label}>Total Balance</Text>
        <Pressable onPress={() => setHidden((prev) => !prev)} hitSlop={8}>
          <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={16} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.amount}>
          {hidden ? '•••••' : (
            <>
              {currency} {formattedWhole}
              <Text style={styles.amountFraction}>.{fraction}</Text>
            </>
          )}
        </Text>
      </View>

      <Text style={styles.converted}>{hidden ? '•••••' : `≈ ${convertedAmount}`}</Text>

      <View style={styles.actionsRow}>
        <BalanceActionButton label="Add Money" icon="add" />
        <BalanceActionButton
          label="Send Money"
          icon="arrow-up-outline"
          onPress={() => router.push('/send-money')}
        />
        <BalanceActionButton label="Exchange Rate" icon="swap-horizontal-outline" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  amountRow: {
    marginTop: 8,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
  },
  amountFraction: {
    fontSize: 20,
    fontWeight: '700',
  },
  converted: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 8,
  },
});
