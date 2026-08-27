import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={[styles.logoText, styles.zio]}>Zio</Text>
        <Text style={[styles.logoText, styles.money]}>Money</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingRight: 12,
  },
  logoText: {
    fontSize: 46,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -0.5,
    lineHeight: 56,
  },
  zio: {
    color: '#2E6DA4',
  },
  money: {
    color: '#6EBE44',
  },
});
