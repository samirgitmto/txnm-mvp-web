import baseService from './api/baseService';
import { Transaction, ApiResponse } from '../types/transaction';
import { API_ENDPOINTS } from './api/endpoints';
import SessionService from './sessionService';

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

        // Get the session ID from the session service
        const sessionId = SessionService.getInstance().getSessionId();
        if (sessionId) {
            formData.append('sessionId', sessionId);
            console.log('Adding sessionId to request:', sessionId);
        } else {
            console.warn('No sessionId available');
        }

        try {
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
        } catch (error) {
            console.error('Error parsing transactions:', error);
            throw error;
        }
    }
}

export default new TransactionService(); 