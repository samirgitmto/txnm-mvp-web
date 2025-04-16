export interface Transaction {
    tId: number;
    date: string;
    reference: string;
    refNoOrChqNo: string | null;
    credit: number | null;
    debit: number | null;
    balance: number;
    ownerId: string | null;
    bankName: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PeriodData {
    periodNumber: number;
    totalCredit: number;
    totalDebit: number;
    transactions: Transaction[];
} 