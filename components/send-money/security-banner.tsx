import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export function SecurityBanner() {
  return (
    <View style={styles.banner}>
      <Ionicons name="shield-checkmark" size={18} color="#1AA80C" />
      <Text style={styles.text}>Your transfer is protected with bank-grade security</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#DFF3DA',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  text: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1A6B1A',
  },
});
