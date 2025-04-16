export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  balance: number;
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
    branch: string;
  };
}

export interface ParseStatementRequest {
  bankName: string;
  pdfFile: File;
  password: string;
} 