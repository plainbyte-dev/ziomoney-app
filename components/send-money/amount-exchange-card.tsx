import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type AmountExchangeCardProps = {
  sendCurrencyCode: string;
  sendAmount: string;
  onChangeSendAmount: (value: string) => void;
  receiveCurrencyCode: string;
  recipientGets: string;
  fee: number;
  rate: number;
  convertedAmount: number;
};

export function AmountExchangeCard({
  sendCurrencyCode,
  sendAmount,
  onChangeSendAmount,
  receiveCurrencyCode,
  recipientGets,
  fee,
  rate,
  convertedAmount,
}: AmountExchangeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.amountsRow}>
        <View style={styles.amountColumn}>
          <View style={styles.amountLabelRow}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.currencyTag}>{sendCurrencyCode}</Text>
          </View>
          <TextInput
            value={sendAmount}
            onChangeText={onChangeSendAmount}
            keyboardType="decimal-pad"
            placeholder="0000.0"
            placeholderTextColor="#B7C2CB"
            style={styles.amountInput}
          />
        </View>

        <View style={styles.swapCircle}>
          <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
        </View>

        <View style={[styles.amountColumn, styles.amountColumnRight]}>
          <View style={[styles.amountLabelRow, styles.amountLabelRowRight]}>
            <Text style={styles.amountLabel}>Recipient Gets</Text>
            <Text style={styles.currencyTag}>{receiveCurrencyCode}</Text>
          </View>
          <Text style={[styles.amountInput, styles.amountValueRight]}>{recipientGets}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Transfer Fee</Text>
        <Text style={styles.detailValue}>
          ${fee.toFixed(2)} {sendCurrencyCode}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Exchange Rate</Text>
        <Text style={styles.detailValue}>
          1 {sendCurrencyCode} = {rate.toFixed(4)} {receiveCurrencyCode}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>We Convert</Text>
        <Text style={styles.detailValue}>
          ${convertedAmount.toFixed(2)} {sendCurrencyCode}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  amountsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountColumn: {
    flex: 1,
  },
  amountColumnRight: {
    alignItems: 'flex-end',
  },
  amountLabelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  amountLabelRowRight: {
    justifyContent: 'flex-end',
  },
  amountLabel: {
    fontSize: 12.5,
    color: '#7A8894',
  },
  currencyTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1C5FB6',
  },
  amountInput: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  amountValueRight: {
    textAlign: 'right',
  },
  swapCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1AA80C',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E9EC',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13.5,
    color: '#7A8894',
  },
  detailValue: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
});
