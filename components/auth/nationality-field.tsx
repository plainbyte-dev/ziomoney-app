import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CountryPickerModal } from './country-picker-modal';

type NationalityFieldProps = {
  label: string;
  value: string;
  onChange: (nationality: string) => void;
};

export function NationalityField({ label, value, onChange }: NationalityFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputRow} onPress={() => setOpen(true)}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color="#7A8894" />
      </Pressable>

      <CountryPickerModal
        visible={open}
        onClose={() => setOpen(false)}
        onSelect={(country) => {
          onChange(country.name);
          setOpen(false);
        }}
        renderLabel={(item) => item.name}
      />
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
});
