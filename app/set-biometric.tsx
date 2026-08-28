import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { GradientButton } from '@/components/gradient-button';
import { isBiometricEnabled, setBiometricEnabled } from '@/lib/auth-storage';

const biometricLabel = Platform.OS === 'ios' ? 'Face ID' : 'fingerprint';

export default function SetBiometricScreen() {
  const insets = useSafeAreaInsets();
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setAvailable(hasHardware && isEnrolled);
      setEnabled(await isBiometricEnabled());
    })();
  }, []);

  const finish = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleTurnOff = async () => {
    await setBiometricEnabled(false);
    finish();
  };

  const handleSetup = async () => {
    if (!available) {
      finish();
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: `Enable ${biometricLabel} login`,
    });

    if (result.success) {
      await setBiometricEnabled(true);
    }

    finish();
  };

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }]}>
      <AuthHeader title="Set Biometric" />

      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons
          name={Platform.OS === 'ios' ? 'face-recognition' : 'fingerprint'}
          size={64}
          color="#1C5FB6"
        />
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>
          {enabled
            ? `${biometricLabel} login is on`
            : `Make signing in faster with ${biometricLabel}?`}
        </Text>
        <Text style={styles.subtitle}>
          {enabled
            ? `Turn off to go back to signing in with your password.`
            : `Authenticate using app ${biometricLabel} instead of entering your password.`}
        </Text>
      </View>

      <View style={styles.footer}>
        {enabled ? (
          <GradientButton
            label="Turn Off Biometric"
            colors={['#E24C4C', '#B7791F']}
            onPress={handleTurnOff}
          />
        ) : (
          <GradientButton label="Set Up Biometric" onPress={handleSetup} />
        )}
        <Pressable onPress={finish} hitSlop={8}>
          <Text style={styles.notNow}>Not Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    alignSelf: 'center',
    marginTop: 32,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAF2FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7A8894',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 16,
  },
  notNow: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C5FB6',
  },
});
