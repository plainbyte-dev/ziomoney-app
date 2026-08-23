import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

type StepProgressBarProps = {
  progress: number;
};

export function StepProgressBar({ progress }: StepProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));

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
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
