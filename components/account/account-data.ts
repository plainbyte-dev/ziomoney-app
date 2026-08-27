export type AccountInfo = {
  initials: string;
  fullName: string;
  kycVerified: boolean;
  kycCompletedOn: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  cityState: string;
  zipCode: string;
  country: string;
};

export const accountInfo: AccountInfo = {
  initials: 'IPS',
  fullName: 'Indra Prasad Sharma',
  kycVerified: true,
  kycCompletedOn: '15/08/2025',
  accountHolderName: 'Indra Prasad Sharma',
  bankName: 'Everest Bank Limited',
  accountNumber: '12345699821',
  phoneNumber: '+977 985-1029481',
  email: 'indra.sharma@ziomoney.com',
  streetAddress: 'New Baneshwor - 10, KMC',
  cityState: 'Kathmandu, Bagmati Province',
  zipCode: '44600',
  country: 'Nepal',
};
