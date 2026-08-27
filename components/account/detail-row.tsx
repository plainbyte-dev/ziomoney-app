import type { Ionicons } from '@expo/vector-icons';
import { Ionicons as IoniconsComponent } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type DetailRowProps = {
  icon: IoniconName;
  label: string;
  value: string;
  right?: ReactNode;
  showDivider?: boolean;
};

export function DetailRow({ icon, label, value, right, showDivider = true }: DetailRowProps) {
  return (
    <View>
      <View style={styles.row}>
        <IoniconsComponent name={icon} size={18} color="#1C5FB6" />
        <View style={styles.textColumn}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        {right}
      </View>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  textColumn: {
    flex: 1,
  },
  label: {
    fontSize: 12.5,
    color: '#7A8894',
  },
  value: {
    marginTop: 2,
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F3F5',
  },
});
