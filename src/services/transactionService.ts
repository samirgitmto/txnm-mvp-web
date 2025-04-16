import baseService from './api/baseService';
import { Transaction, ApiResponse } from '../types/transaction';
import { API_ENDPOINTS } from './api/endpoints';

class TransactionService {
    async getTransactions(): Promise<Transaction[]> {
        try {
            const response = await baseService.get<ApiResponse<Transaction[]>>('/transactions');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }

    async parseTransactions(
        file: File,
        password: string,
        bankName: string,
        extractType: string = 'pdfBoxExtractor'
    ): Promise<ApiResponse<Transaction[]>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password);
        formData.append('bankName', bankName.toLowerCase());
        formData.append('extractType', extractType);

        const response = await baseService.post<ApiResponse<Transaction[]>>(
            API_ENDPOINTS.TRANSACTIONS.GET,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    }
}

export default new TransactionService(); 