import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';

type OptionPickerModalProps = {
  visible: boolean;
  title: string;
  options: string[];
  selectedOption?: string | null;
  onClose: () => void;
  onSelect: (option: string) => void;
};

export function OptionPickerModal({
  visible,
  title,
  options,
  selectedOption,
  onClose,
  onSelect,
}: OptionPickerModalProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => option.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#B7C2CB" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={`Search ${title.toLowerCase()}`}
          placeholderTextColor="#B7C2CB"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.list}>
        {filtered.map((option) => {
          const selected = option === selectedOption;
          return (
            <Pressable
              key={option}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                setQuery('');
                onClose();
              }}>
              <Text style={styles.optionText}>{option}</Text>
              {selected && (
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
              )}
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
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E9EC',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    color: '#1A2B3C',
  },
  list: {
    gap: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F5',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1AA80C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
