import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        navigate('/task-options');
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Login</h2>
            <form className="register-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" className="register-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input type="password" className="register-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="register-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
