import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SupportBannerProps = {
  onPress: () => void;
};

export function SupportBanner({ onPress }: SupportBannerProps) {
  return (
    <LinearGradient
      colors={['#1C5FB6', '#1AA80C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.subtitle}>Contact our global support team 24/7 for quick, secure assistance.</Text>

      <Pressable style={styles.linkRow} onPress={onPress} hitSlop={8}>
        <Text style={styles.linkLabel}>Contact Support</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.9)',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
