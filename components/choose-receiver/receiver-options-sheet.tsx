import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';
import { GradientButton } from '@/components/gradient-button';

type ReceiverOptionsSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSendMoney: () => void;
  onRemove: () => void;
};

export function ReceiverOptionsSheet({ visible, onClose, onSendMoney, onRemove }: ReceiverOptionsSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>Options</Text>

      <View style={styles.buttons}>
        <GradientButton label="Send Money" icon="paper-plane-outline" onPress={onSendMoney} />
      </View>

      <Pressable style={styles.removeButton} onPress={onRemove} hitSlop={8}>
        <Text style={styles.removeLabel}>Remove Receiver</Text>
      </Pressable>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B3C',
    marginTop: 14,
    marginBottom: 18,
  },
  buttons: {
    gap: 12,
  },
  removeButton: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  removeLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C5FB6',
  },
});
