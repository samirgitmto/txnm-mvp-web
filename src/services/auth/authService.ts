import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = 'http://localhost:8241/api';

export interface User {
    id: number;
    email: string | null;
    googleId: string | null;
    fullName: string | null;
    userType: 'GUEST' | 'REGISTERED';
    sessionId: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data?: User;
}

class AuthService {
    private static instance: AuthService;
    private sessionId: string | null = null;

    private constructor() {
        // Initialize session ID from storage
        this.sessionId = localStorage.getItem('sessionId');
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public async handleGoogleLogin(email: string, googleId: string, fullName: string): Promise<AuthResponse> {
        const sessionId = uuidv4();
        
        // Log the request details
        console.log('Request URL:', `${API_BASE_URL}/session/google?sessionId=${sessionId}&email=${email}&googleId=${googleId}&fullName=${fullName}`);
        console.log('Request headers:', {
            'Content-Type': 'application/json'
        });

        try {
            const response = await axios.post<AuthResponse>(
                `${API_BASE_URL}/session/google?sessionId=${sessionId}&email=${email}&googleId=${googleId}&fullName=${fullName}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                this.sessionId = sessionId;
                localStorage.setItem('sessionId', sessionId);
            }

            return response.data;
        } catch (error) {
            console.error('Google login error:', error);
            return {
                success: false,
                message: 'Failed to authenticate with Google'
            };
        }
    }

    public getSessionId(): string | null {
        return this.sessionId;
    }

    public clearSession(): void {
        this.sessionId = null;
        localStorage.removeItem('sessionId');
    }
}

export const authService = AuthService.getInstance(); 