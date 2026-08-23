import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F7F9F8',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7A8894',
  },
});
