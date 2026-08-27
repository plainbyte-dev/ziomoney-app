import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type KycStatusCardProps = {
  verified: boolean;
  completedOn?: string;
  onVerifyNow?: () => void;
};

export function KycStatusCard({ verified, completedOn, onVerifyNow }: KycStatusCardProps) {
  if (verified) {
    return (
      <View style={styles.card}>
        <Ionicons name="document-text-outline" size={20} color="#1C5FB6" />
        <View style={styles.textColumn}>
          <Text style={styles.title}>KYC Verified</Text>
          <Text style={styles.value}>Completed on: {completedOn}</Text>
        </View>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
      </View>
    );
  }

  return (
    <Pressable style={styles.card} onPress={onVerifyNow}>
      <Ionicons name="document-text-outline" size={20} color="#E2A03F" />
      <View style={styles.textColumn}>
        <Text style={[styles.title, styles.titleWarning]}>KYC Not Verified</Text>
        <Text style={styles.value}>Complete your KYC to unlock all features</Text>
      </View>
      <View style={styles.warnCircle}>
        <Ionicons name="alert" size={14} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 12.5,
    color: '#7A8894',
  },
  titleWarning: {
    color: '#B7791F',
  },
  value: {
    marginTop: 2,
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1AA80C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warnCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E2A03F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
