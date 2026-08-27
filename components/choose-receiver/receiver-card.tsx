import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Receiver } from './receiver-data';

type ReceiverCardProps = {
  receiver: Receiver;
  onPress?: () => void;
};

export function ReceiverCard({ receiver, onPress }: ReceiverCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} disabled={!onPress}>
      <View style={styles.avatar}>
        <Text style={styles.flag}>{receiver.flag}</Text>
      </View>

      <View style={styles.textColumn}>
        <Text style={styles.name}>{receiver.name}</Text>
        <Text style={styles.method}>{receiver.method}</Text>
        <Text style={styles.account}>{receiver.maskedAccount}</Text>
      </View>

      {onPress && <Ionicons name="chevron-forward" size={18} color="#1A2B3C" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F3F5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flag: {
    fontSize: 22,
  },
  textColumn: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  method: {
    marginTop: 2,
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1C5FB6',
  },
  account: {
    marginTop: 2,
    fontSize: 12,
    color: '#7A8894',
  },
});
