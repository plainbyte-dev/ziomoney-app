import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AuthHeaderProps = {
  title?: string;
};

export function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.iconButton} onPress={() => router.back()} hitSlop={8}>
        <MaterialIcons name="chevron-left" size={26} color="#1A2B3C" />
      </Pressable>

      {title ? <Text style={styles.title}>{title}</Text> : <View />}

      <Pressable style={styles.iconButton} hitSlop={8}>
        <MaterialIcons name="support-agent" size={22} color="#1A2B3C" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2B3C',
  },
});
