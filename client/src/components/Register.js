import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { FaUser, FaLock, FaEnvelope, FaUserShield } from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Assigned User');

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('https://otm-system.onrender.com/api/auth/register', { username, email, password, role });
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input 
                        type="text" 
                        className="register-input" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input 
                        type="email" 
                        className="register-input" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input 
                        type="password" 
                        className="register-input" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <FaUserShield className="input-icon" />
                    <select 
                        className="register-select" 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                    >
                        <option value="Assigned User">Assigned User</option>
                        <option value="Task Owner">Task Owner</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
