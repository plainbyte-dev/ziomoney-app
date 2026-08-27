import type { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export type ReceivingMethod = {
  id: string;
  label: string;
  description: string;
  fee: number;
  icon: IoniconName;
};

export const receivingMethods: ReceivingMethod[] = [
  { id: 'bank', label: 'Bank Transfer', description: '1-2 business days', fee: 2.99, icon: 'business-outline' },
  { id: 'wallet', label: 'Mobile Wallet', description: 'Instant', fee: 1.49, icon: 'phone-portrait-outline' },
  { id: 'cash', label: 'Cash Pickup', description: 'Instant', fee: 3.99, icon: 'cash-outline' },
];

export type ReceivingCountry = {
  name: string;
  flag: string;
  currencyCode: string;
};

export const receivingCountries: ReceivingCountry[] = [
  { name: 'Nepal', flag: '🇳🇵', currencyCode: 'NPR' },
  { name: 'India', flag: '🇮🇳', currencyCode: 'INR' },
  { name: 'Philippines', flag: '🇵🇭', currencyCode: 'PHP' },
  { name: 'Mexico', flag: '🇲🇽', currencyCode: 'MXN' },
  { name: 'Nigeria', flag: '🇳🇬', currencyCode: 'NGN' },
  { name: 'United Kingdom', flag: '🇬🇧', currencyCode: 'GBP' },
  { name: 'South Africa', flag: '🇿🇦', currencyCode: 'ZAR' },
  { name: 'China', flag: '🇨🇳', currencyCode: 'CNY' },
  { name: 'Brazil', flag: '🇧🇷', currencyCode: 'BRL' },
  { name: 'Singapore', flag: '🇸🇬', currencyCode: 'SGD' },
];

export const totalRewardPoints = 12000;
export const availableRewardPoints = 1245;
export const pointValueUsd = 0.01;

export const validCampaignCodes = ['SUMMER2026'];
export const campaignCodeSavings = 15;
