import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BalanceCard } from '@/components/dashboard/balance-card';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { PromoBanner } from '@/components/dashboard/promo-banner';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { TransactionsSection } from '@/components/dashboard/transactions-section';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}>
        <DashboardHeader notificationCount={4} />

        <View style={styles.section}>
          <BalanceCard balance={12450.75} convertedAmount="10,243.90 EUR" />
        </View>

        <QuickActions />

        <View style={styles.bannerSection}>
          <PromoBanner
            title="Send money across borders"
            subtitle="Fast, secure and low fees."
            linkLabel="Send Now"
            image={require('@/assets/images/starting-pages/image4.png')}
            onPress={() => router.push('/send-money')}
          />
        </View>

        <TransactionsSection />

        <View style={styles.bannerSection}>
          <PromoBanner
            title="Refer & Earn"
            subtitle="Invite your friends and earn rewards"
            linkLabel="Invite Now"
            icon="gift-outline"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  content: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 20,
  },
  bannerSection: {
    marginTop: 28,
  },
});
