import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { supportedCountryFlags } from './send-money-data';

export function SupportedCountriesFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>We support transfers to 200+ countries</Text>

      <View style={styles.flagsRow}>
        {supportedCountryFlags.map((flag, index) => (
          <Text key={index} style={styles.flag}>
            {flag}
          </Text>
        ))}
        <View style={styles.moreBadge}>
          <Text style={styles.moreBadgeText}>199+</Text>
        </View>
      </View>

      <View style={styles.trustRow}>
        <View style={styles.trustBadge}>
          <Ionicons name="lock-closed-outline" size={12} color="#7A8894" />
          <Text style={styles.trustText}>PCI DSS COMPLIANT</Text>
        </View>
        <View style={styles.trustBadge}>
          <Ionicons name="shield-checkmark-outline" size={12} color="#7A8894" />
          <Text style={styles.trustText}>SSL SECURED</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 12.5,
    color: '#7A8894',
  },
  flagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  flag: {
    fontSize: 22,
  },
  moreBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E9EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3D4A54',
  },
  trustRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  trustText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7A8894',
  },
});
