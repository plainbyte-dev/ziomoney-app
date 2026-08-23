import { StyleSheet, Text, View } from 'react-native';

type OnboardingTextProps = {
  title: string;
  subtitle: string;
};

export function OnboardingText({ title, subtitle }: OnboardingTextProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A2B3C',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: '#7A8894',
    textAlign: 'center',
    lineHeight: 22,
  },
});
