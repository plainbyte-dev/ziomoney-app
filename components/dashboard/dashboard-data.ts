import type { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export type QuickAction = {
  id: string;
  label: string;
  icon: IoniconName;
  iconColor: string;
  backgroundColor: string;
};

export const quickActions: QuickAction[] = [
  { id: 'send', label: 'Send Money', icon: 'arrow-up-outline', iconColor: '#1C5FB6', backgroundColor: '#DCEBFB' },
  { id: 'request', label: 'Request Money', icon: 'arrow-down-outline', iconColor: '#8B5CF6', backgroundColor: '#EDE4FC' },
  { id: 'add', label: 'Add Money', icon: 'add', iconColor: '#1AA80C', backgroundColor: '#DFF3DA' },
  { id: 'refer', label: 'Refer & Earn', icon: 'gift-outline', iconColor: '#E08A2E', backgroundColor: '#FBEBD8' },
];

export type Transaction = {
  id: string;
  name: string;
  location: string;
  flag: string;
  amount: number;
  direction: 'in' | 'out' | 'exchange';
  status: string;
  initials: string;
  avatarColor: string;
};

export const recentTransactions: Transaction[] = [
  {
    id: 't1',
    name: 'To Amara Diallo',
    location: 'Senegal',
    flag: '🇸🇳',
    amount: 350,
    direction: 'out',
    status: 'Completed',
    initials: 'AD',
    avatarColor: '#E08A2E',
  },
  {
    id: 't2',
    name: 'From John Carter',
    location: 'United States',
    flag: '🇺🇸',
    amount: 1200,
    direction: 'in',
    status: 'Completed',
    initials: 'JC',
    avatarColor: '#1C5FB6',
  },
  {
    id: 't3',
    name: 'To Priya Sharma',
    location: 'India',
    flag: '🇮🇳',
    amount: 500,
    direction: 'out',
    status: 'Completed',
    initials: 'PS',
    avatarColor: '#C0447A',
  },
  {
    id: 't4',
    name: 'Exchange',
    location: 'USD → EUR',
    flag: '',
    amount: 200,
    direction: 'exchange',
    status: 'Completed',
    initials: '',
    avatarColor: '',
  },
];
