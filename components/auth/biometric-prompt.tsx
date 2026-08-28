import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { isBiometricEnabled } from '@/lib/auth-storage';

type BiometricPromptProps = {
  onSuccess: () => void;
};

export function BiometricPrompt({ onSuccess }: BiometricPromptProps) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const enabled = await isBiometricEnabled();
      setAvailable(hasHardware && isEnrolled && enabled);
    })();
  }, []);

  if (!available) {
    return null;
  }

  const handlePress = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: Platform.OS === 'ios' ? 'Log in with Face ID' : 'Log in with fingerprint',
    });
    if (result.success) {
      onSuccess();
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.button} hitSlop={12}>
      <MaterialCommunityIcons
        name={Platform.OS === 'ios' ? 'face-recognition' : 'fingerprint'}
        size={44}
        color="#1C5FB6"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginTop: 24,
  },
});
