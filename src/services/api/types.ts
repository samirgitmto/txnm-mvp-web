export interface ParseStatementRequest {
  bankName: string;
  filePath: string;
  password: string;
}

export interface StatementResponse {
  transactions: Transaction[];
  statementPeriod: {
    startDate: string;
    endDate: string;
  };
  accountDetails: {
    accountNumber: string;
    accountHolder: string;
  };
}

export interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
} 