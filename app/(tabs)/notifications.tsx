import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OptionPickerModal } from '@/components/add-receiver/option-picker-modal';
import { FilterChip } from '@/components/notifications/filter-chip';
import { notifications as initialNotifications } from '@/components/notifications/notification-data';
import { NotificationCard } from '@/components/notifications/notification-card';

type Filter = 'all' | 'promotions' | 'transactions';
type SortOrder = 'Newest First' | 'Oldest First';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<Filter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('Newest First');
  const [sortPickerOpen, setSortPickerOpen] = useState(false);

  const visibleNotifications = useMemo(() => {
    let list = notifications;
    if (filter === 'promotions') {
      list = list.filter((item) => item.category === 'promo');
    } else if (filter === 'transactions') {
      list = list.filter((item) => item.category === 'transaction');
    }
    return sortOrder === 'Oldest First' ? [...list].reverse() : list;
  }, [notifications, filter, sortOrder]);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.backButton} onPress={() => router.push('/(tabs)')} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color="#1A2B3C" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.filterRow}>
        <FilterChip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterChip
          label="Promotions"
          selected={filter === 'promotions'}
          onPress={() => setFilter('promotions')}
        />
        <FilterChip
          label="Transactions"
          selected={filter === 'transactions'}
          onPress={() => setFilter('transactions')}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}>
        {visibleNotifications.map((item) => (
          <NotificationCard key={item.id} notification={item} onDelete={() => handleDelete(item.id)} />
        ))}
        {visibleNotifications.length === 0 && <Text style={styles.emptyText}>No notifications.</Text>}
      </ScrollView>

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => setSortPickerOpen(true)}>
        <Ionicons name="filter-outline" size={22} color="#FFFFFF" />
      </Pressable>

      <OptionPickerModal
        visible={sortPickerOpen}
        title="Sort By"
        options={['Newest First', 'Oldest First']}
        selectedOption={sortOrder}
        onClose={() => setSortPickerOpen(false)}
        onSelect={(option) => setSortOrder(option as SortOrder)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
    gap: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 13.5,
    color: '#7A8894',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1AA80C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
