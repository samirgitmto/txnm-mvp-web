import { API_ENDPOINTS } from './api/endpoints';
import { ParseStatementRequest, StatementResponse } from './api/types';

export class StatementService {
  static async parseStatement(request: ParseStatementRequest): Promise<StatementResponse> {
    const formData = new FormData();
    formData.append('bankName', request.bankName);
    formData.append('filePath', request.filePath);
    formData.append('password', request.password);

    const response = await fetch(API_ENDPOINTS.STATEMENTS.PARSE, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to parse statement');
    }

    return response.json();
  }
} 