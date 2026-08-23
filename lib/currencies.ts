export type Currency = {
  code: string;
  name: string;
  flag: string;
  rateFromUsd: number;
};

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rateFromUsd: 1 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rateFromUsd: 0.9113 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rateFromUsd: 0.79 },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rateFromUsd: 83.12 },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rateFromUsd: 149.5 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', rateFromUsd: 1.36 },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', rateFromUsd: 1.52 },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽', rateFromUsd: 18.3 },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭', rateFromUsd: 56.2 },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', rateFromUsd: 1550 },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rateFromUsd: 18.1 },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', rateFromUsd: 7.24 },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rateFromUsd: 5.15 },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', rateFromUsd: 1.34 },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', rateFromUsd: 3.67 },
];
