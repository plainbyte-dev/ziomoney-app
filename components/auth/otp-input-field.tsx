import { useRef } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { OtpBoxes } from './otp-boxes';

const OTP_LENGTH = 6;

type OtpInputFieldProps = {
  code: string;
  onChangeCode: (code: string) => void;
};

export function OtpInputField({ code, onChangeCode }: OtpInputFieldProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()} style={styles.wrapper}>
      <OtpBoxes code={code} />
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={(text) => onChangeCode(text.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH))}
        keyboardType="number-pad"
        maxLength={OTP_LENGTH}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});
