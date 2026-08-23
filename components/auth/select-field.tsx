import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type SelectFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
};

export function SelectField({ label, value, placeholder, options, onChange }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputRow} onPress={() => setOpen(true)}>
        <Text style={value ? styles.value : styles.placeholder}>{value || placeholder}</Text>
        <Ionicons name="chevron-down" size={18} color="#7A8894" />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}>
                  <Text style={[styles.optionText, item === value && styles.optionTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#3D4A54',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  value: {
    fontSize: 15,
    color: '#1A2B3C',
  },
  placeholder: {
    fontSize: 15,
    color: '#B7C2CB',
  },
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
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: '#1A2B3C',
  },
  optionTextActive: {
    fontWeight: '700',
    color: '#1C5FB6',
  },
});
