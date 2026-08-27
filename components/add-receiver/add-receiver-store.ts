export type AddReceiverData = {
  countryName: string;
  countryFlag: string;
  currencyCode: string;
  methodId: string;
  methodLabel: string;
  bankName: string | null;
  accountNumber: string;
  walletProvider: string | null;
  walletMobileNumber: string;
  idType: string | null;
  idNumber: string;
  fullName: string;
  phoneDialCode: string;
  phoneNumber: string;
  relationship: string | null;
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
    walletProvider: null,
    walletMobileNumber: '',
    idType: null,
    idNumber: '',
    fullName: '',
    phoneDialCode: '',
    phoneNumber: '',
    relationship: null,
  };
}

export const addReceiverData: AddReceiverData = createEmptyAddReceiverData();

export function resetAddReceiverData() {
  Object.assign(addReceiverData, createEmptyAddReceiverData());
}
