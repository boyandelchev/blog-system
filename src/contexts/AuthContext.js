import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const initialAuthState = {
    _id: '',
    email: '',
    accessToken: '',
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialAuthState);

    const isAuthenticated = user.email;

    const login = (authData) => {
        setUser(authData);
    };

    const logout = () => {
        setUser(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};