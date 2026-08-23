import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type AuthTextFieldProps = TextInputProps & {
  label: string;
  secure?: boolean;
};

export function AuthTextField({ label, secure, ...inputProps }: AuthTextFieldProps) {
  const [hidden, setHidden] = useState(secure);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          {...inputProps}
          secureTextEntry={hidden}
          placeholderTextColor="#B7C2CB"
          style={styles.input}
        />
        {secure && (
          <Pressable onPress={() => setHidden((prev) => !prev)} hitSlop={8}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color="#7A8894" />
          </Pressable>
        )}
      </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A2B3C',
  },
});
