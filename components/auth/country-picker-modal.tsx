import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { type Country, countries } from '@/lib/countries';

type CountryPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  renderLabel: (country: Country) => string;
};

export function CountryPickerModal({ visible, onClose, onSelect, renderLabel }: CountryPickerModalProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((country) => country.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.searchRow}>
            <Ionicons name="search-outline" size={18} color="#7A8894" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search country"
              placeholderTextColor="#B7C2CB"
              style={styles.searchInput}
              autoCapitalize="none"
            />
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.iso2}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  setQuery('');
                }}>
                <Text style={styles.optionFlag}>{item.flag}</Text>
                <Text style={styles.optionText}>{renderLabel(item)}</Text>
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
    maxHeight: '70%',
    paddingTop: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F1F4F6',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A2B3C',
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
