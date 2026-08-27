import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type Requirement = {
  label: string;
  met: boolean;
};

type PasswordRequirementsProps = {
  password: string;
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements: Requirement[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one number', met: /[0-9]/.test(password) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>REQUIREMENTS</Text>
      <View style={styles.list}>
        {requirements.map((requirement) => (
          <View key={requirement.label} style={styles.row}>
            <Ionicons
              name={requirement.met ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color={requirement.met ? '#1AA80C' : '#B7C2CB'}
            />
            <Text style={[styles.label, requirement.met && styles.labelMet]}>{requirement.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A97A0',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: '#B7C2CB',
  },
  labelMet: {
    color: '#1A2B3C',
    fontWeight: '600',
  },
});
