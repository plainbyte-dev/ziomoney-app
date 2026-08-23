import { StyleSheet, Text } from 'react-native';

type OnboardingLoginPromptProps = {
  onPress: () => void;
};

export function OnboardingLoginPrompt({ onPress }: OnboardingLoginPromptProps) {
  return (
    <Text style={styles.text}>
      Already have an account?{' '}
      <Text style={styles.link} onPress={onPress} suppressHighlighting>
        Log in
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    color: '#7A8894',
  },
  link: {
    color: '#3FA050',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
