import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';

import type { ReceivingMethod } from './send-money-data';
import { receivingMethods } from './send-money-data';

type MethodPickerModalProps = {
  visible: boolean;
  selectedMethodId: string;
  onClose: () => void;
  onSelect: (method: ReceivingMethod) => void;
};

export function MethodPickerModal({ visible, selectedMethodId, onClose, onSelect }: MethodPickerModalProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>Select Receiving Method</Text>

      <View style={styles.list}>
        {receivingMethods.map((item) => {
          const selected = item.id === selectedMethodId;
          return (
            <Pressable
              key={item.id}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={18} color="#1C5FB6" />
              </View>
              <View style={styles.textColumn}>
                <Text style={styles.optionText}>{item.label}</Text>
                <Text style={styles.optionSubtext}>{item.description}</Text>
              </View>
              <Text style={styles.fee}>${item.fee.toFixed(2)}</Text>
              <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                {selected && <View style={styles.radioInner} />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B3C',
    marginTop: 14,
    marginBottom: 18,
  },
  list: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: '#E7F0FC',
    borderColor: '#1C5FB6',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  optionSubtext: {
    marginTop: 2,
    fontSize: 12.5,
    color: '#7A8894',
  },
  fee: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
    marginRight: 4,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#B7C2CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#1C5FB6',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1C5FB6',
  },
});
