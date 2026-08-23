import { Ionicons } from '@expo/vector-icons';
import { Image, type ImageSource } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PromoBannerProps = {
  title: string;
  subtitle: string;
  linkLabel: string;
  onPress?: () => void;
  image?: ImageSource;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
};

export function PromoBanner({ title, subtitle, linkLabel, onPress, image, icon }: PromoBannerProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Pressable onPress={onPress} hitSlop={8}>
          <Text style={styles.link}>{linkLabel} →</Text>
        </Pressable>
      </View>

      {image && <Image source={image} style={styles.image} contentFit="contain" />}
      {!image && icon && (
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={32} color="#1C5FB6" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E7F0FC',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textColumn: {
    flex: 1,
    gap: 4,
    paddingRight: 12,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  subtitle: {
    fontSize: 13,
    color: '#5A6772',
  },
  link: {
    marginTop: 6,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1C5FB6',
  },
  image: {
    width: 88,
    height: 72,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
