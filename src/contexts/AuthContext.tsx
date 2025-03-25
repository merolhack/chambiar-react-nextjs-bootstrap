// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { login as apiLogin, checkStatus } from '../services/auth';

interface AuthContextType {
    user: { token: string } | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    loading: boolean;
    checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ token: string } | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                await checkStatus(); // Verify token is still valid
                setUser({ token });
            }
        } catch (error) {
            localStorage.removeItem('access_token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await apiLogin(credentials.username, credentials.password);
            localStorage.setItem('access_token', response.access_token);
            setUser({ token: response.access_token });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        // Clear cookie on logout
        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
        window.location.href = '/authentication/sign-in/';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (context === undefined) return

        if (!context.user && !context.loading) {
            router.push('/authentication/sign-in/')
        }
    }, [context, router])

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}