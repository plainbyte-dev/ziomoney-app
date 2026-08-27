import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type CampaignCodeRowProps = {
  appliedCode: string | null;
  savings: number;
  onApply: (code: string) => boolean;
  onRemove: () => void;
};

export function CampaignCodeRow({ appliedCode, savings, onApply, onRemove }: CampaignCodeRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (appliedCode) {
    return (
      <View style={styles.card}>
        <View style={styles.appliedPill}>
          <View style={styles.appliedLeft}>
            <Ionicons name="checkmark-circle" size={18} color="#1AA80C" />
            <Text style={styles.appliedCode}>{appliedCode}</Text>
          </View>
          <Pressable onPress={onRemove} hitSlop={8}>
            <Text style={styles.removeLabel}>Remove</Text>
          </Pressable>
        </View>
        <Text style={styles.successText}>Code applied! You saved ${savings.toFixed(2)} on this transfer.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Pressable style={styles.row} onPress={() => setExpanded((prev) => !prev)}>
        <View style={styles.iconSquare}>
          <MaterialCommunityIcons name="barcode-scan" size={20} color="#1C5FB6" />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.title}>Campaign Code</Text>
          <Text style={styles.subtitle}>Enter code</Text>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="#7A8894" />
      </Pressable>

      {expanded && (
        <View style={styles.expandedWrap}>
          <View style={styles.expandedRow}>
            <TextInput
              value={draft}
              onChangeText={(text) => {
                setDraft(text);
                setError(null);
              }}
              placeholder="Enter campaign code"
              placeholderTextColor="#B7C2CB"
              autoCapitalize="characters"
              style={[styles.input, error && styles.inputError]}
            />
            <Pressable
              style={styles.applyButton}
              onPress={() => {
                if (!draft.trim()) return;
                const valid = onApply(draft.trim());
                if (valid) {
                  setDraft('');
                  setError(null);
                  setExpanded(false);
                } else {
                  setError('Invalid campaign code. Please try again.');
                }
              }}>
              <Text style={styles.applyLabel}>Apply</Text>
            </Pressable>
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  iconSquare: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E7F0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12.5,
    color: '#7A8894',
  },
  expandedWrap: {
    paddingBottom: 14,
  },
  expandedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A2B3C',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#E24C4C',
  },
  errorText: {
    marginTop: 8,
    fontSize: 12.5,
    fontWeight: '600',
    color: '#E24C4C',
  },
  applyButton: {
    backgroundColor: '#1C5FB6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  applyLabel: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  appliedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E1F5DC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 10,
  },
  appliedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appliedCode: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  removeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E24C4C',
  },
  successText: {
    marginTop: 8,
    paddingBottom: 14,
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1AA80C',
  },
});
