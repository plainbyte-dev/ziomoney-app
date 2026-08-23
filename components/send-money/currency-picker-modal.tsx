import { FlatList, Modal, Pressable, StyleSheet, Text } from 'react-native';

import { currencies, type Currency } from '@/lib/currencies';

type CurrencyPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
};

export function CurrencyPickerModal({ visible, onClose, onSelect }: CurrencyPickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <FlatList
            data={currencies}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={styles.optionFlag}>{item.flag}</Text>
                <Text style={styles.optionText}>
                  {item.code} — {item.name}
                </Text>
              </Pressable>
            )}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  optionFlag: {
    fontSize: 20,
  },
  optionText: {
    fontSize: 15,
    color: '#1A2B3C',
  },
});
