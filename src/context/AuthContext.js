"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored auth on mount
        const storedUser = localStorage.getItem('smartstore_user');
        const storedToken = localStorage.getItem('smartstore_token');
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (e) {
                localStorage.removeItem('smartstore_user');
                localStorage.removeItem('smartstore_token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem('smartstore_user', JSON.stringify(data.user));
                localStorage.setItem('smartstore_token', data.token);
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('smartstore_user');
        localStorage.removeItem('smartstore_token');
    };

    /**
     * Helper function to make authenticated API requests
     * Automatically includes the JWT token in the Authorization header
     * Handles token expiration by logging the user out
     */
    const authFetch = async (url, options = {}) => {
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };

        const res = await fetch(url, { ...options, headers });

        // If token is expired or invalid, log the user out
        if (res.status === 401 || res.status === 403) {
            const data = await res.json();
            if (data.expired || data.tampered) {
                logout();
                window.location.href = '/login';
                return null;
            }
        }

        return res;
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, authFetch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
