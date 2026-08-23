import { StyleSheet, View } from 'react-native';

import { recentTransactions } from './dashboard-data';
import { SectionHeader } from './section-header';
import { TransactionRow } from './transaction-row';

export function TransactionsSection() {
  return (
    <View style={styles.container}>
      <SectionHeader title="Recent Transactions" />
      {recentTransactions.map((transaction) => (
        <TransactionRow key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
});
