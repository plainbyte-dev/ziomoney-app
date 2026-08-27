import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PointsBannerProps = {
  points: number;
};

export function PointsBanner({ points }: PointsBannerProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <LinearGradient
      colors={['#1C5FB6', '#1AA80C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="gift" size={20} color="#FFFFFF" />
      </View>

      <View style={styles.textColumn}>
        <Text style={styles.label}>Total Current Points</Text>
        <Text style={styles.value}>{hidden ? '•••••' : points.toLocaleString('en-US')}</Text>
      </View>

      <Pressable onPress={() => setHidden((prev) => !prev)} hitSlop={8}>
        <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color="#FFFFFF" />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 18,
    padding: 16,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  value: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
});
