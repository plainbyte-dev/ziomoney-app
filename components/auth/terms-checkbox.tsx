import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TermsCheckboxProps = {
  checked: boolean;
  onToggle: () => void;
};

export function TermsCheckbox({ checked, onToggle }: TermsCheckboxProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        style={[styles.checkbox, checked && styles.checkboxChecked]}
        hitSlop={8}>
        {checked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
      </Pressable>
      <Text style={styles.text}>
        I agree to the <Text style={styles.link}>Terms and Conditions</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#B7C2CB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#1C5FB6',
    borderColor: '#1C5FB6',
  },
  text: {
    flex: 1,
    fontSize: 13.5,
    color: '#3D4A54',
    lineHeight: 20,
  },
  link: {
    color: '#1C5FB6',
    fontWeight: '600',
  },
});
