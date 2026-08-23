import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Recipient } from './send-money-data';

type RecipientCardProps = {
  recipient: Recipient;
  onPress?: () => void;
};

export function RecipientCard({ recipient, onPress }: RecipientCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: recipient.avatarColor }]}>
        <Text style={styles.initials}>{recipient.initials}</Text>
      </View>

      <View style={styles.textColumn}>
        <Text style={styles.name}>{recipient.name}</Text>
        <Text style={styles.details}>
          {recipient.country} • {recipient.maskedAccount}
        </Text>
      </View>

      <Ionicons name="chevron-down" size={18} color="#7A8894" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  textColumn: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  details: {
    marginTop: 2,
    fontSize: 12.5,
    color: '#7A8894',
  },
});
