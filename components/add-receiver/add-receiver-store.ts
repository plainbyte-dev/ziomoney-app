export type AddReceiverData = {
  countryName: string;
  countryFlag: string;
  currencyCode: string;
  methodId: string;
  methodLabel: string;
  bankName: string | null;
  accountNumber: string;
  walletName: string | null;
  walletId: string;
  payoutLocation: string | null;
  fullName: string;
  phoneDialCode: string;
  phoneNumber: string;
  relationship: string | null;
  zipCode: string;
  state: string | null;
  streetAddress: string;
};

function createEmptyAddReceiverData(): AddReceiverData {
  return {
    countryName: '',
    countryFlag: '',
    currencyCode: '',
    methodId: '',
    methodLabel: '',
    bankName: null,
    accountNumber: '',
    walletName: null,
    walletId: '',
    payoutLocation: null,
    fullName: '',
    phoneDialCode: '',
    phoneNumber: '',
    relationship: null,
    zipCode: '',
    state: null,
    streetAddress: '',
  };
}

export const addReceiverData: AddReceiverData = createEmptyAddReceiverData();

export function resetAddReceiverData() {
  Object.assign(addReceiverData, createEmptyAddReceiverData());
}
