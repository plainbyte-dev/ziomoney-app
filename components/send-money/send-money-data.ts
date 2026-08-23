import type { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export type DeliveryMethod = {
  id: string;
  label: string;
  description: string;
  fee: number;
  icon: IoniconName;
};

export const deliveryMethods: DeliveryMethod[] = [
  { id: 'bank', label: 'Bank Transfer', description: '1-2 business days', fee: 2.99, icon: 'business-outline' },
  { id: 'wallet', label: 'Mobile Wallet', description: 'Instant', fee: 1.49, icon: 'phone-portrait-outline' },
  { id: 'cash', label: 'Cash Pickup', description: 'Instant', fee: 3.99, icon: 'cash-outline' },
];

export type Recipient = {
  name: string;
  country: string;
  maskedAccount: string;
  initials: string;
  avatarColor: string;
};

export const defaultRecipient: Recipient = {
  name: 'Marie Dupont',
  country: 'France',
  maskedAccount: '**** 5678',
  initials: 'MD',
  avatarColor: '#C0447A',
};

export const supportedCountryFlags = ['🇨🇦', '🇦🇺', '🇮🇳', '🇵🇭', '🇲🇽', '🇸🇳'];
