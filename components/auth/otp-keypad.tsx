import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type OtpKeypadProps = {
  onKeyPress: (digit: string) => void;
  onBackspace: () => void;
};

const KEY_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'backspace'],
];

export function OtpKeypad({ onKeyPress, onBackspace }: OtpKeypadProps) {
  return (
    <View style={styles.container}>
      {KEY_ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => {
            if (key === '') {
              return <View key={`empty-${rowIndex}-${keyIndex}`} style={styles.key} />;
            }
            if (key === 'backspace') {
              return (
                <Pressable key={key} style={styles.key} onPress={onBackspace} hitSlop={8}>
                  <Ionicons name="backspace-outline" size={22} color="#1A2B3C" />
                </Pressable>
              );
            }
            return (
              <Pressable key={key} style={styles.key} onPress={() => onKeyPress(key)} hitSlop={8}>
                <Text style={styles.keyLabel}>{key}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7F0FC',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  key: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A2B3C',
  },
});
