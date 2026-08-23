import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export type KycRequirement = {
  id: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
};

export const kycRequirements: KycRequirement[] = [
  {
    id: 'id',
    icon: 'card-outline',
    title: 'Government-issued ID',
    description: "Provide your driver's licence, my number card or resident card clearly displaying your photo.",
  },
  {
    id: 'selfie',
    icon: 'camera-outline',
    title: 'Take a selfie',
    description: 'Take a selfie to verify your identity.',
  },
];

type KycRequirementRowProps = {
  requirement: KycRequirement;
};

export function KycRequirementRow({ requirement }: KycRequirementRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={requirement.icon} size={20} color="#1C5FB6" />
      </View>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{requirement.title}</Text>
        <Text style={styles.description}>{requirement.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7F0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: '#7A8894',
    lineHeight: 19,
  },
});
