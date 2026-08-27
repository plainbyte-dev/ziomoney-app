export type Receiver = {
  id: string;
  name: string;
  method: string;
  maskedAccount: string;
  flag: string;
  country: string;
  bankName?: string;
  accountNumber?: string;
  walletProvider?: string;
  idType?: string;
  idNumber?: string;
};

export const receivers: Receiver[] = [
  {
    id: '1',
    name: 'Indra Prasad Sharma',
    method: 'Bank Transfer',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇳🇵',
    country: 'Nepal',
    bankName: 'Nabil Bank',
    accountNumber: '1234567890',
  },
  {
    id: '2',
    name: 'Indra Prasad Sharma',
    method: 'Bank Transfer',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇮🇳',
    country: 'India',
    bankName: 'HDFC Bank',
    accountNumber: '9876543210',
  },
  {
    id: '3',
    name: 'Srijana Joshi',
    method: 'Cash Pickup',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇮🇳',
    country: 'India',
    idType: 'Passport',
    idNumber: 'P1234567',
  },
  {
    id: '4',
    name: 'Dipesh Shrestha',
    method: 'Cash Pickup',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇳🇵',
    country: 'Nepal',
    idType: 'Citizenship',
    idNumber: '234-567-890',
  },
  {
    id: '5',
    name: 'Indra Prasad Sharma',
    method: 'Wallet',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇳🇵',
    country: 'Nepal',
    walletProvider: 'eSewa',
  },
  {
    id: '6',
    name: 'Srijana Joshi',
    method: 'Cash Pickup',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇮🇳',
    country: 'India',
    idType: 'Citizenship',
    idNumber: '345-678-901',
  },
  {
    id: '7',
    name: 'Srijana Joshi',
    method: 'Cash Pickup',
    maskedAccount: 'Global IME 123***********32',
    flag: '🇮🇳',
    country: 'India',
    idType: 'Citizenship',
    idNumber: '456-789-012',
  },
];
