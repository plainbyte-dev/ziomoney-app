import type { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export type NotificationCategory = 'transaction' | 'security' | 'system' | 'promo';

export type NotificationItem = {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  time: string;
};

export const notifications: NotificationItem[] = [
  {
    id: '1',
    category: 'transaction',
    title: 'Transfer Successful',
    message: 'Your transfer of $250.00 to Sarah Jenkins has been completed successfully.',
    time: '2 mins ago',
  },
  {
    id: '2',
    category: 'security',
    title: 'Security Alert',
    message: 'New login detected from a Safari browser on a Windows device in Kathmandu, Nepal.',
    time: '1 hour ago',
  },
  {
    id: '3',
    category: 'system',
    title: 'KYC Verified',
    message: 'Great news! Your identity verification has been approved. Your account limits have been upgraded.',
    time: 'Yesterday',
  },
  {
    id: '4',
    category: 'promo',
    title: 'Promotional Offer',
    message: 'Invite friends to ZioMoney and earn up to $50 reward points. Offer valid until the end of the month!',
    time: '3 days ago',
  },
];

type CategoryMeta = {
  icon: IoniconName;
  iconColor: string;
  iconBackground: string;
  badgeLabel: string;
  badgeColor: string;
  badgeBackground: string;
};

export const categoryMeta: Record<NotificationCategory, CategoryMeta> = {
  transaction: {
    icon: 'trending-up-outline',
    iconColor: '#1C5FB6',
    iconBackground: '#E7F0FC',
    badgeLabel: 'Transaction',
    badgeColor: '#1C5FB6',
    badgeBackground: '#E7F0FC',
  },
  security: {
    icon: 'shield-outline',
    iconColor: '#E24C4C',
    iconBackground: '#FDEAEA',
    badgeLabel: 'Security',
    badgeColor: '#E24C4C',
    badgeBackground: '#FDEAEA',
  },
  system: {
    icon: 'checkmark-circle-outline',
    iconColor: '#1AA80C',
    iconBackground: '#DFF3DA',
    badgeLabel: 'System',
    badgeColor: '#3D4A54',
    badgeBackground: '#EDEFF1',
  },
  promo: {
    icon: 'gift-outline',
    iconColor: '#E2A03F',
    iconBackground: '#FCF0D6',
    badgeLabel: 'Promo',
    badgeColor: '#1AA80C',
    badgeBackground: '#DFF3DA',
  },
};
