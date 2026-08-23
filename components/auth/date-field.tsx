import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type DateFieldProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
};

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function DateField({ label, value, onChange }: DateFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputRow} onPress={() => setOpen(true)}>
        <Text style={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : 'dd/mm/yyyy'}
        </Text>
        <Ionicons name="calendar-outline" size={18} color="#7A8894" />
      </Pressable>

      {open && (
        <DateTimePicker
          value={value ?? new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setOpen(Platform.OS === 'ios');
            if (event.type === 'set' && selectedDate) {
              onChange(selectedDate);
              if (Platform.OS !== 'ios') setOpen(false);
            } else if (Platform.OS !== 'ios') {
              setOpen(false);
            }
          }}
        />
      )}
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
});
