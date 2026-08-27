import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ProfileCardProps = {
  initials: string;
  fullName: string;
  kycVerified: boolean;
  onEdit: () => void;
};

export function ProfileCard({ initials, fullName, kycVerified, onEdit }: ProfileCardProps) {
  return (
    <LinearGradient
      colors={['#1AA80C', '#1C5FB6']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.textColumn}>
        <Text style={styles.name}>{fullName}</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>KYC Status:</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeLabel}>{kycVerified ? 'Active' : 'Inactive'}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.editButton} onPress={onEdit} hitSlop={8}>
        <Ionicons name="pencil" size={16} color="#FFFFFF" />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 18,
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  textColumn: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  statusLabel: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.9)',
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusBadgeLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
