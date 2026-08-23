import { StyleSheet, Text, View } from 'react-native';

const OTP_LENGTH = 6;

type OtpBoxesProps = {
  code: string;
};

export function OtpBoxes({ code }: OtpBoxesProps) {
  const activeIndex = Math.min(code.length, OTP_LENGTH - 1);

  return (
    <View style={styles.row}>
      {Array.from({ length: OTP_LENGTH }).map((_, index) => {
        const isActive = index === activeIndex && code.length < OTP_LENGTH;
        return (
          <View key={index} style={[styles.box, isActive && styles.boxActive]}>
            <Text style={styles.digit}>{code[index] ?? ''}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 48,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderWidth: 1.5,
    borderColor: '#1C5FB6',
  },
  digit: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
  },
});
