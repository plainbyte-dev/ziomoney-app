import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export type PasswordRule = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  { id: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { id: 'upper', label: 'At least 1 upper case letter', test: (p) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'At least 1 lower case letter', test: (p) => /[a-z]/.test(p) },
  { id: 'digit', label: 'At least 1 digit', test: (p) => /[0-9]/.test(p) },
];

type PasswordChecklistProps = {
  password: string;
};

export function PasswordChecklist({ password }: PasswordChecklistProps) {
  return (
    <View style={styles.container}>
      {passwordRules.map((rule) => {
        const met = rule.test(password);
        return (
          <View key={rule.id} style={styles.row}>
            <View style={[styles.badge, met && styles.badgeMet]}>
              {met && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
            </View>
            <Text style={[styles.label, met && styles.labelMet]}>{rule.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function isPasswordValid(password: string) {
  return passwordRules.every((rule) => rule.test(password));
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#B7C2CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeMet: {
    backgroundColor: '#1AA80C',
    borderColor: '#1AA80C',
  },
  label: {
    fontSize: 13.5,
    color: '#7A8894',
  },
  labelMet: {
    color: '#1A2B3C',
    fontWeight: '600',
  },
});
