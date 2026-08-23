import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { DeliveryMethod } from './send-money-data';

type DeliveryMethodCardProps = {
  method: DeliveryMethod;
  selected: boolean;
  onSelect: () => void;
};

export function DeliveryMethodCard({ method, selected, onSelect }: DeliveryMethodCardProps) {
  return (
    <Pressable style={[styles.card, selected && styles.cardSelected]} onPress={onSelect}>
      <View style={styles.iconCircle}>
        <Ionicons name={method.icon} size={20} color="#1C5FB6" />
      </View>

      <View style={styles.textColumn}>
        <Text style={styles.label}>{method.label}</Text>
        <Text style={styles.description}>{method.description}</Text>
      </View>

      <Text style={styles.fee}>${method.fee.toFixed(2)}</Text>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
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
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    padding: 14,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: '#1C5FB6',
    backgroundColor: '#E7F0FC',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7F0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  description: {
    marginTop: 2,
    fontSize: 12.5,
    color: '#7A8894',
  },
  fee: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
    marginRight: 4,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#B7C2CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#1C5FB6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1C5FB6',
  },
});
