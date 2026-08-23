import { StyleSheet, Text, View } from 'react-native';

type ResendCodeProps = {
  secondsLeft: number;
  onResend: () => void;
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}.${secs}`;
}

export function ResendCode({ secondsLeft, onResend }: ResendCodeProps) {
  const canResend = secondsLeft <= 0;

  return (
    <View style={styles.container}>
      {!canResend && <Text style={styles.timer}>Resend a new code in {formatTime(secondsLeft)}</Text>}
      <Text style={styles.helper}>
        I didn&apos;t receive code.{' '}
        <Text
          style={[styles.link, !canResend && styles.linkDisabled]}
          onPress={canResend ? onResend : undefined}
          suppressHighlighting>
          Resend Code
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  timer: {
    fontSize: 13.5,
    color: '#7A8894',
  },
  helper: {
    fontSize: 13.5,
    color: '#3D4A54',
  },
  link: {
    color: '#1C5FB6',
    fontWeight: '700',
  },
  linkDisabled: {
    color: '#B7C2CB',
  },
});
