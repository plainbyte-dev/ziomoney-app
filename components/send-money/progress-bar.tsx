import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.track}>
      <LinearGradient
        colors={['#1C5FB6', '#1AA80C']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.fill, { width: `${clamped * 100}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E9EC',
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
