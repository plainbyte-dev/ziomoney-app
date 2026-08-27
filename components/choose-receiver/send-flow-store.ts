import type { Receiver } from './receiver-data';

export type SendFlowData = {
  receiver: Receiver | null;
  purpose: string | null;
  sourceOfFund: string | null;
  depositType: string | null;
  sendAmount: number;
  sendCurrencyCode: string;
  receiveCurrencyCode: string;
  rate: number;
  transferFee: number;
  couponDiscount: number;
  recipientGets: number;
  walletName: string | null;
  walletId: string;
};

function createEmptySendFlowData(): SendFlowData {
  return {
    receiver: null,
    purpose: null,
    sourceOfFund: null,
    depositType: null,
    sendAmount: 0,
    sendCurrencyCode: '',
    receiveCurrencyCode: '',
    rate: 0,
    transferFee: 0,
    couponDiscount: 0,
    recipientGets: 0,
    walletName: null,
    walletId: '',
  };
}

export const sendFlowData: SendFlowData = createEmptySendFlowData();

export function resetSendFlowData() {
  Object.assign(sendFlowData, createEmptySendFlowData());
}

export const transferPurposes: string[] = [
  'Family Support',
  'Education',
  'Medical Expenses',
  'Business',
  'Gift',
  'Personal Expenses',
  'Other',
];

export const sourceOfFunds: string[] = ['Salary', 'Business Income', 'Savings', 'Investment Returns', 'Other'];

export const depositTypes: string[] = ['Online Bank Deposit', 'Wallet', 'Cash'];
