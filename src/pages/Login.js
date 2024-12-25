import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate }  from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { login: setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', { login, password });
            setAuth(response.data.token, response.data.user);
            navigate('/profile');
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;