import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type RewardPointsRowProps = {
  availablePoints: number;
  redeemedPoints: number;
  savings: number;
  pointValueUsd: number;
  onApply: (points: number) => void;
  onRemove: () => void;
};

export function RewardPointsRow({
  availablePoints,
  redeemedPoints,
  savings,
  pointValueUsd,
  onApply,
  onRemove,
}: RewardPointsRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState(String(availablePoints));

  const pointsPerDollar = Math.round(1 / pointValueUsd);

  if (redeemedPoints > 0) {
    return (
      <View style={styles.card}>
        <View style={styles.appliedPill}>
          <View style={styles.appliedLeft}>
            <Ionicons name="checkmark-circle" size={18} color="#1AA80C" />
            <Text style={styles.appliedCode}>{redeemedPoints.toLocaleString('en-US')}</Text>
          </View>
          <Pressable onPress={onRemove} hitSlop={8}>
            <Text style={styles.removeLabel}>Remove</Text>
          </Pressable>
        </View>
        <Text style={styles.successText}>
          {redeemedPoints.toLocaleString('en-US')} point{redeemedPoints === 1 ? '' : 's'} used! You saved $
          {savings.toFixed(2)} on this transfer.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Pressable style={styles.row} onPress={() => setExpanded((prev) => !prev)}>
        <View style={styles.iconSquare}>
          <MaterialIcons name="emoji-events" size={20} color="#1C5FB6" />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.title}>Use Reward Points</Text>
          <Text style={styles.subtitle}>
            {redeemedPoints > 0
              ? `${redeemedPoints.toLocaleString('en-US')} points applied`
              : `${availablePoints.toLocaleString('en-US')} points available`}
          </Text>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="#7A8894" />
      </Pressable>

      {expanded && (
        <View style={styles.expandedWrap}>
          <View style={styles.expandedRow}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor="#B7C2CB"
              style={styles.input}
            />
            <Pressable
              style={styles.applyButton}
              onPress={() => {
                const parsed = Math.max(0, Math.min(availablePoints, parseInt(draft, 10) || 0));
                onApply(parsed);
                setDraft(String(parsed));
                setExpanded(false);
              }}>
              <Text style={styles.applyLabel}>Apply</Text>
            </Pressable>
          </View>

          <View style={styles.helperRow}>
            <Ionicons name="information-circle-outline" size={14} color="#7A8894" />
            <Text style={styles.helperText}>
              {pointsPerDollar} points = $1.00 USD value.
            </Text>
          </View>
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
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  helperText: {
    fontSize: 12,
    color: '#7A8894',
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
