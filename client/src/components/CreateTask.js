import React, { useState } from 'react';
import axios from 'axios';
import { FaTasks, FaRegStickyNote, FaCalendarAlt, FaUser, FaClipboardCheck } from 'react-icons/fa';
import './CreateTask.css';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [assignedTo, setAssignedTo] = useState('');

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/tasks', 
            { title, description, dueDate, status, assignedTo }, 
            { headers: { Authorization: token } }
        );
        window.location.reload();
    };

    return (
        <div className="create-task-container">
            <h2 className="create-task-title">Create Task</h2>
            <form className="create-task-form" onSubmit={handleCreateTask}>
                <div className="input-group">
                    <FaTasks className="input-icon" />
                    <input 
                        type="text" 
                        className="create-task-input" 
                        placeholder="Task Title" 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <FaRegStickyNote className="input-icon" />
                    <input 
                        type="text" 
                        className="create-task-input" 
                        placeholder="Description" 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <FaCalendarAlt className="input-icon" />
                    <input 
                        type="date" 
                        className="create-task-input" 
                        onChange={(e) => setDueDate(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <FaClipboardCheck className="input-icon" />
                    <select 
                        className="create-task-input" 
                        onChange={(e) => setStatus(e.target.value)} 
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input 
                        type="text" 
                        className="create-task-input" 
                        placeholder="Assigned To (User ID)" 
                        onChange={(e) => setAssignedTo(e.target.value)} 
                    />
                </div>
                <button type="submit" className="create-task-button">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
