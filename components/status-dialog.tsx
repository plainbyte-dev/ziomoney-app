import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type StatusDialogTone = 'warning' | 'success';

type StatusDialogProps = {
  visible: boolean;
  tone: StatusDialogTone;
  title: string;
  message: string;
  buttonLabel: string;
  onButtonPress: () => void;
  onClose: () => void;
};

const TONE_STYLES: Record<StatusDialogTone, { icon: keyof typeof Ionicons.glyphMap; color: string; haloColor: string; buttonColors: [string, string] }> = {
  warning: {
    icon: 'alert',
    color: '#E2A03F',
    haloColor: 'rgba(226,160,63,0.16)',
    buttonColors: ['#4CC93F', '#1AA80C'],
  },
  success: {
    icon: 'checkmark',
    color: '#1AA80C',
    haloColor: 'rgba(26,168,12,0.16)',
    buttonColors: ['#4CC93F', '#1AA80C'],
  },
};

export function StatusDialog({ visible, tone, title, message, buttonLabel, onButtonPress, onClose }: StatusDialogProps) {
  const toneStyle = TONE_STYLES[tone];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.card}>
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
            <Ionicons name="close" size={20} color="#1A2B3C" />
          </Pressable>

          <View style={[styles.halo, { backgroundColor: toneStyle.haloColor }]}>
            <View style={[styles.iconCircle, { backgroundColor: toneStyle.color }]}>
              <Ionicons name={toneStyle.icon} size={32} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <Pressable style={styles.buttonPressable} onPress={onButtonPress}>
            <LinearGradient
              colors={toneStyle.buttonColors}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.button}>
              <Text style={styles.buttonLabel}>{buttonLabel}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26,43,60,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  halo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#7A8894',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonPressable: {
    width: '100%',
    marginTop: 22,
  },
  button: {
    borderRadius: 1000,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
