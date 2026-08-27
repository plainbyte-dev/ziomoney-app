import { FlatList, Modal, Pressable, StyleSheet, Text } from 'react-native';

import type { ReceivingCountry } from './send-money-data';
import { receivingCountries } from './send-money-data';

type CountryPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: ReceivingCountry) => void;
};

export function CountryPickerModal({ visible, onClose, onSelect }: CountryPickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <FlatList
            data={receivingCountries}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={styles.optionFlag}>{item.flag}</Text>
                <Text style={styles.optionText}>
                  {item.name} · {item.currencyCode}
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
