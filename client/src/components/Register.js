import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';
import { FaUser, FaLock, FaUserShield } from 'react-icons/fa'; // Importing icons

const Register = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Assigned User');

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" className="register-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input type="password" className="register-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-group">
                    <FaUserShield className="input-icon" />
                    <select className="register-select" onChange={(e) => setRole(e.target.value)}>
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
