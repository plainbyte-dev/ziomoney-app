import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { AuthTextField } from '@/components/auth/auth-text-field';
import { DateField } from '@/components/auth/date-field';
import { PhoneField } from '@/components/auth/phone-field';
import { SelectField } from '@/components/auth/select-field';
import { StepProgressBar } from '@/components/auth/step-progress-bar';
import { GradientButton } from '@/components/gradient-button';
import { countries, type Country } from '@/lib/countries';

const OCCUPATIONS = ['Employed', 'Self-employed', 'Student', 'Retired', 'Unemployed'];
const INCOME_SOURCES = ['Salary', 'Business', 'Investments', 'Savings', 'Other'];

const DEFAULT_COUNTRY: Country = countries.find((c) => c.iso2 === 'JP')!;

export default function CreateProfileScreen() {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [occupation, setOccupation] = useState('');
  const [incomeSource, setIncomeSource] = useState('');

  const canContinue = fullName.trim().length > 0 && dateOfBirth !== null && occupation.length > 0 && incomeSource.length > 0;

  const handleNext = () => {
    if (!canContinue) return;
    router.push('/kyc-verify');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled">
        <AuthHeader title="Create Profile" />

        <View style={styles.progressWrapper}>
          <StepProgressBar progress={0.5} />
        </View>

        <View style={styles.form}>
          <AuthTextField
            label="Full Name"
            placeholder="Jhone Doe"
            value={fullName}
            onChangeText={setFullName}
          />

          <DateField label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} />

          <PhoneField
            label="Mobile Number (Optional)"
            value={phone}
            onChangeValue={setPhone}
            country={country}
            onChangeCountry={setCountry}
          />

          <SelectField
            label="Occupation"
            value={occupation}
            placeholder="Occupation"
            options={OCCUPATIONS}
            onChange={setOccupation}
          />

          <SelectField
            label="Source of income"
            value={incomeSource}
            placeholder="Select Source of income"
            options={INCOME_SOURCES}
            onChange={setIncomeSource}
          />
        </View>

        <View style={styles.footer}>
          <GradientButton label="Next" onPress={handleNext} disabled={!canContinue} />
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
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  progressWrapper: {
    marginTop: 20,
  },
  form: {
    marginTop: 24,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 32,
  },
});
