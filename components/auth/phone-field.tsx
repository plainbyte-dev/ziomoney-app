import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Country } from '@/lib/countries';

import { CountryPickerModal } from './country-picker-modal';

type PhoneFieldProps = {
  label: string;
  value: string;
  onChangeValue: (value: string) => void;
  country: Country;
  onChangeCountry: (country: Country) => void;
};

export function PhoneField({ label, value, onChangeValue, country, onChangeCountry }: PhoneFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Pressable style={styles.countryButton} onPress={() => setOpen(true)}>
          <Text style={styles.flag}>{country.flag}</Text>
          <Ionicons name="chevron-down" size={16} color="#7A8894" />
        </Pressable>

        <View style={styles.divider} />

        <TextInput
          value={value}
          onChangeText={onChangeValue}
          placeholder={`${country.dialCode} 90-1234-5678`}
          placeholderTextColor="#B7C2CB"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <CountryPickerModal
        visible={open}
        onClose={() => setOpen(false)}
        onSelect={(selected) => {
          onChangeCountry(selected);
          setOpen(false);
        }}
        renderLabel={(item) => `${item.name} (${item.dialCode})`}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flag: {
    fontSize: 18,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E9EC',
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A2B3C',
  },
});
