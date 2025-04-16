export interface BankConfig {
  name: string;
  keyHint: string;
  keyPlaceholder: string;
  keyFormat: string;
}

export const bankConfigs: Record<string, BankConfig> = {
  'SBI': {
    name: 'State Bank of India',
    keyHint: 'Your e-account statement is protected by a password, which is the last five digits of customer registered mobile number and date of birth (DOB) in DDMMYY format registered with Bank, for example if mobile number is XXXXX12345 and DOB is 16th September 1982 then password will be 12345160982',
    keyPlaceholder: 'e.g., 12345160982',
    keyFormat: '^\\d{5}\\d{6}$'
  },
  'HDFC': {
    name: 'HDFC Bank',
    keyHint: 'Your statement password is the last 4 digits of your account number followed by your date of birth in DDMMYY format. For example, if your account number ends with 5678 and DOB is 16th September 1982, the password would be 5678160982',
    keyPlaceholder: 'e.g., 5678160982',
    keyFormat: '^\\d{4}\\d{6}$'
  },
  'ICICI': {
    name: 'ICICI Bank',
    keyHint: 'Your statement password is the last 6 digits of your account number',
    keyPlaceholder: 'e.g., 123456',
    keyFormat: '^\\d{6}$'
  },
  'AXIS': {
    name: 'Axis Bank',
    keyHint: 'Your statement password is the last 4 digits of your account number followed by your date of birth in DDMMYY format. For example, if your account number ends with 5678 and DOB is 16th September 1982, the password would be 5678160982',
    keyPlaceholder: 'e.g., 5678160982',
    keyFormat: '^\\d{4}\\d{6}$'
  },
  'PNB': {
    name: 'Punjab National Bank',
    keyHint: 'Your statement password is the last 6 digits of your account number',
    keyPlaceholder: 'e.g., 123456',
    keyFormat: '^\\d{6}$'
  },
  'BOB': {
    name: 'Bank of Baroda',
    keyHint: 'Your statement password is the last 6 digits of your account number',
    keyPlaceholder: 'e.g., 123456',
    keyFormat: '^\\d{6}$'
  }
}; 