import React, { createContext, useContext, useEffect, useState } from 'react';
import SessionService, { SessionInfo } from '../services/sessionService';

interface SessionContextType {
    sessionInfo: SessionInfo | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    createGuestSession: () => Promise<void>;
    validateSession: () => Promise<boolean>;
    refreshSession: () => Promise<boolean>;
    deleteSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const sessionService = SessionService.getInstance();

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const storedSession = sessionService.getSessionInfo();
                if (storedSession) {
                    const isValid = await sessionService.validateSession();
                    if (isValid) {
                        setSessionInfo(storedSession);
                    } else {
                        await sessionService.deleteSession();
                    }
                } else {
                    await createGuestSession();
                }
            } catch (error) {
                console.error('Error initializing session:', error);
                await createGuestSession();
            } finally {
                setIsLoading(false);
            }
        };

        initializeSession();
    }, []);

    const createGuestSession = async () => {
        try {
            const newSession = await sessionService.createGuestSession();
            setSessionInfo(newSession);
        } catch (error) {
            console.error('Error creating guest session:', error);
        }
    };

    const validateSession = async () => {
        const isValid = await sessionService.validateSession();
        if (!isValid) {
            setSessionInfo(null);
        }
        return isValid;
    };

    const refreshSession = async () => {
        const success = await sessionService.refreshSession();
        if (success) {
            setSessionInfo(sessionService.getSessionInfo());
        }
        return success;
    };

    const deleteSession = async () => {
        await sessionService.deleteSession();
        setSessionInfo(null);
    };

    const value = {
        sessionInfo,
        isLoading,
        isAuthenticated: sessionService.isRegisteredUser(),
        createGuestSession,
        validateSession,
        refreshSession,
        deleteSession
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}; 