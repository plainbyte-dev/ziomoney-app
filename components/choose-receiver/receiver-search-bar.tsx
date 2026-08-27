import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

type ReceiverSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function ReceiverSearchBar({ value, onChangeText }: ReceiverSearchBarProps) {
  return (
    <View style={styles.row}>
      <Ionicons name="search" size={18} color="#B7C2CB" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search receiver if already added."
        placeholderTextColor="#B7C2CB"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    color: '#1A2B3C',
  },
});
