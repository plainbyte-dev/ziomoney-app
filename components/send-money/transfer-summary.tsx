import { StyleSheet, Text, View } from 'react-native';

type TransferSummaryProps = {
  fee: number;
  fromCode: string;
  toCode: string;
  rate: number;
  convertedAmount: number;
};

export function TransferSummary({ fee, fromCode, toCode, rate, convertedAmount }: TransferSummaryProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Transfer Fee</Text>
        <Text style={styles.value}>
          ${fee.toFixed(2)} {fromCode}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Exchange Rate</Text>
        <Text style={styles.value}>
          1 {fromCode} = {rate.toFixed(4)} {toCode}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>We Convert</Text>
        <Text style={styles.value}>
          ${convertedAmount.toFixed(2)} {fromCode}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E7F0FC',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13.5,
    color: '#3D4A54',
  },
  value: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
});
