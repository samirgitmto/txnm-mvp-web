import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = 'http://localhost:8241/api';

export interface SessionInfo {
    sessionId: string;
    userType: 'GUEST' | 'REGISTERED';
    email?: string;
    fullName?: string;
    expiry: number;
}

class SessionService {
    private static instance: SessionService;
    private sessionInfo: SessionInfo | null = null;

    private constructor() {
        // Initialize session from storage
        this.loadSession();
    }

    public static getInstance(): SessionService {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }

    private loadSession(): void {
        const storedSession = localStorage.getItem('sessionInfo');
        if (storedSession) {
            this.sessionInfo = JSON.parse(storedSession);
        }
    }

    private saveSession(sessionInfo: SessionInfo): void {
        this.sessionInfo = sessionInfo;
        localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
    }

    public async createGuestSession(): Promise<SessionInfo> {
        const sessionId = uuidv4();
        
        // Log the request details
        console.log('Request URL:', `${API_BASE_URL}/session/guest?sessionId=${sessionId}`);
        console.log('Request headers:', {
            'Content-Type': 'application/json'
        });

        const response = await axios.post(
            `${API_BASE_URL}/session/guest?sessionId=${sessionId}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const sessionInfo: SessionInfo = {
            sessionId,
            userType: 'GUEST',
            expiry: Date.now() + 3600000 // 1 hour
        };
        
        this.saveSession(sessionInfo);
        return sessionInfo;
    }

    public async validateSession(): Promise<boolean> {
        if (!this.sessionInfo) return false;

        try {
            // Log the request details
            console.log('Request URL:', `${API_BASE_URL}/session/validate?sessionId=${this.sessionInfo.sessionId}`);
            console.log('Request headers:', {
                'Content-Type': 'application/json'
            });

            const response = await axios.get(
                `${API_BASE_URL}/session/validate?sessionId=${this.sessionInfo.sessionId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.success;
        } catch (error) {
            console.error('Session validation error:', error);
            return false;
        }
    }

    public async refreshSession(): Promise<boolean> {
        if (!this.sessionInfo) return false;

        try {
            // Log the request details
            console.log('Request URL:', `${API_BASE_URL}/session/refresh?sessionId=${this.sessionInfo.sessionId}`);
            console.log('Request headers:', {
                'Content-Type': 'application/json'
            });

            const response = await axios.post(
                `${API_BASE_URL}/session/refresh?sessionId=${this.sessionInfo.sessionId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.success) {
                // Update expiry time
                this.sessionInfo.expiry = Date.now() + (this.sessionInfo.userType === 'GUEST' ? 3600000 : 86400000);
                this.saveSession(this.sessionInfo);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    public async deleteSession(): Promise<void> {
        if (!this.sessionInfo) return;

        try {
            // Log the request details
            console.log('Request URL:', `${API_BASE_URL}/session/logout?sessionId=${this.sessionInfo.sessionId}`);
            console.log('Request headers:', {
                'Content-Type': 'application/json'
            });

            await axios.post(
                `${API_BASE_URL}/session/logout?sessionId=${this.sessionInfo.sessionId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        } finally {
            this.sessionInfo = null;
            localStorage.removeItem('sessionInfo');
        }
    }

    public getSessionInfo(): SessionInfo | null {
        return this.sessionInfo;
    }

    public isSessionValid(): boolean {
        if (!this.sessionInfo) return false;
        return Date.now() < this.sessionInfo.expiry;
    }

    public isRegisteredUser(): boolean {
        return this.sessionInfo?.userType === 'REGISTERED';
    }

    public getSessionId(): string | null {
        return this.sessionInfo?.sessionId || null;
    }
}

export default SessionService; 