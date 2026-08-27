import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';
import { GradientButton } from '@/components/gradient-button';
import { GradientOutlineButton } from '@/components/gradient-outline-button';

type AddReceiverOptionsSheetProps = {
  visible: boolean;
  onClose: () => void;
  onScan: () => void;
  onAddManually: () => void;
};

export function AddReceiverOptionsSheet({ visible, onClose, onScan, onAddManually }: AddReceiverOptionsSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>Options</Text>

      <View style={styles.buttons}>
        <GradientOutlineButton
          label="Scan to Add Receiver"
          iconElement={<MaterialCommunityIcons name="qrcode-scan" size={18} color="#1C5FB6" />}
          onPress={onScan}
        />
        <GradientButton label="Add Manually" icon="person-add-outline" onPress={onAddManually} />
      </View>
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
});
