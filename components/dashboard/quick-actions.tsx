import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { quickActions } from './dashboard-data';
import { QuickActionButton } from './quick-action-button';
import { SectionHeader } from './section-header';

export function QuickActions() {
  const handlePress = (id: string) => {
    if (id === 'send') {
      router.push('/send-money');
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader title="Quick Actions" />
      <View style={styles.row}>
        {quickActions.map((action) => (
          <QuickActionButton key={action.id} action={action} onPress={() => handlePress(action.id)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
