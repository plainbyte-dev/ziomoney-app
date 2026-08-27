import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type WarningBannerProps = {
  message: string;
  linkLabel: string;
};

export function WarningBanner({ message, linkLabel }: WarningBannerProps) {
  return (
    <View style={styles.banner}>
      <Ionicons name="warning" size={18} color="#E2A03F" />
      <Text style={styles.text}>
        {message} <Text style={styles.link}>{linkLabel}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FCF0D6',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  text: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: '600',
    color: '#8A5A00',
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    color: '#8A5A00',
  },
});
