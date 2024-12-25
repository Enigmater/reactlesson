import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(null); // Состояние для хранения информации о пользователе

    useEffect(() => {
        // Когда пользователь меняется, выводим в консоль
        if (user) {
            console.log('Updated user:', user);
            //console.log('User ID:', user.id);
        }
    }, [user]); // Эффект срабатывает, когда состояние user меняется

    const login = (token, userData) => {
    localStorage.setItem('authToken', token);
        setAuthToken(token);
        setUser (userData); // Сохраняем информацию о пользователе
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser (null); // Сбрасываем информацию о пользователе
    };

    const isAuthenticated = () => {
        return !!authToken; // Можно добавить дополнительную проверку на валидность токена
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};