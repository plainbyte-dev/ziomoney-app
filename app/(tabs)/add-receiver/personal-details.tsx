import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { addReceiverData } from '@/components/add-receiver/add-receiver-store';
import { FraudBanner } from '@/components/add-receiver/fraud-banner';
import { OptionPickerModal } from '@/components/add-receiver/option-picker-modal';
import { relationships } from '@/components/add-receiver/relationship-data';
import { PhoneField } from '@/components/auth/phone-field';
import { GradientButton } from '@/components/gradient-button';
import { OutlineButton } from '@/components/outline-button';
import { ProgressBar } from '@/components/send-money/progress-bar';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';
import { countries } from '@/lib/countries';

export default function PersonalDetailsScreen() {
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountry, setPhoneCountry] = useState(
    countries.find((c) => c.iso2 === 'NP') ?? countries[0],
  );
  const [relationship, setRelationship] = useState<string | null>(null);
  const [relationshipPickerOpen, setRelationshipPickerOpen] = useState(false);

  const handlePrev = () => {
    router.back();
  };

  const handleNext = () => {
    addReceiverData.fullName = fullName;
    addReceiverData.phoneDialCode = phoneCountry.dialCode;
    addReceiverData.phoneNumber = phoneNumber;
    addReceiverData.relationship = relationship;
    router.push('/add-receiver/beneficiary-summary');
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Personal Details" />
        <View style={styles.progressWrap}>
          <ProgressBar progress={0.8} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <FraudBanner />

          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#B7C2CB"
              style={styles.input}
            />
          </View>

          <PhoneField
            label="Phone Number"
            value={phoneNumber}
            onChangeValue={setPhoneNumber}
            country={phoneCountry}
            onChangeCountry={setPhoneCountry}
          />

          <View style={styles.field}>
            <Text style={styles.label}>Relationship</Text>
            <Pressable style={styles.selectRow} onPress={() => setRelationshipPickerOpen(true)}>
              <Text style={relationship ? styles.selectValue : styles.placeholder}>
                {relationship ?? 'Select Relationship'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#7A8894" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerButton}>
          <OutlineButton label="Prev" onPress={handlePrev} />
        </View>
        <View style={styles.footerButton}>
          <GradientButton label="Next" onPress={handleNext} />
        </View>
      </View>

      <OptionPickerModal
        visible={relationshipPickerOpen}
        title="Relationship"
        options={relationships}
        selectedOption={relationship}
        onClose={() => setRelationshipPickerOpen(false)}
        onSelect={setRelationship}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  flex: {
    flex: 1,
  },
  progressWrap: {
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  field: {
    gap: 10,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2B3C',
  },
  placeholder: {
    fontSize: 15,
    color: '#B7C2CB',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A2B3C',
  },
  footer: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F7F9F8',
  },
  footerButton: {
    flex: 1,
  },
});
