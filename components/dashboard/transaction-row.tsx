import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { Transaction } from './dashboard-data';

type TransactionRowProps = {
  transaction: Transaction;
};

export function TransactionRow({ transaction }: TransactionRowProps) {
  const isExchange = transaction.direction === 'exchange';
  const amountSign = transaction.direction === 'in' ? '+' : '-';
  const amountColor = transaction.direction === 'in' ? '#1AA80C' : '#1A2B3C';

  return (
    <View style={styles.row}>
      <View style={styles.avatarWrapper}>
        {isExchange ? (
          <View style={[styles.avatar, styles.exchangeAvatar]}>
            <Ionicons name="swap-horizontal-outline" size={20} color="#1C5FB6" />
          </View>
        ) : (
          <View style={[styles.avatar, { backgroundColor: transaction.avatarColor }]}>
            <Text style={styles.initials}>{transaction.initials}</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{transaction.name}</Text>
        <Text style={styles.location}>
          {transaction.flag ? `${transaction.flag} ` : ''}
          {transaction.location}
        </Text>
      </View>

      <View style={styles.amountColumn}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountSign}${transaction.amount.toFixed(2)}
        </Text>
        <Text style={styles.status}>{transaction.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exchangeAvatar: {
    backgroundColor: '#E7F0FC',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#1A2B3C',
  },
  location: {
    marginTop: 2,
    fontSize: 12.5,
    color: '#7A8894',
  },
  amountColumn: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  status: {
    marginTop: 2,
    fontSize: 12,
    color: '#1AA80C',
  },
});
