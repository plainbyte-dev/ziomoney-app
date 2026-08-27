import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { accountInfo } from '@/components/account/account-data';
import { DetailRow } from '@/components/account/detail-row';
import { KycStatusCard } from '@/components/account/kyc-status-card';
import { ProfileCard } from '@/components/account/profile-card';
import { SectionBar } from '@/components/account/section-bar';

export default function AccountInformationScreen() {
  const insets = useSafeAreaInsets();
  const [accountNumberRevealed, setAccountNumberRevealed] = useState(false);

  const maskedAccountNumber = `•••• •••• ${accountInfo.accountNumber.slice(-4)}`;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.backButton} onPress={() => router.push('/settings')} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color="#1A2B3C" />
        </Pressable>
        <Text style={styles.headerTitle}>Account Information</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        <ProfileCard
          initials={accountInfo.initials}
          fullName={accountInfo.fullName}
          kycVerified={accountInfo.kycVerified}
          onEdit={() => {}}
        />

        <View style={styles.section}>
          <KycStatusCard
            verified={accountInfo.kycVerified}
            completedOn={accountInfo.kycCompletedOn}
            onVerifyNow={() => router.push('/kyc-verify')}
          />
        </View>

        <View style={styles.section}>
          <SectionBar label="Account Details" />
        </View>
        <View style={[styles.card, styles.section]}>
          <DetailRow icon="person-outline" label="Account Holder Name" value={accountInfo.accountHolderName} />
          <DetailRow icon="business-outline" label="Bank Name" value={accountInfo.bankName} />
          <DetailRow
            icon="card-outline"
            label="Account Number"
            value={accountNumberRevealed ? accountInfo.accountNumber : maskedAccountNumber}
            right={
              <Pressable onPress={() => setAccountNumberRevealed((prev) => !prev)} hitSlop={8}>
                <Ionicons
                  name={accountNumberRevealed ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="#7A8894"
                />
              </Pressable>
            }
          />
          <DetailRow icon="call-outline" label="Phone Number" value={accountInfo.phoneNumber} />
          <DetailRow icon="mail-outline" label="Email Address" value={accountInfo.email} showDivider={false} />
        </View>

        <View style={styles.section}>
          <SectionBar label="Address Details" />
        </View>
        <View style={[styles.card, styles.section]}>
          <DetailRow icon="location-outline" label="Street Address" value={accountInfo.streetAddress} />
          <DetailRow icon="map-outline" label="City & State" value={accountInfo.cityState} />
          <DetailRow icon="pin-outline" label="Zip Code" value={accountInfo.zipCode} />
          <DetailRow icon="flag-outline" label="Country" value={accountInfo.country} showDivider={false} />
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
  content: {
    paddingHorizontal: 20,
    gap: 12,
  },
  section: {
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
});
